// Configurações da aplicação

const APP_CONFIG = {
  name: 'Família Conectada',
  description: 'Rede de Apoio Parental',
  version: '1.0.0',
  
  // Paleta de cores - Regra 60-30-10
  colors: {
    wheat: '#F5DEB3',      // 60% - Cor dominante
    brown: '#8B4513',      // 30% - Cor secundária
    white: '#FFFFFF',      // 10% - Cor de destaque
    softGray: '#E5E5E5',
    darkGray: '#4A4A4A',
    black: '#1A1A1A'
  },
  
  // Tags disponíveis para posts
  tags: [
    'Geral',
    'Desenvolvimento Emocional',
    'Desenvolvimento Motor',
    'Sono e Rotina',
    'Alimentação',
    'Alfabetização',
    'Socialização',
    'Comportamento',
    'Autonomia',
    'Adolescência',
    'Saúde Mental',
    'Redes Sociais',
    'Comunicação',
    'TEA - Autismo',
    'TDAH',
    'Autocuidado',
    'Educação'
  ],
  
  // Tipos de fóruns
  forums: {
    'primeira-infancia': {
      title: 'Primeira Infância (0-3 anos)',
      icon: 'baby',
      description: 'Desenvolvimento, amamentação, marcos motores e cuidados básicos',
      topics: [
        'Desenvolvimento Motor',
        'Alimentação',
        'Sono e Rotina',
        'Amamentação',
        'Vacinas',
        'Primeiros Passos'
      ],
      stats: {
        members: 2847,
        posts: 15234,
        active: 324
      }
    },
    'pre-escola': {
      title: 'Pré-escola (4-6 anos)',
      icon: 'school',
      description: 'Alfabetização, socialização e preparação escolar',
      topics: [
        'Alfabetização',
        'Socialização',
        'Comportamento',
        'Autonomia',
        'Atividades Educativas',
        'Preparação Escolar'
      ],
      stats: {
        members: 1956,
        posts: 8932,
        active: 256
      }
    },
    'adolescencia': {
      title: 'Adolescência',
      icon: 'heart',
      description: 'Comunicação, limites, autonomia e saúde mental na adolescência',
      topics: [
        'Comunicação',
        'Autonomia',
        'Saúde Mental',
        'Redes Sociais',
        'Estudos',
        'Transição para Adulto'
      ],
      stats: {
        members: 1432,
        posts: 6789,
        active: 189
      }
    },
    'necessidades-especiais': {
      title: 'Necessidades Especiais',
      icon: 'heart-handshake',
      description: 'Apoio, recursos e experiências sobre TEA, TDAH e outras condições',
      topics: [
        'TEA - Autismo',
        'TDAH',
        'Inclusão Escolar',
        'Terapias',
        'Direitos',
        'Recursos Especializados'
      ],
      stats: {
        members: 987,
        posts: 4521,
        active: 143
      }
    }
  }
};

// Frases inspiracionais
const INSPIRATIONAL_QUOTES = [
  {
    text: 'Não há escolas para pais, mas há muito amor e muita vontade de acertar. E isso, na maioria das vezes, é suficiente.',
    author: 'Autor Desconhecido'
  },
  {
    text: 'Educar uma criança não é fazê-la aprender algo que não sabia, mas fazer dela alguém que não existia.',
    author: 'John Ruskin'
  },
  {
    text: 'As crianças são como o cimento molhado, tudo o que cai sobre elas deixa uma marca.',
    author: 'Haim Ginott'
  },
  {
    text: 'O melhor presente que os pais podem dar aos filhos é o seu tempo e atenção.',
    author: 'Autor Desconhecido'
  },
  {
    text: 'Cuidar da própria saúde mental é o maior presente que podemos dar aos nossos filhos.',
    author: 'Autor Desconhecido'
  }
];

// Recursos de saúde mental
const MENTAL_HEALTH_RESOURCES = {
  emergency: [
    { name: 'CVV', number: '188', description: '24h - Apoio emocional e prevenção ao suicídio' },
    { name: 'SUS', number: '136', description: 'Informações sobre saúde' },
    { name: 'SAMU', number: '192', description: 'Emergências médicas' },
    { name: 'Disque Denúncia', number: '100', description: 'Violação de direitos humanos' }
  ]
};
