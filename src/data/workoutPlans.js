// Planos de treino semanais por objetivo
// Cada dia referencia IDs dos exercícios em data/exercises.js
// dayIndex: 0=Domingo, 1=Segunda, ..., 6=Sábado
// Treinos de Seg-Sex (1-5)

export const workoutPlans = {
  hipertrofia: {
    name: 'Hipertrofia',
    description: 'Foco em ganho de massa muscular',
    days: {
      1: { // Segunda
        name: 'Peito + Tríceps',
        group: 'Peito',
        emoji: '💪',
        color: '#f87171',
        exercises: ['p01', 'p02', 'p03', 'p05', 'tri01', 'tri02', 'tri03'],
        duration: 60,
        warmup: 'Polichinelo 3min + Mobilidade de ombros',
        tip: 'Foco em conexão mente-músculo no peito. Sinta o alongamento no crucifixo.'
      },
      2: { // Terça
        name: 'Costas + Bíceps',
        group: 'Costas',
        emoji: '🏋️',
        color: '#60a5fa',
        exercises: ['c01', 'c02', 'c03', 'c06', 'bi01', 'bi02', 'bi04'],
        duration: 65,
        warmup: 'Remada com elástico 3min + Rotação de ombros',
        tip: 'Na puxada, pense em "puxar os cotovelos para baixo", não puxar com as mãos.'
      },
      3: { // Quarta
        name: 'Pernas + Glúteo',
        group: 'Pernas',
        emoji: '🦵',
        color: '#818cf8',
        exercises: ['l01', 'l02', 'l03', 'l04', 'g01', 'g02', 'l08'],
        duration: 70,
        warmup: 'Agachamento com peso corporal 10 reps + Mobilidade de quadril',
        tip: 'Dia de pernas é o mais difícil mas o mais recompensador. Foco total!'
      },
      4: { // Quinta
        name: 'Ombros + Abdômen',
        group: 'Ombros',
        emoji: '🔥',
        color: '#fbbf24',
        exercises: ['o01', 'o02', 'o03', 'o04', 'ab01', 'ab02', 'ab03'],
        duration: 55,
        warmup: 'Rotação de braços + Prancha 30s',
        tip: 'Elevação lateral com menos carga e mais qualidade. Não balance o tronco!'
      },
      5: { // Sexta
        name: 'Full Body',
        group: 'Full Body',
        emoji: '⚡',
        color: '#dce8ff',
        exercises: ['p04', 'c05', 'l06', 'o05', 'bi03', 'tri05', 'ab04'],
        duration: 60,
        warmup: 'Cardio leve 5min + Mobilidade geral',
        tip: 'Full body de fechamento da semana. Intensidade alta, descanso curto.'
      }
    }
  },

  emagrecimento: {
    name: 'Emagrecimento',
    description: 'Déficit calórico + preservação muscular',
    days: {
      1: { // Segunda
        name: 'HIIT + Core',
        group: 'Cardio',
        emoji: '🔥',
        color: '#f87171',
        exercises: ['card01', 'card02', 'card03', 'ab01', 'ab02', 'ab03', 'ab05'],
        duration: 45,
        warmup: 'Polichinelo 3min + Mobilidade',
        tip: 'Semana começa forte! HIIT é o melhor para queimar gordura e preservar músculo.'
      },
      2: { // Terça
        name: 'Full Body Força',
        group: 'Full Body',
        emoji: '💪',
        color: '#60a5fa',
        exercises: ['l01', 'p04', 'c01', 'o02', 'l06', 'ab02', 'fun05'],
        duration: 55,
        warmup: 'Pular corda 3min ou Polichinelo',
        tip: 'Treino de força no déficit é essencial para não perder músculo.'
      },
      3: { // Quarta
        name: 'Cardio + Funcional',
        group: 'Cardio',
        emoji: '🏃',
        color: '#34d399',
        exercises: ['card01', 'card04', 'fun01', 'fun05', 'ab03', 'ab04', 'card03'],
        duration: 45,
        warmup: 'Caminhada acelerada 3min',
        tip: 'Foco no cardio hoje. Mantenha FC acima de 70% do máximo.'
      },
      4: { // Quinta
        name: 'Full Body Força 2',
        group: 'Full Body',
        emoji: '🏋️',
        color: '#6366f1',
        exercises: ['l02', 'c02', 'p01', 'o01', 'l07', 'ab01', 'fun02'],
        duration: 55,
        warmup: 'Mountain Climber 2min',
        tip: 'Aumente a carga em relação a terça. Progressão é chave!'
      },
      5: { // Sexta
        name: 'Circuito Metabólico',
        group: 'Circuito',
        emoji: '⚡',
        color: '#f97316',
        exercises: ['card02', 'fun05', 'p04', 'l01', 'card04', 'ab02', 'card03'],
        duration: 40,
        warmup: 'Jumping Jacks 3min',
        tip: 'Circuito sem descanso entre exercícios. Máximo esforço para terminar a semana!'
      }
    }
  },

  condicionamento: {
    name: 'Condicionamento',
    description: 'Equilíbrio entre força, cardio e saúde',
    days: {
      1: { // Segunda
        name: 'Peito + Costas',
        group: 'Peito',
        emoji: '💪',
        color: '#f87171',
        exercises: ['p01', 'p04', 'c01', 'c03', 'p05', 'c06', 'ab01'],
        duration: 55,
        warmup: 'Polichinelo 3min + Mobilidade',
        tip: 'Treino de empurrar e puxar no mesmo dia. Ótimo para equilíbrio muscular.'
      },
      2: { // Terça
        name: 'Pernas + Glúteo',
        group: 'Pernas',
        emoji: '🦵',
        color: '#818cf8',
        exercises: ['l01', 'l02', 'l06', 'g01', 'g02', 'l08', 'ab02'],
        duration: 60,
        warmup: 'Agachamento peso corporal 2x15 + Mobilidade quadril',
        tip: 'Pernas fortes = metabolismo mais ativo. Invista nesse treino!'
      },
      3: { // Quarta
        name: 'Cardio + Core',
        group: 'Cardio',
        emoji: '🏃',
        color: '#34d399',
        exercises: ['card01', 'card03', 'card04', 'ab01', 'ab02', 'ab03', 'ab04'],
        duration: 40,
        warmup: 'Caminhada 3min',
        tip: 'Dia leve para recuperação ativa. Cardio moderado + core.'
      },
      4: { // Quinta
        name: 'Ombros + Braços',
        group: 'Ombros',
        emoji: '🔥',
        color: '#fbbf24',
        exercises: ['o01', 'o02', 'o04', 'bi01', 'bi02', 'tri01', 'tri02'],
        duration: 55,
        warmup: 'Rotação de ombros 2min + Mobilidade',
        tip: 'Ombros são os músculos mais lesionados. Sempre priorize a técnica!'
      },
      5: { // Sexta
        name: 'Full Body Funcional',
        group: 'Funcional',
        emoji: '⚡',
        color: '#dce8ff',
        exercises: ['fun01', 'fun02', 'fun04', 'fun05', 'card02', 'ab04', 'l06'],
        duration: 50,
        warmup: 'Polichinelo 2min + Agachamento 10 reps',
        tip: 'Funcional treina o corpo como uma unidade. Movimento real para a vida real!'
      }
    }
  }
}

export const getDayName = (dayIndex) => {
  const names = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  return names[dayIndex]
}

export const getDayFullName = (dayIndex) => {
  const names = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  return names[dayIndex]
}

export const getWorkoutForDay = (goal, dayIndex) => {
  const plan = workoutPlans[goal]
  if (!plan) return null
  return plan.days[dayIndex] || null
}

export const isRestDay = (goal, dayIndex) => {
  const plan = workoutPlans[goal]
  if (!plan) return true
  return !plan.days[dayIndex]
}

export const getWeeklySchedule = (goal) => {
  const plan = workoutPlans[goal]
  if (!plan) return []

  return [1, 2, 3, 4, 5].map(day => ({
    dayIndex: day,
    dayName: getDayName(day),
    workout: plan.days[day] || null,
    isRest: !plan.days[day]
  }))
}
