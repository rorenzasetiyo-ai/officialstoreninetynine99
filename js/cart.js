function updateCartBadges() {
  const total = AppState.cart.reduce((s,i) => s + i.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    if (total > 0) {
      badge.textContent = total > 9 ? '9+' : total;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
  const pdBadge = document.getElementById('pdCartBadge');
  if (pdBadge) {
    if (total > 0) {
      pdBadge.textContent = total > 9 ? '9+' : total;
      pdBadge.style.display = 'flex';
    } else {
      pdBadge.style.display = 'none';
    }
  }
}

function saveCart() {
  localStorage.setItem('nn_cart', JSON.stringify(AppState.cart));
  updateCartBadges();
}

function showToast(msg, ok) {
  const t = document.getElementById('pdToast');
  if (t) {
    t.textContent = msg;
    t.style.display = 'block';
    t.style.background = ok !== false ? '#f0faf4' : '#fff5f5';
    t.style.borderColor = ok !== false ? '#b2dfcb' : '#f5c6c6';
    t.style.color = ok !== false ? '#2d7a4f' : '#b00020';
    setTimeout(() => t.style.display = 'none', 3000);
  }
}
function renderCart() {
const itemsWrap = document.getElementById('cartItems');
const emptyEl   = document.getElementById('cartEmpty');
const summaryEl = document.getElementById('cartSummary');
const countEl   = document.getElementById('cartItemCount');
const listEl    = document.getElementById('cartProductList');
if (!listEl) return;
const total = AppState.cart.reduce((s,i) => s + i.qty, 0);
if (countEl) countEl.textContent = total > 0 ? `(${total} item)` : '';
if (AppState.cart.length === 0) {
if (emptyEl) emptyEl.style.display = 'block';
if (itemsWrap) itemsWrap.style.display = 'none';
if (summaryEl) summaryEl.style.display = 'none';
return;
}
if (emptyEl) emptyEl.style.display = 'none';
if (itemsWrap) itemsWrap.style.display = 'flex';
if (summaryEl) summaryEl.style.display = 'block';
listEl.innerHTML = AppState.cart.map((item, idx) => `
<div style="padding:14px 16px;border-bottom:1px solid #f8f8f8;display:flex;gap:12px;align-items:flex-start;">
<input type="checkbox" data-idx="${idx}" ${item.checked !== false ? 'checked' : ''} onchange="updateCartSelection()" style="margin-top:8px;width:18px;height:18px;flex-shrink:0;accent-color:#D84040;cursor:pointer;">
<div style="width:70px;min-width:70px;aspect-ratio:3/4;border-radius:6px;overflow:hidden;background:#f5f5f5;">
<img src="${item.img}" style="width:100%;height:100%;object-fit:cover;">
</div>
<div style="flex:1;min-width:0;">
<p style="font-family:'Playfair Display',serif;font-size:13px;color:#111;margin:0 0 4px;">${item.name}</p>
<p style="font-family:'DM Sans',sans-serif;font-size:11px;color:#666;margin:0 0 6px;">${item.series || 'N/A'}</p>
<p style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#D84040;margin:0 0 8px;">${item.price}</p>
<div style="display:flex;align-items:center;border:1px solid #e0e0e0;border-radius:6px;width:fit-content;">
<button onclick="updateCartQty(${idx}, -1)" style="background:#fafafa;border:none;width:28px;height:28px;cursor:pointer;font-size:14px;color:#555;display:flex;align-items:center;justify-content:center;transition:background 0.2s;" onmouseover="this.style.background='#f0f0f0'" onmouseout="this.style.background='#fafafa'">−</button>
<span style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;width:28px;text-align:center;color:#111;">${item.qty || 1}</span>
<button onclick="updateCartQty(${idx}, 1)" style="background:#fafafa;border:none;width:28px;height:28px;cursor:pointer;font-size:14px;color:#555;display:flex;align-items:center;justify-content:center;transition:background 0.2s;" onmouseover="this.style.background='#f0f0f0'" onmouseout="this.style.background='#fafafa'">+</button>
</div>
</div>
<button onclick="deleteFromCart(${idx})" style="background:none;border:none;cursor:pointer;color:#ccc;padding:4px;transition:color 0.2s;" onmouseover="this.style.color='#D84040'" onmouseout="this.style.color='#ccc'">
<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
</button>
</div>
`).join('');
updateCartSelection();
}
function updateCartSelection() {
const checks = document.querySelectorAll('#cartProductList input[type="checkbox"]');
let selected = 0;
checks.forEach(cb => {
const idx = parseInt(cb.dataset.idx);
if (AppState.cart[idx]) AppState.cart[idx].checked = cb.checked;
if (cb.checked) selected++;
});
saveCart();
}
function toggleSelectAll(checked) {
AppState.cart.forEach(item => item.checked = checked);
renderCart();
}
function updateCartQty(idx, delta) {
if (!AppState.cart[idx]) return;
AppState.cart[idx].qty = Math.max(1, (AppState.cart[idx].qty || 1) + delta);
saveCart();
renderCart();
}
function changeCartQty(idx, delta) {
updateCartQty(idx, delta);
}
function deleteFromCart(idx) {
AppState.cart.splice(idx, 1);
saveCart();
renderCart();
}
function deleteSelected() {
AppState.cart = AppState.cart.filter(i => i.checked === false);
saveCart();
renderCart();
}
function openCartPage() {
renderCart();
document.getElementById('cartPage').style.display = 'block';
document.body.style.overflow = 'hidden';
document.addEventListener('keydown', handleCartEsc);
}
function closeCartPage() {
document.getElementById('cartPage').style.display = 'none';
document.body.style.overflow = '';
document.removeEventListener('keydown', handleCartEsc);
}
function handleCartEsc(e) {
if (e.key === 'Escape') closeCartPage();
}
function proceedCheckout() {
const selected = AppState.cart.filter(i => i.checked !== false);
if (selected.length === 0) {
showToast('Pilih produk yang ingin di-checkout terlebih dahulu', false);
return;
}
window._checkoutItems = selected;
openCheckoutPageDirect(selected);
}
function addToCartFromGrid(btn) {
if (!btn) return;
const card = btn.closest('.product-card');
if (!card) return;
const id = btn.getAttribute('data-id');
const name = btn.getAttribute('data-name');
const series = btn.getAttribute('data-series');
const price = btn.getAttribute('data-price');
const imgEl = card.querySelector('img');
if (!id || !name) return;
const item = {
id: id,
name: name,
series: series || 'N/A',
price: price || '—',
size: 'All Size',
color: 'Default',
shipping: 'Standard',
qty: 1,
img: imgEl?.src || '',
checked: true
};
AppState.cart.push(item);
saveCart();
showToast('✓ Ditambahkan ke keranjang!');
}
