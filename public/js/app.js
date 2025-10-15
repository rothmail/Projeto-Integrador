/**
 * ============================================
 * FAMÍLIA CONECTADA - APLICAÇÃO PRINCIPAL
 * JavaScript Vanilla com Autenticação
 * ============================================
 */

// ============================================
// ESTADO DE AUTENTICAÇÃO
// ============================================

let isAuthenticated = false;
let currentUser = null;

// ============================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================

function initApp() {
    // Verifica autenticação
    checkAuthentication();

    if (isAuthenticated) {
        // Mostra aplicação
        showApp();
    } else {
        // Mostra tela de autenticação
        showAuthScreen();
    }
}

function checkAuthentication() {
    currentUser = authService.getCurrentUser();
    isAuthenticated = currentUser !== null;

    if (isAuthenticated) {
        // Atualiza estado com usuário
        AppState.currentUser = currentUser;
    }
}

function showAuthScreen() {
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('loading-screen').style.display = 'none';

    // Inicializa event listeners de autenticação
    initAuthListeners();
}

function showApp() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    document.getElementById('loading-screen').style.display = 'none';

    // Renderiza aplicação
    render();
}

// ============================================
// AUTENTICAÇÃO - EVENT LISTENERS
// ============================================

function initAuthListeners() {
    // Toggle entre login e cadastro
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', () => toggleAuthForm('register'));
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', () => toggleAuthForm('login'));
    }

    // Password toggles
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const inputId = this.getAttribute('data-toggle');
            const input = document.getElementById(inputId);

            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<svg class="eye-off-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
            } else {
                input.type = 'password';
                this.innerHTML = '<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
            }
        });
    });

    // Login form
    const loginForm = document.getElementById('login-form-element');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.getElementById('register-form-element');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function toggleAuthForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginSwitch = document.getElementById('login-switch');
    const registerSwitch = document.getElementById('register-switch');
    const authAlert = document.getElementById('auth-alert');

    // Limpa alertas
    authAlert.innerHTML = '';

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

function showAuthAlert(message, type = 'error') {
    const authAlert = document.getElementById('auth-alert');
    const iconSvg = type === 'success'
        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

    authAlert.innerHTML = `
    <div class="auth-alert auth-alert-${type}">
      <div class="auth-alert-icon">${iconSvg}</div>
      <div>${message}</div>
    </div>
  `;

    // Auto remove após 5 segundos
    setTimeout(() => {
        authAlert.innerHTML = '';
    }, 5000);
}

function setButtonLoading(buttonId, loading) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    if (loading) {
        button.disabled = true;
        button.innerHTML = '<div class="spinner"></div> Processando...';
    } else {
        button.disabled = false;
        button.innerHTML = buttonId === 'login-submit' ? 'Entrar' : 'Criar conta';
    }
}

// ============================================
// HANDLERS DE AUTENTICAÇÃO
// ============================================

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    // Limpa erros
    clearFormErrors('login');

    // Validações básicas
    if (!email) {
        showFieldError('login-email', 'Email é obrigatório');
        return;
    }

    if (!password) {
        showFieldError('login-password', 'Senha é obrigatória');
        return;
    }

    // Mostra loading
    setButtonLoading('login-submit', true);

    // Simula delay de rede
    setTimeout(() => {
        const result = authService.login(email, password);

        setButtonLoading('login-submit', false);

        if (result.success) {
            showAuthAlert('Login realizado com sucesso! Redirecionando...', 'success');
            currentUser = result.user;
            isAuthenticated = true;

            // Redireciona após 1 segundo
            setTimeout(() => {
                showApp();
            }, 1000);
        } else {
            showAuthAlert(result.message, 'error');
        }
    }, 500);
}

function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const role = document.getElementById('register-role').value;

    // Coleta idades dos filhos
    const childrenAges = [];
    const ageCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
    ageCheckboxes.forEach(checkbox => {
        childrenAges.push(checkbox.value);
    });

    // Limpa erros
    clearFormErrors('register');

    // Validações
    let hasError = false;

    if (!name || name.length < 2) {
        showFieldError('register-name', 'Nome deve ter pelo menos 2 caracteres');
        hasError = true;
    }

    if (!email) {
        showFieldError('register-email', 'Email é obrigatório');
        hasError = true;
    }

    if (!password || password.length < 6) {
        showFieldError('register-password', 'Senha deve ter pelo menos 6 caracteres');
        hasError = true;
    }

    if (password !== confirmPassword) {
        showFieldError('register-confirm-password', 'As senhas não coincidem');
        hasError = true;
    }

    if (!role) {
        showFieldError('register-role', 'Selecione seu papel');
        hasError = true;
    }

    if (hasError) return;

    // Mostra loading
    setButtonLoading('register-submit', true);

    // Simula delay de rede
    setTimeout(() => {
        const result = authService.register({
            name,
            email,
            password,
            role,
            childrenAges
        });

        setButtonLoading('register-submit', false);

        if (result.success) {
            showAuthAlert('Cadastro realizado! Fazendo login...', 'success');
            currentUser = result.user;
            isAuthenticated = true;

            // Limpa formulário
            document.getElementById('register-form-element').reset();

            // Redireciona após 1 segundo
            setTimeout(() => {
                showApp();
            }, 1000);
        } else {
            showAuthAlert(result.message, 'error');
        }
    }, 500);
}

function showFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);

    if (input) {
        input.classList.add('error');
    }

    if (error) {
        error.textContent = message;
        error.classList.add('show');
    }
}

function clearFormErrors(formType) {
    const form = document.getElementById(`${formType}-form`);
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
        input.classList.remove('error');
    });

    const errors = form.querySelectorAll('.form-error');
    errors.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
}

// ============================================
// LOGOUT
// ============================================

function handleLogout() {
    const result = authService.logout();

    if (result.success) {
        isAuthenticated = false;
        currentUser = null;
        AppState.currentUser = null;

        showToast('Logout realizado com sucesso!', 'success');

        // Volta para tela de login
        setTimeout(() => {
            showAuthScreen();
        }, 500);
    }
}

// ============================================
// FUNÇÕES DE NAVEGAÇÃO
// ============================================

function navigateTo(page, forumType) {
    setState({
        currentPage: page,
        currentForum: forumType || AppState.currentForum
    });
    render();
}

function selectConversation(conversationId) {
    const conversation = AppState.conversations.find(c => c.id === conversationId);
    if (conversation) {
        conversation.unread = 0;
    }
    setState({ currentConversation: conversationId });
    render();

    // Auto scroll to bottom
    setTimeout(() => {
        const chatContainer = document.querySelector('.overflow-y-auto');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, 100);
}

// ============================================
// EVENT HANDLERS
// ============================================

function handleCreatePost() {
    const contentEl = document.getElementById('post-content');
    const tagEl = document.getElementById('post-tag');
    const imageUrlEl = document.getElementById('image-url-input');

    const content = contentEl.value.trim();
    const tag = tagEl.value;
    const imageUrl = imageUrlEl ? imageUrlEl.value.trim() : '';

    if (!content) {
        showToast('Por favor, escreva algo antes de compartilhar!', 'error');
        return;
    }

    addPost(content, imageUrl || null, tag);
    contentEl.value = '';
    if (imageUrlEl) imageUrlEl.value = '';
    hideImageInput();
    showToast('Post compartilhado com sucesso!', 'success');
    render();
}

function handleLike(postId) {
    toggleLike(postId);
    render();
}

function toggleComments(postId) {
    const commentsEl = document.getElementById(`comments-${postId}`);
    if (commentsEl) {
        commentsEl.classList.toggle('hidden');
        initIcons();
    }
}

function handleAddComment(postId) {
    const inputEl = document.getElementById(`comment-input-${postId}`);
    const content = inputEl.value.trim();

    if (!content) {
        showToast('Digite um comentário antes de enviar!', 'error');
        return;
    }

    addComment(postId, content);
    inputEl.value = '';
    showToast('Comentário adicionado!', 'success');
    render();
}

function handleSendMessage() {
    const inputEl = document.getElementById('message-input');
    const content = inputEl.value.trim();

    if (!content) {
        showToast('Digite uma mensagem antes de enviar!', 'error');
        return;
    }

    if (AppState.currentConversation) {
        sendMessage(AppState.currentConversation, content);
        inputEl.value = '';
        render();

        // Auto scroll to bottom
        setTimeout(() => {
            const chatContainer = document.querySelector('.overflow-y-auto');
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }, 100);
    }
}

function handleRSVPEvent(eventId) {
    toggleRSVP(eventId);
    showToast('Presença confirmada!', 'success');
    render();
}

function handleBookmarkResource(resourceId) {
    toggleBookmark(resourceId);
    showToast('Recurso salvo!', 'success');
    render();
}

// ============================================
// IMAGE INPUT
// ============================================

let imageInputVisible = false;

function toggleImageInput() {
    imageInputVisible = !imageInputVisible;
    const imageInputContainer = document.getElementById('image-input-container');

    if (imageInputContainer) {
        if (imageInputVisible) {
            imageInputContainer.classList.remove('hidden');
        } else {
            imageInputContainer.classList.add('hidden');
        }
    }
}

function hideImageInput() {
    imageInputVisible = false;
    const imageInputContainer = document.getElementById('image-input-container');
    if (imageInputContainer) {
        imageInputContainer.classList.add('hidden');
    }
}

// ============================================
// RENDERIZAÇÃO PRINCIPAL
// ============================================

function render() {
    // Atualiza header
    const headerEl = document.getElementById('app-header');
    if (headerEl) {
        headerEl.innerHTML = renderHeader();
    }

    // Atualiza sidebar
    const sidebarEl = document.getElementById('app-sidebar');
    if (sidebarEl) {
        sidebarEl.innerHTML = renderSidebar();
    }

    // Atualiza conteúdo principal
    const mainEl = document.getElementById('app-main');
    if (mainEl) {
        mainEl.innerHTML = renderMainContent();
    }

    // Inicializa ícones Lucide
    initIcons();
}

function renderMainContent() {
    switch (AppState.currentPage) {
        case 'conversations':
            return renderConversationsPage();
        case 'community':
            return renderCommunityPage();
        case 'resources':
            return renderResourcesPage();
        case 'events':
            return renderEventsPage();
        case 'settings':
            return renderSettingsPage();
        case 'forum':
            return renderForumPage();
        default:
            return renderHomePage();
    }
}

function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

// Aguarda DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});