/* ============================================================
   Ninetynine — Product Detail & Wishlist
   ============================================================ */

function getImgPath(filename) {
  // Works from both root (index.html) and pages/ subfolder
  const base = window.location.pathname.includes('/pages/') ? '../images/' : 'images/';
  return base + filename;
}

function openProductDetail(productId) {
  const p = PRODUCT_CATALOG.find(x => x.id === productId);
  if (!p) return;
  currentProduct  = p;
  currentQty      = 1;
  selectedColor   = p.colors && p.colors.length > 0 ? p.colors[0].name : '—';
  selectedShipping= 'JNE';

  document.getElementById('pdSeries').textContent      = p.series;
  document.getElementById('pdName').textContent        = p.name;
  document.getElementById('pdPrice').textContent       = p.price;
  document.getElementById('pdDesc').textContent        = p.description;
  document.getElementById('pdMaterialVal').textContent = p.material;
  document.getElementById('pdQty').textContent         = '1';
  document.getElementById('pdEmail').value             = '';
  const toast = document.getElementById('pdToast');
  if (toast) toast.style.display = 'none';

  const mainSrc  = getImgPath(p.imgMain);
  const hoverSrc = getImgPath(p.imgHover);

  document.getElementById('pdImg1').src      = mainSrc;
  document.getElementById('pdThumbImg1').src = mainSrc;
  document.getElementById('pdThumbImg2').src = hoverSrc;
  document.getElementById('pdThumb1').style.border = '2px solid #111';
  document.getElementById('pdThumb2').style.border = '2px solid transparent';

  document.getElementById('pdThumb1').onclick = () => {
    document.getElementById('pdImg1').src = mainSrc;
    document.getElementById('pdThumb1').style.border = '2px solid #111';
    document.getElementById('pdThumb2').style.border = '2px solid transparent';
  };
  document.getElementById('pdThumb2').onclick = () => {
    document.getElementById('pdImg1').src = hoverSrc;
    document.getElementById('pdThumb2').style.border = '2px solid #111';
    document.getElementById('pdThumb1').style.border = '2px solid transparent';
  };

  const colorsEl     = document.getElementById('pdColors');
  const colorSection = document.getElementById('pdColorSection');
  if (!p.colors || p.colors.length <= 1) {
    if (colorSection) colorSection.style.display = 'none';
  } else {
    if (colorSection) colorSection.style.display = 'block';
    const lightHex = ['#F5F0E6','#F8F8F8','#F5F0E8','#F0EBE0','#F2EDE3','#F0EDE4','#EDE8DC'];
    colorsEl.innerHTML = p.colors.map((c, i) => {
      const first = i === 0;
      const needBorder = lightHex.includes(c.hex);
      return `<button onclick="selectColor(this,'${c.name}')" title="${c.name}" data-color="${c.name}"
        style="width:32px;height:32px;border-radius:50%;background:${c.hex};cursor:pointer;
               border:${first ? '3px solid #111' : '2px solid ' + (needBorder ? '#ddd' : 'transparent')};
               outline:${first ? '2px solid rgba(0,0,0,0.15)' : 'none'};outline-offset:2px;
               transition:all 0.2s;box-shadow:0 1px 6px rgba(0,0,0,0.14);"></button>`;
    }).join('');
  }

  const page = document.getElementById('productDetailPage');
  page.style.display = 'block';
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  updateCartBadges();
}

function closeProductDetail() {
  document.getElementById('productDetailPage').style.display = 'none';
  document.body.style.overflow = '';
}

function selectColor(btn, color) {
  selectedColor = color;
  document.querySelectorAll('#pdColors button').forEach(b => {
    b.style.border = '2px solid transparent'; b.style.outline = 'none';
  });
  btn.style.border = '3px solid #111';
  btn.style.outline = '2px solid rgba(0,0,0,0.15)';
  btn.style.outlineOffset = '2px';
}

function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('pdQty').textContent = currentQty;
}

function showToast(msg, ok) {
  const t = document.getElementById('pdToast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  t.style.background = ok !== false ? '#f0faf4' : '#fff5f5';
  t.style.borderColor = ok !== false ? '#b2dfcb' : '#f5c6c6';
  t.style.color       = ok !== false ? '#2d7a4f' : '#b00020';
  setTimeout(() => { t.style.display = 'none'; }, 3000);
}

function addToCart() {
  if (!currentProduct) return;
  const imgPath = getImgPath(currentProduct.imgMain);
  const existing = cart.find(x => x.id === currentProduct.id && x.color === selectedColor);
  if (existing) { existing.qty += currentQty; }
  else {
    cart.push({
      id: currentProduct.id, name: currentProduct.name, series: currentProduct.series,
      price: currentProduct.price, size: 'All Size', color: selectedColor,
      shipping: selectedShipping, qty: currentQty, img: imgPath, checked: true
    });
  }
  saveCart();
  showToast('✓ Ditambahkan ke keranjang!');
}

function buyNow() {
  if (!currentProduct) return;
  const imgPath = getImgPath(currentProduct.imgMain);
  const item = [{
    id: currentProduct.id, name: currentProduct.name, series: currentProduct.series,
    price: currentProduct.price, size: 'All Size', color: selectedColor,
    shipping: selectedShipping, qty: currentQty, img: imgPath
  }];
  openCheckoutPageDirect(item);
}

/* — Wishlist — */
function toggleWishlist(btn) {
  const id = btn.dataset.id, name = btn.dataset.name,
        series = btn.dataset.series, price = btn.dataset.price;
  const card = btn.closest('.product-card');
  const imgEl = card ? card.querySelector('.img-main') : null;
  const img   = imgEl ? imgEl.src : '';
  const idx   = wishlist.findIndex(p => p.id === id);
  const all   = document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    all.forEach(b => b.classList.remove('wishlisted'));
  } else {
    wishlist.push({ id, name, series, price, img });
    all.forEach(b => {
      b.classList.add('wishlisted');
      b.style.transform = 'scale(1.3)';
      setTimeout(() => b.style.transform = '', 250);
    });
  }
  saveWishlist();
  const wPage = document.getElementById('wishlistPage');
  if (wPage && wPage.style.display !== 'none') renderWishlistPage();
}

function openWishlistPage() {
  restoreWishlistBtnStates();
  renderWishlistPage();
  document.getElementById('wishlistPage').style.display = 'block';
  document.body.style.overflow = 'hidden';
}
function closeWishlistPage() {
  document.getElementById('wishlistPage').style.display = 'none';
  document.body.style.overflow = '';
}
function removeFromWishlist(id) {
  const idx = wishlist.findIndex(p => p.id === id);
  if (idx > -1) wishlist.splice(idx, 1);
  saveWishlist();
  document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`).forEach(b => b.classList.remove('wishlisted'));
  renderWishlistPage();
}
function renderWishlistPage() {
  const grid  = document.getElementById('wishlistGrid');
  const empty = document.getElementById('wishlistEmpty');
  const count = document.getElementById('wishlistCount');
  if (count) count.textContent = wishlist.length > 0 ? `(${wishlist.length} item)` : '';
  if (wishlist.length === 0) {
    if (empty) empty.style.display = 'block';
    if (grid)  grid.style.display  = 'none';
    return;
  }
  if (empty) empty.style.display = 'none';
  if (grid)  grid.style.display  = 'grid';
  grid.innerHTML = wishlist.map(p => `
    <div class="product-card" style="cursor:default;">
      <div class="product-img-wrap" style="position:relative;">
        <img src="${p.img}" alt="${p.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;border-radius:12px;">
        <button class="wishlist-remove-btn" onclick="removeFromWishlist('${p.id}')" title="Hapus">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="product-info">
        <p class="product-series">${p.series}</p>
        <p class="product-name">${p.name}</p>
        ${p.price && p.price !== '—' ? `<p class="product-price">${p.price}</p>` : ''}
      </div>
    </div>`).join('');
}
function restoreWishlistBtnStates() {
  wishlist.forEach(p => {
    document.querySelectorAll(`.wishlist-btn[data-id="${p.id}"]`).forEach(b => b.classList.add('wishlisted'));
  });
}
