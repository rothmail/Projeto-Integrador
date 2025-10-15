// Páginas da aplicação

// Home Page
function renderHomePage() {
    return `
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Feed -->
          <div class="lg:col-span-2 space-y-6">
            ${renderCreatePost()}
            
            <div class="space-y-4">
              ${AppState.posts.map(post => renderPostCard(post)).join('')}
            </div>
          </div>
          
          <!-- Sidebar Widgets -->
          <div class="space-y-6">
            ${renderCommunityStats()}
            ${renderResourcesWidget()}
            ${renderQuoteWidget()}
            ${renderMentalHealthWidget()}
          </div>
        </div>
      </div>
    `;
}

// Conversations Page
function renderConversationsPage() {
    const selectedConv = AppState.conversations.find(c => c.id === AppState.currentConversation);

    return `
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6" style="color: var(--brown);">💬 Conversas</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
          <!-- Conversations List -->
          <div class="bg-white rounded-lg shadow-sm border overflow-y-auto" style="border-color: rgba(139, 69, 19, 0.2);">
            <div class="p-4 border-b sticky top-0 bg-white" style="border-color: rgba(139, 69, 19, 0.2);">
              <input 
                type="text" 
                placeholder="Buscar conversas..." 
                class="input"
              />
            </div>
            <div class="divide-y" style="border-color: rgba(139, 69, 19, 0.2);">
              ${AppState.conversations.map(conv => `
                <div 
                  onclick="selectConversation('${conv.id}')"
                  class="p-4 cursor-pointer hover:bg-gray-50 ${AppState.currentConversation === conv.id ? 'bg-brown/5' : ''}"
                >
                  <div class="flex items-start gap-3">
                    <div class="relative">
                      ${createAvatar(conv.participant.avatar, conv.participant.name, 'md')}
                      <div class="absolute bottom-0 right-0 ${conv.participant.status === 'online' ? 'status-online' : 'status-offline'}"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between mb-1">
                        <h4 class="font-medium truncate">${escapeHtml(conv.participant.name)}</h4>
                        <span class="text-xs text-muted-foreground">${escapeHtml(conv.timeAgo)}</span>
                      </div>
                      <p class="text-sm text-muted-foreground truncate">${escapeHtml(conv.lastMessage)}</p>
                    </div>
                    ${conv.unread > 0 ? `<span class="badge badge-primary">${conv.unread}</span>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
  
          <!-- Chat Window -->
          <div class="md:col-span-2 bg-white rounded-lg shadow-sm border flex flex-col" style="border-color: rgba(139, 69, 19, 0.2);">
            ${selectedConv ? `
              <!-- Chat Header -->
              <div class="p-4 border-b flex items-center gap-3" style="border-color: rgba(139, 69, 19, 0.2);">
                <div class="relative">
                  ${createAvatar(selectedConv.participant.avatar, selectedConv.participant.name, 'md')}
                  <div class="absolute bottom-0 right-0 ${selectedConv.participant.status === 'online' ? 'status-online' : 'status-offline'}"></div>
                </div>
                <div>
                  <h3 class="font-medium">${escapeHtml(selectedConv.participant.name)}</h3>
                  <p class="text-xs text-muted-foreground">${selectedConv.participant.status === 'online' ? 'Online' : 'Offline'}</p>
                </div>
              </div>
  
              <!-- Messages -->
              <div class="flex-1 overflow-y-auto p-4 space-y-3">
                ${selectedConv.messages.map(msg => `
                  <div class="flex ${msg.isOwn ? 'justify-end' : 'justify-start'}">
                    <div class="flex gap-2 max-w-[70%] ${msg.isOwn ? 'flex-row-reverse' : ''}">
                      ${!msg.isOwn ? createAvatar(selectedConv.participant.avatar, selectedConv.participant.name, 'sm') : ''}
                      <div class="${msg.isOwn ? 'bg-brown text-white' : 'bg-gray-100'} rounded-lg p-3">
                        <p class="text-sm">${escapeHtml(msg.content)}</p>
                        <p class="text-xs ${msg.isOwn ? 'text-white/70' : 'text-muted-foreground'} mt-1">${escapeHtml(msg.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
  
              <!-- Message Input -->
              <div class="p-4 border-t" style="border-color: rgba(139, 69, 19, 0.2);">
                <div class="flex gap-2">
                  <input
                    type="text"
                    id="message-input"
                    placeholder="Digite sua mensagem..."
                    class="input flex-1"
                    onkeypress="if(event.key === 'Enter') handleSendMessage()"
                  />
                  <button 
                    onclick="handleSendMessage()"
                    class="btn btn-primary"
                    style="background: var(--brown);"
                  >
                    <i data-lucide="send" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            ` : `
              <div class="flex-1 flex items-center justify-center text-muted-foreground">
                <div class="text-center">
                  <i data-lucide="message-circle" class="w-16 h-16 mx-auto mb-4 opacity-20"></i>
                  <p>Selecione uma conversa para começar</p>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
}

// Community Page
function renderCommunityPage() {
    return `
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold" style="color: var(--brown);">👥 Minha Comunidade</h2>
          <button class="btn btn-primary" style="background: var(--brown);">
            <i data-lucide="plus" class="w-4 h-4 mr-2"></i>
            Nova Comunidade
          </button>
        </div>
  
        <!-- Communities Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          ${AppState.communities.map(community => `
            <div class="bg-white rounded-lg shadow-sm border overflow-hidden card-hover" style="border-color: rgba(139, 69, 19, 0.2);">
              <img src="${community.imageUrl}" alt="${escapeHtml(community.name)}" class="w-full h-32 object-cover"/>
              <div class="p-4">
                <h3 class="font-medium mb-2">${escapeHtml(community.name)}</h3>
                <p class="text-sm text-muted-foreground mb-3 line-clamp-2">${escapeHtml(community.description)}</p>
                <div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span class="flex items-center gap-1">
                    <i data-lucide="users" class="w-4 h-4"></i>
                    ${formatNumber(community.members)}
                  </span>
                  <span class="flex items-center gap-1">
                    <i data-lucide="map-pin" class="w-4 h-4"></i>
                    ${escapeHtml(community.location)}
                  </span>
                </div>
                ${community.lastActivity ? `
                  <p class="text-xs text-muted-foreground mb-3">Última atividade: ${escapeHtml(community.lastActivity)}</p>
                ` : ''}
                <button 
                  onclick="toggleCommunityJoin('${community.id}'); render();"
                  class="w-full btn ${community.isJoined ? 'btn-secondary' : 'btn-primary'}"
                  style="${!community.isJoined ? 'background: var(--brown); color: white;' : ''}"
                >
                  ${community.isJoined ? 'Sair da Comunidade' : 'Participar'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
  
        <!-- Community Members -->
        <div class="bg-white rounded-lg shadow-sm border p-6" style="border-color: rgba(139, 69, 19, 0.2);">
          <h3 class="font-medium mb-4" style="color: var(--brown);">🌟 Membros Destaque</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            ${AppState.communityMembers.map(member => `
              <div class="text-center">
                ${createAvatar(member.avatar, member.name, 'xl')}
                <h4 class="font-medium mt-2">${escapeHtml(member.name)}</h4>
                <p class="text-xs text-muted-foreground">${escapeHtml(member.role)}</p>
                <div class="flex flex-wrap gap-1 justify-center mt-2">
                  ${member.badges.map(badge => createBadge(badge, 'primary')).join('')}
                </div>
                <p class="text-xs text-muted-foreground mt-1">${member.postsCount} posts • ${member.joined}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
}

// Events Page
function renderEventsPage() {
    return `
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold" style="color: var(--brown);">📅 Eventos</h2>
          <button class="btn btn-primary" style="background: var(--brown);">
            <i data-lucide="plus" class="w-4 h-4 mr-2"></i>
            Criar Evento
          </button>
        </div>
  
        <!-- Events Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${AppState.events.map(event => `
            <div class="bg-white rounded-lg shadow-sm border overflow-hidden card-hover" style="border-color: rgba(139, 69, 19, 0.2);">
              ${event.imageUrl ? `
                <img src="${event.imageUrl}" alt="${escapeHtml(event.title)}" class="w-full h-40 object-cover"/>
              ` : ''}
              <div class="p-4">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex-1">
                    <h3 class="font-medium mb-1">${escapeHtml(event.title)}</h3>
                    <p class="text-xs text-muted-foreground">${escapeHtml(event.organizer)}</p>
                  </div>
                  ${createBadge(event.type === 'online' ? 'Online' : 'Presencial', event.type === 'online' ? 'primary' : 'secondary')}
                </div>
                
                <p class="text-sm text-muted-foreground mb-3 line-clamp-2">${escapeHtml(event.description)}</p>
                
                <div class="space-y-2 mb-3 text-sm">
                  <div class="flex items-center gap-2 text-muted-foreground">
                    <i data-lucide="calendar" class="w-4 h-4"></i>
                    <span>${formatDate(event.date)} ${event.time ? `às ${event.time}` : ''}</span>
                  </div>
                  ${event.duration ? `
                    <div class="flex items-center gap-2 text-muted-foreground">
                      <i data-lucide="clock" class="w-4 h-4"></i>
                      <span>${event.duration}</span>
                    </div>
                  ` : ''}
                  ${event.location ? `
                    <div class="flex items-center gap-2 text-muted-foreground">
                      <i data-lucide="map-pin" class="w-4 h-4"></i>
                      <span>${escapeHtml(event.location)}</span>
                    </div>
                  ` : ''}
                  <div class="flex items-center gap-2 text-muted-foreground">
                    <i data-lucide="users" class="w-4 h-4"></i>
                    <span>${event.participants}${event.maxParticipants ? `/${event.maxParticipants}` : ''} participantes</span>
                  </div>
                </div>
                
                <button 
                  onclick="toggleEventRegistration('${event.id}'); render();"
                  class="w-full btn ${event.isRegistered ? 'btn-secondary' : 'btn-primary'}"
                  style="${!event.isRegistered ? 'background: var(--brown); color: white;' : ''}"
                >
                  ${event.isRegistered ? 'Cancelar Inscrição' : 'Inscrever-se'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
}

// Resources Page
function renderResourcesPage() {
    const categories = [...new Set(AppState.resources.map(r => r.category))];

    return `
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6" style="color: var(--brown);">📚 Recursos e Materiais</h2>
        
        <!-- Category Tabs -->
        <div class="flex gap-2 mb-6 flex-wrap">
          <button class="btn btn-sm btn-primary" style="background: var(--brown);">Todos</button>
          ${categories.map(cat => `
            <button class="btn btn-sm btn-ghost">${escapeHtml(cat)}</button>
          `).join('')}
        </div>
  
        <!-- Resources Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${AppState.resources.map(resource => `
            <div class="bg-white rounded-lg shadow-sm border p-4 card-hover" style="border-color: rgba(139, 69, 19, 0.2);">
              <div class="flex items-start justify-between mb-3">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background: rgba(139, 69, 19, 0.1);">
                  <i data-lucide="${resource.type === 'pdf' ? 'file-text' : 'video'}" class="w-6 h-6" style="color: var(--brown);"></i>
                </div>
                ${createBadge(resource.category, 'primary')}
              </div>
              
              <h3 class="font-medium mb-2">${escapeHtml(resource.title)}</h3>
              <p class="text-sm text-muted-foreground mb-3 line-clamp-2">${escapeHtml(resource.description)}</p>
              
              <div class="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>${escapeHtml(resource.author)}</span>
                <span>${formatDate(resource.date)}</span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">
                  <i data-lucide="download" class="w-4 h-4 inline"></i>
                  ${formatNumber(resource.downloads)}
                </span>
                <button class="btn btn-sm btn-primary" style="background: var(--brown);">
                  Baixar
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
}

// Forum Page
function renderForumPage(forumType) {
    const forum = APP_CONFIG.forums[forumType];
    if (!forum) return '<div>Fórum não encontrado</div>';

    // Filter posts by forum topics
    const forumPosts = AppState.posts.filter(post =>
        forum.topics.some(topic => post.tag && post.tag.includes(topic))
    );

    return `
      <div class="max-w-6xl mx-auto">
        <!-- Forum Header -->
        <div class="bg-white rounded-lg shadow-sm border p-6 mb-6" style="border-color: rgba(139, 69, 19, 0.2);">
          <div class="flex items-start gap-4">
            <div class="w-16 h-16 rounded-lg flex items-center justify-center" style="background: var(--brown);">
              <i data-lucide="${forum.icon}" class="w-8 h-8 text-white"></i>
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-semibold mb-2" style="color: var(--brown);">${forum.title}</h2>
              <p class="text-muted-foreground mb-4">${forum.description}</p>
              <div class="flex gap-6 text-sm">
                <span class="flex items-center gap-2">
                  <i data-lucide="users" class="w-4 h-4"></i>
                  ${formatNumber(forum.stats.members)} membros
                </span>
                <span class="flex items-center gap-2">
                  <i data-lucide="message-square" class="w-4 h-4"></i>
                  ${formatNumber(forum.stats.posts)} posts
                </span>
                <span class="flex items-center gap-2">
                  <i data-lucide="activity" class="w-4 h-4"></i>
                  ${formatNumber(forum.stats.active)} ativos agora
                </span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Topics Filter -->
        <div class="bg-white rounded-lg shadow-sm border p-4 mb-6" style="border-color: rgba(139, 69, 19, 0.2);">
          <h3 class="font-medium mb-3">Filtrar por tópico:</h3>
          <div class="flex gap-2 flex-wrap">
            <button 
              onclick="setState({selectedForumFilter: 'todos'}); render();"
              class="btn btn-sm ${AppState.selectedForumFilter === 'todos' ? 'btn-primary' : 'btn-ghost'}"
              style="${AppState.selectedForumFilter === 'todos' ? 'background: var(--brown); color: white;' : ''}"
            >
              Todos
            </button>
            ${forum.topics.map(topic => `
              <button 
                onclick="setState({selectedForumFilter: '${topic}'}); render();"
                class="btn btn-sm ${AppState.selectedForumFilter === topic ? 'btn-primary' : 'btn-ghost'}"
                style="${AppState.selectedForumFilter === topic ? 'background: var(--brown); color: white;' : ''}"
              >
                ${topic}
              </button>
            `).join('')}
          </div>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Forum Posts -->
          <div class="lg:col-span-2">
            ${renderCreatePost(forum.topics[0])}
            
            ${forumPosts.length > 0 ? `
              <div class="space-y-4">
                ${forumPosts
                .filter(post => AppState.selectedForumFilter === 'todos' || post.tag === AppState.selectedForumFilter)
                .map(post => renderPostCard(post)).join('')}
              </div>
            ` : `
              <div class="bg-white rounded-lg shadow-sm border p-8 text-center" style="border-color: rgba(139, 69, 19, 0.2);">
                <i data-lucide="message-square" class="w-16 h-16 mx-auto mb-4 opacity-20"></i>
                <p class="text-muted-foreground">Nenhum post neste fórum ainda. Seja o primeiro a compartilhar!</p>
              </div>
            `}
          </div>
  
          <!-- Forum Sidebar -->
          <div class="space-y-6">
            ${renderCommunityStats()}
            ${renderResourcesWidget()}
            ${renderMentalHealthWidget()}
          </div>
        </div>
      </div>
    `;
}

// Settings Page
function renderSettingsPage() {
    return `
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6" style="color: var(--brown);">⚙️ Configurações</h2>
        
        <div class="space-y-6">
          <!-- Profile Settings -->
          <div class="bg-white rounded-lg shadow-sm border p-6" style="border-color: rgba(139, 69, 19, 0.2);">
            <h3 class="font-medium mb-4">Perfil</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Nome</label>
                <input type="text" value="${escapeHtml(AppState.currentUser.name)}" class="input" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Papel</label>
                <input type="text" value="${escapeHtml(AppState.currentUser.role)}" class="input" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Foto de Perfil (URL)</label>
                <input type="text" value="${AppState.currentUser.avatar}" class="input" />
              </div>
            </div>
          </div>
  
          <!-- Notification Settings -->
          <div class="bg-white rounded-lg shadow-sm border p-6" style="border-color: rgba(139, 69, 19, 0.2);">
            <h3 class="font-medium mb-4">Notificações</h3>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked class="w-4 h-4" />
                <span class="text-sm">Notificar sobre novos comentários</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked class="w-4 h-4" />
                <span class="text-sm">Notificar sobre novas mensagens</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked class="w-4 h-4" />
                <span class="text-sm">Notificar sobre eventos próximos</span>
              </label>
            </div>
          </div>
  
          <!-- Privacy Settings -->
          <div class="bg-white rounded-lg shadow-sm border p-6" style="border-color: rgba(139, 69, 19, 0.2);">
            <h3 class="font-medium mb-4">Privacidade</h3>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked class="w-4 h-4" />
                <span class="text-sm">Perfil público</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" />
                <span class="text-sm">Permitir mensagens diretas de qualquer pessoa</span>
              </label>
            </div>
          </div>
  
          <!-- Save Button -->
          <div class="flex justify-end gap-3">
            <button class="btn btn-secondary">Cancelar</button>
            <button 
              class="btn btn-primary"
              style="background: var(--brown); color: white;"
              onclick="showToast('Configurações salvas com sucesso!', 'success')"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    `;
}