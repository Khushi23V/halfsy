import { gsap, prefersReducedMotion } from '../lib/scroll.js';

/* BEAT 5 - the products panel rolls up over the image beat, then the
   cards stagger in. Not pinned: it rides normal page scroll. */
export function initProducts() {
  const section = document.querySelector('#beat-products');
  if (!section || prefersReducedMotion) return;

  gsap.fromTo(section,
    { y: 120 },
    {
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'top 60%',
        scrub: 1
      }
    }
  );

  gsap.fromTo('.product',
    { y: 48, opacity: 0 },
    {
      y: 0, opacity: 1,
      ease: 'power2.out',
      duration: 0.7,
      stagger: 0.08,
      scrollTrigger: { trigger: section, start: 'top 62%', once: true }
    }
  );
}
