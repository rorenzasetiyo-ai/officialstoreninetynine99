// Ultra Simple Search - No freezing
function openSearchPage() {
  const page = document.getElementById('searchPage');
  if (!page) return;
  
  page.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  const input = document.getElementById('searchInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  
  // Show recommendations async
  Promise.resolve().then(() => showRecommendations());
}

function closeSearchPage() {
  const page = document.getElementById('searchPage');
  if (page) page.style.display = 'none';
  document.body.style.overflow = '';
}

function handleSearchEsc(e) {
  if (e.key === 'Escape') closeSearchPage();
}

function showRecommendations() {
  const container = document.getElementById('searchRecommendations');
  if (!container || !window.PRODUCT_CATALOG) return;
  
  let html = '';
  const limit = Math.min(6, window.PRODUCT_CATALOG.length);
  
  for (let i = 0; i < limit; i++) {
    const p = window.PRODUCT_CATALOG[i];
    if (!p) continue;
    html += `<div onclick="openProductDetail('${p.id}');closeSearchPage();" style="cursor:pointer;"><img src="images/img-${i*2}.jpeg" style="width:100%;height:150px;object-fit:cover;border-radius:6px;"><p style="font-size:12px;color:#999;margin:4px 0;">${p.series}</p><p style="font-size:13px;font-weight:600;color:#111;margin:2px 0;">${p.name}</p></div>`;
  }
  
  container.innerHTML = html;
}

function debounceSearch() {
  if (window.searchTimeout) clearTimeout(window.searchTimeout);
  window.searchTimeout = setTimeout(performSearch, 300);
}

function performSearch() {
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const recSection = document.getElementById('recommendationsSection');
  const resSection = document.getElementById('resultsSection');
  const resContainer = document.getElementById('searchResults');
  
  if (!resContainer || !window.PRODUCT_CATALOG) return;
  
  if (!query) {
    if (recSection) recSection.style.display = 'block';
    if (resSection) resSection.style.display = 'none';
    return;
  }
  
  if (recSection) recSection.style.display = 'none';
  if (resSection) resSection.style.display = 'block';
  
  const results = [];
  for (let i = 0; i < window.PRODUCT_CATALOG.length; i++) {
    const p = window.PRODUCT_CATALOG[i];
    if (p.name.toLowerCase().includes(query) || p.series.toLowerCase().includes(query)) {
      results.push({product: p, idx: i});
    }
    if (results.length >= 20) break;
  }
  
  if (results.length === 0) {
    resContainer.innerHTML = '<div style="text-align:center;padding:40px;color:#bbb;grid-column:1/-1;">No products found</div>';
    return;
  }
  
  let html = '';
  results.forEach(({product, idx}) => {
    html += `<div onclick="openProductDetail('${product.id}');closeSearchPage();" style="cursor:pointer;"><img src="images/img-${idx*2}.jpeg" style="width:100%;height:150px;object-fit:cover;border-radius:6px;"><p style="font-size:12px;color:#999;margin:4px 0;">${product.series}</p><p style="font-size:13px;font-weight:600;color:#111;margin:2px 0;">${product.name}</p></div>`;
  });
  
  resContainer.innerHTML = html;
}

// Setup listeners on page load
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  if (input) {
    input.removeEventListener('input', debounceSearch);
    input.addEventListener('input', debounceSearch);
  }
  document.removeEventListener('keydown', handleSearchEsc);
  document.addEventListener('keydown', handleSearchEsc);
});
