import { useState, useCallback, useMemo, useEffect } from "react";
import { AppProvider, useApp } from "./contexts/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { CreatePost } from "./components/CreatePost";
import { PostCard } from "./components/PostCard";
import { ResourcesWidget } from "./components/ResourcesWidget";
import { CommunityStats } from "./components/CommunityStats";
import { ConversationsPage } from "./components/ConversationsPage";
import { CommunityPage } from "./components/CommunityPage";
import { ResourcesPage } from "./components/ResourcesPage";
import { EventsPage } from "./components/EventsPage";
import { SettingsPage } from "./components/SettingsPage";
import { ForumPage, ForumType } from "./components/ForumPage";
import { Toaster } from "./components/ui/sonner";

type PageType = 'home' | 'conversations' | 'community' | 'resources' | 'events' | 'settings' | 'forum';

function AppContent() {
  const { posts } = useApp();
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [currentForum, setCurrentForum] = useState<ForumType>('primeira-infancia');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded after first render to prevent timeout issues
    setIsLoaded(true);
  }, []);

  const handleNavigate = useCallback((page: PageType, forumType?: ForumType) => {
    setCurrentPage(page);
    if (forumType) {
      setCurrentForum(forumType);
    }
  }, []);

  const renderPage = useMemo(() => {
    switch (currentPage) {
      case 'conversations':
        return <ConversationsPage />;
      case 'community':
        return <CommunityPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'events':
        return <EventsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'forum':
        return <ForumPage forumType={currentForum} />;
      default:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                <CreatePost />
                
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
              
              {/* Sidebar Widgets */}
              <div className="space-y-6">
                <CommunityStats />
                <ResourcesWidget />
                
                {/* Inspirational Quote */}
                <div className="bg-brown/5 border border-brown/20 rounded-lg p-4">
                  <blockquote className="text-sm text-brown/80 italic text-center">
                    "Não há escolas para pais, mas há muito amor e muita vontade de acertar. E isso, na maioria das vezes, é suficiente."
                  </blockquote>
                  <p className="text-xs text-brown/60 text-center mt-2">- Autor Desconhecido</p>
                </div>

                {/* Mental Health Resources */}
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <h3 className="font-medium text-brown mb-3">🧠 Saúde Mental</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">Recursos de apoio em crise:</p>
                    <div className="space-y-1">
                      <p><strong>CVV:</strong> 188 (24h)</p>
                      <p><strong>SUS:</strong> 136</p>
                      <p><strong>Emergência:</strong> 192</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }, [currentPage, currentForum, posts]);
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brown">Carregando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={(page) => handleNavigate(page as PageType)} />
      
      <div className="flex">
        <Sidebar onNavigate={handleNavigate} currentPage={currentPage} currentForum={currentForum} />
        
        <main className="flex-1 p-6">
          {renderPage}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}