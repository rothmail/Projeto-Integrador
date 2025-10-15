/**
 * ============================================
 * FAMÍLIA CONECTADA - SISTEMA DE AUTENTICAÇÃO
 * Backend em JavaScript Vanilla
 * ============================================
 */

// ============================================
// CONFIGURAÇÃO DE AUTENTICAÇÃO
// ============================================

const AUTH_CONFIG = {
    storageKey: 'familiaConectada_users',
    currentUserKey: 'familiaConectada_currentUser',
    minPasswordLength: 6,
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 horas em ms
};

// ============================================
// CLASSE DE AUTENTICAÇÃO
// ============================================

class AuthService {
    constructor() {
      this.initializeStorage();
    }
  
    /**
     * Inicializa o localStorage se necessário
     */
    initializeStorage() {
      if (!localStorage.getItem(AUTH_CONFIG.storageKey)) {
        localStorage.setItem(AUTH_CONFIG.storageKey, JSON.stringify([]));
      }
    }
  
    /**
     * Obtém todos os usuários do localStorage
     */
    getUsers() {
      try {
        const users = localStorage.getItem(AUTH_CONFIG.storageKey);
        return users ? JSON.parse(users) : [];
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
        return [];
      }
    }
  
    /**
     * Salva usuários no localStorage
     */
    saveUsers(users) {
      try {
        localStorage.setItem(AUTH_CONFIG.storageKey, JSON.stringify(users));
        return true;
      } catch (error) {
        console.error('Erro ao salvar usuários:', error);
        return false;
      }
    }
  
    /**
     * Valida email
     */
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    /**
     * Valida senha
     */
    isValidPassword(password) {
      return password && password.length >= AUTH_CONFIG.minPasswordLength;
    }
  
    /**
     * Verifica se email já está cadastrado
     */
    emailExists(email) {
      const users = this.getUsers();
      return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    }
  
    /**
     * Hash simples de senha (em produção, usar bcrypt ou similar)
     */
    hashPassword(password) {
      // AVISO: Isso é apenas para demonstração!
      // Em produção, NUNCA armazene senhas em texto plano ou com hash simples
      let hash = 0;
      for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return hash.toString(36);
    }
  
    /**
     * Registra novo usuário
     */
    register(userData) {
      const { name, email, password, role, childrenAges } = userData;
  
      // Validações
      if (!name || name.trim().length < 2) {
        return {
          success: false,
          message: 'Nome deve ter pelo menos 2 caracteres'
        };
      }
  
      if (!this.isValidEmail(email)) {
        return {
          success: false,
          message: 'Email inválido'
        };
      }
  
      if (this.emailExists(email)) {
        return {
          success: false,
          message: 'Email já cadastrado'
        };
      }
  
      if (!this.isValidPassword(password)) {
        return {
          success: false,
          message: `Senha deve ter pelo menos ${AUTH_CONFIG.minPasswordLength} caracteres`
        };
      }
  
      if (!role) {
        return {
          success: false,
          message: 'Selecione seu papel'
        };
      }
  
      // Cria novo usuário
      const users = this.getUsers();
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: this.hashPassword(password),
        role,
        childrenAges: childrenAges || [],
        avatar: this.generateAvatar(name),
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
  
      users.push(newUser);
      
      if (this.saveUsers(users)) {
        // Remove senha antes de retornar
        const { password: _, ...userWithoutPassword } = newUser;
        return {
          success: true,
          message: 'Cadastro realizado com sucesso!',
          user: userWithoutPassword
        };
      }
  
      return {
        success: false,
        message: 'Erro ao salvar usuário. Tente novamente.'
      };
    }
  
    /**
     * Faz login do usuário
     */
    login(email, password) {
      if (!this.isValidEmail(email)) {
        return {
          success: false,
          message: 'Email inválido'
        };
      }
  
      if (!password) {
        return {
          success: false,
          message: 'Senha é obrigatória'
        };
      }
  
      const users = this.getUsers();
      const hashedPassword = this.hashPassword(password);
      
      const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && 
             u.password === hashedPassword
      );
  
      if (!user) {
        return {
          success: false,
          message: 'Email ou senha incorretos'
        };
      }
  
      // Atualiza último login
      user.lastLogin = new Date().toISOString();
      this.saveUsers(users);
  
      // Salva usuário atual na sessão
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem(AUTH_CONFIG.currentUserKey, JSON.stringify({
        ...userWithoutPassword,
        sessionStart: Date.now()
      }));
  
      return {
        success: true,
        message: 'Login realizado com sucesso!',
        user: userWithoutPassword
      };
    }
  
    /**
     * Faz logout do usuário
     */
    logout() {
      localStorage.removeItem(AUTH_CONFIG.currentUserKey);
      return {
        success: true,
        message: 'Logout realizado com sucesso!'
      };
    }
  
    /**
     * Obtém usuário atual
     */
    getCurrentUser() {
      try {
        const currentUser = localStorage.getItem(AUTH_CONFIG.currentUserKey);
        if (!currentUser) return null;
  
        const userData = JSON.parse(currentUser);
        
        // Verifica se sessão expirou
        const sessionAge = Date.now() - userData.sessionStart;
        if (sessionAge > AUTH_CONFIG.sessionTimeout) {
          this.logout();
          return null;
        }
  
        return userData;
      } catch (error) {
        console.error('Erro ao obter usuário atual:', error);
        return null;
      }
    }
  
    /**
     * Verifica se usuário está autenticado
     */
    isAuthenticated() {
      return this.getCurrentUser() !== null;
    }
  
    /**
     * Gera avatar com iniciais
     */
    generateAvatar(name) {
      const names = name.trim().split(' ');
      const initials = names.length > 1
        ? `${names[0][0]}${names[names.length - 1][0]}`
        : names[0].substring(0, 2);
      return initials.toUpperCase();
    }
  
    /**
     * Atualiza dados do usuário
     */
    updateUser(userId, updates) {
      const users = this.getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
  
      if (userIndex === -1) {
        return {
          success: false,
          message: 'Usuário não encontrado'
        };
      }
  
      // Atualiza usuário
      users[userIndex] = {
        ...users[userIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
  
      if (this.saveUsers(users)) {
        // Atualiza sessão se for o usuário atual
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
          const { password: _, ...userWithoutPassword } = users[userIndex];
          localStorage.setItem(AUTH_CONFIG.currentUserKey, JSON.stringify({
            ...userWithoutPassword,
            sessionStart: currentUser.sessionStart
          }));
        }
  
        return {
          success: true,
          message: 'Dados atualizados com sucesso!',
          user: users[userIndex]
        };
      }
  
      return {
        success: false,
        message: 'Erro ao atualizar dados'
      };
    }
  
    /**
     * Altera senha
     */
    changePassword(userId, currentPassword, newPassword) {
      if (!this.isValidPassword(newPassword)) {
        return {
          success: false,
          message: `Nova senha deve ter pelo menos ${AUTH_CONFIG.minPasswordLength} caracteres`
        };
      }
  
      const users = this.getUsers();
      const user = users.find(u => u.id === userId);
  
      if (!user) {
        return {
          success: false,
          message: 'Usuário não encontrado'
        };
      }
  
      const hashedCurrentPassword = this.hashPassword(currentPassword);
      if (user.password !== hashedCurrentPassword) {
        return {
          success: false,
          message: 'Senha atual incorreta'
        };
      }
  
      // Atualiza senha
      user.password = this.hashPassword(newPassword);
      user.passwordChangedAt = new Date().toISOString();
  
      if (this.saveUsers(users)) {
        return {
          success: true,
          message: 'Senha alterada com sucesso!'
        };
      }
  
      return {
        success: false,
        message: 'Erro ao alterar senha'
      };
    }
  
    /**
     * Deleta conta do usuário
     */
    deleteAccount(userId, password) {
      const users = this.getUsers();
      const user = users.find(u => u.id === userId);
  
      if (!user) {
        return {
          success: false,
          message: 'Usuário não encontrado'
        };
      }
  
      const hashedPassword = this.hashPassword(password);
      if (user.password !== hashedPassword) {
        return {
          success: false,
          message: 'Senha incorreta'
        };
      }
  
      // Remove usuário
      const updatedUsers = users.filter(u => u.id !== userId);
      
      if (this.saveUsers(updatedUsers)) {
        this.logout();
        return {
          success: true,
          message: 'Conta deletada com sucesso'
        };
      }
  
      return {
        success: false,
        message: 'Erro ao deletar conta'
      };
    }
  }

// ============================================
// INSTÂNCIA GLOBAL
// ============================================

const authService = new AuthService();

// ============================================
// EXPORT (para uso em outros arquivos)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { authService, AUTH_CONFIG };
}
