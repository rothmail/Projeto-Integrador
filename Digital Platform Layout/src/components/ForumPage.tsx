import { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Filter,
  Baby,
  School,
  HeartHandshake,
  Heart,
  BookOpen,
  Calendar
} from "lucide-react";

export type ForumType = 'primeira-infancia' | 'pre-escola' | 'necessidades-especiais' | 'adolescencia';

interface ForumPageProps {
  forumType: ForumType;
}

interface ForumConfig {
  title: string;
  description: string;
  icon: JSX.Element;
  ageRange: string;
  color: string;
  topics: string[];
  guidelines: string[];
}

const forumConfigs: Record<ForumType, ForumConfig> = {
  'primeira-infancia': {
    title: 'Primeira Infância (0-3 anos)',
    description: 'Espaço dedicado aos desafios e alegrias dos primeiros anos de vida. Compartilhe experiências sobre desenvolvimento motor, cognitivo, emocional e marcos importantes dessa fase fundamental.',
    icon: <Baby className="w-6 h-6" />,
    ageRange: '0-3 anos',
    color: 'bg-blue-500/10',
    topics: [
      'Desenvolvimento Motor',
      'Sono e Rotina',
      'Alimentação',
      'Marcos do Desenvolvimento',
      'Amamentação',
      'Fraldas e Desfralde',
      'Primeiras Palavras',
      'Estimulação Precoce'
    ],
    guidelines: [
      'Compartilhe experiências respeitosas sobre o desenvolvimento infantil',
      'Evite julgamentos sobre diferentes estilos parentais',
      'Consulte sempre profissionais de saúde para questões médicas',
      'Respeite o ritmo e individualidade de cada criança'
    ]
  },
  'pre-escola': {
    title: 'Pré-escola (4-6 anos)',
    description: 'Comunidade para pais e responsáveis de crianças em idade pré-escolar. Discuta sobre alfabetização, socialização, preparação para a escola e desenvolvimento da autonomia.',
    icon: <School className="w-6 h-6" />,
    ageRange: '4-6 anos',
    color: 'bg-green-500/10',
    topics: [
      'Alfabetização',
      'Socialização',
      'Preparação Escolar',
      'Autonomia',
      'Comportamento',
      'Birras e Limites',
      'Atividades Lúdicas',
      'Medos Infantis'
    ],
    guidelines: [
      'Valorize o aprendizado através da brincadeira',
      'Compartilhe atividades e recursos pedagógicos',
      'Respeite diferentes métodos educacionais',
      'Promova discussões construtivas sobre comportamento'
    ]
  },
  'necessidades-especiais': {
    title: 'Necessidades Especiais',
    description: 'Rede de apoio para famílias de crianças com necessidades especiais. Um espaço seguro para compartilhar desafios, conquistas, recursos e informações sobre inclusão, terapias e direitos.',
    icon: <HeartHandshake className="w-6 h-6" />,
    ageRange: 'Todas as idades',
    color: 'bg-purple-500/10',
    topics: [
      'TEA - Autismo',
      'TDAH',
      'Síndrome de Down',
      'Deficiência Física',
      'Deficiência Intelectual',
      'Terapias',
      'Inclusão Escolar',
      'Direitos e Legislação'
    ],
    guidelines: [
      'Mantenha um ambiente de respeito e empatia',
      'Compartilhe recursos, terapias e experiências positivas',
      'Evite comparações entre crianças',
      'Valorize cada pequena conquista',
      'Respeite a privacidade das famílias'
    ]
  },
  'adolescencia': {
    title: 'Adolescência',
    description: 'Fórum dedicado aos desafios únicos da adolescência. Navegue por temas como comunicação, autonomia, identidade, tecnologia e saúde mental dos adolescentes.',
    icon: <Heart className="w-6 h-6" />,
    ageRange: '13-17 anos',
    color: 'bg-orange-500/10',
    topics: [
      'Comunicação',
      'Autonomia e Limites',
      'Identidade e Autoestima',
      'Redes Sociais',
      'Saúde Mental',
      'Desempenho Escolar',
      'Relacionamentos',
      'Transição para Adulto'
    ],
    guidelines: [
      'Respeite a privacidade e individualidade dos adolescentes',
      'Mantenha diálogo aberto sem julgamentos',
      'Valorize a autonomia progressiva dos jovens',
      'Compartilhe experiências de forma construtiva',
      'Busque sempre equilíbrio entre proteção e liberdade'
    ]
  }
};

export function ForumPage({ forumType }: ForumPageProps) {
  const { posts, addPost } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recente' | 'popular'>('recente');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const config = forumConfigs[forumType];

  // Filter posts by forum category/tags
  const forumPosts = posts.filter(post => {
    // For this demo, we'll use tags to filter posts
    // In production, posts would have a 'forum' or 'category' field
    const relevantTags = {
      'primeira-infancia': ['Desenvolvimento Motor', 'Sono e Rotina', 'Alimentação', 'Amamentação'],
      'pre-escola': ['Alfabetização', 'Socialização', 'Comportamento', 'Autonomia'],
      'necessidades-especiais': ['TEA', 'TDAH', 'Inclusão', 'Terapias'],
      'adolescencia': ['Adolescência', 'Comunicação', 'Autonomia', 'Identidade', 'Saúde Mental']
    };
    
    return post.tag && relevantTags[forumType].some(tag => 
      post.tag?.toLowerCase().includes(tag.toLowerCase()) || 
      tag.toLowerCase().includes(post.tag?.toLowerCase() || '')
    );
  });

  // Apply topic filter
  const filteredPosts = selectedTopic 
    ? forumPosts.filter(post => post.tag?.toLowerCase().includes(selectedTopic.toLowerCase()))
    : forumPosts;

  // Apply sorting
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    return 0; // 'recente' is already sorted by default (newest first)
  });

  // Calculate stats
  const totalMembers = forumType === 'primeira-infancia' ? 1247 : 
                       forumType === 'pre-escola' ? 893 : 
                       forumType === 'adolescencia' ? 1089 : 564;
  const activeToday = forumType === 'primeira-infancia' ? 234 : 
                      forumType === 'pre-escola' ? 167 : 
                      forumType === 'adolescencia' ? 198 : 98;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Forum Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className={`p-4 rounded-lg ${config.color}`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1>{config.title}</h1>
              <Badge variant="outline" className="text-brown border-brown">
                {config.ageRange}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4">
              {config.description}
            </p>
            
            {/* Stats */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brown" />
                <span className="text-sm">
                  <strong>{totalMembers.toLocaleString('pt-BR')}</strong> membros
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brown" />
                <span className="text-sm">
                  <strong>{activeToday}</strong> ativos hoje
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brown" />
                <span className="text-sm">
                  <strong>{sortedPosts.length}</strong> discussões
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Topics and Guidelines */}
        <div className="lg:col-span-1 space-y-6">
          {/* Topics Filter */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3>Tópicos</h3>
              <Filter className="w-4 h-4 text-brown" />
            </div>
            <div className="space-y-1">
              <Button
                variant={selectedTopic === null ? "default" : "ghost"}
                className="w-full justify-start text-sm"
                onClick={() => setSelectedTopic(null)}
              >
                Todos os Tópicos
              </Button>
              {config.topics.map((topic) => (
                <Button
                  key={topic}
                  variant={selectedTopic === topic ? "default" : "ghost"}
                  className="w-full justify-start text-sm"
                  onClick={() => setSelectedTopic(topic === selectedTopic ? null : topic)}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </Card>

          {/* Guidelines */}
          <Card className="p-4 bg-brown/5">
            <h3 className="mb-3">📋 Diretrizes do Fórum</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {config.guidelines.map((guideline, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-brown">•</span>
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Quick Stats Card */}
          <Card className="p-4 bg-gradient-to-br from-brown/10 to-brown/5">
            <h3 className="mb-3">📊 Atividade Recente</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Posts esta semana</p>
                <p className="text-brown">{Math.floor(sortedPosts.length * 1.5)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Novos membros</p>
                <p className="text-brown">+{Math.floor(totalMembers * 0.05)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Taxa de resposta</p>
                <p className="text-brown">94%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content - Posts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Action Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'recente' ? 'default' : 'outline'}
                  onClick={() => setSortBy('recente')}
                >
                  Mais Recentes
                </Button>
                <Button
                  variant={sortBy === 'popular' ? 'default' : 'outline'}
                  onClick={() => setSortBy('popular')}
                >
                  Mais Populares
                </Button>
              </div>
              <Button onClick={() => setShowCreatePost(!showCreatePost)}>
                {showCreatePost ? 'Cancelar' : 'Nova Discussão'}
              </Button>
            </div>

            {selectedTopic && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filtrando por:</span>
                <Badge variant="secondary" className="gap-2">
                  {selectedTopic}
                  <button 
                    onClick={() => setSelectedTopic(null)}
                    className="hover:text-brown"
                  >
                    ×
                  </button>
                </Badge>
              </div>
            )}
          </div>

          {/* Create Post Form */}
          {showCreatePost && (
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="mb-4">Criar Nova Discussão</h3>
              <CreatePost defaultTag={selectedTopic || config.topics[0]} />
            </div>
          )}

          {/* Posts List */}
          {sortedPosts.length > 0 ? (
            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">Nenhuma discussão ainda</h3>
              <p className="text-muted-foreground mb-4">
                {selectedTopic 
                  ? `Não há posts sobre "${selectedTopic}" ainda.`
                  : 'Seja o primeiro a iniciar uma discussão neste fórum!'
                }
              </p>
              <Button onClick={() => setShowCreatePost(true)}>
                Criar Primeira Discussão
              </Button>
            </Card>
          )}

          {/* Helpful Resources - Bottom */}
          {sortedPosts.length > 0 && (
            <Card className="p-6 bg-brown/5">
              <h3 className="mb-3">💡 Recursos Úteis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <a href="#" className="flex items-center gap-2 text-brown hover:underline">
                  <BookOpen className="w-4 h-4" />
                  Artigos sobre {config.title}
                </a>
                <a href="#" className="flex items-center gap-2 text-brown hover:underline">
                  <Users className="w-4 h-4" />
                  Encontrar Comunidades Locais
                </a>
                <a href="#" className="flex items-center gap-2 text-brown hover:underline">
                  <Calendar className="w-4 h-4" />
                  Eventos Relacionados
                </a>
                <a href="#" className="flex items-center gap-2 text-brown hover:underline">
                  <HeartHandshake className="w-4 h-4" />
                  Profissionais Especializados
                </a>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
