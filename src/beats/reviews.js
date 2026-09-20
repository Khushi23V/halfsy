import { gsap, prefersReducedMotion } from '../lib/scroll.js';
import { revealOnScroll } from '../lib/reveal.js';


export function initReviews() {
  const section = document.querySelector('#beat-reviews');
  if (!section || prefersReducedMotion) return;

  revealOnScroll('.reviews__head, .reviews__note',
    { trigger: section, start: 'top 80%' });

  const stage = section.querySelector('.reviews__stage');
  const rim   = section.querySelector('.reviews__rim');
  const cards = gsap.utils.toArray('.review', section);
  if (!rim || cards.length < 2) return;

const PERSPECTIVE_RATIO = 2.6;
const GAP_RATIO = 0.22;

const FILL = 1.16;

  let n = cards.length;
  let step = 360 / n;

  const layout = () => {
    const w = cards[0].offsetWidth;
    const GAP_PX = Math.round(w * GAP_RATIO);

    /* SPACING COMES FROM THE CARD COUNT, NOT THE RADIUS.

       The distance between two neighbouring cards on the rim is
       2R*sin(PI/n) - cardWidth. Widening R to fill the screen without
       adding cards just spreads the same few faces further apart -
       which is exactly what happened here.

       So the count is solved for instead: find the smallest n whose
       tightly packed rim is wide enough to cross the viewport, and
       let the radius fall out of that. More cards means both a wider
       wheel and a tighter one, which is how Groww gets fourteen faces
       almost touching. */
    const want = (window.innerWidth * FILL) / 2;
    const ratio = Math.min(0.999, (w + GAP_PX) / (2 * want));
    n = Math.ceil(Math.PI / Math.asin(ratio));
    n = Math.max(6, Math.min(n, cards.length));
    step = 360 / n;

    const radius = (w + GAP_PX) / (2 * Math.sin(Math.PI / n));
    stage.style.perspective = Math.round(radius * PERSPECTIVE_RATIO) + 'px';

    cards.forEach((c, i) => {
      /* Anything past the solved count is simply not on the wheel.
         The component renders a generous pool so there is always
         enough to fill a wide screen; the rest stand down. */
      if (i >= n) { c.style.display = 'none'; return; }
      c.style.display = '';

      /* Centring is done with margins, NOT a transform, because the
         transform below has to stay purely 3D - a translate in front
         of the rotate would be rotated along with it. */
      c.style.marginLeft = -(c.offsetWidth / 2) + 'px';
      c.style.marginTop  = -(c.offsetHeight / 2) + 'px';

      /* Written as a raw string rather than through gsap.set, and the
         order is the entire point. GSAP always writes
         translate3d(...) rotateY(...) - move first, then spin in
         place - which stacks every card on one spot. A cylinder needs
         rotateY THEN translateZ: turn to face your slice, then push
         out to the rim.

         Z is NEGATIVE so the rim sits behind the origin. Positive Z
         pulls the front card toward the camera, where perspective
         magnifies it over everything else. */
      c.style.transform =
        'rotateY(' + (i * step) + 'deg) translateZ(' + (-radius) + 'px)';
    });
  };
  layout();

  const SECONDS_PER_TURN = 46;   // the speed dial. higher is slower.
  const spin = gsap.to(rim, {
    rotateY: 360,
    duration: SECONDS_PER_TURN,
    ease: 'none',
    repeat: -1,
    onUpdate: () => syncVideo(gsap.getProperty(rim, 'rotateY'))
  });

  /* Only the card facing you plays. Six decoders running at once
     would fight every other animation on this page for the same frame
     budget, and on a laptop that is the difference between a smooth
     page and a hot one. The rest sit on their poster frame.

     Card i faces front when (i * step + rimAngle) is a multiple of
     360, so the front index falls straight out of the rim angle -
     no per-frame geometry reads. */
  let front = -1;
  const syncVideo = (angle) => {
    const i = ((Math.round(-angle / step) % n) + n) % n;
    if (i === front) return;
    front = i;
    cards.forEach((c, j) => {
      const v = c.querySelector('video');
      if (!v) return;
      c.classList.toggle('is-front', j === i);
      if (j === i) v.play().catch(() => {});
      else { v.pause(); v.currentTime = 0; }
    });
  };
  syncVideo(0);


  /* const ease = v => gsap.to(spin, { timeScale: v, duration: 0.7, ease: 'power2.out' });
  const hold = () => ease(0);
  const go   = () => ease(1);

  stage.addEventListener('pointerenter', hold);
  stage.addEventListener('pointerleave', go);

  stage.addEventListener('focusin', hold);
  stage.addEventListener('focusout', go);
  */

  let t;
  const onResize = () => { clearTimeout(t); t = setTimeout(layout, 200); };
  window.addEventListener('resize', onResize);

  return () => {

    window.removeEventListener('resize', onResize);
    clearTimeout(t);
    spin.kill();
  };
}