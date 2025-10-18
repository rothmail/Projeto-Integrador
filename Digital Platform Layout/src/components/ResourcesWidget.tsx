import { BookOpen, Video, HeadphonesIcon, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function ResourcesWidget() {
  const resources = [
    {
      type: "article",
      title: "Como lidar com birras na primeira infância",
      description: "Estratégias baseadas em evidências científicas",
      icon: BookOpen
    },
    {
      type: "video",
      title: "Desenvolvimento emocional aos 3 anos",
      description: "Webinar com Dra. Ana Silva",
      icon: Video
    },
    {
      type: "podcast",
      title: "Podcast: Parentalidade Consciente #15",
      description: "Estabelecendo limites com amor",
      icon: HeadphonesIcon
    }
  ];

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-brown">Recursos Recomendados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resources.map((resource, index) => (
          <div key={index}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-brown/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <resource.icon className="w-4 h-4 text-brown" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground leading-tight">{resource.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
              </div>
              <Button size="icon" variant="ghost" className="w-6 h-6 text-muted-foreground hover:text-brown">
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
            {index < resources.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}
        
        <div className="pt-2">
          <Button variant="outline" className="w-full text-brown border-brown hover:bg-brown/10">
            Ver Todos os Recursos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}