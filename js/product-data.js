// ═══════════════════════════════════════════════════
// COMPLETE PRODUCT CATALOG WITH ALL CATEGORIES
// ═══════════════════════════════════════════════════

const CATEGORY_PRODUCTS = {
  dress: {
    label: 'Dress',
    count: 10,
    basePrice: 185000
  },
  blouse: {
    label: 'Blouse',
    count: 10,
    basePrice: 145000
  },
  tunic: {
    label: 'Tunic',
    count: 10,
    basePrice: 169000
  },
  outer: {
    label: 'Outer',
    count: 10,
    basePrice: 299000
  },
  sweater: {
    label: 'Sweater',
    count: 10,
    basePrice: 189000
  },
  pants: {
    label: 'Pants',
    count: 10,
    basePrice: 179000
  },
  skirt: {
    label: 'Skirt',
    count: 10,
    basePrice: 159000
  }
};

// Generate product ID
function generateProductId(category, index) {
  return `${category}-${index + 1}`;
}

// Get product image paths (main and hover)
function getProductImagePaths(category, index) {
  // index 0 = product 1 (images 1 & 2), index 1 = product 2 (images 3 & 4), etc.
  const mainNum = (index * 2) + 1;
  const hoverNum = mainNum + 1;
  
  const mainImage = `images/${category}/${category} ${mainNum}.jpg`;
  const hoverImage = `images/${category}/${category} ${hoverNum}.jpg`;
  
  return { mainImage, hoverImage };
}

// Generate all products for a category
function getCategoryProducts(categoryKey) {
  const category = CATEGORY_PRODUCTS[categoryKey];
  if (!category) return [];
  
  const products = [];
  for (let i = 0; i < category.count; i++) {
    const price = category.basePrice + (i % 5) * 15000; // Slight variation
    const { mainImage, hoverImage } = getProductImagePaths(categoryKey, i);
    
    products.push({
      id: generateProductId(categoryKey, i),
      category: categoryKey,
      categoryLabel: category.label,
      series: `${category.label} Collection - Item ${i + 1}`,
      name: `${category.label} ${i + 1}`,
      price: `IDR ${price.toLocaleString('id-ID')}`,
      image: mainImage,
      imgMainId: `cat-img-main-${categoryKey}-${i}`,
      imgHoverId: `cat-img-hover-${categoryKey}-${i}`,
      mainImage: mainImage,
      hoverImage: hoverImage,
      colors: [
        { name: 'Cream', hex: '#F0EDE4' },
        { name: 'Black', hex: '#2B2B2B' }
      ],
      description: `Premium ${category.label.toLowerCase()} dengan kualitas terbaik. Desain elegan dan nyaman untuk berbagai kesempatan.`,
      material: 'Premium Fabric'
    });
  }
  return products;
}

// Get single product by ID
function getProductById(productId) {
  const [category, itemNum] = productId.split('-');
  const index = parseInt(itemNum) - 1;
  const products = getCategoryProducts(category);
  return products[index] || null;
}

// Get all categories
function getAllCategories() {
  return Object.keys(CATEGORY_PRODUCTS);
}

// Get category label
function getCategoryLabel(categoryKey) {
  return CATEGORY_PRODUCTS[categoryKey]?.label || categoryKey;
}
