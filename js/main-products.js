// NINETYNINE - Product Interactions
// Handles product clicks, cart, and wishlist

if (typeof productInteractions === 'undefined') {
    var productInteractions = {
        init: function() {
            this.makeProductsClickable();
            this.setupCartButtons();
            this.setupWishlistButtons();
            this.updateCartCount();
        },
        
        makeProductsClickable: function() {
            // Make product cards clickable to go to product detail page
            const productCards = document.querySelectorAll('[data-product-id], .product-card, .product-item');
            
            productCards.forEach((card, idx) => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    // Don't navigate if clicking on button
                    if (e.target.closest('button') || e.target.closest('[onclick]')) return;
                    
                    const productId = card.getAttribute('data-product-id') || idx;
                    window.location.href = '/product.html?id=' + productId;
                });
            });
        },
        
        setupCartButtons: function() {
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('add-to-cart') || 
                    e.target.textContent.includes('ADD TO CART') ||
                    e.target.textContent.includes('Tambah Keranjang')) {
                    
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const card = e.target.closest('[data-product-id], .product-card, .product-item');
                    if (card) {
                        const productId = card.getAttribute('data-product-id');
                        const productName = card.textContent || 'Product';
                        
                        alert('✅ Added to cart!\n\nGo to product page untuk adjust quantity dan checkout.');
                        console.log('Added to cart:', productId);
                    }
                }
            });
        },
        
        setupWishlistButtons: function() {
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('wishlist-btn') || 
                    e.target.textContent.includes('♡') ||
                    e.target.textContent.includes('♥')) {
                    
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const btn = e.target;
                    const isLiked = btn.classList.contains('liked');
                    
                    if (isLiked) {
                        btn.classList.remove('liked');
                        btn.textContent = '♡';
                    } else {
                        btn.classList.add('liked');
                        btn.textContent = '♥';
                    }
                    
                    console.log('Wishlist toggled');
                }
            });
        },
        
        updateCartCount: function() {
            const cart = JSON.parse(localStorage.getItem('ninetynine_cart') || '[]');
            const count = cart.length;
            
            const cartBadge = document.querySelector('[data-cart-count], .cart-count, .cart-badge');
            if (cartBadge) {
                cartBadge.textContent = count;
                if (count > 0) cartBadge.style.display = 'block';
            }
        }
    };
    
    // Initialize when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => productInteractions.init());
    } else {
        productInteractions.init();
    }
}
