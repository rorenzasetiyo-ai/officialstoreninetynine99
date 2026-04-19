// ============================================
// Event Delegation Handler for data-action
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', handleDataActions);
  
  function handleDataActions(event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    
    const action = target.getAttribute('data-action');
    
    try {
      switch(action) {
        case 'close-menu':
          closeMobileMenu?.();
          break;
          
        case 'close-menu-scroll':
          closeMobileMenu?.();
          window.scrollTo({top: 0, behavior: 'smooth'});
          break;
          
        case 'smooth-scroll':
          const scrollTarget = target.getAttribute('data-target');
          if (scrollTarget && smoothScroll) {
            smoothScroll(scrollTarget);
            event.preventDefault();
          }
          break;
          
        case 'open-product':
          const productId = target.getAttribute('data-product-id');
          if (productId && openProductDetail) {
            openProductDetail(productId);
          }
          break;
          
        case 'close-product':
          closeProductDetail?.();
          break;
          
        case 'toggle-wishlist':
          event.stopPropagation();
          if (toggleWishlist) {
            toggleWishlist(target);
          }
          break;
          
        case 'add-to-cart':
          event.stopPropagation();
          if (addToCartFromGrid) {
            addToCartFromGrid(target);
          }
          break;
          
        case 'open-search':
          openSearchPage?.();
          break;
          
        case 'open-wishlist':
          openWishlistPage?.();
          break;
          
        case 'close-wishlist':
          closeWishlistPage?.();
          break;
          
        case 'open-cart':
          openCartPage?.();
          break;
          
        case 'close-cart':
          if (typeof closeCartPage !== 'undefined') {
            closeCartPage();
          } else if (document.getElementById('cartPage')) {
            document.getElementById('cartPage').style.display = 'none';
            document.body.style.overflow = '';
          }
          break;
          
        case 'open-looks':
          openLooksPage?.();
          event.preventDefault();
          break;
          
        case 'close-looks':
          closeLooksPage?.();
          break;
          
        case 'open-all-products':
          openAllProductsPage?.();
          event.preventDefault();
          break;
          
        case 'close-new-arrivals':
          closeNewArrivals?.();
          break;
          
        case 'open-account':
          openAccountPage?.();
          event.preventDefault();
          break;
          
        case 'close-account':
          closeAccountPage?.();
          break;
      }
    } catch (error) {
      console.error(`Error handling action "${action}":`, error);
    }
  }
});
