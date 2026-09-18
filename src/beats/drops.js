import { gsap, invertNavDuring, prefersReducedMotion } from '../lib/scroll.js';
import { revealOnScroll } from '../lib/reveal.js';

/* BEAT 7 - not pinned. Three pinned beats in a row is already a lot of
   held scroll; this one rides normal page scroll so the back half of
   the page moves at reading pace rather than beat pace.

   The polaroid interaction is the only thing in the page that is not
   scroll-driven. Two parts:

     IDLE  each card rocks a fraction of a degree around its own
           resting angle, on its own period, so they never sync. Four
           static cards read as a layout; four that breathe read as
           objects pinned to a board.

     PICK  hovering one straightens it, lifts it, and dims the other
           three. That is the proposition acted out - somebody went
           through the pile and pulled this one out - and it is why
           the dimming matters more than the lift. A hover that only
           raises the card is a card hover; one that pushes the others
           back is curation. */
export function initDrops() {
  const section = document.querySelector('#beat-drops');
  if (!section || prefersReducedMotion) return;

  const cards  = gsap.utils.toArray('.pick', section);
  const angles = [-3.2, 2.1, -1.6, 3];
  const rest   = i => angles[i % angles.length];

  // dark section, so the nav goes bone over it
  invertNavDuring(section);

  revealOnScroll('.drops__eyebrow, .drops__head h2, .drops__note',
    { trigger: section, start: 'top 74%', stagger: 0.09, groupStagger: 0.13 });

  const idles  = new Map();
  const timers = [];

  const startIdle = (card, i) => {
    idles.get(card)?.kill();
    idles.set(card, gsap.to(card, {
      rotate: rest(i) + (i % 2 ? 0.9 : -0.9),
      duration: 3.4 + i * 0.5,   // uneven periods so they never lock in phase
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    }));
  };

  cards.forEach((card, i) => {
    /* Each polaroid drops in and settles onto its resting angle. The
       angles live here rather than in CSS because GSAP owns transform
       on these - a CSS `rotate` would be wiped the moment a tween
       takes over. */
    gsap.fromTo(card,
      { y: 56, rotate: 0, opacity: 0 },
      { y: 0, rotate: rest(i), opacity: 1,
        ease: 'power3.out', duration: 0.9, delay: i * 0.1,
        scrollTrigger: { trigger: section, start: 'top 62%', once: true },
        onComplete: () => startIdle(card, i) }
    );
  });

  const teardown = [];

  if (matchMedia('(hover: hover)').matches) {
    cards.forEach((card, i) => {
      const on = () => {
        idles.get(card)?.kill();
        gsap.to(card, {
          rotate: 0, y: -20, scale: 1.05,
          duration: 0.55, ease: 'power3.out', overwrite: 'auto'
        });
        cards.forEach(other => {
          if (other === card) return;
          gsap.to(other, {
            opacity: 0.32, scale: 0.97,
            duration: 0.55, ease: 'power2.out', overwrite: 'auto'
          });
        });
      };

      const off = () => {
        gsap.to(card, {
          rotate: rest(i), y: 0, scale: 1,
          duration: 0.6, ease: 'power3.out', overwrite: 'auto'
        });
        cards.forEach(other => {
          gsap.to(other, {
            opacity: 1, scale: 1,
            duration: 0.6, ease: 'power2.out', overwrite: 'auto'
          });
        });
        // let the card finish returning before the rocking resumes, or
        // the two tweens fight over `rotate` for half a second
        timers.push(gsap.delayedCall(0.62, () => startIdle(card, i)));
      };

      card.addEventListener('pointerenter', on);
      card.addEventListener('pointerleave', off);
      teardown.push(() => {
        card.removeEventListener('pointerenter', on);
        card.removeEventListener('pointerleave', off);
      });
    });
  }

  return () => {
    teardown.forEach(fn => fn());
    idles.forEach(t => t.kill());
    timers.forEach(t => t.kill());
  };
}
