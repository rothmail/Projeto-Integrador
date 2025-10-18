import { useState, useRef } from "react";
import { Image, Smile, Calendar, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useApp } from "../contexts/AppContext";
import { toast } from "sonner@2.0.3";

interface CreatePostProps {
  defaultTag?: string;
}

export function CreatePost({ defaultTag }: CreatePostProps = {}) {
  const { currentUser, addPost } = useApp();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tag, setTag] = useState(defaultTag || "Geral");
  const [showImageInput, setShowImageInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Por favor, escreva algo antes de compartilhar!");
      return;
    }

    addPost(content, imageUrl || undefined, tag);
    setContent("");
    setImageUrl("");
    setTag(defaultTag || "Geral");
    setShowImageInput(false);
    toast.success("Post compartilhado com sucesso!");
  };

  const handleImageClick = () => {
    setShowImageInput(!showImageInput);
  };

  return (
    <Card className="bg-white shadow-sm mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="bg-brown text-white">
              {currentUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Compartilhe suas experiências, dúvidas ou momentos especiais com a comunidade..."
              className="min-h-[80px] resize-none border-none bg-muted rounded-lg p-3 focus:ring-2 focus:ring-brown"
            />
            
            {showImageInput && (
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Cole a URL da imagem..."
                    className="flex-1 px-3 py-2 bg-white rounded border border-brown/20 focus:outline-none focus:ring-2 focus:ring-brown"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowImageInput(false);
                      setImageUrl("");
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {imageUrl && (
                  <div className="mt-2">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="max-h-40 rounded"
                      onError={() => toast.error("URL da imagem inválida")}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-3 gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-brown hover:bg-brown/10"
                  onClick={handleImageClick}
                >
                  <Image className="w-4 h-4 mr-1" />
                  Foto
                </Button>
                <Select value={tag} onValueChange={setTag}>
                  <SelectTrigger className="w-[180px] h-8 bg-transparent border-brown/20">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Geral">Geral</SelectItem>
                    <SelectItem value="Desenvolvimento Emocional">Desenvolvimento Emocional</SelectItem>
                    <SelectItem value="Desenvolvimento Motor">Desenvolvimento Motor</SelectItem>
                    <SelectItem value="Sono e Rotina">Sono e Rotina</SelectItem>
                    <SelectItem value="Alimentação">Alimentação</SelectItem>
                    <SelectItem value="Alfabetização">Alfabetização</SelectItem>
                    <SelectItem value="Socialização">Socialização</SelectItem>
                    <SelectItem value="Comportamento">Comportamento</SelectItem>
                    <SelectItem value="Autonomia">Autonomia</SelectItem>
                    <SelectItem value="Adolescência">Adolescência</SelectItem>
                    <SelectItem value="Saúde Mental">Saúde Mental</SelectItem>
                    <SelectItem value="Redes Sociais">Redes Sociais</SelectItem>
                    <SelectItem value="Comunicação">Comunicação</SelectItem>
                    <SelectItem value="TEA">TEA - Autismo</SelectItem>
                    <SelectItem value="TDAH">TDAH</SelectItem>
                    <SelectItem value="Autocuidado">Autocuidado</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="bg-brown hover:bg-brown/90 text-white"
                onClick={handleSubmit}
              >
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}