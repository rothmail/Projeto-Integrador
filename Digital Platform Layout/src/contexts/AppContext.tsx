import { createContext, useContext, useState, ReactNode } from "react";

// Types
export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  image?: string;
  timeAgo: string;
  likes: number;
  comments: Comment[];
  tag?: string;
  likedBy: string[];
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  location: string;
  image: string;
  isJoined: boolean;
  lastActivity?: string;
  tags?: string[];
  posts: Post[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  duration?: string;
  type: 'online' | 'presencial';
  category: string;
  organizer: string;
  participants: number;
  maxParticipants?: number;
  image?: string;
  isRegistered: boolean;
  location?: string;
  recording?: boolean;
}

export interface Message {
  id: string;
  content: string;
  time: string;
  isOwn: boolean;
  avatar?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isOnline: boolean;
  messages: Message[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'event' | 'message';
  content: string;
  timeAgo: string;
  read: boolean;
  author?: {
    name: string;
    avatar: string;
  };
}

interface AppContextType {
  // Posts
  posts: Post[];
  addPost: (content: string, image?: string, tag?: string) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  deletePost: (postId: string) => void;
  
  // Communities
  communities: Community[];
  joinCommunity: (communityId: string) => void;
  leaveCommunity: (communityId: string) => void;
  createCommunity: (community: Omit<Community, 'id' | 'isJoined' | 'posts'>) => void;
  getCommunityPosts: (communityId: string) => Post[];
  
  // Events
  events: Event[];
  toggleEventRegistration: (eventId: string) => void;
  createEvent: (event: Omit<Event, 'id' | 'participants' | 'isRegistered'>) => void;
  
  // Chats
  chats: Chat[];
  sendMessage: (chatId: string, content: string) => void;
  markChatAsRead: (chatId: string) => void;
  
  // Notifications
  notifications: Notification[];
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // User
  currentUser: {
    name: string;
    avatar: string;
    role: string;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock initial data
const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Marina Silva",
      avatar: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=40&h=40&fit=crop&crop=face",
      role: "Mãe de 2 filhos"
    },
    content: "Hoje tive uma conversa incrível com minha filha de 5 anos sobre sentimentos. Ela me ensinou que às vezes precisamos de um 'abraço do coração' quando estamos tristes. As crianças têm uma sabedoria única, não acham? 💕",
    timeAgo: "2 horas",
    likes: 24,
    comments: [
      {
        id: "c1",
        author: {
          name: "Ana Paula",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face"
        },
        content: "Que lindo! As crianças realmente nos ensinam muito sobre amor e empatia.",
        timeAgo: "1 hora"
      }
    ],
    tag: "Desenvolvimento Emocional",
    likedBy: []
  },
  {
    id: "2",
    author: {
      name: "Carlos Mendes",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      role: "Pai de 1 filho"
    },
    content: "Compartilhando nossa rotina de sono que finalmente funcionou! Depois de meses tentando, descobrimos que a consistência e paciência foram fundamentais. Para quem está passando por noites difíceis: não desistam, cada criança tem seu tempo. 🌙",
    image: "https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=500&h=300&fit=crop",
    timeAgo: "4 horas",
    likes: 31,
    comments: [],
    tag: "Sono e Rotina",
    likedBy: []
  },
  {
    id: "3",
    author: {
      name: "Ana Beatriz",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face",
      role: "Mãe de 3 filhos"
    },
    content: "Reflexão do dia: descobri que cuidar da minha saúde mental é o maior presente que posso dar aos meus filhos. Quando estou bem, consigo ser mais presente, paciente e amorosa. Às vezes o autocuidado não é egoísmo, é necessidade. 🌱",
    timeAgo: "6 horas",
    likes: 45,
    comments: [],
    tag: "Autocuidado",
    likedBy: []
  },
  {
    id: "4",
    author: {
      name: "Roberto Costa",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      role: "Pai de 2 filhos"
    },
    content: "Dica para pais de adolescentes: hoje aprendi que escutar sem julgar é mais poderoso que tentar 'resolver' tudo. Meu filho se abriu comigo de uma forma que não acontecia há meses. Às vezes, eles só precisam ser ouvidos. 👂",
    timeAgo: "8 horas",
    likes: 38,
    comments: [],
    tag: "Adolescência",
    likedBy: []
  },
  {
    id: "5",
    author: {
      name: "Juliana Santos",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      role: "Mãe de 1 filha"
    },
    content: "Minha bebê de 8 meses começou a engatinhar esta semana! 🎉 Foi uma emoção ver ela se movendo pela casa. Alguém tem dicas de como deixar a casa mais segura nessa fase?",
    timeAgo: "3 horas",
    likes: 42,
    comments: [
      {
        id: "c5",
        author: {
          name: "Patricia Lima",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face"
        },
        content: "Parabéns! Comece protegendo tomadas e colocando portões nas escadas. Faz toda diferença!",
        timeAgo: "2 horas"
      }
    ],
    tag: "Desenvolvimento Motor",
    likedBy: []
  },
  {
    id: "6",
    author: {
      name: "Fernando Oliveira",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      role: "Pai de 1 filho"
    },
    content: "Compartilhando nossa rotina de alimentação para bebê de 1 ano. Após muita pesquisa e consultoria com nutricionista, conseguimos estabelecer uma rotina saudável e variada. As primeiras semanas foram desafiadoras, mas a persistência valeu a pena!",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=500&h=300&fit=crop",
    timeAgo: "5 horas",
    likes: 56,
    comments: [],
    tag: "Alimentação",
    likedBy: []
  },
  {
    id: "7",
    author: {
      name: "Camila Rocha",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      role: "Mãe de 2 filhos"
    },
    content: "Hoje meu filho de 5 anos me perguntou por que o céu é azul e eu amei essa curiosidade! 🌈 Procurei atividades sobre cores e ciências adaptadas para a idade dele. Alguém tem sugestões de recursos educativos divertidos?",
    timeAgo: "4 horas",
    likes: 33,
    comments: [],
    tag: "Alfabetização",
    likedBy: []
  },
  {
    id: "8",
    author: {
      name: "Ricardo Alves",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      role: "Pai de 1 filha"
    },
    content: "Minha filha com TEA teve uma grande conquista hoje na escola! Depois de meses de terapia ocupacional, ela conseguiu participar de uma atividade em grupo pela primeira vez. Cada pequeno passo é uma vitória enorme! 💙",
    timeAgo: "6 horas",
    likes: 89,
    comments: [
      {
        id: "c8",
        author: {
          name: "Sandra Martins",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face"
        },
        content: "Que lindo! Essas conquistas são realmente especiais. Parabéns para ela e para vocês!",
        timeAgo: "5 horas"
      }
    ],
    tag: "TEA",
    likedBy: []
  },
  {
    id: "9",
    author: {
      name: "Paula Ferreira",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      role: "Mãe de 1 filho"
    },
    content: "Preciso de ajuda: meu filho de 6 anos está começando a ter dificuldade com a socialização na escola. Ele é mais tímido e prefere brincar sozinho. Alguém passou por isso? Como vocês ajudaram seus filhos?",
    timeAgo: "7 horas",
    likes: 28,
    comments: [
      {
        id: "c9",
        author: {
          name: "Marcos Silva",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
        },
        content: "Passamos por isso. Começamos organizando pequenas brincadeiras com 1 ou 2 colegas em casa. Foi gradual mas ajudou muito!",
        timeAgo: "6 horas"
      }
    ],
    tag: "Socialização",
    likedBy: []
  },
  {
    id: "10",
    author: {
      name: "Beatriz Costa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      role: "Mãe de 1 filha"
    },
    content: "Compartilhando recursos sobre inclusão escolar que me ajudaram muito. Minha filha tem TDAH e encontrar materiais adequados foi desafiador. Criei uma pasta com atividades que funcionaram bem para nós. 📚",
    timeAgo: "9 horas",
    likes: 67,
    comments: [],
    tag: "TDAH",
    likedBy: []
  },
  {
    id: "11",
    author: {
      name: "Lucas Martins",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      role: "Pai de 1 filho"
    },
    content: "Meu filho de 15 anos finalmente aceitou conversar sobre suas dificuldades na escola. Descobri que ele estava enfrentando ansiedade durante as provas. Procuramos ajuda profissional e já vejo melhoras. Não subestimem a importância de criar um espaço seguro para diálogo! 🗣️",
    timeAgo: "5 horas",
    likes: 52,
    comments: [
      {
        id: "c11",
        author: {
          name: "Carla Souza",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
        },
        content: "Que bom que ele se abriu com você! A ansiedade em adolescentes é mais comum do que imaginamos.",
        timeAgo: "4 horas"
      }
    ],
    tag: "Saúde Mental",
    likedBy: []
  },
  {
    id: "12",
    author: {
      name: "Daniela Rocha",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      role: "Mãe de 2 filhos"
    },
    content: "Precisamos falar sobre limites com redes sociais! Minha filha de 14 anos estava passando horas no celular, afetando o sono e os estudos. Estabelecemos regras juntas (não impus!) e o resultado foi muito melhor. Conversar em vez de proibir faz toda diferença. 📱",
    timeAgo: "10 horas",
    likes: 78,
    comments: [],
    tag: "Redes Sociais",
    likedBy: []
  },
  {
    id: "13",
    author: {
      name: "André Silva",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      role: "Pai de 1 filha"
    },
    content: "Descobri que minha filha estava sofrendo bullying na escola. Ela não contou diretamente, percebi pela mudança de comportamento. Pais, fiquem atentos: mudanças bruscas de humor, isolamento, queda no desempenho escolar podem ser sinais. Agimos rápido e ela já está melhor com apoio da escola e psicóloga. 💙",
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=500&h=300&fit=crop",
    timeAgo: "12 horas",
    likes: 94,
    comments: [
      {
        id: "c13",
        author: {
          name: "Mariana Costa",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face"
        },
        content: "Obrigada por compartilhar. É importante estarmos atentos a esses sinais.",
        timeAgo: "11 horas"
      }
    ],
    tag: "Saúde Mental",
    likedBy: []
  },
  {
    id: "14",
    author: {
      name: "Renata Lima",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      role: "Mãe de 1 filho"
    },
    content: "Hoje tive uma conversa importante com meu filho de 16 anos sobre autonomia e responsabilidade. Estamos negociando mais liberdade em troca de mais compromisso com estudos e tarefas. Ele está amadurecendo e preciso aprender a soltar aos poucos. Difícil, mas necessário! 🌱",
    timeAgo: "7 horas",
    likes: 61,
    comments: [],
    tag: "Autonomia",
    likedBy: []
  },
  {
    id: "15",
    author: {
      name: "Gabriel Mendes",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      role: "Pai de 1 filha"
    },
    content: "Minha filha de 17 anos está no processo de escolha de carreira. Como pai, quero orientar sem impor minha vontade. Estamos visitando universidades juntos e conversando sobre suas paixões. É lindo ver ela crescendo e tomando suas próprias decisões! 🎓",
    timeAgo: "14 horas",
    likes: 47,
    comments: [],
    tag: "Transição para Adulto",
    likedBy: []
  }
];

const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Pais de Primeira Viagem - São Paulo",
    description: "Grupo para troca de experiências entre pais de primeira viagem na região de São Paulo",
    members: 847,
    location: "São Paulo, SP",
    image: "https://images.unsplash.com/photo-1656370465119-cb8d6735bda3?w=300&h=200&fit=crop",
    isJoined: true,
    lastActivity: "2 horas atrás",
    posts: []
  },
  {
    id: "2",
    name: "Mães que Trabalham",
    description: "Apoio e dicas para conciliar maternidade e carreira profissional",
    members: 1243,
    location: "Online",
    image: "https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=300&h=200&fit=crop",
    isJoined: true,
    lastActivity: "5 horas atrás",
    posts: []
  },
  {
    id: "3",
    name: "Desenvolvimento Infantil 0-3 anos",
    description: "Discussões sobre marcos do desenvolvimento e atividades para primeira infância",
    members: 956,
    location: "Online",
    image: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=300&h=200&fit=crop",
    isJoined: true,
    lastActivity: "1 dia atrás",
    posts: []
  },
  {
    id: "4",
    name: "Pais de Adolescentes",
    description: "Navegando pelos desafios da adolescência juntos",
    members: 724,
    location: "Online",
    image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop",
    isJoined: false,
    tags: ["Adolescência", "Comunicação", "Limites"],
    posts: []
  },
  {
    id: "5",
    name: "Educação Especial e Inclusão",
    description: "Apoio para famílias de crianças com necessidades especiais",
    members: 432,
    location: "Online",
    image: "https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=300&h=200&fit=crop",
    isJoined: false,
    tags: ["Necessidades Especiais", "Inclusão", "Apoio"],
    posts: []
  },
  {
    id: "6",
    name: "Alimentação Infantil Saudável",
    description: "Dicas e receitas para uma alimentação nutritiva e saborosa",
    members: 1089,
    location: "Online",
    image: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=300&h=200&fit=crop",
    isJoined: false,
    tags: ["Alimentação", "Nutrição", "Receitas"],
    posts: []
  }
];

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Webinar: Desenvolvimento Motor na Primeira Infância",
    description: "Aprenda sobre marcos motores e atividades para estimular o desenvolvimento físico de crianças de 0 a 3 anos.",
    date: "2025-10-15",
    time: "19:00",
    duration: "1h 30min",
    type: "online",
    category: "Desenvolvimento",
    organizer: "Dra. Ana Silva",
    participants: 127,
    maxParticipants: 200,
    image: "https://images.unsplash.com/photo-1703300450387-047da16a89c4?w=400&h=250&fit=crop",
    isRegistered: false
  },
  {
    id: "2",
    title: "Encontro Presencial: Pais de Primeira Viagem - SP",
    description: "Encontro para troca de experiências e formação de rede de apoio entre pais iniciantes.",
    date: "2025-10-18",
    time: "14:00",
    duration: "3h",
    type: "presencial",
    location: "Parque Ibirapuera - São Paulo, SP",
    category: "Encontro",
    organizer: "Comunidade SP",
    participants: 45,
    maxParticipants: 60,
    image: "https://images.unsplash.com/photo-1656370465119-cb8d6735bda3?w=400&h=250&fit=crop",
    isRegistered: true
  },
  {
    id: "3",
    title: "Workshop: Comunicação Não-Violenta com Crianças",
    description: "Técnicas práticas para melhorar a comunicação e resolver conflitos de forma respeitosa.",
    date: "2025-10-22",
    time: "10:00",
    duration: "2h",
    type: "online",
    category: "Comunicação",
    organizer: "Prof. Carlos Mendes",
    participants: 89,
    maxParticipants: 150,
    image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=250&fit=crop",
    isRegistered: false
  },
  {
    id: "4",
    title: "Roda de Conversa: Mães que Trabalham",
    description: "Discussão sobre como equilibrar maternidade e carreira profissional.",
    date: "2025-10-25",
    time: "20:00",
    duration: "1h",
    type: "online",
    category: "Carreira",
    organizer: "Marina Santos",
    participants: 34,
    maxParticipants: 50,
    image: "https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=400&h=250&fit=crop",
    isRegistered: true
  }
];

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Marina Silva",
    avatar: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=40&h=40&fit=crop&crop=face",
    lastMessage: "Obrigada pela dica sobre a rotina de sono! 😊",
    time: "14:30",
    unread: 2,
    isOnline: true,
    messages: [
      {
        id: "1",
        content: "Oi! Vi seu post sobre a rotina de sono. Como vocês conseguiram?",
        time: "14:25",
        isOwn: false,
        avatar: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=40&h=40&fit=crop&crop=face"
      },
      {
        id: "2",
        content: "Oi Marina! Foi um processo gradual. Começamos estabelecendo horários fixos para tudo - banho, jantar, história...",
        time: "14:26",
        isOwn: true
      },
      {
        id: "3",
        content: "A consistência foi fundamental. Nas primeiras semanas foi difícil, mas depois ele começou a se adaptar naturalmente.",
        time: "14:27",
        isOwn: true
      },
      {
        id: "4",
        content: "Obrigada pela dica sobre a rotina de sono! 😊",
        time: "14:30",
        isOwn: false,
        avatar: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=40&h=40&fit=crop&crop=face"
      }
    ]
  },
  {
    id: "2",
    name: "Carlos Mendes",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    lastMessage: "Como foi a consulta com o pediatra?",
    time: "12:15",
    isOnline: false,
    messages: [
      {
        id: "1",
        content: "Como foi a consulta com o pediatra?",
        time: "12:15",
        isOwn: false,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      }
    ]
  }
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    content: "curtiu seu post sobre rotina de sono",
    timeAgo: "5 min",
    read: false,
    author: {
      name: "Marina Silva",
      avatar: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=32&h=32&fit=crop&crop=face"
    }
  },
  {
    id: "2",
    type: "comment",
    content: "comentou em seu post",
    timeAgo: "1 hora",
    read: false,
    author: {
      name: "Carlos Mendes",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
    }
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const currentUser = {
    name: "Maria João",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    role: "Mãe de 1 filho"
  };

  // Posts functions
  const addPost = (content: string, image?: string, tag?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      image,
      timeAgo: "Agora",
      likes: 0,
      comments: [],
      tag,
      likedBy: []
    };
    setPosts([newPost, ...posts]);
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likedBy.includes(currentUser.name);
        return {
          ...post,
          likes: hasLiked ? post.likes - 1 : post.likes + 1,
          likedBy: hasLiked 
            ? post.likedBy.filter(name => name !== currentUser.name)
            : [...post.likedBy, currentUser.name]
        };
      }
      return post;
    }));
  };

  const addComment = (postId: string, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          author: {
            name: currentUser.name,
            avatar: currentUser.avatar
          },
          content,
          timeAgo: "Agora"
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  // Communities functions
  const joinCommunity = (communityId: string) => {
    setCommunities(communities.map(community => {
      if (community.id === communityId) {
        return {
          ...community,
          isJoined: true,
          members: community.members + 1
        };
      }
      return community;
    }));
  };

  const leaveCommunity = (communityId: string) => {
    setCommunities(communities.map(community => {
      if (community.id === communityId) {
        return {
          ...community,
          isJoined: false,
          members: community.members - 1
        };
      }
      return community;
    }));
  };

  const createCommunity = (community: Omit<Community, 'id' | 'isJoined' | 'posts'>) => {
    const newCommunity: Community = {
      ...community,
      id: Date.now().toString(),
      isJoined: true,
      posts: []
    };
    setCommunities([...communities, newCommunity]);
  };

  const getCommunityPosts = (communityId: string) => {
    const community = communities.find(c => c.id === communityId);
    return community?.posts || [];
  };

  // Events functions
  const toggleEventRegistration = (eventId: string) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          isRegistered: !event.isRegistered,
          participants: event.isRegistered ? event.participants - 1 : event.participants + 1
        };
      }
      return event;
    }));
  };

  const createEvent = (event: Omit<Event, 'id' | 'participants' | 'isRegistered'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      participants: 1,
      isRegistered: true
    };
    setEvents([...events, newEvent]);
  };

  // Chats functions
  const sendMessage = (chatId: string, content: string) => {
    setChats(chats.map(chat => {
      if (chat.id === chatId) {
        const newMessage: Message = {
          id: Date.now().toString(),
          content,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          isOwn: true
        };
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: content,
          time: newMessage.time
        };
      }
      return chat;
    }));
  };

  const markChatAsRead = (chatId: string) => {
    setChats(chats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, unread: 0 };
      }
      return chat;
    }));
  };

  // Notifications functions
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    }));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const value: AppContextType = {
    posts,
    addPost,
    toggleLike,
    addComment,
    deletePost,
    communities,
    joinCommunity,
    leaveCommunity,
    createCommunity,
    getCommunityPosts,
    events,
    toggleEventRegistration,
    createEvent,
    chats,
    sendMessage,
    markChatAsRead,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    currentUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
