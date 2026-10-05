import { gsap, prefersReducedMotion } from '../lib/scroll.js';

/* BEAT 7 - get the look. Not pinned. Deliberately quiet: the section's
   own interaction (dots, line, card) is the event, so the entrance
   only sets the stage - the model rises in, the heading follows, and
   the dots arrive last, one by one from head to toe, which is also
   the hint that they are there to be used.

   GSAP animates the dot's inner <span>, never the button itself: the
   button's position is its left/top in CSS. */
export function initLook() {
  const section = document.querySelector('#beat-look');
  if (!section || prefersReducedMotion) return;

  const enter = { trigger: section, start: 'top 68%', once: true };

  gsap.fromTo('.look__model',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: enter });

  gsap.fromTo('.look__head, .look__note',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.15,
      scrollTrigger: enter });

  gsap.fromTo('.look__dot > span',
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2.2)', stagger: 0.09, delay: 0.9,
      scrollTrigger: enter });
}
