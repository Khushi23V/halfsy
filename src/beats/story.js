import { gsap, pinned, invertNavDuring, prefersReducedMotion } from '../lib/scroll.js';

/* BEATS 3 + 4 - one pinned timeline in three stages:
     0.00-0.34  image opens from a small window to full bleed
     0.30-0.78  marquee runs right to left across the locked image
     0.72-0.92  marquee clears, SHOP lands

   These are one section because they share a background. Splitting
   them means pinning the same image twice and fighting a seam. */
export function initStory() {
  const section = document.querySelector('#beat-story');
  if (!section || prefersReducedMotion) return;

  const media   = section.querySelector('.story__media');
  const marquee = section.querySelector('.story__marquee');
  const shop    = section.querySelector('.story__shop');
  const stage   = section.querySelector('.stage');
  const lead    = document.querySelector('.circle__media');

  invertNavDuring(section);

  /* This section overlaps the circle section by a viewport, so its
     stage is on screen and scrolling up while beat 2 is still pinned.
     .story__stage has an opaque maroon background - that is the panel
     that was sliding over the circle copy and slicing the text. Keep
     the whole stage hidden until the beat actually pins. */
  gsap.set(stage, { autoAlpha: 0 });
  gsap.set(media, { clipPath: 'inset(38% 42% round 2px)' });

  const tl = pinned(section, {
    onEnter: () => {
      gsap.set(stage, { autoAlpha: 1 });
      // twin and real one are at identical geometry here, so the
      // swap is invisible
      if (lead) gsap.set(lead, { autoAlpha: 0 });
    },
    onLeaveBack: () => {
      gsap.set(stage, { autoAlpha: 0 });
      if (lead) gsap.set(lead, { autoAlpha: 1 });
    }
  });

  /* stage 1 - the window opens from exactly where the twin left it. */
  tl.to(media,
    { clipPath: 'inset(0% 0% round 0px)', ease: 'power2.inOut', duration: 0.34 },
    0
  );

  /* stage 2 - marquee crosses the frame.

     Both values are FUNCTIONS. scrollWidth read once at init is the
     width before the fonts have swapped in, so the marquee either
     stops short of clearing the screen or overshoots. Functions plus
     invalidateOnRefresh on the trigger mean this is re-measured
     whenever the layout settles. */
  tl.fromTo(marquee,
    { x: () => window.innerWidth },
    { x: () => -(marquee.scrollWidth + window.innerWidth) + window.innerWidth,
      ease: 'none', duration: 0.48 },
    0.30
  );

  // stage 3 - SHOP arrives once the text has cleared
  tl.fromTo(shop,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, ease: 'power2.out', duration: 0.14 },
    0.74
  );
}