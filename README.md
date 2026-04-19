# Ninetynine — Fashion E-Commerce

Minimalist women's fashion website with full shopping features.

## Project Structure
```
ninetynine/
├── index.html              # Main landing page
├── vercel.json             # Vercel config + security headers  
├── .gitignore
├── pages/
│   ├── product.html        # Product detail
│   ├── cart.html           # Shopping cart (Shopee-style)
│   ├── checkout.html       # Checkout form
│   ├── payment.html        # VA / QRIS payment
│   ├── order-success.html  # Order confirmation
│   ├── account.html        # Order history
│   ├── wishlist.html       # Wishlist
│   ├── all-products.html   # All products
│   ├── looks.html          # Style lookbook
│   └── category-*.html     # 9 category pages (dress, blouse, etc)
├── css/
│   ├── reset.css           # CSS normalize
│   └── style.css           # Main stylesheet
├── js/
│   ├── config.js           # Site config, product catalog, EmailJS
│   ├── ui.js               # Shared state, navbar, animations
│   ├── product.js          # Product detail + wishlist
│   ├── cart.js             # Cart logic
│   ├── checkout.js         # Checkout, payment, orders
│   ├── account.js          # Order history
│   └── category.js         # Category pages
├── images/                 # Product photos
└── assets/icons/           # Favicon
```

## Run Locally (VS Code)
1. Install **Live Server** extension
2. Right-click `index.html` → **Open with Live Server**

## Deploy to Vercel
```bash
npm i -g vercel && vercel --prod
```
Or connect GitHub repo at vercel.com.

## EmailJS Setup
Edit `js/config.js`:
```js
const EMAILJS_SERVICE_ID  = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const EMAILJS_PUBLIC_KEY  = "your_public_key";
```
