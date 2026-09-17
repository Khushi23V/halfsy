# Halfsy landing — Vite + React

Scroll-driven story page for halfsy.shop. Seven beats, GSAP ScrollTrigger,
Lenis smooth scroll.

```bash
npm install
npm run dev
```

Then drop your images into `public/images/` and the Miama font into
`public/fonts/` — see the README in each.

## How the React integration works

All six beat files under `src/beats/` are **unchanged from the vanilla
version**. They use `document.querySelector` and measure real geometry,
which does not care what rendered the elements. The entire integration is
one effect in `App.jsx`:

- `useLayoutEffect`, not `useEffect` — the beats measure and pin, and
  running after paint gives you one frame of unpinned page on load.
- `gsap.context(...)` records every tween, ScrollTrigger and pin-spacer
  created inside it. `ctx.revert()` destroys all of them. That is what
  makes StrictMode's double mount harmless — without it you get two sets
  of pin-spacers and a page twice its proper height.
- `destroyScroll()` tears down Lenis and its ticker callback. A second
  Lenis instance makes the page scroll at roughly double speed.
- `ScrollTrigger.refresh()` after images decode. Not optional: card
  travel distances are read from `offsetHeight`, and the cards have no
  fixed height.

## Tuning

`src/styles/tokens.css` → the `--beat-*` values are scroll distance per
beat in viewport heights. These are the first numbers to reach for when
pacing feels wrong. `scroll.js` resolves them by section id, so changing
one really does change the scroll distance.

`src/data/assets.js` → card positions, drift speeds, product copy, brand
filenames. Everything you are likely to nudge is in this one file.

## Things that will bite you

**Beat 1 and beat 2 physically overlap by about one viewport.** The
scatter section has a fixed CSS height while its pin-spacer is taller, so
`#beat-circle` starts inside the scatter's scroll range. This is load-
bearing: the handoff feels immediate *because* of the overlap, and
squaring it up reintroduces a viewport of dead scroll. GSAP's `pinSpacing`
cannot butt two pinned full-screen beats together without either a gap or
an overlap. The structurally clean fix is merging them into one pinned
section, the way beats 3 and 4 already share one.

**The 26% appears twice.** `.scatter__circle` grows to `circle(26%)` at
the end of beat 1; `.circle__fill` starts at `circle(26%)` in beat 2.
They must match or the seam pops. Two files: `beats/scatter.js` and
`beats/circle.js`.

**`immediateRender: false` on the circle fill.** A `fromTo` paints its
start value on init. Because of the overlap above, without this a 26%
maroon circle sits visible on the page from first load.

**GSAP owns `transform` on the scatter cards.** It writes `scale: none`
inline when it takes over, so a CSS `:hover { scale: ... }` rule silently
loses. The hover lift goes through `gsap.to`. Measured on the live page:
`gsap.quickTo` on `scale` no-ops here; a plain tween works.

**When products come from an API**, call `ScrollTrigger.refresh()` once
the data resolves, or every beat below `#beat-products` will be measured
against the wrong page height.

## Not carried over

`splitChars` — the vanilla version rewrote the DOM to wrap each character
for the typewriter. Under React that subtree belongs to the renderer, so
`Circle.jsx` renders the spans directly instead. The full sentence is on
`aria-label` with the spans `aria-hidden`, so screen readers get the copy
as a sentence rather than one letter at a time.
