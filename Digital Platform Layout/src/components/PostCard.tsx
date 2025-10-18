import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Textarea } from "./ui/textarea";
import { useApp, Post } from "../contexts/AppContext";
import { toast } from "sonner@2.0.3";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { toggleLike, addComment, currentUser } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  
  const isLiked = post.likedBy.includes(currentUser.name);

  const handleLike = () => {
    toggleLike(post.id);
  };

  const handleComment = () => {
    if (!commentText.trim()) {
      toast.error("Escreva um comentário antes de enviar!");
      return;
    }
    addComment(post.id, commentText);
    setCommentText("");
    toast.success("Comentário adicionado!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${post.author.name}: ${post.content}`);
    toast.success("Link do post copiado!");
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-brown text-white">
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-foreground">{post.author.name}</h4>
              <p className="text-sm text-muted-foreground">{post.author.role} • {post.timeAgo}</p>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="text-muted-foreground hover:bg-muted">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        {post.tag && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-brown/10 text-brown">
              {post.tag}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
        
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <ImageWithFallback 
              src={post.image} 
              alt="Post image" 
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500 hover:bg-red-50`}
              onClick={handleLike}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {post.likes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-brown hover:bg-brown/10"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments.length}
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-brown hover:bg-brown/10"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback className="bg-brown/20 text-brown text-xs">
                    {comment.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">{comment.author.name}</p>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-2">{comment.timeAgo}</p>
                </div>
              </div>
            ))}

            <div className="flex gap-2 mt-3">
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escreva um comentário..."
                className="min-h-[60px] resize-none bg-muted border-none"
              />
              <Button 
                size="icon" 
                className="bg-brown hover:bg-brown/90 text-white h-[60px]"
                onClick={handleComment}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}