import { BookOpen, Video, HeadphonesIcon, FileText, Download, Star, Clock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const articles = [
  {
    id: "article-1",
    title: "Como lidar com birras na primeira infância",
    description: "Estratégias baseadas em evidências científicas para gerenciar episódios de birra em crianças de 2 a 5 anos.",
    author: "Dra. Ana Silva",
    readTime: "8 min",
    category: "Desenvolvimento",
    rating: 4.8,
    views: 1247,
    image: "https://images.unsplash.com/photo-1671475063786-e112a191cfb5?w=300&h=200&fit=crop",
    type: "article"
  },
  {
    id: "article-2",
    title: "Estabelecendo limites com amor e firmeza",
    description: "Guia prático para definir regras claras sem prejudicar o vínculo afetivo com os filhos.",
    author: "Prof. Carlos Mendes",
    readTime: "12 min",
    category: "Disciplina",
    rating: 4.9,
    views: 892,
    image: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=300&h=200&fit=crop",
    type: "guide"
  },
  {
    id: "article-3",
    title: "Desenvolvimento emocional na adolescência",
    description: "Compreendendo as mudanças emocionais típicas desta fase e como apoiar os adolescentes.",
    author: "Dra. Marina Costa",
    readTime: "15 min",
    category: "Adolescência",
    rating: 4.7,
    views: 654,
    image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop",
    type: "article"
  }
];

const videos = [
  {
    id: "video-1",
    title: "Webinar: Sono saudável na infância",
    description: "Apresentação completa sobre a importância do sono e como estabelecer rotinas eficazes.",
    author: "Dr. Roberto Silva",
    duration: "45 min",
    category: "Sono",
    rating: 4.9,
    views: 2341,
    image: "https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=300&h=200&fit=crop",
    type: "webinar"
  },
  {
    id: "video-2",
    title: "Atividades para desenvolvimento motor",
    description: "Exercícios e brincadeiras para estimular o desenvolvimento motor em diferentes idades.",
    author: "Fisioterapeuta Ana Beatriz",
    duration: "30 min",
    category: "Desenvolvimento",
    rating: 4.8,
    views: 1876,
    image: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=300&h=200&fit=crop",
    type: "tutorial"
  }
];

const podcasts = [
  {
    id: "podcast-1",
    title: "Parentalidade Consciente #15: Comunicação não-violenta",
    description: "Como aplicar os princípios da comunicação não-violenta na relação com os filhos.",
    author: "Marina Silva",
    duration: "42 min",
    category: "Comunicação",
    rating: 4.9,
    plays: 3421,
    image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=300&h=200&fit=crop",
    type: "podcast"
  },
  {
    id: "podcast-2",
    title: "Autocuidado para Mães #8: Equilibrando maternidade e carreira",
    description: "Estratégias práticas para conciliar vida profissional e maternal sem culpa.",
    author: "Carla Santos",
    duration: "35 min",
    category: "Autocuidado",
    rating: 4.7,
    plays: 2156,
    image: "https://images.unsplash.com/photo-1671475063786-e112a191cfb5?w=300&h=200&fit=crop",
    type: "podcast"
  }
];

const categories = ["Todos", "Desenvolvimento", "Disciplina", "Sono", "Alimentação", "Adolescência", "Autocuidado", "Comunicação"];

function ResourceCard({ resource, type }: { resource: any; type: 'article' | 'video' | 'podcast' }) {
  const getIcon = () => {
    switch (type) {
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'podcast': return <HeadphonesIcon className="w-4 h-4" />;
    }
  };

  const getMetric = () => {
    switch (type) {
      case 'article': return `${resource.views} visualizações`;
      case 'video': return `${resource.views} visualizações`;
      case 'podcast': return `${resource.plays} reproduções`;
    }
  };

  const getDuration = () => {
    switch (type) {
      case 'article': return resource.readTime;
      case 'video': return resource.duration;
      case 'podcast': return resource.duration;
    }
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <ImageWithFallback 
          src={resource.image} 
          alt={resource.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-brown text-white">
            {getIcon()}
            <span className="ml-1 capitalize">{resource.type}</span>
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 text-brown">
            <Clock className="w-3 h-3 mr-1" />
            {getDuration()}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-foreground line-clamp-2">{resource.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{resource.description}</p>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Por {resource.author}</span>
            <Badge variant="outline" className="text-brown border-brown">
              {resource.category}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {resource.rating}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {getMetric()}
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-brown border-brown hover:bg-brown/10">
              Ver Mais
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ResourcesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brown">Recursos Educativos</h1>
          <p className="text-muted-foreground">Artigos, vídeos e conteúdos para apoiar sua jornada parental</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input placeholder="Buscar recursos..." className="bg-white" />
          </div>
          <Select defaultValue="todos">
            <SelectTrigger className="w-full sm:w-48 bg-white">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="recentes">
            <SelectTrigger className="w-full sm:w-48 bg-white">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recentes">Mais Recentes</SelectItem>
              <SelectItem value="populares">Mais Populares</SelectItem>
              <SelectItem value="avaliacao">Melhor Avaliados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="todos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white">
          <TabsTrigger value="todos" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            Todos
          </TabsTrigger>
          <TabsTrigger value="artigos" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            <BookOpen className="w-4 h-4 mr-2" />
            Artigos
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            <Video className="w-4 h-4 mr-2" />
            Vídeos
          </TabsTrigger>
          <TabsTrigger value="podcasts" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            <HeadphonesIcon className="w-4 h-4 mr-2" />
            Podcasts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...articles, ...videos, ...podcasts].map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                type={resource.type as 'article' | 'video' | 'podcast'} 
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artigos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ResourceCard key={article.id} resource={article} type="article" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <ResourceCard key={video.id} resource={video} type="video" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="podcasts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast) => (
              <ResourceCard key={podcast.id} resource={podcast} type="podcast" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}