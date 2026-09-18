import { gsap, ScrollTrigger, prefersReducedMotion } from './scroll.js';

/* ============================================================
   Masked line reveal.

   Each line of text sits in its own overflow:hidden box and starts
   pushed below it, so the line rises from behind a hard edge rather
   than fading. The edge is the whole effect - a fade reads as a
   transition, a mask reads as the words arriving.

   No SplitText (it is a paid GSAP plugin). Lines are found by
   measurement: wrap every word, read each word's offsetTop, and words
   sharing a top are on one line.

   THE RULE THIS MODULE IS BUILT AROUND: never hold a reference to a
   line element. A re-split - on resize, or when the fonts land and
   the metrics change - throws every line away and builds new ones,
   so any array captured earlier points at detached nodes. Tweening
   those animates nothing while the real lines sit hidden. Everything
   here is addressed through the OWNING ELEMENT and queries its lines
   at the moment it animates them.
   ============================================================ */

const registry = new Map();   // element -> { revealed, opts }

/* An element carrying inline markup - <span class="script">, a link -
   reveals as ONE block rather than per line. Rebuilding its lines
   would mean moving nodes out of that markup and losing it, and every
   such element here is a short heading where one mask is
   indistinguishable from several. */
function hasInlineMarkup(el) {
  return [...el.children].some(c => c.tagName !== 'BR');
}

function splitLines(el) {
  // keep the untouched source so a re-split starts from clean HTML
  if (el.dataset.revealSrc === undefined) el.dataset.revealSrc = el.innerHTML;
  else el.innerHTML = el.dataset.revealSrc;

  const mask = () => {
    const m = document.createElement('span');
    m.className = 'reveal__mask';
    return m;
  };
  const line = () => {
    const l = document.createElement('span');
    l.className = 'reveal__line';
    return l;
  };

  if (hasInlineMarkup(el)) {
    const m = mask(), l = line();
    l.innerHTML = el.innerHTML;
    m.append(l);
    el.replaceChildren(m);
    return;
  }

  // wrap every word so it can be measured. inline-block because
  // offsetTop is unreliable on a plain inline box.
  const words = [];
  const staging = document.createDocumentFragment();
  [...el.childNodes].forEach(n => {
    if (n.nodeName === 'BR') { staging.append(document.createElement('br')); return; }
    (n.textContent || '').split(/(\s+)/).forEach(tok => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) { staging.append(' '); return; }
      const w = document.createElement('span');
      w.style.display = 'inline-block';
      w.textContent = tok;
      staging.append(w);
      words.push(w);
    });
  });
  el.replaceChildren(staging);

  // group by vertical position - that is what a "line" is
  const rows = new Map();
  words.forEach(w => {
    const top = Math.round(w.offsetTop);
    if (!rows.has(top)) rows.set(top, []);
    rows.get(top).push(w);
  });

  const out = document.createDocumentFragment();
  [...rows.keys()].sort((a, b) => a - b).forEach(top => {
    const m = mask(), l = line();
    l.textContent = rows.get(top).map(w => w.textContent).join(' ');
    m.append(l);
    out.append(m);
  });
  el.replaceChildren(out);
}

const linesOf = el => el.querySelectorAll('.reveal__line');

/* Split and hide. Safe to call on an element already registered. */
export function prepareLines(el) {
  if (!el || prefersReducedMotion) return;
  if (!registry.has(el)) registry.set(el, { revealed: false });
  splitLines(el);
  gsap.set(linesOf(el), { yPercent: 115 });
}

/* Reveal an element that prepareLines() has already hidden. Marks it
   revealed FIRST, so a re-split landing mid-tween settles the new
   lines at rest instead of re-hiding them. */
export function playReveal(el, opts = {}) {
  if (!el || prefersReducedMotion) return;
  const entry = registry.get(el);
  if (entry) entry.revealed = true;

  return gsap.to(linesOf(el), {
    yPercent: 0,
    duration: opts.duration ?? 1.05,
    ease: opts.ease || 'power3.out',
    stagger: opts.stagger ?? 0.09,
    delay: opts.delay ?? 0
  });
}

/* Reveal now - for anything already on screen at load. */
export function revealNow(target, opts = {}) {
  gsap.utils.toArray(target).forEach((el, i) => {
    prepareLines(el);
    playReveal(el, { ...opts, delay: (opts.delay ?? 0) + i * (opts.groupStagger ?? 0.1) });
  });
}

/* Reveal when the element scrolls into view. `once`: a mask reveal
   that replays on every pass turns a flourish into a tic. */
export function revealOnScroll(target, opts = {}) {
  if (prefersReducedMotion) return;
  gsap.utils.toArray(target).forEach((el, i) => {
    prepareLines(el);
    ScrollTrigger.create({
      trigger: opts.trigger || el,
      start: opts.start || 'top 84%',
      once: true,
      /* When several elements share one trigger - an eyebrow, a
         heading and a note - they cascade. groupStagger spaces the
         elements; stagger spaces the lines inside each one. */
      onEnter: () => playReveal(el, {
        ...opts,
        delay: (opts.delay ?? 0) + i * (opts.groupStagger ?? 0.1)
      })
    });
  });
}

/* Lines break differently at a different width and against a
   different font, so the split has to be redone. Anything already
   revealed - or mid-reveal - is put straight to rest; replaying the
   animation on a window drag would be worse than not re-splitting. */
function resplitAll() {
  registry.forEach((entry, el) => {
    splitLines(el);
    gsap.set(linesOf(el), { yPercent: entry.revealed ? 0 : 115 });
  });
  ScrollTrigger.refresh();
}

let resizeTimer;
export function initReveal() {
  if (prefersReducedMotion) return;

  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resplitAll, 220);
  };
  window.addEventListener('resize', onResize);

  /* Fonts change metrics, which changes where lines break. The first
     split is measured against the fallback face, so it has to be
     redone once the real ones land. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(resplitAll);
  }

  return () => {
    window.removeEventListener('resize', onResize);
    clearTimeout(resizeTimer);
    registry.clear();
  };
}
