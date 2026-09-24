import { useEffect, useMemo, useRef, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { BRAND_INDEX } from '../data/brands.js';

/* ============================================================
   /brands - The Houses, an A-Z index.

   Every brand we watch, grouped by letter - just the names. Hovering
   a row brings up a card with the brand's mark that follows the
   cursor. Each row goes to the shop filtered to that brand.

   Like /shop, no scroll beats here - native scroll, no GSAP.
   ============================================================ */

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const shopHref = name => '/shop?brand=' + encodeURIComponent(name);

export default function BrandsPage() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(null);
  const [peek, setPeek] = useState(null);
  const spacer = useRef(null);
  const card = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const brands = BRAND_INDEX;

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? brands.filter(b => b.name.toLowerCase().includes(q)) : brands;
  }, [brands, query]);

  const groups = useMemo(() => {
    const g = new Map();
    shown.forEach(b => {
      const L = b.name[0].toUpperCase();
      if (!g.has(L)) g.set(L, []);
      g.get(L).push(b);
    });
    return [...g.entries()];
  }, [shown]);

  const present = new Set(groups.map(([L]) => L));

  /* page chrome - same as /shop */
  useEffect(() => {
    document.body.classList.add('is-navup', 'is-glass', 'is-shop');
    const io = new IntersectionObserver(([e]) => {
      document.body.classList.toggle('is-footer', e.intersectionRatio > 0.25);
    }, { threshold: [0, 0.25, 0.5] });
    if (spacer.current) io.observe(spacer.current);
    return () => {
      io.disconnect();
      document.body.classList.remove('is-navup', 'is-glass', 'is-shop', 'is-footer');
    };
  }, []);

  /* underline the letter whose group is at the top of the screen */
  useEffect(() => {
    const els = [...document.querySelectorAll('.bgroup')];
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.dataset.letter); });
    }, { rootMargin: '-20% 0px -75% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [groups]);

  /* the hover card eases after the cursor rather than sticking to it -
     one rAF loop, only while a card is showing */
  useEffect(() => {
    if (!peek) return;
    let raf;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.16;
      pos.current.y += (target.current.y - pos.current.y) * 0.16;
      if (card.current) {
        card.current.style.left = pos.current.x + 'px';
        card.current.style.top = pos.current.y + 'px';
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [peek]);

  // keep showing the last brand while the card fades out, instead of
  // emptying it mid-fade
  const lastPeek = useRef(null);
  if (peek) lastPeek.current = peek;
  const cardBrand = lastPeek.current;

  const canHover = typeof matchMedia !== 'undefined' && matchMedia('(hover: hover)').matches;

  const onEnter = (b, e) => {
    if (!canHover) return;
    // the card sits to the right of the cursor, so it never covers the name
    target.current = { x: e.clientX + 180, y: e.clientY };
    if (!peek) pos.current = { ...target.current };
    setPeek(b);
  };
  const onMove = e => { target.current = { x: e.clientX + 180, y: e.clientY }; };

  const jump = (e, L) => {
    e.preventDefault();
    const el = document.getElementById('letter-' + L);
    if (!el) return;
    const navH = document.querySelector('.nav')?.offsetHeight || 0;
    const barH = document.querySelector('.alpha')?.offsetHeight || 0;
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - navH - barH - 8, behavior: 'smooth' });
  };

  return (
    <>
      <Nav />

      <main className="shop brands-page" id="main">
        <header className="shop__head">
          <nav className="shop__crumbs" aria-label="Breadcrumb">
            <a href="/">Halfsy</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Brands</span>
          </nav>
          <h1 className="shop__title">The Houses</h1>
          <p className="shop__count">
            {BRAND_INDEX.length} brands we watch
          </p>
        </header>

        <section className="bindex" aria-label="Brands A to Z">
          <div className="bindex__top">
            <h2>A&ndash;Z</h2>
            <label className="bindex__find">
              <span className="sr-only">Find a brand</span>
              <input type="search" placeholder="Find a brand" value={query}
                     onChange={e => setQuery(e.target.value)} />
            </label>
          </div>

          <nav className="alpha" aria-label="Jump to letter">
            {LETTERS.map(L => present.has(L) ? (
              <a key={L} href={'#letter-' + L} onClick={e => jump(e, L)}
                 className={active === L ? 'is-on' : undefined}
                 aria-current={active === L ? 'true' : undefined}>{L}</a>
            ) : (
              <span key={L} className="is-empty" aria-hidden="true">{L}</span>
            ))}
          </nav>

          {groups.length === 0 && (
            <p className="bindex__empty">No brand by that name yet &mdash; we are always adding houses.</p>
          )}

          {groups.map(([L, list]) => (
            <div className="bgroup" id={'letter-' + L} data-letter={L} key={L}>
              <div className="bgroup__letter" aria-hidden="true">{L}</div>
              <ul className="bgroup__rows">
                {list.map(b => (
                  <li key={b.name}>
                    <a className="brow" href={shopHref(b.name)}
                       onPointerEnter={e => onEnter(b, e)} onPointerMove={onMove}
                       onPointerLeave={() => setPeek(null)}>
                      <span className="brow__name">{b.name}</span>
                      <span className="brow__arrow" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none">
                          <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.2"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* the brand's mark, following the cursor. Decorative - the row
            already says everything the card does. */}
        <div ref={card} className={'bpeek' + (peek ? ' is-on' : '')} aria-hidden="true">
          {cardBrand && (
            <>
              <div className="bpeek__mark">
                {cardBrand.logo
                  ? <img src={cardBrand.logo} alt="" />
                  : <span className="bpeek__word">{cardBrand.name}</span>}
              </div>
            </>
          )}
        </div>
      </main>

      <div className="footer__spacer" ref={spacer} aria-hidden="true" />
      <Footer />
    </>
  );
}
