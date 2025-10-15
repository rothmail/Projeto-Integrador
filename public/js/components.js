// Componentes da aplicação em Vanilla JS

// Header Component
function renderHeader() {
    const unreadCount = AppState.notifications.filter(n => !n.read).length;

    return `
      <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b" style="border-color: rgba(139, 69, 19, 0.2);">
        <div class="container mx-auto px-4 py-3">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center gap-3 cursor-pointer" onclick="navigateTo('home')">
              <div class="w-10 h-10 bg-brown rounded-full flex items-center justify-center" style="background: var(--brown);">
                <i data-lucide="heart" class="w-6 h-6 text-white"></i>
              </div>
              <div>
                <h1 class="text-lg font-semibold" style="color: var(--brown);">${APP_CONFIG.name}</h1>
                <p class="text-sm text-muted-foreground">${APP_CONFIG.description}</p>
              </div>
            </div>
  
            <!-- User Actions -->
            <div class="flex items-center gap-3">
              <div class="relative">
                <button 
                  onclick="toggleNotifications()" 
                  class="btn btn-icon btn-ghost relative"
                  style="color: var(--brown);"
                >
                  <i data-lucide="bell" class="w-5 h-5"></i>
                  ${unreadCount > 0 ? `<span class="notification-badge">${unreadCount}</span>` : ''}
                </button>
                <div id="notifications-dropdown" class="hidden dropdown-menu right-0" style="width: 320px; max-height: 500px; overflow-y: auto;">
                  <div class="flex items-center justify-between p-4 border-b" style="border-color: rgba(139, 69, 19, 0.2);">
                    <h3 class="font-medium">Notificações</h3>
                    ${unreadCount > 0 ? `
                      <button onclick="markAllNotificationsAsRead(); render();" class="text-xs" style="color: var(--brown);">
                        Marcar todas como lidas
                      </button>
                    ` : ''}
                  </div>
                  <div>
                    ${AppState.notifications.length === 0 ? `
                      <div class="p-8 text-center text-muted-foreground">
                        <i data-lucide="bell" class="w-12 h-12 mx-auto mb-2 opacity-20"></i>
                        <p>Nenhuma notificação</p>
                      </div>
                    ` : `
                      ${AppState.notifications.map(notif => `
                        <div 
                          class="p-4 border-b hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-brown/5' : ''}"
                          onclick="markNotificationAsRead('${notif.id}'); render();"
                        >
                          <div class="flex gap-3">
                            ${notif.author ? createAvatar(notif.author.avatar, notif.author.name, 'sm') : ''}
                            <div class="flex-1">
                              <p class="text-sm">
                                ${notif.author ? `<span class="font-medium">${escapeHtml(notif.author.name)}</span> ` : ''}
                                ${escapeHtml(notif.content)}
                              </p>
                              <p class="text-xs text-muted-foreground mt-1">${escapeHtml(notif.timeAgo)}</p>
                            </div>
                            ${!notif.read ? '<div class="w-2 h-2 bg-brown rounded-full mt-2"></div>' : ''}
                          </div>
                        </div>
                      `).join('')}
                    `}
                  </div>
                </div>
              </div>
              
              <div class="relative">
                <button onclick="toggleUserMenu()" class="btn btn-icon btn-ghost">
                  ${createAvatar(AppState.currentUser.avatar, AppState.currentUser.name, 'sm')}
                </button>
                <div id="user-menu-dropdown" class="hidden dropdown-menu right-0" style="width: 224px;">
                  <div class="px-3 py-2 border-b" style="border-color: rgba(139, 69, 19, 0.2);">
                    <p class="font-medium">${escapeHtml(AppState.currentUser.name)}</p>
                    <p class="text-xs text-muted-foreground">${escapeHtml(AppState.currentUser.role)}</p>
                  </div>
                  <button 
                    onclick="navigateTo('settings'); closeDropdowns();" 
                    class="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <i data-lucide="user" class="w-4 h-4"></i>
                    Configurações
                  </button>
                  <button 
                    onclick="handleLogout(); closeDropdowns();" 
                    class="w-full text-left px-3 py-2 hover:bg-red-50 flex items-center gap-2 text-red-500 border-t"
                    style="border-color: rgba(139, 69, 19, 0.2);"
                  >
                    <i data-lucide="log-out" class="w-4 h-4"></i>
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
}

// Sidebar Component
function renderSidebar(currentPage, currentForum) {
    const isForumActive = (forumType) => currentPage === 'forum' && currentForum === forumType;

    return `
      <aside class="w-64 min-h-screen p-4" style="background: var(--brown); color: white;">
        <nav class="space-y-2">
          <!-- Main Navigation -->
          <div class="space-y-1">
            <button 
              onclick="navigateTo('home')"
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 ${currentPage === 'home' ? 'bg-white/20' : ''}"
            >
              <i data-lucide="home" class="w-4 h-4"></i>
              Início
            </button>
            <button 
              onclick="navigateTo('community')"
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 ${currentPage === 'community' ? 'bg-white/20' : ''}"
            >
              <i data-lucide="users" class="w-4 h-4"></i>
              Minha Comunidade
            </button>
            <button 
              onclick="navigateTo('conversations')"
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 ${currentPage === 'conversations' ? 'bg-white/20' : ''}"
            >
              <i data-lucide="message-square" class="w-4 h-4"></i>
              Conversas
            </button>
          </div>
  
          <div class="separator"></div>
  
          <!-- Forums & Topics -->
          <div class="space-y-1">
            <h3 class="text-sm font-medium text-white/70 px-3 py-2">Fóruns Temáticos</h3>
            <button 
              onclick="navigateTo('forum', 'primeira-infancia')"
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 text-sm ${isForumActive('primeira-infancia') ? 'bg-white/20' : ''}"
            >
              <i data-lucide="baby-carriage" class="w-4 h-4"></i>
              Primeira Infância (0-3 anos)
            </button>
            <button 
              onclick="navigateTo('forum', 'pre-escola')"
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 text-sm ${isForumActive('pre-escola') ? 'bg-white/20' : ''}"
            >
              <i data-lucide="school" class="w-4 h-4"></i>
              Pré-escola (4-6 anos)
            </button>
            <button 
              onclick="navigateTo('forum', 'adolescencia')"
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 text-sm ${isForumActive('adolescencia') ? 'bg-white/20' : ''}"
            >
              <i data-lucide="heart" class="w-4 h-4"></i>
              Adolescência
            </button>
            <button 
              onclick="navigateTo('forum', 'necessidades-especiais')"
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 text-sm ${isForumActive('necessidades-especiais') ? 'bg-white/20' : ''}"
            >
              <i data-lucide="heart-handshake" class="w-4 h-4"></i>
              Necessidades Especiais
            </button>
          </div>
  
          <div class="separator"></div>
  
          <!-- Resources -->
          <div class="space-y-1">
            <h3 class="text-sm font-medium text-white/70 px-3 py-2">Recursos</h3>
            <button 
              onclick="navigateTo('resources')"
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 text-sm ${currentPage === 'resources' ? 'bg-white/20' : ''}"
            >
              <i data-lucide="book-open" class="w-4 h-4"></i>
              Artigos e Guias
            </button>
            <button 
              onclick="navigateTo('events')"
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 text-sm ${currentPage === 'events' ? 'bg-white/20' : ''}"
            >
              <i data-lucide="calendar" class="w-4 h-4"></i>
              Eventos
            </button>
            <button 
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 text-sm"
            >
              <i data-lucide="help-circle" class="w-4 h-4"></i>
              Perguntas Frequentes
            </button>
          </div>
  
          <div class="separator"></div>
  
          <!-- Settings -->
          <div class="space-y-1">
            <button 
              onclick="navigateTo('settings')"
              class="w-full text-left px-3 py-2 rounded flex items-center gap-3 text-white hover:bg-white/10 ${currentPage === 'settings' ? 'bg-white/20' : ''}"
            >
              <i data-lucide="settings" class="w-4 h-4"></i>
              Configurações
            </button>
          </div>
        </nav>
      </aside>
    `;
}

// Create Post Component
function renderCreatePost(defaultTag = 'Geral') {
    return `
      <div class="bg-white shadow-sm rounded-lg p-4 mb-6">
        <div class="flex gap-3">
          ${createAvatar(AppState.currentUser.avatar, AppState.currentUser.name, 'md')}
          <div class="flex-1">
            <textarea 
              id="post-content"
              placeholder="Compartilhe suas experiências, dúvidas ou momentos especiais com a comunidade..."
              class="textarea"
              style="background: var(--muted); border: none; border-radius: 0.5rem; padding: 0.75rem; min-height: 80px;"
            ></textarea>
            
            <div id="image-input-container" class="hidden mt-3 p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-2">
                <input
                  type="text"
                  id="image-url-input"
                  placeholder="Cole a URL da imagem..."
                  class="input flex-1"
                />
                <button onclick="hideImageInput()" class="btn btn-sm btn-ghost">
                  <i data-lucide="x" class="w-4 h-4"></i>
                </button>
              </div>
              <div id="image-preview" class="mt-2 hidden">
                <img id="preview-img" alt="Preview" class="max-h-40 rounded" style="max-height: 10rem;"/>
              </div>
            </div>
  
            <div class="flex items-center justify-between mt-3 gap-3 flex-wrap">
              <div class="flex items-center gap-2">
                <button 
                  onclick="toggleImageInput()"
                  class="btn btn-sm btn-ghost"
                  style="color: var(--dark-gray);"
                >
                  <i data-lucide="image" class="w-4 h-4 mr-1"></i>
                  Foto
                </button>
                <select id="post-tag" class="select" style="width: 180px; height: 32px;">
                  ${APP_CONFIG.tags.map(tag =>
        `<option value="${tag}" ${tag === defaultTag ? 'selected' : ''}>${tag}</option>`
    ).join('')}
                </select>
              </div>
              <button 
                onclick="handleCreatePost()"
                class="btn btn-primary"
                style="background: var(--brown); color: white;"
              >
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
}

// Post Card Component
function renderPostCard(post) {
    const isLiked = post.likedBy.includes(AppState.currentUser.name);

    return `
      <div class="bg-white shadow-sm rounded-lg mb-4 hover:shadow-md transition-shadow">
        <div class="p-4 pb-3">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              ${createAvatar(post.author.avatar, post.author.name, 'md')}
              <div>
                <h4 class="font-medium">${escapeHtml(post.author.name)}</h4>
                <p class="text-sm text-muted-foreground">${escapeHtml(post.author.role)} • ${escapeHtml(post.timeAgo)}</p>
              </div>
            </div>
            <button class="btn btn-icon btn-ghost">
              <i data-lucide="more-horizontal" class="w-4 h-4"></i>
            </button>
          </div>
          ${post.tag ? `
            <div class="mt-2">
              ${createBadge(post.tag, 'primary')}
            </div>
          ` : ''}
        </div>
  
        <div class="px-4 pb-4">
          <p class="mb-4 leading-relaxed">${escapeHtml(post.content)}</p>
          
          ${post.imageUrl ? `
            <div class="mb-4 rounded-lg overflow-hidden">
              <img src="${post.imageUrl}" alt="Post image" class="w-full h-48 object-cover"/>
            </div>
          ` : ''}
  
          <div class="flex items-center justify-between pt-3 border-t" style="border-color: rgba(139, 69, 19, 0.2);">
            <div class="flex items-center gap-4">
              <button 
                onclick="handleLike('${post.id}')"
                class="btn btn-sm btn-ghost ${isLiked ? 'text-red-500' : ''}"
              >
                <i data-lucide="heart" class="w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}"></i>
                ${post.likes}
              </button>
              <button 
                onclick="toggleComments('${post.id}')"
                class="btn btn-sm btn-ghost"
              >
                <i data-lucide="message-circle" class="w-4 h-4 mr-1"></i>
                ${post.comments.length}
              </button>
              <button 
                onclick="copyToClipboard('${escapeHtml(post.author.name)}: ${escapeHtml(post.content)}')"
                class="btn btn-sm btn-ghost"
              >
                <i data-lucide="share-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Comments Section -->
        <div id="comments-${post.id}" class="hidden border-t px-4 py-3" style="border-color: rgba(139, 69, 19, 0.2);">
          <div class="space-y-3 mb-3">
            ${post.comments.map(comment => `
              <div class="flex gap-2">
                ${createAvatar(comment.author.avatar, comment.author.name, 'sm')}
                <div class="flex-1 bg-gray-50 rounded-lg p-3">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium text-sm">${escapeHtml(comment.author.name)}</span>
                    <span class="text-xs text-muted-foreground">${escapeHtml(comment.timeAgo)}</span>
                  </div>
                  <p class="text-sm">${escapeHtml(comment.content)}</p>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="flex gap-2">
            ${createAvatar(AppState.currentUser.avatar, AppState.currentUser.name, 'sm')}
            <div class="flex-1 flex gap-2">
              <input
                type="text"
                id="comment-input-${post.id}"
                placeholder="Escreva um comentário..."
                class="input flex-1"
                onkeypress="if(event.key === 'Enter') handleAddComment('${post.id}')"
              />
              <button 
                onclick="handleAddComment('${post.id}')"
                class="btn btn-primary"
                style="background: var(--brown);"
              >
                <i data-lucide="send" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
}

// Community Stats Widget
function renderCommunityStats() {
    return `
      <div class="bg-white rounded-lg p-4 shadow-sm border" style="border-color: rgba(139, 69, 19, 0.2);">
        <h3 class="font-medium mb-3" style="color: var(--brown);">📊 Estatísticas da Comunidade</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Membros Ativos</span>
            <span class="font-semibold">5.2k</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Posts Hoje</span>
            <span class="font-semibold">143</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Eventos Esta Semana</span>
            <span class="font-semibold">8</span>
          </div>
        </div>
      </div>
    `;
}

// Resources Widget
function renderResourcesWidget() {
    return `
      <div class="bg-white rounded-lg p-4 shadow-sm border" style="border-color: rgba(139, 69, 19, 0.2);">
        <h3 class="font-medium mb-3" style="color: var(--brown);">📚 Recursos em Destaque</h3>
        <div class="space-y-2">
          <a href="#" class="block text-sm hover:underline" style="color: var(--brown);">
            Guia: Primeiros Socorros
          </a>
          <a href="#" class="block text-sm hover:underline" style="color: var(--brown);">
            E-book: Alimentação Saudável
          </a>
          <a href="#" class="block text-sm hover:underline" style="color: var(--brown);">
            Vídeo: Como lidar com birras
          </a>
        </div>
        <button 
          onclick="navigateTo('resources')"
          class="w-full mt-3 btn btn-sm"
          style="background: var(--brown); color: white;"
        >
          Ver Todos
        </button>
      </div>
    `;
}

// Inspirational Quote Widget
function renderQuoteWidget() {
    const quote = randomItem(INSPIRATIONAL_QUOTES);
    return `
      <div class="bg-brown/5 border rounded-lg p-4" style="border-color: rgba(139, 69, 19, 0.2);">
        <blockquote class="text-sm italic text-center" style="color: rgba(139, 69, 19, 0.8);">
          "${quote.text}"
        </blockquote>
        <p class="text-xs text-center mt-2" style="color: rgba(139, 69, 19, 0.6);">- ${quote.author}</p>
      </div>
    `;
}

// Mental Health Resources Widget
function renderMentalHealthWidget() {
    return `
      <div class="bg-white rounded-lg p-4 shadow-sm border" style="border-color: rgba(139, 69, 19, 0.2);">
        <h3 class="font-medium mb-3" style="color: var(--brown);">🧠 Saúde Mental</h3>
        <div class="space-y-2 text-sm">
          <p class="text-muted-foreground">Recursos de apoio em crise:</p>
          <div class="space-y-1">
            ${MENTAL_HEALTH_RESOURCES.emergency.map(resource => `
              <p><strong>${resource.name}:</strong> ${resource.number}</p>
            `).join('')}
          </div>
        </div>
      </div>
    `;
};