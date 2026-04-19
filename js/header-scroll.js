(function() {
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');
if (!navbar || !hero) return;

function onScroll() {
  const heroHeight = hero.offsetHeight;
  const scrollY = window.scrollY;
  
  // If still in hero section (scroll position less than hero height)
  if (scrollY < heroHeight) {
    navbar.classList.remove('scrolled');
  } else {
    // Permanently white when outside hero section
    navbar.classList.add('scrolled');
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Initial state - transparent
navbar.classList.remove('scrolled');
})();
