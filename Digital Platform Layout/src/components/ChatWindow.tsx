import { useState } from "react";
import { Send, Smile, Paperclip, MoreVertical, Phone, Video } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { useApp } from "../contexts/AppContext";
import { toast } from "sonner@2.0.3";

interface Message {
  id: string;
  content: string;
  time: string;
  isOwn: boolean;
  avatar?: string;
}

interface ChatWindowProps {
  chatId: string;
  chatName: string;
  chatAvatar: string;
  isOnline?: boolean;
  messages: Message[];
}

export function ChatWindow({ chatId, chatName, chatAvatar, isOnline, messages }: ChatWindowProps) {
  const { sendMessage } = useApp();
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error("Escreva uma mensagem antes de enviar!");
      return;
    }
    sendMessage(chatId, messageText);
    setMessageText("");
    toast.success("Mensagem enviada!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="bg-white shadow-sm h-full flex flex-col">
      {/* Chat Header */}
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={chatAvatar} />
                <AvatarFallback className="bg-brown text-white">
                  {chatName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-foreground">{chatName}</h3>
              <p className="text-sm text-muted-foreground">
                {isOnline ? 'Online agora' : 'Visto há 2 horas'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-brown hover:bg-brown/10"
              onClick={() => toast.info("Chamada de voz em breve!")}
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-brown hover:bg-brown/10"
              onClick={() => toast.info("Chamada de vídeo em breve!")}
            >
              <Video className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="text-brown hover:bg-brown/10">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-96 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[70%] ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!message.isOwn && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={message.avatar || chatAvatar} />
                      <AvatarFallback className="bg-brown text-white text-xs">
                        {chatName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`rounded-lg p-3 ${
                    message.isOwn 
                      ? 'bg-brown text-white' 
                      : 'bg-muted text-foreground'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-muted-foreground hover:text-brown hover:bg-brown/10"
            onClick={() => toast.info("Anexar arquivo em breve!")}
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..." 
              className="pr-10 bg-muted border-none"
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-brown hover:bg-brown/10"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            className="bg-brown hover:bg-brown/90 text-white"
            onClick={handleSendMessage}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}