import { gsap, prefersReducedMotion } from '../lib/scroll.js';
import { revealOnScroll } from '../lib/reveal.js';

/* BEAT 7 - The Overnight Edition. Not pinned: the back half of the
   page moves at reading pace, and a newspaper is read, not held.

     SLIDE   the paper is pushed across the table towards you - it
             rises and turns from a careless angle to nearly straight,
             scrubbed to the scroll so it is tied to the hand.
     SET     once it lands, the page sets top to bottom: dateline,
             masthead, strap, stories, foot - the order you read it.
     PRINT   the lead photo prints downward, like it is coming off
             the press.

   The photos start as newsprint (grayscale, multiplied into the
   paper) and take their colour on hover - that is CSS, on the <img>,
   which GSAP never touches. GSAP only moves .paper, the story blocks
   and the lead's media box. */
export function initDrops() {
  const section = document.querySelector('#beat-drops');
  if (!section || prefersReducedMotion) return;

  const paper = section.querySelector('.paper');

  revealOnScroll('.drops__eyebrow', { trigger: section, start: 'top 72%' });

  gsap.fromTo(paper,
    { y: 180, rotate: 4.5 },
    { y: 0, rotate: -1.2, ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 12%', scrub: 1 } });

  const landed = { trigger: paper, start: 'top 68%', once: true };

  gsap.fromTo(
    paper.querySelectorAll('.paper__top, .paper__masthead, .paper__strap, .news, .paper__foot'),
    { opacity: 0, y: 14 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08,
      scrollTrigger: landed });

  gsap.fromTo(paper.querySelector('.news--lead .news__media'),
    { clipPath: 'inset(0% 0% 100% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power3.inOut', delay: 0.35,
      scrollTrigger: landed });
}
