# Família Conectada - Versão JavaScript Vanilla

## 📋 Sobre o Projeto

Este projeto é uma transpilação completa da aplicação React/TypeScript "Família Conectada" para **JavaScript Vanilla puro** (HTML, CSS, JS). A aplicação é uma plataforma de rede social para apoio parental, seguindo rigorosamente a paleta de cores especificada com a regra 60-30-10.

## 🎨 Paleta de Cores (Regra 60-30-10)

- **60% Wheat (#F5DEB3)** - Cor dominante/base
- **30% Brown (#8B4513)** - Cor secundária/contraste  
- **10% Branco (#FFFFFF)** - Cor de destaque/acento
- **Cores de apoio:** Cinza (#E5E5E5, #4A4A4A) e Preto (#1A1A1A)

## 📁 Estrutura do Projeto

```
/
├── index.html              # Arquivo HTML principal
├── styles/
│   ├── globals.css        # Estilos globais e variáveis CSS
│   └── vanilla.css        # Estilos específicos para versão vanilla
├── js/
│   ├── config.js          # Configurações da aplicação
│   ├── utils.js           # Funções utilitárias
│   ├── state.js           # Gerenciamento de estado global
│   ├── components.js      # Componentes de UI
│   ├── pages.js           # Páginas da aplicação
│   └── app.js             # Arquivo principal da aplicação
```

## 🚀 Como Usar

### Método 1: Servidor Local Simples

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (com http-server)
npx http-server -p 8000
```

Depois acesse: `http://localhost:8000`

### Método 2: Live Server (VS Code)

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

### Método 3: Abrir Diretamente

Simplesmente abra o arquivo `index.html` no seu navegador. Algumas funcionalidades podem não funcionar devido a restrições CORS.

## 🎨 CSS Puro - Sem Frameworks!

**Novidade:** Este projeto agora usa **CSS 100% puro**, sem Tailwind ou qualquer framework CSS!

### Vantagens

- ✅ **Zero Dependências CSS** - Apenas Lucide Icons via CDN
- ✅ **Bundle Menor** - ~30KB vs ~200KB+ do Tailwind
- ✅ **Mais Rápido** - Carregamento instantâneo
- ✅ **Controle Total** - Customização completa
- ✅ **Aprendizado** - CSS nativo, transferível
- ✅ **Sem Build** - Roda diretamente no navegador

### Sistema CSS

Veja `/styles/vanilla.css` para o sistema completo:
- Layout (Flexbox, Grid, Containers)
- Spacing (Padding, Margin)
- Typography
- Componentes (Buttons, Cards, Inputs, etc.)
- Utilities (como Tailwind, mas customizado)
- Animações e Transições
- Responsividade

📖 **Guia de Migração:** Veja [CSS-MIGRATION.md](CSS-MIGRATION.md) para detalhes

## 🔧 Arquitetura

### Estado Global (state.js)

O estado da aplicação é gerenciado através de um objeto global `AppState` que contém:

- `currentPage`: Página atual
- `currentForum`: Fórum atual selecionado
- `currentUser`: Dados do usuário atual
- `posts`: Array de posts
- `conversations`: Array de conversas
- `events`: Array de eventos
- `resources`: Array de recursos
- `communities`: Array de comunidades
- `notifications`: Array de notificações

### Sistema de Reatividade

Utiliza um padrão Observer simples:
- `setState(updates)`: Atualiza o estado
- `subscribe(listener)`: Inscreve um listener
- `notifyListeners()`: Notifica todos os listeners

### Componentes (components.js)

Funções que retornam strings HTML:
- `renderHeader()`: Cabeçalho com notificações
- `renderSidebar()`: Barra lateral de navegação
- `renderCreatePost()`: Formulário de criação de posts
- `renderPostCard()`: Card de post individual
- `renderCommunityStats()`: Widget de estatísticas
- `renderResourcesWidget()`: Widget de recursos
- E outros...

### Páginas (pages.js)

Funções que renderizam páginas completas:
- `renderHomePage()`: Página inicial com feed
- `renderConversationsPage()`: Página de mensagens
- `renderCommunityPage()`: Página de comunidades
- `renderEventsPage()`: Página de eventos
- `renderResourcesPage()`: Página de recursos
- `renderForumPage()`: Páginas de fóruns temáticos
- `renderSettingsPage()`: Página de configurações

### Utilitários (utils.js)

Funções auxiliares:
- `showToast()`: Sistema de notificações toast
- `initIcons()`: Inicializa ícones Lucide
- `formatTimeAgo()`: Formata datas relativas
- `escapeHtml()`: Previne XSS
- `createAvatar()`: Cria elementos de avatar
- `showModal()`: Sistema de modais
- E muitas outras...

## 🎯 Funcionalidades

### ✅ Implementadas

- [x] Sistema de posts com curtidas e comentários
- [x] Navegação entre páginas
- [x] Sistema de mensagens/conversas
- [x] Fóruns temáticos (4 categorias)
- [x] Filtros por tópicos nos fóruns
- [x] Página de eventos
- [x] Página de recursos
- [x] Página de comunidades
- [x] Sistema de notificações
- [x] Widgets de estatísticas
- [x] Recursos de saúde mental
- [x] Frases inspiracionais
- [x] Sistema de toast notifications
- [x] Gerenciamento de estado global
- [x] Responsive design (via Tailwind)
- [x] Ícones (Lucide)
- [x] Paleta de cores conforme especificação

### 🔄 Para Implementar (Funcionalidades Futuras)

- [ ] Persistência em LocalStorage
- [ ] Busca de posts e membros
- [ ] Upload de imagens real
- [ ] PWA (Progressive Web App)
- [ ] Service Worker para offline
- [ ] Autenticação real
- [ ] Integração com backend/API
- [ ] Edição e exclusão de posts
- [ ] Sistema de reações (além de curtir)
- [ ] Menções (@) e hashtags (#)

## 📱 Fóruns Temáticos

### 1. Primeira Infância (0-3 anos)
- Desenvolvimento Motor
- Alimentação
- Sono e Rotina
- Amamentação
- Vacinas
- Primeiros Passos

### 2. Pré-escola (4-6 anos)
- Alfabetização
- Socialização
- Comportamento
- Autonomia
- Atividades Educativas
- Preparação Escolar

### 3. Adolescência
- Comunicação
- Autonomia
- Saúde Mental
- Redes Sociais
- Estudos
- Transição para Adulto

### 4. Necessidades Especiais
- TEA - Autismo
- TDAH
- Inclusão Escolar
- Terapias
- Direitos
- Recursos Especializados

## 🎨 Estilização

### CSS Global (globals.css)

Define as variáveis CSS customizadas seguindo a paleta de cores do projeto:

```css
:root {
  --wheat: #F5DEB3;      /* 60% - Cor dominante */
  --brown: #8B4513;      /* 30% - Cor secundária */
  --pure-white: #FFFFFF; /* 10% - Cor de destaque */
  /* ... outras variáveis */
}
```

### CSS Vanilla (vanilla.css)

Estilos específicos para a versão vanilla:
- Animações
- Toasts
- Modais
- Dropdowns
- Botões
- Inputs
- Cards
- E mais...

### Tailwind CSS

Utiliza Tailwind CSS via CDN para utilitários de layout e responsividade.

## 🔒 Segurança

- Escape de HTML para prevenir XSS: `escapeHtml()`
- Validação de URLs: `isValidUrl()`
- Sanitização de inputs
- Sem eval() ou innerHTML direto com dados do usuário

## 📊 Dados Mockados

Todos os dados são mockados localmente em `state.js`:
- 15+ posts de exemplo
- 3 conversas ativas
- 4 eventos
- 4 recursos
- 5 comunidades
- 4 membros em destaque
- 2 notificações

## 🌐 Navegação

```
Home (/)
├── Conversas
├── Comunidade
├── Recursos
├── Eventos
├── Fóruns
│   ├── Primeira Infância (0-3 anos)
│   ├── Pré-escola (4-6 anos)
│   ├── Adolescência
│   └── Necessidades Especiais
└── Configurações
```

## 🐛 Debug Mode

Em ambiente local (localhost), o modo debug está ativado:

```javascript
window.appDebug = {
  state: AppState,
  setState,
  render,
  showToast,
  showModal,
  closeModal
};
```

Use no console do navegador para testar funcionalidades.

## 📝 Notas Técnicas

### Por que Vanilla JS?

Esta versão foi criada para:
1. Demonstrar que toda funcionalidade React pode ser replicada em JS puro
2. Reduzir dependências e tamanho do bundle
3. Melhor compreensão dos conceitos fundamentais
4. Maior controle sobre o código
5. Possibilidade de rodar sem build tools

### Limitações

- Sem virtual DOM (rerenderização completa)
- Manipulação de DOM mais verbosa
- Sem hot reload nativo
- Gerenciamento de estado mais manual
- Sem type safety (TypeScript)

### Performance

- Rerenderização completa da página a cada mudança de estado
- Pode ser melhorada com:
  - Virtual DOM customizado
  - Renderização parcial
  - Memoização de componentes
  - Web Components

## 🔮 Melhorias Futuras

1. **Virtual DOM Simples**: Implementar diff/patch para updates parciais
2. **Web Components**: Converter componentes para Custom Elements
3. **Router**: Sistema de roteamento com history API
4. **State Management**: Melhorar com proxy/observers
5. **Build Process**: Adicionar minificação e bundling
6. **Tests**: Adicionar testes unitários
7. **Accessibility**: Melhorar ARIA labels e navegação por teclado

## 📄 Licença

Este projeto é parte de um Projeto Integrador acadêmico.

## 👥 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato através dos canais apropriados da instituição.

---

**Desenvolvido com ❤️ para apoiar famílias brasileiras**
