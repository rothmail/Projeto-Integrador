import { useState } from "react";
import { Users, MapPin, Star, MessageCircle, Calendar, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "../contexts/AppContext";
import { toast } from "sonner@2.0.3";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function CommunityPage() {
  const { communities, joinCommunity, leaveCommunity, createCommunity } = useApp();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  
  // Form state for creating community
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
    location: "Online",
    image: "https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=300&h=200&fit=crop",
    members: 1,
    tags: [] as string[]
  });

  const userCommunities = communities.filter(c => c.isJoined);
  const suggestedCommunities = communities.filter(c => !c.isJoined);

  const handleJoinCommunity = (communityId: string) => {
    joinCommunity(communityId);
    toast.success("Você entrou na comunidade! 🎉");
  };

  const handleLeaveCommunity = (communityId: string) => {
    leaveCommunity(communityId);
    toast.success("Você saiu da comunidade");
  };

  const handleCreateCommunity = () => {
    if (!newCommunity.name.trim()) {
      toast.error("Por favor, dê um nome à comunidade");
      return;
    }
    if (!newCommunity.description.trim()) {
      toast.error("Por favor, adicione uma descrição");
      return;
    }

    createCommunity(newCommunity);
    setShowCreateDialog(false);
    setNewCommunity({
      name: "",
      description: "",
      location: "Online",
      image: "https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=300&h=200&fit=crop",
      members: 1,
      tags: []
    });
    toast.success("Comunidade criada com sucesso! 🎉");
  };

  const handleViewCommunity = (communityId: string) => {
    setSelectedCommunity(communityId);
    toast.info("Visualizando posts da comunidade");
  };

  const recentActivity = [
    {
      community: userCommunities[0]?.name || "Comunidade",
      action: "Nova postagem sobre rotina de sono",
      time: "2 horas atrás",
      avatar: "https://images.unsplash.com/photo-1600563093202-337471bde37e?w=32&h=32&fit=crop&crop=face"
    },
    {
      community: userCommunities[1]?.name || "Comunidade",
      action: "Discussão sobre licença maternidade",
      time: "5 horas atrás",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face"
    },
    {
      community: userCommunities[2]?.name || "Comunidade",
      action: "Evento: Webinar sobre marcos motores",
      time: "1 dia atrás",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brown">Minha Comunidade</h1>
          <p className="text-muted-foreground">Conecte-se com outros pais e responsáveis</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-brown hover:bg-brown/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Criar Comunidade
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-brown">Criar Nova Comunidade</DialogTitle>
              <DialogDescription>
                Crie um espaço para conectar pais e responsáveis com interesses em comum
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Comunidade</Label>
                <Input
                  id="name"
                  value={newCommunity.name}
                  onChange={(e) => setNewCommunity({...newCommunity, name: e.target.value})}
                  placeholder="Ex: Pais de Gêmeos"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newCommunity.description}
                  onChange={(e) => setNewCommunity({...newCommunity, description: e.target.value})}
                  placeholder="Descreva o propósito da comunidade..."
                  className="min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Localização</Label>
                <Select
                  value={newCommunity.location}
                  onValueChange={(value) => setNewCommunity({...newCommunity, location: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="São Paulo, SP">São Paulo, SP</SelectItem>
                    <SelectItem value="Rio de Janeiro, RJ">Rio de Janeiro, RJ</SelectItem>
                    <SelectItem value="Belo Horizonte, MG">Belo Horizonte, MG</SelectItem>
                    <SelectItem value="Brasília, DF">Brasília, DF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-brown hover:bg-brown/90 text-white"
                onClick={handleCreateCommunity}
              >
                Criar Comunidade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Communities */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-brown flex items-center gap-2">
                <Users className="w-5 h-5" />
                Minhas Comunidades ({userCommunities.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userCommunities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Você ainda não participa de nenhuma comunidade</p>
                  <p className="text-sm mt-1">Explore as sugestões abaixo para começar!</p>
                </div>
              ) : (
                userCommunities.map((community) => (
                  <div key={community.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex gap-4">
                      <ImageWithFallback 
                        src={community.image} 
                        alt={community.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">{community.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{community.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {community.members} membros
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {community.location}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-brown border-brown hover:bg-brown/10"
                              onClick={() => handleViewCommunity(community.id)}
                            >
                              <MessageCircle className="w-3 h-3 mr-1" />
                              Ver Posts
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => handleLeaveCommunity(community.id)}
                            >
                              Sair
                            </Button>
                          </div>
                        </div>
                        {community.lastActivity && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Última atividade: {community.lastActivity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Suggested Communities */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-brown">Comunidades Sugeridas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedCommunities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Star className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Você já participa de todas as comunidades disponíveis!</p>
                </div>
              ) : (
                suggestedCommunities.map((community) => (
                  <div key={community.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex gap-4">
                      <ImageWithFallback 
                        src={community.image} 
                        alt={community.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">{community.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{community.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {community.members} membros
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {community.location}
                              </span>
                            </div>
                            {community.tags && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {community.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs bg-brown/10 text-brown">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <Button 
                            className="bg-brown hover:bg-brown/90 text-white" 
                            size="sm"
                            onClick={() => handleJoinCommunity(community.id)}
                          >
                            Participar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-brown text-lg">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="bg-brown text-white text-xs">
                      {activity.community[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.community}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-brown text-lg">Suas Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-brown">{userCommunities.length}</div>
                <p className="text-sm text-muted-foreground">Comunidades</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-brown">47</div>
                <p className="text-sm text-muted-foreground">Posts compartilhados</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-brown">156</div>
                <p className="text-sm text-muted-foreground">Apoios dados</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
