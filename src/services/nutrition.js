import { meals, getMealsByTimeAndObjective } from '../data/meals'

const MEAT_KEYWORDS    = ['frango', 'carne', 'atum', 'peixe', 'tilápia', 'salmão', 'peru', 'linguiça', 'bife', 'alcatra', 'patinho', 'frutos do mar', 'camarão']
const DAIRY_KEYWORDS   = ['leite', 'iogurte', 'queijo', 'cream cheese', 'whey', 'manteiga', 'requeijão', 'ricota']
const EGG_KEYWORDS     = ['ovo', 'clara', 'gema']
const GLUTEN_KEYWORDS  = ['pão', 'macarrão', 'farinha de trigo', 'wrap']
const HONEY_KEYWORDS   = ['mel']

function hasIngredient(meal, keywords) {
  const text = [...(meal.ingredients || []), meal.name].join(' ').toLowerCase()
  return keywords.some(k => text.includes(k))
}

function isMealSafe(meal, dietaryRestrictions) {
  if (!dietaryRestrictions?.length || dietaryRestrictions.includes('nenhuma_d')) return true
  for (const r of dietaryRestrictions) {
    if (r === 'vegetariano' && hasIngredient(meal, MEAT_KEYWORDS)) return false
    if (r === 'vegano' && (
      hasIngredient(meal, MEAT_KEYWORDS) ||
      hasIngredient(meal, DAIRY_KEYWORDS) ||
      hasIngredient(meal, EGG_KEYWORDS) ||
      hasIngredient(meal, HONEY_KEYWORDS)
    )) return false
    if (r === 'sem_lactose' && hasIngredient(meal, DAIRY_KEYWORDS)) return false
    if (r === 'sem_gluten' && hasIngredient(meal, GLUTEN_KEYWORDS)) return false
  }
  return true
}

// Fórmula Mifflin-St Jeor (mais precisa para TMB)
export function calculateTMB({ weight, height, age, sex }) {
  const base = 10 * weight + 6.25 * height - 5 * age
  return sex === 'masculino' ? base + 5 : base - 161
}

// TDEE = TMB × fator atividade
export function calculateTDEE(tmb, frequency) {
  const factors = { 2: 1.375, 3: 1.375, 4: 1.55, 5: 1.55, 6: 1.725, 7: 1.725 }
  return Math.round(tmb * (factors[frequency] || 1.375))
}

// Calorias e macros por objetivo
export function calculateTargets(tdee, goal, weight) {
  const targets = {
    hipertrofia: {
      calories: tdee + 300,
      protein: Math.round(weight * 2.0),
      carbsPercent: 0.50,
      fatsPercent: 0.20,
    },
    emagrecimento: {
      calories: Math.max(tdee - 500, 1200),
      protein: Math.round(weight * 2.2),
      carbsPercent: 0.38,
      fatsPercent: 0.25,
    },
    condicionamento: {
      calories: tdee,
      protein: Math.round(weight * 1.8),
      carbsPercent: 0.50,
      fatsPercent: 0.25,
    },
  }

  const t = targets[goal] || targets.condicionamento
  const proteinCals = t.protein * 4
  const remaining = t.calories - proteinCals
  const carbs = Math.round((remaining * t.carbsPercent * 1.5) / 4)
  const fats = Math.round((remaining * t.fatsPercent) / 9)

  return { calories: Math.round(t.calories), protein: t.protein, carbs, fats }
}

// Seleciona refeições para o dia baseado no objetivo, dia da semana e restrições dietéticas
export function generateDayMealPlan(goal, dayOfWeek, targets, dietaryRestrictions = []) {
  const pick = (time, count = 1) => {
    const options = getMealsByTimeAndObjective(time, goal)
      .filter(m => isMealSafe(m, dietaryRestrictions))
    // Fallback: se todas as opções foram filtradas, usa a lista sem filtro
    const pool = options.length > 0 ? options : getMealsByTimeAndObjective(time, goal)
    if (pool.length === 0) return []
    const rotated = [...pool].sort((a, b) => {
      const scoreA = ((a.day + dayOfWeek) % 7)
      const scoreB = ((b.day + dayOfWeek) % 7)
      return scoreA - scoreB
    })
    return rotated.slice(0, count)
  }

  const cafeMeals = pick('cafe', 1)
  const almocoMeals = pick('almoco', 1)
  const lancheMeals = pick('lanche', 2)
  const jantaMeals = pick('janta', 1)

  const selectedMeals = [...cafeMeals, ...almocoMeals, ...lancheMeals, ...jantaMeals]

  const totals = selectedMeals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fats: acc.fats + m.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  )

  return { meals: selectedMeals, totals, targets }
}

// Mensagem pós-treino personalizada por grupo muscular
export function getPostWorkoutMessage(muscleGroup, goal) {
  const messages = {
    Peito: {
      hipertrofia: 'Peito destruído! Agora é recuperação. Consuma proteína e carboidratos para síntese muscular.',
      emagrecimento: 'Ótimo treino de peito! Proteína alta para preservar o músculo no déficit.',
      condicionamento: 'Peito treinado! Refeição balanceada com proteína e carboidratos agora.',
    },
    Costas: {
      hipertrofia: 'Costas trabalhadas fundo! Proteína é essencial agora para reconstrução das fibras.',
      emagrecimento: 'Excelente treino de costas! Foque na proteína para preservar a massa.',
      condicionamento: 'Costas fortes! Carboidratos e proteínas para recuperação completa.',
    },
    Pernas: {
      hipertrofia: 'Dia de perna concluído! Os maiores músculos do corpo precisam de muito carboidrato e proteína agora.',
      emagrecimento: 'Treino de pernas incrível! O maior gasto calórico da semana. Reponha com proteína.',
      condicionamento: 'Pernas trabalhadas! Glicogênio muscular precisa ser reposto. Capriche nos carbos.',
    },
    Ombros: {
      hipertrofia: 'Ombros treinados! Proteína para recuperação das fibras do deltóide.',
      emagrecimento: 'Treino de ombros feito! Refeição leve com foco em proteína.',
      condicionamento: 'Ombros trabalhados! Refeição equilibrada para recuperação.',
    },
    Cardio: {
      emagrecimento: 'Cardio intenso! Hidratação primeiro. Proteína para preservar músculo, carbo moderado.',
      condicionamento: 'Cardio concluído! Reponha eletrólitos e capriche na proteína.',
      hipertrofia: 'Cardio feito! Não deixe o catabolismo agir — proteína imediatamente.',
    },
    'Full Body': {
      hipertrofia: 'Full body destruidor! Seu corpo todo precisa de proteína e carboidratos agora.',
      emagrecimento: 'Treino completo feito! Proteína é prioridade para preservar a massa.',
      condicionamento: 'Full body completado! Refeição completa: proteína + carbo + gordura boa.',
    },
    Funcional: {
      condicionamento: 'Funcional incrível! Refeição equilibrada para recuperação total.',
      emagrecimento: 'Treino funcional feito! Proteína para recuperação muscular.',
      hipertrofia: 'Funcional concluído! Carboidratos e proteínas para reposição completa.',
    },
  }

  const groupMessages = messages[muscleGroup] || messages['Full Body']
  return groupMessages[goal] || groupMessages.condicionamento
}

// Calcula percentual de macros em relação ao alvo
export function getMacroPercent(consumed, target) {
  return Math.min(Math.round((consumed / target) * 100), 100)
}

// Calcula IMC
export function calculateBMI(weight, height) {
  const heightM = height / 100
  const bmi = weight / (heightM * heightM)
  return Math.round(bmi * 10) / 10
}

export function getBMIStatus(bmi) {
  if (bmi < 18.5) return { label: 'Abaixo do peso', color: '#3498DB' }
  if (bmi < 25) return { label: 'Peso normal', color: '#dce8ff' }
  if (bmi < 30) return { label: 'Sobrepeso', color: '#FFA502' }
  return { label: 'Obesidade', color: '#FF4757' }
}
