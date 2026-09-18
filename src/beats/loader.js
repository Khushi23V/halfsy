import { gsap, ScrollTrigger, prefersReducedMotion,
         lockScroll, unlockScroll } from '../lib/scroll.js';

/* ============================================================
   The intro.

   A NOTE ON "WRITING" THE LOGO: these paths are filled letter shapes,
   not a single handwritten stroke, so there is no pen path to follow.
   What a dasharray draw actually traces is each letter's OUTLINE -
   around the outside and back around its counters. Done slowly that
   looks like a technical trace, not handwriting.

   So the draw runs fast and thin, left to right, and its job is to
   sketch the word in outline; the weight then fills in behind it. The
   fill is what the eye reads as the logo arriving. The stagger is
   sorted by each path's x position rather than its order in the file,
   which is what makes it read left to right at all - the paths are in
   neither visual nor alphabetical order in the SVG.
   ============================================================ */

let resolveReady;
let ready;

/* Rebuilt per mount. StrictMode mounts twice in development, and a
   promise resolved by the first mount would let the second mount's
   hero intro fire while this overlay was still up. */
function resetReady() {
  ready = new Promise(res => { resolveReady = res; });
}
resetReady();

/* Anything that should start only once the page is uncovered waits on
   this. A promise, not an event, so a listener that attaches after the
   loader has already finished still fires. */
export const whenReady = () => ready;

const MIN_MS = 1400;   // the floor: long enough to read as deliberate

export function initLoader() {
  resetReady();

  const el = document.querySelector('.loader');
  if (!el) { resolveReady(); return; }

  // a remount inherits the previous run's inline display:none
  el.style.display = '';
  lockScroll();

  const paths = gsap.utils.toArray('.loader__logo path', el);

  const finish = () => {
    unlockScroll();
    ScrollTrigger.refresh();   // layout is finally stable
    resolveReady();
  };

  if (prefersReducedMotion) {
    gsap.set(paths, { fillOpacity: 1 });
    gsap.to(el, { autoAlpha: 0, duration: 0.3, onComplete: () => {
      el.style.display = 'none'; finish();
    }});
    return;
  }

  /* Sort by horizontal position so the stagger runs left to right.
     getBBox is in the SVG's own coordinate space, which is what we
     want - it is independent of how the logo is scaled on screen. */
  const ordered = paths
    .map(p => ({ p, x: p.getBBox().x }))
    .sort((a, b) => a.x - b.x)
    .map(o => o.p);

  ordered.forEach(p => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0 });
  });

  const tl = gsap.timeline();

  tl.to(ordered, {
    strokeDashoffset: 0,
    duration: 0.9,
    ease: 'power2.inOut',
    stagger: { amount: 0.5 }
  })
  // the weight arrives behind the outline, and the outline steps back
  .to(ordered, { fillOpacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.25')
  .to(ordered, { strokeOpacity: 0, duration: 0.4, ease: 'none' }, '<');

  /* The lift waits for BOTH the animation and the fonts. A loader that
     leaves before the webfonts land just moves the flash of unstyled
     text to somewhere the user is already looking - and the line
     reveals measure against the wrong metrics if they split early. */
  const fontsReady = (document.fonts && document.fonts.ready)
    ? document.fonts.ready
    : Promise.resolve();
  const floor = new Promise(res => setTimeout(res, MIN_MS));

  /* Nothing here is allowed to strand the page. If a font request
     hangs, the overlay lifts anyway - a slightly wrong line split is
     recoverable, a page nobody can scroll is not. */
  const ceiling = new Promise(res => setTimeout(res, 6000));

  const drawn = new Promise(res => { tl.eventCallback('onComplete', res); });

  Promise.race([Promise.all([fontsReady, floor, drawn]), ceiling])
    .then(() => {
      const out = gsap.timeline({
        onComplete: () => { el.style.display = 'none'; finish(); }
      });
      // the panel lifts and the mark drifts up a little faster, so the
      // two are not one flat sheet moving
      out.to('.loader__inner', { y: -40, opacity: 0, duration: 0.7,
                                 ease: 'power2.in' })
         .to(el, { yPercent: -100, duration: 1.0,
                   ease: 'power3.inOut' }, '-=0.45');
    });
}
