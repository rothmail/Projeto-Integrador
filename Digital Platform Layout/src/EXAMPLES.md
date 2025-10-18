# 📝 Exemplos de Código - Família Conectada

## Índice
1. [Manipulação de Estado](#manipulação-de-estado)
2. [Criação de Posts](#criação-de-posts)
3. [Sistema de Curtidas](#sistema-de-curtidas)
4. [Comentários](#comentários)
5. [Navegação](#navegação)
6. [Notificações](#notificações)
7. [Componentes Customizados](#componentes-customizados)
8. [Hooks de Eventos](#hooks-de-eventos)

---

## Manipulação de Estado

### Ver Estado Atual
```javascript
// No console do navegador (F12)
console.log(window.appDebug.state);
```

### Atualizar Estado
```javascript
// Atualizar página atual
window.appDebug.setState({
  currentPage: 'community'
});

// Atualizar múltiplos valores
window.appDebug.setState({
  currentPage: 'forum',
  currentForum: 'adolescencia'
});
```

### Adicionar Listener
```javascript
function meuListener(state) {
  console.log('Estado atualizado:', state);
}

// Adicionar listener
const unsubscribe = subscribe(meuListener);

// Remover listener quando não precisar mais
unsubscribe();
```

---

## Criação de Posts

### Criar Post Programaticamente
```javascript
// Criar um post simples
addPost(
  'Conteúdo do meu post',
  null, // sem imagem
  'Geral' // tag
);

// Criar post com imagem
addPost(
  'Post com imagem!',
  'https://images.unsplash.com/photo-1621523394092-142667dc2d05?w=500&h=300',
  'Desenvolvimento Emocional'
);

// Re-renderizar para ver mudanças
render();
```

### Post Completo com Todos os Campos
```javascript
const novoPost = {
  id: generateId(),
  author: {
    name: 'João Silva',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
    role: 'Pai de 2 filhos'
  },
  content: 'Hoje meu filho deu os primeiros passos! 🎉',
  imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400',
  timeAgo: 'Agora',
  likes: 0,
  comments: [],
  tag: 'Desenvolvimento Motor',
  likedBy: []
};

AppState.posts.unshift(novoPost);
render();
```

### Criar Vários Posts de Uma Vez
```javascript
const posts = [
  { content: 'Post 1', tag: 'Geral' },
  { content: 'Post 2', tag: 'Saúde Mental' },
  { content: 'Post 3', tag: 'Alimentação' }
];

posts.forEach(post => {
  addPost(post.content, null, post.tag);
});

render();
```

---

## Sistema de Curtidas

### Curtir um Post
```javascript
// Curtir post com ID '1'
toggleLike('1');
render();
```

### Verificar se Usuário Curtiu
```javascript
const post = AppState.posts.find(p => p.id === '1');
const isCurtido = post.likedBy.includes(AppState.currentUser.name);
console.log('Usuário curtiu?', isCurtido);
```

### Adicionar Curtidas Programaticamente
```javascript
const post = AppState.posts.find(p => p.id === '1');
post.likes = 50;
post.likedBy = ['User1', 'User2', 'User3'];
render();
```

---

## Comentários

### Adicionar Comentário
```javascript
addComment('1', 'Ótimo post! Parabéns!');
render();
```

### Adicionar Comentário Completo
```javascript
const post = AppState.posts.find(p => p.id === '1');
post.comments.push({
  id: generateId(),
  author: {
    name: 'Maria Santos',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32'
  },
  content: 'Comentário detalhado aqui...',
  timeAgo: '5 min'
});
render();
```

### Listar Comentários de um Post
```javascript
const post = AppState.posts.find(p => p.id === '1');
console.log('Comentários:', post.comments);
```

---

## Navegação

### Navegar Entre Páginas
```javascript
// Página inicial
navigateTo('home');

// Conversas
navigateTo('conversations');

// Comunidade
navigateTo('community');

// Eventos
navigateTo('events');

// Recursos
navigateTo('resources');

// Configurações
navigateTo('settings');

// Fórum específico
navigateTo('forum', 'primeira-infancia');
navigateTo('forum', 'pre-escola');
navigateTo('forum', 'adolescencia');
navigateTo('forum', 'necessidades-especiais');
```

### Obter Página Atual
```javascript
console.log('Página atual:', AppState.currentPage);
console.log('Fórum atual:', AppState.currentForum);
```

---

## Notificações

### Mostrar Toast
```javascript
// Sucesso
showToast('Operação realizada com sucesso!', 'success');

// Erro
showToast('Algo deu errado!', 'error');

// Informação
showToast('Bem-vindo à aplicação!', 'info');
```

### Adicionar Notificação
```javascript
const novaNotificacao = {
  id: generateId(),
  type: 'comment',
  content: 'comentou em seu post',
  timeAgo: 'Agora',
  read: false,
  author: {
    name: 'Carlos Silva',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32'
  }
};

AppState.notifications.unshift(novaNotificacao);
render();
```

### Marcar Notificação Como Lida
```javascript
markNotificationAsRead('1');
render();
```

### Marcar Todas Como Lidas
```javascript
markAllNotificationsAsRead();
render();
```

---

## Componentes Customizados

### Criar Avatar Personalizado
```javascript
const avatar = createAvatar(
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40',
  'Maria Silva',
  'lg' // 'sm', 'md', 'lg', 'xl'
);

console.log(avatar); // HTML string
```

### Criar Badge
```javascript
const badge = createBadge('Novo Membro', 'primary');
// ou
const badgeSecondary = createBadge('Moderador', 'secondary');

console.log(badge); // HTML string
```

### Criar Modal Customizado
```javascript
const conteudoModal = `
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Título do Modal</h2>
    <p class="mb-4">Conteúdo do modal aqui...</p>
    <button onclick="closeModal()" class="btn btn-primary">
      Fechar
    </button>
  </div>
`;

showModal(conteudoModal);
```

### Confirmar Ação
```javascript
showConfirm(
  'Tem certeza que deseja realizar esta ação?',
  () => {
    console.log('Ação confirmada!');
    showToast('Ação executada!', 'success');
  }
);
```

---

## Hooks de Eventos

### Adicionar Listener de Scroll
```javascript
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  console.log('Scroll position:', scrollTop);
});
```

### Detectar Redimensionamento
```javascript
window.addEventListener('resize', debounce(() => {
  console.log('Window resized:', window.innerWidth, window.innerHeight);
}, 250));
```

### Detectar Click Fora de Elemento
```javascript
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('meu-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    console.log('Clicked outside dropdown');
  }
});
```

---

## Exemplos Avançados

### Filtrar Posts por Tag
```javascript
const postsPorTag = AppState.posts.filter(post => 
  post.tag === 'Desenvolvimento Emocional'
);
console.log('Posts encontrados:', postsPorTag.length);
```

### Buscar Posts por Conteúdo
```javascript
const termoBusca = 'sono';
const resultados = AppState.posts.filter(post =>
  post.content.toLowerCase().includes(termoBusca.toLowerCase())
);
console.log('Resultados:', resultados);
```

### Ordenar Posts por Curtidas
```javascript
const postsOrdenados = [...AppState.posts].sort((a, b) => b.likes - a.likes);
console.log('Post mais curtido:', postsOrdenados[0]);
```

### Estatísticas da Aplicação
```javascript
const stats = {
  totalPosts: AppState.posts.length,
  totalCurtidas: AppState.posts.reduce((sum, post) => sum + post.likes, 0),
  totalComentarios: AppState.posts.reduce((sum, post) => sum + post.comments.length, 0),
  totalConversas: AppState.conversations.length,
  totalEventos: AppState.events.length,
  postsHoje: AppState.posts.filter(p => p.timeAgo.includes('hora') || p.timeAgo === 'Agora').length
};

console.log('Estatísticas:', stats);
```

### Exportar Dados
```javascript
// Exportar posts como JSON
const exportarPosts = () => {
  const json = JSON.stringify(AppState.posts, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'posts.json';
  a.click();
};

exportarPosts();
```

### Importar Dados
```javascript
// Importar posts de JSON
const importarPosts = (jsonString) => {
  try {
    const posts = JSON.parse(jsonString);
    AppState.posts = [...posts, ...AppState.posts];
    render();
    showToast('Posts importados com sucesso!', 'success');
  } catch (error) {
    showToast('Erro ao importar posts', 'error');
  }
};

// Uso:
// const json = '[]'; // seu JSON aqui
// importarPosts(json);
```

### Limpar Todos os Posts
```javascript
const limparPosts = () => {
  showConfirm(
    'Tem certeza que deseja limpar todos os posts?',
    () => {
      AppState.posts = [];
      render();
      showToast('Todos os posts foram removidos', 'success');
    }
  );
};

limparPosts();
```

### Resetar Aplicação
```javascript
const resetar = () => {
  showConfirm(
    'Tem certeza que deseja resetar a aplicação?',
    () => {
      location.reload();
    }
  );
};

resetar();
```

---

## Testes Rápidos

### Teste 1: Criar e Curtir Post
```javascript
// 1. Criar post
addPost('Post de teste!', null, 'Geral');
render();

// 2. Pegar ID do último post
const ultimoPost = AppState.posts[0];

// 3. Curtir
toggleLike(ultimoPost.id);
render();

// 4. Verificar
console.log('Curtidas:', ultimoPost.likes);
```

### Teste 2: Adicionar Comentário
```javascript
// 1. Pegar primeiro post
const post = AppState.posts[0];

// 2. Adicionar comentário
addComment(post.id, 'Comentário de teste!');
render();

// 3. Verificar
console.log('Comentários:', post.comments.length);
```

### Teste 3: Navegar e Voltar
```javascript
// 1. Ir para eventos
navigateTo('events');

// 2. Aguardar 2 segundos
setTimeout(() => {
  // 3. Voltar para home
  navigateTo('home');
}, 2000);
```

### Teste 4: Ciclo Completo
```javascript
// Criar post → Curtir → Comentar → Toast
const teste = async () => {
  // Criar
  addPost('Teste completo!', null, 'Geral');
  render();
  showToast('Post criado!', 'success');
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Curtir
  const post = AppState.posts[0];
  toggleLike(post.id);
  render();
  showToast('Post curtido!', 'success');
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Comentar
  addComment(post.id, 'Ótimo!');
  render();
  showToast('Comentário adicionado!', 'success');
};

teste();
```

---

## Utilidades

### Formatar Número
```javascript
console.log(formatNumber(1234567)); // "1.234.567"
```

### Validar URL
```javascript
console.log(isValidUrl('https://google.com')); // true
console.log(isValidUrl('invalid')); // false
```

### Truncar Texto
```javascript
console.log(truncate('Texto muito longo aqui...', 20)); // "Texto muito longo..."
```

### Gerar ID Único
```javascript
const id = generateId();
console.log('Novo ID:', id);
```

### Copiar para Clipboard
```javascript
copyToClipboard('Texto para copiar');
// Mostra toast de confirmação
```

### Escape HTML
```javascript
const textoSeguro = escapeHtml('<script>alert("xss")</script>');
console.log(textoSeguro); // <script>...
```

---

## Dicas de Debug

### Monitorar Mudanças de Estado
```javascript
subscribe((state) => {
  console.log('Estado mudou!', state);
});
```

### Log de Performance
```javascript
console.time('render');
render();
console.timeEnd('render');
```

### Breakpoints Condicionais
```javascript
// No console, antes de executar ações
debugger; // Para executação aqui
```

### Inspecionar Elemento
```javascript
// Pegar elemento pelo ID
const el = document.getElementById('post-1');
console.log(el);

// Ver todos os posts renderizados
const posts = document.querySelectorAll('[id^="comments-"]');
console.log('Posts renderizados:', posts.length);
```

---

**💡 Dica:** Todos esses exemplos podem ser executados diretamente no console do navegador (F12) quando a aplicação estiver rodando!
