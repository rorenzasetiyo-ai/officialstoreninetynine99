// ═══════════════════════════════════════════════════
// SEARCH PAGE FUNCTIONALITY
// ═══════════════════════════════════════════════════

function renderProducts(products) {
  const container = document.getElementById('productsContainer');
  const noResults = document.getElementById('noResults');
  
  console.log('renderProducts called with:', products?.length, 'products');
  
  if (!products || products.length === 0) {
    container.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  
  noResults.style.display = 'none';
  container.innerHTML = products.map(product => {
    const idx = PRODUCT_CATALOG.indexOf(product);
    const imgSrc = idx >= 0 ? `images/img-${idx*2}.jpeg` : 'images/img-0.jpeg';
    return `
      <div class="product-card" data-product-id="${product.id}" style="cursor:pointer;">
        <img src="${imgSrc}" class="product-img" alt="${product.name}" onerror="this.src='images/img-0.jpeg'">
        <div class="product-info">
          <p class="product-series">${product.series}</p>
          <p class="product-name">${product.name}</p>
          <p class="product-price">${product.price}</p>
        </div>
      </div>
    `;
  }).join('');

  // Add event listeners to product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
      const productId = this.dataset.productId;
      if (typeof openProductDetail === 'function') {
        openProductDetail(productId);
      }
      window.location.href = 'index.html#prod-' + productId;
    });
  });
}

function performSearch() {
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  
  console.log('performSearch called with query:', query);
  
  if (!query) {
    renderProducts(PRODUCT_CATALOG);
    return;
  }
  
  const results = PRODUCT_CATALOG.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.series.toLowerCase().includes(query)
  );
  
  console.log('Search results:', results?.length);
  renderProducts(results);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Search page loaded, PRODUCT_CATALOG:', typeof PRODUCT_CATALOG, PRODUCT_CATALOG?.length);
  
  // Wait a bit to ensure PRODUCT_CATALOG is loaded
  setTimeout(() => {
    if (typeof PRODUCT_CATALOG !== 'undefined' && PRODUCT_CATALOG.length > 0) {
      renderProducts(PRODUCT_CATALOG);
    } else {
      console.error('PRODUCT_CATALOG not available');
      document.getElementById('noResults').style.display = 'block';
      document.getElementById('noResults').textContent = 'Error: Product catalog not loaded';
    }
  }, 100);
  
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('input', () => {
      clearTimeout(window.searchTimeout);
      window.searchTimeout = setTimeout(performSearch, 200);
    });
  }
});
