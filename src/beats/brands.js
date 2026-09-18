import { gsap, ScrollTrigger, pinned, prefersReducedMotion } from '../lib/scroll.js';
import { prepareLines, playReveal } from '../lib/reveal.js';

/* BEAT 6 - brand marks float in on a stagger, then the whole field
   blurs back and the invitation reads through it.

   The veil is a pre-blurred layer being faded in. Animating the
   backdrop-filter value itself drops frames on Safari and on any
   integrated GPU; fading opacity costs nothing and looks the same. */
export function initBrands() {
  const section = document.querySelector('#beat-brands');
  if (!section || prefersReducedMotion) return;

  const logos  = gsap.utils.toArray('.brands__logo', section);
  const veil   = section.querySelector('.brands__veil');
  const reveal = section.querySelector('.brands__reveal');

  const tl = pinned(section);

  /* 18 marks now, not 10. The stagger is spread across a fixed
     fraction of the beat rather than a fixed step per logo, so adding
     or removing rows changes the density, never the timing. */
  const spread = 0.34;
  logos.forEach((logo, i) => {
    const drift = (i % 3 - 1) * 26;
    tl.fromTo(logo,
      { opacity: 0, y: 40 + drift, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.22 },
      logos.length > 1 ? spread * (i / (logos.length - 1)) : 0
    );
  });

  /* The veil and the container are scrubbed; the LINES are a one-shot
     fired once the blur is down. A scrubbed mask reveal reads as the
     text being dragged rather than arriving. */
  const head = reveal.querySelector('h2');
  const sub  = reveal.querySelector('p');
  prepareLines(head);
  prepareLines(sub);

  const cta = reveal.querySelector('.btn');
  if (cta) gsap.set(cta, { opacity: 0, y: 14 });

  tl.to(veil,   { opacity: 1, ease: 'none', duration: 0.18 }, 0.52)
    .to(reveal, { opacity: 1, ease: 'none', duration: 0.06 }, 0.56);

  let shown = false;
  ScrollTrigger.create({
    trigger: section,
    start: () => 'top top-=' + Math.round(window.innerHeight *
      (parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue('--beat-brands')) || 190) / 100 * 0.58),
    once: true,
    onEnter: () => {
      if (shown) return;
      shown = true;
      playReveal(head, { duration: 1.05, stagger: 0.1 });
      playReveal(sub,  { duration: 1.05, stagger: 0.1, delay: 0.12 });
      if (cta) gsap.to(cta, { opacity: 1, y: 0, duration: 0.7,
                              ease: 'power2.out', delay: 0.45 });
    }
  });
}
