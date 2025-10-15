// Estado global da aplicação
const AppState = {
    currentPage: 'home',
    currentForum: 'primeira-infancia',
    currentUser: {
        name: 'Maria Silva',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
        role: 'Mãe de 2 filhos'
    },
    currentConversation: null,
    selectedForumFilter: 'todos',
    notifications: [
        {
            id: '1',
            type: 'like',
            content: 'curtiu seu post sobre rotina de sono',
            timeAgo: '5 min',
            read: false,
            author: {
                name: 'Marina Silva',
                avatar: 'https://images.unsplash.com/photo-1600563093202-337471bde37e?w=32&h=32&fit=crop&crop=face'
            }
        },
        {
            id: '2',
            type: 'comment',
            content: 'comentou em seu post',
            timeAgo: '1 hora',
            read: false,
            author: {
                name: 'Carlos Mendes',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
            }
        }
    ],
    posts: [
        {
            id: '1',
            author: {
                name: 'Marina Silva',
                avatar: 'https://images.unsplash.com/photo-1600563093202-337471bde37e?w=40&h=40&fit=crop&crop=face',
                role: 'Mãe de 2 filhos'
            },
            content: 'Hoje tive uma conversa incrível com minha filha de 5 anos sobre sentimentos. Ela me ensinou que às vezes precisamos de um "abraço do coração" quando estamos tristes. As crianças têm uma sabedoria única, não acham? 💕',
            timeAgo: '2 horas',
            likes: 24,
            comments: [
                {
                    id: 'c1',
                    author: {
                        name: 'Ana Paula',
                        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face'
                    },
                    content: 'Que lindo! As crianças realmente nos ensinam muito sobre amor e empatia.',
                    timeAgo: '1 hora'
                }
            ],
            tag: 'Desenvolvimento Emocional',
            likedBy: []
        },
        {
            id: '2',
            author: {
                name: 'Carlos Mendes',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                role: 'Pai de 1 filho'
            },
            content: 'Compartilhando nossa rotina de sono que finalmente funcionou! Depois de meses tentando, descobrimos que a consistência e paciência foram fundamentais. Para quem está passando por noites difíceis: não desistam, cada criança tem seu tempo. 🌙',
            imageUrl: 'https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=500&h=300&fit=crop',
            timeAgo: '4 horas',
            likes: 31,
            comments: [],
            tag: 'Sono e Rotina',
            likedBy: []
        },
        {
            id: '3',
            author: {
                name: 'Ana Beatriz',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face',
                role: 'Mãe de 3 filhos'
            },
            content: 'Reflexão do dia: descobri que cuidar da minha saúde mental é o maior presente que posso dar aos meus filhos. Quando estou bem, consigo ser mais presente, paciente e amorosa. Às vezes o autocuidado não é egoísmo, é necessidade. 🌱',
            timeAgo: '6 horas',
            likes: 45,
            comments: [],
            tag: 'Autocuidado',
            likedBy: []
        },
        {
            id: '4',
            author: {
                name: 'Roberto Costa',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                role: 'Pai de 2 filhos'
            },
            content: 'Dica para pais de adolescentes: hoje aprendi que escutar sem julgar é mais poderoso que tentar "resolver" tudo. Meu filho se abriu comigo de uma forma que não acontecia há meses. Às vezes, eles só precisam ser ouvidos. 👂',
            timeAgo: '8 horas',
            likes: 38,
            comments: [],
            tag: 'Adolescência',
            likedBy: []
        },
        {
            id: '5',
            author: {
                name: 'Juliana Santos',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
                role: 'Mãe de 1 filha'
            },
            content: 'Minha bebê de 8 meses começou a engatinhar esta semana! 🎉 Foi uma emoção ver ela se movendo pela casa. Alguém tem dicas de como deixar a casa mais segura nessa fase?',
            timeAgo: '3 horas',
            likes: 42,
            comments: [
                {
                    id: 'c5',
                    author: {
                        name: 'Patricia Lima',
                        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face'
                    },
                    content: 'Parabéns! Comece protegendo tomadas e colocando portões nas escadas. Faz toda diferença!',
                    timeAgo: '2 horas'
                }
            ],
            tag: 'Desenvolvimento Motor',
            likedBy: []
        }
    ],
    conversations: [
        {
            id: '1',
            participant: {
                name: 'Ana Paula Costa',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                status: 'online'
            },
            lastMessage: 'Muito obrigada pelas dicas sobre o desfralde!',
            timeAgo: '5 min',
            unread: 2,
            messages: [
                {
                    id: 'm1',
                    sender: 'Ana Paula Costa',
                    content: 'Oi! Vi seu comentário no post sobre desfralde',
                    timestamp: '10:30',
                    isOwn: false
                },
                {
                    id: 'm2',
                    sender: 'Maria Silva',
                    content: 'Oi Ana! Como posso ajudar?',
                    timestamp: '10:32',
                    isOwn: true
                },
                {
                    id: 'm3',
                    sender: 'Ana Paula Costa',
                    content: 'Muito obrigada pelas dicas sobre o desfralde!',
                    timestamp: '10:35',
                    isOwn: false
                }
            ]
        },
        {
            id: '2',
            participant: {
                name: 'Roberto Oliveira',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                status: 'offline'
            },
            lastMessage: 'A rotina de sono está funcionando muito bem!',
            timeAgo: '2 horas',
            unread: 0,
            messages: [
                {
                    id: 'm4',
                    sender: 'Roberto Oliveira',
                    content: 'Oi! Queria agradecer pelo apoio',
                    timestamp: '08:15',
                    isOwn: false
                },
                {
                    id: 'm5',
                    sender: 'Maria Silva',
                    content: 'Fico feliz em ajudar! Como está indo?',
                    timestamp: '08:20',
                    isOwn: true
                },
                {
                    id: 'm6',
                    sender: 'Roberto Oliveira',
                    content: 'A rotina de sono está funcionando muito bem!',
                    timestamp: '08:25',
                    isOwn: false
                }
            ]
        },
        {
            id: '3',
            participant: {
                name: 'Camila Rodrigues',
                avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face',
                status: 'online'
            },
            lastMessage: 'Vamos marcar um café virtual?',
            timeAgo: '1 dia',
            unread: 0,
            messages: [
                {
                    id: 'm7',
                    sender: 'Camila Rodrigues',
                    content: 'Adorei seu post sobre autocuidado!',
                    timestamp: 'Ontem 15:30',
                    isOwn: false
                },
                {
                    id: 'm8',
                    sender: 'Maria Silva',
                    content: 'Obrigada! É um tema importante',
                    timestamp: 'Ontem 15:45',
                    isOwn: true
                },
                {
                    id: 'm9',
                    sender: 'Camila Rodrigues',
                    content: 'Vamos marcar um café virtual?',
                    timestamp: 'Ontem 16:00',
                    isOwn: false
                }
            ]
        }
    ],
    communityMembers: [
        {
            id: '1',
            name: 'Ana Paula Costa',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            role: 'Mãe de 3 filhos',
            badges: ['Membro Ativo', 'Apoiadora'],
            postsCount: 47,
            joined: 'Há 6 meses'
        },
        {
            id: '2',
            name: 'Roberto Oliveira',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            role: 'Pai de 1 filho',
            badges: ['Novo Membro'],
            postsCount: 12,
            joined: 'Há 1 mês'
        },
        {
            id: '3',
            name: 'Camila Rodrigues',
            avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
            role: 'Mãe de 2 filhos',
            badges: ['Mentora', 'Moderadora'],
            postsCount: 134,
            joined: 'Há 1 ano'
        },
        {
            id: '4',
            name: 'Carlos Mendes',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
            role: 'Pai de 2 filhos',
            badges: ['Conselheiro'],
            postsCount: 89,
            joined: 'Há 8 meses'
        }
    ],
    events: [
        {
            id: '1',
            title: 'Webinar: Desenvolvimento Motor na Primeira Infância',
            description: 'Aprenda sobre marcos motores e atividades para estimular o desenvolvimento físico de crianças de 0 a 3 anos.',
            date: '2025-10-15',
            time: '19:00',
            duration: '1h 30min',
            type: 'online',
            category: 'Desenvolvimento',
            organizer: 'Dra. Ana Silva',
            participants: 127,
            maxParticipants: 200,
            imageUrl: 'https://images.unsplash.com/photo-1703300450387-047da16a89c4?w=400&h=250&fit=crop',
            isRegistered: false
        },
        {
            id: '2',
            title: 'Encontro Presencial: Pais de Primeira Viagem - SP',
            description: 'Encontro para troca de experiências e formação de rede de apoio entre pais iniciantes.',
            date: '2025-10-18',
            time: '14:00',
            duration: '3h',
            type: 'presencial',
            location: 'Parque Ibirapuera - São Paulo, SP',
            category: 'Encontro',
            organizer: 'Comunidade SP',
            participants: 45,
            maxParticipants: 60,
            imageUrl: 'https://images.unsplash.com/photo-1656370465119-cb8d6735bda3?w=400&h=250&fit=crop',
            isRegistered: true
        },
        {
            id: '3',
            title: 'Workshop: Comunicação Não-Violenta com Crianças',
            description: 'Técnicas práticas para melhorar a comunicação e resolver conflitos de forma respeitosa.',
            date: '2025-10-22',
            time: '10:00',
            duration: '2h',
            type: 'online',
            category: 'Comunicação',
            organizer: 'Prof. Carlos Mendes',
            participants: 89,
            maxParticipants: 150,
            imageUrl: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=250&fit=crop',
            isRegistered: false
        },
        {
            id: '4',
            title: 'Roda de Conversa: Mães que Trabalham',
            description: 'Discussão sobre como equilibrar maternidade e carreira profissional.',
            date: '2025-10-25',
            time: '20:00',
            duration: '1h',
            type: 'online',
            category: 'Carreira',
            organizer: 'Marina Santos',
            participants: 34,
            maxParticipants: 50,
            imageUrl: 'https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=400&h=250&fit=crop',
            isRegistered: true
        }
    ],
    resources: [
        {
            id: '1',
            title: 'Guia Completo: Primeiros Socorros Infantis',
            description: 'Manual detalhado sobre como agir em situações de emergência com crianças',
            category: 'Saúde',
            type: 'pdf',
            downloads: 1240,
            author: 'Dr. João Pediatra',
            date: '2025-09-15'
        },
        {
            id: '2',
            title: 'E-book: Alimentação Saudável para Crianças',
            description: 'Receitas e dicas nutricionais para todas as fases da infância',
            category: 'Nutrição',
            type: 'pdf',
            downloads: 890,
            author: 'Nutricionista Maria Clara',
            date: '2025-08-20'
        },
        {
            id: '3',
            title: 'Vídeo: Como lidar com birras',
            description: 'Estratégias comprovadas para lidar com birras e comportamentos desafiadores',
            category: 'Comportamento',
            type: 'video',
            downloads: 2340,
            author: 'Psicóloga Ana Paula',
            date: '2025-09-05'
        },
        {
            id: '4',
            title: 'Guia: Desenvolvimento de 0-3 anos',
            description: 'Marcos do desenvolvimento e atividades estimulantes',
            category: 'Desenvolvimento',
            type: 'pdf',
            downloads: 1580,
            author: 'Equipe Pedagógica',
            date: '2025-07-10'
        }
    ],
    communities: [
        {
            id: '1',
            name: 'Pais de Primeira Viagem - São Paulo',
            description: 'Grupo para troca de experiências entre pais de primeira viagem na região de São Paulo',
            members: 847,
            location: 'São Paulo, SP',
            imageUrl: 'https://images.unsplash.com/photo-1656370465119-cb8d6735bda3?w=300&h=200&fit=crop',
            isJoined: true,
            lastActivity: '2 horas atrás'
        },
        {
            id: '2',
            name: 'Mães que Trabalham',
            description: 'Apoio e dicas para conciliar maternidade e carreira profissional',
            members: 1243,
            location: 'Online',
            imageUrl: 'https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=300&h=200&fit=crop',
            isJoined: true,
            lastActivity: '5 horas atrás'
        },
        {
            id: '3',
            name: 'Desenvolvimento Infantil 0-3 anos',
            description: 'Discussões sobre marcos do desenvolvimento e atividades para primeira infância',
            members: 956,
            location: 'Online',
            imageUrl: 'https://images.unsplash.com/photo-1600563093202-337471bde37e?w=300&h=200&fit=crop',
            isJoined: true,
            lastActivity: '1 dia atrás'
        },
        {
            id: '4',
            name: 'Pais de Adolescentes',
            description: 'Navegando pelos desafios da adolescência juntos',
            members: 724,
            location: 'Online',
            imageUrl: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop',
            isJoined: false,
            tags: ['Adolescência', 'Comunicação', 'Limites']
        },
        {
            id: '5',
            name: 'Educação Especial e Inclusão',
            description: 'Apoio para famílias de crianças com necessidades especiais',
            members: 432,
            location: 'Online',
            imageUrl: 'https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=300&h=200&fit=crop',
            isJoined: false,
            tags: ['Necessidades Especiais', 'Inclusão', 'Apoio']
        }
    ],
    listeners: []
};

// Funções para gerenciar o estado
function setState(updates) {
    Object.assign(AppState, updates);
    notifyListeners();
}

function subscribe(listener) {
    AppState.listeners.push(listener);
    return () => {
        AppState.listeners = AppState.listeners.filter(l => l !== listener);
    };
}

function notifyListeners() {
    AppState.listeners.forEach(listener => listener(AppState));
}

// Funções de ação para posts
function addPost(content, imageUrl, tag) {
    const newPost = {
        id: generateId(),
        author: AppState.currentUser,
        content,
        imageUrl,
        tag,
        timeAgo: 'Agora',
        likes: 0,
        comments: [],
        likedBy: []
    };

    AppState.posts.unshift(newPost);
    notifyListeners();
}

function toggleLike(postId) {
    const post = AppState.posts.find(p => p.id === postId);
    if (post) {
        const userId = AppState.currentUser.name;
        const index = post.likedBy.indexOf(userId);

        if (index > -1) {
            post.likedBy.splice(index, 1);
            post.likes--;
        } else {
            post.likedBy.push(userId);
            post.likes++;
        }

        notifyListeners();
    }
}

function addComment(postId, content) {
    const post = AppState.posts.find(p => p.id === postId);
    if (post) {
        const newComment = {
            id: generateId(),
            author: {
                name: AppState.currentUser.name,
                avatar: AppState.currentUser.avatar
            },
            content,
            timeAgo: 'Agora'
        };

        post.comments.push(newComment);
        notifyListeners();
    }
}

// Funções de ação para mensagens
function sendMessage(conversationId, content) {
    const conversation = AppState.conversations.find(c => c.id === conversationId);
    if (conversation) {
        const newMessage = {
            id: generateId(),
            sender: AppState.currentUser.name,
            content,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            isOwn: true
        };

        conversation.messages.push(newMessage);
        conversation.lastMessage = content;
        conversation.timeAgo = 'Agora';
        notifyListeners();
    }
}

// Funções de ação para eventos
function toggleEventRegistration(eventId) {
    const event = AppState.events.find(e => e.id === eventId);
    if (event) {
        event.isRegistered = !event.isRegistered;
        event.participants += event.isRegistered ? 1 : -1;
        notifyListeners();
    }
}

// Funções de ação para comunidades
function toggleCommunityJoin(communityId) {
    const community = AppState.communities.find(c => c.id === communityId);
    if (community) {
        community.isJoined = !community.isJoined;
        community.members += community.isJoined ? 1 : -1;
        notifyListeners();
    }
}

// Funções de ação para notificações
function markNotificationAsRead(notificationId) {
    const notification = AppState.notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        notifyListeners();
    }
}

function markAllNotificationsAsRead() {
    AppState.notifications.forEach(n => n.read = true);
    notifyListeners();
}