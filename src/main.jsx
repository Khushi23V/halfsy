import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/tokens.css';
import './styles/base.css';
import './styles/beats.css';
import './styles/look.css';
import './styles/spot.css';
import './styles/cover.css';
import './styles/bleed.css';
import './styles/trio.css';
import './styles/about.css';
import './styles/paper.css';
import './styles/shop.css';
import './styles/brands.css';
import './styles/product.css';

import App from './App.jsx';
import ShopPage from './shop/ShopPage.jsx';
import BrandsPage from './brands/BrandsPage.jsx';
import ProductPage from './product/ProductPage.jsx';

/* Four pages, no router dependency: anything under /shop is the
   listings page (it reads its own section/subcategory from the path),
   /brands is the A-Z index, /p/:id is a product screen, everything
   else is the scroll-driven landing page. Vite's dev
   server already falls back to index.html for unknown paths; the
   production host needs the same SPA rewrite. */
const isShop   = /^\/shop(\/|$)/.test(location.pathname);
const isBrands = /^\/brands\/?$/.test(location.pathname);
const isProduct = /^\/p\/[^/]+\/?$/.test(location.pathname);

/* The landing page has three openings, each at its own address so
   they can be compared side by side:
     /          the full-screen photograph (components/Bleed.jsx)
     /overlap   the overlap headline       (components/Cover.jsx)
     /classic   the first one - card carousel, maroon fill and
                manifesto, image beat      (Hero.jsx + Story.jsx)
   Everything below the opening is the same page in all three. To make
   another one the default, change 'bleed' at the end of `opening`. */
const OPENINGS = { '/overlap': 'cover', '/classic': 'classic' };
const opening = OPENINGS[location.pathname.replace(/\/+$/, '')] || 'bleed';

/* Scroll-driven page. If the browser restores a mid-page scroll
   position on reload, ScrollTrigger initialises against a layout that
   has not settled - images undecoded, fonts unswapped - and every beat
   is measured wrong. That is the reload-dependent weirdness: the CTA
   appearing while products are still on screen, copy arriving early.
   Always start at the top and let the beats build from a known state. */
if (!isShop && !isBrands && !isProduct) {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isShop ? <ShopPage /> : isBrands ? <BrandsPage /> : isProduct ? <ProductPage />
      : <App variant={opening} />}
  </React.StrictMode>
);