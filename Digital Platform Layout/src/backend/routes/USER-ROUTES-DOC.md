# 👥 Documentação das Rotas de Usuários

## Visão Geral

Este documento descreve todas as rotas disponíveis para gerenciamento de usuários na API Família Conectada.

**Base URL**: `/api/users`

---

## 📋 Índice

- [Rotas Públicas](#rotas-públicas)
  - [Listar Usuários](#listar-usuários)
  - [Buscar Usuários](#buscar-usuários)
  - [Obter Usuário por ID](#obter-usuário-por-id)
  - [Obter Posts do Usuário](#obter-posts-do-usuário)
  - [Obter Atividade do Usuário](#obter-atividade-do-usuário)
- [Rotas Protegidas](#rotas-protegidas)
  - [Obter Meu Perfil](#obter-meu-perfil)
  - [Atualizar Perfil](#atualizar-perfil)
  - [Atualizar Avatar](#atualizar-avatar)
  - [Alterar Senha](#alterar-senha)
  - [Deletar Conta](#deletar-conta)

---

## Rotas Públicas

### Listar Usuários

Lista todos os usuários ativos da plataforma com paginação.

**Endpoint**: `GET /api/users`

**Query Parameters**:
- `page` (number, opcional): Número da página (padrão: 1)
- `limit` (number, opcional): Itens por página (padrão: 20)

**Exemplo de Requisição**:
```bash
GET /api/users?page=1&limit=20
```

**Resposta de Sucesso** (200 OK):
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "name": "Maria Silva",
      "email": "maria@example.com",
      "role": "mae",
      "avatar": "👩",
      "bio": "Mãe de 2 filhos, apaixonada por educação infantil",
      "created_at": "2025-01-15T10:00:00.000Z",
      "children_ages": ["0-2", "3-5"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

### Buscar Usuários

Busca usuários por nome ou email com filtros opcionais.

**Endpoint**: `GET /api/users/search`

**Query Parameters**:
- `q` (string, **obrigatório**): Termo de busca (mínimo 2 caracteres)
- `role` (string, opcional): Filtrar por papel (mae, pai, responsavel, cuidador, outro)
- `childrenAge` (string, opcional): Filtrar por idade dos filhos (0-2, 3-5, 6-12, 13+)
- `page` (number, opcional): Número da página (padrão: 1)
- `limit` (number, opcional): Itens por página (padrão: 20)

**Exemplo de Requisição**:
```bash
GET /api/users/search?q=maria&role=mae&page=1&limit=10
```

**Resposta de Sucesso** (200 OK):
```json
{
  "success": true,
  "users": [
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
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

**Resposta de Erro** (400 Bad Request):
```json
{
  "success": false,
  "error": "Query de busca deve ter pelo menos 2 caracteres"
}
```

---

### Obter Usuário por ID

Obtém informações detalhadas de um usuário específico, incluindo estatísticas.

**Endpoint**: `GET /api/users/:id`

**Parâmetros de URL**:
- `id` (number): ID do usuário

**Exemplo de Requisição**:
```bash
GET /api/users/1
```

**Resposta de Sucesso** (200 OK):
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Maria Silva",
    "email": "maria@example.com",
    "role": "mae",
    "avatar": "👩",
    "bio": "Mãe de 2 filhos, apaixonada por educação infantil",
    "created_at": "2025-01-15T10:00:00.000Z",
    "children_ages": ["0-2", "3-5"]
  },
  "stats": {
    "posts_count": 45,
    "likes_given": 234,
    "comments_count": 89
  }
}
```

**Resposta de Erro** (404 Not Found):
```json
{
  "success": false,
  "error": "Usuário não encontrado"
}
```

---

### Obter Posts do Usuário

Lista todos os posts de um usuário específico.

**Endpoint**: `GET /api/users/:id/posts`

**Parâmetros de URL**:
- `id` (number): ID do usuário

**Query Parameters**:
- `page` (number, opcional): Número da página (padrão: 1)
- `limit` (number, opcional): Itens por página (padrão: 10)

**Exemplo de Requisição**:
```bash
GET /api/users/1/posts?page=1&limit=10
```

**Resposta de Sucesso** (200 OK):
```json
{
  "success": true,
  "posts": [
    {
      "id": 123,
      "content": "Primeira semana de escola! Como lidar com o choro na despedida?",
      "image_url": null,
      "tag": "duvida",
      "likes_count": 15,
      "comments_count": 8,
      "created_at": "2025-10-15T08:30:00.000Z",
      "user_id": 1,
      "user_name": "Maria Silva",
      "user_avatar": "👩",
      "user_role": "mae"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

---

### Obter Atividade do Usuário

Obtém a atividade recente do usuário (posts e comentários).

**Endpoint**: `GET /api/users/:id/activity`

**Parâmetros de URL**:
- `id` (number): ID do usuário

**Query Parameters**:
- `limit` (number, opcional): Número máximo de atividades (padrão: 10)

**Exemplo de Requisição**:
```bash
GET /api/users/1/activity?limit=10
```

**Resposta de Sucesso** (200 OK):
```json
{
  "success": true,
  "activities": [
    {
      "type": "post",
      "id": 123,
      "description": "Primeira semana de escola!",
      "created_at": "2025-10-15T08:30:00.000Z"
    },
    {
      "type": "comment",
      "id": 456,
      "description": "Muito obrigada pela dica!",
      "created_at": "2025-10-14T15:20:00.000Z",
      "post_id": 789
    }
  ]
}
```

---

## Rotas Protegidas

**Autenticação**: Todas as rotas protegidas requerem um token JWT válido no header Authorization:
```
Authorization: Bearer <token>
```

---

### Obter Meu Perfil

Obtém as informações completas do usuário autenticado.

**Endpoint**: `GET /api/users/profile/me`

**Headers**:
- `Authorization: Bearer <token>`

**Exemplo de Requisição**:
```bash
GET /api/users/profile/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Resposta de Sucesso** (200 OK):
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Maria Silva",
    "email": "maria@example.com",
    "role": "mae",
    "avatar": "👩",
    "bio": "Mãe de 2 filhos",
    "created_at": "2025-01-15T10:00:00.000Z",
    "last_login": "2025-10-16T09:15:00.000Z",
    "children_ages": ["0-2", "3-5"]
  }
}
```

---

### Atualizar Perfil

Atualiza as informações do perfil do usuário autenticado.

**Endpoint**: `PUT /api/users/profile`

**Headers**:
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body Parameters**:
- `name` (string, opcional): Nome do usuário (mínimo 2 caracteres)
- `bio` (string, opcional): Biografia do usuário
- `role` (string, opcional): Papel (mae, pai, responsavel, cuidador, outro)
- `childrenAges` (array, opcional): Array com idades dos filhos ["0-2", "3-5", "6-12", "13+"]

**Exemplo de Requisição**:
```bash
PUT /api/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Maria Silva Santos",
  "bio": "Mãe de 3 filhos, educadora e apaixonada por desenvolvimento infantil",
  "role": "mae",
  "childrenAges": ["0-2", "3-5", "6-12"]
}
```

**Resposta de Sucesso** (200 OK):
```json
{
  "success": true,
  "message": "Perfil atualizado com sucesso",
  "user": {
    "id": 1,
    "name": "Maria Silva Santos",
    "email": "maria@example.com",
    "role": "mae",
    "avatar": "👩",
    "bio": "Mãe de 3 filhos, educadora e apaixonada por desenvolvimento infantil",
    "created_at": "2025-01-15T10:00:00.000Z",
    "children_ages": ["0-2", "3-5", "6-12"]
  }
}
```

**Resposta de Erro** (400 Bad Request):
```json
{
  "success": false,
  "error": "Nome deve ter pelo menos 2 caracteres"
}
```

---

### Atualizar Avatar

Atualiza o avatar do usuário autenticado.

**Endpoint**: `PUT /api/users/avatar`

**Headers**:
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body Parameters**:
- `avatar` (string, **obrigatório**): Avatar do usuário (emoji ou identificador, máximo 10 caracteres)

**Exemplo de Requisição**:
```bash
PUT /api/users/avatar
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "avatar": "👨‍👩‍👧"
}
```

**Resposta de Sucesso** (200 OK):
```json
{
  "success": true,
  "message": "Avatar atualizado com sucesso",
  "avatar": "👨‍👩‍👧"
}
```

**Resposta de Erro** (400 Bad Request):
```json
{
  "success": false,
  "error": "Avatar é obrigatório"
}
```

---

### Alterar Senha

Altera a senha do usuário autenticado.

**Endpoint**: `PUT /api/users/password`

**Headers**:
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body Parameters**:
- `currentPassword` (string, **obrigatório**): Senha atual
- `newPassword` (string, **obrigatório**): Nova senha (mínimo 6 caracteres)

**Exemplo de Requisição**:
```bash
PUT /api/users/password
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "currentPassword": "senhaAntiga123",
  "newPassword": "novaSenhaSegura456"
}
```

**Resposta de Sucesso** (200 OK):
```json
{
  "success": true,
  "message": "Senha alterada com sucesso"
}
```

**Respostas de Erro**:

**400 Bad Request** (Validação):
```json
{
  "success": false,
  "error": "Nova senha deve ter pelo menos 6 caracteres"
}
```

**401 Unauthorized** (Senha incorreta):
```json
{
  "success": false,
  "error": "Senha atual incorreta"
}
```

---

### Deletar Conta

Deleta a conta do usuário autenticado (soft delete - desativa a conta).

**Endpoint**: `DELETE /api/users/account`

**Headers**:
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body Parameters**:
- `password` (string, **obrigatório**): Senha do usuário para confirmação

**Exemplo de Requisição**:
```bash
DELETE /api/users/account
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "password": "minhaSenha123"
}
```

**Resposta de Sucesso** (200 OK):
```json
{
  "success": true,
  "message": "Conta deletada com sucesso"
}
```

**Respostas de Erro**:

**400 Bad Request** (Validação):
```json
{
  "success": false,
  "error": "Senha é obrigatória para deletar a conta"
}
```

**401 Unauthorized** (Senha incorreta):
```json
{
  "success": false,
  "error": "Senha incorreta"
}
```

---

## 🔒 Autenticação

### Formato do Token JWT

Todas as rotas protegidas requerem um token JWT no header Authorization:

```
Authorization: Bearer <token>
```

### Obter Token

Para obter um token JWT, use a rota de autenticação:
- **Login**: `POST /api/auth/login`
- **Registro**: `POST /api/auth/register`

Consulte a documentação de autenticação para mais detalhes.

### Tratamento de Erros de Autenticação

**401 Unauthorized** (Token não fornecido):
```json
{
  "success": false,
  "error": "Token não fornecido",
  "message": "Você precisa estar autenticado para acessar este recurso"
}
```

**401 Unauthorized** (Token expirado):
```json
{
  "success": false,
  "error": "Token expirado",
  "message": "Sua sessão expirou. Faça login novamente."
}
```

**401 Unauthorized** (Token inválido):
```json
{
  "success": false,
  "error": "Token inválido",
  "message": "Token JWT inválido"
}
```

---

## 📊 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso - Requisição processada com sucesso |
| 400 | Bad Request - Dados de entrada inválidos |
| 401 | Unauthorized - Autenticação necessária ou falhou |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro interno do servidor |

---

## 💡 Exemplos de Uso

### Exemplo 1: Buscar usuários que são mães com filhos de 0-2 anos

```bash
GET /api/users/search?q=a&role=mae&childrenAge=0-2&limit=10
```

### Exemplo 2: Obter perfil completo de um usuário

```bash
GET /api/users/1
```

### Exemplo 3: Atualizar perfil completo

```bash
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Ana Carolina",
  "bio": "Mãe de primeira viagem aprendendo a cada dia",
  "role": "mae",
  "childrenAges": ["0-2"]
}
```

### Exemplo 4: Ver atividade recente de um usuário

```bash
GET /api/users/1/activity?limit=5
```

---

## 🎯 Notas Importantes

1. **Paginação**: A maioria das rotas que retornam listas suportam paginação através dos parâmetros `page` e `limit`.

2. **Soft Delete**: Ao deletar uma conta, o usuário é desativado (soft delete) ao invés de ser permanentemente removido do banco de dados.

3. **Validações**:
   - Nome: mínimo 2 caracteres
   - Senha: mínimo 6 caracteres
   - Avatar: máximo 10 caracteres
   - Query de busca: mínimo 2 caracteres

4. **Papéis Válidos**: mae, pai, responsavel, cuidador, outro

5. **Faixas Etárias Válidas**: 0-2, 3-5, 6-12, 13+

6. **Tags de Posts**: geral, dica, desabafo, conquista, duvida, ajuda

---

## 🔧 Testando as Rotas

### Usando cURL

```bash
# Listar usuários
curl http://localhost:3001/api/users

# Buscar usuários
curl "http://localhost:3001/api/users/search?q=maria"

# Obter usuário por ID
curl http://localhost:3001/api/users/1

# Obter meu perfil (autenticado)
curl -H "Authorization: Bearer <token>" \
     http://localhost:3001/api/users/profile/me

# Atualizar perfil (autenticado)
curl -X PUT \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"name":"Novo Nome","bio":"Nova bio"}' \
     http://localhost:3001/api/users/profile
```

### Usando JavaScript/Fetch

```javascript
// Listar usuários
fetch('http://localhost:3001/api/users?page=1&limit=20')
  .then(res => res.json())
  .then(data => console.log(data));

// Obter meu perfil (autenticado)
fetch('http://localhost:3001/api/users/profile/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => console.log(data));

// Atualizar perfil (autenticado)
fetch('http://localhost:3001/api/users/profile', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Novo Nome',
    bio: 'Nova biografia'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- `/backend/README.md` - Documentação geral do backend
- `/backend/QUICKSTART.md` - Guia rápido de início
- `/db/INTEGRATION.md` - Documentação do banco de dados

---

**Última atualização**: 16 de outubro de 2025
