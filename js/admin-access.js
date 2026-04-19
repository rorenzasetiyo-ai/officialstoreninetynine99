// ════════════════════════════════════════════════════════════════════════════
// ADMIN ACCESS
// Add this to main website to enable admin panel access
// Users can press Ctrl+Shift+A to open admin dashboard
// ════════════════════════════════════════════════════════════════════════════

function initAdminAccess() {
  // Add admin access button (hidden by default)
  const adminBtn = document.createElement('div');
  adminBtn.id = 'admin-access-btn';
  adminBtn.innerHTML = '⚙️ Admin';
  adminBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    background: #000;
    color: #fff;
    padding: 10px 15px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 0.9rem;
    border: 1px solid #fff;
    display: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;

  adminBtn.addEventListener('click', () => {
    window.location.href = 'admin.html';
  });

  adminBtn.addEventListener('mouseenter', () => {
    adminBtn.style.background = '#fff';
    adminBtn.style.color = '#000';
  });

  adminBtn.addEventListener('mouseleave', () => {
    adminBtn.style.background = '#000';
    adminBtn.style.color = '#fff';
  });

  document.body.appendChild(adminBtn);

  // Keyboard shortcuts for admin access
  let secretKeySequence = [];
  const secretKeys = ['admin', 'debug', 'panel'];

  document.addEventListener('keydown', (e) => {
    // Show admin button with Ctrl+Shift+A
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      adminBtn.style.display = adminBtn.style.display === 'none' ? 'block' : 'none';
      return;
    }

    // Secret key sequence detection (type "admin" quickly)
    const key = e.key.toLowerCase();
    if (/^[a-z]$/.test(key)) {
      secretKeySequence.push(key);

      // Keep only last 10 characters
      if (secretKeySequence.length > 10) {
        secretKeySequence.shift();
      }

      // Check for secret words
      const typed = secretKeySequence.join('');
      if (typed.includes('admin') || typed.includes('debug') || typed.includes('panel')) {
        adminBtn.style.display = 'block';
        showAdminToast('Panel admin dibuka! Klik atau tekan Ctrl+Shift+A');
      }
    }
  });

  // Show admin button on triple-click anywhere
  let clickCount = 0;
  let clickTimer;

  document.addEventListener('click', () => {
    clickCount++;
    clearTimeout(clickTimer);

    if (clickCount === 3) {
      adminBtn.style.display = 'block';
      showAdminToast('Panel admin dibuka!');
      clickCount = 0;
    }

    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 400);
  });

  console.log('✓ Admin access enabled');
  console.log('  Shortcuts:');
  console.log('  • Press Ctrl+Shift+A to toggle admin button');
  console.log('  • Type "admin", "debug", or "panel" quickly');
  console.log('  • Triple-click anywhere on page');
}

function showAdminToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    background: #388e3c;
    color: #fff;
    padding: 12px 20px;
    border-radius: 4px;
    font-size: 0.9rem;
    z-index: 9998;
    animation: slideUp 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => toast.remove(), 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdminAccess);
} else {
  initAdminAccess();
}
