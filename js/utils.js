// ═══════════════════════════════════════════════════
// NINETYNINE — UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════

// TOAST NOTIFICATION
function showToast(msg, ok) {
  const toast = document.getElementById('toast') || createToast();
  toast.textContent = msg;
  toast.style.backgroundColor = ok ? '#4CAF50' : '#f44336';
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 3000);
}

function createToast() {
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = 'position:fixed;bottom:20px;left:20px;padding:12px 24px;background:#4CAF50;color:white;border-radius:4px;z-index:9999;font-size:14px;';
  document.body.appendChild(toast);
  return toast;
}

// CUSTOM CURSOR
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  if (!cursor || !cursorRing) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  setInterval(() => {
    ringX += (mouseX - ringX) * 0.3;
    ringY += (mouseY - ringY) * 0.3;
    cursorRing.style.left = ringX - 15 + 'px';
    cursorRing.style.top = ringY - 15 + 'px';
  }, 30);

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
}

// SMOOTH SCROLL
function smoothScroll(id) {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';

  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({behavior: 'smooth'});
}

// DROPDOWN MENU
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(dd => {
    const menu = dd.querySelector('.dropdown-menu');
    const trigger = dd.querySelector('.dropdown-trigger');
    const svg = trigger.querySelector('svg');
    let closeTimer = null;

    function openDropdown() {
      clearTimeout(closeTimer);
      menu.style.display = 'block';
      menu.style.opacity = '1';
      menu.style.visibility = 'visible';
      menu.style.pointerEvents = 'auto';
      if (svg) svg.style.transform = 'rotate(180deg)';
      dd.classList.add('open');
    }

    function closeDropdown() {
      closeTimer = setTimeout(() => {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.pointerEvents = 'none';
        setTimeout(() => {
          menu.style.display = 'none';
        }, 250);
        if (svg) svg.style.transform = '';
        dd.classList.remove('open');
      }, 150);
    }

    // Hover events
    dd.addEventListener('mouseenter', openDropdown);
    dd.addEventListener('mouseleave', closeDropdown);

    // Click event
    if (trigger) {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        if (menu.style.opacity === '1') {
          closeDropdown();
        } else {
          openDropdown();
        }
      });
    }

    // Close menu when clicking a menu item
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeDropdown();
      });
    });
  });
}

// MOBILE MENU
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close button handler
  if (mobileClose) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Mobile buttons with close action
  mobileMenu.querySelectorAll('button[data-action="close-menu"]').forEach(btn => {
    btn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      // Home button redirects
      if (btn.classList.contains('mobile-menu-home')) {
        window.location.href = 'index.html';
      }
    });
  });

  // Mobile category toggle
  const categoryToggle = document.getElementById('mobileCategoryToggle');
  const categoryMenu = document.getElementById('mobileCategoryMenu');
  const categoryArrow = document.getElementById('mobileCategoryArrow');
  
  if (categoryToggle && categoryMenu) {
    function toggleCategory() {
      const isOpen = categoryMenu.style.display === 'block';
      categoryMenu.style.display = isOpen ? 'none' : 'block';
      if (categoryArrow) {
        categoryArrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    }
    
    categoryToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleCategory();
    });
    
    // Also handle clicks on the arrow SVG
    if (categoryArrow) {
      categoryArrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCategory();
      });
    }

    // Close category menu when clicking a category
    categoryMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        categoryMenu.style.display = 'none';
        if (categoryArrow) categoryArrow.style.transform = 'rotate(0deg)';
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        // Navigate to the category
        window.location.href = link.getAttribute('href');
      });
    });
  }
}

// SCROLL REVEAL ANIMATIONS
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.1});

  reveals.forEach(el => {
    observer.observe(el);
    // Check if element is already in viewport on page load
    const rect = el.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
}

// Close mobile menu function (exposed globally for event handlers)
window.closeMobileMenu = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// Initialize all utilities on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initDropdowns();
  initMobileMenu();
  initScrollReveal();
  initEventListeners();
});

// Initialize event listeners for UI elements
function initEventListeners() {
  // Account page back button
  const accountBackBtn = document.getElementById('accountPageBackBtn');
  if (accountBackBtn) {
    accountBackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAccountPage();
    });
  }

  // Search page back button
  const searchBackBtn = document.getElementById('searchPageBackBtn');
  if (searchBackBtn) {
    searchBackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSearchPage();
    });
  }

  // Search page close button
  const searchCloseBtn = document.getElementById('searchPageCloseBtn');
  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSearchPage();
    });
  }

  // Search input - only if debounceSearch function exists
  const searchInput = document.getElementById('searchInput');
  if (searchInput && typeof debounceSearch === 'function') {
    searchInput.addEventListener('input', debounceSearch);
  }

  // Dropdown trigger prevent default
  const dropdownTrigger = document.querySelector('.dropdown-trigger');
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
    });
  }
}
