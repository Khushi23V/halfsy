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
  { src: '/images/hero/hero-10.jpg',  speed: 0.92, style: { left:  '-5%', top: '20%', width: 235 } },
  { src: '/images/hero/hero-02.avif', speed: 1.05, style: { left:  '24%', top: '-6%', width: 165 } },
  { src: '/images/hero/hero-09.jpg',  speed: 0.88, style: { left:  '47%', top:  '5%', width: 200 } },
  { src: '/images/hero/hero-04.avif', speed: 1.12, style: { right: '12%', top: '10%', width: 180 } },
  { src: '/images/hero/hero-05.avif', speed: 0.98, style: { right: '-5%', top: '34%', width: 160 } },
  { src: '/images/hero/hero-06.avif', speed: 1.18, style: { left:   '9%', top: '55%', width: 170 } },
  { src: '/images/hero/hero-07.avif', speed: 1.30, style: { left:  '31%', top: '68%', width: 200 } },
  { src: '/images/hero/hero-03.avif', speed: 1.24, style: { left:  '58%', top: '62%', width: 235 } }
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
  { src: '/images/hero/hero-03.avif', name: 'Metallic Paisley Tiered Ruffle', now: '$1,300', was: '$3,250' }
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
  { text: 'SHIRTS,',                      style: 'serif' },
  { text: 'DRESSES,',                     style: 'serif' },
  { text: 'JACKETS,',                     style: 'serif' },
  { text: 'everything at the best price', style: 'sans'  }
];

/* Append to the end of src/data/assets.js */

/* ---- beat 7: overnight drops --------------------------------
   Timestamps are the point. A price that moved at 02:41 is a price
   nobody announced - which is the whole proposition, said without
   claiming it. Real data replaces this from the same shape.
   ------------------------------------------------------------ */
/* Replace the existing DROPS array in src/data/assets.js with this -
   it now carries an image per pick. */

export const DROPS = [
  { src: '/images/products/product-01.jpg', time: '02:41',
    brand: 'Alexander McQueen', piece: 'Draped crepe gown',
    was: '$3,900', now: '$1,560' },
  { src: '/images/products/product-02.jpg', time: '04:08',
    brand: 'Jacquemus', piece: 'Linen tailored jacket',
    was: '$1,190', now: '$595' },
  { src: '/images/products/product-03.jpg', time: '05:52',
    brand: 'Roberto Cavalli', piece: 'Printed silk midi',
    was: '$2,450', now: '$980' },
  { src: '/images/products/product-04.jpg', time: '07:19',
    brand: 'Jimmy Choo', piece: 'Chain-strap leather mule',
    was: '$1,050', now: '$472' }
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
