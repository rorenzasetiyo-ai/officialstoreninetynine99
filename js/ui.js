/* ============================================================
   Ninetynine — UI, Navigation & Animations
   ============================================================ */

/* — Navbar scroll effect — */
function updateNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (window.scrollY > 10) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}
window.addEventListener('scroll', updateNavbar, { passive: true });

/* — Mobile menu — */
function openMobileMenu() {
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  if (!menu) return;
  menu.style.display = 'flex';
  requestAnimationFrame(() => {
    menu.classList.add('open');
    if (overlay) { overlay.style.display = 'block'; requestAnimationFrame(() => overlay.classList.add('visible')); }
  });
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  if (!menu) return;
  menu.classList.remove('open');
  if (overlay) overlay.classList.remove('visible');
  document.body.style.overflow = '';
  setTimeout(() => { menu.style.display = 'none'; if (overlay) overlay.style.display = 'none'; }, 350);
}

/* — Smooth scroll — */
function smoothScroll(id) {
  closeMobileMenu();
  const el = document.getElementById(id);
  if (!el) return;
  const navH = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 72;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH - 16, behavior: 'smooth' });
}

/* — Pages — */
function openNewArrivals()    { openAllProductsPage(); }
function closeNewArrivals()   { closeAllProductsPage(); }
function openAllProductsPage() {
  const p = document.getElementById('newArrivalsPage');
  if (!p) return;
  p.style.display = 'block'; p.scrollTop = 0; document.body.style.overflow = 'hidden';
  setTimeout(() => { p.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 80)); }, 100);
}
function closeAllProductsPage() {
  const p = document.getElementById('newArrivalsPage');
  if (!p) return;
  p.style.display = 'none'; document.body.style.overflow = '';
}
function openLooksPage()  {
  const p = document.getElementById('looksPage');
  if (!p) return;
  p.style.display = 'block'; p.scrollTop = 0; document.body.style.overflow = 'hidden';
}
function closeLooksPage() {
  const p = document.getElementById('looksPage');
  if (!p) return;
  p.style.display = 'none'; document.body.style.overflow = '';
}

/* — Scroll reveal — */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
  els.forEach(el => obs.observe(el));
}

/* — Custom cursor — */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.transform = `translate(${mx}px,${my}px)`; }, { passive: true });
  function animateRing() { rx += (mx-rx)*0.12; ry += (my-ry)*0.12; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(animateRing); }
  animateRing();
  document.querySelectorAll('a, button, .product-card, [onclick]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.style.transform += ' scale(1.6)');
    el.addEventListener('mouseleave', () => ring.style.transform = ring.style.transform.replace(' scale(1.6)', ''));
  });
}

/* — Dropdown — */
function initDropdowns() {
  document.querySelectorAll('.has-dropdown').forEach(dd => {
    let timer = null;
    const trigger = dd.querySelector('.dropdown-trigger');
    const menu    = dd.querySelector('.dropdown-menu');
    if (!trigger) return;
    trigger.addEventListener('mouseenter', () => { clearTimeout(timer); document.querySelectorAll('.has-dropdown').forEach(o => { if (o !== dd) o.classList.remove('open'); }); dd.classList.add('open'); });
    trigger.addEventListener('mouseleave', () => { timer = setTimeout(() => dd.classList.remove('open'), 200); });
    if (menu) {
      menu.addEventListener('mouseenter', () => clearTimeout(timer));
      menu.addEventListener('mouseleave', () => { timer = setTimeout(() => dd.classList.remove('open'), 150); });
    }
    trigger.addEventListener('click', e => { e.preventDefault(); dd.classList.toggle('open'); });
  });
  document.addEventListener('click', e => { if (!e.target.closest('.has-dropdown')) document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open')); });
  window.addEventListener('scroll', () => document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open')), { passive: true });
}

/* — Marquee — */
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const clone = track.cloneNode(true);
  track.parentNode.appendChild(clone);
}

/* — DOMContentLoaded init — */
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  initReveal();
  initCursor();
  initDropdowns();
  initMarquee();
  updateCartBadges();
  updateWishlistBadge();
  updateAccountBadge();
  restoreWishlistBtnStates();

  // Wire nav buttons
  document.querySelectorAll('.nav-icon-btn[aria-label="Cart"]').forEach(btn => {
    btn.onclick = () => openCartPage();
    btn.style.position = 'relative';
    btn.style.cursor = 'pointer';
  });
  document.querySelectorAll('.nav-icon-btn[aria-label="Account"]').forEach(btn => {
    btn.onclick = () => openAccountPage();
    btn.style.cursor = 'pointer';
  });
  const wlBtn = document.getElementById('navWishlistBtn');
  if (wlBtn) wlBtn.onclick = () => openWishlistPage();

  // Hamburger
  const hamburger = document.getElementById('hamburgerBtn');
  if (hamburger) hamburger.addEventListener('click', openMobileMenu);
  const mobileClose = document.getElementById('mobileClose');
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  const overlay = document.getElementById('mobileOverlay');
  if (overlay) overlay.addEventListener('click', closeMobileMenu);

  // Swipe to close mobile menu
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    let tx = 0;
    menu.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    menu.addEventListener('touchend', e => { if (tx - e.changedTouches[0].clientX > 60) closeMobileMenu(); }, { passive: true });
  }

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const pages = ['accountPage','confirmationPage','paymentPage','checkoutPage',
                   'productDetailPage','cartPage','wishlistPage','newArrivalsPage','looksPage'];
    for (const id of pages) {
      const el = document.getElementById(id);
      if (el && el.style.display !== 'none') { el.style.display='none'; document.body.style.overflow=''; return; }
    }
  });
});
