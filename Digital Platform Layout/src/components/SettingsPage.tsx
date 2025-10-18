import { Bell, User, Shield, Eye, Heart, Globe, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-brown">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e informações da conta</p>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white">
          <TabsTrigger value="perfil" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="privacidade" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-2" />
            Privacidade
          </TabsTrigger>
          <TabsTrigger value="preferencias" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            <Heart className="w-4 h-4 mr-2" />
            Preferências
          </TabsTrigger>
          <TabsTrigger value="ajuda" className="data-[state=active]:bg-brown data-[state=active]:text-white">
            <HelpCircle className="w-4 h-4 mr-2" />
            Ajuda
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="perfil" className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-brown">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" />
                  <AvatarFallback className="bg-brown text-white text-lg">MJ</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="text-brown border-brown hover:bg-brown/10">
                    Alterar Foto
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">JPG, PNG ou GIF. Máximo 2MB.</p>
                </div>
              </div>

              <Separator />

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" defaultValue="Maria José Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="maria.jose@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" defaultValue="São Paulo, SP" />
                </div>
              </div>

              {/* Family Info */}
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Informações Familiares</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Seu Papel</Label>
                    <Select defaultValue="mae">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mae">Mãe</SelectItem>
                        <SelectItem value="pai">Pai</SelectItem>
                        <SelectItem value="responsavel">Responsável</SelectItem>
                        <SelectItem value="cuidador">Cuidador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filhos">Número de Filhos</Label>
                    <Select defaultValue="2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 filho</SelectItem>
                        <SelectItem value="2">2 filhos</SelectItem>
                        <SelectItem value="3">3 filhos</SelectItem>
                        <SelectItem value="4+">4+ filhos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Sobre Mim</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Conte um pouco sobre você e sua jornada como mãe/pai..."
                    defaultValue="Mãe de dois meninos lindos, trabalhando em home office e sempre buscando equilibrar vida profissional e familiar. Amo compartilhar experiências e aprender com outras mães."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-brown hover:bg-brown/90 text-white">
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notificacoes" className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-brown">Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="posts">Novos Posts na Comunidade</Label>
                    <p className="text-sm text-muted-foreground">Receba notificações quando houver novos posts</p>
                  </div>
                  <Switch id="posts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="comments">Comentários nos Meus Posts</Label>
                    <p className="text-sm text-muted-foreground">Notificações quando alguém comentar seus posts</p>
                  </div>
                  <Switch id="comments" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="messages">Mensagens Diretas</Label>
                    <p className="text-sm text-muted-foreground">Notificações de novas mensagens privadas</p>
                  </div>
                  <Switch id="messages" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="events">Eventos</Label>
                    <p className="text-sm text-muted-foreground">Notificações sobre novos eventos e lembretes</p>
                  </div>
                  <Switch id="events" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="resources">Novos Recursos</Label>
                    <p className="text-sm text-muted-foreground">Artigos e materiais educativos relevantes</p>
                  </div>
                  <Switch id="resources" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Métodos de Notificação</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif">Email</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações por email</p>
                  </div>
                  <Switch id="email-notif" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notif">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notificações no navegador</p>
                  </div>
                  <Switch id="push-notif" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacidade" className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-brown">Configurações de Privacidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-visibility">Perfil Público</Label>
                    <p className="text-sm text-muted-foreground">Permitir que outros usuários vejam seu perfil</p>
                  </div>
                  <Switch id="profile-visibility" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="activity-visibility">Atividade Pública</Label>
                    <p className="text-sm text-muted-foreground">Mostrar suas atividades na comunidade</p>
                  </div>
                  <Switch id="activity-visibility" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="search-visibility">Aparecer nas Buscas</Label>
                    <p className="text-sm text-muted-foreground">Permitir que outros encontrem seu perfil</p>
                  </div>
                  <Switch id="search-visibility" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="message-requests">Mensagens de Desconhecidos</Label>
                    <p className="text-sm text-muted-foreground">Receber mensagens de pessoas que não seguem</p>
                  </div>
                  <Switch id="message-requests" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Controle de Dados</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full text-brown border-brown hover:bg-brown/10">
                    <Globe className="w-4 h-4 mr-2" />
                    Baixar Meus Dados
                  </Button>
                  <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive/10">
                    Excluir Conta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferencias" className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-brown">Preferências de Conteúdo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Faixa Etária de Interesse</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="0-2" className="rounded" defaultChecked />
                      <Label htmlFor="0-2" className="text-sm">0-2 anos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="3-5" className="rounded" defaultChecked />
                      <Label htmlFor="3-5" className="text-sm">3-5 anos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="6-10" className="rounded" />
                      <Label htmlFor="6-10" className="text-sm">6-10 anos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="11-15" className="rounded" />
                      <Label htmlFor="11-15" className="text-sm">11-15 anos</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Temas de Interesse</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="desenvolvimento" className="rounded" defaultChecked />
                      <Label htmlFor="desenvolvimento" className="text-sm">Desenvolvimento</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="alimentacao" className="rounded" defaultChecked />
                      <Label htmlFor="alimentacao" className="text-sm">Alimentação</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sono" className="rounded" defaultChecked />
                      <Label htmlFor="sono" className="text-sm">Sono</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="educacao" className="rounded" />
                      <Label htmlFor="educacao" className="text-sm">Educação</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="saude" className="rounded" />
                      <Label htmlFor="saude" className="text-sm">Saúde</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="autocuidado" className="rounded" defaultChecked />
                      <Label htmlFor="autocuidado" className="text-sm">Autocuidado</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue="pt-br">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Help Tab */}
        <TabsContent value="ajuda" className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-brown">Central de Ajuda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Perguntas Frequentes</h3>
                  <p className="text-sm text-muted-foreground mb-3">Encontre respostas para as dúvidas mais comuns</p>
                  <Button variant="outline" className="text-brown border-brown hover:bg-brown/10">
                    Ver FAQ
                  </Button>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Guia de Uso</h3>
                  <p className="text-sm text-muted-foreground mb-3">Aprenda a usar todas as funcionalidades da plataforma</p>
                  <Button variant="outline" className="text-brown border-brown hover:bg-brown/10">
                    Ver Guia
                  </Button>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Contato</h3>
                  <p className="text-sm text-muted-foreground mb-3">Entre em contato conosco para suporte</p>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Email:</strong> suporte@familiaconectada.com.br</p>
                    <p className="text-sm"><strong>WhatsApp:</strong> (11) 99999-9999</p>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Recursos de Apoio</h3>
                  <p className="text-sm text-muted-foreground mb-3">Linhas de apoio em situações de crise</p>
                  <div className="space-y-1 text-sm">
                    <p><strong>CVV:</strong> 188 (24h)</p>
                    <p><strong>SUS:</strong> 136</p>
                    <p><strong>Emergência:</strong> 192</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}