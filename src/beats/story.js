import { gsap, pinned, prefersReducedMotion } from '../lib/scroll.js';

/* BEATS 3 + 4 - the marquee runs across the locked image, filling from
   faint to solid as each word passes.

   The image no longer opens here. The hero ends with it at full bleed
   and this section starts at full bleed, so the handoff is two
   identical full-screen images - the one seam in the page that cannot
   be got wrong.

   The nav inversion for this beat is owned by hero.js: one trigger
   spans the hero and this section, so there is no boundary for two
   triggers to disagree about. */
export function initStory() {
  const section = document.querySelector('#beat-story');
  if (!section || prefersReducedMotion) return;

  const marquee = section.querySelector('.story__marquee');
  // the arrow and SHOP fill along with the words - they are the end
  // of the same sentence
  const words = gsap.utils.toArray('.story__word, .story__arrow', section);
  const stage = section.querySelector('.stage');
  const lead  = document.querySelector('.hero__media');

  /* This section overlaps the hero by a viewport, so its stage is on
     screen and scrolling up while the hero is still pinned. Keep it
     hidden until the beat actually pins, or its opaque background
     slides over the hero. */
  gsap.set(stage, { autoAlpha: 0 });

  const tl = pinned(section, {
    onEnter: () => {
      gsap.set(stage, { autoAlpha: 1 });
      if (lead) gsap.set(lead, { autoAlpha: 0 });
    },
    onLeaveBack: () => {
      gsap.set(stage, { autoAlpha: 0 });
      if (lead) gsap.set(lead, { autoAlpha: 1 });
    }
  });

  /* THE FILL IS DRIVEN BY SCREEN POSITION, NOT BY THE TIMELINE.

     It used to be a time-staggered opacity tween. Measuring the live
     page showed why that cannot work: every word peaked at about half
     opacity while it was visible and only reached full white after it
     had left the screen - the first word hit 1.0 at x = -1092, a
     thousand pixels past the left edge. The stagger and the traverse
     sit on the same timeline but they do not correspond, because how
     long a word spends on screen depends on the marquee's total
     width. Edit the copy and the mismatch changes with it.

     Reading each word's real position every frame is self-correcting:
     faint as it enters from the right, full white by the time it
     reaches the middle, lit on the way out. It reverses correctly on
     the way back up because it reads position rather than replaying a
     tween. Six getBoundingClientRect calls a frame is nothing. */
  const lightUp = () => {
    const vw = window.innerWidth;
    words.forEach(w => {
      const r = w.getBoundingClientRect();
      const mid = r.left + r.width / 2;
      const t = gsap.utils.clamp(0, 1, (vw - mid) / (vw * 0.5));
     gsap.set(w, { opacity: 0.00 + t * 0.96 });
    });
  };

  /* Marquee crosses the frame. Both values are FUNCTIONS: scrollWidth
     read once at init is the width before the fonts have swapped in,
     so the marquee either stops short or overshoots. Functions plus
     invalidateOnRefresh mean it is re-measured when layout settles. */
  tl.fromTo(marquee,
    { x: () => window.innerWidth },
    { x: () => -(marquee.scrollWidth + window.innerWidth) + window.innerWidth,
      ease: 'none', duration: 0.48, onUpdate: lightUp },
    0.04
  );

  lightUp();   // resting state, before the first scroll
}