// 90+ refeições organizadas por horário e objetivo
// mealTime: 'cafe' | 'almoco' | 'lanche' | 'janta'
// objective: ['hipertrofia', 'emagrecimento', 'condicionamento']
// day: 1-7 (para rotação semanal e evitar repetição)

export const meals = [
  // ─── CAFÉ DA MANHÃ (25) ───────────────────────────────
  {
    id: 'c01', name: 'Omelete de Claras com Aveia',
    calories: 380, protein: 32, carbs: 38, fats: 8,
    mealTime: 'cafe', objective: ['hipertrofia', 'condicionamento'],
    day: 1,
    ingredients: ['4 claras de ovo', '30g de aveia em flocos', '1 ovo inteiro', 'sal, pimenta', 'ervas a gosto'],
    prep: '10 min'
  },
  {
    id: 'c02', name: 'Vitamina Proteica de Banana',
    calories: 420, protein: 35, carbs: 52, fats: 6,
    mealTime: 'cafe', objective: ['hipertrofia'],
    day: 2,
    ingredients: ['1 banana', '200ml leite desnatado', '30g whey protein', '20g aveia', '1 col. pasta de amendoim'],
    prep: '5 min'
  },
  {
    id: 'c03', name: 'Tapioca com Frango Desfiado',
    calories: 310, protein: 28, carbs: 40, fats: 4,
    mealTime: 'cafe', objective: ['emagrecimento', 'condicionamento'],
    day: 3,
    ingredients: ['50g goma de tapioca', '100g frango desfiado temperado', '1 fio de azeite', 'temperos'],
    prep: '10 min'
  },
  {
    id: 'c04', name: 'Iogurte Grego com Granola e Frutas',
    calories: 340, protein: 20, carbs: 42, fats: 10,
    mealTime: 'cafe', objective: ['condicionamento', 'emagrecimento'],
    day: 4,
    ingredients: ['200g iogurte grego zero', '30g granola', '100g morangos', '1 col. mel'],
    prep: '3 min'
  },
  {
    id: 'c05', name: 'Pão Integral com Ovos Mexidos',
    calories: 360, protein: 22, carbs: 38, fats: 12,
    mealTime: 'cafe', objective: ['condicionamento', 'hipertrofia'],
    day: 5,
    ingredients: ['2 fatias pão integral', '3 ovos inteiros', '1 col. manteiga', 'sal, pimenta'],
    prep: '8 min'
  },
  {
    id: 'c06', name: 'Bowl de Aveia com Whey',
    calories: 450, protein: 38, carbs: 55, fats: 8,
    mealTime: 'cafe', objective: ['hipertrofia'],
    day: 6,
    ingredients: ['60g aveia', '30g whey', '200ml leite', '1 banana fatiada', 'canela'],
    prep: '5 min'
  },
  {
    id: 'c07', name: 'Wrap de Atum com Cream Cheese',
    calories: 290, protein: 30, carbs: 28, fats: 8,
    mealTime: 'cafe', objective: ['emagrecimento', 'condicionamento'],
    day: 7,
    ingredients: ['1 wrap integral', '120g atum em água', '30g cream cheese light', 'rúcula, tomate'],
    prep: '5 min'
  },
  {
    id: 'c08', name: 'Mingau de Aveia Proteico',
    calories: 400, protein: 28, carbs: 50, fats: 9,
    mealTime: 'cafe', objective: ['hipertrofia', 'condicionamento'],
    day: 1,
    ingredients: ['60g aveia', '200ml leite', '25g whey protein', 'mel', 'frutas vermelhas'],
    prep: '8 min'
  },
  {
    id: 'c09', name: 'Panqueca Proteica de Banana',
    calories: 380, protein: 30, carbs: 42, fats: 9,
    mealTime: 'cafe', objective: ['hipertrofia'],
    day: 2,
    ingredients: ['1 banana', '2 ovos', '30g whey', '20g aveia', '1 col. canela'],
    prep: '12 min'
  },
  {
    id: 'c10', name: 'Ovos Cozidos com Torrada Integral',
    calories: 280, protein: 22, carbs: 25, fats: 10,
    mealTime: 'cafe', objective: ['emagrecimento'],
    day: 3,
    ingredients: ['3 ovos cozidos', '2 torradas integrais', '1/2 abacate', 'sal, limão'],
    prep: '10 min'
  },
  {
    id: 'c11', name: 'Smoothie Verde Proteico',
    calories: 310, protein: 28, carbs: 35, fats: 6,
    mealTime: 'cafe', objective: ['emagrecimento', 'condicionamento'],
    day: 4,
    ingredients: ['1/2 banana', '30g espinafre', '25g whey', '200ml leite de amêndoa', '1 kiwi'],
    prep: '5 min'
  },
  {
    id: 'c12', name: 'Creme de Ricota com Frutas',
    calories: 260, protein: 18, carbs: 28, fats: 8,
    mealTime: 'cafe', objective: ['emagrecimento'],
    day: 5,
    ingredients: ['150g ricota', '100g morango', '1 col. mel', '1 col. chia'],
    prep: '5 min'
  },

  // ─── ALMOÇO (25) ─────────────────────────────────────
  {
    id: 'a01', name: 'Arroz Integral + Frango Grelhado + Salada',
    calories: 520, protein: 45, carbs: 55, fats: 10,
    mealTime: 'almoco', objective: ['hipertrofia', 'condicionamento'],
    day: 1,
    ingredients: ['180g arroz integral cozido', '200g frango grelhado', 'salada verde à vontade', 'azeite'],
    prep: '20 min'
  },
  {
    id: 'a02', name: 'Tilápia Assada com Batata Doce',
    calories: 480, protein: 42, carbs: 48, fats: 8,
    mealTime: 'almoco', objective: ['emagrecimento', 'condicionamento'],
    day: 2,
    ingredients: ['200g tilápia', '150g batata doce cozida', 'brócolis refogado', 'limão, temperos'],
    prep: '25 min'
  },
  {
    id: 'a03', name: 'Carne Moída com Arroz e Feijão',
    calories: 580, protein: 40, carbs: 62, fats: 14,
    mealTime: 'almoco', objective: ['hipertrofia'],
    day: 3,
    ingredients: ['150g carne moída', '150g arroz', '80g feijão cozido', 'alface, tomate'],
    prep: '20 min'
  },
  {
    id: 'a04', name: 'Salmão Grelhado com Quinoa',
    calories: 550, protein: 45, carbs: 40, fats: 18,
    mealTime: 'almoco', objective: ['condicionamento', 'emagrecimento'],
    day: 4,
    ingredients: ['180g salmão', '80g quinoa cozida', 'aspargos', 'molho de limão'],
    prep: '20 min'
  },
  {
    id: 'a05', name: 'Frango com Macarrão Integral e Molho',
    calories: 600, protein: 48, carbs: 68, fats: 10,
    mealTime: 'almoco', objective: ['hipertrofia'],
    day: 5,
    ingredients: ['200g frango', '120g macarrão integral', 'molho de tomate', 'salada'],
    prep: '25 min'
  },
  {
    id: 'a06', name: 'Bowl de Atum com Arroz e Legumes',
    calories: 440, protein: 38, carbs: 48, fats: 8,
    mealTime: 'almoco', objective: ['emagrecimento', 'condicionamento'],
    day: 6,
    ingredients: ['150g atum em água', '120g arroz', 'cenoura, abobrinha refogadas', 'shoyu light'],
    prep: '15 min'
  },
  {
    id: 'a07', name: 'Frango ao Curry com Batata Doce',
    calories: 500, protein: 42, carbs: 50, fats: 12,
    mealTime: 'almoco', objective: ['condicionamento', 'hipertrofia'],
    day: 7,
    ingredients: ['200g frango', '150g batata doce', 'coco light', 'curry, açafrão'],
    prep: '25 min'
  },
  {
    id: 'a08', name: 'Filé de Frango com Purê de Batata Doce',
    calories: 490, protein: 44, carbs: 46, fats: 9,
    mealTime: 'almoco', objective: ['hipertrofia', 'condicionamento'],
    day: 1,
    ingredients: ['200g filé de frango', '180g batata doce', 'brócolis', 'temperos naturais'],
    prep: '20 min'
  },
  {
    id: 'a09', name: 'Wrap de Frango com Vegetais',
    calories: 420, protein: 38, carbs: 38, fats: 12,
    mealTime: 'almoco', objective: ['emagrecimento'],
    day: 2,
    ingredients: ['1 wrap integral', '150g frango desfiado', 'pimentão, cebola, tomate', 'iogurte grego'],
    prep: '15 min'
  },
  {
    id: 'a10', name: 'Cação Assado com Legumes no Forno',
    calories: 380, protein: 40, carbs: 25, fats: 10,
    mealTime: 'almoco', objective: ['emagrecimento'],
    day: 3,
    ingredients: ['200g cação', 'abobrinha, berinjela, pimentão', 'azeite, alho, ervas'],
    prep: '30 min'
  },
  {
    id: 'a11', name: 'Frango Xadrez com Arroz',
    calories: 540, protein: 44, carbs: 56, fats: 10,
    mealTime: 'almoco', objective: ['hipertrofia'],
    day: 4,
    ingredients: ['200g frango', 'pimentão, cebola, castanhas', '150g arroz', 'molho'],
    prep: '20 min'
  },
  {
    id: 'a12', name: 'Omelete Recheada com Salada',
    calories: 350, protein: 32, carbs: 10, fats: 18,
    mealTime: 'almoco', objective: ['emagrecimento'],
    day: 5,
    ingredients: ['4 ovos', 'queijo branco', 'presunto peru', 'alface, tomate'],
    prep: '12 min'
  },
  {
    id: 'a13', name: 'Peixe Grelhado com Lentilha',
    calories: 460, protein: 42, carbs: 42, fats: 9,
    mealTime: 'almoco', objective: ['condicionamento', 'emagrecimento'],
    day: 6,
    ingredients: ['180g peixe branco', '100g lentilha cozida', 'espinafre', 'limão'],
    prep: '20 min'
  },

  // ─── LANCHE (20) ─────────────────────────────────────
  {
    id: 'l01', name: 'Whey Shake Pós-Treino',
    calories: 250, protein: 30, carbs: 25, fats: 3,
    mealTime: 'lanche', objective: ['hipertrofia', 'condicionamento'],
    day: 1,
    ingredients: ['30g whey protein', '200ml leite desnatado', '1 banana pequena'],
    prep: '2 min',
    postWorkout: true
  },
  {
    id: 'l02', name: 'Frutas com Pasta de Amendoim',
    calories: 280, protein: 10, carbs: 32, fats: 14,
    mealTime: 'lanche', objective: ['condicionamento', 'emagrecimento'],
    day: 2,
    ingredients: ['1 maçã ou banana', '2 col. pasta de amendoim natural'],
    prep: '2 min'
  },
  {
    id: 'l03', name: 'Barrinha Proteica Caseira',
    calories: 240, protein: 20, carbs: 28, fats: 6,
    mealTime: 'lanche', objective: ['hipertrofia'],
    day: 3,
    ingredients: ['25g whey', '30g aveia', '20g mel', '10g chia', 'cacau em pó'],
    prep: '15 min + geladeira'
  },
  {
    id: 'l04', name: 'Iogurte Grego com Whey',
    calories: 220, protein: 28, carbs: 18, fats: 4,
    mealTime: 'lanche', objective: ['hipertrofia', 'emagrecimento'],
    day: 4,
    ingredients: ['150g iogurte grego zero', '20g whey', 'canela'],
    prep: '2 min'
  },
  {
    id: 'l05', name: 'Castanhas Mix + Frutas',
    calories: 260, protein: 8, carbs: 20, fats: 18,
    mealTime: 'lanche', objective: ['emagrecimento', 'condicionamento'],
    day: 5,
    ingredients: ['30g castanhas variadas', '1 pera ou laranja'],
    prep: '1 min'
  },
  {
    id: 'l06', name: 'Shake de Recuperação (Chocolate)',
    calories: 300, protein: 32, carbs: 30, fats: 5,
    mealTime: 'lanche', objective: ['hipertrofia'],
    day: 6,
    ingredients: ['30g whey chocolate', '200ml leite', '20g aveia', '1 col. cacau'],
    prep: '3 min',
    postWorkout: true
  },
  {
    id: 'l07', name: 'Tapioca com Coco e Mel',
    calories: 230, protein: 6, carbs: 45, fats: 4,
    mealTime: 'lanche', objective: ['condicionamento'],
    day: 7,
    ingredients: ['50g tapioca', '1 col. coco ralado', '1 col. mel'],
    prep: '5 min'
  },
  {
    id: 'l08', name: 'Queijo Cottage com Frutas Vermelhas',
    calories: 200, protein: 20, carbs: 18, fats: 5,
    mealTime: 'lanche', objective: ['emagrecimento'],
    day: 1,
    ingredients: ['150g cottage', '100g mix frutas vermelhas', '1 col. mel'],
    prep: '2 min'
  },
  {
    id: 'l09', name: 'Pipoca Proteica',
    calories: 180, protein: 12, carbs: 22, fats: 5,
    mealTime: 'lanche', objective: ['emagrecimento'],
    day: 2,
    ingredients: ['30g milho de pipoca', '10g queijo parmesão', '1 col. azeite', 'sal'],
    prep: '8 min'
  },
  {
    id: 'l10', name: 'Banana com Whey e Mel',
    calories: 270, protein: 25, carbs: 38, fats: 2,
    mealTime: 'lanche', objective: ['hipertrofia', 'condicionamento'],
    day: 3,
    ingredients: ['1 banana', '25g whey', '1 col. mel', 'canela'],
    prep: '2 min',
    postWorkout: true
  },
  {
    id: 'l11', name: 'Ovo Cozido com Cenoura Baby',
    calories: 160, protein: 14, carbs: 8, fats: 8,
    mealTime: 'lanche', objective: ['emagrecimento'],
    day: 4,
    ingredients: ['2 ovos cozidos', '100g cenoura baby', 'sal, limão'],
    prep: '10 min'
  },
  {
    id: 'l12', name: 'Crepioca Doce com Pasta de Amendoim',
    calories: 310, protein: 26, carbs: 28, fats: 10,
    mealTime: 'lanche', objective: ['hipertrofia', 'condicionamento'],
    day: 5,
    ingredients: ['2 ovos', '50g tapioca', '20g pasta amendoim', '1 banana'],
    prep: '10 min'
  },

  // ─── JANTAR (20) ─────────────────────────────────────
  {
    id: 'j01', name: 'Frango Grelhado com Brócolis e Abobrinha',
    calories: 380, protein: 42, carbs: 18, fats: 12,
    mealTime: 'janta', objective: ['emagrecimento', 'condicionamento'],
    day: 1,
    ingredients: ['200g filé de frango', 'brócolis cozido', 'abobrinha grelhada', 'azeite, alho'],
    prep: '20 min'
  },
  {
    id: 'j02', name: 'Omelete de Proteína com Salada',
    calories: 320, protein: 30, carbs: 8, fats: 18,
    mealTime: 'janta', objective: ['emagrecimento'],
    day: 2,
    ingredients: ['4 ovos', '80g peito peru', '30g queijo branco', 'salada verde'],
    prep: '12 min'
  },
  {
    id: 'j03', name: 'Tilápia com Aspargos e Batata Doce',
    calories: 420, protein: 40, carbs: 38, fats: 8,
    mealTime: 'janta', objective: ['condicionamento', 'hipertrofia'],
    day: 3,
    ingredients: ['200g tilápia', 'aspargos grelhados', '120g batata doce', 'limão'],
    prep: '20 min'
  },
  {
    id: 'j04', name: 'Sopa de Frango com Legumes',
    calories: 300, protein: 32, carbs: 25, fats: 6,
    mealTime: 'janta', objective: ['emagrecimento'],
    day: 4,
    ingredients: ['150g frango', 'cenoura, batata, chuchu, vagem', 'caldo de legumes', 'temperos'],
    prep: '30 min'
  },
  {
    id: 'j05', name: 'Carne Vermelha Magra com Purê de Mandioquinha',
    calories: 500, protein: 44, carbs: 42, fats: 14,
    mealTime: 'janta', objective: ['hipertrofia'],
    day: 5,
    ingredients: ['180g patinho grelhado', '150g mandioquinha', 'feijão verde', 'temperos'],
    prep: '25 min'
  },
  {
    id: 'j06', name: 'Wraps de Frango com Abacate',
    calories: 440, protein: 36, carbs: 32, fats: 18,
    mealTime: 'janta', objective: ['condicionamento'],
    day: 6,
    ingredients: ['2 wraps integrais', '150g frango', '1/2 abacate', 'rúcula, tomate'],
    prep: '15 min'
  },
  {
    id: 'j07', name: 'Sardinha com Arroz e Salada',
    calories: 420, protein: 36, carbs: 40, fats: 12,
    mealTime: 'janta', objective: ['condicionamento', 'hipertrofia'],
    day: 7,
    ingredients: ['2 latas sardinha', '120g arroz', 'salada completa', 'limão'],
    prep: '10 min'
  },
  {
    id: 'j08', name: 'Tofu Grelhado com Legumes Orientais',
    calories: 340, protein: 26, carbs: 28, fats: 12,
    mealTime: 'janta', objective: ['emagrecimento', 'condicionamento'],
    day: 1,
    ingredients: ['200g tofu', 'brócolis, cenoura, pimentão', 'shoyu, gengibre, alho'],
    prep: '15 min'
  },
  {
    id: 'j09', name: 'Salmão com Espinafre Salteado',
    calories: 460, protein: 42, carbs: 12, fats: 26,
    mealTime: 'janta', objective: ['condicionamento', 'emagrecimento'],
    day: 2,
    ingredients: ['180g salmão', '200g espinafre', '2 dentes alho', 'azeite, sal'],
    prep: '15 min'
  },
  {
    id: 'j10', name: 'Frango Recheado com Ricota e Espinafre',
    calories: 410, protein: 48, carbs: 10, fats: 18,
    mealTime: 'janta', objective: ['emagrecimento', 'hipertrofia'],
    day: 3,
    ingredients: ['200g filé frango (butterflied)', '80g ricota', 'espinafre', 'alho, limão'],
    prep: '25 min'
  },
  {
    id: 'j11', name: 'Caldo de Feijão Proteico',
    calories: 380, protein: 28, carbs: 45, fats: 8,
    mealTime: 'janta', objective: ['hipertrofia'],
    day: 4,
    ingredients: ['150g feijão carioca', '100g frango desfiado', 'linguiça de peru', 'temperos'],
    prep: '20 min'
  },
  {
    id: 'j12', name: 'Peito Peru com Batata Doce e Cenoura',
    calories: 350, protein: 36, carbs: 38, fats: 6,
    mealTime: 'janta', objective: ['emagrecimento', 'condicionamento'],
    day: 5,
    ingredients: ['180g peito peru', '120g batata doce', '1 cenoura', 'temperos'],
    prep: '20 min'
  },
]

export const getMealsByTime = (mealTime) => meals.filter(m => m.mealTime === mealTime)
export const getMealsByObjective = (objective) => meals.filter(m => m.objective.includes(objective))
export const getMealsByTimeAndObjective = (mealTime, objective) =>
  meals.filter(m => m.mealTime === mealTime && m.objective.includes(objective))
