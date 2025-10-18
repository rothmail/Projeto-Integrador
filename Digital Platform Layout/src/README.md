# 👪 Família Conectada - Rede de Apoio Parental

## 📋 Descrição

Plataforma de rede social para apoio parental baseada em projeto integrador acadêmico. A aplicação visa criar um ambiente de suporte emocional e compartilhamento de experiências entre pais e responsáveis, alinhando-se com o ODS 3 da ONU (Saúde e Bem-Estar).

## 🔥 NOVIDADES!

### ✨ v2.0 - Sistema de Autenticação + CSS Puro

**Últimas atualizações:**
- 🔐 **Sistema de Autenticação Completo** - Login, cadastro, logout
- 🎨 **CSS 100% Puro** - Removido Tailwind, bundle 85% menor
- 📏 **Margens Aprimoradas** - Layout mais profissional
- 🎯 **UI/UX Melhorada** - Tela de login/cadastro elegante

**Veja:** [📝 ATUALIZACOES.md](ATUALIZACOES.md) para detalhes completos

### 🚀 Duas Versões Completas

Este projeto possui **duas versões completas**:

1. **Versão React/TypeScript** (Original) - Em `/App.tsx` e `/components`
2. **Versão JavaScript Vanilla** (Atual) - Em `/index.html` e `/js`

### 📚 Documentação Completa

**Início Rápido:**
- **[🚀 QUICKSTART.md](QUICKSTART.md)** - Comece aqui! Guia em 3 passos
- **[📖 GUIA-USO.md](GUIA-USO.md)** - Guia completo de uso
- **[🌐 instrucoes.html](instrucoes.html)** - Instruções visuais (abra no navegador)

**Técnico:**
- **[🔧 VANILLA-README.md](VANILLA-README.md)** - Documentação técnica detalhada
- **[💻 EXAMPLES.md](EXAMPLES.md)** - Exemplos de código
- **[🔐 AUTH-DOCUMENTATION.md](AUTH-DOCUMENTATION.md)** - Sistema de autenticação
- **[🎨 CSS-MIGRATION.md](CSS-MIGRATION.md)** - Migração para CSS puro

**Geral:**
- **[📝 ATUALIZACOES.md](ATUALIZACOES.md)** - Últimas atualizações
- **[📑 DOCS-INDEX.md](DOCS-INDEX.md)** - Índice completo de documentação

## 🎨 Paleta de Cores (Regra 60-30-10)

- **60% Wheat (#F5DEB3)** - Cor dominante/base
- **30% Brown (#8B4513)** - Cor secundária/contraste
- **10% Branco (#FFFFFF)** - Cor de destaque/acento
- **Cores de apoio**: Cinza (#E5E5E5, #4A4A4A) e Preto (#1A1A1A)

## 🚀 Como Executar

### Opção 1: Servidor Local Simples

1. Abra o terminal na pasta do projeto
2. Execute um servidor HTTP local:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (com http-server instalado)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

3. Acesse `http://localhost:8000` no navegador

### Opção 2: Abrir Diretamente

Simplesmente abra o arquivo `index.html` diretamente no navegador (duplo clique no arquivo).

## 📁 Estrutura de Arquivos

### Versão JavaScript Vanilla (Recomendada para início)
```
/
├── index.html              # Página principal
├── instrucoes.html         # Instruções visuais
├── styles/
│   ├── globals.css        # Estilos globais e tema
│   └── vanilla.css        # Estilos específicos vanilla
├── js/
│   ├── config.js          # Configurações
│   ├── utils.js           # Funções utilitárias
│   ├── state.js           # Gerenciamento de estado
│   ├── auth.js            # Sistema de autenticação ⭐NEW
│   ├── components.js      # Componentes de UI
│   ├── pages.js           # Páginas da aplicação
│   └── app.js             # Aplicação principal
└── Documentação/
    ├── README.md              # Este arquivo
    ├── QUICKSTART.md          # Início rápido
    ├── VANILLA-README.md      # Doc técnica
    ├── GUIA-USO.md           # Guia de uso
    ├── EXAMPLES.md           # Exemplos
    └── DOCS-INDEX.md         # Índice completo
```

### Versão React/TypeScript (Original)
```
/
├── App.tsx                 # Componente principal React
├── contexts/
│   └── AppContext.tsx     # Context API
└── components/
    ├── Header.tsx         # Cabeçalho
    ├── Sidebar.tsx        # Barra lateral
    ├── CreatePost.tsx     # Criar posts
    ├── PostCard.tsx       # Card de post
    └── [outros componentes...]
```

## ✨ Funcionalidades

### 🔐 Autenticação (NOVO!)

1. **Login** - Acesso seguro com email e senha
2. **Cadastro** - Formulário completo com:
   - Nome completo
   - Email (validado)
   - Senha (mínimo 6 caracteres)
   - Papel (Mãe, Pai, Responsável, Cuidador, Outro)
   - Idade dos filhos (opcional)
3. **Logout** - Sair com segurança
4. **Sessão Persistente** - Fica logado por 24 horas
5. **Validações** - Feedback em tempo real
6. **Avatar Automático** - Gerado com iniciais do nome

### Páginas Principais

1. **Início** - Feed principal com posts da comunidade
2. **Minha Comunidade** - Visualize e conecte-se com outros membros
3. **Conversas** - Sistema de mensagens diretas
4. **Fóruns Temáticos**:
   - Primeira Infância (0-3 anos)
   - Pré-escola (4-6 anos)
   - Adolescência
   - Necessidades Especiais
5. **Recursos** - Artigos, guias e materiais educativos
6. **Eventos** - Workshops, palestras e encontros
7. **Configurações** - Gerencie seu perfil e preferências

### Recursos Implementados

- ✅ Sistema de posts com curtidas e comentários
- ✅ Categorização por tags
- ✅ Mensagens diretas em tempo real
- ✅ Fóruns temáticos especializados
- ✅ Sistema de eventos
- ✅ Biblioteca de recursos
- ✅ Perfis de usuários
- ✅ Notificações toast
- ✅ Interface totalmente responsiva

## 🛠️ Tecnologias Utilizadas

### Versão JavaScript Vanilla
- **HTML5** - Estrutura semântica
- **CSS3 Puro** - Sistema CSS completo sem frameworks! (~30KB)
- **JavaScript ES6+ (Vanilla)** - Lógica e interatividade
- **Lucide Icons** - Ícones (via CDN)
- **localStorage** - Persistência de dados e autenticação
- **Zero dependências CSS** - Sem Tailwind, sem build tools!
- **Zero dependências JS** - Apenas Lucide Icons para ícones

### Versão React (Original)
- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Estilização
- **ShadCN UI** - Componentes
- **Lucide React** - Ícones
- **Sonner** - Toast notifications

## 📊 Estado da Aplicação

O estado é gerenciado através de um objeto JavaScript global (`AppState`) que contém:

- Posts e comentários
- Conversas e mensagens
- Membros da comunidade
- Eventos
- Recursos
- Informações do usuário atual

## 🔧 Personalização

### Adicionar Novos Posts

Edite o array `posts` em `/js/state.js`:

```javascript
{
  id: 'novo-id',
  author: { name: 'Nome', avatar: 'url', role: 'Papel' },
  content: 'Conteúdo do post',
  timeAgo: '1 hora',
  likes: 0,
  comments: [],
  tag: 'Categoria',
  likedBy: []
}
```

### Adicionar Novos Eventos

Edite o array `events` em `/js/state.js`:

```javascript
{
  id: 'evento-id',
  title: 'Título do Evento',
  date: '2025-10-20',
  time: '19:00',
  type: 'online', // ou 'presencial'
  participants: 0,
  maxParticipants: 50,
  description: 'Descrição',
  host: 'Organizador'
}
```

### Modificar Cores

Edite as variáveis CSS em `/styles/globals.css`:

```css
:root {
  --wheat: #F5DEB3;
  --brown: #8B4513;
  --pure-white: #FFFFFF;
  /* ... */
}
```

## 🎯 Objetivos do Projeto

- Promover bem-estar mental de pais e responsáveis
- Fortalecer vínculos familiares
- Criar uma comunidade solidária
- Compartilhar experiências e conhecimentos
- Oferecer suporte emocional
- Alinhamento com ODS 3 da ONU

## 📱 Compatibilidade

A aplicação é compatível com:
- ✅ Chrome/Edge (versões recentes)
- ✅ Firefox (versões recentes)
- ✅ Safari (versões recentes)
- ✅ Dispositivos móveis (responsivo)

## 🔒 Privacidade

Esta é uma aplicação frontend pura para demonstração. Em produção:

- Implemente autenticação segura
- Utilize HTTPS
- Proteja dados sensíveis
- Implemente validação server-side
- Não armazene PII sem consentimento
- Siga LGPD/GDPR

## 📝 Licença

Projeto acadêmico desenvolvido para fins educacionais.

## 👥 Contato

Para dúvidas ou sugestões sobre este projeto acadêmico, entre em contato através dos canais apropriados da instituição.

---

**Desenvolvido com 💙 para apoiar famílias e fortalecer a parentalidade**
