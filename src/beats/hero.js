import { gsap, ScrollTrigger, pinned, prefersReducedMotion } from '../lib/scroll.js';
import { prepareLines, playReveal } from '../lib/reveal.js';
import { whenReady } from './loader.js';

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
  const display = section.querySelector('.hero__display');
  const copyText = section.querySelector('.hero__copy p');
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

  /* Nav flips to bone once the maroon covers the screen and stays bone
     until the story beat is done. ONE trigger spanning both sections,
     not one per section: two triggers toggling the same class hand off
     at a boundary they disagree about and the loser's `false` wins -
     which is why the logo went maroon again as the image filled. */
  ScrollTrigger.create({
    trigger: section,
    start: () => 'top top-=' + at(0.34),
    endTrigger: '#beat-story',
    end: 'bottom 40px',
    onToggle: self =>
      document.body.classList.toggle('is-inverted', self.isActive)
  });

  /* The headline gets its own treatment, not the mask reveal the rest
     of the page uses - it is the first thing seen and should not look
     like a system.

     Tracking settles in from wide while a blur clears: type that
     breathes in rather than slides in. It is the one animation here
     that reflows every frame (letter-spacing changes layout), which is
     why it is a single element, once, on load - a per-word version of
     this would be genuinely expensive.

     It waits for the loader rather than firing on mount, or it would
     play out behind the overlay and be spent before anyone saw it. */
    const script = display.querySelector('.script');

  /* Transform and opacity only. The first version animated
     letter-spacing and a 16px blur: the first reflows the whole line
     every frame, the second repaints a 1400px-wide surface every
     frame. Both are per-frame layout or paint work, which is exactly
     what a 2s animation on the largest element on the page cannot
     afford.

     A slow scale settle reads the same - type relaxing into place -
     and costs nothing, because transform and opacity are composited
     and never touch layout. */
  gsap.set(display, {
    opacity: 0, yPercent: 12, scale: 1.05,
    transformOrigin: '50% 60%', force3D: true
  });
  if (script) gsap.set(script, { opacity: 0 });

  whenReady().then(() => {
    const intro = gsap.timeline({
      // the promotion is only worth holding while it animates
      onComplete: () => gsap.set(display, { clearProps: 'willChange,transform' })
    });
    intro.to(display, {
      opacity: 1, yPercent: 0, scale: 1,
      duration: 1.8, ease: 'power3.out'
    });
    // the script word lands a beat later, so the eye catches it as a
    // separate gesture rather than part of the same block
    if (script) {
      intro.to(script, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.45);
    }
  });

  /* The copy's lines are prepared now and revealed by their own
     trigger, NOT by a .call() on the scrubbed timeline - a scrub
     callback fires whenever the playhead crosses it, including when
     ScrollTrigger.refresh() re-seeks after images decode, which used
     to type the whole passage during beat 1. once:true can only run on
     the way down, and the lines sit masked until it does. */
  prepareLines(copyText);

  ScrollTrigger.create({
    trigger: section,
    start: () => 'top top-=' + at(0.40),
    once: true,
    onEnter: () => playReveal(copyText, { duration: 1.1, stagger: 0.12 })
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

    /* The lines are a one-shot and stay put once revealed. The
     CONTAINER is scrubbed, so scrolling back up takes the copy away
     with the circle instead of stranding bone text over the hero. */
  tl.fromTo(copy,
    { opacity: 0 },
    { opacity: 1, ease: 'none', duration: 0.02 },
    0.38
  );

  /* Image rises, parks over the copy, holds, then opens.

     The open is the slowest thing in the page on purpose: 0.28 of the
     beat, which at --beat-hero 380 is about 106vh of scroll. power1
     rather than power2 keeps the rate even end to end, so it reads as
     something being opened rather than a transition easing out. */
  tl.to(media, { yPercent: 0, ease: 'power2.out', duration: 0.16 }, 0.50)
    .to(media,
      { clipPath: 'inset(0% 0% round 0px)', ease: 'power1.inOut', duration: 0.28 },
      0.72
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
