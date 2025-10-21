/**
 * ============================================
 * EXEMPLOS DE INTEGRAÇÃO FRONTEND-BACKEND
 * Rotas de Usuários - caminhos
 * ============================================
 * 
 * Este arquivo contém exemplos de código JavaScript/Fetch
 * para integração das rotas de usuários no frontend.
 */

// ============================================
// CONFIGURAÇÃO BASE
// ============================================

const API_BASE_URL = 'http://localhost:3001/api';

// Obter token do localStorage
const getToken = () => localStorage.getItem('authToken');

// Headers padrão para requisições autenticadas
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
});

// ============================================
// ROTAS PÚBLICAS
// ============================================

/**
 * Exemplo 1: Listar todos os usuários
 */
async function getAllUsers(page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users?page=${page}&limit=${limit}`
    );
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Usuários:', data.users);
      console.log('Paginação:', data.pagination);
      return data;
    } else {
      console.error('Erro:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// Uso:
// getAllUsers(1, 10);

/**
 * Exemplo 2: Buscar usuários com filtros
 */
async function searchUsers(searchTerm, filters = {}) {
  try {
    const params = new URLSearchParams({
      q: searchTerm,
      ...filters
    });
    
    const response = await fetch(
      `${API_BASE_URL}/users/search?${params}`
    );
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Usuários encontrados:', data.users);
      return data.users;
    } else {
      console.error('Erro:', data.error);
      return [];
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return [];
  }
}

// Uso:
// searchUsers('maria', { role: 'mae', childrenAge: '0-2' });

/**
 * Exemplo 3: Obter usuário por ID
 */
async function getUserById(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    const data = await response.json();
    
    if (data.success) {
      console.log('Usuário:', data.user);
      console.log('Estatísticas:', data.stats);
      return data;
    } else {
      console.error('Erro:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// Uso:
// getUserById(1);

/**
 * Exemplo 4: Obter posts de um usuário
 */
async function getUserPosts(userId, page = 1, limit = 10) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/posts?page=${page}&limit=${limit}`
    );
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Posts do usuário:', data.posts);
      return data.posts;
    } else {
      console.error('Erro:', data.error);
      return [];
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return [];
  }
}

// Uso:
// getUserPosts(1, 1, 5);

/**
 * Exemplo 5: Obter atividade de um usuário
 */
async function getUserActivity(userId, limit = 10) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/activity?limit=${limit}`
    );
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Atividades:', data.activities);
      return data.activities;
    } else {
      console.error('Erro:', data.error);
      return [];
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return [];
  }
}

// Uso:
// getUserActivity(1, 5);

// ============================================
// ROTAS PROTEGIDAS (REQUER AUTENTICAÇÃO)
// ============================================

/**
 * Exemplo 6: Obter meu perfil
 */
async function getMyProfile() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile/me`, {
      headers: getAuthHeaders()
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Meu perfil:', data.user);
      return data.user;
    } else {
      console.error('Erro:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// Uso:
// getMyProfile();

/**
 * Exemplo 7: Atualizar perfil
 */
async function updateProfile(profileData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Perfil atualizado:', data.user);
      alert(data.message);
      return data.user;
    } else {
      console.error('Erro:', data.error);
      alert('Erro ao atualizar perfil: ' + data.error);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao atualizar perfil');
    return null;
  }
}

// Uso:
// updateProfile({
//   name: 'Maria Silva Santos',
//   bio: 'Mãe de 2 filhos',
//   role: 'mae',
//   childrenAges: ['0-2', '3-5']
// });

/**
 * Exemplo 8: Atualizar avatar
 */
async function updateAvatar(avatar) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/avatar`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ avatar })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Avatar atualizado:', data.avatar);
      alert(data.message);
      return data.avatar;
    } else {
      console.error('Erro:', data.error);
      alert('Erro ao atualizar avatar: ' + data.error);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao atualizar avatar');
    return null;
  }
}

// Uso:
// updateAvatar('👩');

/**
 * Exemplo 9: Alterar senha
 */
async function changePassword(currentPassword, newPassword) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Senha alterada com sucesso');
      alert(data.message);
      return true;
    } else {
      console.error('Erro:', data.error);
      alert('Erro ao alterar senha: ' + data.error);
      return false;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao alterar senha');
    return false;
  }
}

// Uso:
// changePassword('senhaAntiga123', 'novaSenha456');

/**
 * Exemplo 10: Deletar conta
 */
async function deleteAccount(password) {
  try {
    const confirmDelete = confirm(
      'Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.'
    );
    
    if (!confirmDelete) {
      return false;
    }
    
    const response = await fetch(`${API_BASE_URL}/users/account`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Conta deletada');
      alert(data.message);
      // Limpar token e redirecionar
      localStorage.removeItem('authToken');
      window.location.href = '/';
      return true;
    } else {
      console.error('Erro:', data.error);
      alert('Erro ao deletar conta: ' + data.error);
      return false;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao deletar conta');
    return false;
  }
}

// Uso:
// deleteAccount('minhaSenha123');

// ============================================
// EXEMPLOS DE COMPONENTES REACT
// ============================================

/**
 * Exemplo 11: Componente de Lista de Usuários (React)
 */
/*
import React, { useState, useEffect } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/users?page=${page}&limit=20`
      );
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Comunidade</h2>
      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="avatar">{user.avatar}</div>
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
            <p>Papel: {user.role}</p>
            <p>Filhos: {user.children_ages.join(', ')}</p>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button 
          onClick={() => setPage(p => p - 1)} 
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>Página {page} de {pagination?.pages}</span>
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={page === pagination?.pages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
*/

/**
 * Exemplo 12: Componente de Perfil do Usuário (React)
 */
/*
import React, { useState, useEffect } from 'react';

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    childrenAges: []
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/users/profile/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    if (data.success) {
      setProfile(data.user);
      setFormData({
        name: data.user.name,
        bio: data.user.bio || '',
        childrenAges: data.user.children_ages || []
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    if (data.success) {
      setProfile(data.user);
      setEditing(false);
      alert('Perfil atualizado com sucesso!');
    }
  };

  if (!profile) return <div>Carregando...</div>;

  return (
    <div className="profile-page">
      <h2>Meu Perfil</h2>
      
      {!editing ? (
        <div className="profile-view">
          <div className="avatar">{profile.avatar}</div>
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
          <p>{profile.bio}</p>
          <p>Papel: {profile.role}</p>
          <p>Idades dos filhos: {profile.children_ages.join(', ')}</p>
          <button onClick={() => setEditing(true)}>Editar Perfil</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-edit">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Nome"
          />
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            placeholder="Biografia"
          />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}
*/

/**
 * Exemplo 13: Componente de Busca de Usuários (React)
 */
/*
import React, { useState } from 'react';

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: '',
    childrenAge: ''
  });
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchTerm.length < 2) {
      alert('Digite pelo menos 2 caracteres');
      return;
    }
    
    setSearching(true);
    try {
      const params = new URLSearchParams({
        q: searchTerm,
        ...(filters.role && { role: filters.role }),
        ...(filters.childrenAge && { childrenAge: filters.childrenAge })
      });
      
      const response = await fetch(
        `${API_BASE_URL}/users/search?${params}`
      );
      const data = await response.json();
      
      if (data.success) {
        setResults(data.users);
      }
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="user-search">
      <h2>Buscar Membros da Comunidade</h2>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome..."
          minLength="2"
        />
        
        <select 
          value={filters.role}
          onChange={(e) => setFilters({...filters, role: e.target.value})}
        >
          <option value="">Todos os papéis</option>
          <option value="mae">Mãe</option>
          <option value="pai">Pai</option>
          <option value="responsavel">Responsável</option>
          <option value="cuidador">Cuidador</option>
          <option value="outro">Outro</option>
        </select>
        
        <select 
          value={filters.childrenAge}
          onChange={(e) => setFilters({...filters, childrenAge: e.target.value})}
        >
          <option value="">Todas as idades</option>
          <option value="0-2">0-2 anos</option>
          <option value="3-5">3-5 anos</option>
          <option value="6-12">6-12 anos</option>
          <option value="13+">13+ anos</option>
        </select>
        
        <button type="submit" disabled={searching}>
          {searching ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      
      <div className="search-results">
        <p>{results.length} usuários encontrados</p>
        {results.map(user => (
          <div key={user.id} className="user-result">
            <span className="avatar">{user.avatar}</span>
            <div>
              <h4>{user.name}</h4>
              <p>{user.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
*/

// ============================================
// EXPORTAR FUNÇÕES (para uso em módulos)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getAllUsers,
    searchUsers,
    getUserById,
    getUserPosts,
    getUserActivity,
    getMyProfile,
    updateProfile,
    updateAvatar,
    changePassword,
    deleteAccount
  };
}
