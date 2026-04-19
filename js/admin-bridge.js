// ════════════════════════════════════════════════════════════════════════════
// ADMIN INTEGRATION BRIDGE
// Connects admin dashboard data to main website
// Include this BEFORE other scripts in index.html
// ════════════════════════════════════════════════════════════════════════════

if (typeof ADMIN_STORAGE_KEY === 'undefined') {
var ADMIN_STORAGE_KEY = 'ninetynine_admin_data';
}

/**
 * Get admin data from localStorage
 * Falls back to empty object if not set
 */
function getAdminData() {
  const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Error parsing admin data:', e);
      return {};
    }
  }
  return {};
}

/**
 * Update hero section with admin data
 */
function applyHeroData() {
  const data = getAdminData();
  if (!data.hero) {
    console.log('⚠️ No hero data in localStorage');
    return;
  }

  const hero = data.hero;
  console.log('🎨 Applying hero data:', hero);

  // Update hero title - handle HTML content (like <br> tags)
  if (hero.title) {
    const titleEl = document.querySelector('.hero-overlay-title');
    if (titleEl) {
      titleEl.innerHTML = hero.title;
      console.log('✅ Hero title updated');
    } else {
      console.warn('⚠️ .hero-overlay-title element not found');
    }
  }

  // Update hero subtitle
  if (hero.subtitle) {
    const subtitleEl = document.querySelector('.hero-overlay-subtitle');
    if (subtitleEl) {
      subtitleEl.textContent = hero.subtitle;
      console.log('✅ Hero subtitle updated');
    } else {
      console.warn('⚠️ .hero-overlay-subtitle element not found');
    }
  }

  // Update hero buttons with text and colors
  const buttons = document.querySelectorAll('.hero-overlay-buttons button');
  console.log('Found buttons:', buttons.length);
  
  if (buttons.length >= 1) {
    const btnPrimary = buttons[0];
    if (hero.btnPrimary) {
      btnPrimary.textContent = hero.btnPrimary;
      console.log('✅ Primary button text updated');
    }
    if (hero.btnPrimaryColor) {
      btnPrimary.style.backgroundColor = hero.btnPrimaryColor;
      console.log('✅ Primary button color updated:', hero.btnPrimaryColor);
    }
    if (hero.btnPrimaryTextColor) {
      btnPrimary.style.color = hero.btnPrimaryTextColor;
      console.log('✅ Primary button text color updated:', hero.btnPrimaryTextColor);
    }
  }
  
  if (buttons.length >= 2) {
    const btnSecondary = buttons[1];
    if (hero.btnSecondary) {
      btnSecondary.textContent = hero.btnSecondary;
      console.log('✅ Secondary button text updated');
    }
    if (hero.btnSecondaryColor) {
      btnSecondary.style.backgroundColor = hero.btnSecondaryColor;
      console.log('✅ Secondary button color updated:', hero.btnSecondaryColor);
    }
    if (hero.btnSecondaryTextColor) {
      btnSecondary.style.color = hero.btnSecondaryTextColor;
      console.log('✅ Secondary button text color updated:', hero.btnSecondaryTextColor);
    }
  }

  // Update hero video background
  if (hero.videoUrl) {
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
      // Remove old video if exists
      const oldVideo = heroEl.querySelector('video.hero-background-video');
      if (oldVideo) {
        oldVideo.remove();
        console.log('🗑️ Old video removed');
      }

      // Create new video element
      const video = document.createElement('video');
      video.className = 'hero-background-video';
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsinline = true;
      video.style.position = 'absolute';
      video.style.top = '0';
      video.style.left = '0';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      video.style.zIndex = '0';
      video.style.opacity = hero.videoOpacity || 0.3;

      // Create source element
      const source = document.createElement('source');
      source.src = hero.videoUrl;
      video.appendChild(source);

      // Insert at beginning of hero to be behind overlay (if exists)
      heroEl.insertBefore(video, heroEl.firstChild);
      
      console.log('🎬 Hero video updated:', hero.videoUrl);
    } else {
      console.warn('⚠️ .hero element not found');
    }
  }

  // Update hero background
  if (hero.bgImage) {
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
      heroEl.style.backgroundImage = `url('${hero.bgImage}')`;
    }
  }
}

/**
 * Update collection section with admin data
 */
function applyCollectionData() {
  const data = getAdminData();
  if (!data.collection) return;

  const collection = data.collection;

  // Update collection title
  if (collection.title) {
    const titleEl = document.querySelector('.collection h2');
    if (titleEl) titleEl.textContent = collection.title;
  }

  // Update collection description
  if (collection.description) {
    const descEl = document.querySelector('.collection p');
    if (descEl) descEl.textContent = collection.description;
  }
}

/**
 * Apply bestseller data to website
 */
function applyBestsellerData(bestsellerDataParam) {
  const data = bestsellerDataParam || getAdminData();
  const bestsellerData = data.bestseller || data;
  
  if (!bestsellerData.label && !bestsellerData.title && !bestsellerData.products) {
    console.log('⚠️ No bestseller data in storage');
    return;
  }

  console.log('⭐ Applying bestseller data:', bestsellerData);

  // Update bestseller label
  if (bestsellerData.label) {
    const labelEl = document.querySelector('#bestseller .section-label');
    if (labelEl) {
      labelEl.textContent = bestsellerData.label;
      console.log('✅ Bestseller label updated');
    }
  }

  // Update bestseller title
  if (bestsellerData.title) {
    const titleEl = document.querySelector('#bestseller .section-title');
    if (titleEl) {
      titleEl.textContent = bestsellerData.title;
      console.log('✅ Bestseller title updated');
    }
  }

  // Update bestseller products
  if (bestsellerData.products && bestsellerData.products.length > 0) {
    const productGrid = document.querySelector('#bestseller .product-grid');
    if (productGrid) {
      productGrid.innerHTML = '';
      
      bestsellerData.products.forEach((product, idx) => {
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.style.transitionDelay = (idx * 0.1) + 's';
        
        card.innerHTML = `
          <div class="product-img-wrap" style="cursor:pointer;" onclick="openProductDetail('prod_${idx}')">
            <img class="img-main" loading="lazy" src="${product.imgMain}" alt="${product.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;">
            <img class="img-hover" loading="lazy" src="${product.imgHover}" alt="${product.name} hover" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;">
            <div class="product-actions">
              <button class="product-action-btn wishlist-btn" aria-label="Add to wishlist" data-id="prod_${idx}" data-name="${product.name}" data-series="${product.series}" data-price="—" onclick="toggleWishlist(this)">
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <button class="product-action-btn" aria-label="Add to cart" onclick="openProductDetail('prod_${idx}');return false;">
                <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </button>
            </div>
          </div>
          <div class="product-info">
            <p class="product-series">${product.series}</p>
            <p class="product-name">${product.name}</p>
          </div>
        `;
        
        productGrid.appendChild(card);
      });
      
      console.log('✅ Bestseller products updated');
    }
  }
}

/**
 * Apply collection data to website
 */
function applyCollectionData(collectionDataParam) {
  const data = collectionDataParam || getAdminData();
  const collectionData = data.collection || data;
  
  if (!collectionData.label && !collectionData.title && !collectionData.description) {
    console.log('⚠️ No collection data in storage');
    return;
  }

  console.log('🖼️ Applying collection data:', collectionData);

  const collection = document.getElementById('collection');
  if (!collection) {
    console.warn('⚠️ Collection section not found');
    return;
  }

  // Update background image
  if (collectionData.bgImg) {
    const bgImg = collection.querySelector('.collection-bg-img');
    if (bgImg) {
      bgImg.src = collectionData.bgImg;
      console.log('✅ Collection background updated');
    }
  }

  // Update label
  if (collectionData.label) {
    const labelEl = collection.querySelector('.collection-label');
    if (labelEl) {
      labelEl.textContent = collectionData.label;
      console.log('✅ Collection label updated');
    }
  }

  // Update title (with HTML support)
  if (collectionData.title) {
    const titleEl = collection.querySelector('.collection-title');
    if (titleEl) {
      titleEl.innerHTML = collectionData.title;
      console.log('✅ Collection title updated');
    }
  }

  // Update description
  if (collectionData.description) {
    const descEl = collection.querySelector('.collection-sub');
    if (descEl) {
      descEl.textContent = collectionData.description;
      console.log('✅ Collection description updated');
    }
  }

  // Update button text
  if (collectionData.ctaText) {
    const ctaEl = collection.querySelector('.collection-cta');
    if (ctaEl) {
      // Update only the text node, not the SVG
      ctaEl.childNodes[0].textContent = collectionData.ctaText + ' ';
      console.log('✅ Collection button updated');
    }
  }
}

/**
 * Apply Our Picks data to website
 */
function applyOurPicksData(ourpicksDataParam) {
  const data = ourpicksDataParam || getAdminData();
  const ourpicksData = data.ourpicks || data;
  
  if (!ourpicksData.label && !ourpicksData.title && !ourpicksData.products) {
    console.log('⚠️ No our picks data in storage');
    return;
  }

  console.log('🎁 Applying our picks data:', ourpicksData);

  // Update our picks label
  if (ourpicksData.label) {
    const labelEl = document.querySelector('#ourpicks .section-label');
    if (labelEl) {
      labelEl.textContent = ourpicksData.label;
      console.log('✅ Our Picks label updated');
    }
  }

  // Update our picks title
  if (ourpicksData.title) {
    const titleEl = document.querySelector('#ourpicks .section-title');
    if (titleEl) {
      titleEl.textContent = ourpicksData.title;
      console.log('✅ Our Picks title updated');
    }
  }

  // Update our picks products
  if (ourpicksData.products && ourpicksData.products.length > 0) {
    const productGrid = document.querySelector('#ourpicks .product-grid');
    if (productGrid) {
      productGrid.innerHTML = '';
      
      ourpicksData.products.forEach((product, idx) => {
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.style.transitionDelay = (idx * 0.1) + 's';
        
        card.innerHTML = `
          <div class="product-img-wrap" style="cursor:pointer;" onclick="openProductDetail('prod_ourpicks_${idx}')">
            <img class="img-main" loading="lazy" src="${product.imgMain}" alt="${product.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;">
            <img class="img-hover" loading="lazy" src="${product.imgHover}" alt="${product.name} hover" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;">
            <div class="product-actions">
              <button class="product-action-btn wishlist-btn" aria-label="Add to wishlist" data-id="prod_ourpicks_${idx}" data-name="${product.name}" data-series="${product.series}" data-price="—" onclick="toggleWishlist(this)">
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <button class="product-action-btn" aria-label="Add to cart" onclick="openProductDetail('prod_ourpicks_${idx}');return false;">
                <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </button>
            </div>
          </div>
          <div class="product-info">
            <p class="product-series">${product.series}</p>
            <p class="product-name">${product.name}</p>
          </div>
        `;
        
        productGrid.appendChild(card);
      });
      
      console.log('✅ Our Picks products updated');
    }
  }
}

/**
 * Apply Stores data to website
 */
function applyStoresData(storesDataParam) {
  const data = storesDataParam || getAdminData();
  const storesData = data.stores || data;
  
  if (!storesData.label && !storesData.title && !storesData.stores) {
    console.log('⚠️ No stores data in storage');
    return;
  }

  console.log('🏪 Applying stores data:', storesData);

  const storesSection = document.getElementById('stores');
  if (!storesSection) {
    console.warn('⚠️ Stores section not found');
    return;
  }

  // Update stores label
  if (storesData.label) {
    const labelEl = storesSection.querySelector('.section-label');
    if (labelEl) {
      labelEl.textContent = storesData.label;
      console.log('✅ Stores label updated');
    }
  }

  // Update stores title
  if (storesData.title) {
    const titleEl = storesSection.querySelector('.section-title');
    if (titleEl) {
      titleEl.textContent = storesData.title;
      console.log('✅ Stores title updated');
    }
  }

  // Update stores grid
  if (storesData.stores && storesData.stores.length > 0) {
    const storesGrid = storesSection.querySelector('.stores-grid');
    if (storesGrid) {
      storesGrid.innerHTML = '';
      
      storesData.stores.forEach((store, idx) => {
        const storeCell = document.createElement('div');
        storeCell.className = 'store-cell';
        storeCell.style.animationDelay = (idx * 0.08) + 's';
        
        storeCell.innerHTML = `
          <img loading="lazy" src="${store.img}" style="width:100%;height:100%;object-fit:cover;object-position:center;" alt="${store.label} Store">
          <div class="store-overlay">
            <span class="store-label">${store.label}</span>
            <span class="store-address">${store.address}</span>
            <span class="store-hours">${store.hours}</span>
          </div>
        `;
        
        storesGrid.appendChild(storeCell);
      });
      
      console.log('✅ Stores grid updated');
    }
  }

  // Update bottom section
  const storesBottom = storesSection.querySelector('.stores-bottom');
  if (storesBottom) {
    // Update big text (with HTML support)
    if (storesData.bigText) {
      const bigTextEl = storesBottom.querySelector('.stores-big-text');
      if (bigTextEl) {
        bigTextEl.innerHTML = storesData.bigText;
        console.log('✅ Stores big text updated');
      }
    }

    // Update sub text
    if (storesData.subtitle) {
      const subEl = storesBottom.querySelector('.stores-sub');
      if (subEl) {
        subEl.textContent = storesData.subtitle;
        console.log('✅ Stores subtitle updated');
      }
    }

    // Update button text
    if (storesData.btnText) {
      const btnEl = storesBottom.querySelector('.stores-btn');
      if (btnEl) {
        // Update only the text node, not the SVG
        btnEl.childNodes[0].textContent = storesData.btnText + ' ';
        console.log('✅ Stores button text updated');
      }
    }
  }
}

/**
 * Apply footer data to website
 */
function applyFooterData(footerDataParam) {
  const data = footerDataParam || getAdminData();
  const footerData = data.footer || data;

  if (!footerData.logo && !footerData.email && !footerData.copyright) {
    console.log('⚠️ No footer data in storage');
    return;
  }

  console.log('📞 Applying footer data:', footerData);

  const footer = document.querySelector('footer');
  if (!footer) {
    console.warn('⚠️ Footer element not found');
    return;
  }

  // Update brand section
  if (footerData.logo) {
    const brandName = footer.querySelector('.footer-brand-name');
    if (brandName) {
      brandName.textContent = footerData.logo;
      console.log('✅ Footer brand name updated');
    }
  }

  if (footerData.brandDesc) {
    const brandDesc = footer.querySelector('.footer-brand-desc');
    if (brandDesc) {
      brandDesc.textContent = footerData.brandDesc;
      console.log('✅ Footer brand description updated');
    }
  }

  // Update social media links
  if (footerData.instagram) {
    const instagramLink = footer.querySelector('a[href*="instagram"]');
    if (instagramLink) {
      instagramLink.href = footerData.instagram;
      console.log('✅ Footer Instagram link updated');
    }
  }

  if (footerData.facebook) {
    const facebookLink = footer.querySelector('a[href*="facebook"]');
    if (facebookLink) {
      facebookLink.href = footerData.facebook;
      console.log('✅ Footer Facebook link updated');
    }
  }

  if (footerData.tiktok) {
    const tiktokLink = footer.querySelector('a[href*="tiktok"]');
    if (tiktokLink) {
      tiktokLink.href = footerData.tiktok;
      console.log('✅ Footer TikTok link updated');
    }
  }

  // Update contact email
  if (footerData.email) {
    const emailLink = footer.querySelector('a[href^="mailto:"]');
    if (emailLink) {
      emailLink.href = 'mailto:' + footerData.email;
      emailLink.textContent = footerData.email;
      console.log('✅ Footer email updated');
    }
  }

  // Update newsletter section
  if (footerData.newsletterTitle) {
    const newsletterTitle = footer.querySelector('.newsletter-title');
    if (newsletterTitle) {
      newsletterTitle.textContent = footerData.newsletterTitle;
      console.log('✅ Footer newsletter title updated');
    }
  }

  if (footerData.newsletterPlaceholder) {
    const newsletterInput = footer.querySelector('input[type="email"]');
    if (newsletterInput) {
      newsletterInput.placeholder = footerData.newsletterPlaceholder;
      console.log('✅ Footer newsletter placeholder updated');
    }
  }

  // Update copyright
  if (footerData.copyright) {
    const copyrightEl = footer.querySelector('.footer-copyright');
    if (copyrightEl) {
      copyrightEl.textContent = footerData.copyright;
      console.log('✅ Footer copyright updated');
    }
  }

  // Update bottom links
  if (footerData.bottomLinks) {
    const bottomLinks = footer.querySelector('.footer-bottom-links');
    if (bottomLinks) {
      bottomLinks.textContent = footerData.bottomLinks;
      console.log('✅ Footer bottom links updated');
    }
  }

  console.log('✅ Footer data applied');
}

/**
 * Apply color scheme from admin
 */
function applyColorScheme() {
  const data = getAdminData();
  if (!data.colors) return;

  const colors = data.colors;
  const root = document.documentElement;

  if (colors.primary) root.style.setProperty('--primary-color', colors.primary);
  if (colors.secondary) root.style.setProperty('--secondary-color', colors.secondary);
  if (colors.accent) root.style.setProperty('--accent-color', colors.accent);
}

/**
 * Apply all admin data to the website
 */
/**
 * Update marquee section with admin data
 */
function applyMarqueeData(marqueeDataParam) {
  const data = marqueeDataParam || getAdminData();
  const marqueeData = data.marquee || data;
  
  if (!marqueeData.items || marqueeData.items.length === 0) {
    console.log('⚠️ No marquee data in storage');
    return;
  }

  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack) {
    console.warn('⚠️ .marquee-track element not found');
    return;
  }

  console.log('📜 Applying marquee data:', marqueeData.items);

  // Clear existing marquee
  marqueeTrack.innerHTML = '';

  // Repeat items multiple times to fill marquee and allow seamless looping
  const itemCount = marqueeData.items.length;
  for (let i = 0; i < 4; i++) {
    marqueeData.items.forEach((item, index) => {
      const span = document.createElement('span');
      span.textContent = item;
      marqueeTrack.appendChild(span);

      // Add separator dot (except after last item in last iteration)
      if (!(i === 3 && index === itemCount - 1)) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.textContent = '—';
        marqueeTrack.appendChild(dot);
      }
    });
  }

  console.log('✅ Marquee updated');
}

/**
 * Apply all admin data to website
 */
function applyAllAdminData() {
  applyColorScheme();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyMarqueeData();
      applyHeroData();
      applyBestsellerData();
      applyCollectionData();
      applyOurPicksData();
      applyStoresData();
      applyFooterData();
    });
  } else {
    applyMarqueeData();
    applyHeroData();
    applyBestsellerData();
    applyCollectionData();
    applyOurPicksData();
    applyStoresData();
    applyFooterData();
  }
}

/**
 * Initialize - Apply all data and set up listeners
 */
function initializeAdminBridge() {
  console.log('🚀 Initializing Admin Bridge...');
  
  // Apply data when script loads
  applyAllAdminData();
  
  // Re-apply data when visibility changes (user switched tabs/windows)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      console.log('📱 Tab visible - Reloading editor changes from localStorage...');
      applyAllAdminData();
    }
  });
  
  // Listen for storage changes (another tab edited the data)
  window.addEventListener('storage', (e) => {
    if (e.key === ADMIN_STORAGE_KEY && e.newValue) {
      console.log('🔄 Editor changes detected from another tab. Updating...');
      applyAllAdminData();
    }
  });
  
  // Auto-reapply data every 5 seconds (in case of changes)
  setInterval(() => {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.hero || data.collection || data.colors) {
          applyAllAdminData();
        }
      } catch (e) {
        console.error('Error parsing data:', e);
      }
    }
  }, 5000);
  
  console.log('✅ Admin Integration Bridge initialized');
  console.log('🎨 Changes will auto-sync every 5 seconds');
  console.log('📊 Available data:', getAdminData());
}

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAdminBridge);
} else {
  initializeAdminBridge();
}
