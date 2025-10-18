# 🧪 Guia de Testes - Rotas de Usuários

## Visão Geral

Este guia contém exemplos de testes manuais para todas as rotas de usuários da API Família Conectada.

---

## 📋 Pré-requisitos

1. Servidor backend rodando em `http://localhost:3001`
2. Banco de dados MySQL configurado e populado
3. Token JWT válido para rotas protegidas

### Como obter um token JWT

```bash
# Fazer login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "senha123"
  }'

# Resposta conterá o token:
# { "success": true, "token": "eyJhbGci...", "user": {...} }
```

**Importante**: Substitua `<TOKEN>` nos exemplos abaixo pelo token recebido.

---

## ✅ Testes de Rotas Públicas

### 1. Listar Todos os Usuários

**Teste Básico**:
```bash
curl http://localhost:3001/api/users
```

**Teste com Paginação**:
```bash
curl "http://localhost:3001/api/users?page=1&limit=5"
```

**Resultado Esperado**:
- Status: 200 OK
- Retorna lista de usuários com paginação
- Cada usuário deve ter: id, name, email, role, avatar, bio, created_at, children_ages

---

### 2. Buscar Usuários

**Teste 1: Busca por Nome**:
```bash
curl "http://localhost:3001/api/users/search?q=maria"
```

**Teste 2: Busca com Filtro de Papel**:
```bash
curl "http://localhost:3001/api/users/search?q=a&role=mae"
```

**Teste 3: Busca com Filtro de Idade dos Filhos**:
```bash
curl "http://localhost:3001/api/users/search?q=jo&childrenAge=0-2"
```

**Teste 4: Busca com Todos os Filtros**:
```bash
curl "http://localhost:3001/api/users/search?q=ana&role=mae&childrenAge=3-5&page=1&limit=10"
```

**Teste 5: Query Inválida (deve falhar)**:
```bash
curl "http://localhost:3001/api/users/search?q=a"
```

**Resultado Esperado**:
- Testes 1-4: Status 200, retorna usuários filtrados
- Teste 5: Status 400, erro "Query de busca deve ter pelo menos 2 caracteres"

---

### 3. Obter Usuário por ID

**Teste Básico**:
```bash
curl http://localhost:3001/api/users/1
```

**Teste com ID Inválido (deve falhar)**:
```bash
curl http://localhost:3001/api/users/99999
```

**Resultado Esperado**:
- Teste 1: Status 200, retorna usuário com estatísticas (posts_count, likes_given, comments_count)
- Teste 2: Status 404, erro "Usuário não encontrado"

---

### 4. Obter Posts do Usuário

**Teste Básico**:
```bash
curl http://localhost:3001/api/users/1/posts
```

**Teste com Paginação**:
```bash
curl "http://localhost:3001/api/users/1/posts?page=1&limit=5"
```

**Teste com Usuário sem Posts**:
```bash
curl "http://localhost:3001/api/users/2/posts"
```

**Resultado Esperado**:
- Status: 200 OK
- Retorna posts do usuário com informações completas
- Deve incluir paginação

---

### 5. Obter Atividade do Usuário

**Teste Básico**:
```bash
curl http://localhost:3001/api/users/1/activity
```

**Teste com Limite Customizado**:
```bash
curl "http://localhost:3001/api/users/1/activity?limit=5"
```

**Resultado Esperado**:
- Status: 200 OK
- Retorna array de atividades (posts e comentários)
- Cada atividade tem: type, id, description, created_at
- Comentários também têm post_id

---

## 🔒 Testes de Rotas Protegidas

**Importante**: Substitua `<TOKEN>` pelo token JWT obtido no login.

### 6. Obter Meu Perfil

**Teste com Token Válido**:
```bash
curl -H "Authorization: Bearer <TOKEN>" \
     http://localhost:3001/api/users/profile/me
```

**Teste sem Token (deve falhar)**:
```bash
curl http://localhost:3001/api/users/profile/me
```

**Teste com Token Inválido (deve falhar)**:
```bash
curl -H "Authorization: Bearer token_invalido_123" \
     http://localhost:3001/api/users/profile/me
```

**Resultado Esperado**:
- Teste 1: Status 200, retorna perfil completo do usuário logado
- Teste 2: Status 401, erro "Token não fornecido"
- Teste 3: Status 401, erro "Token inválido"

---

### 7. Atualizar Perfil

**Teste 1: Atualizar Nome**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"name": "Maria Silva Santos"}' \
     http://localhost:3001/api/users/profile
```

**Teste 2: Atualizar Bio**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"bio": "Mãe de 2 filhos, educadora e apaixonada por desenvolvimento infantil"}' \
     http://localhost:3001/api/users/profile
```

**Teste 3: Atualizar Papel**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"role": "mae"}' \
     http://localhost:3001/api/users/profile
```

**Teste 4: Atualizar Idades dos Filhos**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"childrenAges": ["0-2", "3-5"]}' \
     http://localhost:3001/api/users/profile
```

**Teste 5: Atualizar Tudo**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Ana Carolina Silva",
       "bio": "Mãe dedicada e apaixonada por educação",
       "role": "mae",
       "childrenAges": ["0-2", "6-12"]
     }' \
     http://localhost:3001/api/users/profile
```

**Teste 6: Nome Inválido (deve falhar)**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"name": "A"}' \
     http://localhost:3001/api/users/profile
```

**Teste 7: Papel Inválido (deve falhar)**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"role": "papel_invalido"}' \
     http://localhost:3001/api/users/profile
```

**Resultado Esperado**:
- Testes 1-5: Status 200, perfil atualizado com sucesso
- Teste 6: Status 400, erro "Nome deve ter pelo menos 2 caracteres"
- Teste 7: Status 400, erro "Papel inválido"

---

### 8. Atualizar Avatar

**Teste 1: Avatar com Emoji**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"avatar": "👨‍👩‍👧"}' \
     http://localhost:3001/api/users/avatar
```

**Teste 2: Avatar com Texto**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"avatar": "MS"}' \
     http://localhost:3001/api/users/avatar
```

**Teste 3: Avatar Vazio (deve falhar)**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"avatar": ""}' \
     http://localhost:3001/api/users/avatar
```

**Teste 4: Avatar Muito Longo (deve falhar)**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"avatar": "avatarmuitolongo123"}' \
     http://localhost:3001/api/users/avatar
```

**Resultado Esperado**:
- Testes 1-2: Status 200, avatar atualizado
- Teste 3: Status 400, erro "Avatar é obrigatório"
- Teste 4: Status 400, erro "Avatar deve ter no máximo 10 caracteres"

---

### 9. Alterar Senha

**Teste 1: Senha Válida**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
       "currentPassword": "senhaAtual123",
       "newPassword": "novaSenha456"
     }' \
     http://localhost:3001/api/users/password
```

**Teste 2: Senha Atual Incorreta (deve falhar)**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
       "currentPassword": "senhaErrada",
       "newPassword": "novaSenha456"
     }' \
     http://localhost:3001/api/users/password
```

**Teste 3: Nova Senha Muito Curta (deve falhar)**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
       "currentPassword": "senhaAtual123",
       "newPassword": "123"
     }' \
     http://localhost:3001/api/users/password
```

**Teste 4: Campos Faltando (deve falhar)**:
```bash
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"currentPassword": "senhaAtual123"}' \
     http://localhost:3001/api/users/password
```

**Resultado Esperado**:
- Teste 1: Status 200, senha alterada com sucesso
- Teste 2: Status 401, erro "Senha atual incorreta"
- Teste 3: Status 400, erro "Nova senha deve ter pelo menos 6 caracteres"
- Teste 4: Status 400, erro "Senha atual e nova senha são obrigatórias"

---

### 10. Deletar Conta

**⚠️ ATENÇÃO: Este teste desativará a conta!**

**Teste 1: Deletar com Senha Correta**:
```bash
curl -X DELETE \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"password": "minhaSenha123"}' \
     http://localhost:3001/api/users/account
```

**Teste 2: Deletar com Senha Incorreta (deve falhar)**:
```bash
curl -X DELETE \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"password": "senhaErrada"}' \
     http://localhost:3001/api/users/account
```

**Teste 3: Deletar sem Senha (deve falhar)**:
```bash
curl -X DELETE \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{}' \
     http://localhost:3001/api/users/account
```

**Resultado Esperado**:
- Teste 1: Status 200, conta deletada (soft delete)
- Teste 2: Status 401, erro "Senha incorreta"
- Teste 3: Status 400, erro "Senha é obrigatória para deletar a conta"

---

## 🔄 Testes de Fluxo Completo

### Fluxo 1: Criar e Configurar Perfil

```bash
# 1. Registrar novo usuário
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Usuario",
    "email": "teste@example.com",
    "password": "senha123",
    "role": "mae"
  }'

# 2. Fazer login (pegue o token da resposta)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "password": "senha123"
  }'

# 3. Verificar perfil
curl -H "Authorization: Bearer <TOKEN>" \
     http://localhost:3001/api/users/profile/me

# 4. Atualizar perfil completo
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Maria Teste",
       "bio": "Perfil de teste",
       "childrenAges": ["0-2", "3-5"]
     }' \
     http://localhost:3001/api/users/profile

# 5. Atualizar avatar
curl -X PUT \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"avatar": "👩"}' \
     http://localhost:3001/api/users/avatar

# 6. Verificar perfil atualizado
curl -H "Authorization: Bearer <TOKEN>" \
     http://localhost:3001/api/users/profile/me
```

### Fluxo 2: Buscar e Visualizar Usuários

```bash
# 1. Buscar usuários mães
curl "http://localhost:3001/api/users/search?q=maria&role=mae"

# 2. Ver perfil de um usuário específico (use ID da busca)
curl http://localhost:3001/api/users/1

# 3. Ver posts do usuário
curl http://localhost:3001/api/users/1/posts

# 4. Ver atividade do usuário
curl http://localhost:3001/api/users/1/activity
```

---

## 📊 Checklist de Testes

### Rotas Públicas
- [ ] Listar usuários sem parâmetros
- [ ] Listar usuários com paginação
- [ ] Buscar usuários por nome
- [ ] Buscar com filtro de papel
- [ ] Buscar com filtro de idade dos filhos
- [ ] Buscar com query inválida (esperar erro)
- [ ] Obter usuário por ID válido
- [ ] Obter usuário por ID inválido (esperar erro)
- [ ] Obter posts de usuário
- [ ] Obter atividade de usuário

### Rotas Protegidas
- [ ] Obter meu perfil com token válido
- [ ] Tentar acessar sem token (esperar erro)
- [ ] Tentar acessar com token inválido (esperar erro)
- [ ] Atualizar nome
- [ ] Atualizar bio
- [ ] Atualizar papel
- [ ] Atualizar idades dos filhos
- [ ] Atualizar tudo de uma vez
- [ ] Tentar atualizar com nome inválido (esperar erro)
- [ ] Tentar atualizar com papel inválido (esperar erro)
- [ ] Atualizar avatar com emoji
- [ ] Atualizar avatar com texto
- [ ] Tentar avatar vazio (esperar erro)
- [ ] Tentar avatar muito longo (esperar erro)
- [ ] Alterar senha com dados válidos
- [ ] Tentar alterar com senha atual errada (esperar erro)
- [ ] Tentar alterar com nova senha curta (esperar erro)

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"
- Verifique se o MySQL está rodando
- Verifique as credenciais em `/backend/.env`
- Execute o schema: `mysql -u root -p < db/schema.sql`

### Erro: "Token expirado"
- Faça login novamente para obter novo token
- Tokens expiram após 24 horas (configurável)

### Erro: "Usuário não encontrado"
- Verifique se o ID do usuário existe
- Verifique se o usuário está ativo (is_active = TRUE)
- Rode os seeds: `mysql -u root -p familia_conectada < db/seeds.sql`

### Erro: "CORS"
- Verifique a URL do frontend em `/backend/.env`
- Padrão: `FRONTEND_URL=http://localhost:5173`

---

## 📝 Notas Importantes

1. **Soft Delete**: Contas deletadas são desativadas, não removidas do banco
2. **Paginação**: Padrão é 20 itens por página
3. **Validações**: Sempre teste casos de erro além dos casos de sucesso
4. **Autenticação**: Lembre-se de usar "Bearer" antes do token
5. **Children Ages**: Valores válidos são: "0-2", "3-5", "6-12", "13+"
6. **Roles**: Valores válidos são: "mae", "pai", "responsavel", "cuidador", "outro"

---

## 🎯 Próximos Passos

Após validar todas as rotas de usuários:

1. Testar integração com rotas de posts
2. Testar integração com rotas de conversas
3. Testar integração com rotas de eventos
4. Implementar testes automatizados (Jest/Mocha)

---

**Última atualização**: 16 de outubro de 2025
