import { gsap, ScrollTrigger, pinned, invertNavDuring, prefersReducedMotion } from '../lib/scroll.js';

/* BEAT 2 - the circle fills the screen, the copy types itself in, and
   the story image rises from below and parks on top of the copy.

   Timing, as fractions of the beat:
     0.00-0.30  circle grows from 26% to full bleed
     0.30       typing fires, on its own clock, ~0.5s
     0.80-0.92  image rises from below the fold to centre
     0.92       copy clears from under it

   The circle used to take 0.62 of a 250vh beat - about 155vh of
   scrolling before a single character appeared. Short and immediate
   suits this beat better: there is only one idea in it. */
export function initCircle() {
  const section = document.querySelector('#beat-circle');
  if (!section || prefersReducedMotion) return;

  const fill  = section.querySelector('.circle__fill');
  const copy  = section.querySelector('.circle__copy');
  const media = section.querySelector('.circle__media');
  const lead  = document.querySelector('.scatter__circle');
  const chars = gsap.utils.toArray('.circle__char', section);

  invertNavDuring(section);

  const tl = pinned(section, {
    // the twin has handed off by now - scrolling away a few px behind
    // the real fill, its arc shows above it for a handful of frames
    onEnter:     () => lead && gsap.set(lead, { opacity: 0 }),
    onLeaveBack: () => lead && gsap.set(lead, { opacity: 1 })
  });

  // the container is visible from the start; the characters carry the
  // reveal. They start hidden in CSS, not here - see below.
  gsap.set(copy, { opacity: 1, y: 0 });
  // park the image one full stage below the fold, at init
  gsap.set(media, { yPercent: 100 });

  /* The typing runs on its own clock, not the scrubbed timeline, so it
     plays once at a fixed speed and does not rewind with the scroll.
     `amount` is the total seconds for the whole passage regardless of
     character count - editing the copy changes the pace, not the
     duration. Lower it to speed the typing up. */
  const type = () => {
    gsap.to(chars, {
      opacity: 1,
      duration: 0.01,          // hard on/off per glyph reads as typing
      ease: 'none',
      stagger: { amount: 0.5 }
    });
  };

  /* Fired by its own ScrollTrigger, NOT by a .call() on the scrubbed
     timeline. A scrub callback fires whenever the playhead crosses it,
     including when ScrollTrigger.refresh() re-seeks the timeline after
     images decode - which typed the whole passage while the page was
     still on beat 1. Measured: chars at opacity 1 while the circle
     trigger read progress 0 and isActive false.

     once:true means it can only ever run on the way down, and the
     characters are hidden in CSS so nothing can leave them stranded
     visible if this never fires. */
  const budget = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--beat-circle')
  ) || 250;

  ScrollTrigger.create({
    trigger: section,
    // the point where the circle has finished filling: 0.30 of the beat
    start: () => 'top top-=' + Math.round(window.innerHeight * budget / 100 * 0.30),
    once: true,
    onEnter: type
  });

  tl.fromTo(fill,
    { clipPath: 'circle(26% at 50% 130%)' },
    { clipPath: 'circle(150% at 50% 130%)', ease: 'none', duration: 0.30,
      immediateRender: false },
    0
  )
  /* immediateRender above matters: a fromTo paints its start value on
     init, and beat 2 physically overlaps beat 1, so a 26% circle would
     otherwise sit visible on the page from load. */
  /* Twin of .story__media. Beat 3 cannot paint while beat 2 is pinned,
     so the image rises here, parks over the typed copy, and the real
     one continues from the identical window.

     Only the position animates - the window size is inset(38% 42%) in
     the CSS for both, and story.js opens from that same value. */
  .to(media,
    { yPercent: 0, ease: 'power2.out', duration: 0.12 },
    0.80
  )

  .to(copy, { opacity: 0, y: -24, ease: 'none', duration: 0.14 }, 0.92);

}