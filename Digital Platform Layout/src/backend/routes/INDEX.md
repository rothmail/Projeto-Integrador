# 📚 Índice de Rotas - API Família Conectada

## Visão Geral

Este documento serve como índice central para toda a documentação das rotas da API Família Conectada.

---

## 🗂️ Módulos de Rotas

### 1. 👥 Usuários (`/api/users`)

**Responsável**: Gerenciamento de usuários, perfis e busca

**Arquivos**:
- `users.js` - Definição das rotas
- `usersController.js` - Controller
- `USER-ROUTES-DOC.md` - Documentação completa
- `users.test.md` - Guia de testes
- `README-USERS.md` - Visão geral
- `users-integration-example.js` - Exemplos de integração

**Endpoints principais**:
- `GET /api/users` - Listar usuários
- `GET /api/users/search` - Buscar usuários
- `GET /api/users/:id` - Obter usuário
- `GET /api/users/profile/me` - Meu perfil
- `PUT /api/users/profile` - Atualizar perfil
- `PUT /api/users/avatar` - Atualizar avatar
- `PUT /api/users/password` - Alterar senha
- `DELETE /api/users/account` - Deletar conta

**Status**: ✅ Completo e documentado

---

### 2. 🔐 Autenticação (`/api/auth`)

**Responsável**: Login, registro e autenticação JWT

**Arquivos**:
- `auth.js` - Definição das rotas

**Endpoints principais**:
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

**Status**: ⚠️ Implementado (documentação pendente)

---

### 3. 📝 Posts (`/api/posts`)

**Responsável**: Publicações da comunidade

**Arquivos**:
- `posts.js` - Definição das rotas

**Endpoints principais**:
- `GET /api/posts` - Listar posts
- `POST /api/posts` - Criar post
- `GET /api/posts/:id` - Obter post
- `PUT /api/posts/:id` - Atualizar post
- `DELETE /api/posts/:id` - Deletar post
- `POST /api/posts/:id/like` - Curtir post
- `POST /api/posts/:id/comment` - Comentar post

**Status**: ⚠️ Implementado (documentação pendente)

---

### 4. 💬 Conversas (`/api/conversations`)

**Responsável**: Mensagens diretas entre usuários

**Arquivos**:
- `conversations.js` - Definição das rotas

**Endpoints principais**:
- `GET /api/conversations` - Listar conversas
- `POST /api/conversations` - Iniciar conversa
- `GET /api/conversations/:id` - Obter mensagens
- `POST /api/conversations/:id/messages` - Enviar mensagem
- `PUT /api/conversations/:id/read` - Marcar como lida

**Status**: ⚠️ Implementado (documentação pendente)

---

### 5. 📅 Eventos (`/api/events`)

**Responsável**: Workshops, palestras e encontros

**Arquivos**:
- `events.js` - Definição das rotas

**Endpoints principais**:
- `GET /api/events` - Listar eventos
- `POST /api/events` - Criar evento
- `GET /api/events/:id` - Obter evento
- `PUT /api/events/:id` - Atualizar evento
- `DELETE /api/events/:id` - Deletar evento
- `POST /api/events/:id/rsvp` - Confirmar presença

**Status**: ⚠️ Implementado (documentação pendente)

---

### 6. 📚 Recursos (`/api/resources`)

**Responsável**: Artigos, guias e conteúdo educativo

**Arquivos**:
- `resources.js` - Definição das rotas

**Endpoints principais**:
- `GET /api/resources` - Listar recursos
- `POST /api/resources` - Criar recurso
- `GET /api/resources/:id` - Obter recurso
- `POST /api/resources/:id/bookmark` - Favoritar recurso

**Status**: ⚠️ Implementado (documentação pendente)

---

### 7. 💭 Fóruns (`/api/forums`)

**Responsável**: Fóruns temáticos de discussão

**Arquivos**:
- `forums.js` - Definição das rotas

**Endpoints principais**:
- `GET /api/forums` - Listar fóruns
- `GET /api/forums/:id` - Obter fórum
- `POST /api/forums/:id/posts` - Criar discussão
- `GET /api/forums/:id/posts` - Listar discussões
- `POST /api/forums/posts/:id/replies` - Responder discussão

**Status**: ⚠️ Implementado (documentação pendente)

---

### 8. 🔔 Notificações (`/api/notifications`)

**Responsável**: Sistema de notificações

**Arquivos**:
- `notifications.js` - Definição das rotas

**Endpoints principais**:
- `GET /api/notifications` - Listar notificações
- `PUT /api/notifications/:id/read` - Marcar como lida
- `PUT /api/notifications/read-all` - Marcar todas como lidas
- `DELETE /api/notifications/:id` - Deletar notificação

**Status**: ⚠️ Implementado (documentação pendente)

---

## 🔧 Infraestrutura

### Configuração

**Arquivos**:
- `/backend/server.js` - Servidor Express principal
- `/backend/config/database.js` - Conexão MySQL
- `/backend/.env` - Variáveis de ambiente
- `/backend/package.json` - Dependências

### Middlewares

**Arquivos**:
- `/backend/middlewares/authMiddleware.js` - Autenticação JWT

### Banco de Dados

**Arquivos**:
- `/db/schema.sql` - Schema completo (18 tabelas)
- `/db/seeds.sql` - Dados iniciais
- `/db/README.md` - Documentação do BD
- `/db/INTEGRATION.md` - Guia de integração

---

## 📖 Documentação Geral

### Quick Start
- `/backend/QUICKSTART.md` - Guia rápido de início
- `/backend/README.md` - README principal

### Documentação Frontend
- `/VANILLA-README.md` - Migração para JS vanilla
- `/AUTH-DOCUMENTATION.md` - Autenticação frontend
- `/CSS-MIGRATION.md` - Migração CSS

### Changelogs
- `/CHANGELOG.md` - Histórico de mudanças
- `/CHANGELOG-v2.md` - Versão 2
- `/ATUALIZACOES.md` - Atualizações recentes

---

## 🎯 Status de Implementação

| Módulo | Rotas | Controller | Documentação | Testes |
|--------|-------|-----------|--------------|--------|
| Usuários | ✅ | ✅ | ✅ | ✅ |
| Autenticação | ✅ | ✅ | ⚠️ | ❌ |
| Posts | ✅ | ⚠️ | ❌ | ❌ |
| Conversas | ✅ | ⚠️ | ❌ | ❌ |
| Eventos | ✅ | ⚠️ | ❌ | ❌ |
| Recursos | ✅ | ⚠️ | ❌ | ❌ |
| Fóruns | ✅ | ⚠️ | ❌ | ❌ |
| Notificações | ✅ | ⚠️ | ❌ | ❌ |

**Legenda**:
- ✅ Completo
- ⚠️ Parcial
- ❌ Pendente

---

## 🚀 Como Usar Este Índice

### Para Desenvolvedores

1. **Implementar nova funcionalidade**:
   - Identifique o módulo relevante
   - Consulte a documentação específica
   - Veja os exemplos de integração
   - Siga os padrões estabelecidos

2. **Debugar problemas**:
   - Consulte a documentação da rota
   - Execute os testes manuais
   - Verifique os logs do servidor
   - Consulte o schema do banco

3. **Integrar no frontend**:
   - Veja os exemplos de integração
   - Consulte a documentação da API
   - Use os componentes React de exemplo

### Para QA/Testadores

1. Consulte os arquivos `*.test.md` de cada módulo
2. Execute os testes manuais
3. Verifique os casos de erro
4. Reporte bugs encontrados

---

## 🔗 Links Rápidos

### Documentação Completa

- [Usuários - Documentação API](./USER-ROUTES-DOC.md)
- [Usuários - Testes](./users.test.md)
- [Usuários - README](./README-USERS.md)
- [Usuários - Exemplos](./users-integration-example.js)

### Banco de Dados

- [Schema](../db/schema.sql)
- [Seeds](../db/seeds.sql)
- [Integração](../db/INTEGRATION.md)

### Backend

- [Server](../server.js)
- [Database Config](../config/database.js)
- [Auth Middleware](../middlewares/authMiddleware.js)

---

## 📋 Checklist de Desenvolvimento

### Para Criar Nova Rota

- [ ] Criar controller em `/backend/controllers/`
- [ ] Definir rotas em `/backend/routes/`
- [ ] Adicionar rotas no `server.js`
- [ ] Criar documentação da API (*.md)
- [ ] Criar guia de testes (*.test.md)
- [ ] Criar exemplos de integração
- [ ] Atualizar este INDEX.md
- [ ] Testar todos os endpoints
- [ ] Adicionar validações
- [ ] Implementar tratamento de erros

### Para Documentar Rota Existente

- [ ] Criar `[MODULE]-ROUTES-DOC.md`
- [ ] Criar `[module].test.md`
- [ ] Criar `README-[MODULE].md`
- [ ] Criar `[module]-integration-example.js`
- [ ] Atualizar INDEX.md
- [ ] Adicionar exemplos de uso
- [ ] Documentar erros possíveis
- [ ] Criar componentes React de exemplo

---

## 🌟 Próximos Passos

### Prioridade Alta
1. ✅ Completar documentação de Usuários
2. ⏳ Completar documentação de Autenticação
3. ⏳ Completar documentação de Posts
4. ⏳ Implementar testes automatizados

### Prioridade Média
5. ⏳ Documentar Conversas
6. ⏳ Documentar Eventos
7. ⏳ Documentar Recursos

### Prioridade Baixa
8. ⏳ Documentar Fóruns
9. ⏳ Documentar Notificações
10. ⏳ Criar guia de contribuição

---

## 💡 Convenções

### Nomenclatura de Arquivos

- Rotas: `[module].js`
- Controllers: `[module]Controller.js`
- Documentação API: `[MODULE]-ROUTES-DOC.md`
- Testes: `[module].test.md`
- README: `README-[MODULE].md`
- Exemplos: `[module]-integration-example.js`

### Estrutura de Documentação

Cada módulo deve ter:
1. Documentação completa da API
2. Guia de testes manuais
3. README com visão geral
4. Exemplos de integração

---

## 📞 Suporte

Para dúvidas:
1. Consulte a documentação específica do módulo
2. Veja os exemplos de integração
3. Execute os testes
4. Consulte o schema do banco

---

**Última atualização**: 16 de outubro de 2025  
**Versão**: 1.0.0
