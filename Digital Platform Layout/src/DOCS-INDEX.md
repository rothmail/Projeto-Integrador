# 📚 Índice de Documentação - Família Conectada

## 🎯 Para Começar Rapidamente

- **[QUICKSTART.md](QUICKSTART.md)** - Comece aqui! Guia em 3 passos
- **[instrucoes.html](instrucoes.html)** - Instruções visuais (abra no navegador)

## 📖 Documentação Principal

### Para Usuários
- **[GUIA-USO.md](GUIA-USO.md)** - Guia completo de uso da aplicação
  - Como criar posts
  - Como usar fóruns
  - Como enviar mensagens
  - Todas as funcionalidades explicadas

### Para Desenvolvedores
- **[VANILLA-README.md](VANILLA-README.md)** - Documentação técnica completa
  - Arquitetura do projeto
  - Sistema de estado
  - Componentes
  - Páginas
  - Segurança
  - Performance

- **[EXAMPLES.md](EXAMPLES.md)** - Exemplos de código
  - Manipulação de estado
  - Criar posts programaticamente
  - Sistema de curtidas
  - Comentários
  - Navegação
  - Componentes customizados

## 📁 Estrutura de Arquivos

### Frontend (Versão Vanilla JS)

```
├── index.html                    # Arquivo HTML principal
├── instrucoes.html               # Página de instruções
│
├── styles/
│   ├── globals.css              # Estilos globais e variáveis CSS
│   └── vanilla.css              # Estilos específicos vanilla JS
│
└── js/
    ├── config.js                # Configurações da aplicação
    ├── utils.js                 # Funções utilitárias
    ├── state.js                 # Gerenciamento de estado global
    ├── components.js            # Componentes de UI
    ├── pages.js                 # Páginas da aplicação
    └── app.js                   # Arquivo principal
```

### Backend (Versão React - Original)

```
├── App.tsx                       # Componente React principal
├── contexts/
│   └── AppContext.tsx           # Context API do React
│
└── components/
    ├── Header.tsx               # Cabeçalho
    ├── Sidebar.tsx              # Barra lateral
    ├── CreatePost.tsx           # Criar posts
    ├── PostCard.tsx             # Card de post
    ├── ConversationsPage.tsx    # Página de conversas
    ├── CommunityPage.tsx        # Página de comunidade
    ├── EventsPage.tsx           # Página de eventos
    ├── ResourcesPage.tsx        # Página de recursos
    ├── ForumPage.tsx            # Páginas de fóruns
    ├── SettingsPage.tsx         # Página de configurações
    └── ui/                      # Componentes UI (ShadCN)
```

## 🎨 Especificações de Design

### Paleta de Cores (Regra 60-30-10)
- **60% Wheat** (#F5DEB3) - Cor dominante/base
- **30% Brown** (#8B4513) - Cor secundária/contraste
- **10% Branco** (#FFFFFF) - Cor de destaque/acento
- **Cores de apoio:** Cinza e Preto

### Fundamentação Teórica
O projeto baseia-se em:
- Estudos sobre saúde mental na infância
- Percepção comportamental dos transtornos mentais
- Influência do contexto familiar no desenvolvimento psicológico
- ODS 3 da ONU (Saúde e Bem-Estar)

## 🚀 Guias de Início

### Método 1: Python (Mais Simples)
```bash
cd caminho/para/projeto
python -m http.server 8000
# Abrir: http://localhost:8000
```

### Método 2: Node.js
```bash
npx http-server -p 8000
# Abrir: http://localhost:8000
```

### Método 3: VS Code Live Server
1. Instalar extensão "Live Server"
2. Botão direito em `index.html`
3. "Open with Live Server"

## 📱 Funcionalidades Principais

### Implementadas ✅
- [x] Sistema de posts com curtidas e comentários
- [x] 4 fóruns temáticos especializados
- [x] Sistema de mensagens/conversas
- [x] Página de eventos e inscrições
- [x] Biblioteca de recursos educativos
- [x] Comunidades temáticas
- [x] Sistema de notificações
- [x] Widgets de estatísticas
- [x] Recursos de saúde mental
- [x] Frases inspiracionais
- [x] Navegação completa
- [x] Design responsivo
- [x] Toast notifications
- [x] Sistema de modais
- [x] Filtros por tópicos

### Futuras 🔮
- [ ] Persistência em LocalStorage
- [ ] Busca avançada
- [ ] Upload de imagens real
- [ ] PWA (Progressive Web App)
- [ ] Autenticação
- [ ] Integração com backend
- [ ] Edição e exclusão de posts
- [ ] Reações adicionais
- [ ] Menções (@) e hashtags (#)

## 🎯 Fóruns Temáticos

### 1. Primeira Infância (0-3 anos)
Tópicos: Desenvolvimento Motor, Alimentação, Sono, Amamentação, Vacinas, Primeiros Passos

### 2. Pré-escola (4-6 anos)
Tópicos: Alfabetização, Socialização, Comportamento, Autonomia, Atividades Educativas

### 3. Adolescência
Tópicos: Comunicação, Autonomia, Saúde Mental, Redes Sociais, Estudos

### 4. Necessidades Especiais
Tópicos: TEA, TDAH, Inclusão Escolar, Terapias, Direitos, Recursos

## 🔧 Tecnologias Utilizadas

### Versão Vanilla JS (Principal)
- HTML5
- CSS3 (com variáveis CSS)
- JavaScript ES6+
- Tailwind CSS (via CDN)
- Lucide Icons (via CDN)

### Versão React (Original)
- React 18
- TypeScript
- Tailwind CSS v4
- ShadCN UI
- Lucide React
- Sonner (Toasts)

## 📊 Dados Mock

### Posts
15+ posts de exemplo com:
- Conteúdo variado
- Múltiplas categorias
- Curtidas e comentários
- Imagens (algumas)

### Conversas
3 conversas ativas com:
- Mensagens de ida e volta
- Status online/offline
- Contador de não lidas

### Eventos
4 eventos com:
- Online e presenciais
- Diferentes categorias
- Datas futuras
- Sistema de inscrição

### Recursos
4 recursos educativos:
- PDFs e vídeos
- Múltiplas categorias
- Contador de downloads

### Comunidades
5 comunidades temáticas:
- Diferentes localizações
- Estatísticas de membros
- Sistema de participação

## 🐛 Debug e Testes

### Console Debug
```javascript
// Acessar estado
window.appDebug.state

// Atualizar estado
window.appDebug.setState({currentPage: 'home'})

// Re-renderizar
window.appDebug.render()

// Toast teste
window.appDebug.showToast('Teste!', 'success')
```

### Testes Rápidos
Ver [EXAMPLES.md](EXAMPLES.md) para exemplos completos de:
- Criar posts
- Curtir e comentar
- Navegar entre páginas
- Enviar mensagens
- Manipular estado

## 📞 Recursos de Saúde Mental

### Números de Emergência (Brasil)
- **CVV:** 188 (24h - Apoio emocional)
- **SUS:** 136 (Informações de saúde)
- **SAMU:** 192 (Emergências médicas)
- **Disque Denúncia:** 100 (Violação de direitos)

## 🎓 Contexto Acadêmico

Este projeto é parte de um **Projeto Integrador** acadêmico que visa:

1. Criar ambiente de suporte emocional para pais
2. Facilitar compartilhamento de experiências
3. Promover bem-estar mental familiar
4. Fortalecer vínculos familiares
5. Criar comunidade solidária
6. Alinhar-se com ODS 3 da ONU

## 📝 Licença e Uso

Este projeto é desenvolvido para fins acadêmicos e educacionais.

## 🤝 Contribuição

Para sugestões ou melhorias:
1. Estude a documentação
2. Veja os exemplos
3. Teste as funcionalidades
4. Proponha melhorias fundamentadas

## 🗺️ Mapa de Navegação

```
Início (Home)
├── Feed de Posts
│   ├── Criar Post
│   ├── Curtir Posts
│   └── Comentar Posts
│
├── Conversas
│   ├── Lista de Conversas
│   └── Janela de Chat
│
├── Comunidade
│   ├── Listar Comunidades
│   └── Participar/Sair
│
├── Fóruns Temáticos
│   ├── Primeira Infância (0-3)
│   ├── Pré-escola (4-6)
│   ├── Adolescência
│   └── Necessidades Especiais
│
├── Recursos
│   ├── Artigos e Guias
│   └── Downloads
│
├── Eventos
│   ├── Listar Eventos
│   └── Inscrever-se
│
└── Configurações
    ├── Perfil
    ├── Notificações
    └── Privacidade
```

## 🔍 FAQ Rápido

**Q: Preciso instalar algo?**
A: Apenas um servidor local (Python, Node.js ou VS Code Live Server)

**Q: Os dados são salvos?**
A: Não, tudo é mock/temporário (por enquanto)

**Q: Funciona offline?**
A: Não completamente (ícones carregam via CDN)

**Q: É responsivo?**
A: Sim, funciona em desktop, tablet e mobile

**Q: Posso personalizar?**
A: Sim! Edite os arquivos CSS e JS

**Q: Como adiciono mais posts?**
A: Via interface ou programaticamente (ver EXAMPLES.md)

## 📧 Suporte

Para dúvidas:
1. Leia a documentação completa
2. Veja os exemplos de código
3. Use o console do navegador para debug
4. Consulte os guias específicos

---

## 🎯 Começar Agora

1. ✅ [Leia o QUICKSTART](QUICKSTART.md)
2. ✅ Inicie o servidor local
3. ✅ Abra a aplicação
4. ✅ Explore as funcionalidades
5. ✅ Leia os guias conforme necessário

---

**Desenvolvido com ❤️ para apoiar famílias brasileiras**

Última atualização: Outubro 2025
Versão: 1.0.0
