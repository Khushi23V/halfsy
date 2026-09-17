import { gsap, pinned, prefersReducedMotion } from '../lib/scroll.js';

/* BEAT 1 - product cards drift up at different depths while the
   headline holds. The CTA arrives once the cards are mostly gone so
   the headline isn't alone on an empty screen, then both clear as the
   circle begins rising behind them.

   Returns a cleanup function: the hover listeners are plain DOM
   listeners, so gsap.context() cannot collect them. */
export function initScatter() {
  const section = document.querySelector('#beat-scatter');
  if (!section || prefersReducedMotion) return;

  const cards = gsap.utils.toArray('.scatter__card', section);
  const type  = section.querySelector('.scatter__type');
  const cta   = section.querySelector('.scatter__cta');
  const lead  = section.querySelector('.scatter__circle');
  const hint  = section.querySelector('.scatter__hint');

  const tl = pinned(section);

  const speeds = cards.map(c => parseFloat(c.dataset.speed) || 1);
  const lo = Math.min(...speeds), hi = Math.max(...speeds);

  cards.forEach((card, i) => {
    // exact distance this card needs to leave the top of the viewport
    const distance = card.offsetTop + card.offsetHeight + 60;

    // fastest card lands at 70% of the beat, slowest at 92%.
    // Same distance over different durations = different apparent
    // speed, so depth survives while they all clear near the end.
    const t = hi === lo ? 0 : (speeds[i] - lo) / (hi - lo);
    const finishAt = 0.92 - 0.22 * t;

    tl.fromTo(card,
      { y: 0 },
      { y: -distance, ease: 'none', duration: finishAt },
      0
    );
  });

  // button arrives once the cards have mostly cleared
  if (cta) {
    gsap.set(cta, { opacity: 0, y: 16 });
    tl.to(cta, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.15 }, 0.55);
  }

  // headline holds, then clears just after the last card.
  // The CTA is a child of .scatter__type, so this fade takes it too.
  tl.fromTo(type, { y: 0 }, { y: -90, ease: 'none', duration: 1 }, 0)
    .to(type, { opacity: 0, ease: 'none', duration: 0.12 }, 0.88);

  /* Twin of .circle__fill. Beat 2 can't paint while beat 1 is still
     pinned, so the circle starts its rise here and the real one picks
     up at the same radius. The 26% MUST match the from-value in
     circle.js or the seam will pop. */
  if (lead) {
    tl.fromTo(lead,
      { clipPath: 'circle(0% at 50% 130%)' },
      { clipPath: 'circle(26% at 50% 130%)', ease: 'none', duration: 0.14 },
      0.86
    );
  }

  if (hint) tl.to(hint, { opacity: 0, duration: 0.1 }, 0);

  /* Hover lift. Has to go through GSAP: it writes `scale: none` inline
     when it takes over an element's transform, which kills a CSS hover
     rule. Measured on the live page - gsap.quickTo on `scale` silently
     no-ops here, a plain tween does not. overwrite handles a fast
     flick on and off without stacking tweens. */
  const teardown = [];
  if (matchMedia('(hover: hover)').matches) {
    cards.forEach(card => {
      const lift = v => gsap.to(card, {
        scale: v, duration: 0.45, ease: 'power3.out', overwrite: 'auto'
      });
      const on  = () => lift(1.07);
      const off = () => lift(1);
      card.addEventListener('pointerenter', on);
      card.addEventListener('pointerleave', off);
      teardown.push(() => {
        card.removeEventListener('pointerenter', on);
        card.removeEventListener('pointerleave', off);
      });
    });
  }

  return () => teardown.forEach(fn => fn());
}
