# 🗄️ Banco de Dados MySQL - Família Conectada

## 📋 Visão Geral

Sistema completo de banco de dados MySQL para a plataforma Família Conectada.

---

## 🚀 Como Usar no MySQL Workbench

### Passo 1: Criar o Schema

1. Abra o **MySQL Workbench**
2. Conecte-se ao seu servidor MySQL
3. Vá em: `File` → `Open SQL Script`
4. Selecione o arquivo **`schema.sql`**
5. Clique em **Execute** (⚡ ícone de raio) ou pressione `Ctrl + Shift + Enter`
6. Aguarde a criação de todas as tabelas

### Passo 2: Popular com Dados Iniciais

1. No MySQL Workbench, vá em: `File` → `Open SQL Script`
2. Selecione o arquivo **`seeds.sql`**
3. Clique em **Execute** (⚡)
4. Aguarde a inserção dos dados

### Passo 3: Verificar

```sql
USE familia_conectada;

-- Ver todas as tabelas
SHOW TABLES;

-- Ver usuários
SELECT * FROM users;

-- Ver posts
SELECT * FROM v_posts_with_user LIMIT 10;

-- Ver estatísticas
SELECT * FROM v_community_stats;
```

---

## 📊 Estrutura do Banco

### Tabelas Principais

#### 1. **users** - Usuários
```sql
- id (PK)
- name
- email (UNIQUE)
- password_hash
- role (mae, pai, responsavel, cuidador, outro)
- avatar
- bio
- created_at, updated_at, last_login
```

#### 2. **posts** - Publicações
```sql
- id (PK)
- user_id (FK)
- content
- image_url
- tag (geral, dica, desabafo, conquista, duvida, ajuda)
- likes_count, comments_count
- created_at, updated_at
```

#### 3. **comments** - Comentários
```sql
- id (PK)
- post_id (FK)
- user_id (FK)
- content
- created_at
```

#### 4. **likes** - Curtidas
```sql
- id (PK)
- user_id (FK)
- post_id (FK)
- created_at
- UNIQUE(user_id, post_id)
```

#### 5. **conversations** - Conversas
```sql
- id (PK)
- participant1_id (FK)
- participant2_id (FK)
- last_message_at
```

#### 6. **messages** - Mensagens
```sql
- id (PK)
- conversation_id (FK)
- sender_id (FK)
- content
- is_read
- created_at
```

#### 7. **forums** - Fóruns Temáticos
```sql
- id (PK)
- name
- type (primeira-infancia, pre-escola, adolescencia, necessidades-especiais)
- description
- members_count, posts_count
```

#### 8. **forum_posts** - Posts do Fórum
```sql
- id (PK)
- forum_id (FK)
- user_id (FK)
- title
- content
- replies_count, views_count
```

#### 9. **events** - Eventos
```sql
- id (PK)
- title
- description
- event_type (workshop, palestra, encontro, webinar, grupo)
- date, time
- location
- is_online
- max_participants, current_participants
```

#### 10. **resources** - Recursos Educativos
```sql
- id (PK)
- title
- description
- category (artigo, guia, video, podcast, livro, ferramenta)
- age_range (0-2, 3-5, 6-12, 13+, todos)
- reading_time
- views_count, bookmarks_count
```

#### 11. **notifications** - Notificações
```sql
- id (PK)
- user_id (FK)
- type (like, comment, message, event, mention, system)
- title, content
- reference_id, reference_type
- is_read
```

---

## 🔍 Views (Consultas Pré-definidas)

### v_posts_with_user
Posts com informações do usuário que postou.

```sql
SELECT * FROM v_posts_with_user LIMIT 10;
```

### v_community_stats
Estatísticas gerais da comunidade.

```sql
SELECT * FROM v_community_stats;
```

### v_conversations_with_last_message
Conversas com a última mensagem e contador de não lidas.

```sql
SELECT * FROM v_conversations_with_last_message 
WHERE participant1_id = 1 OR participant2_id = 1;
```

---

## ⚡ Triggers (Automações)

### Contadores Automáticos

- **increment_likes_count** - Incrementa contador ao curtir
- **decrement_likes_count** - Decrementa contador ao descurtir
- **increment_comments_count** - Incrementa ao comentar
- **decrement_comments_count** - Decrementa ao deletar comentário
- **update_conversation_last_message** - Atualiza timestamp da conversa
- **increment_event_participants** - Incrementa participantes do evento
- **decrement_event_participants** - Decrementa participantes do evento

---

## 📝 Consultas Úteis

### Usuários Ativos
```sql
SELECT name, email, role, last_login
FROM users
WHERE is_active = TRUE
ORDER BY last_login DESC;
```

### Posts Mais Curtidos
```sql
SELECT 
    p.content,
    u.name as autor,
    p.likes_count,
    p.comments_count
FROM posts p
INNER JOIN users u ON p.user_id = u.id
ORDER BY p.likes_count DESC
LIMIT 10;
```

### Eventos Próximos
```sql
SELECT 
    title,
    event_type,
    date,
    time,
    location,
    current_participants,
    max_participants
FROM events
WHERE date >= CURDATE()
ORDER BY date ASC;
```

### Conversas de um Usuário
```sql
SELECT 
    c.*,
    u1.name as usuario1,
    u2.name as usuario2,
    (SELECT COUNT(*) FROM messages 
     WHERE conversation_id = c.id 
     AND sender_id != 1 
     AND is_read = FALSE) as unread_count
FROM conversations c
INNER JOIN users u1 ON c.participant1_id = u1.id
INNER JOIN users u2 ON c.participant2_id = u2.id
WHERE c.participant1_id = 1 OR c.participant2_id = 1;
```

### Recursos Mais Populares
```sql
SELECT 
    title,
    category,
    age_range,
    views_count,
    bookmarks_count
FROM resources
ORDER BY views_count DESC
LIMIT 10;
```

### Notificações Não Lidas
```sql
SELECT 
    n.*,
    u.name as usuario
FROM notifications n
INNER JOIN users u ON n.user_id = u.id
WHERE n.is_read = FALSE
ORDER BY n.created_at DESC;
```

---

## 🔐 Segurança

### ⚠️ IMPORTANTE

**Este schema é para DESENVOLVIMENTO e APRENDIZADO.**

Para **PRODUÇÃO**, você deve:

1. ✅ Usar senhas hasheadas com **bcrypt** ou **Argon2**
2. ✅ Implementar **índices** apropriados
3. ✅ Configurar **permissões** de usuário MySQL
4. ✅ Usar **prepared statements** (evitar SQL injection)
5. ✅ Implementar **rate limiting**
6. ✅ Fazer **backups** regulares
7. ✅ Usar **SSL/TLS** para conexões
8. ✅ Sanitizar **inputs** do usuário
9. ✅ Implementar **logs** de auditoria
10. ✅ Seguir **LGPD** (Lei Geral de Proteção de Dados)

### Exemplo de Hash de Senha (Node.js)

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Hash
const hash = await bcrypt.hash(senha, saltRounds);

// Verificar
const match = await bcrypt.compare(senha, hash);
```

---

## 🔄 Backup e Restore

### Fazer Backup

```bash
# Via linha de comando
mysqldump -u usuario -p familia_conectada > backup.sql

# Ou no MySQL Workbench:
# Server → Data Export → Select familia_conectada
```

### Restaurar Backup

```bash
# Via linha de comando
mysql -u usuario -p familia_conectada < backup.sql

# Ou no MySQL Workbench:
# Server → Data Import → Select backup file
```

---

## 📈 Performance

### Índices Criados

Todos os índices importantes já estão no schema:
- Primary Keys (id)
- Foreign Keys (user_id, post_id, etc.)
- Email (UNIQUE)
- Datas (created_at, date, etc.)
- Status (is_read, is_active, etc.)

### Query Optimization

```sql
-- Ver plano de execução
EXPLAIN SELECT * FROM posts WHERE user_id = 1;

-- Ver índices de uma tabela
SHOW INDEX FROM posts;

-- Analisar tabela
ANALYZE TABLE posts;
```

---

## 🧪 Testes

### Inserir Usuário de Teste

```sql
INSERT INTO users (name, email, password_hash, role, avatar)
VALUES ('Teste Usuario', 'teste@email.com', 'hash_teste', 'mae', 'TU');
```

### Inserir Post de Teste

```sql
INSERT INTO posts (user_id, content, tag)
VALUES (1, 'Este é um post de teste!', 'geral');
```

### Verificar Triggers

```sql
-- Inserir like
INSERT INTO likes (user_id, post_id) VALUES (2, 1);

-- Verificar se contador aumentou
SELECT likes_count FROM posts WHERE id = 1;

-- Remover like
DELETE FROM likes WHERE user_id = 2 AND post_id = 1;

-- Verificar se contador diminuiu
SELECT likes_count FROM posts WHERE id = 1;
```

---

## 📊 Estatísticas do Schema

```sql
-- Total de tabelas
SELECT COUNT(*) as total_tabelas
FROM information_schema.tables
WHERE table_schema = 'familia_conectada';

-- Tamanho do banco
SELECT 
    table_schema as 'Database',
    SUM(data_length + index_length) / 1024 / 1024 as 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'familia_conectada'
GROUP BY table_schema;

-- Linhas por tabela
SELECT 
    table_name as 'Tabela',
    table_rows as 'Linhas'
FROM information_schema.tables
WHERE table_schema = 'familia_conectada'
ORDER BY table_rows DESC;
```

---

## 🐛 Troubleshooting

### Erro: "Table already exists"
```sql
-- Dropar tabela específica
DROP TABLE IF EXISTS nome_da_tabela;

-- Ou dropar banco inteiro e recriar
DROP DATABASE IF EXISTS familia_conectada;
-- Depois execute schema.sql novamente
```

### Erro: Foreign Key Constraint
```sql
-- Desabilitar temporariamente
SET FOREIGN_KEY_CHECKS = 0;
-- Fazer operação
-- Reabilitar
SET FOREIGN_KEY_CHECKS = 1;
```

### Ver Erros
```sql
SHOW WARNINGS;
SHOW ERRORS;
```

---

## 📚 Recursos Adicionais

### MySQL Workbench
- [Download](https://dev.mysql.com/downloads/workbench/)
- [Documentação](https://dev.mysql.com/doc/workbench/en/)

### MySQL
- [Documentação Oficial](https://dev.mysql.com/doc/)
- [Tutorial W3Schools](https://www.w3schools.com/mysql/)

---

## 🎯 Próximos Passos

1. ✅ Criar schema (`schema.sql`)
2. ✅ Popular dados (`seeds.sql`)
3. ⬜ Conectar aplicação ao banco
4. ⬜ Implementar autenticação real
5. ⬜ Criar API REST
6. ⬜ Adicionar testes
7. ⬜ Deploy em produção

---

## 💡 Dicas

- Use **transactions** para operações múltiplas
- Sempre faça **backup** antes de modificar
- Teste queries no **Workbench** antes de usar na aplicação
- Use **prepared statements** para evitar SQL injection
- Monitore **performance** com EXPLAIN
- Documente **mudanças** no schema

---

## 📞 Suporte

**Problemas comuns:**
- Senha do MySQL? → Configure no Workbench
- Permissões? → `GRANT ALL PRIVILEGES ON familia_conectada.* TO 'user'@'localhost';`
- Erro de conexão? → Verifique se MySQL está rodando

---

**Desenvolvido para o projeto Família Conectada** 🤝💙

*MySQL 8.0+ recomendado*
