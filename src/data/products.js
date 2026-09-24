/* ============================================================
   products.js - the listings the /shop page renders.

   A SNAPSHOT of the live halfsy.shop grid (24 Sep 2026): brand,
   name, prices, discount, retailer, trust level, image and outbound
   link are exactly what the live site showed. Two children's
   listings were left out. NOT from the live data: `gender`,
   `section` and `sub` were assigned by hand from the product names
   so the menu's categories (MENU in assets.js) have something to
   filter on - the real feed needs to supply these.

   Images are hot-linked from the retailers' CDNs, as the live site
   does. Some are small (Mytheresa serves 512px squares) and look
   soft at the enlarged card size; the feed should ask each CDN for
   its largest rendition.

   `href` is the retailer, as on the live site today. Once the
   product info screen exists it becomes /p/:id and the retailer
   link moves there - see the sizes discussion in the project doc.
   ------------------------------------------------------------ */

const P = (id, o) => ({ id, ...o });

export const PRODUCTS_ALL = [
  P('brunello-cucinelli-sequin-midi-dress', {
    brand: 'Brunello Cucinelli', name: 'Sequin Linen-Cashmere Midi Dress',
    now: '$2,920', was: '$7,300', off: 60, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'dresses', sub: 'midi-dresses',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5485694_100106_m',
    href: 'https://www.bergdorfgoodman.com/p/brunello-cucinelli-sequin-linen-cashmere-midi-dress-prod199090103' }),
  P('brioni-appia-loafers', {
    brand: 'Brioni', name: 'Appia leather penny loafers',
    now: '$957', was: '$1,595', off: 40, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'men', section: 'shoes', sub: 'loafers',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/4e/P01138298.jpg',
    href: 'https://www.mytheresa.com/us/en/men/brioni-leather-loafers-black-p01138298' }),
  P('tom-ford-cashmere-blazer', {
    brand: 'Tom Ford', name: 'Cashmere Single-Breasted Blazer',
    now: '$2,796', was: '$6,990', off: 60, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'clothing', sub: 'jackets',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5034281_100134_m',
    href: 'https://www.bergdorfgoodman.com/p/tom-ford-cashmere-single-breasted-blazer-prod193830169' }),
  P('zegna-pique-polo', {
    brand: 'Zegna', name: "Men's Pique Polo Shirt with Leather-Trim Pocket",
    now: '$288', was: '$575', off: 50, retailer: 'Neiman Marcus', trust: 'high',
    gender: 'men', section: 'clothing', sub: 'shirts',
    img: 'https://media.neimanmarcus.com/f_auto,q_auto:low,ar_4:5,c_fill,dpr_2.0,w_456/01/nm_5591697_100409_m',
    href: 'https://www.neimanmarcus.com/p/zegna-mens-pique-polo-shirt-with-leather-trim-pocket-prod288170390' }),
  P('n-peal-cashmere-gilet', {
    brand: 'N. Peal', name: "Men's Cashmere Quilted Gilet Ecru White",
    now: '£347', was: '£695', off: 50, retailer: 'N. Peal', trust: 'high',
    gender: 'men', section: 'clothing', sub: 'knitwear',
    img: 'https://cdn.shopify.com/s/files/1/0498/3262/4292/files/SS25_NPG110042_E34_1.jpg?v=1734950628',
    href: 'https://www.npeal.com/products/mens-cashmere-quilted-gilet-ecru-white' }),
  P('kiton-windowpane-sport-coat', {
    brand: 'Kiton', name: "Men's Windowpane Cashmere-Silk Sport Coat",
    now: '$6,490', was: '$12,980', off: 50, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'men', section: 'clothing', sub: 'jackets',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_4810883_100324_m',
    href: 'https://www.bergdorfgoodman.com/p/kiton-mens-windowpane-cashmere-silk-sport-coat-prod187090192' }),
  P('bottega-veneta-rectangular-sunglasses', {
    brand: 'Bottega Veneta', name: 'Rectangular sunglasses',
    now: '$420', was: '$600', off: 30, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'women', section: 'bags', sub: 'sunglasses',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/0e/P01015723.jpg',
    href: 'https://www.mytheresa.com/us/en/women/bottega-veneta-rectangular-sunglasses-gold-p01015723' }),
  P('canali-suede-bomber', {
    brand: 'Canali', name: 'Suede bomber jacket',
    now: '$1,725', was: '$3,450', off: 50, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'men', section: 'clothing', sub: 'jackets',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/47/P01137132.jpg',
    href: 'https://www.mytheresa.com/us/en/men/canali-suede-bomber-jacket-blue-p01137132' }),
  P('john-lobb-tide-boat-shoes', {
    brand: 'John Lobb', name: 'Tide leather boat shoes',
    now: '$1,155', was: '$1,925', off: 40, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'men', section: 'shoes', sub: 'loafers',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/0c/P01068888.jpg',
    href: 'https://www.mytheresa.com/us/en/men/john-lobb-leather-boat-shoes-black-p01068888' }),
  P('etro-metallic-paisley-skirt', {
    brand: 'Etro', name: 'Metallic Paisley Tiered Ruffle Maxi Skirt',
    now: '$1,300', was: '$3,250', off: 60, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'clothing', sub: 'skirts',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5465637_100105_m',
    href: 'https://www.bergdorfgoodman.com/p/etro-metallic-paisley-tiered-ruffle-maxi-skirt-prod197180209' }),
  P('zimmermann-alchemy-sheath', {
    brand: 'Zimmermann', name: 'Alchemy Sheath Dress',
    now: '$680', was: '$1,700', off: 60, retailer: 'Neiman Marcus', trust: 'high',
    gender: 'women', section: 'dresses', sub: 'day-dresses',
    img: 'https://media.neimanmarcus.com/f_auto,q_auto:low,ar_4:5,c_fill,dpr_2.0,w_456/01/nm_5585299_100577_m',
    href: 'https://www.neimanmarcus.com/p/zimmermann-alchemy-sheath-dress-prod288820070' }),
  P('christopher-esber-deconstructed-jeans', {
    brand: 'Christopher Esber', name: 'Deconstructed Denim Straight-Leg Jeans',
    now: '$129', was: '$545', off: 76, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'clothing', sub: 'jeans',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_4509508_100380_m',
    href: 'https://www.bergdorfgoodman.com/p/christopher-esber-deconstructed-denim-straight-leg-jeans-prod183380123' }),
  P('elie-saab-bead-embroidered-dress', {
    brand: 'Elie Saab', name: 'Bead Embroidered Dress',
    now: '$11,100', was: '$22,200', off: 50, retailer: 'Elie Saab', trust: 'high',
    gender: 'women', section: 'dresses', sub: 'evening-dresses',
    img: 'https://cdn.shopify.com/s/files/1/0605/8872/0370/files/D1090NR26BE065_DAIQUIRI_20GREEN_1.jpg?v=1768557046',
    href: 'https://eliesaab.com/products/bead-embroidered-long-dress_daiquiri-green_d1090nr26be065' }),
  P('gucci-oval-sunglasses', {
    brand: 'Gucci', name: 'Logo embellished oval sunglasses',
    now: '$476', was: '$680', off: 30, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'women', section: 'bags', sub: 'sunglasses',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/82/P01015740.jpg',
    href: 'https://www.mytheresa.com/us/en/women/gucci-logo-embellished-oval-sunglasses-gold-p01015740' }),
  P('prada-square-sunglasses', {
    brand: 'Prada', name: 'Square sunglasses',
    now: '$312', was: '$520', off: 40, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'men', section: 'bags', sub: 'sunglasses',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/7f/P01110748.jpg',
    href: 'https://www.mytheresa.com/us/en/men/prada-square-sunglasses-gold-p01110748' }),
  P('valentino-feather-lace-maxi', {
    brand: 'Valentino', name: 'Beige Feather Lace Maxi Dress',
    now: '$4,512', was: '$9,400', off: 52, retailer: 'SSENSE', trust: 'good',
    gender: 'women', section: 'dresses', sub: 'maxi-dresses',
    img: 'https://img.ssensemedia.com/image/upload/b_white,c_lpad,g_south,ar_2:3/f_auto,c_limit,w_1920,q_85/261476F055002_1.jpg',
    href: 'https://www.ssense.com/en-us/women/product/valentino/beige-feather-lace-maxi-dress/19248041' }),
  P('saint-laurent-sl-302-lisa', {
    brand: 'Saint Laurent', name: 'SL 302 Lisa diamond-shaped sunglasses',
    now: '$406', was: '$580', off: 30, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'women', section: 'bags', sub: 'sunglasses',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/ab/P00402619.jpg',
    href: 'https://www.mytheresa.com/us/en/women/saint-laurent-sl-302-lisa-diamond-shaped-sunglasses-black-p00402619' }),
  P('dolce-gabbana-floral-jacquard-mini', {
    brand: 'Dolce & Gabbana', name: 'Floral Jacquard Mini Dress',
    now: '$1,058', was: '$2,645', off: 60, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'dresses', sub: 'mini-dresses',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_4918098_100106_m',
    href: 'https://www.bergdorfgoodman.com/p/dolce-gabbana-floral-jacquard-mini-dress-prod190280091' }),
  P('mcqueen-ruffle-cape-gown', {
    brand: 'Alexander McQueen', name: 'Draped Open-Back Ruffle Cape Gown',
    now: '$3,560', was: '$8,900', off: 60, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'dresses', sub: 'evening-dresses',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5362233_100455_m',
    href: 'https://www.bergdorfgoodman.com/p/mcqueen-draped-open-back-ruffle-cape-gown-prod196640552' }),
  P('balenciaga-avenue-palazzo-pumps', {
    brand: 'Balenciaga', name: '110mm Avenue Palazzo Embellished Satin Pumps',
    now: '$875', was: '$1,750', off: 50, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'shoes', sub: 'heels',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5508022_100588_m',
    href: 'https://www.bergdorfgoodman.com/p/balenciaga-110mm-avenue-palazzo-embellished-satin-pumps-prod200590018' }),
  P('versace-silk-blouson', {
    brand: 'Versace', name: 'Oversized silk poplin blouson jacket',
    now: '$1,725', was: '$3,450', off: 50, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'men', section: 'clothing', sub: 'jackets',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/26/P01149555.jpg',
    href: 'https://www.mytheresa.com/us/en/men/versace-oversized-silk-poplin-blouson-jacket-burgundy-p01149555' }),
  P('balmain-blazer-dress', {
    brand: 'Balmain', name: 'Strong-Shoulder Draped Mini Blazer Dress',
    now: '$1,436', was: '$3,590', off: 60, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'dresses', sub: 'mini-dresses',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5502246_100749_m',
    href: 'https://www.bergdorfgoodman.com/p/balmain-strong-shoulder-draped-mini-blazer-dress-prod197860029' }),
  P('burberry-quilted-barn-jacket', {
    brand: 'Burberry', name: 'Beige Quilted Coated Cotton Barn Jacket',
    now: '$1,037', was: '$3,050', off: 66, retailer: 'SSENSE', trust: 'good',
    gender: 'women', section: 'clothing', sub: 'jackets',
    img: 'https://img.ssensemedia.com/image/upload/b_white,c_lpad,g_south,ar_2:3/f_auto,c_limit,w_1920,q_85/261376F063004_1.jpg',
    href: 'https://www.ssense.com/en-us/women/product/burberry/beige-quilted-coated-cotton-barn-jacket/18736761' }),
  P('givenchy-leather-cocoon-coat', {
    brand: 'Givenchy', name: 'Leather Cocoon Coat',
    now: '$5,200', was: '$13,000', off: 60, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'clothing', sub: 'coats',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5068051_100612_m',
    href: 'https://www.bergdorfgoodman.com/p/givenchy-leather-cocoon-coat-prod194930349' }),
  P('santoni-suede-knee-boots', {
    brand: 'Santoni', name: 'Suede Block Heel Knee Boots',
    now: '$780', was: '$1,560', off: 50, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'shoes', sub: 'boots',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5052372_100134_m',
    href: 'https://www.bergdorfgoodman.com/p/santoni-suede-block-heel-knee-boots-prod194420095' }),
  P('ferragamo-satin-scarf-sweater', {
    brand: 'Ferragamo', name: 'Satin Scarf Wool Sweater',
    now: '$700', was: '$1,750', off: 60, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'clothing', sub: 'knitwear',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5032349_100134_m',
    href: 'https://www.bergdorfgoodman.com/p/ferragamo-satin-scarf-wool-sweater-prod194020040' }),
  P('roberto-cavalli-jaguar-mini', {
    brand: 'Roberto Cavalli', name: 'Mini Dress with Baby Jaguar Print and Cut-Out Detail',
    now: '$1,300', was: '$2,650', off: 51, retailer: 'Roberto Cavalli', trust: 'high',
    gender: 'women', section: 'dresses', sub: 'mini-dresses',
    img: 'https://www.robertocavalli.com/dw/image/v2/BGDG_PRD/on/demandware.static/-/Sites-50/default/dw1441ae08/images/zoom/WQT124LNR3103596_ECOM_STILL.jpg?sw=800&sh=1200&strip=false',
    href: 'https://www.robertocavalli.com/en-us/women/ready-to-wear/dresses/mini-dress-with-baby-jaguar-print-and-cut-out-detail--WQT124-LNR31-03596.html' }),
  P('giorgio-armani-linen-cardigan', {
    brand: 'Giorgio Armani', name: 'Linen-blend cardigan',
    now: '$1,297', was: '$2,595', off: 50, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'men', section: 'clothing', sub: 'cardigans',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/b5/P01083229.jpg',
    href: 'https://www.mytheresa.com/us/en/men/giorgio-armani-linen-blend-cardigan-grey-p01083229' }),
  P('canada-goose-chelsea-parka', {
    brand: 'Canada Goose', name: 'Chelsea Down Parka with Detachable Hood',
    now: '$1,046', was: '$1,395', off: 25, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'clothing', sub: 'coats',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5065448_100394_m',
    href: 'https://www.bergdorfgoodman.com/p/canada-goose-chelsea-down-parka-with-detachable-hood-prod198380412' }),
  P('yves-salomon-merinillo-boots', {
    brand: 'Yves Salomon', name: 'Lace-up boots in stiff Merinillo',
    now: '$763', was: '$1,090', off: 30, retailer: 'Yves Salomon', trust: 'high',
    gender: 'women', section: 'shoes', sub: 'boots',
    img: 'https://cdn.shopify.com/s/files/1/0470/0189/5075/files/25WAC604XXMLCIA9051_1.jpg?v=1724685330',
    href: 'https://us.yves-salomon.com/products/merinillo-shoes-stiff-souris-25wac604xxmlcia9051' }),
  P('rick-owens-temple-biker', {
    brand: 'Rick Owens', name: 'Black Temple Sail Biker Jacket',
    now: '$704', was: '$2,345', off: 70, retailer: 'SSENSE', trust: 'good',
    gender: 'women', section: 'clothing', sub: 'jackets',
    img: 'https://img.ssensemedia.com/image/upload/b_white,c_lpad,g_south,ar_2:3/f_auto,c_limit,w_1920,q_85/261232F063005_1.jpg',
    href: 'https://www.ssense.com/en-us/women/product/rick-owens/black-temple-sail-biker-jacket/18685491' }),
  P('maison-margiela-wool-blazer', {
    brand: 'Maison Margiela', name: 'Double-breasted virgin wool blazer',
    now: '$2,376', was: '$3,960', off: 40, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'men', section: 'clothing', sub: 'jackets',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/f8/P01130792.jpg',
    href: 'https://www.mytheresa.com/us/en/men/maison-margiela-double-breasted-leather-blazer-black-p01130792' }),
  P('orlebar-brown-garret', {
    brand: 'Orlebar Brown', name: 'Garret',
    now: '£278', was: '£695', off: 60, retailer: 'Orlebar Brown', trust: 'high',
    gender: 'men', section: 'clothing', sub: 'jackets',
    img: 'https://cdn.shopify.com/s/files/1/0679/6564/9115/files/ORLEBAR-BROWN-GARRET-THASOS-BEACH_279280_FRONT_OB.jpg?v=1725522917',
    href: 'https://orlebarbrown.com/products/garret-white-jackets-279280' }),
  P('tods-suede-bomber', {
    brand: "Tod's", name: 'Suede bomber jacket',
    now: '$3,461', was: '$4,945', off: 30, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'men', section: 'clothing', sub: 'jackets',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/be/P01121501.jpg',
    href: 'https://www.mytheresa.com/us/en/men/tods-suede-bomber-jacket-blue-p01121501' }),
  P('missoni-pleated-brocade-skirt', {
    brand: 'Missoni', name: 'Pleated Brocade Midi Skirt',
    now: '$876', was: '$2,190', off: 60, retailer: 'Bergdorf Goodman', trust: 'high',
    gender: 'women', section: 'clothing', sub: 'skirts',
    img: 'https://media.bergdorfgoodman.com/f_auto,q_auto/01/bg_5502812_100606_m',
    href: 'https://www.bergdorfgoodman.com/p/missoni-pleated-brocade-midi-skirt-prod197990284' }),
  P('herno-hooded-down-jacket', {
    brand: 'Herno', name: 'Hooded down jacket',
    now: '$765', was: '$1,275', off: 40, retailer: 'Mytheresa', region: 'US', trust: 'good',
    gender: 'men', section: 'clothing', sub: 'coats',
    img: 'https://img.mytheresa.com/512/512/66/jpeg/catalog/product/de/P01070031.jpg',
    href: 'https://www.mytheresa.com/us/en/men/herno-hooded-down-jacket-black-p01070031' }),
  P('jacquemus-tablier-midi', {
    brand: 'Jacquemus', name: "Off-White 'The Tablier' Midi Dress",
    now: '$417', was: '$1,390', off: 70, retailer: 'SSENSE', trust: 'good',
    gender: 'women', section: 'dresses', sub: 'midi-dresses',
    img: 'https://img.ssensemedia.com/image/upload/b_white,c_lpad,g_south,ar_2:3/f_auto,c_limit,w_1920,q_85/261553F054000_1.jpg',
    href: 'https://www.ssense.com/en-us/women/product/jacquemus/off-white-the-tablier-midi-dress/18918121' }),
  P('jimmy-choo-maxima-knee-boots', {
    brand: 'Jimmy Choo', name: 'Maxima 35 snake-effect leather knee boots',
    now: '$848', was: '$1,695', off: 50, retailer: 'Net-a-Porter', region: 'US', trust: 'high',
    gender: 'women', section: 'shoes', sub: 'boots',
    img: 'https://www.net-a-porter.com/variants/images/46376663162876819/in/w358_q60.jpg',
    href: 'https://www.net-a-porter.com/en-us/shop/product/jimmy-choo/shoes/knee-high/maxima-35-snake-effect-leather-knee-boots/46376663162876819' })
];

/* price as a number, for sorting and the max-price filter. Currency
   is left as listed (two GBP listings came through) - converting is
   the feed's job, not the page's. */
export const priceOf = s => Number(String(s).replace(/[^0-9.]/g, '')) || 0;
