// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT PAGINATION SYSTEM
// ═══════════════════════════════════════════════════════════════════════════
// Clean, modern pagination for product listings

class ProductPagination {
  constructor(options = {}) {
    this.itemsPerPage = options.itemsPerPage || 8;
    this.currentPage = 1;
    this.totalPages = 1;
    this.onPageChange = options.onPageChange || null;
    this.paginationClass = options.paginationClass || '.product-pagination';
    
    this.init();
  }

  init() {
    this.calculateTotalPages();
    this.render();
    this.bindEvents();
  }

  calculateTotalPages() {
    if (typeof PRODUCT_CATALOG !== 'undefined' && PRODUCT_CATALOG.length > 0) {
      this.totalPages = Math.ceil(PRODUCT_CATALOG.length / this.itemsPerPage);
    }
  }

  getCurrentPageItems() {
    if (typeof PRODUCT_CATALOG === 'undefined') return [];
    
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    return PRODUCT_CATALOG.slice(startIdx, endIdx);
  }

  goToPage(pageNum) {
    const newPage = Math.max(1, Math.min(pageNum, this.totalPages));
    
    if (newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.render();
      
      // Trigger callback
      if (this.onPageChange) {
        this.onPageChange({
          page: this.currentPage,
          items: this.getCurrentPageItems(),
          totalPages: this.totalPages
        });
      }

      // Smooth scroll to product grid
      const productGrid = document.querySelector('.product-grid');
      if (productGrid) {
        setTimeout(() => {
          productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  render() {
    const container = document.querySelector(this.paginationClass);
    if (!container) return;

    let html = '<div class="pagination-wrapper">';
    
    // Previous Button
    html += `
      <button 
        class="pagination-btn pagination-prev ${this.currentPage === 1 ? 'disabled' : ''}"
        ${this.currentPage === 1 ? 'disabled' : ''}
        aria-label="Previous page"
      >
        <span>←</span> Previous
      </button>
    `;

    // Page Numbers
    html += '<div class="pagination-numbers">';
    
    const maxButtons = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(this.totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // First page button if not visible
    if (startPage > 1) {
      html += `<button class="pagination-number" onclick="paginationController.goToPage(1)">1</button>`;
      if (startPage > 2) {
        html += `<span class="pagination-ellipsis">...</span>`;
      }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      html += `
        <button 
          class="pagination-number ${i === this.currentPage ? 'active' : ''}"
          onclick="paginationController.goToPage(${i})"
          ${i === this.currentPage ? 'aria-current="page"' : ''}
        >
          ${i}
        </button>
      `;
    }

    // Last page button if not visible
    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        html += `<span class="pagination-ellipsis">...</span>`;
      }
      html += `<button class="pagination-number" onclick="paginationController.goToPage(${this.totalPages})">${this.totalPages}</button>`;
    }

    html += '</div>';

    // Next Button
    html += `
      <button 
        class="pagination-btn pagination-next ${this.currentPage === this.totalPages ? 'disabled' : ''}"
        ${this.currentPage === this.totalPages ? 'disabled' : ''}
        aria-label="Next page"
      >
        Next <span>→</span>
      </button>
    `;

    html += '</div>';

    container.innerHTML = html;
    this.bindEvents();
  }

  bindEvents() {
    const prevBtn = document.querySelector('.pagination-prev');
    const nextBtn = document.querySelector('.pagination-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevPage());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextPage());
    }
  }
}

// Global instance
let paginationController = null;

// Initialize pagination when page loads
document.addEventListener('DOMContentLoaded', () => {
  const paginationContainer = document.querySelector('.product-pagination');
  if (paginationContainer) {
    paginationController = new ProductPagination({
      itemsPerPage: 8,
      onPageChange: (data) => {
        console.log(`Loaded page ${data.page} of ${data.totalPages}`);
      }
    });
  }
});
