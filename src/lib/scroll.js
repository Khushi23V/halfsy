import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

let lenis = null;
let rafHandler = null;

export function initScroll() {
  if (prefersReducedMotion) {
    // No smoothing, no pinning. beats.css already lays the page out
    // as a readable vertical stack - nothing to drive.
    return null;
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Touch smoothing fights native momentum and feels worse than
    // leaving it alone. Desktop only.
    smoothTouch: false
  });

  lenis.on('scroll', ScrollTrigger.update);

  rafHandler = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(rafHandler);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/* Needed in React in a way it never was in vanilla: StrictMode mounts
   the app twice in development. Without this the second mount adds a
   second Lenis instance and a second ticker callback, and the page
   scrolls at roughly double speed. */
export function destroyScroll() {
  if (rafHandler) { gsap.ticker.remove(rafHandler); rafHandler = null; }
  if (lenis) { lenis.destroy(); lenis = null; }
}

/* Scroll budget per beat, resolved from the CSS custom property whose
   name matches the section id. Keeping the map here means the beat
   files never pass their own budget and cannot fall out of sync. */
const BUDGETS = {
  'beat-hero':    '--beat-hero',
  'beat-story':   '--beat-image',
  'beat-brands':  '--beat-brands'
};

/** Standard pinned, scrubbed timeline for one beat. */
export function pinned(trigger, opts = {}) {
  const name = BUDGETS[trigger.id];
  const vh = name
    ? parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(name)
      ) || 200
    : 200;

  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: opts.start ?? 'top top',
      end: () => '+=' + (window.innerHeight * vh) / 100,
      pin: opts.pin ?? trigger.querySelector('.stage'),
      pinSpacing: true,
      scrub: opts.scrub ?? 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: opts.onEnter,
      onLeaveBack: opts.onLeaveBack,
      onToggle: opts.onToggle
    }
  });
}

/** Flip the nav between maroon and bone as dark beats pass under it. */
export function invertNavDuring(trigger) {
  ScrollTrigger.create({
    trigger,
    start: 'top 40px',
    end: 'bottom 40px',
    onToggle: (self) =>
      document.body.classList.toggle('is-inverted', self.isActive)
  });
}

export { gsap, ScrollTrigger };
