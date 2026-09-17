import { gsap, pinned, invertNavDuring, prefersReducedMotion } from '../lib/scroll.js';

/* BEATS 3 + 4 - the marquee runs across the locked image, filling from
   faint to solid as each word passes, then SHOP lands.

   The image no longer opens here. The hero ends with it at full bleed
   and this section starts at full bleed, so the handoff is two
   identical full-screen images - the one seam in the page that cannot
   be got wrong. */
export function initStory() {
  const section = document.querySelector('#beat-story');
  if (!section || prefersReducedMotion) return;

  const marquee = section.querySelector('.story__marquee');
  // the arrow and SHOP fill along with the words - they are the end
  // of the same sentence
  const words = gsap.utils.toArray('.story__word, .story__arrow', section);
  const stage   = section.querySelector('.stage');
  const lead    = document.querySelector('.hero__media');

  /* This section overlaps the hero by a viewport, so its stage is on
     screen and scrolling up while the hero is still pinned. Keep it
     hidden until the beat actually pins, or its opaque background
     slides over the hero. */
  /* Keeps the nav bone while this beat is under it. The hero's own
     inversion ends when the hero pin ends, and this section overlaps
     it by a viewport, so the two ranges join with no gap. Without
     this the logo went maroon the moment the image filled. */
  invertNavDuring(section);

  gsap.set(stage, { autoAlpha: 0 });

  const tl = pinned(section, {
    onEnter: () => {
      gsap.set(stage, { autoAlpha: 1 });
      if (lead) gsap.set(lead, { autoAlpha: 0 });
    },
    onLeaveBack: () => {
      /* Keeps the nav bone while this beat is under it. The hero's own
     inversion ends when the hero pin ends, and this section overlaps
     it by a viewport, so the two ranges join with no gap. Without
     this the logo went maroon the moment the image filled. */
  invertNavDuring(section);

  gsap.set(stage, { autoAlpha: 0 });
      if (lead) gsap.set(lead, { autoAlpha: 1 });
    }
  });

  /* Marquee crosses the frame. Both values are FUNCTIONS: scrollWidth
     read once at init is the width before the fonts have swapped in,
     so the marquee either stops short or overshoots. Functions plus
     invalidateOnRefresh mean it is re-measured when layout settles. */
  tl.fromTo(marquee,
    { x: () => window.innerWidth },
    { x: () => -(marquee.scrollWidth + window.innerWidth) + window.innerWidth,
      ease: 'none', duration: 0.62 },
    0.04
  );

  /* Colour fill, left to right. Scrubbed, so it fills on the way down
     and empties on the way back up. Starting at 0.12 rather than 0.28
     makes the arrival read as a fill rather than a slight brightening -
     the gap between the two states is the whole effect. */
  tl.fromTo(words,
    { opacity: 0.12 },
    { opacity: 1, ease: 'none', duration: 0.26, stagger: { each: 0.06 } },
    0.10
  );
}
