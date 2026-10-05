import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/scroll.js';
import { whenReady } from './loader.js';

/* Landing idea one: the full-screen photograph. Not pinned.

   THE NAV. Over the photograph the bar has no ground of its own and
   its ink is light (body.is-inverted). Once the photograph has gone
   up under it, the bar takes its usual ground and dark ink
   (body.is-glass). One trigger owns both, so there is never a moment
   with light ink on a light bar.

   THE ENTRANCE waits for the loader. The picture settles from
   slightly large; the two lines of the headline come up out of a
   blur, one after the other; then the corner pieces.

   ON SCROLL the picture travels a little slower than the page, so it
   seems to sit behind the screen rather than on it. The drift is on
   the frame and the settle is on the <img> inside it - two elements,
   so the two never fight over one transform.

   The bar is clear here, so anything scrolling up behind it would
   show through it. The corner block and then the headline fade out
   before they get there. Those fades are on the blocks themselves and
   the entrance is on what is inside them, for the same reason. */
export function initBleed() {
  const section = document.querySelector('#beat-bleed');
  if (!section) return;

  const body = document.body;
  const nav = document.querySelector('.nav');
  const over = on => {
    body.classList.toggle('is-inverted', on);
    body.classList.toggle('is-glass', !on);
  };

  body.classList.add('is-inverted');
  whenReady().then(() => body.classList.add('is-navup'));

  ScrollTrigger.create({
    trigger: section,
    start: () => 'bottom ' + (nav ? nav.offsetHeight : 86) + 'px',
    end: 'max',
    invalidateOnRefresh: true,
    onEnter: () => over(false),
    onLeaveBack: () => over(true)
  });

  const cleanup = () => body.classList.remove('is-navup', 'is-glass', 'is-inverted');

  if (prefersReducedMotion) return cleanup;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo('.bleed__media img',
      { scale: 1.12 },
      { scale: 1, duration: 2.6, ease: 'power3.out' }, 0)
    .fromTo('.bleed__line',
      { y: 36, opacity: 0, filter: 'blur(16px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out',
        stagger: 0.2, clearProps: 'filter' }, 0.25)
    .fromTo('.bleed__pick',
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.09 }, 0.7)
    .fromTo('.bleed__note, .bleed__foot > *',
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, 0.95);

  whenReady().then(() => tl.play());

  gsap.to('.bleed__media', {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true }
  });

  gsap.to('.bleed__aside', {
    autoAlpha: 0, y: -24, ease: 'none',
    scrollTrigger: { trigger: section, start: 'top top', end: '22% top', scrub: true }
  });
  gsap.to('.bleed__head, .bleed__foot', {
    autoAlpha: 0, ease: 'none',
    scrollTrigger: { trigger: section, start: '36% top', end: '70% top', scrub: true }
  });

  return cleanup;
}
