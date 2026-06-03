export const exercises = [
  // ── PEITO (p01–p08) ─────────────────────────────────────────────────
  {
    id: 'p01', name: 'Supino Reto com Barra',
    group: 'Peito', equipment: 'Barra', difficulty: 'Intermediário',
    sets: 4, reps: '8-12', rest: 90, videoId: null,
    description: 'Deite no banco reto, barra na largura dos ombros. Desça controlado até o peito e empurre para cima mantendo as escápulas retraídas.',
    muscles: ['Peitoral Maior', 'Tríceps', 'Deltóide Anterior'],
    tips: ['Pés firmes no chão', 'Não solte sem apoio', 'Descida em 2-3 segundos']
  },
  {
    id: 'p02', name: 'Supino Inclinado com Halteres',
    group: 'Peito', equipment: 'Halteres', difficulty: 'Intermediário',
    sets: 3, reps: '10-12', rest: 75, videoId: null,
    description: 'Banco a 30-45°. Desça abrindo os braços e empurre juntando os halteres no topo.',
    muscles: ['Peitoral Clavicular', 'Tríceps', 'Deltóide Anterior'],
    tips: ['Não bata os halteres no topo', 'Ativação maior na parte superior']
  },
  {
    id: 'p03', name: 'Crucifixo com Halteres',
    group: 'Peito', equipment: 'Halteres', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Deitado no banco. Abra os braços lateralmente com leve flexão nos cotovelos e retorne fechando.',
    muscles: ['Peitoral Maior', 'Deltóide Anterior'],
    tips: ['Não estique totalmente os cotovelos', 'Use carga mais leve']
  },
  {
    id: 'p04', name: 'Flexão de Braço (Push-up)',
    group: 'Peito', equipment: 'Peso Corporal', difficulty: 'Iniciante',
    sets: 3, reps: '15-20', rest: 60, videoId: null,
    description: 'Posição prancha, mãos na largura dos ombros. Desça até o peito quase tocar o chão.',
    muscles: ['Peitoral', 'Tríceps', 'Core'],
    tips: ['Corpo reto como prancha', 'Cotovelos a 45° do corpo']
  },
  {
    id: 'p05', name: 'Peck Deck (Voador)',
    group: 'Peito', equipment: 'Máquina', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Sentado na máquina. Feche os braços à frente do peito e retorne controlado.',
    muscles: ['Peitoral Maior'],
    tips: ['Esprema o peito no fechamento', 'Movimento controlado']
  },
  {
    id: 'p06', name: 'Crossover no Cabo',
    group: 'Peito', equipment: 'Cabo', difficulty: 'Intermediário',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Cabos nas polias altas. Incline levemente e cruze os cabos na frente do peito.',
    muscles: ['Peitoral Maior', 'Peitoral Esternal'],
    tips: ['Cruzar as mãos maximiza a contração']
  },
  {
    id: 'p07', name: 'Supino Declinado com Barra',
    group: 'Peito', equipment: 'Barra', difficulty: 'Intermediário',
    sets: 3, reps: '8-12', rest: 90, videoId: null,
    description: 'Banco declinado. Foca na parte inferior do peito.',
    muscles: ['Peitoral Esternal', 'Tríceps'],
    tips: ['Pés presos no suporte', 'Descida controlada']
  },
  {
    id: 'p08', name: 'Flexão Diamante',
    group: 'Peito', equipment: 'Peso Corporal', difficulty: 'Avançado',
    sets: 3, reps: '10-15', rest: 75, videoId: null,
    description: 'Flexão com as mãos juntas formando um losango. Ativa mais o tríceps.',
    muscles: ['Peitoral Central', 'Tríceps'],
    tips: ['Mãos formam losango', 'Modificação: joelhos no chão']
  },

  // ── COSTAS (c01–c08) ─────────────────────────────────────────────────
  {
    id: 'c01', name: 'Puxada na Frente (Lat Pulldown)',
    group: 'Costas', equipment: 'Cabo', difficulty: 'Iniciante',
    sets: 4, reps: '10-12', rest: 75, videoId: null,
    description: 'Puxe a barra até a altura do queixo, espremendo as costas.',
    muscles: ['Grande Dorsal', 'Bíceps', 'Romboides'],
    tips: ['Puxe com as costas, não os braços', 'Leve inclinação para trás']
  },
  {
    id: 'c02', name: 'Remada Curvada com Barra',
    group: 'Costas', equipment: 'Barra', difficulty: 'Intermediário',
    sets: 4, reps: '8-12', rest: 90, videoId: null,
    description: 'Tronco inclinado 45°. Traga a barra até o abdômen puxando os cotovelos para trás.',
    muscles: ['Grande Dorsal', 'Romboides', 'Trapézio', 'Bíceps'],
    tips: ['Coluna neutra', 'Não use impulso do quadril']
  },
  {
    id: 'c03', name: 'Remada Unilateral com Haltere',
    group: 'Costas', equipment: 'Halteres', difficulty: 'Iniciante',
    sets: 3, reps: '10-12', rest: 60, videoId: null,
    description: 'Apoie joelho e mão no banco. Puxe o haltere até a cintura.',
    muscles: ['Grande Dorsal', 'Romboides', 'Bíceps'],
    tips: ['Cotovelo rente ao corpo', 'Não rotacione o quadril']
  },
  {
    id: 'c04', name: 'Levantamento Terra',
    group: 'Costas', equipment: 'Barra', difficulty: 'Avançado',
    sets: 4, reps: '5-8', rest: 120, videoId: null,
    description: 'Barra no chão. Agache, segure e levante mantendo a coluna reta.',
    muscles: ['Eretores da Espinha', 'Glúteos', 'Isquiotibiais', 'Grande Dorsal'],
    tips: ['Coluna reta é ESSENCIAL', 'Barra rente ao corpo']
  },
  {
    id: 'c05', name: 'Barra Fixa (Pull-up)',
    group: 'Costas', equipment: 'Barra Fixa', difficulty: 'Avançado',
    sets: 3, reps: '6-10', rest: 90, videoId: null,
    description: 'Pegada pronada. Puxe o queixo acima da barra espremendo as costas.',
    muscles: ['Grande Dorsal', 'Bíceps', 'Core'],
    tips: ['Escápulas ativas antes de puxar', 'Elástico para assistência']
  },
  {
    id: 'c06', name: 'Puxada Neutra (Close Grip)',
    group: 'Costas', equipment: 'Cabo', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Barra V na polia. Puxe até o abdômen com cotovelos próximos ao corpo.',
    muscles: ['Grande Dorsal', 'Bíceps'],
    tips: ['Pegada neutra é mais confortável', 'Esprema costas no final']
  },
  {
    id: 'c07', name: 'Pullover com Haltere',
    group: 'Costas', equipment: 'Halteres', difficulty: 'Intermediário',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Deitado transversal no banco. Passe o haltere atrás da cabeça.',
    muscles: ['Grande Dorsal', 'Serrátil'],
    tips: ['Amplitude máxima', 'Cotovelos levemente flexionados']
  },
  {
    id: 'c08', name: 'Remada Cavalinho (T-Bar)',
    group: 'Costas', equipment: 'Barra', difficulty: 'Intermediário',
    sets: 3, reps: '10-12', rest: 75, videoId: null,
    description: 'Barra fixada em canto. Tronco inclinado, puxe para o abdômen.',
    muscles: ['Grande Dorsal', 'Romboides', 'Trapézio'],
    tips: ['Pegada mais larga = mais costas', 'Coluna neutra']
  },

  // ── PERNAS (l01–l10) ─────────────────────────────────────────────────
  {
    id: 'l01', name: 'Agachamento Livre',
    group: 'Pernas', equipment: 'Barra', difficulty: 'Intermediário',
    sets: 4, reps: '8-12', rest: 90, videoId: null,
    description: 'Barra nas costas, pés na largura dos ombros. Agache até as coxas paralelas.',
    muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais', 'Core'],
    tips: ['Joelhos na direção dos pés', 'Peso nos calcanhares']
  },
  {
    id: 'l02', name: 'Leg Press 45°',
    group: 'Pernas', equipment: 'Máquina', difficulty: 'Iniciante',
    sets: 4, reps: '10-15', rest: 75, videoId: null,
    description: 'Pés no centro da plataforma. Desça até 90° de joelho.',
    muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais'],
    tips: ['Não trave os joelhos no topo', 'Pés mais altos = mais glúteo']
  },
  {
    id: 'l03', name: 'Cadeira Extensora',
    group: 'Pernas', equipment: 'Máquina', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Estenda os joelhos contra a resistência. Isolado para quadríceps.',
    muscles: ['Quadríceps'],
    tips: ['Esprema no topo', 'Retorne controlado']
  },
  {
    id: 'l04', name: 'Mesa Flexora',
    group: 'Pernas', equipment: 'Máquina', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Deitado na mesa. Puxe os calcanhares em direção aos glúteos.',
    muscles: ['Isquiotibiais', 'Gastrocnêmio'],
    tips: ['Quadril no banco', 'Esprema no topo']
  },
  {
    id: 'l05', name: 'Agachamento Sumô',
    group: 'Pernas', equipment: 'Halteres', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Pés bem abertos, dedos para fora. Segure haltere no centro.',
    muscles: ['Adutores', 'Glúteos', 'Quadríceps'],
    tips: ['Joelhos na direção dos dedos', 'Tronco ereto']
  },
  {
    id: 'l06', name: 'Afundo (Lunge)',
    group: 'Pernas', equipment: 'Halteres', difficulty: 'Intermediário',
    sets: 3, reps: '10-12', rest: 60, videoId: null,
    description: 'Passo à frente, flexione os dois joelhos a 90°. Alterne as pernas.',
    muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais'],
    tips: ['Joelho da frente não ultrapassa o pé', 'Tronco ereto']
  },
  {
    id: 'l07', name: 'Stiff com Barra',
    group: 'Pernas', equipment: 'Barra', difficulty: 'Intermediário',
    sets: 3, reps: '10-12', rest: 75, videoId: null,
    description: 'Pernas quase estendidas. Incline o tronco descendo a barra com coluna reta.',
    muscles: ['Isquiotibiais', 'Glúteos', 'Eretores da Espinha'],
    tips: ['Sinta o alongamento nos isquiotibiais', 'Não arredonde as costas']
  },
  {
    id: 'l08', name: 'Panturrilha em Pé',
    group: 'Pernas', equipment: 'Máquina', difficulty: 'Iniciante',
    sets: 4, reps: '15-20', rest: 45, videoId: null,
    description: 'No step, suba na ponta dos pés até o máximo e desça abaixo do nível.',
    muscles: ['Gastrocnêmio', 'Sóleo'],
    tips: ['Amplitude total', 'Segure no topo 1 segundo']
  },
  {
    id: 'l09', name: 'Hack Squat',
    group: 'Pernas', equipment: 'Máquina', difficulty: 'Intermediário',
    sets: 4, reps: '10-12', rest: 75, videoId: null,
    description: 'Na máquina. Pés no centro, desça até 90° e empurre voltando.',
    muscles: ['Quadríceps', 'Glúteos'],
    tips: ['Pés mais à frente = mais glúteo', 'Mais atrás = mais quadríceps']
  },
  {
    id: 'l10', name: 'Agachamento Búlgaro',
    group: 'Pernas', equipment: 'Halteres', difficulty: 'Avançado',
    sets: 3, reps: '10-12', rest: 90, videoId: null,
    description: 'Pé traseiro apoiado no banco. Agache na perna da frente.',
    muscles: ['Quadríceps', 'Glúteos', 'Estabilizadores'],
    tips: ['Equilíbrio é o desafio', 'Joelho da frente alinhado']
  },

  // ── OMBROS (o01–o06) ─────────────────────────────────────────────────
  {
    id: 'o01', name: 'Desenvolvimento com Halteres',
    group: 'Ombros', equipment: 'Halteres', difficulty: 'Intermediário',
    sets: 4, reps: '8-12', rest: 75, videoId: null,
    description: 'Halteres na altura dos ombros. Empurre acima da cabeça e retorne.',
    muscles: ['Deltóide Anterior e Médio', 'Tríceps'],
    tips: ['Não arqueie as costas', 'Core contraído']
  },
  {
    id: 'o02', name: 'Elevação Lateral',
    group: 'Ombros', equipment: 'Halteres', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Eleve lateralmente até a altura dos ombros com leve flexão de cotovelo.',
    muscles: ['Deltóide Médio'],
    tips: ['Não balance o tronco', 'Use carga leve com qualidade']
  },
  {
    id: 'o03', name: 'Elevação Frontal',
    group: 'Ombros', equipment: 'Halteres', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Eleve um braço de cada vez até a altura dos ombros.',
    muscles: ['Deltóide Anterior'],
    tips: ['Controlado e sem impulso', 'Polegares para cima']
  },
  {
    id: 'o04', name: 'Desenvolvimento Arnold',
    group: 'Ombros', equipment: 'Halteres', difficulty: 'Intermediário',
    sets: 3, reps: '10-12', rest: 75, videoId: null,
    description: 'Começa com halteres à frente, gira os pulsos ao empurrar para cima.',
    muscles: ['Deltóide Completo', 'Tríceps'],
    tips: ['Rotação suave e controlada', 'Ativa todos os feixes do deltóide']
  },
  {
    id: 'o05', name: 'Encolhimento de Ombros (Shrug)',
    group: 'Ombros', equipment: 'Halteres', difficulty: 'Iniciante',
    sets: 3, reps: '15-20', rest: 45, videoId: null,
    description: 'Encolha os ombros em direção às orelhas e segure 1 segundo.',
    muscles: ['Trapézio Superior'],
    tips: ['Não rotacione os ombros', 'Esprema no topo']
  },
  {
    id: 'o06', name: 'Remada Alta',
    group: 'Ombros', equipment: 'Barra', difficulty: 'Intermediário',
    sets: 3, reps: '10-12', rest: 60, videoId: null,
    description: 'Segure a barra com pegada fechada. Puxe em direção ao queixo.',
    muscles: ['Deltóide Médio', 'Trapézio', 'Bíceps'],
    tips: ['Cotovelos sempre acima das mãos']
  },

  // ── BÍCEPS (bi01–bi05) ────────────────────────────────────────────────
  {
    id: 'bi01', name: 'Rosca Direta com Barra',
    group: 'Bíceps', equipment: 'Barra', difficulty: 'Iniciante',
    sets: 3, reps: '10-12', rest: 60, videoId: null,
    description: 'Flexione os cotovelos trazendo a barra até os ombros.',
    muscles: ['Bíceps Braquial', 'Braquial'],
    tips: ['Cotovelos fixos ao corpo', 'Não balance o tronco']
  },
  {
    id: 'bi02', name: 'Rosca Alternada com Halteres',
    group: 'Bíceps', equipment: 'Halteres', difficulty: 'Iniciante',
    sets: 3, reps: '10-12', rest: 60, videoId: null,
    description: 'Flexione um braço de cada vez girando o punho (supinação).',
    muscles: ['Bíceps Braquial'],
    tips: ['Gire o punho no topo', 'Cotovelo fixo']
  },
  {
    id: 'bi03', name: 'Rosca Concentrada',
    group: 'Bíceps', equipment: 'Halteres', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 45, videoId: null,
    description: 'Cotovelo apoiado na coxa. Curle o haltere de forma concentrada.',
    muscles: ['Bíceps Braquial (Pico)'],
    tips: ['Cotovelo no suporte', 'Esprema forte no topo']
  },
  {
    id: 'bi04', name: 'Rosca Martelo',
    group: 'Bíceps', equipment: 'Halteres', difficulty: 'Iniciante',
    sets: 3, reps: '10-12', rest: 60, videoId: null,
    description: 'Pegada neutra (polegar para cima). Flexione mantendo o punho neutro.',
    muscles: ['Braquial', 'Braquiorradial'],
    tips: ['Não gire o punho', 'Ativa o braquial profundo']
  },
  {
    id: 'bi05', name: 'Rosca no Cabo',
    group: 'Bíceps', equipment: 'Cabo', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 45, videoId: null,
    description: 'Polia baixa com barra reta. Flexione com tensão constante.',
    muscles: ['Bíceps Braquial'],
    tips: ['Tensão constante do cabo', 'Ideal como finalizador']
  },

  // ── TRÍCEPS (tri01–tri05) ─────────────────────────────────────────────
  {
    id: 'tri01', name: 'Tríceps Pulley (Corda)',
    group: 'Tríceps', equipment: 'Cabo', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Polia alta com corda. Cotovelos fixos. Estenda os braços separando a corda.',
    muscles: ['Tríceps (3 cabeças)'],
    tips: ['Cotovelos fixos', 'Separe a corda no final']
  },
  {
    id: 'tri02', name: 'Tríceps Francês com Haltere',
    group: 'Tríceps', equipment: 'Halteres', difficulty: 'Intermediário',
    sets: 3, reps: '10-12', rest: 60, videoId: null,
    description: 'Haltere acima da cabeça, desça atrás da cabeça flexionando os cotovelos.',
    muscles: ['Tríceps Longa Cabeça'],
    tips: ['Cotovelos apontando para cima', 'Use carga moderada']
  },
  {
    id: 'tri03', name: 'Mergulho (Dips)',
    group: 'Tríceps', equipment: 'Peso Corporal', difficulty: 'Avançado',
    sets: 3, reps: '8-12', rest: 75, videoId: null,
    description: 'Nas paralelas. Flexione os cotovelos descendo o corpo e empurre voltando.',
    muscles: ['Tríceps', 'Peitoral'],
    tips: ['Tronco ereto = mais tríceps', 'Escápulas retraídas']
  },
  {
    id: 'tri04', name: 'Coice de Tríceps',
    group: 'Tríceps', equipment: 'Halteres', difficulty: 'Iniciante',
    sets: 3, reps: '12-15', rest: 45, videoId: null,
    description: 'Tronco inclinado. Estenda o braço para trás com cotovelo fixo.',
    muscles: ['Tríceps Lateral'],
    tips: ['Cotovelo fixo ao lado do corpo', 'Esprema no topo']
  },
  {
    id: 'tri05', name: 'Tríceps no Banco',
    group: 'Tríceps', equipment: 'Peso Corporal', difficulty: 'Iniciante',
    sets: 3, reps: '15-20', rest: 45, videoId: null,
    description: 'Mãos no banco atrás do corpo. Flexione os cotovelos e empurre voltando.',
    muscles: ['Tríceps'],
    tips: ['Costas próximas ao banco', 'Versão fácil: joelhos dobrados']
  },

  // ── ABDÔMEN (ab01–ab05) ──────────────────────────────────────────────
  {
    id: 'ab01', name: 'Abdominal Supra',
    group: 'Abdômen', equipment: 'Peso Corporal', difficulty: 'Iniciante',
    sets: 3, reps: '20-25', rest: 45, videoId: null,
    description: 'Joelhos dobrados. Contraia o abdômen e eleve os ombros do chão.',
    muscles: ['Reto Abdominal Superior'],
    tips: ['Foco na contração', 'Não puxe o pescoço']
  },
  {
    id: 'ab02', name: 'Prancha Isométrica',
    group: 'Abdômen', equipment: 'Peso Corporal', difficulty: 'Iniciante',
    sets: 3, reps: '30-60s', rest: 45, videoId: null,
    description: 'Apoio nos antebraços e pontas dos pés. Corpo reto pelo tempo determinado.',
    muscles: ['Core Completo', 'Glúteos'],
    tips: ['Quadril no nível do corpo', 'Respire normalmente']
  },
  {
    id: 'ab03', name: 'Abdominal Bicicleta',
    group: 'Abdômen', equipment: 'Peso Corporal', difficulty: 'Intermediário',
    sets: 3, reps: '20-30', rest: 45, videoId: null,
    description: 'Alterne cotovelo com joelho oposto em movimento de pedalada.',
    muscles: ['Oblíquos', 'Reto Abdominal'],
    tips: ['Movimento lento e controlado', 'Perna estendida quase paralela ao chão']
  },
  {
    id: 'ab04', name: 'Russian Twist',
    group: 'Abdômen', equipment: 'Peso Corporal', difficulty: 'Intermediário',
    sets: 3, reps: '20-30', rest: 45, videoId: null,
    description: 'Sentado com tronco inclinado. Gire o tronco de lado a lado.',
    muscles: ['Oblíquos', 'Reto Abdominal'],
    tips: ['Pés elevados para dificultar', 'Rotação real do tronco']
  },
  {
    id: 'ab05', name: 'Elevação de Pernas na Barra',
    group: 'Abdômen', equipment: 'Barra Fixa', difficulty: 'Avançado',
    sets: 3, reps: '12-15', rest: 60, videoId: null,
    description: 'Pendurado na barra. Eleve as pernas retas até 90°.',
    muscles: ['Reto Abdominal Inferior'],
    tips: ['Sem balanço', 'Joelhos ao peito é mais fácil']
  },

  // ── GLÚTEO (g01–g05) ─────────────────────────────────────────────────
  {
    id: 'g01', name: 'Hip Thrust com Barra',
    group: 'Glúteo', equipment: 'Barra', difficulty: 'Intermediário',
    sets: 4, reps: '10-15', rest: 75, videoId: null,
    description: 'Ombros no banco, barra no quadril. Empurre o quadril para cima espremendo os glúteos.',
    muscles: ['Glúteo Máximo', 'Isquiotibiais'],
    tips: ['Esprema FORTE no topo', 'Melhor exercício para glúteo']
  },
  {
    id: 'g02', name: 'Elevação de Quadril (Glute Bridge)',
    group: 'Glúteo', equipment: 'Peso Corporal', difficulty: 'Iniciante',
    sets: 3, reps: '15-20', rest: 45, videoId: null,
    description: 'Deitado, joelhos dobrados. Eleve o quadril contraindo os glúteos.',
    muscles: ['Glúteo Máximo', 'Isquiotibiais'],
    tips: ['Adicione anilha para progredir', 'Esprema no topo']
  },
  {
    id: 'g03', name: 'Kickback no Cabo',
    group: 'Glúteo', equipment: 'Cabo', difficulty: 'Iniciante',
    sets: 3, reps: '15-20', rest: 45, videoId: null,
    description: 'Tornozeiro na polia. Incline levemente e empurre a perna para trás.',
    muscles: ['Glúteo Máximo'],
    tips: ['Não gire o quadril', 'Foco na contração']
  },
  {
    id: 'g04', name: 'Abdução de Quadril na Máquina',
    group: 'Glúteo', equipment: 'Máquina', difficulty: 'Iniciante',
    sets: 3, reps: '15-20', rest: 45, videoId: null,
    description: 'Sentado na cadeira abdutora. Abra as pernas contra a resistência.',
    muscles: ['Glúteo Médio'],
    tips: ['Segure 1 segundo na abertura', 'Ótimo para glúteo médio']
  },
  {
    id: 'g05', name: 'Agachamento com Elástico',
    group: 'Glúteo', equipment: 'Elástico', difficulty: 'Iniciante',
    sets: 3, reps: '15-20', rest: 45, videoId: null,
    description: 'Elástico acima dos joelhos. Agache e pressione os joelhos para fora.',
    muscles: ['Glúteo Médio', 'Glúteo Máximo'],
    tips: ['Ideal para ativar glúteo médio', 'Ótimo warmup também']
  },

  // ── CARDIO (card01–card05) ────────────────────────────────────────────
  {
    id: 'card01', name: 'HIIT na Esteira',
    group: 'Cardio', equipment: 'Esteira', difficulty: 'Intermediário',
    sets: 8, reps: '20s sprint / 40s caminhada', rest: 0, videoId: null,
    description: '8 rounds: 20s velocidade máxima + 40s caminhada. Total ~8 minutos.',
    muscles: ['Sistema Cardiovascular', 'Pernas'],
    tips: ['Aqueça 3 min antes', 'Sprint em 85-90% da FC máx']
  },
  {
    id: 'card02', name: 'Burpee',
    group: 'Cardio', equipment: 'Peso Corporal', difficulty: 'Avançado',
    sets: 4, reps: '10-15', rest: 60, videoId: null,
    description: 'Agache, apoie as mãos, jogue as pernas para trás, volte e salte.',
    muscles: ['Full Body', 'Sistema Cardiovascular'],
    tips: ['Ritmo constante > velocidade', 'Modifique sem o salto']
  },
  {
    id: 'card03', name: 'Polichinelo (Jumping Jack)',
    group: 'Cardio', equipment: 'Peso Corporal', difficulty: 'Iniciante',
    sets: 3, reps: '30-60s', rest: 30, videoId: null,
    description: 'Salte abrindo pernas e levantando braços simultaneamente.',
    muscles: ['Sistema Cardiovascular'],
    tips: ['Ótimo para aquecimento', 'Joelhos levemente flexionados']
  },
  {
    id: 'card04', name: 'Mountain Climber',
    group: 'Cardio', equipment: 'Peso Corporal', difficulty: 'Intermediário',
    sets: 3, reps: '30-45s', rest: 30, videoId: null,
    description: 'Posição prancha. Alterne puxando os joelhos em direção ao peito.',
    muscles: ['Core', 'Ombros', 'Sistema Cardiovascular'],
    tips: ['Quadril no nível do corpo', 'Mais rápido = mais cardio']
  },
  {
    id: 'card05', name: 'Corda Naval (Battle Rope)',
    group: 'Cardio', equipment: 'Corda Naval', difficulty: 'Avançado',
    sets: 5, reps: '30s', rest: 30, videoId: null,
    description: 'Ondule alternando os braços em máxima intensidade.',
    muscles: ['Ombros', 'Core', 'Sistema Cardiovascular'],
    tips: ['Joelhos flexionados', 'Intensidade máxima em cada série']
  },

  // ── FUNCIONAL (fun01–fun05) ───────────────────────────────────────────
  {
    id: 'fun01', name: 'Swing com Kettlebell',
    group: 'Funcional', equipment: 'Kettlebell', difficulty: 'Intermediário',
    sets: 4, reps: '15-20', rest: 60, videoId: null,
    description: 'Kettlebell entre as pernas. Impulsione com os quadris balançando até a altura dos ombros.',
    muscles: ['Glúteos', 'Isquiotibiais', 'Core'],
    tips: ['Movimento é do quadril, não dos braços', 'Esprema os glúteos ao subir']
  },
  {
    id: 'fun02', name: 'Box Jump',
    group: 'Funcional', equipment: 'Caixa', difficulty: 'Intermediário',
    sets: 4, reps: '8-10', rest: 60, videoId: null,
    description: 'Agache levemente e salte com os dois pés sobre o box.',
    muscles: ['Quadríceps', 'Glúteos'],
    tips: ['Aterrisse suave com joelhos flexionados', 'Comece com box baixo']
  },
  {
    id: 'fun03', name: 'Turkish Get Up',
    group: 'Funcional', equipment: 'Kettlebell', difficulty: 'Avançado',
    sets: 3, reps: '3-5', rest: 90, videoId: null,
    description: 'Deitado com kettlebell estendido. Levante-se mantendo o kettlebell acima.',
    muscles: ['Full Body', 'Estabilizadores'],
    tips: ['Movimento lento e controlado', 'Olhe para o kettlebell']
  },
  {
    id: 'fun04', name: 'Prancha com Elevação de Braço',
    group: 'Funcional', equipment: 'Peso Corporal', difficulty: 'Intermediário',
    sets: 3, reps: '10-12', rest: 45, videoId: null,
    description: 'Posição prancha alta. Alterne elevando cada braço à frente.',
    muscles: ['Core', 'Ombros'],
    tips: ['Não balance o quadril', 'Pés mais afastados = mais estável']
  },
  {
    id: 'fun05', name: 'Agachamento com Salto',
    group: 'Funcional', equipment: 'Peso Corporal', difficulty: 'Intermediário',
    sets: 4, reps: '10-15', rest: 60, videoId: null,
    description: 'Agache e ao subir salte o mais alto possível. Aterrisse suavemente.',
    muscles: ['Quadríceps', 'Glúteos', 'Cardiovascular'],
    tips: ['Aterrisse com joelhos flexionados', 'Braços ajudam no impulso']
  },
]

export const getExerciseById = (id) => exercises.find(e => e.id === id)
export const getExercisesByGroup = (group) => exercises.filter(e => e.group === group)
export const muscleGroups = [...new Set(exercises.map(e => e.group))]
