// ═══════════════════════════════════════════════════
// GLOBAL STATE - Initialize first
// ═══════════════════════════════════════════════════
const AppState = {
  currentProduct: null,
  currentQty: 1,
  selectedSize: 'All Size',
  selectedColor: null,
  selectedShipping: 'JNE',
  cart: [],
  wishlist: [],
  lastOrder: null,
  checkoutItems: null,
  activeVoucher: null,
  cartShipping: 'JNE Regular',
  payTimerInterval: null
};

// Product Catalog
const PRODUCT_CATALOG = [
  { id:'prod_0',  series:"Code SESTRA 5050 Oneseat", name:"Siderope Flowbordir",         price:"IDR 128.000", imgMainId:"catalog-main-0",  imgHoverId:"catalog-hover-0",  colors:[{name:"Cream",hex:"#F0EDE4"},{name:"Black",hex:"#2B2B2B"}],                                                description:"Oneset flowbordir dengan siluet elegan. Material lembut dan nyaman untuk aktivitas harian maupun acara spesial.", material:"Crepe Bordir" },
  { id:'prod_1',  series:"Code DRLFY 6080",          name:"Cream Bordir Dress",           price:"IDR 189.000", imgMainId:"catalog-main-1",  imgHoverId:"catalog-hover-1",  colors:[{name:"Cream",hex:"#F5F0E8"}],                                                                             description:"Dress bordir cream yang feminin dan elegan. Potongan flowy yang nyaman dan cocok untuk berbagai kesempatan.", material:"Crepe Bordir" },
  { id:'prod_2',  series:"Code DRYN 6357",            name:"Seemivest Bordir Flow Dress",  price:"IDR 195.000", imgMainId:"catalog-main-2",  imgHoverId:"catalog-hover-2",  colors:[{name:"Brown",hex:"#7B5B44"},{name:"Cream",hex:"#F0EBE0"}],                                               description:"Seemivest dengan detail bordir cantik, flow dress yang anggun dan fleksibel.", material:"Crepe Bordir" },
  { id:'prod_3',  series:"Code TNVX 8307",            name:"3 Pocky Top",                  price:"IDR 165.000", imgMainId:"catalog-main-3",  imgHoverId:"catalog-hover-3",  colors:[{name:"Cream",hex:"#EDE8DC"},{name:"Olive",hex:"#8B8B6B"}],                                               description:"Top tiga saku dengan desain minimalis yang stylish. Material berkualitas dengan potongan nyaman.", material:"Linen Mix" },
  { id:'prod_4',  series:"Code TPSHRL 9157",          name:"Flowcolour Cream Blouse",      price:"IDR 128.000", imgMainId:"catalog-main-4",  imgHoverId:"catalog-hover-4",  colors:[{name:"Cream",hex:"#F5F0E6"},{name:"Blue",hex:"#B8C8D8"},{name:"White",hex:"#F8F8F8"}],                   description:"Blouse dengan warna-warna lembut yang memesona. Bahan crepe bordir premium.", material:"Crepe Bordir" },
  { id:'prod_5',  series:"Code DRJSW 00018",          name:"Flow Pearlbelt Dress",         price:"IDR 240.000", imgMainId:"catalog-main-5",  imgHoverId:"catalog-hover-5",  colors:[{name:"Cream",hex:"#F2EDE3"},{name:"Black",hex:"#2B2B2B"}],                                               description:"Dress elegant dengan pearl belt yang menjadi statement piece.", material:"Crepe Premium" },
  { id:'prod_6',  series:"Code DRYRI 9300",           name:"Twocolors Bordir Tunic",       price:"IDR 195.000", imgMainId:"catalog-main-6",  imgHoverId:"catalog-hover-6",  colors:[{name:"Cream",hex:"#F0EBE0"},{name:"Brown",hex:"#7B5544"}],                                               description:"Tunik dua warna bordir yang memadukan keindahan pattern dengan kenyamanan bahan.", material:"Crepe Bordir" },
  { id:'prod_7',  series:"Code DRGNT 00137",          name:"Flow Pattern Dress",           price:"IDR 185.000", imgMainId:"catalog-main-7",  imgHoverId:"catalog-hover-7",  colors:[{name:"Brown",hex:"#6B4C3A"},{name:"Khaki",hex:"#B5A07A"},{name:"Cream",hex:"#F0EBE0"}],                  description:"Dress dengan pattern bordir bunga yang cantik dan detail ruffled shoulder.", material:"Crepe Bordir" },
  { id:'prod_8',  series:"Code TPBAP 3178",           name:"Nudes Vinesbordir Tunic",      price:"IDR 146.000", imgMainId:"catalog-main-8",  imgHoverId:"catalog-hover-8",  colors:[{name:"Nude",hex:"#D4B89A"},{name:"Sage",hex:"#9FAF97"}],                                                description:"Tunik dengan bordir vines yang natural dan elegan.", material:"Crepe Bordir" },
  { id:'prod_9',  series:"Code TPMGR 00020",          name:"Flowlace Shirt",               price:"IDR 149.000", imgMainId:"catalog-main-9",  imgHoverId:"catalog-hover-9",  colors:[{name:"Cream",hex:"#F0EBE0"},{name:"Black",hex:"#2A2A2A"},{name:"Brown",hex:"#7B5544"},{name:"Navy",hex:"#374060"}], description:"Kemeja dengan detail lace yang cantik dan feminine.", material:"Linen Premium" },
  { id:'prod_10', series:"Code TVAVM 5069",           name:"Brukat Skirt",                 price:"IDR 139.000", imgMainId:"catalog-main-10", imgHoverId:"catalog-hover-10", colors:[{name:"Navy",hex:"#374060"},{name:"Black",hex:"#2A2A2A"}],                                                description:"Rok brukat elegan dengan siluet flowy yang feminin.", material:"Brukat" },
  { id:'prod_11', series:"Code DRYR 2979",            name:"Semiouter Flowdress",          price:"IDR 215.000", imgMainId:"catalog-main-11", imgHoverId:"catalog-hover-11", colors:[{name:"Cream",hex:"#F0EBE0"},{name:"Brown",hex:"#7B5544"},{name:"Black",hex:"#2A2A2A"}],                   description:"Semi outer flow dress yang serbaguna dan stylish.", material:"Chiffon Premium" },
];

// Initialize state from localStorage
function initializeState() {
  AppState.cart = JSON.parse(localStorage.getItem('nn_cart') || '[]');
  AppState.wishlist = JSON.parse(localStorage.getItem('nn_wishlist') || '[]');
}

// Helper functions
function el(id) { return document.getElementById(id); }
function formatPrice(price) { const num = parseInt((price || '0').replace(/[^0-9]/g, '')); return 'IDR ' + num.toLocaleString('id-ID'); }
function extractPrice(priceStr) { return parseInt((priceStr || '0').replace(/[^0-9]/g, '')); }

// Product Detail Page
function openProductDetail(productId) {
  const p = PRODUCT_CATALOG.find(x => x.id === productId);
  if (!p) return;
  
  AppState.currentProduct = p;
  AppState.currentQty = 1;
  AppState.selectedSize = 'All Size';
  AppState.selectedShipping = 'JNE';
  AppState.selectedColor = p.colors && p.colors.length > 0 ? p.colors[0].name : '—';

  el('pdSeries').textContent = p.series;
  el('pdName').textContent = p.name;
  el('pdPrice').textContent = p.price;
  el('pdDesc').textContent = p.description;
  el('pdMaterialVal').textContent = p.material;
  el('pdQty').textContent = '1';
  el('pdEmail').value = '';
  el('pdToast').style.display = 'none';

  const mainImgEl = el(p.imgMainId);
  const hoverImgEl = el(p.imgHoverId);
  const mainSrc = mainImgEl ? mainImgEl.src : '';
  const hoverSrc = hoverImgEl ? hoverImgEl.src : '';

  el('pdImg1').src = mainSrc;
  el('pdThumbImg1').src = mainSrc;
  el('pdThumbImg2').src = hoverSrc;
  el('pdThumb1').style.border = '2px solid #111';
  el('pdThumb2').style.border = '2px solid transparent';

  el('pdThumb1').onclick = () => {
    el('pdImg1').src = mainSrc;
    el('pdThumb1').style.border = '2px solid #111';
    el('pdThumb2').style.border = '2px solid transparent';
  };
  el('pdThumb2').onclick = () => {
    el('pdImg1').src = hoverSrc;
    el('pdThumb2').style.border = '2px solid #111';
    el('pdThumb1').style.border = '2px solid transparent';
  };

  const colorsEl = el('pdColors');
  const colorSection = el('pdColorSection');
  if (!p.colors || p.colors.length <= 1) {
    if (colorSection) colorSection.style.display = 'none';
  } else {
    if (colorSection) colorSection.style.display = 'block';
    colorsEl.innerHTML = p.colors.map((c, i) => {
      const isFirst = i === 0;
      const lightHexes = ['#F5F0E6','#F8F8F8','#F5F0E8','#F0EBE0','#F2EDE3','#F0EDE4','#EDE8DC'];
      const needBorder = lightHexes.includes(c.hex);
      return `<button onclick="selectColor(this,'${c.name}')" title="${c.name}" style="width:32px;height:32px;border-radius:50%;background:${c.hex};border:${isFirst ? '3px solid #111' : '2px solid '+(needBorder?'#ddd':'transparent')};outline:${isFirst ? '2px solid rgba(0,0,0,0.15)' : 'none'};outline-offset:2px;cursor:pointer;transition:all 0.2s;box-shadow:0 1px 6px rgba(0,0,0,0.14);"></button>`;
    }).join('');
  }

  const page = el('productDetailPage');
  page.style.display = 'block';
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  if (typeof updateCartBadges !== 'undefined') updateCartBadges();
}

function closeProductDetail() {
  el('productDetailPage').style.display = 'none';
  document.body.style.overflow = '';
}

// Handle product detail from category pages
function openProductDetailCategory(productId) {
  const p = getProductById(productId);
  if (!p) return;
  
  AppState.currentProduct = {
    id: p.id,
    name: p.name,
    series: p.series,
    price: p.price,
    description: p.description,
    material: p.material,
    colors: p.colors,
    image: p.image,
    category: p.category
  };
  AppState.currentQty = 1;
  AppState.selectedSize = 'All Size';
  AppState.selectedShipping = 'JNE';
  AppState.selectedColor = p.colors && p.colors.length > 0 ? p.colors[0].name : '—';

  el('pdSeries').textContent = p.series;
  el('pdName').textContent = p.name;
  el('pdPrice').textContent = p.price;
  el('pdDesc').textContent = p.description;
  el('pdMaterialVal').textContent = p.material;
  el('pdQty').textContent = '1';
  el('pdEmail').value = '';
  el('pdToast').style.display = 'none';

  // Set image from category product
  el('pdImg1').src = p.image;
  el('pdThumbImg1').src = p.image;
  el('pdThumbImg2').src = p.image;
  el('pdThumb1').style.border = '2px solid #111';
  el('pdThumb2').style.border = '2px solid transparent';

  el('pdThumb1').onclick = () => {
    el('pdImg1').src = p.image;
    el('pdThumb1').style.border = '2px solid #111';
    el('pdThumb2').style.border = '2px solid transparent';
  };
  el('pdThumb2').onclick = () => {
    el('pdImg1').src = p.image;
    el('pdThumb1').style.border = '2px solid transparent';
    el('pdThumb2').style.border = '2px solid #111';
  };

  // Add color options
  const colorSection = el('pdColorSection');
  const colorsEl = el('pdColors');
  
  if (!p.colors || p.colors.length <= 1) {
    if (colorSection) colorSection.style.display = 'none';
  } else {
    if (colorSection) colorSection.style.display = 'block';
    colorsEl.innerHTML = p.colors.map((c, i) => {
      const isFirst = i === 0;
      const lightHexes = ['#F5F0E6','#F8F8F8','#F5F0E8','#F0EBE0','#F2EDE3','#F0EDE4','#EDE8DC'];
      const needBorder = lightHexes.includes(c.hex);
      return `<button onclick="selectColor(this,'${c.name}')" title="${c.name}" style="width:32px;height:32px;border-radius:50%;background:${c.hex};border:${isFirst ? '3px solid #111' : '2px solid '+(needBorder?'#ddd':'transparent')};outline:${isFirst ? '2px solid rgba(0,0,0,0.15)' : 'none'};outline-offset:2px;cursor:pointer;transition:all 0.2s;box-shadow:0 1px 6px rgba(0,0,0,0.14);"></button>`;
    }).join('');
  }

  const page = el('productDetailPage');
  page.style.display = 'block';
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  if (typeof updateCartBadges !== 'undefined') updateCartBadges();
}

function selectColor(btn, color) {
  AppState.selectedColor = color;
  document.querySelectorAll('#pdColors button').forEach(b => {
    b.style.border = '2px solid transparent';
    b.style.outline = 'none';
  });
  btn.style.border = '3px solid #111';
  btn.style.outline = '2px solid rgba(0,0,0,0.15)';
  btn.style.outlineOffset = '2px';
}

function changeQty(delta) {
  AppState.currentQty = Math.max(1, AppState.currentQty + delta);
  el('pdQty').textContent = AppState.currentQty;
}

function addToCart() {
  if (!AppState.currentProduct) return;
  const existing = AppState.cart.find(x => x.id === AppState.currentProduct.id && x.color === AppState.selectedColor);
  
  // Get image source - support both old and new product format
  let imgSrc = '';
  if (AppState.currentProduct.image) {
    // New category product format
    imgSrc = AppState.currentProduct.image;
  } else if (AppState.currentProduct.imgMainId) {
    // Old catalog format
    const imgEl = document.getElementById(AppState.currentProduct.imgMainId);
    imgSrc = imgEl ? imgEl.src : '';
  } else {
    // Fallback to pdImg1
    imgSrc = el('pdImg1').src || '';
  }
  
  if (existing) {
    existing.qty += AppState.currentQty;
  } else {
    AppState.cart.push({
      id: AppState.currentProduct.id,
      name: AppState.currentProduct.name,
      series: AppState.currentProduct.series,
      price: AppState.currentProduct.price,
      size: 'All Size',
      color: AppState.selectedColor,
      shipping: AppState.selectedShipping,
      qty: AppState.currentQty,
      img: imgSrc,
      checked: true
    });
  }
  saveCart();
  showToast('✓ Ditambahkan ke keranjang!');
}

function buyNow() {
  if (!AppState.currentProduct) return;
  
  // Get image source - support both old and new product format
  let imgSrc = '';
  if (AppState.currentProduct.image) {
    // New category product format
    imgSrc = AppState.currentProduct.image;
  } else if (AppState.currentProduct.imgMainId) {
    // Old catalog format
    const imgEl = document.getElementById(AppState.currentProduct.imgMainId);
    imgSrc = imgEl ? imgEl.src : '';
  } else {
    // Fallback to pdImg1
    imgSrc = el('pdImg1').src || '';
  }
  
  const item = [{
    id: AppState.currentProduct.id,
    name: AppState.currentProduct.name,
    series: AppState.currentProduct.series,
    price: AppState.currentProduct.price,
    size: 'All Size',
    color: AppState.selectedColor,
    shipping: AppState.selectedShipping,
    qty: AppState.currentQty,
    img: imgSrc
  }];
  openCheckoutPageDirect(item);
}

function addToCartFromGrid(productId) {
  const p = PRODUCT_CATALOG.find(x => x.id === productId);
  if (!p) return;
  AppState.currentProduct = p;
  AppState.currentQty = 1;
  AppState.selectedColor = p.colors && p.colors.length > 0 ? p.colors[0].name : '—';
  addToCart();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initializeState();
  if (typeof updateCartBadges !== 'undefined') updateCartBadges();
  if (typeof updateWishlistBadge !== 'undefined') updateWishlistBadge();
  if (typeof restoreWishlistBtnStates !== 'undefined') restoreWishlistBtnStates();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const pages = ['accountPage','confirmationPage','paymentPage','checkoutPage','productDetailPage','cartPage','wishlistPage'];
  for (const id of pages) {
    const el_tmp = el(id);
    if (el_tmp && el_tmp.style.display !== 'none') {
      el_tmp.style.display = 'none';
      document.body.style.overflow = '';
      return;
    }
  }
});

// Mobile menu initialization is handled by utils.js initMobileMenu()

// Handle hash-based routing for modals from category page redirects
window.addEventListener('hashchange', handleHashRoute);
function handleHashRoute() {
  const hash = window.location.hash.substring(1); // Remove #
  switch(hash) {
    case 'wishlist':
      if (typeof openWishlistPage !== 'undefined') openWishlistPage();
      break;
    case 'cart':
      if (typeof openCartPage !== 'undefined') openCartPage();
      break;
    case 'account':
      if (typeof openAccountPage !== 'undefined') openAccountPage();
      break;
  }
}
// Call on page load if hash exists
if (window.location.hash) {
  setTimeout(handleHashRoute, 500);
}
