import { gsap, prefersReducedMotion } from '../lib/scroll.js';

/* BEAT 7 - not pinned. Three pinned beats in a row is already a lot of
   held scroll; this one and the next ride normal page scroll so the
   back half of the page moves at reading pace rather than beat pace. */
export function initDrops() {
  const section = document.querySelector('#beat-drops');
  if (!section || prefersReducedMotion) return;

  gsap.fromTo(section.querySelectorAll('.drops__head > *'),
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, ease: 'power2.out', duration: 0.7, stagger: 0.09,
      scrollTrigger: { trigger: section, start: 'top 72%', once: true } }
  );

  /* Each polaroid drops in and settles onto its resting angle. The
     angles are per-card and live here rather than in CSS, because
     GSAP owns transform on these - a CSS `rotate` would be wiped the
     moment the tween takes over. */
  const angles = [-3.2, 2.1, -1.6, 3];

  gsap.utils.toArray('.pick', section).forEach((card, i) => {
    gsap.fromTo(card,
      { y: 56, rotate: 0, opacity: 0 },
      { y: 0, rotate: angles[i % angles.length], opacity: 1,
        ease: 'power3.out', duration: 0.9, delay: i * 0.1,
        scrollTrigger: { trigger: section, start: 'top 62%', once: true } }
    );
  });
}