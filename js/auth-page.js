// ═══════════════════════════════════════════════════
// AUTH PAGE FUNCTIONALITY
// ═══════════════════════════════════════════════════

const AUTH_STORAGE_KEY = 'nn_users';
const AUTH_SESSION_KEY = 'nn_current_user';

function initAuthStorage() {
  if (!localStorage.getItem(AUTH_STORAGE_KEY)) {
    const demoUsers = [
      {
        id: '1',
        fullname: 'Demo User',
        username: 'demo',
        email: 'demo@example.com',
        password: 'demo123'
      }
    ];
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUsers));
  }
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(tabName + '-tab').classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  clearMessages();
}

function showMessage(tabName, text, type) {
  const messageEl = document.getElementById(`${tabName}-message`);
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  if (type === 'error') {
    setTimeout(() => {
      messageEl.className = 'message';
    }, 5000);
  }
}

function clearMessages() {
  document.querySelectorAll('.message').forEach(msg => {
    msg.className = 'message';
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const submitBtn = document.querySelector('#login-form .submit-btn');

  if (!email || !password) {
    showMessage('login', '❌ Please fill in all fields', 'error');
    return;
  }

  if (password.length < 3) {
    showMessage('login', '❌ Password must be at least 3 characters', 'error');
    return;
  }

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  setTimeout(() => {
    initAuthStorage();
    const users = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
    const user = users.find(
      u => (u.email === email || u.username === email) && u.password === password
    );

    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;

    if (user) {
      localStorage.setItem(
        AUTH_SESSION_KEY,
        JSON.stringify({
          id: user.id,
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          loginTime: new Date().toISOString()
        })
      );
      showMessage('login', '✓ Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      showMessage('login', '❌ Invalid email/username or password', 'error');
    }
  }, 800);
}

function handleSignup(e) {
  e.preventDefault();
  const fullname = document.getElementById('signup-fullname').value.trim();
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const submitBtn = document.querySelector('#signup-form .submit-btn');

  if (!fullname || !username || !email || !password) {
    showMessage('signup', '❌ Please fill in all fields', 'error');
    return;
  }

  if (fullname.length < 2) {
    showMessage('signup', '❌ Full name must be at least 2 characters', 'error');
    return;
  }

  if (username.length < 3) {
    showMessage('signup', '❌ Username must be at least 3 characters', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showMessage('signup', '❌ Please enter a valid email address', 'error');
    return;
  }

  if (password.length < 6) {
    showMessage('signup', '❌ Password must be at least 6 characters', 'error');
    return;
  }

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  setTimeout(() => {
    initAuthStorage();
    const users = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));

    if (users.some(u => u.email === email || u.username === username)) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      showMessage('signup', '❌ Email or username already registered', 'error');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      fullname,
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(
      AUTH_SESSION_KEY,
      JSON.stringify({
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        loginTime: new Date().toISOString()
      })
    );

    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    showMessage('signup', '✓ Account created successfully! Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }, 800);
}

function checkLoginStatus() {
  const user = localStorage.getItem(AUTH_SESSION_KEY);
  if (user) {
    window.location.href = 'index.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initAuthStorage();
  checkLoginStatus();

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      switchTab(this.dataset.tab);
    });
  });

  // Form submissions
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  // Back button
  document.querySelectorAll('.back-link').forEach(btn => {
    btn.addEventListener('click', () => {
      window.history.back();
    });
  });

  // Enter key in forms
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const activeTab = document.querySelector('.tab-content.active');
      if (activeTab) {
        const form = activeTab.querySelector('form');
        if (form) {
          form.dispatchEvent(new Event('submit'));
        }
      }
    }
  });
});
