/* Ninetynine - Checkout, Payment & Orders */

function openCheckoutPageDirect(items) {
  window._checkoutItems = items;
  const summaryEl = document.getElementById('checkoutOrderSummary');
  let total = 0;
  summaryEl.innerHTML = '<div style="border-bottom:1px solid #f5f5f5;margin-bottom:10px;padding-bottom:10px;">' +
    items.map(item => {
      const n = parseInt((item.price||'0').replace(/[^0-9]/g,''));
      total += n * item.qty;
      return `<div style="display:flex;gap:10px;align-items:center;margin-bottom:8px;">
        <div style="width:44px;aspect-ratio:3/4;border-radius:6px;overflow:hidden;background:#f5f5f5;min-width:44px;">
          <img src="${item.img}" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
        </div>
        <div style="flex:1;min-width:0;">
          <p style="font-family:'Playfair Display',serif;font-size:13px;color:#111;margin:0 0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</p>
          <p style="font-family:'DM Sans',sans-serif;font-size:11px;color:#999;margin:0;">×${item.qty} · ${item.color||'—'}</p>
        </div>
        <p style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#D84040;margin:0;white-space:nowrap;">${item.price}</p>
      </div>`;
    }).join('') + '</div>' +
    `<div style="display:flex;justify-content:space-between;"><span style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;color:#111;">Total</span><span style="font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;color:#D84040;">IDR ${total.toLocaleString('id-ID')}</span></div>`;

  const coEmail = document.getElementById('pdEmail')?.value;
  if (coEmail) document.getElementById('coEmail').value = coEmail;

  document.getElementById('productDetailPage').style.display = 'none';
  const co = document.getElementById('checkoutPage');
  co.style.display = 'block';
  co.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeCheckoutPage() {
  document.getElementById('checkoutPage').style.display = 'none';
  if (window._checkoutItems && currentProduct) {
    document.getElementById('productDetailPage').style.display = 'block';
  } else {
    document.body.style.overflow = '';
  }
}

function goToPaymentStep() {
  const name    = document.getElementById('coName').value.trim();
  const email   = document.getElementById('coEmail').value.trim();
  const address = document.getElementById('coAddress').value.trim();
  if (!name)    { document.getElementById('coName').focus();    alert('Mohon isi nama lengkap.'); return; }
  if (!email)   { document.getElementById('coEmail').focus();   alert('Mohon isi email.'); return; }
  if (!address) { document.getElementById('coAddress').focus(); alert('Mohon isi alamat pengiriman.'); return; }

  const payment  = document.querySelector('input[name="payment"]:checked')?.value || 'BCA';
  const shipping = document.querySelector('input[name="coShipping"]:checked')?.value || 'JNE Regular';
  const phone    = document.getElementById('coPhone').value.trim();
  const items    = window._checkoutItems || cart.filter(i => i.checked !== false);

  let subtotal = 0;
  items.forEach(i => { const n = parseInt((i.price||'0').replace(/[^0-9]/g,'')); subtotal += n * i.qty; });

  const orderId   = 'NN' + Date.now().toString().slice(-8).toUpperCase();
  const orderDate = new Date().toLocaleDateString('id-ID',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const orderTime = new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});

  window._lastOrder = { orderId, name, email, phone, address, payment, shipping, items, subtotal, orderDate, orderTime };

  // Fill payment page
  document.getElementById('payTotalAmount').textContent = 'IDR ' + subtotal.toLocaleString('id-ID');
  document.getElementById('payOrderIdSmall').textContent = 'Order #' + orderId;

  const isQRIS = payment === 'QRIS';
  document.getElementById('vaSection').style.display  = isQRIS ? 'none' : 'block';
  document.getElementById('qrisSection').style.display = isQRIS ? 'block' : 'none';

  if (!isQRIS) {
    const isBCA = payment === 'BCA';
    const vaNum = (isBCA ? '00816' : '89500') + Math.floor(Math.random()*1e10).toString().padStart(10,'0');
    document.getElementById('vaNumber').textContent = vaNum.slice(0,5)+' '+vaNum.slice(5,10)+' '+vaNum.slice(10);
    document.getElementById('payBankLogo').textContent  = isBCA ? 'BCA' : 'MDR';
    document.getElementById('payBankLogo').style.background = isBCA ? '#005BAC' : '#003F88';
    document.getElementById('payBankName').textContent  = isBCA ? 'BCA' : 'Mandiri';
  } else {
    setTimeout(() => drawQRIS('qrisCanvas'), 100);
  }

  startPayTimer(24 * 60 * 60); // 24 jam
  document.getElementById('paymentPage').style.display = 'block';
  document.getElementById('paymentPage').scrollTop = 0;
}

function closePaymentPage() {
  document.getElementById('paymentPage').style.display = 'none';
  clearInterval(_payTimerInterval);
}

function startPayTimer(seconds) {
  clearInterval(_payTimerInterval);
  let remaining = seconds;
  const el = document.getElementById('payTimer');
  function tick() {
    const m = Math.floor(remaining / 60).toString().padStart(2,'0');
    const s = (remaining % 60).toString().padStart(2,'0');
    if (el) el.textContent = m + ':' + s;
    if (remaining <= 0) { clearInterval(_payTimerInterval); if(el) el.textContent = 'EXPIRED'; }
    remaining--;
  }
  tick();
  _payTimerInterval = setInterval(tick, 1000);
}

function drawQRIS(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = 196;
  const cell = 7;
  const cols = Math.floor(size / cell);
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#111';
  // Seed-based pattern
  const seed = Date.now();
  for (let r = 0; r < cols; r++) {
    for (let c = 0; c < cols; c++) {
      const corner = (r < 7 && c < 7) || (r < 7 && c > cols-8) || (r > cols-8 && c < 7);
      if (corner) { ctx.fillRect(c*cell, r*cell, cell, cell); continue; }
      const hash = ((r * 31 + c) * 1234567 + seed) % 100;
      if (hash < 45) ctx.fillRect(c*cell, r*cell, cell, cell);
    }
  }
  // Corner squares (finder patterns)
  [[0,0],[0,cols-7],[cols-7,0]].forEach(([r,c]) => {
    ctx.clearRect(c*cell, r*cell, 7*cell, 7*cell);
    ctx.fillStyle = '#111';
    ctx.fillRect(c*cell, r*cell, 7*cell, 7*cell);
    ctx.fillStyle = '#fff';
    ctx.fillRect((c+1)*cell, (r+1)*cell, 5*cell, 5*cell);
    ctx.fillStyle = '#111';
    ctx.fillRect((c+2)*cell, (r+2)*cell, 3*cell, 3*cell);
  });
}

function copyVA() {
  const va = document.getElementById('vaNumber').textContent;
  navigator.clipboard.writeText(va.replace(/\s/g,'')).then(() => {
    const btn = document.getElementById('copyVABtn');
    btn.textContent = '✓ Tersalin!'; btn.style.background = '#2e7d32';
    setTimeout(() => { btn.textContent = 'Salin'; btn.style.background = '#111'; }, 2000);
  });
}

function confirmPayment() {
  clearInterval(_payTimerInterval);
  const order = window._lastOrder;
  if (!order) return;

  // Save to order history
  let history = JSON.parse(localStorage.getItem('nn_order_history') || '[]');
  history.unshift({ ...order, status: 'Dibayar', savedAt: new Date().toISOString() });
  localStorage.setItem('nn_order_history', JSON.stringify(history));

  // Clear cart
  if (!window._checkoutItems) { cart = []; saveCart(); }
  window._checkoutItems = null;

  // Update account badge
  updateAccountBadge();

  // Hide checkout and payment
  document.getElementById('checkoutPage').style.display  = 'none';
  document.getElementById('paymentPage').style.display   = 'none';
  document.getElementById('cartPage').style.display      = 'none';
  document.getElementById('productDetailPage').style.display = 'none';

  // Show confirmation
  openConfirmationPage(order);
  sendConfirmationEmail(order);
}

function openConfirmationPage(order) {
  document.getElementById('confOrderId').textContent   = order.orderId;
  document.getElementById('confDateTime').textContent  = order.orderDate + ', ' + order.orderTime;
  document.getElementById('confName').textContent      = order.name;
  document.getElementById('confPhone').textContent     = order.phone || '—';
  document.getElementById('confAddress').textContent   = order.address;
  document.getElementById('confShipping').textContent  = order.shipping;
  document.getElementById('confPayment').textContent   = order.payment + ' Transfer';

  const listEl = document.getElementById('confProductList');
  listEl.innerHTML = order.items.map(item => `
    <div style="display:flex;gap:12px;padding:14px 16px;border-bottom:1px solid #f8f8f8;align-items:flex-start;">
      <div style="width:64px;min-width:64px;aspect-ratio:3/4;border-radius:8px;overflow:hidden;background:#f5f5f5;">
        <img src="${item.img}" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
      </div>
      <div style="flex:1;">
        <p style="font-family:'DM Sans',sans-serif;font-size:9px;color:#aaa;margin:0 0 2px;text-transform:uppercase;letter-spacing:0.12em;">${item.series}</p>
        <p style="font-family:'Playfair Display',serif;font-size:14px;color:#111;margin:0 0 4px;">${item.name}</p>
        <p style="font-family:'DM Sans',sans-serif;font-size:11px;color:#999;margin:0 0 6px;">All Size · ${item.color||'—'} · Qty: ${item.qty}</p>
        <p style="font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;color:#D84040;margin:0;">${item.price}</p>
      </div>
    </div>
  `).join('');

  const priceEl = document.getElementById('confPriceSummary');
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
    </div>`;

  document.getElementById('emailSendingNotice').style.display = 'block';
  document.getElementById('emailSentNotice').style.display = 'none';

  const page = document.getElementById('confirmationPage');
  page.style.display = 'block';
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeConfirmationPage() {
  document.getElementById('confirmationPage').style.display = 'none';
  document.body.style.overflow = '';
}

function sendConfirmationEmail(order) {
  const itemsText = order.items.map(i => `• ${i.name} ×${i.qty} — ${i.price}`).join('\n');
  const params = {
    to_email: order.email, to_name: order.name,
    order_id: order.orderId, order_date: order.orderDate + ', ' + order.orderTime,
    order_items: itemsText, subtotal: 'IDR ' + order.subtotal.toLocaleString('id-ID'),
    payment: order.payment, shipping: order.shipping, address: order.address,
  };
  if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') { showEmailStatus(false, order.email); return; }
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(() => showEmailStatus(true, order.email))
      .catch(() => showEmailStatus(false, order.email));
  } else { showEmailStatus(false, order.email); }
}

function showEmailStatus(ok, email) {
  document.getElementById('emailSendingNotice').style.display = 'none';
  const el = document.getElementById('emailSentNotice');
  el.style.display = 'block';
  if (ok) {
    el.style.background = '#e8f5e9';
    document.getElementById('emailSentText').style.color = '#2e7d32';
    document.getElementById('emailSentText').innerHTML = '📧 Konfirmasi dikirim ke <strong>' + email + '</strong>';
  } else {
    el.style.background = '#fff3e0';
    document.getElementById('emailSentText').style.color = '#e65100';
    document.getElementById('emailSentText').innerHTML = '⚠️ Email tidak terkirim otomatis. Simpan halaman ini sebagai bukti pesanan.';
  }
}

function hlShip(el) {
  document.querySelectorAll('[id^="cship-"]').forEach(l => l.style.borderColor = '#e8e8e8');
  el.style.borderColor = '#111';
}

function hlPay(el) {
  document.querySelectorAll('[id^="pay-"]').forEach(l => l.style.borderColor = '#e8e8e8');
  el.style.borderColor = '#111';
}

