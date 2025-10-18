import { Search, Plus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isOnline?: boolean;
}

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string;
  onSelectChat: (chatId: string) => void;
}

export function ChatList({ chats, selectedChatId, onSelectChat }: ChatListProps) {
  return (
    <Card className="bg-white shadow-sm h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-brown">Conversas</CardTitle>
          <Button size="icon" variant="ghost" className="text-brown hover:bg-brown/10">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar conversas..." 
            className="pl-10 bg-muted border-none"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedChatId === chat.id ? 'bg-brown/10 border-r-2 border-brown' : ''
              }`}
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className="bg-brown text-white">
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground truncate">{chat.name}</h4>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                    {chat.unread && (
                      <div className="w-5 h-5 bg-brown rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}