import { gsap, prefersReducedMotion } from '../lib/scroll.js';

/* BEAT 8 - the spotlight. Not pinned, and as quiet as Get the look:
   the photograph settles (a slow scale back to rest inside its frame),
   the heading rises, then the four pieces follow one by one.

   GSAP animates the photo and the <li>s. The hover lives on other
   elements (the arrow box, the image inside each card), so the two
   never fight over a transform. */
export function initSpot() {
  const section = document.querySelector('#beat-spot');
  if (!section || prefersReducedMotion) return;

  const enter = { trigger: section, start: 'top 68%', once: true };

  gsap.fromTo('.spot__photo',
    { scale: 1.08, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out', scrollTrigger: enter });

  gsap.fromTo('.spot__head',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15, scrollTrigger: enter });

  gsap.fromTo('.spot__item',
    { y: 36, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.3,
      scrollTrigger: enter });
}
