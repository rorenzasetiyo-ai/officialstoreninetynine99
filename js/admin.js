// ════════════════════════════════════════════════════════════════════════════
// NINETYNINE ADMIN DASHBOARD
// Content Management System - Edit all website content without coding
// ════════════════════════════════════════════════════════════════════════════

const ADMIN_STORAGE_KEY = 'ninetynine_admin_data';

// Default configuration structure
const DEFAULT_ADMIN_DATA = {
  hero: {
    title: 'Elevate Your Style',
    subtitle: 'Discover premium fashion that defines your story',
    btnPrimary: 'Shop Collection',
    btnSecondary: 'Explore',
    bgImage: 'images/img-1.jpg'
  },
  collection: {
    title: 'Our Collection',
    description: 'Carefully curated pieces that blend timeless elegance with contemporary design.'
  },
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#666666'
  },
  products: [],
  stores: []
};

// ════════════════════════════════════════════════════════════════════════════
// STORAGE & DATA MANAGEMENT
// ════════════════════════════════════════════════════════════════════════════

function getAdminData() {
  const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing admin data:', e);
      return DEFAULT_ADMIN_DATA;
    }
  }
  return DEFAULT_ADMIN_DATA;
}

function saveAdminData(data) {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
  showMessage(i18n.dataSaved, 'success');
}

function showMessage(text, type = 'success') {
  const messageBox = document.getElementById('messageBox');
  const className = type === 'success' ? 'success-msg' : 'error-msg';
  messageBox.innerHTML = `<div class="${className}">${text}</div>`;
  setTimeout(() => {
    messageBox.innerHTML = '';
  }, 4000);
}

// Translations
const i18n = {
  dataSaved: '✅ Data berhasil disimpan!',
  dataRestored: '✅ Data berhasil dipulihkan! Memuat ulang...',
  dataCopied: '✅ JSON disalin ke papan klip!',
  dataDownloaded: '✅ JSON telah diunduh!',
  dataImported: '✅ JSON berhasil diimpor! Memuat ulang...',
  invalidJSON: '❌ Format JSON tidak valid!',
  confirmDelete: 'Apakah Anda yakin ingin menghapus item ini?',
  confirmReset: 'Apakah Anda yakin? Ini akan mengembalikan semua perubahan ke nilai default.',
  resetSuccess: '✅ Setel ulang ke default! Memuat ulang...',
  backupDownloaded: '✅ Cadangan berhasil diunduh!',
  noProducts: 'Belum ada produk. Klik "Tambah Produk Baru" untuk membuat satu.',
  noStores: 'Belum ada toko.',
  adminConsole: '✓ Admin Integration Bridge loaded'
};

// ════════════════════════════════════════════════════════════════════════════
// TABS MANAGEMENT
// ════════════════════════════════════════════════════════════════════════════

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');

      // Remove active from all tabs and contents
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      // Add active to clicked tab
      btn.classList.add('active');
      document.getElementById(tabName).classList.add('active');
    });
  });
}

// ════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ════════════════════════════════════════════════════════════════════════════

function initHeroTab() {
  const data = getAdminData();

  document.getElementById('heroTitle').value = data.hero.title;
  document.getElementById('heroSubtitle').value = data.hero.subtitle;
  document.getElementById('heroBtnPrimary').value = data.hero.btnPrimary;
  document.getElementById('heroBtnSecondary').value = data.hero.btnSecondary;
  document.getElementById('heroBgImage').value = data.hero.bgImage;

  updateHeroPreview();

  document.getElementById('saveHeroBtn').addEventListener('click', () => {
    const updatedData = getAdminData();
    updatedData.hero = {
      title: document.getElementById('heroTitle').value,
      subtitle: document.getElementById('heroSubtitle').value,
      btnPrimary: document.getElementById('heroBtnPrimary').value,
      btnSecondary: document.getElementById('heroBtnSecondary').value,
      bgImage: document.getElementById('heroBgImage').value
    };
    saveAdminData(updatedData);
    updateHeroPreview();
  });

  // Live preview
  document.getElementById('heroTitle').addEventListener('input', updateHeroPreview);
  document.getElementById('heroSubtitle').addEventListener('input', updateHeroPreview);
  document.getElementById('heroBtnPrimary').addEventListener('input', updateHeroPreview);
  document.getElementById('heroBtnSecondary').addEventListener('input', updateHeroPreview);
}

function updateHeroPreview() {
  document.getElementById('previewHeroTitle').textContent = document.getElementById('heroTitle').value || '(empty)';
  document.getElementById('previewHeroSubtitle').textContent = document.getElementById('heroSubtitle').value || '(empty)';
  document.getElementById('previewHeroBtnPrimary').textContent = document.getElementById('heroBtnPrimary').value || '(empty)';
  document.getElementById('previewHeroBtnSecondary').textContent = document.getElementById('heroBtnSecondary').value || '(empty)';
}

// ════════════════════════════════════════════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════════════════════════════════════════════

let editingProductIndex = null;

function initProductsTab() {
  renderProductsList();

  document.getElementById('addProductBtn').addEventListener('click', () => {
    editingProductIndex = null;
    openProductModal({
      name: '',
      price: 0,
      description: '',
      imgMainId: '',
      colors: [],
      series: ''
    });
  });
}

function renderProductsList() {
  const data = getAdminData();
  const list = document.getElementById('productsList');

  if (!data.products || data.products.length === 0) {
    list.innerHTML = `<p style="color: #999;">${i18n.noProducts}</p>`;
    return;
  }

  list.innerHTML = data.products.map((product, idx) => `
    <div class="product-item">
      <div class="product-item-header">
        <div>
          <h4>${product.name || 'Unnamed'}</h4>
          <p style="font-size: 0.9rem; color: #999;">Rp ${product.price?.toLocaleString('id-ID') || '0'}</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-small edit" onclick="editProduct(${idx})">Edit</button>
          <button class="btn-small delete" onclick="deleteProduct(${idx})">Hapus</button>
        </div>
      </div>
      <p style="font-size: 0.85rem; color: #bbb;">${product.description || 'Tidak ada deskripsi'}</p>
      <p style="font-size: 0.8rem; color: #888;">Gambar: ${product.imgMainId || 'N/A'} | Warna: ${(product.colors || []).join(', ') || 'N/A'}</p>
    </div>
  `).join('');
}

function editProduct(idx) {
  const data = getAdminData();
  editingProductIndex = idx;
  openProductModal(data.products[idx]);
}

function deleteProduct(idx) {
  if (confirm(i18n.confirmDelete)) {
    const data = getAdminData();
    data.products.splice(idx, 1);
    saveAdminData(data);
    renderProductsList();
  }
}

function openProductModal(product) {
  document.getElementById('modalProductName').value = product.name || '';
  document.getElementById('modalProductPrice').value = product.price || 0;
  document.getElementById('modalProductDesc').value = product.description || '';
  document.getElementById('modalProductImg').value = product.imgMainId || '';
  document.getElementById('modalProductColors').value = (product.colors || []).join(', ');
  document.getElementById('modalProductSeries').value = product.series || '';

  document.getElementById('productModal').classList.add('active');
}

function initProductModal() {
  document.getElementById('closeProductModalBtn').addEventListener('click', () => {
    document.getElementById('productModal').classList.remove('active');
  });

  document.getElementById('saveProductModalBtn').addEventListener('click', () => {
    const data = getAdminData();
    const product = {
      name: document.getElementById('modalProductName').value,
      price: parseFloat(document.getElementById('modalProductPrice').value) || 0,
      description: document.getElementById('modalProductDesc').value,
      imgMainId: document.getElementById('modalProductImg').value,
      colors: document.getElementById('modalProductColors').value.split(',').map(c => c.trim()).filter(c => c),
      series: document.getElementById('modalProductSeries').value
    };

    if (editingProductIndex !== null) {
      data.products[editingProductIndex] = product;
    } else {
      data.products.push(product);
    }

    saveAdminData(data);
    renderProductsList();
    document.getElementById('productModal').classList.remove('active');
    editingProductIndex = null;
  });

  // Close on background click
  document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
      document.getElementById('productModal').classList.remove('active');
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// STORES
// ════════════════════════════════════════════════════════════════════════════

function initStoresTab() {
  renderStoresList();

  document.getElementById('addStoreBtn').addEventListener('click', () => {
    const data = getAdminData();
    if (!data.stores) data.stores = [];
    data.stores.push({
      name: 'New Store',
      address: '',
      phone: '',
      hours: '',
      city: ''
    });
    saveAdminData(data);
    renderStoresList();
  });
}

function renderStoresList() {
  const data = getAdminData();
  const list = document.getElementById('storesList');

  if (!data.stores || data.stores.length === 0) {
    list.innerHTML = `<p style="color: #999;">${i18n.noStores}</p>`;
    return;
  }

  list.innerHTML = data.stores.map((store, idx) => `
    <div class="form-section" style="border-left: 3px solid #666;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
        <h4>${store.name}</h4>
        <button class="btn-small delete" onclick="deleteStore(${idx})">Hapus</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Nama Toko</label>
          <input type="text" value="${store.name}" onchange="updateStore(${idx}, 'name', this.value)">
        </div>
        <div class="form-group">
          <label>Kota</label>
          <input type="text" value="${store.city || ''}" onchange="updateStore(${idx}, 'city', this.value)">
        </div>
      </div>
      <div class="form-group">
        <label>Alamat</label>
        <input type="text" value="${store.address || ''}" onchange="updateStore(${idx}, 'address', this.value)">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Telepon</label>
          <input type="text" value="${store.phone || ''}" onchange="updateStore(${idx}, 'phone', this.value)">
        </div>
        <div class="form-group">
          <label>Jam Operasional</label>
          <input type="text" value="${store.hours || ''}" onchange="updateStore(${idx}, 'hours', this.value)">
        </div>
      </div>
    </div>
  `).join('');
}

function updateStore(idx, field, value) {
  const data = getAdminData();
  data.stores[idx][field] = value;
  saveAdminData(data);
}

function deleteStore(idx) {
  if (confirm(i18n.confirmDelete)) {
    const data = getAdminData();
    data.stores.splice(idx, 1);
    saveAdminData(data);
    renderStoresList();
  }
}

// ════════════════════════════════════════════════════════════════════════════
// COLLECTION
// ════════════════════════════════════════════════════════════════════════════

function initCollectionTab() {
  const data = getAdminData();

  document.getElementById('collectionTitle').value = data.collection.title;
  document.getElementById('collectionDesc').value = data.collection.description;

  document.getElementById('saveCollectionBtn').addEventListener('click', () => {
    const updatedData = getAdminData();
    updatedData.collection = {
      title: document.getElementById('collectionTitle').value,
      description: document.getElementById('collectionDesc').value
    };
    saveAdminData(updatedData);
  });
}

// ════════════════════════════════════════════════════════════════════════════
// COLORS & DESIGN
// ════════════════════════════════════════════════════════════════════════════

function initColorsTab() {
  const data = getAdminData();

  // Initialize color inputs
  const colors = {
    primary: data.colors.primary,
    secondary: data.colors.secondary,
    accent: data.colors.accent
  };

  Object.keys(colors).forEach(key => {
    const colorValue = colors[key];
    document.getElementById('color' + key.charAt(0).toUpperCase() + key.slice(1)).value = colorValue;
    document.getElementById('color' + key.charAt(0).toUpperCase() + key.slice(1) + 'Hex').value = colorValue;
    document.getElementById('color' + key.charAt(0).toUpperCase() + key.slice(1) + 'Preview').style.backgroundColor = colorValue;

    // Sync color input with hex input
    const colorInput = document.getElementById('color' + key.charAt(0).toUpperCase() + key.slice(1));
    const hexInput = document.getElementById('color' + key.charAt(0).toUpperCase() + key.slice(1) + 'Hex');
    const preview = document.getElementById('color' + key.charAt(0).toUpperCase() + key.slice(1) + 'Preview');

    colorInput.addEventListener('input', (e) => {
      hexInput.value = e.target.value;
      preview.style.backgroundColor = e.target.value;
    });

    hexInput.addEventListener('input', (e) => {
      if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
        colorInput.value = e.target.value;
        preview.style.backgroundColor = e.target.value;
      }
    });
  });

  document.getElementById('saveColorsBtn').addEventListener('click', () => {
    const updatedData = getAdminData();
    updatedData.colors = {
      primary: document.getElementById('colorPrimary').value,
      secondary: document.getElementById('colorSecondary').value,
      accent: document.getElementById('colorAccent').value
    };
    saveAdminData(updatedData);

    // Apply colors to admin panel and main site (if accessible)
    applyColors(updatedData.colors);
  });
}

function applyColors(colors) {
  // This can be extended to dynamically apply colors to the main website
  const css = `
    :root {
      --color-primary: ${colors.primary};
      --color-secondary: ${colors.secondary};
      --color-accent: ${colors.accent};
    }
  `;
  let style = document.getElementById('dynamic-colors');
  if (!style) {
    style = document.createElement('style');
    style.id = 'dynamic-colors';
    document.head.appendChild(style);
  }
  style.textContent = css;
}

// ════════════════════════════════════════════════════════════════════════════
// STATISTICS
// ════════════════════════════════════════════════════════════════════════════

function updateStats() {
  const data = getAdminData();
  document.getElementById('statsProducts').textContent = (data.products || []).length;
  document.getElementById('statsStores').textContent = (data.stores || []).length;

  const jsonString = JSON.stringify(data);
  const sizeKB = (jsonString.length / 1024).toFixed(2);
  document.getElementById('statsSize').textContent = sizeKB + ' KB';

  document.getElementById('jsonData').value = JSON.stringify(data, null, 2);
}

// ════════════════════════════════════════════════════════════════════════════
// BACKUP & RESTORE
// ════════════════════════════════════════════════════════════════════════════

function initBackupRestore() {
  // Backup
  document.getElementById('backupBtn').addEventListener('click', () => {
    const data = getAdminData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ninetynine-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showMessage(i18n.backupDownloaded, 'success');
  });

  // Restore
  document.getElementById('restoreBtn').addEventListener('click', () => {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
        showMessage(i18n.dataRestored, 'success');
        setTimeout(() => location.reload(), 1500);
      } catch (error) {
        showMessage(i18n.invalidJSON, 'error');
      }
    };
    reader.readAsText(file);
  });

  // Reset to default
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm(i18n.confirmReset)) {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(DEFAULT_ADMIN_DATA));
      showMessage(i18n.resetSuccess, 'success');
      setTimeout(() => location.reload(), 1500);
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// JSON EXPORT/IMPORT
// ════════════════════════════════════════════════════════════════════════════

function initJsonControls() {
  document.getElementById('copyJsonBtn').addEventListener('click', () => {
    const json = document.getElementById('jsonData').value;
    navigator.clipboard.writeText(json).then(() => {
      showMessage(i18n.dataCopied, 'success');
    });
  });

  document.getElementById('downloadJsonBtn').addEventListener('click', () => {
    const data = getAdminData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ninetynine-data.json`;
    a.click();
    URL.revokeObjectURL(url);
    showMessage(i18n.dataDownloaded, 'success');
  });

  document.getElementById('importJsonBtn').addEventListener('click', () => {
    const json = document.getElementById('jsonData').value;
    try {
      const data = JSON.parse(json);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
      showMessage(i18n.dataImported, 'success');
      setTimeout(() => location.reload(), 1500);
    } catch (error) {
      showMessage(i18n.invalidJSON, 'error');
    }
  });
}

// ════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initHeroTab();
  initProductsTab();
  initStoresTab();
  initCollectionTab();
  initColorsTab();
  initProductModal();
  initBackupRestore();
  initJsonControls();
  updateStats();

  // Apply saved colors
  const data = getAdminData();
  applyColors(data.colors);
});
