import { useLayoutEffect, useRef } from 'react';
import { COVER } from '../data/assets.js';

/* The overlap opening.

   One line of type and one vertical photograph. The headline starts
   on the page and its last word crosses onto the picture - that
   overlap is the whole idea. Under it: a few lines and one button.
   The photograph is a model shot from a live listing, credited
   beneath with its price, and links to the retailer. Beside it, a
   narrow second frame shows the same photograph close in on its
   detail (COVER.detail; leave it out for one frame only).

   The heading is two spans on purpose. The grid's first column is
   exactly as wide as the first span ("Luxury for"), so the second
   span ("less") and the photograph both start where that column
   ends - the overlap holds in any font and at any width without
   measuring anything in JS. See cover.css.

   TWO INKS. Any type that lies on the photograph turns light, and
   stays dark on the page - the letter is cut exactly at the picture's
   edge. Each piece of type marked data-split is painted through a
   background clipped to its glyphs: dark all over, with one light
   rectangle laid where the photograph is. The effect below measures
   that rectangle (the photo's box, in the type's own coordinates) and
   hands it to the CSS as --split-x/y/w/h; it re-measures whenever
   either of them changes size. The type's own entrance transform is
   subtracted, so a measurement taken mid-animation is still right.

   `landing` - it is the first screen of the page: the heading is the
   page's <h1> and the entrance waits for the loader (beats/cover.js).
   Without it the same block works as a section further down.

   THE HEADLINE'S FACE has three settings (cover.css, "headline faces"):
     caps     - Cormorant, capitals
     serif    - Cormorant, lowercase
     urbanist - Urbanist light, lowercase
   COVER.head in data/assets.js is the one the site uses. To look at
   another without editing anything, add it to the address:
   /?head=serif or /?head=urbanist. */
const HEADS = ['caps', 'serif', 'urbanist'];

function headFace() {
  const asked = new URLSearchParams(window.location.search).get('head');
  if (HEADS.includes(asked)) return asked;
  return HEADS.includes(COVER.head) ? COVER.head : 'caps';
}

export default function Cover({ landing = false }) {
  const p = COVER.piece;
  const Heading = landing ? 'h1' : 'h2';
  const face = headFace();
  const inner = useRef(null);
  const media = useRef(null);

  useLayoutEffect(() => {
    const box = inner.current, photo = media.current;
    if (!box || !photo) return;
    const type = Array.from(box.querySelectorAll('[data-split]'));

    const measure = () => {
      const m = photo.getBoundingClientRect();
      type.forEach(el => {
        const r = el.getBoundingClientRect();
        // where the element rests, not where its entrance has it right now
        const t = new DOMMatrixReadOnly(getComputedStyle(el).transform);
        el.style.setProperty('--split-x', (m.left - (r.left - t.m41)) + 'px');
        el.style.setProperty('--split-y', (m.top - (r.top - t.m42)) + 'px');
        el.style.setProperty('--split-w', m.width + 'px');
        el.style.setProperty('--split-h', m.height + 'px');
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    [box, photo, ...type].forEach(el => ro.observe(el));
    return () => ro.disconnect();
  }, []);

  return (
    <section className={'beat cover cover--' + face + (landing ? ' cover--landing' : '')} id="beat-cover"
             aria-labelledby="cover-head">
      <div className="cover__inner" ref={inner}>

        <Heading className="cover__head" id="cover-head" aria-label={`${COVER.lead} ${COVER.tail}`}>
          <span className="cover__lead" aria-hidden="true" data-split>{COVER.lead}</span>
          <span className="cover__tail" aria-hidden="true" data-split>{COVER.tail}</span>
        </Heading>

        <div className="cover__copy">
          <p className="cover__note" data-split>{COVER.note}</p>
          <a className="btn cover__cta" href={COVER.cta.href}>{COVER.cta.label}</a>
        </div>

        <figure className="cover__figure">
          <div className="cover__frames">
            <div className="cover__main">
              <a className="cover__link" href={p.href} target="_blank" rel="noopener noreferrer sponsored">
                <span className="cover__media" ref={media}>
                  <img src={COVER.image} alt={COVER.alt} draggable={false}
                       style={{ objectPosition: COVER.focus }} />
                  <span className="cover__arrow" aria-hidden="true">
                    <svg viewBox="0 0 12 12" fill="none">
                      <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.2"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
                <span className="sr-only">Shop on {p.retailer} (opens in a new tab)</span>
              </a>
              <p className="cover__credit">
                <span className="cover__brand">{p.brand}</span>
                <span className="cover__name">{p.name}</span>
                <span className="cover__price">
                  <span className="cover__now">{p.now}</span>
                  <span className="sr-only">, was </span>
                  <s>{p.was}</s>
                </span>
              </p>
            </div>

            {/* the narrow second frame: the same photograph, close in on
                the detail - no second image to find or load */}
            {COVER.detail && (
              <span className="cover__detail" aria-hidden="true"
                    style={{ backgroundImage: `url("${COVER.image}")`,
                             backgroundPosition: COVER.detail }} />
            )}
          </div>
        </figure>

      </div>
    </section>
  );
}
