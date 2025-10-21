// Utility functions

// Toast notification system
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconMap = {
    success: 'check-circle',
    error: 'x-circle',
    info: 'info'
  };
  
  toast.innerHTML = `
    <i data-lucide="${iconMap[type]}" class="w-5 h-5"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  initIcons();
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize Lucide icons
function initIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Format time ago
function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `${minutes} min`;
  if (hours < 24) return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  if (days < 7) return `${days} ${days === 1 ? 'dia' : 'dias'}`;
  return new Date(date).toLocaleDateString('pt-BR');
}

// Generate unique ID
function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Get initials from name
function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substr(0, 2);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Validate URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

// Format time for display
function formatTime(timeString) {
  if (!timeString) return '';
  return timeString;
}

// Truncate text
function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

// Random item from array
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Create avatar element
function createAvatar(src, name, size = 'md') {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  const sizeClass = sizeMap[size] || sizeMap.md;
  
  return `
    <div class="relative ${sizeClass} rounded-full overflow-hidden bg-brown flex items-center justify-center">
      ${src ? 
        `<img src="${src}" alt="${escapeHtml(name)}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
         <div class="avatar-fallback hidden" style="display: none;">${getInitials(name)}</div>` :
        `<div class="avatar-fallback">${getInitials(name)}</div>`
      }
    </div>
  `;
}

// Create badge element
function createBadge(text, variant = 'primary') {
  return `<span class="badge badge-${variant}">${escapeHtml(text)}</span>`;
}

// Show modal
function showModal(content) {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal()">
      <div class="modal-content" onclick="event.stopPropagation()">
        ${content}
      </div>
    </div>
  `;
  document.body.style.overflow = 'hidden';
  initIcons();
}

// Close modal
function closeModal() {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = '';
  document.body.style.overflow = '';
}

// Confirm dialog
function showConfirm(message, onConfirm) {
  const content = `
    <div class="p-6">
      <h3 class="text-lg font-semibold mb-4">Confirmação</h3>
      <p class="mb-6">${escapeHtml(message)}</p>
      <div class="flex gap-3 justify-end">
        <button onclick="closeModal()" class="btn btn-secondary">
          Cancelar
        </button>
        <button onclick="closeModal(); (${onConfirm})()" class="btn btn-primary">
          Confirmar
        </button>
      </div>
    </div>
  `;
  showModal(content);
}

// Copy to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copiado para área de transferência!', 'success');
    }).catch(() => {
      showToast('Erro ao copiar', 'error');
    });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Copiado para área de transferência!', 'success');
    } catch (err) {
      showToast('Erro ao copiar', 'error');
    }
    document.body.removeChild(textarea);
  }
}

// Scroll to element
function scrollToElement(elementId, offset = 0) {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    if (isInViewport(img)) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });
}

// Local storage helpers
const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error saving to localStorage:', e);
      return false;
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing from localStorage:', e);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Error clearing localStorage:', e);
      return false;
    }
  }
};

// Session storage helpers
const sessionStorage = {
  set: (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Error saving to sessionStorage:', e);
      return false;
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error reading from sessionStorage:', e);
      return defaultValue;
    }
  }
};
