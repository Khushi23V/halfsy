import { gsap, ScrollTrigger, pinned, prefersReducedMotion } from '../lib/scroll.js';
import { prepareLines, playReveal } from '../lib/reveal.js';

/* The about beat. Pinned and scrubbed, like the first opening it was
   lifted from (beats/hero.js) - the numbers below are that beat's,
   with the card carousel's share taken out.

   Where each thing happens, as a fraction of the beat (--beat-about
   in tokens.css is its length in screen-heights):

     0.00 - 0.22   the circle swells from under the screen and fills it
     0.19 - 0.22   the text arrives, line by line
     0.38 - 0.58   the image rises from below and rests over the text
     0.68 - 1.00   the image opens to the full screen

   THE SECTION BEFORE THIS ONE keeps scrolling while the circle comes
   up: this section overlaps its last screen (about.css), so the pin
   starts while that section is still in view and the circle grows
   over it rather than over an empty screen.

   THE NAV. Once the circle has reached the bar, the bar loses its
   ground and its ink turns light, and it stays that way through the
   image section that follows (beats/story.js leaves the nav to
   whoever comes before it). One trigger spans both, so there is no
   boundary for two triggers to disagree about. The product row takes
   the bar back when it arrives (beats/products.js). */
const FILL_END = 0.22;
const NAV_AT = FILL_END * 0.7;   // the circle's edge has passed the bar's corners

export function initAbout() {
  const section = document.querySelector('#beat-about');
  if (!section || prefersReducedMotion) return;

  const body = document.body;
  const fill = section.querySelector('.about__fill');
  const copy = section.querySelector('.about__copy');
  const copyText = copy.querySelector('p');
  const media = section.querySelector('.about__media');

  const budget = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--beat-about')
  ) || 300;
  // scroll distance, in px, of a given fraction of the beat
  const at = f => Math.round(window.innerHeight * budget / 100 * f);

  ScrollTrigger.create({
    trigger: section,
    start: () => 'top top-=' + at(NAV_AT),
    endTrigger: document.querySelector('#beat-story') || section,
    end: 'bottom 40px',
    invalidateOnRefresh: true,
    onToggle: self => {
      body.classList.toggle('is-inverted', self.isActive);
      body.classList.toggle('is-glass', !self.isActive);
    }
  });

  prepareLines(copyText);

  ScrollTrigger.create({
    trigger: section,
    start: () => 'top top-=' + at(FILL_END - 0.02),
    once: true,
    onEnter: () => playReveal(copyText, { duration: 1.1, stagger: 0.12 })
  });

  const tl = pinned(section);

  gsap.set(media, { yPercent: 100 });

  /* Circle on the radius, not a scaled div - scaling softens the edge
     and blurs the text riding inside it. */
  tl.fromTo(fill,
    { clipPath: 'circle(0% at 50% 130%)' },
    { clipPath: 'circle(150% at 50% 130%)', ease: 'none', duration: FILL_END },
    0
  );

  /* The lines are a one-shot and stay put once revealed. The
     CONTAINER is scrubbed, so scrolling back up takes the text away
     with the circle instead of stranding light type over the section
     before. */
  tl.fromTo(copy,
    { opacity: 0 },
    { opacity: 1, ease: 'none', duration: 0.02 },
    FILL_END - 0.03
  );

  tl.to(media, { yPercent: 0, ease: 'power2.out', duration: 0.20 }, 0.38)
    .to(media,
      { clipPath: 'inset(0% 0% round 0px)', ease: 'power1.inOut', duration: 0.32 },
      0.68
    );

  return () => body.classList.remove('is-inverted');
}
