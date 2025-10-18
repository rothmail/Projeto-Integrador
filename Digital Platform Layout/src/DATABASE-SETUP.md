# 🗄️ Configuração do Banco de Dados MySQL - Guia Rápido

## ✅ O Que Foi Criado

### 📁 Estrutura de Arquivos do Banco

```
/db/
├── schema.sql           # Schema completo do banco (18 tabelas)
├── seeds.sql            # Dados iniciais para teste
├── README.md            # Documentação completa do banco
└── INTEGRATION.md       # Guia de integração Node.js
```

---

## 🚀 Setup Rápido (5 minutos)

### Passo 1: Abrir MySQL Workbench

1. Abra o **MySQL Workbench**
2. Conecte-se ao seu servidor MySQL local
3. Senha padrão geralmente é: `root` ou vazia

### Passo 2: Criar o Banco

1. Vá em: **File** → **Open SQL Script**
2. Selecione `/db/schema.sql`
3. Clique no botão **Execute** (⚡ raio) ou `Ctrl + Shift + Enter`
4. Aguarde alguns segundos
5. ✅ Mensagem de sucesso aparecerá

### Passo 3: Popular com Dados

1. Vá em: **File** → **Open SQL Script**
2. Selecione `/db/seeds.sql`
3. Clique em **Execute** (⚡)
4. Aguarde alguns segundos
5. ✅ Você verá estatísticas dos dados inseridos

### Passo 4: Verificar

```sql
USE familia_conectada;

-- Ver tabelas
SHOW TABLES;

-- Ver usuários
SELECT * FROM users;

-- Ver posts
SELECT * FROM posts;

-- Ver estatísticas
SELECT * FROM v_community_stats;
```

---

## 📊 O Que Tem no Banco

### 18 Tabelas Criadas

✅ **users** - Usuários cadastrados  
✅ **children_ages** - Idades dos filhos  
✅ **posts** - Publicações na timeline  
✅ **likes** - Curtidas nos posts  
✅ **comments** - Comentários  
✅ **conversations** - Conversas privadas  
✅ **messages** - Mensagens  
✅ **forums** - Fóruns temáticos  
✅ **forum_posts** - Posts dos fóruns  
✅ **forum_replies** - Respostas nos fóruns  
✅ **events** - Eventos e encontros  
✅ **event_participants** - Participantes dos eventos  
✅ **resources** - Recursos educativos  
✅ **resource_bookmarks** - Recursos salvos  
✅ **notifications** - Notificações  
✅ **sessions** - Sessões de login  

### Dados de Teste Incluídos

- 📝 **8 usuários** cadastrados
- 📱 **8 posts** na timeline
- 💬 **9 comentários**
- ❤️ **20+ curtidas**
- 💌 **7 mensagens** em conversas
- 📅 **5 eventos** programados
- 📚 **8 recursos** educativos
- 🎯 **5 posts** nos fóruns

### Credenciais para Teste

```
Email: maria@email.com | Senha: 123456
Email: joao@email.com  | Senha: 123456
Email: ana@email.com   | Senha: 123456
```

---

## 🎯 Principais Recursos

### Triggers Automáticos

O banco possui **7 triggers** que mantêm contadores atualizados automaticamente:

- Contador de curtidas (likes_count)
- Contador de comentários (comments_count)
- Contador de participantes de eventos
- Última mensagem das conversas
- E mais...

### Views Pré-definidas

**3 views** para consultas otimizadas:

```sql
-- Posts com informações do usuário
SELECT * FROM v_posts_with_user LIMIT 10;

-- Estatísticas da comunidade
SELECT * FROM v_community_stats;

-- Conversas com última mensagem
SELECT * FROM v_conversations_with_last_message;
```

### Índices Otimizados

Todos os campos importantes têm índices:
- Primary Keys
- Foreign Keys
- Email (UNIQUE)
- Datas (created_at, date, etc.)
- Status (is_read, is_active)

---

## 📝 Consultas Úteis

### Ver Todos os Posts

```sql
SELECT 
    p.content,
    u.name as autor,
    p.likes_count,
    p.comments_count,
    p.created_at
FROM posts p
INNER JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC;
```

### Posts Mais Curtidos

```sql
SELECT 
    content,
    likes_count,
    comments_count
FROM posts
ORDER BY likes_count DESC
LIMIT 5;
```

### Eventos Próximos

```sql
SELECT 
    title,
    event_type,
    date,
    time,
    location
FROM events
WHERE date >= CURDATE()
ORDER BY date ASC;
```

### Mensagens de um Usuário

```sql
SELECT 
    m.*,
    u.name as sender_name
FROM messages m
INNER JOIN users u ON m.sender_id = u.id
WHERE m.conversation_id IN (
    SELECT id FROM conversations 
    WHERE participant1_id = 1 OR participant2_id = 1
)
ORDER BY m.created_at DESC;
```

---

## 🔌 Próximo Passo: Backend

Para conectar o banco à aplicação, você precisa criar um backend. Temos duas opções:

### Opção 1: Node.js + Express (Recomendado)

Leia o arquivo `/db/INTEGRATION.md` para tutorial completo.

**Resumo:**
```bash
# Criar pasta backend
mkdir backend
cd backend

# Instalar dependências
npm init -y
npm install express mysql2 bcrypt jsonwebtoken cors dotenv

# Criar servidor (ver INTEGRATION.md)
```

### Opção 2: PHP

Criar arquivo `api.php`:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$db = 'familia_conectada';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed']));
}

// Endpoints aqui...
?>
```

---

## ⚠️ Importante - Segurança

**Este banco é para DESENVOLVIMENTO/APRENDIZADO!**

Para PRODUÇÃO, você deve:

✅ Usar senhas hasheadas com **bcrypt** (não está implementado)  
✅ Implementar **SSL/TLS** para conexões  
✅ Configurar **permissões** apropriadas no MySQL  
✅ Usar **prepared statements** (evitar SQL injection)  
✅ Implementar **rate limiting**  
✅ Fazer **backups** regulares  
✅ Seguir **LGPD** (Lei Geral de Proteção de Dados)  

**Senhas atuais:** Estão com hash simples "jlk" apenas para testes. Em produção, use bcrypt com salt rounds >= 10.

---

## 🐛 Problemas Comuns

### "Access denied for user"
```
Solução: Verificar senha do MySQL
No terminal: mysql -u root -p
```

### "Table already exists"
```sql
-- Dropar banco e recriar
DROP DATABASE IF EXISTS familia_conectada;
-- Executar schema.sql novamente
```

### "Cannot delete or update a parent row"
```sql
-- Desabilitar checks temporariamente
SET FOREIGN_KEY_CHECKS = 0;
-- Fazer operação
SET FOREIGN_KEY_CHECKS = 1;
```

---

## 📚 Documentação Completa

- **`/db/README.md`** - Documentação detalhada do schema
- **`/db/INTEGRATION.md`** - Tutorial de integração backend
- **`/db/schema.sql`** - Código SQL do schema
- **`/db/seeds.sql`** - Dados iniciais

---

## 🎨 Margens Aumentadas

As margens do layout foram **significativamente aumentadas**:

### Antes → Depois

```css
/* Main Content */
padding: 1.5rem → 3.5rem (desktop)

/* Cards */
margin-bottom: 1.5rem → 2.5rem
padding: 1.25rem → 2.5rem (desktop)

/* Títulos */
h1: margin-bottom: 1rem → 2rem
h2: margin-bottom: 0.75rem → 1.75rem

/* Parágrafos */
p: margin-bottom: 0.75rem → 1.25rem

/* Seções */
section: margin-bottom: 2rem → 3rem
```

### Resultado

✅ Layout mais respirável  
✅ Hierarquia visual clara  
✅ Espaçamento profissional  
✅ Melhor legibilidade  
✅ UX aprimorada  

---

## ✅ Checklist de Implementação

### Banco de Dados
- [x] Schema SQL criado (schema.sql)
- [x] Dados de teste criados (seeds.sql)
- [x] 18 tabelas configuradas
- [x] Triggers implementados
- [x] Views criadas
- [x] Índices otimizados
- [x] Documentação completa

### Margens
- [x] CSS atualizado (vanilla.css)
- [x] Margens aumentadas
- [x] Padding aumentado
- [x] Espaçamento responsivo
- [x] Classes utilities atualizadas

### Próximos Passos
- [ ] Criar backend (Node.js/PHP)
- [ ] Conectar frontend ao backend
- [ ] Implementar autenticação real
- [ ] Testar CRUD de posts
- [ ] Deploy em produção

---

## 📊 Estatísticas

```
Schema SQL:      ~500 linhas
Seeds SQL:       ~400 linhas
Tabelas:         18
Triggers:        7
Views:           3
Índices:         40+
Usuários teste:  8
Posts teste:     8
Eventos teste:   5
Recursos teste:  8
```

---

## 🎉 Resumo

Você agora tem:

1. ✅ **Banco de dados MySQL completo** com 18 tabelas
2. ✅ **Dados de teste** prontos para uso
3. ✅ **Triggers automáticos** para manter contadores
4. ✅ **Views otimizadas** para consultas comuns
5. ✅ **Documentação extensiva** com exemplos
6. ✅ **Guia de integração** backend completo
7. ✅ **Margens aumentadas** em todo o layout
8. ✅ **Layout profissional** e respirável

**Próximo passo:** Criar o backend seguindo `/db/INTEGRATION.md`

---

**Desenvolvido para o projeto Família Conectada** 🤝💙

*MySQL 8.0+ | InnoDB Engine | UTF-8 Charset*
