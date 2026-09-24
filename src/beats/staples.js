import { gsap, prefersReducedMotion } from '../lib/scroll.js';
import { revealOnScroll } from '../lib/reveal.js';

/* BEAT 5b - not pinned; the back half of the page moves at reading
   pace (see drops.js). The five frames open upward one after another,
   left to right, so the row reads as a list - 01 before 05.

   The heading does NOT use the masked line reveal. The mask is an
   overflow:hidden box sized to the line, and Miama's f climbs well
   above the cap height and drops well below the baseline - the mask
   cropped both ends, permanently. Padding the mask out does not work
   either: the parked line would then show through the padding before
   the reveal. So the heading rises and fades instead.

   Hover (scale + tilt) is CSS on the <li>; GSAP only touches
   .staple__media (clip) and .staple__meta (fade), so nothing fights
   over transform. */
export function initStaples() {
  const section = document.querySelector('#beat-staples');
  if (!section || prefersReducedMotion) return;

  revealOnScroll('.staples__eyebrow', { trigger: section, start: 'top 78%' });

  gsap.fromTo('.staples__head',
    { y: 36, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.1,
      scrollTrigger: { trigger: section, start: 'top 78%', once: true } });

  const trigger = { trigger: '.staples__row', start: 'top 82%', once: true };

  gsap.fromTo('.staple__media',
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut',
      stagger: 0.11, scrollTrigger: trigger });

  gsap.fromTo('.staple__meta',
    { y: 18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
      stagger: 0.11, delay: 0.45, scrollTrigger: trigger });
}
