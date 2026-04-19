// ═══════════════════════════════════════════════════
// NINETYNINE — CONFIGURATION & CATALOG
// ═══════════════════════════════════════════════════

if (typeof PRODUCT_CATALOG === 'undefined') {
var PRODUCT_CATALOG = [
  { id:'prod_0',  series:"Code SESTRA 5050 Oneseat", name:"Siderope Flowbordir", price:"IDR 128.000", imgMainId:"catalog-main-0",  imgHoverId:"catalog-hover-0",  colors:[{name:"Cream",hex:"#F0EDE4"},{name:"Black",hex:"#2B2B2B"}], description:"Oneset flowbordir dengan siluet elegan. Material lembut dan nyaman untuk aktivitas harian maupun acara spesial.", material:"Crepe Bordir" },
  { id:'prod_1',  series:"Code DRLFY 6080",          name:"Cream Bordir Dress", price:"IDR 189.000", imgMainId:"catalog-main-1",  imgHoverId:"catalog-hover-1",  colors:[{name:"Cream",hex:"#F5F0E8"}], description:"Dress bordir cream yang feminin dan elegan. Potongan flowy yang nyaman dan cocok untuk berbagai kesempatan.", material:"Crepe Bordir" },
  { id:'prod_2',  series:"Code DRYN 4573",           name:"Seemivest Bordir Flow Dress", price:"IDR 156.000", imgMainId:"catalog-main-2", imgHoverId:"catalog-hover-2", colors:[{name:"Beige",hex:"#E8DCC8"}], description:"Dress flow dengan bordir cantik. Terasa adem dan breathable, sempurna untuk musim panas.", material:"Crepe Bordir" },
  { id:'prod_3',  series:"Code TNVX 8307-3",         name:"Pocky Top", price:"IDR 96.000", imgMainId:"catalog-main-3", imgHoverId:"catalog-hover-3", colors:[{name:"White",hex:"#FFFFFF"}], description:"Top simpel dengan detail unik. Bahan berkualitas yang nyaman dipakai seharian.", material:"Cotton Blend" },
  { id:'prod_4',  series:"Code TPSHRL 9157",         name:"Flowcolour Cream Blouse", price:"IDR 128.000", imgMainId:"catalog-main-4", imgHoverId:"catalog-hover-4", colors:[{name:"Cream",hex:"#F0EDE4"}], description:"Blouse cream dengan warna lembut. Detail flow yang elegan membuat penampilan lebih sophisticated.", material:"Crepe" },
  { id:'prod_5',  series:"Code FLWPBL 7140",         name:"Flow Pearlbelt Dress", price:"IDR 167.000", imgMainId:"catalog-main-5", imgHoverId:"catalog-hover-5", colors:[{name:"Peach",hex:"#FDBCB4"}], description:"Dress dengan detail pearlbelt cantik. Membuat penampilan elegant dan timeless untuk berbagai acara.", material:"Crepe Bordir" },
  { id:'prod_6',  series:"Code TCBRD 3392",          name:"Twocolors Bordir Tunic", price:"IDR 134.000", imgMainId:"catalog-main-6", imgHoverId:"catalog-hover-6", colors:[{name:"Cream Black",hex:"#E8DCC8"}], description:"Tunic dua warna dengan bordir artistik. Kombinasi warna yang balance dan modern.", material:"Crepe Bordir" },
  { id:'prod_7',  series:"Code FLWPTN 5006",         name:"Flow Pattern Dress", price:"IDR 145.000", imgMainId:"catalog-main-7", imgHoverId:"catalog-hover-7", colors:[{name:"Mint",hex:"#D0E8D8"}], description:"Dress dengan pattern flow yang unik. Desain eksklusif yang membuat Anda tampil beda.", material:"Crepe" },
  { id:'prod_8',  series:"Code NDBRD 1980",          name:"Nudes Vinesbordir Tunic", price:"IDR 142.000", imgMainId:"catalog-main-8", imgHoverId:"catalog-hover-8", colors:[{name:"Nude",hex:"#D4B8A8"}], description:"Tunic bergambar vine dengan warna nude elegan. Sempurna untuk tampil casual elegant.", material:"Crepe Bordir" },
  { id:'prod_9',  series:"Code FLWLCE 2847",         name:"Flowlace Shirt", price:"IDR 118.000", imgMainId:"catalog-main-9", imgHoverId:"catalog-hover-9", colors:[{name:"White",hex:"#FFFFFF"}], description:"Shirt dengan detail lace flow yang cantik. Material premium yang nyaman dan breathable.", material:"Cotton" }
];
}

// EmailJS Configuration
if (typeof EMAILJS_SERVICE_ID === 'undefined') {
var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
}

// Checkout Configuration
if (typeof CHECKOUT_METHODS === 'undefined') {
var CHECKOUT_METHODS = ['Bank Transfer', 'Credit Card', 'E-Wallet'];
var SHIPPING_OPTIONS = ['Regular (3-5 hari)', 'Express (1-2 hari)', 'Same Day'];
}
