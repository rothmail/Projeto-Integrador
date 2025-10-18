# ⚡ Guia Rápido - Backend API

## 🚀 Setup em 5 Minutos

### 1️⃣ Instalar Dependências (1 min)

```bash
cd backend
npm install
```

### 2️⃣ Configurar Banco de Dados (2 min)

**No MySQL Workbench:**

1. Abra e execute `/db/schema.sql`
2. Execute `/db/seeds.sql`

### 3️⃣ Configurar Variáveis (1 min)

```bash
# Copiar exemplo
cp .env.example .env

# Editar .env
nano .env
```

**Mínimo necessário:**

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=familia_conectada

JWT_SECRET=cole_chave_aleatoria_aqui
```

**Gerar JWT_SECRET:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4️⃣ Iniciar Servidor (1 min)

```bash
npm run dev
```

**Pronto!** 🎉

Servidor rodando em: `http://localhost:3001`

---

## ✅ Testar

### Health Check

```bash
curl http://localhost:3001/api/health
```

Deve retornar:

```json
{
  "status": "ok",
  "message": "API Família Conectada is running",
  "timestamp": "..."
}
```

### Login de Teste

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@email.com","password":"123456"}'
```

Deve retornar token JWT.

---

## 📝 Credenciais de Teste

```
Email: maria@email.com
Senha: 123456

Email: joao@email.com
Senha: 123456

Email: ana@email.com
Senha: 123456
```

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start

# Ver logs
tail -f logs/app.log  # Se configurado
```

---

## 🐛 Problemas?

### Erro de conexão MySQL

```bash
# Verificar se MySQL está rodando
mysql -u root -p

# Se conectar, o MySQL está OK
```

### Porta já em uso

```bash
# Mudar porta no .env
PORT=3002
```

### Token inválido

Regere o `JWT_SECRET` e faça login novamente.

---

## 📚 Próximo Passo

Integrar com o frontend! Veja:
- `/backend/README.md` - Documentação completa
- `/db/INTEGRATION.md` - Guia de integração

---

**Boa codificação!** 💻🚀
