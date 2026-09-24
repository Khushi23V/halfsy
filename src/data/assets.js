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
