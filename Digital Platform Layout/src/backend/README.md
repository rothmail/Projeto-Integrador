# 🚀 Backend API - Família Conectada

## 📋 Descrição

API RESTful para a plataforma Família Conectada - Rede de apoio parental.

Desenvolvida com Node.js, Express e MySQL.

---

## 🛠️ Tecnologias

- **Node.js** 14+
- **Express.js** 4.x
- **MySQL** 8.0+
- **JWT** (JSON Web Tokens)
- **bcrypt** (Hash de senhas)
- **CORS** (Cross-Origin Resource Sharing)

---

## 📁 Estrutura de Diretórios

```
backend/
├── server.js                    # Servidor principal
├── package.json                 # Dependências
├── .env.example                # Exemplo de variáveis de ambiente
├── .gitignore                  # Arquivos ignorados pelo git
├── config/
│   └── database.js             # Configuração do MySQL
├── middlewares/
│   └── authMiddleware.js       # Middleware de autenticação JWT
├── routes/
│   ├── auth.js                 # Rotas de autenticação
│   ├── users.js                # Rotas de usuários
│   ├── posts.js                # Rotas de posts
│   ├── conversations.js        # Rotas de conversas
│   ├── events.js               # Rotas de eventos
│   ├── resources.js            # Rotas de recursos
│   ├── forums.js               # Rotas de fóruns
│   └── notifications.js        # Rotas de notificações
└── controllers/
    ├── authController.js       # Lógica de autenticação
    ├── usersController.js      # Lógica de usuários
    ├── postsController.js      # Lógica de posts
    ├── conversationsController.js
    ├── eventsController.js
    ├── resourcesController.js
    ├── forumsController.js
    └── notificationsController.js
```

---

## 🚀 Instalação

### Passo 1: Instalar Dependências

```bash
cd backend
npm install
```

### Passo 2: Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com suas configurações
nano .env
```

Configurar `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=familia_conectada
DB_PORT=3306

JWT_SECRET=gerar_chave_aleatoria_segura_aqui
JWT_EXPIRES_IN=24h

PORT=3001
NODE_ENV=development

FRONTEND_URL=http://localhost:5173
```

**⚠️ IMPORTANTE:** Gere uma chave JWT segura:

```bash
# No terminal (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Passo 3: Criar Banco de Dados

1. Abra MySQL Workbench
2. Execute `/db/schema.sql`
3. Execute `/db/seeds.sql`

### Passo 4: Iniciar Servidor

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start
```

O servidor estará rodando em: `http://localhost:3001`

---

## 📡 Endpoints da API

### 🔐 Autenticação (`/api/auth`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/register` | Cadastrar usuário | ❌ |
| POST | `/api/auth/login` | Login | ❌ |
| GET | `/api/auth/me` | Dados do usuário logado | ✅ |
| POST | `/api/auth/logout` | Logout | ✅ |
| POST | `/api/auth/refresh` | Renovar token | ❌ |

### 👥 Usuários (`/api/users`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/users` | Listar usuários | ❌ |
| GET | `/api/users/:id` | Buscar usuário | ❌ |
| GET | `/api/users/profile/me` | Meu perfil completo | ✅ |
| PUT | `/api/users/profile` | Atualizar perfil | ✅ |
| PUT | `/api/users/password` | Alterar senha | ✅ |
| DELETE | `/api/users/account` | Deletar conta | ✅ |

### 📝 Posts (`/api/posts`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/posts` | Listar posts | ❌ |
| GET | `/api/posts/:id` | Buscar post | ❌ |
| POST | `/api/posts` | Criar post | ✅ |
| PUT | `/api/posts/:id` | Atualizar post | ✅ |
| DELETE | `/api/posts/:id` | Deletar post | ✅ |
| POST | `/api/posts/:id/like` | Curtir/Descurtir | ✅ |
| GET | `/api/posts/:id/comments` | Listar comentários | ❌ |
| POST | `/api/posts/:id/comments` | Adicionar comentário | ✅ |
| DELETE | `/api/posts/:id/comments/:commentId` | Deletar comentário | ✅ |

### 💬 Conversas (`/api/conversations`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/conversations` | Minhas conversas | ✅ |
| GET | `/api/conversations/:id` | Buscar conversa | ✅ |
| POST | `/api/conversations` | Criar conversa | ✅ |
| GET | `/api/conversations/:id/messages` | Mensagens | ✅ |
| POST | `/api/conversations/:id/messages` | Enviar mensagem | ✅ |
| PUT | `/api/conversations/messages/:messageId/read` | Marcar como lida | ✅ |

### 📅 Eventos (`/api/events`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/events` | Listar eventos | ❌ |
| GET | `/api/events/:id` | Buscar evento | ❌ |
| POST | `/api/events` | Criar evento | ✅ |
| PUT | `/api/events/:id` | Atualizar evento | ✅ |
| DELETE | `/api/events/:id` | Deletar evento | ✅ |
| POST | `/api/events/:id/rsvp` | Confirmar presença | ✅ |
| GET | `/api/events/:id/participants` | Participantes | ❌ |

### 📚 Recursos (`/api/resources`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/resources` | Listar recursos | ❌ |
| GET | `/api/resources/:id` | Buscar recurso | ❌ |
| POST | `/api/resources/:id/bookmark` | Salvar/Remover | ✅ |
| GET | `/api/resources/bookmarks/my` | Meus salvos | ✅ |
| POST | `/api/resources/:id/view` | Incrementar views | ❌ |

### 🎯 Fóruns (`/api/forums`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/forums` | Listar fóruns | ❌ |
| GET | `/api/forums/:type` | Buscar fórum | ❌ |
| GET | `/api/forums/:type/posts` | Posts do fórum | ❌ |
| GET | `/api/forums/:type/posts/:postId` | Buscar post | ❌ |
| POST | `/api/forums/:type/posts` | Criar post | ✅ |
| PUT | `/api/forums/:type/posts/:postId` | Atualizar post | ✅ |
| DELETE | `/api/forums/:type/posts/:postId` | Deletar post | ✅ |
| GET | `/api/forums/:type/posts/:postId/replies` | Respostas | ❌ |
| POST | `/api/forums/:type/posts/:postId/replies` | Adicionar resposta | ✅ |
| DELETE | `/api/forums/:type/posts/:postId/replies/:replyId` | Deletar resposta | ✅ |

### 🔔 Notificações (`/api/notifications`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/notifications` | Listar notificações | ✅ |
| GET | `/api/notifications/unread` | Contar não lidas | ✅ |
| PUT | `/api/notifications/:id/read` | Marcar como lida | ✅ |
| PUT | `/api/notifications/read-all` | Marcar todas como lidas | ✅ |
| DELETE | `/api/notifications/:id` | Deletar notificação | ✅ |

---

## 🔐 Autenticação

A API usa **JWT (JSON Web Tokens)** para autenticação.

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "maria@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Maria Silva",
    "email": "maria@email.com",
    "role": "mae",
    "avatar": "MS"
  }
}
```

### Usando o Token

Adicione o token no header `Authorization`:

```bash
GET /api/users/profile/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 📝 Exemplos de Uso

### Cadastro de Usuário

```javascript
const response = await fetch('http://localhost:3001/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Ana Silva',
    email: 'ana@email.com',
    password: '123456',
    role: 'mae',
    childrenAges: ['0-2', '3-5']
  })
});

const data = await response.json();
console.log(data.token); // Salvar token
```

### Criar Post

```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3001/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    content: 'Meu primeiro post!',
    tag: 'geral'
  })
});

const data = await response.json();
```

### Listar Posts

```javascript
const response = await fetch('http://localhost:3001/api/posts?page=1&limit=10');
const data = await response.json();

console.log(data.posts); // Array de posts
console.log(data.pagination); // Info de paginação
```

### Curtir Post

```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3001/api/posts/1/like', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data.liked); // true ou false
```

---

## 🧪 Testando a API

### Usando cURL

```bash
# Health check
curl http://localhost:3001/api/health

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@email.com","password":"123456"}'

# Listar posts
curl http://localhost:3001/api/posts

# Criar post (com token)
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"content":"Meu post","tag":"geral"}'
```

### Usando Postman/Insomnia

1. Import a coleção (criar arquivo JSON)
2. Configure variável `baseUrl`: `http://localhost:3001/api`
3. Configure variável `token` após login
4. Teste os endpoints

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
npm install
```

### Erro: "Access denied for user"

Verificar `.env`:
- `DB_USER` está correto?
- `DB_PASSWORD` está correto?

### Erro: "Table doesn't exist"

Execute os scripts SQL:
1. `/db/schema.sql`
2. `/db/seeds.sql`

### Erro: "JWT must be provided"

Adicione token no header:

```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Erro: "Port already in use"

Porta 3001 está ocupada:

```bash
# Matar processo na porta 3001 (Linux/Mac)
lsof -ti:3001 | xargs kill -9

# Ou mudar porta no .env
PORT=3002
```

---

## 📊 Variáveis de Ambiente

| Variável | Descrição | Padrão | Obrigatória |
|----------|-----------|--------|-------------|
| `DB_HOST` | Host do MySQL | localhost | ✅ |
| `DB_USER` | Usuário do MySQL | root | ✅ |
| `DB_PASSWORD` | Senha do MySQL | - | ✅ |
| `DB_NAME` | Nome do banco | familia_conectada | ✅ |
| `DB_PORT` | Porta do MySQL | 3306 | ❌ |
| `JWT_SECRET` | Chave secreta JWT | - | ✅ |
| `JWT_EXPIRES_IN` | Expiração do token | 24h | ❌ |
| `PORT` | Porta do servidor | 3001 | ❌ |
| `NODE_ENV` | Ambiente | development | ❌ |
| `FRONTEND_URL` | URL do frontend | - | ❌ |

---

## 🔒 Segurança

### Implementado

✅ Senhas hasheadas com bcrypt (10 rounds)  
✅ JWT para autenticação stateless  
✅ CORS configurado  
✅ Prepared statements (previne SQL injection)  
✅ Validações de entrada  

### Recomendado para Produção

⚠️ HTTPS obrigatório  
⚠️ Rate limiting  
⚠️ Helmet.js (headers de segurança)  
⚠️ Validação com Joi/Yup  
⚠️ Logs de auditoria  
⚠️ Monitoramento (PM2, New Relic)  
⚠️ Backups automáticos  

---

## 📚 Próximos Passos

- [ ] Implementar todos os controllers restantes
- [ ] Adicionar testes unitários (Jest)
- [ ] Adicionar testes de integração
- [ ] Implementar rate limiting
- [ ] Adicionar logs estruturados (Winston)
- [ ] Configurar PM2 para produção
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Implementar WebSockets para chat real-time
- [ ] Adicionar upload de imagens (Multer)
- [ ] Implementar paginação em todas rotas

---

## 📄 Licença

Este projeto é de código aberto para fins educacionais.

---

## 👥 Suporte

**Documentação completa:** Veja `/db/INTEGRATION.md`

**Dúvidas comuns:**
- Como conectar frontend? → Veja exemplos acima
- Como adicionar novos endpoints? → Copie estrutura existente
- Como debugar? → Use `console.log` ou debugger do VS Code

---

**Desenvolvido para o projeto Família Conectada** 🤝💙

*Node.js 14+ | Express 4.x | MySQL 8.0+*
