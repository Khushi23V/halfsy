import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/scroll.js';
import { whenReady } from './loader.js';

/* The overlap opening. Not pinned.

   The photograph is unveiled from the bottom up (a clip on its frame,
   while the picture inside settles from slightly large), and the two
   halves of the headline rise one after the other, so "less" arrives
   last and lands on the picture. The note and button follow.

   The clip is on .cover__media and the scale on the <img> inside it;
   the hover (arrow box) lives on a third element. Nothing shares a
   transform.

   Two ways to run it:
   - landing: true - it is the first screen. The entrance waits for
     the loader to lift instead of for a scroll position, and this
     beat takes over the two jobs the old hero did for the nav: bring
     it in once the page is uncovered, and give it its ground (glass)
     as soon as the page has moved.
   - landing: false - it is a section further down, and plays when it
     scrolls into view. */
export function initCover({ landing = false } = {}) {
  const section = document.querySelector('#beat-cover');
  if (!section) return;

  let cleanup;

  if (landing) {
    whenReady().then(() => document.body.classList.add('is-navup'));

    /* Clear over the opening, on its own ground from the first few
       pixels of scroll to the footer (where the nav leaves anyway). */
    ScrollTrigger.create({
      start: 24,
      end: 'max',
      onToggle: self => document.body.classList.toggle('is-glass', self.isActive)
    });

    cleanup = () => document.body.classList.remove('is-navup', 'is-glass');
  }

  if (prefersReducedMotion) return cleanup;

  const tl = gsap.timeline(landing
    ? { paused: true }
    : { scrollTrigger: { trigger: section, start: 'top 62%', once: true } });

  tl.fromTo('.cover__media',
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power3.inOut' }, 0)
    .fromTo('.cover__media img',
      { scale: 1.14 },
      { scale: 1, duration: 2, ease: 'power3.out' }, 0)
    .fromTo('.cover__detail',
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power3.inOut' }, 0.15)
    .fromTo('.cover__lead, .cover__tail',
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.22 }, 0.35)
    .fromTo('.cover__copy > *, .cover__credit',
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, 0.95);

  if (landing) whenReady().then(() => tl.play());

  return cleanup;
}
