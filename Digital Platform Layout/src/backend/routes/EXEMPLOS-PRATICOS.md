# 💡 Exemplos Práticos - Rotas de Usuários

## 📖 Guia Prático para Desenvolvedores

Este documento contém exemplos práticos e casos de uso reais para as rotas de usuários da plataforma Família Conectada.

---

## 🎯 Cenários Reais de Uso

### Cenário 1: Novo Usuário na Plataforma

**História**: Maria é mãe de primeira viagem e acabou de criar uma conta na plataforma.

**Fluxo**:

```javascript
// 1. Maria se registra
const registro = await fetch('http://localhost:3001/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Maria Silva',
    email: 'maria@email.com',
    password: 'senha123',
    role: 'mae'
  })
});

// 2. Faz login e recebe o token
const login = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'maria@email.com',
    password: 'senha123'
  })
});

const { token } = await login.json();
localStorage.setItem('authToken', token);

// 3. Completa seu perfil
await fetch('http://localhost:3001/api/users/profile', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    bio: 'Mãe de primeira viagem, aprendendo a cada dia!',
    childrenAges: ['0-2']
  })
});

// 4. Escolhe seu avatar
await fetch('http://localhost:3001/api/users/avatar', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: '👩‍🍼'
  })
});

// 5. Verifica seu perfil completo
const perfil = await fetch('http://localhost:3001/api/users/profile/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});

console.log('Perfil completo:', await perfil.json());
```

---

### Cenário 2: Buscar Mães com Bebês

**História**: João quer encontrar outras mães com bebês de 0-2 anos para trocar experiências.

```javascript
// Buscar mães com bebês
const response = await fetch(
  'http://localhost:3001/api/users/search?q=a&role=mae&childrenAge=0-2&limit=10'
);

const data = await response.json();

// Exibir resultados
data.users.forEach(user => {
  console.log(`
    Nome: ${user.name}
    Bio: ${user.bio}
    Filhos: ${user.children_ages.join(', ')}
    ---
  `);
});

// Resultado esperado:
// Nome: Ana Paula
// Bio: Mãe de primeira viagem
// Filhos: 0-2
// ---
// Nome: Maria Silva
// Bio: Aprendendo a cada dia
// Filhos: 0-2
```

---

### Cenário 3: Ver Perfil e Atividades de Outro Usuário

**História**: Maria viu um post interessante de Ana e quer conhecer melhor seu perfil.

```javascript
// 1. Ver perfil de Ana (ID 5)
const perfilAna = await fetch('http://localhost:3001/api/users/5');
const { user, stats } = await perfilAna.json();

console.log('Perfil:', user);
console.log('Posts:', stats.posts_count);
console.log('Comentários:', stats.comments_count);

// 2. Ver posts de Ana
const postsAna = await fetch('http://localhost:3001/api/users/5/posts?limit=5');
const { posts } = await postsAna.json();

posts.forEach(post => {
  console.log(`
    ${post.content}
    ❤️ ${post.likes_count} 💬 ${post.comments_count}
  `);
});

// 3. Ver atividade recente de Ana
const atividadeAna = await fetch('http://localhost:3001/api/users/5/activity?limit=10');
const { activities } = await atividadeAna.json();

activities.forEach(activity => {
  const emoji = activity.type === 'post' ? '📝' : '💬';
  console.log(`${emoji} ${activity.description}`);
});
```

---

### Cenário 4: Atualizar Perfil Conforme Filho Cresce

**História**: Maria quer atualizar a faixa etária do filho que completou 3 anos.

```javascript
const token = localStorage.getItem('authToken');

// Atualizar idade do filho
await fetch('http://localhost:3001/api/users/profile', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    childrenAges: ['3-5'] // Mudou de 0-2 para 3-5
  })
});

console.log('Perfil atualizado! Agora você verá conteúdo para 3-5 anos.');
```

---

### Cenário 5: Busca Paginada na Comunidade

**História**: Navegar pela lista de membros da comunidade.

```javascript
let paginaAtual = 1;
const itensPorPagina = 12;

async function carregarPagina(pagina) {
  const response = await fetch(
    `http://localhost:3001/api/users?page=${pagina}&limit=${itensPorPagina}`
  );
  
  const data = await response.json();
  
  // Exibir usuários
  console.log(`\n--- Página ${data.pagination.page} de ${data.pagination.pages} ---`);
  data.users.forEach(user => {
    console.log(`${user.avatar} ${user.name} - ${user.role}`);
  });
  
  return data.pagination;
}

// Carregar primeira página
const paginacao = await carregarPagina(1);

// Botão "Próxima" - carregar página 2
if (paginaAtual < paginacao.pages) {
  await carregarPagina(++paginaAtual);
}

// Botão "Anterior" - voltar para página 1
if (paginaAtual > 1) {
  await carregarPagina(--paginaAtual);
}
```

---

### Cenário 6: Alterar Senha por Segurança

**História**: Maria quer alterar sua senha após acessar de um computador público.

```javascript
const token = localStorage.getItem('authToken');

const senhaAtual = prompt('Digite sua senha atual:');
const novaSenha = prompt('Digite sua nova senha (mín. 6 caracteres):');
const confirmarSenha = prompt('Confirme sua nova senha:');

if (novaSenha !== confirmarSenha) {
  alert('As senhas não coincidem!');
} else if (novaSenha.length < 6) {
  alert('A nova senha deve ter pelo menos 6 caracteres!');
} else {
  const response = await fetch('http://localhost:3001/api/users/password', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      currentPassword: senhaAtual,
      newPassword: novaSenha
    })
  });
  
  const data = await response.json();
  
  if (data.success) {
    alert('Senha alterada com sucesso!');
  } else {
    alert('Erro: ' + data.error);
  }
}
```

---

### Cenário 7: Busca com Autocompletar

**História**: Implementar busca em tempo real enquanto o usuário digita.

```javascript
let timeoutBusca;

function buscarUsuariosEmTempoReal(termo) {
  // Cancelar busca anterior
  clearTimeout(timeoutBusca);
  
  // Aguardar 500ms após parar de digitar
  timeoutBusca = setTimeout(async () => {
    if (termo.length < 2) {
      console.log('Digite pelo menos 2 caracteres');
      return;
    }
    
    const response = await fetch(
      `http://localhost:3001/api/users/search?q=${termo}&limit=5`
    );
    
    const data = await response.json();
    
    // Exibir sugestões
    console.log(`${data.users.length} resultados para "${termo}":`);
    data.users.forEach(user => {
      console.log(`  ${user.avatar} ${user.name}`);
    });
  }, 500);
}

// Simular digitação
buscarUsuariosEmTempoReal('mar');
// ... usuário continua digitando
buscarUsuariosEmTempoReal('maria');
```

---

### Cenário 8: Lista de Usuários com Filtros Múltiplos

**História**: Interface de busca avançada com múltiplos filtros.

```javascript
class FiltrosUsuarios {
  constructor() {
    this.filtros = {
      termo: '',
      papel: '',
      idadeFilhos: '',
      pagina: 1,
      limite: 20
    };
  }
  
  setTermo(termo) {
    this.filtros.termo = termo;
    this.filtros.pagina = 1; // Resetar para página 1
  }
  
  setPapel(papel) {
    this.filtros.papel = papel;
    this.filtros.pagina = 1;
  }
  
  setIdadeFilhos(idade) {
    this.filtros.idadeFilhos = idade;
    this.filtros.pagina = 1;
  }
  
  proximaPagina() {
    this.filtros.pagina++;
  }
  
  paginaAnterior() {
    if (this.filtros.pagina > 1) {
      this.filtros.pagina--;
    }
  }
  
  async buscar() {
    const params = new URLSearchParams();
    
    if (this.filtros.termo) params.append('q', this.filtros.termo);
    if (this.filtros.papel) params.append('role', this.filtros.papel);
    if (this.filtros.idadeFilhos) params.append('childrenAge', this.filtros.idadeFilhos);
    params.append('page', this.filtros.pagina);
    params.append('limit', this.filtros.limite);
    
    const response = await fetch(
      `http://localhost:3001/api/users/search?${params}`
    );
    
    return await response.json();
  }
}

// Uso
const filtros = new FiltrosUsuarios();
filtros.setTermo('ana');
filtros.setPapel('mae');
filtros.setIdadeFilhos('0-2');

const resultados = await filtros.buscar();
console.log(resultados);
```

---

### Cenário 9: Componente React de Perfil Editável

**História**: Componente completo de perfil com modo de visualização e edição.

```javascript
import React, { useState, useEffect } from 'react';

function PerfilEditavel() {
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: '',
    childrenAges: []
  });
  
  useEffect(() => {
    carregarPerfil();
  }, []);
  
  const carregarPerfil = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:3001/api/users/profile/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    if (data.success) {
      setPerfil(data.user);
      setFormData({
        name: data.user.name,
        bio: data.user.bio || '',
        avatar: data.user.avatar || '',
        childrenAges: data.user.children_ages || []
      });
    }
    setCarregando(false);
  };
  
  const salvar = async () => {
    setSalvando(true);
    const token = localStorage.getItem('authToken');
    
    // Salvar perfil
    const responsePerfil = await fetch('http://localhost:3001/api/users/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        bio: formData.bio,
        childrenAges: formData.childrenAges
      })
    });
    
    // Salvar avatar separadamente
    if (formData.avatar !== perfil.avatar) {
      await fetch('http://localhost:3001/api/users/avatar', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ avatar: formData.avatar })
      });
    }
    
    await carregarPerfil();
    setEditando(false);
    setSalvando(false);
  };
  
  const toggleIdadeFilho = (idade) => {
    setFormData(prev => ({
      ...prev,
      childrenAges: prev.childrenAges.includes(idade)
        ? prev.childrenAges.filter(i => i !== idade)
        : [...prev.childrenAges, idade]
    }));
  };
  
  if (carregando) return <div>Carregando perfil...</div>;
  
  return (
    <div className="perfil-container">
      {!editando ? (
        // Modo Visualização
        <div className="perfil-view">
          <div className="avatar-grande">{perfil.avatar}</div>
          <h2>{perfil.name}</h2>
          <p className="email">{perfil.email}</p>
          <p className="bio">{perfil.bio}</p>
          <div className="info">
            <span className="badge">{perfil.role}</span>
            {perfil.children_ages.map(idade => (
              <span key={idade} className="badge">{idade} anos</span>
            ))}
          </div>
          <button onClick={() => setEditando(true)}>Editar Perfil</button>
        </div>
      ) : (
        // Modo Edição
        <div className="perfil-edit">
          <h2>Editar Perfil</h2>
          
          <div className="form-group">
            <label>Avatar</label>
            <input
              type="text"
              value={formData.avatar}
              onChange={(e) => setFormData({...formData, avatar: e.target.value})}
              placeholder="Emoji do avatar"
              maxLength="10"
            />
          </div>
          
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              minLength="2"
            />
          </div>
          
          <div className="form-group">
            <label>Biografia</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows="4"
              placeholder="Conte um pouco sobre você..."
            />
          </div>
          
          <div className="form-group">
            <label>Idade dos Filhos</label>
            <div className="checkbox-group">
              {['0-2', '3-5', '6-12', '13+'].map(idade => (
                <label key={idade}>
                  <input
                    type="checkbox"
                    checked={formData.childrenAges.includes(idade)}
                    onChange={() => toggleIdadeFilho(idade)}
                  />
                  {idade} anos
                </label>
              ))}
            </div>
          </div>
          
          <div className="actions">
            <button onClick={salvar} disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
            <button onClick={() => setEditando(false)} disabled={salvando}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilEditavel;
```

---

### Cenário 10: Deletar Conta com Confirmação

**História**: Usuário decide sair da plataforma.

```javascript
async function deletarConta() {
  // Primeiro aviso
  const confirmar1 = confirm(
    'Tem certeza que deseja deletar sua conta?\n\n' +
    'Seus posts e comentários serão preservados, mas você não poderá mais acessar a plataforma.'
  );
  
  if (!confirmar1) return;
  
  // Segundo aviso
  const confirmar2 = confirm(
    'Esta ação não pode ser desfeita!\n\n' +
    'Clique em OK para confirmar a exclusão da conta.'
  );
  
  if (!confirmar2) return;
  
  // Solicitar senha
  const senha = prompt('Por favor, digite sua senha para confirmar:');
  
  if (!senha) {
    alert('Exclusão cancelada.');
    return;
  }
  
  // Deletar conta
  const token = localStorage.getItem('authToken');
  const response = await fetch('http://localhost:3001/api/users/account', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: senha })
  });
  
  const data = await response.json();
  
  if (data.success) {
    alert('Conta deletada com sucesso. Você será redirecionado.');
    
    // Limpar dados locais
    localStorage.removeItem('authToken');
    localStorage.clear();
    
    // Redirecionar para home
    window.location.href = '/';
  } else {
    alert('Erro ao deletar conta: ' + data.error);
  }
}
```

---

## 🎨 Exemplos de UI/UX

### Card de Usuário

```html
<div class="user-card">
  <div class="user-avatar">👩‍🍼</div>
  <div class="user-info">
    <h3 class="user-name">Maria Silva</h3>
    <p class="user-role">Mãe</p>
    <p class="user-bio">Mãe de primeira viagem aprendendo a cada dia</p>
    <div class="user-badges">
      <span class="badge">0-2 anos</span>
      <span class="badge">45 posts</span>
    </div>
  </div>
  <button class="btn-view-profile">Ver Perfil</button>
</div>
```

### Formulário de Busca

```html
<form class="search-form">
  <input 
    type="search" 
    placeholder="Buscar membros..." 
    minlength="2"
    class="search-input"
  />
  
  <select class="filter-role">
    <option value="">Todos os papéis</option>
    <option value="mae">Mãe</option>
    <option value="pai">Pai</option>
    <option value="responsavel">Responsável</option>
  </select>
  
  <select class="filter-age">
    <option value="">Todas as idades</option>
    <option value="0-2">0-2 anos</option>
    <option value="3-5">3-5 anos</option>
    <option value="6-12">6-12 anos</option>
    <option value="13+">13+ anos</option>
  </select>
  
  <button type="submit">Buscar</button>
</form>
```

---

## 💡 Dicas e Boas Práticas

### 1. Sempre Validar no Frontend

```javascript
function validarAtualizacaoPerfil(dados) {
  if (dados.name && dados.name.trim().length < 2) {
    alert('Nome deve ter pelo menos 2 caracteres');
    return false;
  }
  
  if (dados.avatar && dados.avatar.length > 10) {
    alert('Avatar deve ter no máximo 10 caracteres');
    return false;
  }
  
  return true;
}
```

### 2. Tratar Erros de Rede

```javascript
async function buscarComTratamentoDeErro(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      alert('Erro de conexão. Verifique sua internet.');
    } else {
      alert('Erro ao carregar dados: ' + error.message);
    }
    return null;
  }
}
```

### 3. Debounce em Buscas

```javascript
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const buscarUsuarios = debounce(async (termo) => {
  // Buscar após 500ms sem digitação
  const response = await fetch(`/api/users/search?q=${termo}`);
  const data = await response.json();
  // Exibir resultados
}, 500);
```

### 4. Cache de Perfil

```javascript
class PerfilCache {
  constructor() {
    this.cache = {};
    this.expiracao = 5 * 60 * 1000; // 5 minutos
  }
  
  async obter(userId) {
    const cached = this.cache[userId];
    
    if (cached && Date.now() - cached.timestamp < this.expiracao) {
      return cached.data;
    }
    
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    
    this.cache[userId] = {
      data,
      timestamp: Date.now()
    };
    
    return data;
  }
  
  limpar(userId) {
    if (userId) {
      delete this.cache[userId];
    } else {
      this.cache = {};
    }
  }
}

const perfilCache = new PerfilCache();
```

### 5. Loading States

```javascript
function ExemploComLoading() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  
  async function carregar() {
    setCarregando(true);
    setErro(null);
    
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsuarios(data.users);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }
  
  if (carregando) return <div>Carregando...</div>;
  if (erro) return <div>Erro: {erro}</div>;
  
  return (
    <div>
      {usuarios.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

---

## 🔗 Links Úteis

- [Documentação Completa](./USER-ROUTES-DOC.md)
- [Guia de Testes](./users.test.md)
- [Exemplos de Integração](./users-integration-example.js)

---

**Última atualização**: 16 de outubro de 2025
