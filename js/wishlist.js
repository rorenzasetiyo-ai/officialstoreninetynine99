function toggleWishlist(btn) {
const id = btn.getAttribute('data-id');
const name = btn.getAttribute('data-name');
const series = btn.getAttribute('data-series');
const price = btn.getAttribute('data-price');
const idx = AppState.wishlist.findIndex(p => p.id === id);
if (idx > -1) {
btn.classList.remove('wishlisted');
AppState.wishlist.splice(idx, 1);
} else {
btn.classList.add('wishlisted');
AppState.wishlist.push({id, name, series, price});
}
localStorage.setItem('nn_wishlist', JSON.stringify(AppState.wishlist));
updateWishlistBadge();
}
function openWishlistPage() {
renderWishlistPage();
document.getElementById('wishlistPage').style.display = 'block';
document.body.style.overflow = 'hidden';
document.addEventListener('keydown', handleWishlistEsc);
}
function closeWishlistPage() {
document.getElementById('wishlistPage').style.display = 'none';
document.body.style.overflow = 'auto';
document.removeEventListener('keydown', handleWishlistEsc);
}
function handleWishlistEsc(e) {
if (e.key === 'Escape') closeWishlistPage();
}
function removeFromWishlist(id) {
const idx = AppState.wishlist.findIndex(p => p.id === id);
if (idx > -1) AppState.wishlist.splice(idx, 1);
localStorage.setItem('nn_wishlist', JSON.stringify(AppState.wishlist));
updateWishlistBadge();
document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`).forEach(b => b.classList.remove('wishlisted'));
renderWishlistPage();
}
function renderWishlistPage() {
const grid = document.getElementById('wishlistGrid');
const empty = document.getElementById('wishlistEmpty');
const count = document.getElementById('wishlistCount');
if (!grid || !empty) {
return;
}
if (AppState.wishlist.length === 0) {
grid.style.display = 'none';
empty.style.display = 'block';
if (count) count.textContent = '';
return;
}
grid.style.display = 'grid';
empty.style.display = 'none';
if (count) count.textContent = `(${AppState.wishlist.length})`;
grid.innerHTML = AppState.wishlist.map(p => {
const product = PRODUCT_CATALOG.find(prod => prod.id === p.id);
if (!product) return '';
const imgIndex = PRODUCT_CATALOG.findIndex(prod => prod.id === p.id);
const mainImg = `images/img-${imgIndex * 2 + 1}.jpeg`;
return `
<div class="product-card" data-product-id="${p.id}" style="cursor:pointer;">
<div class="product-img-wrap" style="position:relative;overflow:hidden;aspect-ratio:3/4;background:#f5f5f5;border-radius:12px;margin-bottom:8px;">
<img src="${mainImg}" alt="${product.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;">
<div class="product-actions" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:8px;opacity:0;transition:opacity 0.3s;">
<button class="product-action-btn wishlist-btn wishlisted" data-id="${p.id}" data-name="${product.name}" data-series="${product.series}" data-price="${product.price}" onclick="event.stopPropagation(); toggleWishlist(this); renderWishlistPage();" style="background:#fff;width:40px;height:40px;border-radius:50%;cursor:pointer;border:none;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
<svg viewBox="0 0 24 24" style="width:20px;height:20px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#B85252" stroke="none"/></svg>
</button>
</div>
</div>
<div class="product-info">
<p class="product-series" style="font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#999;margin:0 0 4px;">${product.series}</p>
<p class="product-name" style="font-family:'Playfair Display',serif;font-size:clamp(12px,2vw,14px);font-weight:500;margin:0 0 4px;line-height:1.2;">${product.name}</p>
<p class="product-price" style="font-family:'DM Sans',sans-serif;font-size:11px;color:#666;margin:0;">${product.price}</p>
</div>
</div>
`;
}).join('');
const cards = document.querySelectorAll('#wishlistGrid .product-card');
cards.forEach((card, index) => {
card.addEventListener('click', function(e) {
if (e.target.closest('.wishlist-btn')) {
return;
}
const productId = this.dataset.productId;
if (productId) {
openProductDetail(productId);
closeWishlistPage();
}
});
});
}
document.addEventListener('DOMContentLoaded', () => {
updateWishlistBadge();
const wlBtn = document.getElementById('navWishlistBtn');
if (wlBtn) wlBtn.onclick = () => openWishlistPage();
});

// Update wishlist badge in header
function updateWishlistBadge() {
  const badge = document.getElementById('wishlistBadge');
  if (badge) {
    if (AppState.wishlist.length > 0) {
      badge.textContent = AppState.wishlist.length > 9 ? '9+' : AppState.wishlist.length;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}

// Restore wishlist button states on page load
function restoreWishlistBtnStates() {
  AppState.wishlist.forEach(p => {
    document.querySelectorAll(`.wishlist-btn[data-id="${p.id}"]`).forEach(b => {
      b.classList.add('wishlisted');
    });
  });
}
