import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/scroll.js';

/* The three-word section. Not pinned; it plays once, when the row of
   words has come a third of the way up the screen.

   The words rise one after another, the search bar's rule draws from
   the left, and the photograph is unveiled from the bottom up.
   Separately, the picture inside its frame eases from slightly large
   to its true size for as long as it is on screen, so it is never
   quite still while the page moves.

   The unveil is a clip on the frame (.trio__photo) and the easing is
   a scale on the <img> inside it; the hover (arrow box) is a third
   element. Nothing shares a transform.

   THE NAV has no drop shadow while this section is under it
   (body.is-navflat, styled in trio.css) - the same clean bar as over
   the opening, only on its light ground here. */
export function initTrio() {
  const section = document.querySelector('#beat-trio');
  if (!section) return;

  const body = document.body;
  const nav = document.querySelector('.nav');

  ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: () => 'bottom ' + (nav ? nav.offsetHeight : 86) + 'px',
    invalidateOnRefresh: true,
    onToggle: self => body.classList.toggle('is-navflat', self.isActive)
  });

  const cleanup = () => body.classList.remove('is-navflat');

  if (prefersReducedMotion) return cleanup;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 68%', once: true }
  });

  tl.fromTo('.trio__word',
      { yPercent: 55, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.14 }, 0)
    .fromTo('.trio__search',
      { '--trio-rule': 0, opacity: 0 },
      { '--trio-rule': 1, opacity: 1, duration: 1.1, ease: 'power3.out' }, 0.3)
    .fromTo('.trio__photo',
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power3.inOut' }, 0.25);

  gsap.fromTo('.trio__photo img',
    { scale: 1.12 },
    {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.trio__photo', start: 'top bottom', end: 'bottom top', scrub: true }
    });

  return cleanup;
}
