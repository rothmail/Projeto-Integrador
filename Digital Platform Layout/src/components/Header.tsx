import { Heart, MessageCircle, Users, Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { useApp } from "../contexts/AppContext";

interface HeaderProps {
  onNavigate?: (page: 'home' | 'conversations' | 'community' | 'resources' | 'events' | 'settings') => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const { currentUser, notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate?.('home')}
          >
            <div className="w-10 h-10 bg-brown rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-brown">Família Conectada</h1>
              <p className="text-sm text-muted-foreground">Rede de Apoio Parental</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button 
              variant="ghost" 
              className="text-brown hover:bg-brown/10"
              onClick={() => onNavigate?.('community')}
            >
              <Users className="w-4 h-4 mr-2" />
              Comunidade
            </Button>
            <Button 
              variant="ghost" 
              className="text-brown hover:bg-brown/10"
              onClick={() => onNavigate?.('conversations')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Conversas
            </Button>
            <Button 
              variant="ghost" 
              className="text-brown hover:bg-brown/10"
              onClick={() => onNavigate?.('resources')}
            >
              <Heart className="w-4 h-4 mr-2" />
              Recursos
            </Button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" className="relative text-brown hover:bg-brown/10">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-brown rounded-full flex items-center justify-center text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-medium">Notificações</h3>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs text-brown"
                      onClick={markAllNotificationsAsRead}
                    >
                      Marcar todas como lidas
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-[400px]">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="w-12 h-12 mx-auto mb-2 opacity-20" />
                      <p>Nenhuma notificação</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 hover:bg-muted cursor-pointer ${!notif.read ? 'bg-brown/5' : ''}`}
                          onClick={() => markNotificationAsRead(notif.id)}
                        >
                          <div className="flex gap-3">
                            {notif.author && (
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={notif.author.avatar} />
                                <AvatarFallback className="bg-brown text-white text-xs">
                                  {notif.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className="flex-1">
                              <p className="text-sm">
                                {notif.author && <span className="font-medium">{notif.author.name} </span>}
                                {notif.content}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">{notif.timeAgo}</p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-brown rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="bg-brown text-white">
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="end">
                <div className="flex flex-col gap-1">
                  <div className="px-3 py-2 border-b">
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.role}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => onNavigate?.('settings')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Configurações
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}