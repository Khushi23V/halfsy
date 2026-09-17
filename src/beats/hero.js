import { gsap, ScrollTrigger, pinned, prefersReducedMotion } from '../lib/scroll.js';

/* BEATS 1 + 2 - one pinned section, one timeline, no seam.

   Positions are fractions of the whole beat:
     0.00-0.26  cards drift up and clear
     0.00-0.30  headline drifts, fades out at 0.24
     0.22-0.40  circle grows from nothing to full bleed
     0.40       typing fires, on its own clock
     0.58-0.76  image rises from below the fold, parks over the copy
     0.80-1.00  image opens to full bleed

   Nothing here needs immediateRender tricks or a twin element. Those
   existed only because this used to be two pinned sections that
   overlapped, so each had to paint what the other could not reach.

   Returns a cleanup: the hover listeners are plain DOM listeners and
   gsap.context() cannot collect them. */
export function initHero() {
  const section = document.querySelector('#beat-hero');
  if (!section || prefersReducedMotion) return;

  const cards = gsap.utils.toArray('.hero__card', section);
  const chars = gsap.utils.toArray('.hero__char', section);
  const type  = section.querySelector('.hero__type');
  const hint  = section.querySelector('.hero__hint');
  const fill  = section.querySelector('.hero__fill');
  const media = section.querySelector('.hero__media');
  const copy  = section.querySelector('.hero__copy');
  const budget = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--beat-hero')
  ) || 320;
  // scroll distance, in px, of a given fraction of the beat
  const at = f => Math.round(window.innerHeight * budget / 100 * f);

  /* Nav flips to bone once the maroon covers the screen, not at the
     section top - the top half of this beat is still bone. */
  ScrollTrigger.create({
    trigger: section,
    start: () => 'top top-=' + at(0.36),
    end:   () => 'top top-=' + at(1),
    onToggle: self =>
      document.body.classList.toggle('is-inverted', self.isActive)
  });

  /* Typing runs on its own clock, not the scrubbed timeline, so it
     plays at a fixed speed and does not rewind with the scroll. Its
     own trigger with once:true, NOT a .call() on the scrubbed
     timeline - a scrub callback fires whenever the playhead crosses
     it, including when ScrollTrigger.refresh() re-seeks after images
     decode, which typed the whole passage during beat 1.

     `amount` is total seconds for the passage regardless of character
     count, so editing the copy changes the pace, not the duration. */
  ScrollTrigger.create({
    trigger: section,
    start: () => 'top top-=' + at(0.40),
    once: true,
    onEnter: () => gsap.to(chars, {
      opacity: 1, duration: 0.01, ease: 'none', stagger: { amount: 1.3 }
    })
  });

  const tl = pinned(section);

  gsap.set(media, { yPercent: 100 });

  /* Cards. The distance is a FUNCTION: the cards have no fixed height,
     so offsetHeight is near zero until the image decodes, and a number
     read at init gets frozen into the tween where refresh() cannot
     correct it. That is the bug where the beat ran long while the
     cards kept a stub travel, and whether it happened depended on
     whether the images were cached. */
  const speeds = cards.map(c => parseFloat(c.dataset.speed) || 1);
  const lo = Math.min(...speeds), hi = Math.max(...speeds);

  cards.forEach((card, i) => {
    const t = hi === lo ? 0 : (speeds[i] - lo) / (hi - lo);
    const finishAt = 0.26 - 0.08 * t;   // nearest cards clear first

    tl.fromTo(card,
      { y: 0 },
      { y: () => -(card.offsetTop + card.offsetHeight + 60),
        ease: 'none', duration: finishAt },
      0
    );
  });

  // headline drifts the whole way, then clears as the last card goes
  tl.fromTo(type, { y: 0 }, { y: -90, ease: 'none', duration: 0.30 }, 0)
    .to(type, { opacity: 0, ease: 'none', duration: 0.06 }, 0.24);

  if (hint) tl.to(hint, { opacity: 0, duration: 0.04 }, 0);

  /* Circle on the radius, not a scaled div - scaling softens the edge
     and blurs the text riding inside it. Starts at 0% and is simply
     invisible until it clears the bottom of the viewport. */
  tl.fromTo(fill,
    { clipPath: 'circle(0% at 50% 130%)' },
    { clipPath: 'circle(150% at 50% 130%)', ease: 'none', duration: 0.18 },
    0.22
  );

    /* The characters are a one-shot and stay lit once typed. The
     CONTAINER is scrubbed, so scrolling back up takes the copy away
     with the circle instead of stranding bone text over the hero. */
  tl.fromTo(copy,
    { opacity: 0 },
    { opacity: 1, ease: 'none', duration: 0.02 },
    0.38
  );

  /* Image rises slowly and parks centred over the typed copy, then
     opens from exactly there. The copy is never faded out - the image
     covers it, which is what makes the two read as one movement. */
  tl.to(media, { yPercent: 0, ease: 'power2.out', duration: 0.18 }, 0.58)
    .to(media,
      { clipPath: 'inset(0% 0% round 0px)', ease: 'power2.inOut', duration: 0.20 },
      0.80
    );

  /* Hover lift. Has to go through GSAP: it writes `scale: none` inline
     when it takes over an element's transform, which kills a CSS hover
     rule. Measured on the live page - gsap.quickTo on `scale` no-ops
     here, a plain tween does not. */
  const teardown = [];
  if (matchMedia('(hover: hover)').matches) {
    cards.forEach(card => {
      const lift = v => gsap.to(card, {
        scale: v, duration: 0.45, ease: 'power3.out', overwrite: 'auto'
      });
      const on = () => lift(1.07), off = () => lift(1);
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
