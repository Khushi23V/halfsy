import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/scroll.js';
import { revealOnScroll } from '../lib/reveal.js';

/* BEAT 5 - the products panel rolls up over the image beat, then the
   cards stagger in. Not pinned: it rides normal page scroll. */
export function initProducts() {
  const section = document.querySelector('#beat-products');
  if (!section || prefersReducedMotion) return;

   revealOnScroll('.products__head, .products__note', { trigger: section, start: 'top 78%' });

  /* From here down the nav sits over content rather than over a
     full-bleed field, so it needs its own ground. Ends at the footer,
     where the nav gets out of the way entirely. */
  ScrollTrigger.create({
    trigger: section,
    start: 'top 88%',
    endTrigger: '.footer__spacer',
    end: 'top 40px',
    onToggle: self => document.body.classList.toggle('is-glass', self.isActive)
  });

  gsap.fromTo(section,
    { y: 120 },
    {
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        end: 'top 55%',
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
