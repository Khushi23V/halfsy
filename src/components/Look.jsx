import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LOOK } from '../data/assets.js';

/* BEAT 7. Get the look.

   A styled model on one side with a dot on each piece she is wearing;
   a quiet heading on the other. Point at (or tap) a dot and the
   heading gives way to that piece - its product photo, name and
   price - with a line drawn from the dot to the photo. Leave the
   section and the heading comes back.

   Replaces The Overnight Edition on the homepage (Drops.jsx is kept,
   unmounted).

   The line is measured, not laid out: its two ends are the dot's
   centre and the nearest point on the product photo, read from the
   DOM whenever the piece changes or the section resizes. That keeps
   it right on desktop (line runs sideways) and on a phone (line runs
   up to the card above) with the same code. */
export default function Look() {
  const [active, setActive] = useState(null);
  const [line, setLine] = useState(null);
  const inner = useRef(null);
  const media = useRef(null);
  const dots = useRef({});

  const piece = LOOK.pieces.find(p => p.id === active) || null;
  // keep the last piece on screen while the card fades out
  const last = useRef(null);
  if (piece) last.current = piece;
  const shown = last.current;

  const measure = useCallback(() => {
    const dot = dots.current[active];
    if (!active || !dot || !media.current || !inner.current) { setLine(null); return; }
    const base = inner.current.getBoundingClientRect();
    const d = dot.getBoundingClientRect();
    const m = media.current.getBoundingClientRect();
    const x1 = d.left + d.width / 2 - base.left;
    const y1 = d.top + d.height / 2 - base.top;
    // nearest point on the photo, kept a little way in from its corners
    const inset = 18;
    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
    const x2 = clamp(x1, m.left - base.left, m.right - base.left);
    const y2 = clamp(y1, m.top - base.top + inset, m.bottom - base.top - inset);
    setLine({ x1, y1, x2, y2 });
  }, [active]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    if (!inner.current) return;
    const ro = new ResizeObserver(measure);
    ro.observe(inner.current);
    // the stage is sticky, so it moves against the model while the page
    // scrolls - the line has to follow
    window.addEventListener('scroll', measure, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener('scroll', measure); };
  }, [measure]);

  // Esc, or a tap anywhere that is not a dot or the card, puts the heading back
  useEffect(() => {
    if (!active) return;
    const onKey = e => e.key === 'Escape' && setActive(null);
    const onDown = e => {
      if (!e.target.closest('.look__dot, .look__card')) setActive(null);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [active]);

  return (
    <section className="beat look" id="beat-look"
             onPointerLeave={e => e.pointerType === 'mouse' && setActive(null)}>
      <div className={'look__inner' + (active ? ' is-active' : '')} ref={inner}>

        <div className="look__stage">
          <header className="look__intro" aria-hidden={active ? 'true' : undefined}>
            <h2 className="look__head">Get the look</h2>
            <p className="look__note">
              Click on a dot to see the piece.
            </p>
          </header>

          {/* always in the DOM so the fade has something to fade; inert
              (hidden from the tab order and screen readers) until a dot
              is chosen */}
          <a className="look__card" aria-hidden={active ? undefined : 'true'}
             tabIndex={active ? 0 : -1}
             href={shown?.href || '#'} target="_blank" rel="noopener noreferrer sponsored">
            <span className="look__media" ref={media}>
              {shown && <img key={shown.id} src={shown.img} alt="" draggable={false}
                             onLoad={measure}
                             onError={e => e.currentTarget.parentElement.classList.add('is-broken')} />}
              <span className="look__arrow" aria-hidden="true">
                <svg viewBox="0 0 12 12" fill="none">
                  <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.2"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
            {shown && (
              <span className="look__meta" aria-live="polite">
                <span className="look__brand">{shown.brand}</span>
                <span className="look__name">{shown.name}</span>
                <span className="look__price">
                  <span className="look__now">{shown.now}</span>
                  <span className="sr-only">, was </span>
                  <s>{shown.was}</s>
                </span>
                <span className="sr-only">Shop on {shown.retailer} (opens in a new tab)</span>
              </span>
            )}
          </a>
        </div>

        <div className="look__figure" style={{ aspectRatio: LOOK.ratio }}>
          <img className="look__model" src={LOOK.image} alt="Model wearing the six pieces listed"
               draggable={false} onLoad={measure} />
          {LOOK.pieces.map(p => (
            <button key={p.id} type="button"
                    ref={el => { dots.current[p.id] = el; }}
                    className={'look__dot' + (active === p.id ? ' is-on' : '')}
                    style={{ left: p.x + '%', top: p.y + '%' }}
                    aria-label={`${p.brand} ${p.name}, ${p.now}`}
                    aria-pressed={active === p.id}
                    onPointerEnter={e => e.pointerType === 'mouse' && setActive(p.id)}
                    onFocus={() => setActive(p.id)}
                    onClick={() => setActive(p.id)}>
              <span />
            </button>
          ))}
        </div>

        {/* the connecting line; keyed so it redraws from the dot each time */}
        <svg className="look__line" aria-hidden="true">
          {line && active && (
            <g key={active}>
              <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} pathLength="1" />
              <circle cx={line.x2} cy={line.y2} r="3" />
            </g>
          )}
        </svg>
      </div>
    </section>
  );
}
