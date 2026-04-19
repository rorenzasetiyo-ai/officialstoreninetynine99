// Remove reveal animations on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('reveal');
    el.style.opacity = '1';
  });
});
