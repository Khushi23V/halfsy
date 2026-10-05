/* ============================================================
   assets.js - every filename the page references, in one place.

   If you rename a file on disk, change it here and nowhere else.
   ============================================================ */

/* ---- beats 1+2: scatter cards ---------------------------------
   `style` is the position. left/right and top are percentages of
   the viewport; width is px. NO height - the image sets it, which
   is what stops the letterboxing.

   `speed` is the drift multiplier. Higher = nearer the camera =
   clears the screen sooner. hero.js maps the range you use onto
   18-26% of the beat, so only the relative order matters.

   These are the positions I proposed, not the ones you have been
   nudging in your own index.html. Paste yours over the `style`
   values if you prefer them.
   ------------------------------------------------------------ */
export const HERO_CARDS = [
  { src: '/images/hero/hero-03.avif', speed: 0.92, style: { left:  '-5%', top: '20%', width: 235 },
    brand: 'Etro',              name: 'Printed silk halter dress', now: '$640',   was: '$1,480' },
  { src: '/images/hero/hero-02.avif', speed: 1.05, style: { left:  '24%', top: '-6%', width: 165 },
    brand: 'Jacquemus',         name: 'Linen tailored jacket',    now: '$595',   was: '$1,190' },
  { src: '/images/hero/hero-11.avif', speed: 0.88, style: { left:  '47%', top:  '5%', width: 200 },
    brand: 'Roberto Cavalli',   name: 'Chain-strap sandal',       now: '$980',   was: '$2,450' },
  { src: '/images/hero/hero-04.avif', speed: 1.12, style: { right: '12%', top: '10%', width: 180 },
    brand: 'Jimmy Choo',        name: 'Chain-strap leather mule', now: '$472',   was: '$1,050' },
  { src: '/images/hero/hero-05.avif', speed: 0.98, style: { right: '-5%', top: '34%', width: 160 },
    brand: 'Burberry',          name: 'Cotton trench coat',       now: '$1,140', was: '$2,850' },
  { src: '/images/hero/hero-06.avif', speed: 1.18, style: { left:   '9%', top: '55%', width: 170 },
    brand: 'Cult Gaia',         name: 'Pleated satin maxi',       now: '$412',   was: '$895'   },
  { src: '/images/hero/hero-07.avif', speed: 1.30, style: { left:  '31%', top: '68%', width: 200 },
    brand: 'AMI Paris',         name: 'Wool blend overshirt',     now: '$338',   was: '$720'   },
  { src: '/images/leather.avif',     speed: 1.24, style: { left:  '58%', top: '62%', width: 235 },
    brand: 'Alexander McQueen', name: 'Leather overshirt',        now: '$1,560', was: '$3,900' }
];
/* ---- beat 5: products --------------------------------------
   Placeholder copy and prices. Real listings will come from the
   shop API - this is the shape they need to arrive in.
   ------------------------------------------------------------ */
export const PRODUCTS = [
  { src: '/images/hero/hero-02.avif', name: 'Metallic Paisley Tiered Ruffle', now: '$1,300', was: '$3,250' },
  { src: '/images/hero/hero-04.avif', name: 'Metallic Paisley Tiered Ruffle', now: '$1,300', was: '$3,250' },
  { src: '/images/hero/hero-06.avif', name: 'Metallic Paisley Tiered Ruffle', now: '$1,300', was: '$3,250' },
  { src: '/images/hero/hero-07.avif', name: 'Metallic Paisley Tiered Ruffle', now: '$1,300', was: '$3,250' },
 
];

/* ---- beat 6: brand marks -----------------------------------
   Filenames exactly as they came off your download folder, spaces
   and parentheses included. They work - the browser encodes them -
   but they are fragile: a stray rename, a case change, or moving
   the project to a case-sensitive host will break them silently.
   Renaming to brand-01.png ... brand-12.png and editing this list
   is 5 minutes well spent.

   `label` is real alt text. Brand marks are content, not decoration:
   a screen reader announcing "Brand" ten times tells you nothing.
   ------------------------------------------------------------ */
export const BRANDS = [
  { src: '/images/brands/brand-01 (1).png',                 label: 'Gucci' },
  { src: '/images/brands/brand-01 (2).png',                 label: 'Cult Gaia' },
  { src: '/images/brands/brand-01 (3).png',                 label: 'Burberry' },
  { src: '/images/brands/brand-01 (4).png',                 label: 'AMI Alexandre Mattiussi' },
  { src: '/images/brands/brand-01 (5).png',                 label: 'Alexander McQueen' },
  { src: '/images/brands/brand-01 (6).png',                 label: 'Alémais' },
  { src: '/images/brands/brand-01 (7).png',                 label: 'Roberto Cavalli' },
  { src: '/images/brands/brand-01 (8).png',                 label: 'Maison Margiela' },
  { src: '/images/brands/brand-01 (9).png',                 label: 'Jacquemus' },
  { src: '/images/brands/brand-01 (10).png',                label: 'Jimmy Choo' },
  { src: '/images/brands/images__2_-removebg-preview.png',  label: 'Etro' },
  { src: '/images/brands/images__3_-removebg-preview.png',  label: 'Giorgio Armani' }
];

/* ---- single images ----------------------------------------- */
export const STORY_IMAGE  = '/images/bg.png';
export const FOOTER_IMAGE = '/images/footer.png';

/* ---- beat 2: the typed copy --------------------------------
   Kept here so the character spans can be generated from the
   source text rather than by rewriting the DOM afterwards.
   ------------------------------------------------------------ */
export const CIRCLE_COPY =
  'The piece was always the same. Only the price moved. ' +
  'We watch the retailers worth watching and collect what has come down ' +
  'in price, and every listing takes you straight to the original store.';

export const MARQUEE = [
  { text: 'CLOTHING,',                      style: 'serif' },
  { text: 'SHOES,',                     style: 'serif' },
  { text: 'ACCESSORIES,',                     style: 'serif' },
  { text: 'everything at the best price', style: 'sans'  }
];

/* Append to the end of src/data/assets.js */

/* ---- beat 7: the overnight edition ------------------------------
   Four prices that fell in the night, set as the front page of a
   morning paper. The first entry is the lead story. `headline` and
   `dek` are written, not generated - a paper's voice is the point -
   and the % off is worked out from was/now so it can never disagree
   with the prices printed under it.

   Timestamps are the argument: a price that moved at 02:41 is a
   price nobody announced. PLACEHOLDERS - pieces, prices and times
   come from the overnight feed when it exists; images are the hero
   packshots picked to roughly match each piece.
   ------------------------------------------------------------ */
export const DROPS = [
  { src: '/images/hero/hero-02.avif', time: '02:41',
    brand: 'Alexander McQueen', piece: 'Draped crepe gown',
    was: '$3,900', now: '$1,560',
    headline: 'McQueen gown falls 60% in the small hours',
    dek: 'The draped crepe gown went from $3,900 to $1,560 at 02:41. Nobody announced it. We happened to be watching.' },
  { src: '/images/hero/hero-08.avif', time: '04:08',
    brand: 'Jacquemus', piece: 'Linen tailored jacket',
    was: '$1,190', now: '$595',
    headline: 'Jacquemus jacket, now exactly half' },
  { src: '/images/hero/hero-03.avif', time: '05:52',
    brand: 'Roberto Cavalli', piece: 'Printed silk midi',
    was: '$2,450', now: '$980',
    headline: 'Cavalli silk slides under a thousand' },
  { src: '/images/hero/hero-11.avif', time: '07:19',
    brand: 'Jimmy Choo', piece: 'Chain-strap leather mule',
    was: '$1,050', now: '$472',
    headline: 'Jimmy Choo mules drop before breakfast' }
];
/* ---- beat 8: one piece, watched ------------------------------
   Five readings, not a live feed. The line only has to show that the
   piece stayed still while the number fell.
   ------------------------------------------------------------ */
export const PRICE_HISTORY = {
  brand: 'Roberto Cavalli',
  piece: 'Metallic paisley tiered gown',
  points: [
    { label: 'March',     value: 3250 },
    { label: 'May',       value: 3250 },
    { label: 'July',      value: 2600 },
    { label: 'September', value: 1950 },
    { label: 'Today',     value: 1300 }
  ]
};


export const REVIEWS = [
  { video: '/videos/review-01.mp4', poster: '/videos/review-01.jpg',
    who: 'R.M.', city: 'Mumbai',    piece: 'Burberry trench',      saved: '$1,710' },
  { video: '/videos/review-02.mp4', poster: '/videos/review-02.jpg',
    who: 'A.K.', city: 'Delhi',     piece: 'Jacquemus jacket',     saved: '$595'   },
  { video: '/videos/review-03.mp4', poster: '/videos/review-03.jpg',
    who: 'S.V.', city: 'Bengaluru', piece: 'Jimmy Choo mules',     saved: '$578'   },
  { video: '/videos/review-04.mp4', poster: '/videos/review-04.jpg',
    who: 'N.D.', city: 'Dubai',     piece: 'Roberto Cavalli midi', saved: '$1,470' },
  { video: '/videos/review-05.mp4', poster: '/videos/review-05.jpg',
    who: 'P.J.', city: 'Chennai',   piece: 'Etro jacquard skirt',  saved: '$840'   },
  { video: '/videos/review-06.mp4', poster: '/videos/review-06.jpg',
    who: 'M.S.', city: 'Kolkata',   piece: 'Raw Mango silk',       saved: '\u20b932,000' }
];

/* ---- nav: menu sections --------------------------------------
   One image per section, matched to the feature it links to
   (Knitwear, Evening, Boots, Shoulder Bags). The image
   licence follows the merchant it links to, not the brand in it.
   "All ..." links to the section itself; everything else is slugged
   onto the section's href. */
export const MENU = [
  { id: 'clothing', label: 'Clothing', href: '/shop/clothing',
    items: ['All Clothing', 'Blouses', 'Cardigans', 'Coats', 'Denim', 'Jackets',
            'Jeans', 'Knitwear', 'Pants', 'Shirts', 'Skirts', 'Suits & Co-ords', 'Tops'],
    feature: { label: 'Knitwear', href: '/shop/clothing/knitwear', image: '/images/knit.avif' } },

  { id: 'dresses', label: 'Dresses', href: '/shop/dresses',
    items: ['All Dresses', 'Mini Dresses', 'Midi Dresses', 'Maxi Dresses',
            'Evening Dresses', 'Day Dresses', 'Knit Dresses', 'Shirt Dresses'],
    feature: { label: 'Evening', href: '/shop/dresses/evening-dresses', image: '/images/hero/hero-07.avif' } },

  { id: 'shoes', label: 'Shoes', href: '/shop/shoes',
    items: ['All Shoes', 'Boots', 'Ankle Boots', 'Heels', 'Flats',
            'Loafers', 'Mules', 'Sandals', 'Sneakers'],
    feature: { label: 'Boots', href: '/shop/shoes/boots', image: '/images/boots.avif' } },

  { id: 'bags', label: 'Bags & Accessories', href: '/shop/bags-and-accessories',
    items: ['All Bags', 'Shoulder Bags', 'Tote Bags', 'Crossbody Bags', 'Clutches',
            'Belts', 'Jewellery', 'Scarves', 'Sunglasses'],
    feature: { label: 'Shoulder Bags', href: '/shop/bags-and-accessories/shoulder-bags', image: '/images/bag.avif',
               fit: 'contain', bg: '#F1F1F1' } }
];

/* ---- beat 5b: the edits --------------------------------------
   Four edits by occasion, laid out like a magazine spread: one lead,
   two portraits, one landscape. The saving lives in `line` - on the
   edit, never as a badge on every card.

   PLACEHOLDERS. The images are the hero packshots until real edit
   photography exists; `alt` is the hover swap. `count` and the
   "up to" figure must come from live data before launch - an
   "up to 60%" that is not true of at least one piece in the edit is
   the one claim this section cannot afford to get wrong.

   `layout` is read by the CSS grid: lead | portrait | landscape.
   ------------------------------------------------------------ */
export const EDITS = [
  { id: 'the-wedding-guest', layout: 'lead',
    title: 'The Wedding Guest', line: 'Up to 60% under retail', count: 48,
    intro: 'Gowns, drapes and heels that carry you from the sangeet to the reception.',
    src: '/images/hero/hero-02.avif', alt: '/images/hero/hero-03.avif' },
  { id: 'festive', layout: 'portrait',
    title: 'Festive', line: 'Up to 55% under retail', count: 36,
    src: '/images/hero/hero-01.avif', alt: '/images/hero/hero-05.avif' },
  { id: 'desk-to-dinner', layout: 'portrait',
    title: 'Desk to Dinner', line: 'Up to 65% under retail', count: 52,
    src: '/images/hero/hero-06.avif', alt: '/images/hero/hero-07.avif' },
  { id: 'resort', layout: 'landscape',
    title: 'Resort', line: 'Up to 70% under retail', count: 29,
    src: '/images/hero/hero-10.jpg', alt: '/images/hero/hero-09.jpg' }
];


/* ---- beat 5b: five to fall for -------------------------------
   Five FW26 trends, one per menu category, each linking to the
   subcategory it lives in (hrefs match MENU below). The caption is
   the trend, not a product - the shop behind the link does the rest.

   Trends from the FW26 runway reports (Who What Wear, PORTER, Marie
   Claire, Sept 2026) - `seen` is who showed it, kept for copy/alt.

   Images: leather, knit, boots and bag are the trend shots in
   /public/images/. Jeans is still a placeholder packshot (wide-leg,
   not cigarette). `fit: 'contain'` is for landscape shots (the bag),
   with `bg` set to the photo's own backdrop so the frame edge vanishes.
   ------------------------------------------------------------ */
export const STAPLES = [
  { id: 'tailored-leather', category: 'Jackets',
    trend: 'Tailored Leather',    seen: 'Calvin Klein, Ralph Lauren, Khaite',
    href: '/shop/clothing/jackets',                  src: '/images/leather.avif' },
  { id: 'sheer-knits',      category: 'Knitwear',
    trend: 'Sheer Knits',         seen: 'Across the FW26 runways',
    href: '/shop/clothing/knitwear',                 src: '/images/knit.avif' },
  { id: 'cigarette-jeans',  category: 'Jeans',
    trend: 'Cigarette Jeans',     seen: 'Kallmeyer, Tot\u00eame, Gucci',
    href: '/shop/clothing/jeans',                    src: '/images/hero/hero-04.avif' },
  { id: 'stiletto-boots',   category: 'Boots',
    trend: 'The Stiletto Boot',   seen: 'Tom Ford, Khaite, Schiaparelli',
    href: '/shop/shoes/boots',                       src: '/images/boots.avif' },
  { id: 'slouchy-hobo',     category: 'Shoulder Bags',
    trend: 'The Slouchy Hobo',    seen: 'Chlo\u00e9, Herm\u00e8s, Miu Miu, Chanel',
    href: '/shop/bags-and-accessories/shoulder-bags', src: '/images/bag.avif',
    fit: 'contain', bg: '#F1F1F1' }
];


/* ---- beat 7: get the look ------------------------------------
   One styled model, six real listings from the live site. Each piece
   has a dot on the model; `x` / `y` place it as a percentage of the
   IMAGE (0,0 = top left), so the dots stay on the garment at any size.

   The image is a transparent cut-out, cropped tight to the figure -
   if it is replaced, crop the new one tight as well or the dots will
   drift. It was generated (Gemini) from the six product photos; check
   every piece still matches its listing before it goes live.

   `img` is the retailer's own product photo (~1000px renditions),
   `href` the listing. Prices as listed on halfsy.shop, 4 Oct 2026 -
   the jumper is in pounds because N. Peal sells in GBP.
   ------------------------------------------------------------ */
export const LOOK = {
  image: '/images/look/look-01.png',
  ratio: '348 / 1051',
  pieces: [
    { id: 'sunglasses', x: 50, y: 7,
      brand: 'Saint Laurent', name: 'SL 706 square sunglasses',
      now: '$395', was: '$565', retailer: 'Mytheresa',
      href: 'https://www.mytheresa.com/us/en/women/saint-laurent-sl-706-square-sunglasses-gold-p01043425',
      img: 'https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/13/P01043425.jpg' },
    { id: 'jumper', x: 52, y: 27,
      brand: 'N. Peal', name: 'Luna roll neck cashmere jumper',
      now: '£175', was: '£265', retailer: 'N. Peal',
      href: 'https://www.npeal.com/products/polo-neck-cashmere-sweater-ecru-white',
      img: 'https://cdn.shopify.com/s/files/1/0498/3262/4292/products/AW21_NPW001867_E34_1.jpg?v=1628171324&width=1000' },
    { id: 'jacket', x: 16.5, y: 34,
      brand: 'Elie Saab', name: 'Leather jacket',
      now: '$2,350', was: '$4,700', retailer: 'Elie Saab',
      href: 'https://eliesaab.com/products/leather-jacket_brown_j0203nr26l0001',
      img: 'https://cdn.shopify.com/s/files/1/0605/8872/0370/files/J0203NR26L0001_BROWN_1.jpg?v=1763710910&width=1000' },
    { id: 'kilt', x: 50, y: 53,
      brand: 'Burberry', name: 'Check wool mini kilt',
      now: '$583', was: '$1,495', retailer: 'SSENSE',
      href: 'https://www.ssense.com/en-us/women/product/burberry/beige-check-wool-mini-kilt-miniskirt/18736501',
      img: 'https://img.ssensemedia.com/image/upload/b_white,c_lpad,g_south,ar_2:3/f_auto,c_limit,w_1000,q_85/261376F090000_1.jpg' },
    { id: 'bag', x: 12, y: 60.5,
      brand: 'Brunello Cucinelli', name: 'Mellow Mini leather bag',
      now: '$2,240', was: '$3,200', retailer: 'Mytheresa',
      href: 'https://www.mytheresa.com/us/en/women/brunello-cucinelli-mellow-mini-leather-crossbody-bag-brown-p01131687',
      img: 'https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/af/P01131687.jpg' },
    { id: 'boots', x: 68, y: 85,
      brand: 'Jimmy Choo', name: 'Maxima snake-effect knee boots',
      now: '$848', was: '$1,695', retailer: 'Net-a-Porter',
      href: 'https://www.net-a-porter.com/en-us/shop/product/jimmy-choo/shoes/knee-high/maxima-35-snake-effect-leather-knee-boots/46376663162876819',
      img: 'https://www.net-a-porter.com/variants/images/46376663162876819/in/w920_q60.jpg' }
  ]
};

/* ------------------------------------------------------------
   The spotlight (beat 8, components/Spot.jsx) - one category in
   season: a model photograph on the left, four pieces on the right.

   `image` is the photograph (portrait; it is cropped to fill half the
   screen). `focus` is the point of it that must stay in view when it
   is cropped - a CSS object-position, x then y. `pieces` is exactly
   four, in reading order. Prices as listed on halfsy.shop, 4 Oct 2026
   - the scarf is in pounds because N. Peal sells in GBP.
   ------------------------------------------------------------ */
export const SPOT = {
  title: 'A season in red',
  image: 'https://cdn.shopify.com/s/files/1/0336/7793/files/241007_DR_CULT_GAIAxKNOX_HO24_LOOK_47_0018_WEB.jpg?v=1729572850',
  alt: 'Model in a red one-shoulder gown with a cut-out at the waist, holding a gold clutch',
  focus: '50% 14%',
  pieces: [
    { id: 'top', brand: 'Cult Gaia', name: 'Anita halter top',
      now: '$348', was: '$458', retailer: 'Cult Gaia',
      href: 'https://cultgaia.com/products/anita-top-ghermez',
      img: 'https://cdn.shopify.com/s/files/1/0336/7793/files/251110_DR_CULT_GAIA_R26_RESHOOTS_71_CHANTEL_SKIRT_RED_ANITA_TOP_0020_WEBBED.jpg?v=1763347098&width=1000' },
    { id: 'pumps', brand: 'Santoni', name: 'Suede buckle pumps',
      now: '$465', was: '$930', retailer: 'Bergdorf Goodman',
      href: 'https://www.bergdorfgoodman.com/p/santoni-55mm-suede-buckle-mid-heel-pumps-prod197270052',
      img: 'https://media.bergdorfgoodman.com/f_auto,q_auto,w_1000/01/bg_5433586_100508_m' },
    { id: 'tote', brand: 'Miu Miu', name: 'Pre-owned leather tote',
      now: '$1,428', was: '$1,866', retailer: 'Farfetch',
      href: 'https://www.farfetch.com/shopping/women/miu-miu-pre-owned-2010-2015-leather-tote-bag-item-31020143.aspx',
      img: 'https://cdn-images.farfetch-contents.com/31/02/01/43/31020143_60109979_1000.jpg' },
    { id: 'scarf', brand: 'N. Peal', name: 'Cashmere check scarf',
      now: '£90', was: '£125', retailer: 'N. Peal',
      href: 'https://www.npeal.com/products/unisex-cashmere-check-scarf-red-grey',
      img: 'https://cdn.shopify.com/s/files/1/0498/3262/4292/files/SS25_NPA108503_R18_2.jpg?v=1741855886&width=1000' }
  ]
};

/* ------------------------------------------------------------
   TRIAL - the overlap section (components/Cover.jsx).

   `lead` stays on the page, `tail` crosses onto the photograph.
   `image` is a vertical model shot from a live listing and `piece`
   is that listing, credited under the photo. `focus` is the CSS
   object-position that keeps her in frame when the photo is cropped.
   `detail` is where the narrow second frame looks on that same photo
   (a CSS background-position, x then y) - delete the line for a
   single frame. `head` is the headline's face: 'caps' (Cormorant
   capitals), 'serif' (Cormorant lowercase) or 'urbanist' (Urbanist
   light, lowercase). Price as listed on halfsy.shop, 5 Oct 2026.
   ------------------------------------------------------------ */
export const COVER = {
  head: 'caps',
  lead: 'Luxury for',
  tail: 'less',
  note: 'The pieces worth wanting, at the price worth waiting for. We watch the stores worth watching and list each piece the moment its price comes down, with a link straight to the original store.',
  cta: { label: 'Shop the best deals', href: '/shop' },
  image: 'https://cdn.shopify.com/s/files/1/0336/7793/files/251110_DR_CULT_GAIA_R26_RESHOOTS_59_HANSAL_GOWN_WHITE_0005_WEBBED.jpg?v=1763345911&width=1600',
  alt: 'Model in an off-white gown with a feathered hem',
  focus: '50% 15%',
  detail: '50% 86%',
  piece: {
    brand: 'Cult Gaia', name: 'Hansal gown',
    now: '$2,018', was: '$2,698', retailer: 'Cult Gaia',
    href: 'https://cultgaia.com/products/hansal-gown-off-white'
  }
};

/* ------------------------------------------------------------
   LANDING IDEA ONE - the full-screen photograph
   (components/Bleed.jsx).

   `lines` are the two lines of the headline. `image` is a model shot
   from a live listing and `piece` is that listing, credited beside
   the button. A tall photo on a wide screen is cropped to a band:
   `focus` picks the band (CSS object-position, x then y), and
   `focusPhone` does the same on an upright screen, where the crop is
   from the sides. `picks` are the small pictures in the top right -
   three live listings, each linking to its retailer.
   Prices as listed on halfsy.shop, 6 Oct 2026.
   ------------------------------------------------------------ */
export const BLEED = {
  lines: ['Luxury', 'for less'],
  note: 'The pieces worth wanting, at the price worth waiting for. Each one links straight to the original store.',
  cta: { label: 'Shop now', href: '/shop' },
  image: 'https://cdn.shopify.com/s/files/1/0336/7793/files/Frame9.jpg?v=1775775260',
  alt: 'Model in a rust knit dress lying back on a white lattice lounger beside dark water',
  focus: '50% 43%',
  focusPhone: '86% 50%',
  piece: {
    brand: 'Cult Gaia', name: 'Kaya knit dress',
    now: '$598', was: '$798', retailer: 'Cult Gaia',
    href: 'https://cultgaia.com/products/kaya-cover-up-saddle'
  },
  picks: [
    { id: 'bag', brand: 'Cult Gaia', name: 'Tazia shoulder bag', now: '$418', was: '$558',
      href: 'https://cultgaia.com/products/tazia-shoulder-toasted-caramel',
      img: 'https://cdn.shopify.com/s/files/1/0336/7793/files/TAZIA_TC_260123_Cult-Gaia_Product17047copy.jpg?v=1770685713&width=400' },
    { id: 'sandal', brand: 'Cult Gaia', name: 'Rene sandal', now: '$518', was: '$698',
      href: 'https://cultgaia.com/products/rene-sandal-cervino',
      img: 'https://cdn.shopify.com/s/files/1/0336/7793/files/RENESANDAL_CERV_250924_CultGaia__R26-AX__10432_WEBBED_86658a5b-7447-4648-b3d5-e71bb1bd6e37.jpg?v=1762214999&width=400' },
    { id: 'earring', brand: 'Cult Gaia', name: 'Winnie earrings', now: '$178', was: '$298',
      href: 'https://cultgaia.com/products/winnie-earring-brushed-brass',
      img: 'https://cdn.shopify.com/s/files/1/0336/7793/files/WinnieEarringBrushedBrass.jpg?v=1738719002&width=400' }
  ]
};

/* ------------------------------------------------------------
   The three-word section under the opening (components/Trio.jsx).

   `words` run across the top; the last one sits on the far side of
   the search bar, whose placeholder is `search`. `face` is 'sans'
   (Urbanist) or 'serif' (Cormorant capitals). `image` is a model shot
   from a live listing, given WITHOUT a width - the component asks the
   CDN for the sizes it needs. It is cropped to a wide band: `focus`
   picks the band (CSS object-position), `focusPhone` the upright crop
   on a phone. `piece` is that listing (the photo links to it).
   Price as listed on halfsy.shop, 6 Oct 2026.
   ------------------------------------------------------------ */
export const TRIO = {
  face: 'sans',
  words: ['Luxury', 'for', 'less'],
  search: 'Search brands, pieces',
  image: 'https://cdn.shopify.com/s/files/1/0336/7793/files/250903_DR_CG_60_HAISLEY_TOP_LT-GOLD_CHANTEL_SKIRT_GOLD_0040_WEBBED.jpg?v=1760997965',
  alt: 'Close view of a light gold beaded top worn with gold hoop earrings',
  focus: '50% 3%',
  focusPhone: '50% 0%',
  piece: {
    brand: 'Cult Gaia', name: 'Haisley top',
    now: '$968', was: '$1,298', retailer: 'Cult Gaia',
    href: 'https://cultgaia.com/products/haisley-top-light-gold'
  }
};
