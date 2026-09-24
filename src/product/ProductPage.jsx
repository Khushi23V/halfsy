import { useEffect, useMemo, useRef, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { PRODUCTS_ALL } from '../data/products.js';
import { PRODUCT_DETAILS } from '../data/productDetails.js';

/* ============================================================
   /p/:id - the product screen.

   The page Halfsy was missing: everything you need to decide BEFORE
   you are sent to the retailer (and before the affiliate cookie
   window starts) - what it is, what it costs now and what it cost,
   whether your size is actually there, and where you will be buying
   it. Two actions: watch it, or go and buy it.

   Native scroll, no GSAP - same as /shop.
   ============================================================ */

const ArrowIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.2"
          strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 20.3l-1.1-1C6 14.9 3 12.2 3 8.9 3 6.2 5.1 4.2 7.7 4.2c1.5 0 2.9.7 3.8 1.8h1c.9-1.1 2.3-1.8 3.8-1.8 2.6 0 4.7 2 4.7 4.7 0 3.3-3 6-7.9 10.4l-1.1 1z" />
  </svg>
);

const usd = n => '$' + n.toLocaleString('en-US');
const day = iso => new Date(iso + 'T00:00:00');
const fmtDate = iso => day(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

export default function ProductPage() {
  const id = decodeURIComponent(location.pathname.split('/')[2] || '');
  const p = PRODUCTS_ALL.find(x => x.id === id);
  const d = PRODUCT_DETAILS[id];

  const [watching, setWatching] = useState(false);
  const spacer = useRef(null);

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

  useEffect(() => {
    if (p) document.title = `${p.brand} ${p.name} · Halfsy`;
  }, [p]);

  // four more from the same section, the same gender first
  const more = useMemo(() => {
    if (!p) return [];
    return PRODUCTS_ALL
      .filter(x => x.id !== p.id && x.section === p.section)
      .sort((a, b) => (b.gender === p.gender) - (a.gender === p.gender))
      .slice(0, 4);
  }, [p]);

  if (!p) {
    return (
      <>
        <Nav />
        <main className="shop pdp-missing" id="main">
          <h1 className="shop__title">This piece has gone</h1>
          <p>It may have sold out, or its price went back up.</p>
          <a className="btn" href="/shop">Back to the shop</a>
        </main>
      </>
    );
  }

  const inStock = d ? d.sizes.filter(s => s.stock).length : null;

  return (
    <>
      <Nav />

      <main className="shop pdp" id="main">
        <nav className="shop__crumbs pdp__crumbs" aria-label="Breadcrumb">
          <a href="/">Halfsy</a>
          <span aria-hidden="true">/</span>
          <a href="/shop">Shop</a>
          <span aria-hidden="true">/</span>
          <a href={`/shop?brand=${encodeURIComponent(p.brand)}`}>{p.brand}</a>
        </nav>

        <div className="pdp__layout">
          <Gallery src={p.img} />

          <section className="pdp__info" aria-labelledby="pdp-name">
            <p className="pdp__brand">
              <a href={`/shop?brand=${encodeURIComponent(p.brand)}`}>{p.brand}</a>
            </p>
            <h1 className="pdp__name" id="pdp-name">{p.name}</h1>

            <div className="pdp__price">
              <span className="pdp__now">{p.now}</span>
              <span className="sr-only">, was </span>
              <s className="pdp__was">{p.was}</s>
              <span className="pdp__off">&minus;{p.off}%</span>
            </div>
            {d?.checked && (
              <p className="pdp__checked">Price and sizes checked at {p.retailer} {d.checked}</p>
            )}

            {d && (
              /* read-only: in-stock sizes are solid, sold-out ones are struck
                 through - nothing to pick, the row answers "is my size there?" */
              <div className="pdp__sizes">
                <h2 className="pdp__sizes-head">
                  <span>Sizes available <span className="pdp__sys">({d.sizeSystem})</span></span>
                  <span className="pdp__stock">{inStock} of {d.sizes.length} in stock</span>
                </h2>
                <ul className="sizes">
                  {d.sizes.map(s => (
                    <li key={s.label} className={'size' + (s.stock ? '' : ' is-out')}>
                      {s.label}
                      <span className="sr-only">{s.stock ? ', in stock' : ', sold out'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pdp__ctas">
              <a className="pdp__cta pdp__cta--shop"
                 href={p.href} target="_blank" rel="noopener noreferrer sponsored">
                Shop on {p.retailer}
                <span className="pdp__cta-box"><ArrowIcon /></span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <button type="button" className={'pdp__cta pdp__cta--watch' + (watching ? ' is-on' : '')}
                      aria-pressed={watching} onClick={() => setWatching(w => !w)}>
                <HeartIcon />
                {watching ? 'On your watchlist' : 'Add to watchlist'}
              </button>
            </div>

            <p className="pdp__small">
              You&rsquo;ll check out on {p.retailer}&rsquo;s own site. {d?.retailerNote}
              {' '}When you buy through Halfsy we may earn a small commission; it never changes your price.
            </p>

            {d?.history && <PriceHistory history={d.history} was={p.was} />}
          </section>
        </div>

        {more.length > 0 && (
          <section className="pdp__more" aria-labelledby="more-title">
            <h2 id="more-title">More like this</h2>
            <ul className="shop__grid pdp__moregrid">
              {more.map(m => {
                const own = PRODUCT_DETAILS[m.id];
                return (
                  <li key={m.id}>
                    <article className="card">
                      <a className="card__link" href={own ? `/p/${m.id}` : m.href}
                         {...(own ? {} : { target: '_blank', rel: 'noopener noreferrer sponsored' })}>
                        <span className="card__media">
                          <img src={m.img} alt="" loading="lazy"
                               onError={e => e.currentTarget.parentElement.classList.add('is-broken')} />
                          <span className="card__arrow" aria-hidden="true"><ArrowIcon /></span>
                        </span>
                        <span className="card__info">
                          <span className="card__brand">{m.brand}</span>
                          <span className="card__name">{m.name}</span>
                          <span className="card__price">
                            <span className="card__now">{m.now}</span>
                            <span className="card__was">{m.was}</span>
                            <span className="card__off">&minus;{m.off}%</span>
                          </span>
                          <span className="card__retailer">at {m.retailer}</span>
                        </span>
                      </a>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>

      <div className="footer__spacer" ref={spacer} aria-hidden="true" />
      <Footer />
    </>
  );
}

/* ---- the picture -----------------------------------------------
   One image per listing in the feed today. Hovering zooms in where
   the cursor is, so fabric and sequins can be read - the closest a
   screen gets to picking the piece up. */
function Gallery({ src }) {
  const [zoom, setZoom] = useState(null);
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  return (
    <div className="pdp__gallery">
      <div className={'pdp__media' + (zoom ? ' is-zoomed' : '')}
           onPointerMove={onMove} onPointerLeave={() => setZoom(null)}>
        <img src={src} alt="" draggable={false}
             style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
             onError={e => e.currentTarget.parentElement.classList.add('is-broken')} />
      </div>
    </div>
  );
}

/* ---- price history ------------------------------------------------
   One series, so no legend - the heading names it. A step line
   (a price holds until it moves), a marker at each change, direct
   labels only on the first price and today's, a crosshair tooltip on
   hover, and a table for screen readers. Axis from $0, so a 60% fall
   looks like a 60% fall. */
function PriceHistory({ history }) {
  const W = 560, H = 190, L = 44, R = 16, T = 20, B = 28;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today); start.setDate(start.getDate() - 90);

  const pts = history.map(h => ({ ...h, t: day(h.date) }));
  const max = Math.max(...pts.map(p => p.price));
  const low = Math.min(...pts.map(p => p.price));
  const current = pts[pts.length - 1];
  const isLowest = current.price === low;

  const top = Math.ceil((max * 1.08) / 2500) * 2500;
  const x = t => L + ((Math.max(t, start) - start) / (today - start)) * (W - L - R);
  const y = v => T + (1 - v / top) * (H - T - B);

  let path = `M${x(pts[0].t)},${y(pts[0].price)}`;
  for (let i = 1; i < pts.length; i++) path += ` H${x(pts[i].t)} V${y(pts[i].price)}`;
  path += ` H${x(today)}`;
  const area = `${path} V${y(0)} H${x(pts[0].t)} Z`;

  const ticks = [0, top / 2, top];
  const months = [];
  for (let m = new Date(start.getFullYear(), start.getMonth() + 1, 1); m <= today; m.setMonth(m.getMonth() + 1)) {
    months.push(new Date(m));
  }

  const [hover, setHover] = useState(null);
  const svg = useRef(null);
  const priceAt = t => [...pts].reverse().find(p => p.t <= t)?.price ?? pts[0].price;

  const onMove = e => {
    const r = svg.current.getBoundingClientRect();
    const sx = ((e.clientX - r.left) / r.width) * W;
    const clamped = Math.min(Math.max(sx, x(pts[0].t)), x(today));
    const t = new Date(start.getTime() + ((clamped - L) / (W - L - R)) * (today - start));
    setHover({ sx: clamped, t, price: priceAt(t) });
  };

  const drops = pts.length - 1;

  return (
    <section className="ph" aria-labelledby="ph-title">
      <div className="ph__head">
        <h2 id="ph-title">Price history</h2>
        {isLowest && <span className="ph__tag">Lowest price in 90 days</span>}
      </div>
      <p className="ph__sum">
        {usd(pts[0].price)} on {fmtDate(history[0].date)} &rarr; {usd(current.price)} today,
        {' '}in {drops} {drops === 1 ? 'drop' : 'drops'}.
      </p>

      <div className="ph__chart">
        <svg ref={svg} viewBox={`0 0 ${W} ${H}`} role="img"
             aria-label={`Price over the last 90 days, from ${usd(pts[0].price)} to ${usd(current.price)}`}
             onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
          {ticks.map(v => (
            <g key={v} className="ph__grid">
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} />
              <text x={L - 8} y={y(v)} dy="0.32em" textAnchor="end">
                {v === 0 ? '$0' : '$' + (v / 1000) + 'k'}
              </text>
            </g>
          ))}
          {months.map(m => (
            <text key={m.getTime()} className="ph__month" x={x(m)} y={H - 8} textAnchor="middle">
              {m.toLocaleDateString('en-US', { month: 'short' })}
            </text>
          ))}

          <path className="ph__area" d={area} />
          <path className="ph__line" d={path} />

          {pts.map((pt, i) => (
            <circle key={i} className="ph__dot" cx={x(pt.t)} cy={y(pt.price)} r="4" />
          ))}
          <circle className="ph__now-ring" cx={x(today)} cy={y(current.price)} r="6" />

          <text className="ph__label" x={x(pts[0].t) + 6} y={y(pts[0].price) - 9}>{usd(pts[0].price)}</text>
          {/* under the line: above it, the previous step's end sits in the way */}
          <text className="ph__label ph__label--now" x={x(today)} y={y(current.price) + 22} textAnchor="end">
            Today {usd(current.price)}
          </text>

          {hover && (
            <g className="ph__cross">
              <line x1={hover.sx} x2={hover.sx} y1={T} y2={y(0)} />
              <circle cx={hover.sx} cy={y(hover.price)} r="5" />
            </g>
          )}
        </svg>

        {hover && (
          <div className="ph__tip"
               style={{ left: `${(hover.sx / W) * 100}%`, top: `${(y(hover.price) / H) * 100}%` }}>
            <span>{hover.t.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
            <strong>{usd(hover.price)}</strong>
          </div>
        )}
      </div>

      <table className="sr-only">
        <caption>Price changes</caption>
        <thead><tr><th scope="col">Date</th><th scope="col">Price</th></tr></thead>
        <tbody>
          {history.map(h => <tr key={h.date}><td>{fmtDate(h.date)}</td><td>{usd(h.price)}</td></tr>)}
        </tbody>
      </table>
    </section>
  );
}
