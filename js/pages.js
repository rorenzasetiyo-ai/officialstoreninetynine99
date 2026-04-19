// ═══════════════════════════════════════════════════
// NINETYNINE — PAGE NAVIGATION
// ═══════════════════════════════════════════════════

// CATEGORY PAGE
function openCategoryPage(categoryName) {
  // Map category name to category key
  const categoryMap = {
    'Dress': 'dress',
    'Blouse': 'blouse',
    'Tunic': 'tunic',
    'Outer': 'outer',
    'Sweater': 'sweater',
    'Pants': 'pants',
    'Skirt': 'skirt'
  };
  
  const categoryKey = categoryMap[categoryName] || categoryName.toLowerCase();
  const products = getCategoryProducts(categoryKey);
  
  const page = document.getElementById('categoryPage');
  document.getElementById('categoryTitle').textContent = categoryName || 'Category';
  
  let html = '';
  products.forEach(prod => {
    html += `
    <div class="product-card-cat" style="cursor:pointer;transition:transform 0.4s ease;" onmouseenter="this.style.transform='translateY(-4px)'" onmouseleave="this.style.transform='translateY(0)'">
      <div class="product-img-wrap" style="position:relative;overflow:hidden;background:#f2f2f2;aspect-ratio:3/4;border-radius:12px;margin-bottom:4px;cursor:pointer;" onclick="openProductDetailFromCategory('${prod.id}')">
        <img class="cat-img-main" src="${prod.image}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity 0.45s ease, transform 0.6s ease;opacity:1;onerror='this.src=&quot;images/placeholder.png&quot;'">
        <img class="cat-img-hover" src="${prod.image}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.45s ease, transform 0.6s ease;">
        <div class="cat-product-actions" style="position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:8px;opacity:0;transition:opacity 0.35s ease;z-index:3;">
          <button class="product-action-btn wishlist-btn" onclick="toggleWishlist(this)" data-id="${prod.id}" data-name="${prod.name}" data-series="${prod.series}" data-price="${prod.price}" style="background:rgba(255,255,255,0.92);backdrop-filter:blur(6px);border:none;cursor:pointer;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background 0.3s, transform 0.3s;box-shadow:0 4px 16px rgba(0,0,0,0.12);" onmouseover="this.style.background='#000';this.querySelector('svg').style.stroke='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.92)';this.querySelector('svg').style.stroke='#333'">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="product-action-btn" onclick="openProductDetailFromCategory('${prod.id}')" style="background:rgba(255,255,255,0.92);backdrop-filter:blur(6px);border:none;cursor:pointer;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background 0.3s, transform 0.3s;box-shadow:0 4px 16px rgba(0,0,0,0.12);" onmouseover="this.style.background='#000';this.querySelector('svg').style.stroke='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.92)';this.querySelector('svg').style.stroke='#333'">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#333" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
        </div>
      </div>
      <div class="product-info" style="padding:14px 4px 0;">
        <p class="product-series" style="font-size:11px;color:#aaa;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">${prod.series}</p>
        <p class="product-name" style="font-size:13px;font-weight:400;letter-spacing:0.02em;color:#333;margin-bottom:4px;transition:color 0.3s;">${prod.name}</p>
      </div>
    </div>
    `;
  });
  
  document.getElementById('categoryProductGrid').innerHTML = html;
  
  // Add hover effects
  const grid = document.getElementById('categoryProductGrid');
  grid.querySelectorAll('.product-card-cat').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.cat-img-main').style.opacity = '0';
      this.querySelector('.cat-img-main').style.transform = 'scale(1.04)';
      this.querySelector('.cat-img-hover').style.opacity = '1';
      this.querySelector('.cat-img-hover').style.transform = 'scale(1.04)';
      this.querySelector('.cat-product-actions').style.opacity = '1';
      this.querySelector('.product-name').style.color = '#000';
    });
    card.addEventListener('mouseleave', function() {
      this.querySelector('.cat-img-main').style.opacity = '1';
      this.querySelector('.cat-img-main').style.transform = 'scale(1)';
      this.querySelector('.cat-img-hover').style.opacity = '0';
      this.querySelector('.cat-img-hover').style.transform = 'scale(1)';
      this.querySelector('.cat-product-actions').style.opacity = '0';
      this.querySelector('.product-name').style.color = '#333';
    });
  });
  
  page.style.display = 'block';
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function openProductDetailFromCategory(productId) {
  closeCategoryPage();
  openProductDetailCategory(productId);
}

function closeCategoryPage() {
  document.getElementById('categoryPage').style.display = 'none';
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════════
// PRODUCT DETAIL PAGE (openProductDetail is in js/main.js)
// closeProductDetail is also in js/main.js  
// ═══════════════════════════════════════════════════

function changeQty(delta) {
  AppState.currentQty = Math.max(1, AppState.currentQty + delta);
  document.getElementById('pdQty').textContent = AppState.currentQty;
}

// NEW ARRIVALS PAGE
function openNewArrivals() {
  const page = document.getElementById('newArrivalsPage');
  page.style.display = 'block';
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    page.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, 100);
  document.addEventListener('keydown', handleNewArrivalsEsc);
}

function closeNewArrivals() {
  document.getElementById('newArrivalsPage').style.display = 'none';
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleNewArrivalsEsc);
}

function handleNewArrivalsEsc(e) {
  if (e.key === 'Escape') closeNewArrivals();
}

function openAllProductsPage() {
  openNewArrivals();
}

// LOOKS PAGE
function openLooksPage() {
  document.getElementById('looksPage').style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleLooksEsc);
}

function closeLooksPage() {
  document.getElementById('looksPage').style.display = 'none';
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleLooksEsc);
}

function handleLooksEsc(e) {
  if (e.key === 'Escape') closeLooksPage();
}

// CHECKOUT PAGE
function openCheckoutPageDirect(item) {
  document.getElementById('checkoutPage').style.display = 'block';
  document.body.style.overflow = 'hidden';
  renderCheckoutItems([item].flat());
  document.addEventListener('keydown', handleCheckoutEsc);
}

function closeCheckoutPage() {
  document.getElementById('checkoutPage').style.display = 'none';
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleCheckoutEsc);
}

function goToPaymentStep() {
  const name    = document.getElementById('coName').value.trim();
  const email   = document.getElementById('coEmail').value.trim();
  const address = document.getElementById('coAddress').value.trim();
  if (!name)    { document.getElementById('coName').focus(); alert('Mohon isi nama lengkap.'); return; }
  if (!email)   { document.getElementById('coEmail').focus(); alert('Mohon isi email.'); return; }
  if (!address) { document.getElementById('coAddress').focus(); alert('Mohon isi alamat pengiriman.'); return; }
  const payment  = document.querySelector('input[name="payment"]:checked')?.value || 'BCA';
  const shipping = document.querySelector('input[name="coShipping"]:checked')?.value || 'JNE';
  const phone    = document.getElementById('coPhone').value.trim() || '—';
  const items    = window._checkoutItems || AppState.cart.filter(i => i.checked !== false);
  let subtotal = 0;
  items.forEach(i => { const n = parseInt((i.price || '0').replace(/[^0-9]/g,'')); subtotal += n * (i.qty || 1); });
  const orderId   = 'NN' + Date.now().toString().slice(-8).toUpperCase();
  const orderDate = new Date().toLocaleDateString('id-ID',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const orderTime = new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
  window._lastOrder = { orderId, name, email, phone, address, payment, shipping, items, subtotal, orderDate, orderTime };
  if (document.getElementById('payTotalAmount')) document.getElementById('payTotalAmount').textContent = 'IDR ' + subtotal.toLocaleString('id-ID');
  if (document.getElementById('payOrderId')) document.getElementById('payOrderId').textContent = 'Order #' + orderId;
  if (document.getElementById('payOrderIdSmall')) document.getElementById('payOrderIdSmall').textContent = 'Order #' + orderId;
  const isQRIS = payment === 'QRIS';
  if (document.getElementById('vaSection')) document.getElementById('vaSection').style.display = isQRIS ? 'none' : 'block';
  if (document.getElementById('qrisSection')) document.getElementById('qrisSection').style.display = isQRIS ? 'block' : 'none';
  if (!isQRIS && document.getElementById('vaNumber')) {
    const isBCA = payment === 'BCA';
    const vaNum = (isBCA ? '00816' : '89500') + Math.floor(Math.random()*1e10).toString().padStart(10,'0');
    if (document.getElementById('vaNumber')) document.getElementById('vaNumber').textContent = vaNum.slice(0,5)+' '+vaNum.slice(5,10)+' '+vaNum.slice(10);
    if (document.getElementById('payBankLogo')) { document.getElementById('payBankLogo').textContent = isBCA ? 'BCA' : 'MDR'; document.getElementById('payBankLogo').style.background = isBCA ? '#005BAC' : '#003F88'; }
    if (document.getElementById('payBankName')) document.getElementById('payBankName').textContent = isBCA ? 'BCA' : 'Mandiri';
  }
  if (document.getElementById('paymentPage')) {
    document.getElementById('checkoutPage').style.display = 'none';
    document.getElementById('paymentPage').style.display = 'block';
    document.getElementById('paymentPage').scrollTop = 0;
  }
}

function handleCheckoutEsc(e) {
  if (e.key === 'Escape') closeCheckoutPage();
}

function closePaymentPage() {
  document.getElementById('paymentPage').style.display = 'none';
  document.body.style.overflow = '';
}

function confirmPayment() {
  const order = window._lastOrder;
  if (!order) return;
  let history = JSON.parse(localStorage.getItem('nn_order_history') || '[]');
  history.unshift({ ...order, status: 'Dibayar', savedAt: new Date().toISOString() });
  localStorage.setItem('nn_order_history', JSON.stringify(history));
  if (!window._checkoutItems) { AppState.cart = []; localStorage.setItem('ninetynine_cart', JSON.stringify([])); }
  window._checkoutItems = null;
  document.getElementById('checkoutPage').style.display  = 'none';
  document.getElementById('paymentPage').style.display   = 'none';
  document.getElementById('cartPage').style.display      = 'none';
  document.getElementById('productDetailPage').style.display = 'none';
  openConfirmationPage(order);
}

function openConfirmationPage(order) {
  if (document.getElementById('confOrderId')) document.getElementById('confOrderId').textContent = order.orderId;
  if (document.getElementById('confDateTime')) document.getElementById('confDateTime').textContent = order.orderDate + ', ' + order.orderTime;
  if (document.getElementById('confName')) document.getElementById('confName').textContent = order.name;
  if (document.getElementById('confPhone')) document.getElementById('confPhone').textContent = order.phone || '—';
  if (document.getElementById('confAddress')) document.getElementById('confAddress').textContent = order.address;
  if (document.getElementById('confShipping')) document.getElementById('confShipping').textContent = order.shipping;
  if (document.getElementById('confPayment')) document.getElementById('confPayment').textContent = order.payment + ' Transfer';
  const listEl = document.getElementById('confProductList');
  if (listEl) {
    listEl.innerHTML = order.items.map(item => `
      <div style="display:flex;gap:12px;padding:14px 16px;border-bottom:1px solid #f8f8f8;align-items:flex-start;">
        <div style="width:64px;min-width:64px;aspect-ratio:3/4;border-radius:8px;overflow:hidden;background:#f5f5f5;">
          <img src="${item.img}" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
        </div>
        <div style="flex:1;">
          <p style="font-family:'DM Sans',sans-serif;font-size:9px;color:#aaa;margin:0 0 2px;text-transform:uppercase;letter-spacing:0.12em;">${item.series||'N/A'}</p>
          <p style="font-family:'Playfair Display',serif;font-size:14px;color:#111;margin:0 0 4px;">${item.name}</p>
          <p style="font-family:'DM Sans',sans-serif;font-size:11px;color:#999;margin:0 0 6px;">All Size · ${item.color||'—'} · Qty: ${item.qty}</p>
          <p style="font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;color:#D84040;margin:0;">${item.price}</p>
        </div>
      </div>
    `).join('');
  }
  const priceEl = document.getElementById('confPriceSummary');
  if (priceEl) {
    const totalQty = order.items.reduce((s,i) => s+i.qty, 0);
    priceEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
        <span style="font-family:'DM Sans',sans-serif;font-size:12px;color:#888;">Subtotal (${totalQty} produk)</span>
        <span style="font-family:'DM Sans',sans-serif;font-size:12px;color:#333;">IDR ${order.subtotal.toLocaleString('id-ID')}</span>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
        <span style="font-family:'DM Sans',sans-serif;font-size:12px;color:#888;">Ongkos Kirim</span>
        <span style="font-family:'DM Sans',sans-serif;font-size:12px;color:#2e7d32;font-weight:500;">Gratis</span>
      </div>
      <div style="border-top:1.5px dashed #eee;padding-top:10px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#111;">Total Bayar</span>
        <span style="font-family:'DM Sans',sans-serif;font-size:18px;font-weight:700;color:#D84040;">IDR ${order.subtotal.toLocaleString('id-ID')}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding-top:6px;">
        <span style="font-family:'DM Sans',sans-serif;font-size:11px;color:#aaa;">Waktu Bayar</span>
        <span style="font-family:'DM Sans',sans-serif;font-size:11px;color:#aaa;">${order.orderTime} WIB</span>
      </div>
    `;
  }
  if (document.getElementById('emailSendingNotice')) document.getElementById('emailSendingNotice').style.display = 'block';
  if (document.getElementById('emailSentNotice')) document.getElementById('emailSentNotice').style.display = 'none';
  const page = document.getElementById('confirmationPage');
  if (page) {
    page.style.display = 'block';
    page.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }
}

function closeConfirmationPage() {
  // Hide confirmation modal
  document.getElementById('confirmationPage').style.display = 'none';
  // Hide cart modal to return to homepage
  const cartModal = document.getElementById('cartModal');
  if (cartModal) cartModal.style.display = 'none';
  document.body.style.overflow = '';
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCheckoutItems(items) {
  const list = document.getElementById('checkoutItemsList');
  if (!list || !items) return;
  list.innerHTML = items.map(item => `
    <div class="checkout-item">
      <span>${item.name} × ${item.qty || 1}</span>
      <span>${item.price}</span>
    </div>
  `).join('');
}

// ACCOUNT PAGE
function loadMockOrderHistory() {
  const mockOrders = [
    {id: 'ORD-001', date: '2024-01-15', items: 'Silk Blend Dress', total: '$485', status: 'Delivered'},
    {id: 'ORD-002', date: '2024-02-03', items: 'Premium Handbag', total: '$1,250', status: 'Delivered'},
    {id: 'ORD-003', date: '2024-02-28', items: 'Luxury Heels (2)', total: '$890', status: 'Processing'},
    {id: 'ORD-004', date: '2024-03-10', items: 'Silk Scarf Set', total: '$325', status: 'In Transit'}
  ];
  
  const ordersList = document.getElementById('orderHistoryList');
  if (!ordersList) return;
  
  ordersList.innerHTML = mockOrders.map(order => `
    <div style="background:#fff;border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:12px;">
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <span style="font-family:'Playfair Display',serif;font-size:14px;font-weight:500;color:#111;">${order.id}</span>
          <span style="font-family:'DM Sans',sans-serif;font-size:11px;color:#888;">${order.date}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="font-family:'DM Sans',sans-serif;font-size:12px;color:#555;">${order.items}</span>
          <span style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#D84040;">${order.total}</span>
        </div>
        <span style="display:inline-block;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;color:${order.status === 'Delivered' ? '#4CAF50' : order.status === 'In Transit' ? '#FF9800' : '#2196F3'};">
          ${order.status}
        </span>
      </div>
    </div>
  `).join('');
}

function openAccountPage() {
  // Hide confirmation page first
  const confirmPage = document.getElementById('confirmationPage');
  if (confirmPage) confirmPage.style.display = 'none';
  
  // Show account page
  const page = document.getElementById('accountPage');
  if (!page) return;
  
  loadMockOrderHistory();
  page.style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleAccountEsc);
}

function closeAccountPage() {
  const page = document.getElementById('accountPage');
  if (!page) {
    console.error('accountPage element not found');
    return;
  }
  
  // Force hide the page
  page.style.display = 'none';
  page.style.visibility = 'hidden';
  page.style.pointerEvents = 'none';
  
  // Restore body scrolling
  document.body.style.overflow = '';
  document.body.style.overflowY = '';
  
  // Remove event listener
  document.removeEventListener('keydown', handleAccountEsc);
  
  // Force scroll to top
  window.scrollTo(0, 0);
  
  console.log('Account page closed');
}

function handleAccountEsc(e) {
  if (e.key === 'Escape') closeAccountPage();
}

// Initialize page handlers
document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.querySelector('[aria-label="Cart"]');
  if (cartBtn) cartBtn.onclick = () => openCartPage();
  
  // Close buttons
  document.querySelectorAll('[onclick*="close"]').forEach(btn => {
    // Already handled by onclick attributes
  });
});
