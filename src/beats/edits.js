import { gsap, prefersReducedMotion } from '../lib/scroll.js';
import { revealOnScroll } from '../lib/reveal.js';

/* BEAT 5b - not pinned. The back half of the page moves at reading
   pace (see drops.js), and a magazine spread should be read, not
   held. Three small things, all quieter than the hero:

     UNVEIL  each image window opens upward from its bottom edge as it
             enters - a clip, not a fade, the same "hard edge" idea as
             the masked line reveals.
     DRIFT   the frame inside each window moves a few percent against
             the scroll. Scrubbed, so it is tied to the hand.
     SWAP    the hover image is pure CSS (opacity on .edit__img--alt).
             GSAP never touches the <img> elements, so there is no
             fight over transform - the drift lives on .edit__frame. */
export function initEdits() {
  const section = document.querySelector('#beat-edits');
  if (!section || prefersReducedMotion) return;

  revealOnScroll('.edits__head, .edits__note',
    { trigger: section, start: 'top 78%', groupStagger: 0.12 });

  gsap.fromTo('.edits__all',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 72%', once: true } });

  gsap.utils.toArray('.edit', section).forEach((tile, i) => {
    const media = tile.querySelector('.edit__media');
    const frame = tile.querySelector('.edit__frame');
    const meta  = tile.querySelector('.edit__meta');

    gsap.fromTo(media,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.25, ease: 'power3.inOut',
        /* the lead is taller, so it starts first; the rest follow in
           reading order rather than all at once */
        delay: (i % 2) * 0.12,
        scrollTrigger: { trigger: tile, start: 'top 86%', once: true } });

    gsap.fromTo(meta,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        delay: 0.45 + (i % 2) * 0.12,
        scrollTrigger: { trigger: tile, start: 'top 86%', once: true } });

    gsap.fromTo(frame,
      { yPercent: -5 },
      { yPercent: 5, ease: 'none',
        scrollTrigger: { trigger: tile, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}
