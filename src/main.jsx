import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/tokens.css';
import './styles/base.css';
import './styles/beats.css';

import App from './App.jsx';

/* Scroll-driven page. If the browser restores a mid-page scroll
   position on reload, ScrollTrigger initialises against a layout that
   has not settled - images undecoded, fonts unswapped - and every beat
   is measured wrong. That is the reload-dependent weirdness: the CTA
   appearing while products are still on screen, copy arriving early.
   Always start at the top and let the beats build from a known state. */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);