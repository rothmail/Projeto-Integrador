import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Plus, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
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

const pastEvents = [
  {
    id: "past-1",
    title: "Palestra: Sono Saudável na Infância",
    description: "Orientações sobre rotinas de sono e resolução de problemas relacionados ao sono infantil.",
    date: "2025-09-28",
    type: "online" as const,
    category: "Sono",
    organizer: "Dr. Roberto Silva",
    participants: 156,
    recording: true,
    isRegistered: true
  },
  {
    id: "past-2",
    title: "Encontro: Pais de Adolescentes",
    description: "Troca de experiências sobre os desafios da adolescência.",
    date: "2025-09-20",
    type: "presencial" as const,
    location: "São Paulo, SP",
    category: "Adolescência",
    organizer: "Comunidade Adolescentes",
    participants: 28,
    isRegistered: false
  }
];

function EventCard({ event, isPast = false, onToggleRegistration }: { event: any; isPast?: boolean; onToggleRegistration: (id: string) => void }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleRegistrationClick = () => {
    onToggleRegistration(event.id);
    if (event.isRegistered) {
      toast.success("Inscrição cancelada");
    } else {
      toast.success("Inscrição realizada com sucesso! 🎉");
    }
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <ImageWithFallback 
          src={event.image || "https://images.unsplash.com/photo-1703300450387-047da16a89c4?w=400&h=250&fit=crop"} 
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 left-2">
          <Badge className={event.type === 'online' ? 'bg-blue-600' : 'bg-green-600'}>
            {event.type === 'online' ? 'Online' : 'Presencial'}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 text-brown">
            {event.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-foreground line-clamp-2">{event.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            {!isPast && event.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{event.time} - {event.duration}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>
                {event.participants} participantes
                {!isPast && event.maxParticipants && ` / ${event.maxParticipants} vagas`}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face`} />
                <AvatarFallback className="bg-brown text-white text-xs">
                  {event.organizer[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{event.organizer}</span>
            </div>
            
            {isPast ? (
              event.recording ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-brown border-brown hover:bg-brown/10"
                  onClick={() => toast.info("Abrindo gravação...")}
                >
                  Ver Gravação
                </Button>
              ) : (
                <Badge variant="secondary">Concluído</Badge>
              )
            ) : (
              <Button 
                variant={event.isRegistered ? "outline" : "default"}
                size="sm" 
                className={event.isRegistered 
                  ? "text-brown border-brown hover:bg-brown/10" 
                  : "bg-brown hover:bg-brown/90 text-white"
                }
                onClick={handleRegistrationClick}
              >
                {event.isRegistered ? "Inscrito ✓" : "Inscrever-se"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EventsPage() {
  const { events, toggleEventRegistration, createEvent } = useApp();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    type: "online" as "online" | "presencial",
    category: "Geral",
    organizer: "Você",
    location: "",
    maxParticipants: 50,
    image: "https://images.unsplash.com/photo-1703300450387-047da16a89c4?w=400&h=250&fit=crop"
  });

  const registeredCount = events.filter(e => e.isRegistered).length;

  const handleCreateEvent = () => {
    if (!newEvent.title.trim()) {
      toast.error("Por favor, dê um título ao evento");
      return;
    }
    if (!newEvent.date) {
      toast.error("Por favor, escolha uma data");
      return;
    }

    createEvent(newEvent);
    setShowCreateDialog(false);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      type: "online",
      category: "Geral",
      organizer: "Você",
      location: "",
      maxParticipants: 50,
      image: "https://images.unsplash.com/photo-1703300450387-047da16a89c4?w=400&h=250&fit=crop"
    });
    toast.success("Evento criado com sucesso! 🎉");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-brown">Eventos</h1>
          <p className="text-muted-foreground">Participe de webinars, workshops e encontros da comunidade</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-brown border-brown hover:bg-brown/10"
            onClick={() => toast.info("Filtros em breve!")}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-brown hover:bg-brown/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Criar Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-brown">Criar Novo Evento</DialogTitle>
                <DialogDescription>
                  Organize um evento para a comunidade
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título do Evento</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Ex: Workshop de Comunicação Não-Violenta"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    placeholder="Descreva o evento..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="duration">Duração</Label>
                  <Input
                    id="duration"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                    placeholder="Ex: 2h"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value: "online" | "presencial") => setNewEvent({...newEvent, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newEvent.type === "presencial" && (
                  <div>
                    <Label htmlFor="location">Local</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      placeholder="Endereço do evento"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newEvent.category}
                    onValueChange={(value) => setNewEvent({...newEvent, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Geral">Geral</SelectItem>
                      <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                      <SelectItem value="Sono">Sono</SelectItem>
                      <SelectItem value="Alimentação">Alimentação</SelectItem>
                      <SelectItem value="Comunicação">Comunicação</SelectItem>
                      <SelectItem value="Carreira">Carreira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maxParticipants">Vagas</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={newEvent.maxParticipants}
                    onChange={(e) => setNewEvent({...newEvent, maxParticipants: parseInt(e.target.value) || 50})}
                  />
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
                  onClick={handleCreateEvent}
                >
                  Criar Evento
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-brown">{events.length}</div>
            <p className="text-sm text-muted-foreground">Próximos Eventos</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-brown">{registeredCount}</div>
            <p className="text-sm text-muted-foreground">Eventos Inscritos</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-brown">12</div>
            <p className="text-sm text-muted-foreground">Eventos Participados</p>
          </CardContent>
        </Card>
      </div>

      {/* Events Tabs */}
      <Tabs defaultValue="proximos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white">
          <TabsTrigger value="proximos" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            Próximos Eventos ({events.length})
          </TabsTrigger>
          <TabsTrigger value="passados" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            Eventos Passados ({pastEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="proximos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onToggleRegistration={toggleEventRegistration} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="passados" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} isPast={true} onToggleRegistration={() => {}} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
