# 📖 Guia de Uso - Família Conectada (Vanilla JS)

## 🚀 Como Iniciar

### Opção 1: Servidor Local com Python

```bash
# Navegue até a pasta do projeto
cd caminho/para/o/projeto

# Inicie o servidor
python -m http.server 8000

# Acesse no navegador
# http://localhost:8000
```

### Opção 2: Servidor Local com Node.js

```bash
# Instale o http-server globalmente (apenas uma vez)
npm install -g http-server

# Navegue até a pasta do projeto
cd caminho/para/o/projeto

# Inicie o servidor
http-server -p 8000

# Acesse no navegador
# http://localhost:8000
```

### Opção 3: VS Code Live Server

1. Instale a extensão **Live Server** no VS Code
2. Abra a pasta do projeto no VS Code
3. Clique com o botão direito em `index.html`
4. Selecione **"Open with Live Server"**
5. O navegador abrirá automaticamente

## 📱 Funcionalidades Principais

### 1. Criar Posts

1. Na página inicial, localize o campo de texto grande
2. Digite sua mensagem
3. (Opcional) Clique em "Foto" para adicionar uma imagem via URL
4. Selecione uma categoria no dropdown
5. Clique em "Compartilhar"

**Exemplo de URLs de imagens para testar:**
```
https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=500&h=300&fit=crop
https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=300&fit=crop
```

### 2. Curtir e Comentar

- **Curtir:** Clique no ícone de coração abaixo de qualquer post
- **Comentar:** 
  1. Clique no ícone de mensagem
  2. Digite seu comentário no campo que aparece
  3. Clique no botão de enviar ou pressione Enter

### 3. Navegação

Use a barra lateral esquerda para navegar:
- **Início:** Feed principal com todos os posts
- **Minha Comunidade:** Veja e participe de comunidades
- **Conversas:** Mensagens diretas com outros membros

#### Fóruns Temáticos:
- **Primeira Infância (0-3 anos)**
- **Pré-escola (4-6 anos)**
- **Adolescência**
- **Necessidades Especiais**

#### Recursos:
- **Artigos e Guias:** Material educativo
- **Eventos:** Workshops e encontros
- **Perguntas Frequentes**

### 4. Fóruns

1. Clique em um dos fóruns na barra lateral
2. Veja as estatísticas do fórum no topo
3. Use os filtros de tópicos para encontrar conteúdo específico
4. Crie posts relevantes para o fórum

**Filtros disponíveis por fórum:**

**Primeira Infância:**
- Desenvolvimento Motor
- Alimentação
- Sono e Rotina
- Amamentação
- Vacinas
- Primeiros Passos

**Pré-escola:**
- Alfabetização
- Socialização
- Comportamento
- Autonomia
- Atividades Educativas
- Preparação Escolar

**Adolescência:**
- Comunicação
- Autonomia
- Saúde Mental
- Redes Sociais
- Estudos
- Transição para Adulto

**Necessidades Especiais:**
- TEA - Autismo
- TDAH
- Inclusão Escolar
- Terapias
- Direitos
- Recursos Especializados

### 5. Mensagens Diretas

1. Clique em "Conversas" na barra lateral
2. Selecione uma conversa da lista à esquerda
3. Digite sua mensagem no campo inferior
4. Clique em enviar ou pressione Enter

**Recursos:**
- Indicador de status (online/offline)
- Contador de mensagens não lidas
- Histórico completo de conversas

### 6. Comunidades

1. Acesse "Minha Comunidade"
2. Navegue pelas comunidades disponíveis
3. Clique em "Participar" para entrar
4. Clique em "Sair da Comunidade" para sair

**Informações mostradas:**
- Número de membros
- Localização
- Última atividade
- Tags relevantes

### 7. Eventos

1. Acesse "Eventos" no menu
2. Veja os eventos disponíveis
3. Clique em "Inscrever-se" para participar
4. Veja detalhes como:
   - Data e horário
   - Tipo (online/presencial)
   - Localização (se presencial)
   - Número de participantes
   - Duração

### 8. Recursos

1. Acesse "Artigos e Guias"
2. Navegue pelos recursos disponíveis
3. Filtre por categoria
4. Clique em "Baixar" para acessar

**Categorias:**
- Saúde
- Nutrição
- Comportamento
- Desenvolvimento

### 9. Notificações

1. Clique no ícone de sino no cabeçalho
2. Veja suas notificações
3. Clique em uma notificação para marcá-la como lida
4. Use "Marcar todas como lidas" para limpar todas

**Tipos de notificações:**
- Curtidas em seus posts
- Comentários em seus posts
- Mensagens diretas
- Eventos próximos

### 10. Configurações

1. Clique no avatar no canto superior direito
2. Selecione "Configurações"
3. Edite seu perfil:
   - Nome
   - Papel (ex: "Mãe de 2 filhos")
   - Foto de perfil (URL)
4. Configure notificações
5. Ajuste privacidade

## 🎮 Atalhos de Teclado

- **Esc:** Fecha modais e dropdowns
- **Enter:** Envia mensagens e comentários (quando em campos de texto)

## 🔍 Dicas de Uso

### Para Melhor Experiência:

1. **Use Chrome, Firefox ou Edge** para melhor compatibilidade
2. **Mantenha o navegador atualizado**
3. **Ative JavaScript** (essencial para funcionamento)
4. **Use resolução mínima de 1024x768** para desktop

### Testando Funcionalidades:

#### Criar múltiplos posts:
```javascript
// Cole no console do navegador (F12)
window.appDebug.setState({
  posts: [
    ...window.appDebug.state.posts,
    {
      id: Date.now().toString(),
      author: window.appDebug.state.currentUser,
      content: "Teste de post criado via console!",
      timeAgo: "Agora",
      likes: 0,
      comments: [],
      tag: "Geral",
      likedBy: []
    }
  ]
});
window.appDebug.render();
```

#### Ver estado atual:
```javascript
// No console
console.log(window.appDebug.state);
```

#### Simular curtida:
```javascript
// No console
window.appDebug.state.toggleLike('1'); // ID do post
window.appDebug.render();
```

#### Mostrar toast personalizado:
```javascript
// No console
window.appDebug.showToast('Mensagem personalizada!', 'success');
// Tipos: 'success', 'error', 'info'
```

## 🎨 Personalizações

### Alterar Cores (Avançado)

Edite `/styles/globals.css`:

```css
:root {
  --wheat: #F5DEB3;      /* Cor de fundo principal */
  --brown: #8B4513;      /* Cor de destaque/botões */
  --pure-white: #FFFFFF; /* Cor de cards */
}
```

### Adicionar Novo Post Mock

Edite `/js/state.js` e adicione no array `posts`:

```javascript
{
  id: 'novo-id',
  author: {
    name: 'Seu Nome',
    avatar: 'URL_DA_IMAGEM',
    role: 'Mãe/Pai de X filhos'
  },
  content: 'Conteúdo do post...',
  timeAgo: '1 hora',
  likes: 0,
  comments: [],
  tag: 'Categoria',
  likedBy: []
}
```

## 🐛 Resolução de Problemas

### Ícones não aparecem?
- Verifique sua conexão com internet (Lucide carrega via CDN)
- Limpe o cache do navegador
- Recarregue a página (F5)

### Estilos não carregam?
- Verifique se os arquivos CSS existem em `/styles/`
- Abra as ferramentas de desenvolvedor (F12) e veja erros no console
- Certifique-se de estar usando um servidor (não abrindo arquivo diretamente)

### JavaScript não funciona?
- Abra o console (F12) e veja os erros
- Verifique se todos os arquivos JS estão na pasta `/js/`
- Certifique-se de que JavaScript está habilitado no navegador

### CORS Errors?
- **Solução:** Use um servidor local (Python, Node.js ou Live Server)
- Não abra o arquivo HTML diretamente do sistema de arquivos

## 📞 Recursos de Ajuda

### Dentro da Aplicação:

- **Widget "Saúde Mental"** (barra lateral direita): Números de emergência
- **FAQ**: Clique em "Perguntas Frequentes" na barra lateral

### Números Importantes (Brasil):

- **CVV:** 188 (24h - Apoio emocional)
- **SUS:** 136 (Informações de saúde)
- **SAMU:** 192 (Emergências médicas)
- **Disque Denúncia:** 100 (Violação de direitos)

## 💡 Ideias de Uso

### Para Estudo:

1. **Aprender JavaScript Vanilla:**
   - Estude como os componentes são criados sem React
   - Veja o sistema de gerenciamento de estado
   - Entenda event handling

2. **Praticar HTML/CSS:**
   - Analise a estrutura HTML gerada
   - Estude o sistema de cores
   - Explore Tailwind CSS

3. **Entender Arquitetura:**
   - Separação de concerns (components, pages, state)
   - Padrões de design (Observer, Module)
   - Organização de código

### Para Apresentação:

1. **Demonstração de Funcionalidades:**
   - Crie posts de exemplo
   - Mostre interação (curtir, comentar)
   - Navegue entre páginas

2. **Destacar Design:**
   - Mostre paleta de cores
   - Demonstre responsividade
   - Apresente widgets e estatísticas

3. **Explicar Propósito:**
   - Foco em saúde mental parental
   - Apoio comunitário
   - Recursos educativos

## 📚 Próximos Passos

1. **Explorar todo o código**
2. **Testar todas as funcionalidades**
3. **Personalizar conforme necessidade**
4. **Adicionar novas funcionalidades**
5. **Integrar com backend real (futuro)**

---

**Divirta-se explorando a aplicação! 🎉**
