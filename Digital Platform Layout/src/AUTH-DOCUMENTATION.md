# 🔐 Sistema de Autenticação - Família Conectada

## 📋 Visão Geral

Sistema completo de autenticação desenvolvido em **JavaScript puro** (Vanilla JS), incluindo login, cadastro, gerenciamento de sessão e controle de usuários.

---

## ✨ Funcionalidades

### 🔑 Autenticação
- ✅ **Login** com email e senha
- ✅ **Cadastro** com validações completas
- ✅ **Logout** com limpeza de sessão
- ✅ **Sessão persistente** (24 horas)
- ✅ **"Lembrar-me"** (futuro)
- ✅ **Recuperação de senha** (futuro)

### 👤 Gerenciamento de Usuário
- ✅ **Perfis de usuário** (Mãe, Pai, Responsável, Cuidador, Outro)
- ✅ **Idade dos filhos** (0-2, 3-5, 6-12, 13+)
- ✅ **Avatar com iniciais** gerado automaticamente
- ✅ **Atualização de dados** do perfil
- ✅ **Alteração de senha**
- ✅ **Exclusão de conta**

### 🛡️ Segurança
- ✅ **Validação de email** (formato correto)
- ✅ **Validação de senha** (mínimo 6 caracteres)
- ✅ **Hash de senha** (demonstração - não usar em produção)
- ✅ **Proteção contra emails duplicados**
- ✅ **Expiração de sessão** (24 horas)
- ✅ **Armazenamento local** (localStorage)

---

## 🏗️ Arquitetura

### Estrutura de Arquivos

```
/
├── index.html          # Tela de login/cadastro
├── js/
│   ├── auth.js        # Sistema de autenticação (backend)
│   ├── app.js         # Lógica de aplicação e autenticação
│   ├── components.js  # Componentes (header com logout)
│   ├── state.js       # Estado global
│   └── ...
└── styles/
    └── vanilla.css    # Estilos de login/cadastro
```

### Fluxo de Autenticação

```
1. Usuário acessa aplicação
   ↓
2. checkAuthentication() verifica localStorage
   ↓
3a. Se autenticado → showApp()
3b. Se não autenticado → showAuthScreen()
   ↓
4. Usuário faz login/cadastro
   ↓
5. authService.login() / authService.register()
   ↓
6. Credenciais validadas
   ↓
7. Sessão criada no localStorage
   ↓
8. showApp() - Redireciona para aplicação
```

---

## 💻 Código - Backend (auth.js)

### Classe `AuthService`

#### Métodos Principais

**1. `register(userData)`**
```javascript
// Registra novo usuário
const result = authService.register({
  name: 'João Silva',
  email: 'joao@email.com',
  password: '123456',
  role: 'pai',
  childrenAges: ['0-2', '3-5']
});

// Retorna:
// {
//   success: true,
//   message: 'Cadastro realizado com sucesso!',
//   user: { id, name, email, role, avatar, ... }
// }
```

**2. `login(email, password)`**
```javascript
// Faz login
const result = authService.login('joao@email.com', '123456');

// Retorna:
// {
//   success: true,
//   message: 'Login realizado com sucesso!',
//   user: { ... }
// }
```

**3. `logout()`**
```javascript
// Faz logout
const result = authService.logout();

// Retorna:
// {
//   success: true,
//   message: 'Logout realizado com sucesso!'
// }
```

**4. `getCurrentUser()`**
```javascript
// Obtém usuário logado
const user = authService.getCurrentUser();

// Retorna:
// {
//   id: '1697825362847',
//   name: 'João Silva',
//   email: 'joao@email.com',
//   role: 'pai',
//   avatar: 'JS',
//   childrenAges: ['0-2', '3-5'],
//   createdAt: '2023-10-20T15:30:00.000Z',
//   lastLogin: '2023-10-20T15:30:00.000Z',
//   sessionStart: 1697825362847
// }
```

**5. `isAuthenticated()`**
```javascript
// Verifica se está autenticado
const isAuth = authService.isAuthenticated(); // true ou false
```

**6. `updateUser(userId, updates)`**
```javascript
// Atualiza dados do usuário
const result = authService.updateUser('123', {
  name: 'João Pedro Silva',
  role: 'responsavel'
});
```

**7. `changePassword(userId, currentPassword, newPassword)`**
```javascript
// Altera senha
const result = authService.changePassword(
  '123',
  'senha-atual',
  'nova-senha'
);
```

**8. `deleteAccount(userId, password)`**
```javascript
// Deleta conta
const result = authService.deleteAccount('123', 'senha');
```

---

## 🎨 Frontend - Tela de Login/Cadastro

### Estrutura HTML

```html
<div id="auth-screen" class="auth-container">
  <div class="auth-card">
    <!-- Header -->
    <div class="auth-header">
      <div class="auth-logo">...</div>
      <h1 class="auth-title">Família Conectada</h1>
      <p class="auth-subtitle">...</p>
    </div>

    <!-- Body -->
    <div class="auth-body">
      <!-- Alertas -->
      <div id="auth-alert"></div>

      <!-- Formulário de Login -->
      <div id="login-form" class="form-container active">
        <form id="login-form-element">...</form>
      </div>

      <!-- Formulário de Cadastro -->
      <div id="register-form" class="form-container">
        <form id="register-form-element">...</form>
      </div>
    </div>

    <!-- Footer -->
    <div class="auth-footer">
      <div class="auth-switch">...</div>
    </div>
  </div>
</div>
```

### CSS Classes

#### Containers
- `.auth-container` - Container principal (fullscreen)
- `.auth-card` - Card de autenticação
- `.auth-header` - Cabeçalho com logo
- `.auth-body` - Corpo com formulários
- `.auth-footer` - Rodapé com toggle

#### Formulários
- `.form-container` - Container de formulário
- `.form-container.active` - Formulário ativo (visível)
- `.form-group` - Grupo de campo
- `.form-label` - Label do campo
- `.form-label.required` - Label obrigatória (*)
- `.form-input` - Input de texto/email
- `.form-select` - Select dropdown
- `.form-error` - Mensagem de erro
- `.form-error.show` - Erro visível

#### Componentes
- `.password-wrapper` - Wrapper do campo senha
- `.password-toggle` - Botão toggle senha
- `.checkbox-group` - Grupo de checkboxes
- `.checkbox-item` - Item de checkbox
- `.auth-submit-btn` - Botão de submit
- `.auth-alert` - Alerta de sucesso/erro
- `.auth-alert-success` - Alerta verde
- `.auth-alert-error` - Alerta vermelho

---

## 🔄 Transição Login ↔ Cadastro

### JavaScript

```javascript
function toggleAuthForm(formType) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginSwitch = document.getElementById('login-switch');
  const registerSwitch = document.getElementById('register-switch');
  
  if (formType === 'register') {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
    loginSwitch.style.display = 'none';
    registerSwitch.style.display = 'block';
  } else {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
    registerSwitch.style.display = 'none';
    loginSwitch.style.display = 'block';
  }
}
```

### CSS Animation

```css
.form-container {
  display: none;
}

.form-container.active {
  display: block;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 📦 Estrutura de Dados

### Objeto de Usuário

```javascript
{
  id: '1697825362847',                    // Timestamp único
  name: 'Maria Silva',                     // Nome completo
  email: 'maria@email.com',                // Email (único)
  password: 'hashed_password',             // Senha hasheada
  role: 'mae',                             // Papel (mae, pai, responsavel, etc.)
  childrenAges: ['0-2', '6-12'],          // Idades dos filhos
  avatar: 'MS',                            // Iniciais para avatar
  createdAt: '2023-10-20T10:00:00.000Z',  // Data de criação
  lastLogin: '2023-10-20T15:30:00.000Z',  // Último login
  updatedAt: '2023-10-20T12:00:00.000Z'   // Última atualização (opcional)
}
```

### Papéis de Usuário

```javascript
const ROLES = {
  mae: 'Mãe',
  pai: 'Pai',
  responsavel: 'Responsável',
  cuidador: 'Cuidador(a)',
  outro: 'Outro'
};
```

### Faixas Etárias

```javascript
const AGE_RANGES = {
  '0-2': '0-2 anos (Primeira Infância)',
  '3-5': '3-5 anos (Pré-escola)',
  '6-12': '6-12 anos (Infância)',
  '13+': '13+ anos (Adolescência)'
};
```

---

## 🔒 Armazenamento (localStorage)

### Chaves

```javascript
// Todos os usuários cadastrados
localStorage.getItem('familiaConectada_users')
// Array: [user1, user2, user3, ...]

// Usuário atualmente logado
localStorage.getItem('familiaConectada_currentUser')
// Object: { ...user, sessionStart: timestamp }
```

### Estrutura

```javascript
// familiaConectada_users
[
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    password: 'hash123',
    role: 'pai',
    childrenAges: ['0-2'],
    avatar: 'JS',
    createdAt: '...',
    lastLogin: '...'
  },
  { ... },
  { ... }
]

// familiaConectada_currentUser
{
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  // password NÃO é armazenado aqui
  role: 'pai',
  childrenAges: ['0-2'],
  avatar: 'JS',
  createdAt: '...',
  lastLogin: '...',
  sessionStart: 1697825362847  // Timestamp da sessão
}
```

---

## ✅ Validações

### Email
```javascript
// Regex de validação
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Exemplos válidos:
- joao@email.com ✅
- maria.silva@empresa.com.br ✅

// Exemplos inválidos:
- joao@email ❌
- @email.com ❌
- joao email.com ❌
```

### Senha
```javascript
// Regras:
- Mínimo 6 caracteres ✅
- Não pode estar vazia ✅

// Futuro (implementar):
- 1 letra maiúscula
- 1 número
- 1 caractere especial
```

### Nome
```javascript
// Regras:
- Mínimo 2 caracteres ✅
- Não pode estar vazio ✅
```

### Papel
```javascript
// Regras:
- Deve selecionar uma opção ✅
- Valores válidos: mae, pai, responsavel, cuidador, outro ✅
```

---

## 🎯 Exemplos de Uso

### 1. Login Simples

```javascript
// HTML
<form id="login-form-element">
  <input type="email" id="login-email" />
  <input type="password" id="login-password" />
  <button type="submit">Entrar</button>
</form>

// JavaScript
document.getElementById('login-form-element')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const result = authService.login(email, password);
    
    if (result.success) {
      alert('Login realizado!');
      showApp();
    } else {
      alert(result.message);
    }
  });
```

### 2. Cadastro Completo

```javascript
// JavaScript
const result = authService.register({
  name: document.getElementById('register-name').value,
  email: document.getElementById('register-email').value,
  password: document.getElementById('register-password').value,
  role: document.getElementById('register-role').value,
  childrenAges: getSelectedAges() // Função customizada
});

if (result.success) {
  console.log('Usuário criado:', result.user);
}
```

### 3. Verificar Autenticação

```javascript
// Ao carregar a aplicação
if (authService.isAuthenticated()) {
  const user = authService.getCurrentUser();
  console.log('Bem-vindo,', user.name);
  showApp();
} else {
  showAuthScreen();
}
```

### 4. Logout

```javascript
// No botão de sair
document.getElementById('logout-btn')
  .addEventListener('click', () => {
    authService.logout();
    window.location.reload(); // Recarrega página
  });
```

---

## 🎨 Personalização CSS

### Cores

```css
/* Paleta de cores */
:root {
  --brown: #8B4513;         /* Primary */
  --wheat: #F5DEB3;         /* Background */
  --pure-white: #FFFFFF;    /* Cards */
  --dark-gray: #4A4A4A;     /* Text */
}

/* Customizar card de auth */
.auth-card {
  background-color: var(--pure-white);
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Customizar botões */
.auth-submit-btn {
  background-color: var(--brown);
  color: var(--pure-white);
}

.auth-submit-btn:hover {
  background-color: rgba(139, 69, 19, 0.9);
}
```

### Responsividade

```css
/* Mobile (< 480px) */
@media (max-width: 480px) {
  .auth-card {
    margin: 1rem;
  }
  
  .auth-header,
  .auth-body,
  .auth-footer {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
```

---

## ⚠️ Avisos de Segurança

### ❌ NÃO USAR EM PRODUÇÃO

Este sistema de autenticação é **apenas para demonstração e aprendizado**. Ele **NÃO deve ser usado em produção** pelos seguintes motivos:

1. **Senhas não são criptografadas adequadamente**
   - Usa hash simples, não bcrypt
   - Vulnerável a ataques

2. **Armazena dados no localStorage**
   - Pode ser acessado por JavaScript malicioso
   - Não é seguro para dados sensíveis

3. **Sem proteção contra ataques**
   - Sem rate limiting
   - Sem CSRF protection
   - Sem XSS protection

4. **Sem backend real**
   - Não há servidor
   - Dados são apenas locais

### ✅ Para Produção, Use:

- **Backend real** (Node.js, Python, PHP, etc.)
- **Banco de dados** (PostgreSQL, MySQL, MongoDB, etc.)
- **bcrypt** ou **Argon2** para hash de senhas
- **JWT** ou **Sessions** para autenticação
- **HTTPS** obrigatório
- **Rate limiting** contra brute force
- **CSRF tokens**
- **XSS sanitization**
- **OAuth** para login social (Google, Facebook, etc.)

---

## 📚 Recursos de Aprendizado

### Tutoriais
- [MDN Web Docs - Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

### Bibliotecas Recomendadas (Produção)
- **Backend:** [Passport.js](http://www.passportjs.org/), [Auth0](https://auth0.com/)
- **Hash:** [bcrypt](https://www.npmjs.com/package/bcrypt), [Argon2](https://www.npmjs.com/package/argon2)
- **JWT:** [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

---

## 🆘 Suporte e FAQ

### Como testar o sistema?

1. Abra `index.html` em um navegador
2. Clique em "Cadastre-se"
3. Preencha o formulário
4. Clique em "Criar conta"
5. Você será automaticamente logado

### Como ver os dados armazenados?

```javascript
// No console do navegador (F12)
console.log(localStorage.getItem('familiaConectada_users'));
console.log(localStorage.getItem('familiaConectada_currentUser'));
```

### Como limpar os dados?

```javascript
// No console do navegador (F12)
localStorage.clear();
// ou
localStorage.removeItem('familiaConectada_users');
localStorage.removeItem('familiaConectada_currentUser');
```

### Como adicionar novos campos?

1. Adicione o campo no HTML (index.html)
2. Capture o valor no `handleRegister()` (app.js)
3. Adicione na estrutura de usuário (auth.js)
4. Atualize as validações se necessário

---

## 📝 Changelog

### v1.0.0 - 2023-10-20
- ✅ Sistema de autenticação completo
- ✅ Login e cadastro
- ✅ Validações de formulário
- ✅ Gerenciamento de sessão
- ✅ UI responsiva
- ✅ Transições suaves
- ✅ Avatar com iniciais
- ✅ Logout integrado

---

**Desenvolvido para o projeto Família Conectada** 🤝💙

*Sistema educacional - Não usar em produção*
