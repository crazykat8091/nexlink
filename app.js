/**
 * NexLink v2.0 - Core Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initModals();
  initScrollEffects();
  initChat();
  initResponsiveCards();
  
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * Theme Management
 */
function initTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const thumb = document.getElementById('toggleThumb');
  const metaTheme = document.getElementById('metaThemeColor');
  const logoImg = document.querySelector('.logo-img');

  const updateToggle = (theme) => {
    if (!thumb || !metaTheme) return;
    metaTheme.setAttribute('content', theme === 'dark' ? '#0e0e0e' : '#fcfaf8');
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    
    // Switch to theme-optimized branding
    if (logoImg) logoImg.src = theme === 'dark' ? 'nexlink_logo_dark.svg' : 'nexlink_logo_light.svg';
  };

  // Initial load
  const saved = localStorage.getItem('nexlink-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateToggle(saved);

  btn?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('nexlink-theme', next);
    updateToggle(next);
  });
}

/**
 * Navigation & Mobile Menu
 */
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  const toggleMenu = () => {
    const isOpen = hamburger?.classList.toggle('open');
    mobileNav?.classList.toggle('open');
    hamburger?.setAttribute('aria-expanded', !!isOpen);
    document.body.classList.toggle('no-scroll', !!isOpen);
    document.documentElement.classList.toggle('no-scroll', !!isOpen);
  };

  hamburger?.addEventListener('click', toggleMenu);

  // Close on link click
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileNav?.classList.contains('open') && !hamburger?.contains(e.target) && !mobileNav?.contains(e.target)) {
      toggleMenu();
    }
  });
}

/**
 * Modal Management
 */
function initModals() {
  const contactModal = document.getElementById('contact');
  
  window.openContactModal = (e) => {
    if (e) e.preventDefault();
    contactModal?.classList.add('open');
    document.body.classList.add('no-scroll');
    document.getElementById('chatOverlay')?.classList.remove('open');
  };

  window.closeContactModal = () => {
    contactModal?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', window.openContactModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeContactModal();
  });
}

/**
 * Scroll Effects & Back to Top
 */
function initScrollEffects() {
  const header = document.querySelector('header');
  const backToTop = document.getElementById('backToTop');
  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 20) header?.classList.add('scrolled');
        else header?.classList.remove('scrolled');

        const shouldShow = window.scrollY > 500;
        backToTop?.classList.toggle('visible', shouldShow);
        
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Responsive Card Behavior (Auto-open on Desktop)
 */
function initResponsiveCards() {
  const cards = document.querySelectorAll('.service-card, .review-card');
  const desktopQuery = window.matchMedia('(min-width: 769px)');
  
  const updateCards = (isDesktop) => {
    cards.forEach(card => {
      if (isDesktop) {
        card.open = true;
      } else if (!card.dataset.userToggled) {
        card.open = false;
      }
    });
  };

  // Track manual toggles to prevent responsive override
  cards.forEach(card => {
    const summary = card.querySelector('summary');
    summary?.addEventListener('click', () => {
      // If on mobile, allow default behavior but mark as user toggled
      card.dataset.userToggled = 'true';
    });
  });

  desktopQuery.addEventListener('change', (e) => updateCards(e.matches));
  updateCards(desktopQuery.matches);
}

/**
 * AI Chat Integration
 */
function initChat() {
  const chatBtn = document.getElementById('chatBtn');
  const chatOverlay = document.getElementById('chatOverlay');
  const closeChat = document.getElementById('closeChat');
  const agentInput = document.getElementById('agentInput');
  const agentSubmit = document.getElementById('agentSubmit');
  const chatMessages = document.getElementById('chatMessages');
  let chatHistory = [];

  chatBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    chatOverlay?.classList.toggle('open');
  });

  closeChat?.addEventListener('click', (e) => {
    e.stopPropagation();
    chatOverlay?.classList.remove('open');
  });

  document.addEventListener('click', (e) => {
    if (chatOverlay?.classList.contains('open') && !chatOverlay.contains(e.target) && !chatBtn.contains(e.target)) {
      chatOverlay.classList.remove('open');
    }
  });

  const appendMessage = (content, side) => {
    const msg = document.createElement('div');
    msg.className = `msg msg-${side}`;
    if (typeof content === 'string') msg.textContent = content;
    else msg.appendChild(content);
    chatMessages?.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  };

  const handleQuery = async () => {
    const query = agentInput.value.trim();
    if (!query) return;

    appendMessage(query, 'user');
    agentInput.value = '';
    
    const loadingMsg = appendMessage(createLoader(), 'agent');

    if (window.location.protocol === 'file:') {
      loadingMsg.textContent = "AI requires a live server to respond.";
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history: chatHistory })
      });

      const data = await response.json();
      loadingMsg.textContent = data.reply || "I'm having trouble thinking right now.";
      if (data.history) chatHistory = data.history;
    } catch (err) {
      loadingMsg.textContent = "Connection error.";
    }
  };

  agentSubmit?.addEventListener('click', handleQuery);
  agentInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleQuery(); });

  // Greeting
  setTimeout(() => {
    appendMessage("Hi! I'm your Tech Neighbor. How can I help today?", 'agent');
  }, 1000);
}

function createLoader() {
  const container = document.createElement('div');
  container.className = 'typing-dots';
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    container.appendChild(dot);
  }
  return container;
}