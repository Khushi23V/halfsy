import { prefersReducedMotion } from '../lib/scroll.js';

/* BEAT 7 - the footer never moves. It sits fixed at a lower z-index
   and the opaque page scrolls up off it. The spacer between </main>
   and <footer> is what gives it room to be uncovered.

   Returns a cleanup: the resize listener is a plain DOM listener and
   would otherwise survive a StrictMode remount. */
export function initFooter() {
  if (prefersReducedMotion) return;
  const footer = document.querySelector('.footer');
  const spacer = document.querySelector('.footer__spacer');
  if (!footer || !spacer) return;

  const sync = () => { spacer.style.height = footer.offsetHeight + 'px'; };
  sync();
  window.addEventListener('resize', sync);

  return () => window.removeEventListener('resize', sync);
}
