import { useState } from "react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { MessageCircle } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function ConversationsPage() {
  const { chats, markChatAsRead } = useApp();
  const [selectedChatId, setSelectedChatId] = useState<string>(chats[0]?.id || "");

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    markChatAsRead(chatId);
  };
  
  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  // Chats are already in the correct format from the context
  const transformedChats = chats;

  // Messages are already in the correct format from the context
  const transformedMessages = selectedChat?.messages || [];

  return (
    <div className="h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat List */}
      <div className="lg:col-span-1">
        <ChatList 
          chats={transformedChats}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
        />
      </div>
      
      {/* Chat Window */}
      <div className="lg:col-span-2">
        {selectedChat ? (
          <ChatWindow
            chatId={selectedChat.id}
            chatName={selectedChat.name}
            chatAvatar={selectedChat.avatar}
            isOnline={selectedChat.isOnline}
            messages={transformedMessages}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-sm h-full flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Bem-vindo às Conversas</h3>
              <p className="text-muted-foreground">Selecione uma conversa para começar a trocar mensagens</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}