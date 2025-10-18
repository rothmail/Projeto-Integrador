# 👥 Rotas de Usuários - Família Conectada

## 📖 Visão Geral

Este módulo gerencia todas as operações relacionadas aos usuários da plataforma Família Conectada, incluindo autenticação, perfis, busca e gerenciamento de contas.

## 📁 Arquivos do Módulo

```
/backend/routes/
├── users.js              # Definição das rotas
├── USER-ROUTES-DOC.md    # Documentação completa da API
├── users.test.md         # Guia de testes manuais
└── README-USERS.md       # Este arquivo

/backend/controllers/
└── usersController.js    # Lógica de negócio
```

## 🚀 Quick Start

### Iniciar o Servidor

```bash
cd backend
npm install
npm start
```

O servidor estará disponível em `http://localhost:3001`

### Testar Health Check

```bash
curl http://localhost:3001/api/health
```

## 📊 Endpoints Disponíveis

### Públicos (Sem Autenticação)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/users` | Listar usuários com paginação |
| GET | `/api/users/search` | Buscar usuários por filtros |
| GET | `/api/users/:id` | Obter usuário por ID |
| GET | `/api/users/:id/posts` | Listar posts do usuário |
| GET | `/api/users/:id/activity` | Obter atividade recente |

### Protegidos (Requer Token JWT)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/users/profile/me` | Obter meu perfil |
| PUT | `/api/users/profile` | Atualizar perfil |
| PUT | `/api/users/avatar` | Atualizar avatar |
| PUT | `/api/users/password` | Alterar senha |
| DELETE | `/api/users/account` | Deletar conta |

## 🔑 Autenticação

### Obter Token JWT

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "senha123"
  }'
```

### Usar Token nas Requisições

```bash
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" \
     http://localhost:3001/api/users/profile/me
```

## 💡 Exemplos Rápidos

### 1. Listar Usuários

```bash
curl http://localhost:3001/api/users?page=1&limit=10
```

### 2. Buscar Mães com Filhos de 0-2 Anos

```bash
curl "http://localhost:3001/api/users/search?q=maria&role=mae&childrenAge=0-2"
```

### 3. Ver Perfil de Usuário

```bash
curl http://localhost:3001/api/users/1
```

### 4. Atualizar Meu Perfil

```bash
curl -X PUT \
     -H "Authorization: Bearer SEU_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Novo Nome",
       "bio": "Nova biografia",
       "childrenAges": ["0-2", "3-5"]
     }' \
     http://localhost:3001/api/users/profile
```

## 🎯 Casos de Uso Comuns

### Caso 1: Novo Usuário Configurando Perfil

1. Registrar: `POST /api/auth/register`
2. Login: `POST /api/auth/login`
3. Ver perfil: `GET /api/users/profile/me`
4. Atualizar perfil: `PUT /api/users/profile`
5. Atualizar avatar: `PUT /api/users/avatar`

### Caso 2: Buscar Outros Pais na Comunidade

1. Buscar por critério: `GET /api/users/search?q=...`
2. Ver perfil específico: `GET /api/users/:id`
3. Ver posts do usuário: `GET /api/users/:id/posts`
4. Ver atividade: `GET /api/users/:id/activity`

### Caso 3: Alterar Configurações de Conta

1. Ver perfil atual: `GET /api/users/profile/me`
2. Atualizar dados: `PUT /api/users/profile`
3. Alterar senha: `PUT /api/users/password`
4. Deletar conta: `DELETE /api/users/account` (se necessário)

## 📋 Validações e Regras

### Campos Obrigatórios

**Registro/Atualização**:
- Nome: mínimo 2 caracteres
- Senha: mínimo 6 caracteres
- Avatar: máximo 10 caracteres

**Busca**:
- Query (q): mínimo 2 caracteres

### Valores Válidos

**Papéis (role)**:
- `mae`
- `pai`
- `responsavel`
- `cuidador`
- `outro`

**Faixas Etárias (childrenAges)**:
- `0-2` (Primeira Infância)
- `3-5` (Pré-escola)
- `6-12` (Escolar)
- `13+` (Adolescência)

## 🔍 Filtros de Busca

### Busca de Usuários (`/api/users/search`)

**Parâmetros disponíveis**:
- `q`: Termo de busca (nome ou email)
- `role`: Filtrar por papel
- `childrenAge`: Filtrar por idade dos filhos
- `page`: Página (padrão: 1)
- `limit`: Itens por página (padrão: 20)

**Exemplos**:
```bash
# Buscar "ana"
/api/users/search?q=ana

# Buscar mães
/api/users/search?q=a&role=mae

# Buscar pais com bebês
/api/users/search?q=jo&childrenAge=0-2

# Combinar filtros
/api/users/search?q=maria&role=mae&childrenAge=3-5&limit=5
```

## 🔒 Segurança

### Proteção de Rotas

- Rotas protegidas validam JWT via middleware
- Senhas são hasheadas com bcrypt (10 rounds)
- Soft delete preserva dados do usuário
- Validação de entrada em todos os endpoints

### Tratamento de Erros

**Códigos de Status**:
- `200` - Sucesso
- `400` - Dados inválidos
- `401` - Não autenticado/Token inválido
- `404` - Recurso não encontrado
- `500` - Erro interno

**Exemplos de Respostas de Erro**:
```json
{
  "success": false,
  "error": "Mensagem de erro descritiva"
}
```

## 📊 Estrutura de Dados

### Objeto User (Completo)

```json
{
  "id": 1,
  "name": "Maria Silva",
  "email": "maria@example.com",
  "role": "mae",
  "avatar": "👩",
  "bio": "Mãe de 2 filhos",
  "created_at": "2025-01-15T10:00:00.000Z",
  "updated_at": "2025-10-16T09:00:00.000Z",
  "last_login": "2025-10-16T08:30:00.000Z",
  "is_active": true,
  "children_ages": ["0-2", "3-5"]
}
```

### Objeto User (Público)

```json
{
  "id": 1,
  "name": "Maria Silva",
  "email": "maria@example.com",
  "role": "mae",
  "avatar": "👩",
  "bio": "Mãe de 2 filhos",
  "created_at": "2025-01-15T10:00:00.000Z",
  "children_ages": ["0-2", "3-5"]
}
```

### Estatísticas do Usuário

```json
{
  "posts_count": 45,
  "likes_given": 234,
  "comments_count": 89
}
```

## 🧪 Testes

### Executar Testes Manuais

Siga o guia completo em `users.test.md`:

```bash
# Ver documentação de testes
cat backend/routes/users.test.md
```

### Checklist Básico

- [ ] Listar usuários
- [ ] Buscar usuários
- [ ] Ver perfil público
- [ ] Login e obter token
- [ ] Ver meu perfil
- [ ] Atualizar perfil
- [ ] Alterar senha
- [ ] Testar erros de validação
- [ ] Testar erros de autenticação

## 📝 Logs e Debugging

### Habilitar Logs Detalhados

O servidor já loga todas as requisições:

```
2025-10-16T10:30:00.000Z - GET /api/users
2025-10-16T10:30:01.000Z - GET /api/users/search
2025-10-16T10:30:02.000Z - GET /api/users/profile/me
```

### Verificar Erros

Erros são logados no console com stack trace completo:

```javascript
console.error('Get user by ID error:', error);
```

## 🔄 Integração com Outros Módulos

### Dependências

**Este módulo usa**:
- `/backend/config/database.js` - Conexão MySQL
- `/backend/middlewares/authMiddleware.js` - Autenticação JWT
- Tabelas: `users`, `children_ages`, `posts`, `likes`, `comments`

**Este módulo é usado por**:
- `/backend/routes/posts.js` - Posts de usuários
- `/backend/routes/conversations.js` - Conversas entre usuários
- `/backend/routes/events.js` - Participação em eventos
- `/backend/routes/forums.js` - Participação em fóruns

## 🎨 Paleta de Cores da Aplicação

A plataforma segue a regra 60-30-10:
- **60% Wheat** - Cor dominante/base
- **30% Marrom** - Secundária/contraste
- **10% Branco** - Destaque/acento
- Cinza e Preto - Cores de apoio

## 🌍 Alinhamento com ODS 3 da ONU

Este módulo contribui para o **ODS 3 (Saúde e Bem-Estar)** através de:
- Criação de comunidade de apoio parental
- Compartilhamento de experiências sobre saúde mental infantil
- Conexão entre pais para suporte emocional
- Promoção do bem-estar familiar

## 📚 Documentação Relacionada

- **API Completa**: `USER-ROUTES-DOC.md`
- **Testes**: `users.test.md`
- **Banco de Dados**: `/db/schema.sql`
- **Autenticação**: `/backend/routes/auth.js`
- **Backend Geral**: `/backend/README.md`
- **Quick Start**: `/backend/QUICKSTART.md`

## 🤝 Suporte

Para dúvidas ou problemas:

1. Verifique a documentação completa em `USER-ROUTES-DOC.md`
2. Execute os testes em `users.test.md`
3. Verifique os logs do servidor
4. Consulte o schema do banco em `/db/schema.sql`

## 🔮 Próximas Funcionalidades

Funcionalidades planejadas para versões futuras:

- [ ] Sistema de follows/followers
- [ ] Badges e conquistas
- [ ] Sistema de reputação
- [ ] Verificação de email
- [ ] Upload de fotos de perfil
- [ ] Exportação de dados pessoais
- [ ] Configurações de privacidade avançadas
- [ ] Bloqueio de usuários

---

**Versão**: 1.0.0  
**Última atualização**: 16 de outubro de 2025  
**Autor**: Família Conectada Team  
**Licença**: MIT
