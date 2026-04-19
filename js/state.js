/* ============================================================
   Ninetynine — Shared State (load FIRST after config.js)
   ============================================================ */

let cart     = JSON.parse(localStorage.getItem('nn_cart')     || '[]');
let wishlist = JSON.parse(localStorage.getItem('nn_wishlist') || '[]');
let currentProduct   = null;
let selectedColor    = null;
let selectedShipping = 'JNE';
let currentQty       = 1;
let _cartShipping    = 'JNE Regular';
let _payTimerInterval= null;

function saveCart() {
  localStorage.setItem('nn_cart', JSON.stringify(cart));
  updateCartBadges();
}
function saveWishlist() {
  localStorage.setItem('nn_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

function updateCartBadges() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.nav-icon-btn[aria-label="Cart"]').forEach(btn => {
    btn.style.position = 'relative';
    let b = btn.querySelector('.cart-badge');
    if (total > 0) {
      if (!b) {
        b = document.createElement('span');
        b.className = 'cart-badge';
        b.style.cssText = 'position:absolute;top:0;right:0;background:#B85252;color:#fff;border-radius:50%;width:16px;height:16px;font-size:9px;font-family:DM Sans,sans-serif;display:flex;align-items:center;justify-content:center;font-weight:600;pointer-events:none;';
        btn.appendChild(b);
      }
      b.textContent = total > 9 ? '9+' : total;
    } else { if (b) b.remove(); }
  });
}

function updateWishlistBadge() {
  const btn = document.getElementById('navWishlistBtn');
  if (!btn) return;
  let b = btn.querySelector('.wishlist-badge');
  if (wishlist.length > 0) {
    if (!b) {
      b = document.createElement('span');
      b.className = 'wishlist-badge';
      b.style.cssText = 'position:absolute;top:2px;right:2px;width:16px;height:16px;background:#B85252;color:#fff;border-radius:50%;font-size:9px;font-family:DM Sans,sans-serif;display:flex;align-items:center;justify-content:center;font-weight:600;pointer-events:none;';
      btn.style.position = 'relative';
      btn.appendChild(b);
    }
    b.textContent = wishlist.length > 9 ? '9+' : wishlist.length;
  } else { if (b) b.remove(); }
}

function updateAccountBadge() {
  const history = JSON.parse(localStorage.getItem('nn_order_history') || '[]');
  document.querySelectorAll('.nav-icon-btn[aria-label="Account"]').forEach(btn => {
    btn.style.position = 'relative';
    let b = btn.querySelector('.account-badge');
    if (history.length > 0) {
      if (!b) {
        b = document.createElement('span');
        b.className = 'account-badge';
        b.style.cssText = 'position:absolute;top:0;right:0;background:#D84040;color:#fff;border-radius:50%;width:16px;height:16px;font-size:9px;font-family:DM Sans,sans-serif;display:flex;align-items:center;justify-content:center;font-weight:600;pointer-events:none;';
        btn.appendChild(b);
      }
      b.textContent = history.length > 9 ? '9+' : history.length;
    } else { if (b) b.remove(); }
  });
}
