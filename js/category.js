/* Ninetynine - Category Pages */

function openCategoryPage(slug) {
  const page = document.getElementById('catPage_' + slug);
  if (!page) return;
  // Populate images from catalog store
  page.querySelectorAll('[data-src-id]').forEach(img => {
    const srcEl = document.getElementById(img.dataset.srcId);
    if (srcEl && !img.src) img.src = srcEl.src;
  });
  page.style.display = 'block';
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    page.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, 80);
}

function closeCategoryPage(slug) {
  const page = document.getElementById('catPage_' + slug);
  if (!page) return;
  page.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  ['dress','blouse','tunic','shirt','outer','sweater','oneset','skirt','pants'].forEach(function(s) {
    var p = document.getElementById('catPage_' + s);
    if (p && p.style.display !== 'none') { p.style.display='none'; document.body.style.overflow=''; }
  });
});
