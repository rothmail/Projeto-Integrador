# 🔌 Integração com MySQL - Guia Completo

## 📋 Visão Geral

Este guia mostra como integrar a aplicação Família Conectada com o banco de dados MySQL.

---

## 🎯 Opções de Integração

### Opção 1: Backend Node.js + Express (Recomendado)

Criar uma API REST que conecta ao MySQL e serve dados para o frontend.

### Opção 2: PHP Backend

Usar PHP para criar endpoints de API.

### Opção 3: Python + Flask/Django

Backend Python com ORM.

---

## 🚀 Opção 1: Node.js + Express + MySQL

### Passo 1: Instalar Dependências

```bash
npm init -y
npm install express mysql2 bcrypt jsonwebtoken cors dotenv
npm install --save-dev nodemon
```

### Passo 2: Criar Estrutura

```
backend/
├── server.js
├── .env
├── config/
│   └── database.js
├── routes/
│   ├── auth.js
│   ├── posts.js
│   ├── users.js
│   └── ...
├── controllers/
│   ├── authController.js
│   ├── postsController.js
│   └── ...
└── middlewares/
    └── authMiddleware.js
```

### Passo 3: Configurar Banco (.env)

```env
# .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=familia_conectada
DB_PORT=3306

JWT_SECRET=seu_secret_super_seguro_aqui
JWT_EXPIRES_IN=24h

PORT=3001
```

### Passo 4: Criar Conexão (config/database.js)

```javascript
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = promisePool;
```

### Passo 5: Criar Server (server.js)

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### Passo 6: Criar Auth Controller (controllers/authController.js)

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, childrenAges } = req.body;

    // Validações
    if (!name || !email || !password || !role) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios' 
      });
    }

    // Verificar se email já existe
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ 
        error: 'Email já cadastrado' 
      });
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Gerar avatar
    const nameParts = name.trim().split(' ');
    const avatar = nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : name.substring(0, 2);

    // Inserir usuário
    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash, role, avatar) VALUES (?, ?, ?, ?, ?)',
      [name, email, passwordHash, role, avatar.toUpperCase()]
    );

    const userId = result.insertId;

    // Inserir idades dos filhos
    if (childrenAges && childrenAges.length > 0) {
      const values = childrenAges.map(age => [userId, age]);
      await db.query(
        'INSERT INTO children_ages (user_id, age_range) VALUES ?',
        [values]
      );
    }

    // Gerar token
    const token = jwt.sign(
      { userId, email, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: userId,
        name,
        email,
        role,
        avatar: avatar.toUpperCase()
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validações
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email e senha são obrigatórios' 
      });
    }

    // Buscar usuário
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ? AND is_active = TRUE',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        error: 'Email ou senha incorretos' 
      });
    }

    const user = users[0];

    // Verificar senha
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ 
        error: 'Email ou senha incorretos' 
      });
    }

    // Atualizar último login
    await db.query(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Gerar token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

exports.me = async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, name, email, role, avatar, bio, created_at FROM users WHERE id = ?',
      [req.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};
```

### Passo 7: Criar Auth Routes (routes/auth.js)

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.me);

module.exports = router;
```

### Passo 8: Criar Auth Middleware (middlewares/authMiddleware.js)

```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
```

### Passo 9: Criar Posts Controller (controllers/postsController.js)

```javascript
const db = require('../config/database');

exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const [posts] = await db.query(
      `SELECT * FROM v_posts_with_user 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [total] = await db.query('SELECT COUNT(*) as count FROM posts');

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total: total[0].count,
        pages: Math.ceil(total[0].count / limit)
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Erro ao buscar posts' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, imageUrl, tag } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Conteúdo é obrigatório' });
    }

    const [result] = await db.query(
      'INSERT INTO posts (user_id, content, image_url, tag) VALUES (?, ?, ?, ?)',
      [req.userId, content, imageUrl || null, tag || 'geral']
    );

    const [post] = await db.query(
      'SELECT * FROM v_posts_with_user WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Post criado com sucesso',
      post: post[0]
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Erro ao criar post' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Verificar se já curtiu
    const [existing] = await db.query(
      'SELECT id FROM likes WHERE user_id = ? AND post_id = ?',
      [req.userId, postId]
    );

    if (existing.length > 0) {
      // Descurtir
      await db.query(
        'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
        [req.userId, postId]
      );

      return res.json({
        success: true,
        message: 'Like removido',
        liked: false
      });
    } else {
      // Curtir
      await db.query(
        'INSERT INTO likes (user_id, post_id) VALUES (?, ?)',
        [req.userId, postId]
      );

      return res.json({
        success: true,
        message: 'Post curtido',
        liked: true
      });
    }
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Erro ao curtir post' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Conteúdo é obrigatório' });
    }

    const [result] = await db.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [postId, req.userId, content]
    );

    const [comment] = await db.query(
      `SELECT c.*, u.name as user_name, u.avatar as user_avatar 
       FROM comments c 
       INNER JOIN users u ON c.user_id = u.id 
       WHERE c.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Comentário adicionado',
      comment: comment[0]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Erro ao adicionar comentário' });
  }
};
```

### Passo 10: Criar Posts Routes (routes/posts.js)

```javascript
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', postsController.getPosts);
router.post('/', authMiddleware, postsController.createPost);
router.post('/:id/like', authMiddleware, postsController.likePost);
router.post('/:id/comments', authMiddleware, postsController.addComment);

module.exports = router;
```

### Passo 11: Atualizar package.json

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Passo 12: Iniciar Backend

```bash
npm run dev
```

---

## 🌐 Integrar Frontend com Backend

### Atualizar auth.js no Frontend

```javascript
// js/auth.js

const API_URL = 'http://localhost:3001/api';

class AuthService {
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.error };
      }
    } catch (error) {
      return { success: false, message: 'Erro de conexão' };
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.error };
      }
    } catch (error) {
      return { success: false, message: 'Erro de conexão' };
    }
  }

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.user;
      } else {
        this.logout();
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

const authService = new AuthService();
```

### Helper para Requisições Autenticadas

```javascript
// js/api.js

const API_URL = 'http://localhost:3001/api';

async function fetchWithAuth(endpoint, options = {}) {
  const token = authService.getToken();

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Exemplos de uso:
async function getPosts(page = 1) {
  return await fetchWithAuth(`/posts?page=${page}`);
}

async function createPost(content, tag) {
  return await fetchWithAuth('/posts', {
    method: 'POST',
    body: JSON.stringify({ content, tag })
  });
}

async function likePost(postId) {
  return await fetchWithAuth(`/posts/${postId}/like`, {
    method: 'POST'
  });
}
```

---

## 📚 Recursos Adicionais

### Node.js
- [Express.js](https://expressjs.com/)
- [MySQL2](https://github.com/sidorares/node-mysql2)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

### Tutoriais
- [Node.js + MySQL](https://www.w3schools.com/nodejs/nodejs_mysql.asp)
- [JWT Authentication](https://jwt.io/introduction)
- [RESTful API Design](https://restfulapi.net/)

---

**Desenvolvido para o projeto Família Conectada** 🤝💙
