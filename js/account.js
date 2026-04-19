/* Ninetynine - Account & Order History */



function openAccountPage() {
  const history = JSON.parse(localStorage.getItem('nn_order_history') || '[]');
  const listEl = document.getElementById('orderHistoryList');
  const emptyEl = document.getElementById('accountEmpty');

  if (history.length === 0) {
    emptyEl.style.display = 'block';
    listEl.style.display = 'none';
  } else {
    emptyEl.style.display = 'none';
    listEl.style.display = 'flex';
    listEl.innerHTML = history.map((order, idx) => `
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,0.05);">
        <div style="padding:12px 16px;border-bottom:1px solid #f5f5f5;display:flex;align-items:center;justify-content:space-between;">
          <div>
            <p style="font-family:'DM Sans',sans-serif;font-size:10px;color:#888;margin:0 0 2px;">${order.orderDate}</p>
            <p style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#111;margin:0;letter-spacing:0.06em;">${order.orderId}</p>
          </div>
          <span style="background:#e8f5e9;color:#2e7d32;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:600;padding:4px 10px;border-radius:20px;">${order.status||'Dibayar'}</span>
        </div>
        <div style="padding:12px 16px;">
          ${order.items.slice(0,2).map(item => `
            <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px;">
              <div style="width:44px;min-width:44px;aspect-ratio:3/4;border-radius:6px;overflow:hidden;background:#f5f5f5;">
                <img src="${item.img}" style="width:100%;height:100%;object-fit:cover;object-position:center top;">
              </div>
              <div style="flex:1;min-width:0;">
                <p style="font-family:'Playfair Display',serif;font-size:13px;color:#111;margin:0 0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</p>
                <p style="font-family:'DM Sans',sans-serif;font-size:11px;color:#999;margin:0;">All Size · ${item.color||'—'} · ×${item.qty}</p>
              </div>
              <p style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#D84040;margin:0;white-space:nowrap;">${item.price}</p>
            </div>
          `).join('')}
          ${order.items.length > 2 ? `<p style="font-family:'DM Sans',sans-serif;font-size:11px;color:#888;margin:4px 0 0;">+${order.items.length-2} produk lainnya</p>` : ''}
        </div>
        <div style="padding:10px 16px;border-top:1px solid #f5f5f5;display:flex;align-items:center;justify-content:space-between;">
          <span style="font-family:'DM Sans',sans-serif;font-size:12px;color:#888;">Total Bayar</span>
          <span style="font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;color:#D84040;">IDR ${order.subtotal.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `).join('');
  }

  const page = document.getElementById('accountPage');
  page.style.display = 'block';
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeAccountPage() {
  document.getElementById('accountPage').style.display = 'none';
  document.body.style.overflow = '';
}

function clearOrderHistory() {
  if (!confirm('Hapus semua riwayat pembelian?')) return;
  localStorage.removeItem('nn_order_history');
  updateAccountBadge();
  openAccountPage();
}

