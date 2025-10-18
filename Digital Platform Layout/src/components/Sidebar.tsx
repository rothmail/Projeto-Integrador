import { 
  Home, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Heart, 
  Calendar,
  HelpCircle,
  Settings,
  Baby,
  School,
  HeartHandshake
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ForumType } from "./ForumPage";

type PageType = 'home' | 'conversations' | 'community' | 'resources' | 'events' | 'settings' | 'forum';

interface SidebarProps {
  onNavigate: (page: PageType, forumType?: ForumType) => void;
  currentPage: PageType;
  currentForum?: ForumType;
}

export function Sidebar({ onNavigate, currentPage, currentForum }: SidebarProps) {
  const isForumActive = (forumType: ForumType) => {
    return currentPage === 'forum' && currentForum === forumType;
  };

  return (
    <aside className="w-64 bg-brown text-white min-h-screen p-4">
      <nav className="space-y-2">
        {/* Main Navigation */}
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 ${
              currentPage === 'home' ? 'bg-white/20' : ''
            }`}
            onClick={() => onNavigate('home')}
          >
            <Home className="w-4 h-4 mr-3" />
            Início
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 ${
              currentPage === 'community' ? 'bg-white/20' : ''
            }`}
            onClick={() => onNavigate('community')}
          >
            <Users className="w-4 h-4 mr-3" />
            Minha Comunidade
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 ${
              currentPage === 'conversations' ? 'bg-white/20' : ''
            }`}
            onClick={() => onNavigate('conversations')}
          >
            <MessageSquare className="w-4 h-4 mr-3" />
            Conversas
          </Button>
        </div>

        <Separator className="bg-white/20 my-4" />

        {/* Forums & Topics */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-white/70 px-3 py-2">Fóruns Temáticos</h3>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 text-sm ${
              isForumActive('primeira-infancia') ? 'bg-white/20' : ''
            }`}
            onClick={() => onNavigate('forum', 'primeira-infancia')}
          >
            <Baby className="w-4 h-4 mr-3" />
            Primeira Infância (0-3 anos)
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 text-sm ${
              isForumActive('pre-escola') ? 'bg-white/20' : ''
            }`}
            onClick={() => onNavigate('forum', 'pre-escola')}
          >
            <School className="w-4 h-4 mr-3" />
            Pré-escola (4-6 anos)
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 text-sm ${
              isForumActive('adolescencia') ? 'bg-white/20' : ''
            }`}
            onClick={() => onNavigate('forum', 'adolescencia')}
          >
            <Heart className="w-4 h-4 mr-3" />
            Adolescência
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 text-sm ${
              isForumActive('necessidades-especiais') ? 'bg-white/20' : ''
            }`}
            onClick={() => onNavigate('forum', 'necessidades-especiais')}
          >
            <HeartHandshake className="w-4 h-4 mr-3" />
            Necessidades Especiais
          </Button>
        </div>

        <Separator className="bg-white/20 my-4" />

        {/* Resources */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-white/70 px-3 py-2">Recursos</h3>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 text-sm ${
              currentPage === 'resources' ? 'bg-white/20' : ''
            }`}
            onClick={() => onNavigate('resources')}
          >
            <BookOpen className="w-4 h-4 mr-3" />
            Artigos e Guias
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 text-sm ${
              currentPage === 'events' ? 'bg-white/20' : ''
            }`}
            onClick={() => onNavigate('events')}
          >
            <Calendar className="w-4 h-4 mr-3" />
            Eventos
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-sm">
            <HelpCircle className="w-4 h-4 mr-3" />
            Perguntas Frequentes
          </Button>
        </div>

        <Separator className="bg-white/20 my-4" />

        {/* Settings */}
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 ${
              currentPage === 'settings' ? 'bg-white/20' : ''
            }`}
            onClick={() => onNavigate('settings')}
          >
            <Settings className="w-4 h-4 mr-3" />
            Configurações
          </Button>
        </div>
      </nav>
    </aside>
  );
}