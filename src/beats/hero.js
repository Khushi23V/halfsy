import { gsap, ScrollTrigger, pinned, prefersReducedMotion } from '../lib/scroll.js';
import { prepareLines, playReveal } from '../lib/reveal.js';
import { whenReady } from './loader.js';


export function initHero() {
  const section = document.querySelector('#beat-hero');
  if (!section || prefersReducedMotion) return;

  const cards = gsap.utils.toArray('.hero__card', section);
  const display = section.querySelector('.hero__display');
  const copyText = section.querySelector('.hero__copy p');
  const type  = section.querySelector('.hero__type');
  const hint  = section.querySelector('.hero__hint');
  const fill  = section.querySelector('.hero__fill');
  const media = section.querySelector('.hero__media');
  const copy  = section.querySelector('.hero__copy');
    const carousel = section.querySelector('.hero__carousel');
  const track    = section.querySelector('.hero__track');
  // dark hero: nav is bone from the first frame, not from the fill
  const dark = section.classList.contains('hero--dark');
  const budget = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--beat-hero')
  ) || 320;
  // scroll distance, in px, of a given fraction of the beat
  const at = f => Math.round(window.innerHeight * budget / 100 * f);


  const boneNav = y => dark
    ? (y < at(0.34) || y > at(0.90))
    : y > at(0.34);

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    endTrigger: '#beat-story',
    end: 'bottom 40px',
    onUpdate: self => document.body.classList.toggle(
      'is-inverted', boneNav(self.scroll() - self.start)),
    onLeave: () => document.body.classList.remove('is-inverted')
  });
  document.body.classList.toggle('is-inverted', dark);

  // header is on from the start - arrives as the loader lifts
  whenReady().then(() => document.body.classList.add('is-navup'));

    const script = display.querySelector('.script');

  gsap.set(display, {
    opacity: 0, yPercent: 12, scale: 1.05,
    transformOrigin: '50% 60%', force3D: true
  });
  if (script) gsap.set(script, { opacity: 0 });

  whenReady().then(() => {
    const intro = gsap.timeline({
      // the promotion is only worth holding while it animates
      onComplete: () => gsap.set(display, { clearProps: 'willChange,transform' })
    });
    intro.to(display, {
      opacity: 1, yPercent: 0, scale: 1,
      duration: 1.8, ease: 'power3.out'
    });
    // the script word lands a beat later, so the eye catches it as a
    // separate gesture rather than part of the same block
    if (script) {
      intro.to(script, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.45);
    }
  });

  
  prepareLines(copyText);

  ScrollTrigger.create({
    trigger: section,
    start: () => 'top top-=' + at(0.40),
    once: true,
    onEnter: () => playReveal(copyText, { duration: 1.1, stagger: 0.12 })
  });

  const tl = pinned(section);

  gsap.set(media, { yPercent: 100 });


  /* Free drag that loops. pos.off is unbounded; render() wraps it by
     one pass of cards, so there are no ends to hit. */
  const N = cards.length / 3;
  const CENTRE = N;
  const xFor = i => {
    const c = cards[i];
    return carousel.clientWidth / 2 - (c.offsetLeft + c.offsetWidth / 2);
  };
  const period = () => cards[N].offsetLeft - cards[0].offsetLeft;
  const pos = { off: 0 };
  const render = () => {
    const home = xFor(CENTRE), P = period();
    gsap.set(track, { x: gsap.utils.wrap(home - P / 2, home + P / 2, home + pos.off) });
    focus();
  };
  const place = () => gsap.set(track, { x: xFor(current) });

  const focus = () => {
    const w = cards[0].offsetWidth;
    const mid = carousel.clientWidth / 2;
    const half = window.innerWidth / 2;
    const tx = gsap.getProperty(track, 'x');

    const d = cards.map(c => Math.abs(c.offsetLeft + w / 2 + tx - mid) / half);
    const s = d.map(v => 1 + 0.2 * Math.max(0, 1 - v * 3.2));
    const g = s.map(v => (v - 1) * w);
    const total = g.reduce((a, b) => a + b, 0);
    const top = s.indexOf(Math.max(...s));

    let before = 0;
    cards.forEach((c, i) => {
      gsap.set(c, { scale: s[i], x: before + g[i] / 2 - total / 2, zIndex: i === top ? 3 : 1 });
      before += g[i];
      c.classList.toggle('is-far',  d[i] > 0.5);
      c.classList.toggle('is-edge', d[i] > 0.75);
    });
  };
  



  if (hint) tl.to(hint, { opacity: 0, duration: 0.04 }, 0);

  /* Circle on the radius, not a scaled div - scaling softens the edge
     and blurs the text riding inside it. Starts at 0% and is simply
     invisible until it clears the bottom of the viewport. */
  tl.fromTo(fill,
    { clipPath: 'circle(0% at 50% 130%)' },
    { clipPath: 'circle(150% at 50% 130%)', ease: 'none', duration: 0.18 },
    0.22
  );

    /* The lines are a one-shot and stay put once revealed. The
     CONTAINER is scrubbed, so scrolling back up takes the copy away
     with the circle instead of stranding bone text over the hero. */
  tl.fromTo(copy,
    { opacity: 0 },
    { opacity: 1, ease: 'none', duration: 0.02 },
    0.38
  );

  /* Image rises, parks over the copy, holds, then opens.

     The open is the slowest thing in the page on purpose: 0.28 of the
     beat, which at --beat-hero 380 is about 106vh of scroll. power1
     rather than power2 keeps the rate even end to end, so it reads as
     something being opened rather than a transition easing out. */
  tl.to(media, { yPercent: 0, ease: 'power2.out', duration: 0.16 }, 0.50)
    .to(media,
      { clipPath: 'inset(0% 0% round 0px)', ease: 'power1.inOut', duration: 0.28 },
      0.72
    );
  const onRefresh = render;
  ScrollTrigger.addEventListener('refresh', onRefresh);
  render();
  /* Drag. Move/up listen on window, not with setPointerCapture:
     capture retargets the click to the carousel, and the cards are
     links. Release projects the flick velocity forward and snaps to
     the nearest card, so one always settles in the middle. */
  const teardown = [];

  let dragging = false, moved = false;
  let startX = 0, startOff = 0, lastX = 0, lastT = 0, vel = 0;

  const down = e => {
    if (e.button !== 0) return;
    dragging = true; moved = false;
    startX = lastX = e.clientX;
    lastT = performance.now(); vel = 0;
    gsap.killTweensOf(pos);          // grab it mid-coast
    startOff = pos.off;
    carousel.classList.add('is-dragging');
  };
  const move = e => {
    if (!dragging) return;
    const now = performance.now();
    vel = (e.clientX - lastX) / Math.max(1, now - lastT);   // px per ms
    lastX = e.clientX; lastT = now;
    if (Math.abs(e.clientX - startX) > 5) moved = true;
    pos.off = startOff + (e.clientX - startX);
    render();
  };
  const up = () => {
    if (!dragging) return;
    dragging = false;
    carousel.classList.remove('is-dragging');
    // held still before letting go = no flick
    if (performance.now() - lastT > 80) vel = 0;
    gsap.to(pos, { off: pos.off + vel * 700, duration: 1.4, ease: 'power3.out', onUpdate: render });
  };
  // a drag is not a click - swallow the one that follows it
  const click = e => {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  };
  const noNativeDrag = e => e.preventDefault();

  carousel.addEventListener('pointerdown', down);
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
  carousel.addEventListener('click', click, true);
  carousel.addEventListener('dragstart', noNativeDrag);
  teardown.push(() => {
    carousel.removeEventListener('pointerdown', down);
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
    carousel.removeEventListener('click', click, true);
    carousel.removeEventListener('dragstart', noNativeDrag);
  });

  return () => {
      teardown.forEach(fn => fn());
    ScrollTrigger.removeEventListener('refresh', onRefresh);
    document.body.classList.remove('is-navup', 'is-inverted');
    cards.forEach(c => c.classList.remove('is-far', 'is-edge'));
  };
}
  