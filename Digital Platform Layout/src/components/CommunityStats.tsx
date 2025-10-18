import { Users, MessageCircle, Heart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function CommunityStats() {
  const stats = [
    {
      icon: Users,
      label: "Membros Ativos",
      value: "2.847",
      change: "+12% esta semana"
    },
    {
      icon: MessageCircle,
      label: "Conversas Hoje",
      value: "156",
      change: "+23% vs ontem"
    },
    {
      icon: Heart,
      label: "Apoios Dados",
      value: "1.203",
      change: "+8% esta semana"
    }
  ];

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-brown flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Nossa Comunidade
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brown/10 rounded-lg flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-brown" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-xs text-green-600">{stat.change}</p>
            </div>
          </div>
        ))}
        
        <div className="pt-2 mt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Uma comunidade que cresce com <span className="text-brown font-medium">amor</span> e <span className="text-brown font-medium">cuidado</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}