import { useEffect, useMemo, useRef, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { MENU } from '../data/assets.js';
import { PRODUCTS_ALL, priceOf } from '../data/products.js';
import { PRODUCT_DETAILS } from '../data/productDetails.js';

/* ============================================================
   /shop - the listings page.

   Routes (all handled here, see main.jsx):
     /shop                          everything
     /shop/clothing                 a menu section
     /shop/clothing/jeans           a subcategory
   Everything else lives in the query string, so a filtered view can
   be shared or bookmarked:
     ?gender=women&off=50&max=1000&trust=high&brand=Etro&retailer=SSENSE&q=boots&sort=discount

   No scroll beats on this page on purpose: principle 4 in the
   direction doc - slow storytelling on the landing page, fast
   shopping here. Native scroll, no Lenis, no GSAP.
   ============================================================ */

const slug = s => s.toLowerCase()
  .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* the category tree comes straight from the mega menu, so the menu,
   the "Five to fall for" links and this sidebar can never disagree */
const SECTIONS = MENU.map(s => ({
  id: s.id,
  label: s.label,
  slug: s.href.split('/').pop(),
  subs: s.items
    .filter(i => !i.startsWith('All '))
    .map(label => ({ label, slug: slug(label) }))
}));

const GENDERS  = [['all', 'All'], ['women', 'Women'], ['men', 'Men']];
const DISCOUNT = [[0, 'Any'], [30, '30%+'], [40, '40%+'], [50, '50%+'], [60, '60%+']];
const MAXPRICE = [[0, 'Any'], [250, '$250'], [500, '$500'], [1000, '$1k'], [2500, '$2.5k']];
const TRUST    = [['all', 'All'], ['high', 'High'], ['good', 'Good']];
const SORTS    = [
  ['curated',    'Curated'],
  ['discount',   'Biggest saving'],
  ['price-asc',  'Price: low to high'],
  ['price-desc', 'Price: high to low']
];
const PAGE = 24;

const EMPTY = {
  section: null, sub: null, gender: 'all', off: 0, max: 0, trust: 'all',
  brands: [], retailers: [], q: '', sort: 'curated'
};

/* ---- URL <-> filter state ----------------------------------- */
function readURL() {
  const parts = location.pathname.replace(/\/+$/, '').split('/').slice(2);
  const sec = SECTIONS.find(s => s.slug === parts[0]);
  const sub = sec?.subs.find(x => x.slug === parts[1]);
  const q = new URLSearchParams(location.search);
  return {
    ...EMPTY,
    section:   sec?.id ?? null,
    sub:       sub?.slug ?? null,
    gender:    q.get('gender') || 'all',
    off:       Number(q.get('off')) || 0,
    max:       Number(q.get('max')) || 0,
    trust:     q.get('trust') || 'all',
    brands:    q.getAll('brand'),
    retailers: q.getAll('retailer'),
    q:         q.get('q') || '',
    sort:      q.get('sort') || 'curated'
  };
}

function toURL(f) {
  const sec = SECTIONS.find(s => s.id === f.section);
  const path = '/shop' + (sec ? '/' + sec.slug : '') + (sec && f.sub ? '/' + f.sub : '');
  const q = new URLSearchParams();
  if (f.gender !== 'all')   q.set('gender', f.gender);
  if (f.off)                q.set('off', f.off);
  if (f.max)                q.set('max', f.max);
  if (f.trust !== 'all')    q.set('trust', f.trust);
  f.brands.forEach(b => q.append('brand', b));
  f.retailers.forEach(r => q.append('retailer', r));
  if (f.q)                  q.set('q', f.q);
  if (f.sort !== 'curated') q.set('sort', f.sort);
  const qs = q.toString();
  return path + (qs ? '?' + qs : '');
}

/* ---- matching ------------------------------------------------
   `skip` leaves one facet out, which is how the brand and retailer
   counts are worked out: a count says "how many you would see if you
   ticked this", so it must ignore that facet's own ticks. */
function matches(p, f, skip) {
  if (f.section && p.section !== f.section) return false;
  if (f.section && f.sub && p.sub !== f.sub) return false;
  if (f.gender !== 'all' && p.gender !== f.gender) return false;
  if (f.off && p.off < f.off) return false;
  if (f.max && priceOf(p.now) > f.max) return false;
  if (f.trust !== 'all' && p.trust !== f.trust) return false;
  if (skip !== 'brand' && f.brands.length && !f.brands.includes(p.brand)) return false;
  if (skip !== 'retailer' && f.retailers.length && !f.retailers.includes(p.retailer)) return false;
  if (f.q) {
    const hay = `${p.brand} ${p.name} ${p.retailer}`.toLowerCase();
    if (!f.q.toLowerCase().split(/\s+/).every(w => hay.includes(w))) return false;
  }
  return true;
}

function facet(f, key, field) {
  const counts = new Map();
  PRODUCTS_ALL.forEach(p => {
    if (matches(p, f, key)) counts.set(p[field], (counts.get(p[field]) || 0) + 1);
  });
  // only values with results are listed - except ticked ones, which
  // stay (at 0) so an option never vanishes from under the cursor
  const picked = key === 'brand' ? f.brands : f.retailers;
  const all = [...new Set(PRODUCTS_ALL.map(p => p[field]))].sort((a, b) => a.localeCompare(b));
  return all
    .map(v => ({ value: v, count: counts.get(v) || 0 }))
    .filter(o => o.count > 0 || picked.includes(o.value));
}

function sortProducts(list, sort) {
  const out = [...list];
  if (sort === 'discount')   out.sort((a, b) => b.off - a.off);
  if (sort === 'price-asc')  out.sort((a, b) => priceOf(a.now) - priceOf(b.now));
  if (sort === 'price-desc') out.sort((a, b) => priceOf(b.now) - priceOf(a.now));
  return out;
}

/* ============================================================ */

export default function ShopPage() {
  const [f, setF] = useState(readURL);
  const [shown, setShown] = useState(PAGE);
  const [drawer, setDrawer] = useState(false);
  const [saved, setSaved] = useState(() => new Set());
  const spacer = useRef(null);

  /* keep the address bar in step. replaceState, not push: ticking
     five boxes should not cost five presses of Back. */
  useEffect(() => {
    const url = toURL(f);
    if (url !== location.pathname + location.search) history.replaceState(null, '', url);
    setShown(PAGE);
  }, [f]);

  useEffect(() => {
    const onPop = () => setF(readURL());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  /* page chrome: the nav is shown and grounded from the first frame
     (the landing page earns it with the loader; here there is none),
     and it steps aside when the fixed footer is uncovered, as it
     does on the landing page */
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

  // the drawer owns the screen on mobile; Esc closes it
  useEffect(() => {
    if (!drawer) return;
    document.documentElement.classList.add('is-locked');
    document.body.classList.add('is-drawer');
    const onKey = e => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('is-locked');
      document.body.classList.remove('is-drawer');
      window.removeEventListener('keydown', onKey);
    };
  }, [drawer]);

  const results = useMemo(
    () => sortProducts(PRODUCTS_ALL.filter(p => matches(p, f)), f.sort), [f]);
  const brands    = useMemo(() => facet(f, 'brand', 'brand'), [f]);
  const retailers = useMemo(() => facet(f, 'retailer', 'retailer'), [f]);

  const set = patch => setF(prev => ({ ...prev, ...patch }));
  const toggleIn = (key, v) => setF(prev => ({
    ...prev,
    [key]: prev[key].includes(v) ? prev[key].filter(x => x !== v) : [...prev[key], v]
  }));
  const toggleSave = id => setSaved(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const section = SECTIONS.find(s => s.id === f.section);
  const sub = section?.subs.find(s => s.slug === f.sub);
  const title = sub?.label || section?.label || 'The Shop';

  /* the removable chips above the grid - one per active choice */
  const chips = [
    f.gender !== 'all' && { label: GENDERS.find(g => g[0] === f.gender)[1], clear: () => set({ gender: 'all' }) },
    f.off   && { label: `${f.off}%+ off`, clear: () => set({ off: 0 }) },
    f.max   && { label: `Under ${MAXPRICE.find(m => m[0] === f.max)?.[1] || '$' + f.max}`, clear: () => set({ max: 0 }) },
    f.trust !== 'all' && { label: `${f.trust} trust`, clear: () => set({ trust: 'all' }) },
    ...f.retailers.map(r => ({ label: r, clear: () => toggleIn('retailers', r) })),
    ...f.brands.map(b => ({ label: b, clear: () => toggleIn('brands', b) })),
    f.q && { label: `“${f.q}”`, clear: () => set({ q: '' }) }
  ].filter(Boolean);

  const clearAll = () => setF(prev => ({ ...EMPTY, section: prev.section, sub: prev.sub, sort: prev.sort }));

  return (
    <>
      <Nav />

      <main className="shop" id="main">
        <header className="shop__head">
          <nav className="shop__crumbs" aria-label="Breadcrumb">
            <a href="/">Halfsy</a>
            <span aria-hidden="true">/</span>
            {section
              ? <button type="button" onClick={() => set({ section: null, sub: null })}>Shop</button>
              : <span aria-current="page">Shop</span>}
            {section && <span aria-hidden="true">/</span>}
            {section && (sub
              ? <button type="button" onClick={() => set({ sub: null })}>{section.label}</button>
              : <span aria-current="page">{section.label}</span>)}
            {sub && <span aria-hidden="true">/</span>}
            {sub && <span aria-current="page">{sub.label}</span>}
          </nav>

          <div className="shop__titlebar">
            <div>
              <h1 className="shop__title">{title}</h1>
              <p className="shop__count" aria-live="polite">
                {results.length} {results.length === 1 ? 'piece' : 'pieces'}, every one under retail
              </p>
            </div>

            <div className="shop__tools">
              <button type="button" className="shop__filter-btn" onClick={() => setDrawer(true)}
                      aria-expanded={drawer} aria-controls="shop-filters">
                Filters{chips.length ? ` (${chips.length})` : ''}
              </button>
              <label className="shop__sort">
                <span className="sr-only">Sort by</span>
                <select value={f.sort} onChange={e => set({ sort: e.target.value })}>
                  {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
            </div>
          </div>

          {chips.length > 0 && (
            <ul className="shop__chips" aria-label="Active filters">
              {chips.map((c, i) => (
                <li key={i}>
                  <button type="button" className="chip" onClick={c.clear}>
                    {c.label}<span aria-hidden="true">&times;</span>
                    <span className="sr-only"> (remove)</span>
                  </button>
                </li>
              ))}
              <li><button type="button" className="shop__clear" onClick={clearAll}>Clear all</button></li>
            </ul>
          )}
        </header>

        <div className="shop__layout">
          <Filters
            f={f} set={set} toggleIn={toggleIn}
            brands={brands} retailers={retailers}
            open={drawer} onClose={() => setDrawer(false)} total={results.length}
          />

          <section className="shop__results" aria-label={`${title} results`}>
            {results.length === 0 ? (
              <div className="shop__empty">
                <p>Nothing matches all of that yet.</p>
                <button type="button" className="btn" onClick={clearAll}>Clear filters</button>
              </div>
            ) : (
              <>
                <ul className="shop__grid">
                  {results.slice(0, shown).map(p => (
                    <li key={p.id}>
                      <Card p={p} saved={saved.has(p.id)} onSave={() => toggleSave(p.id)} />
                    </li>
                  ))}
                </ul>

                {shown < results.length && (
                  <div className="shop__more">
                    <p>Showing {shown} of {results.length}</p>
                    <button type="button" className="btn" onClick={() => setShown(n => n + PAGE)}>
                      Load more
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <div className="footer__spacer" ref={spacer} aria-hidden="true" />
      <Footer />
    </>
  );
}

/* ---- the card -------------------------------------------------
   One link for the whole card (image + text), plus the save button
   as a sibling - a button inside a link is invalid and unreachable
   by keyboard. The arrow box is the landing page's hero-card arrow:
   it rises from the bottom-right corner on hover. */
function Card({ p, saved, onSave }) {
  /* a piece with a product screen opens it (sizes, price history)
     before anyone is sent away; the rest still go straight to the
     retailer until the feed supplies their details */
  const own = PRODUCT_DETAILS[p.id];
  const link = own
    ? { href: `/p/${p.id}` }
    : { href: p.href, target: '_blank', rel: 'noopener noreferrer sponsored' };
  return (
    <article className="card">
      <a className="card__link" {...link}>
        <span className="card__media">
          <img src={p.img} alt="" loading="lazy" draggable={false}
               onError={e => e.currentTarget.parentElement.classList.add('is-broken')} />
          <span className="card__arrow" aria-hidden="true">
            <svg viewBox="0 0 12 12" fill="none">
              <path d="M3 9L9 3M4 3h5v5" stroke="currentColor"
                    strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>

        <span className="card__info">
          <span className="card__brand">{p.brand}</span>
          <span className="card__name">{p.name}</span>
          <span className="card__price">
            <span className="card__now">{p.now}</span>
            <span className="sr-only">, was </span>
            <span className="card__was">{p.was}</span>
            <span className="card__off">&minus;{p.off}%</span>
          </span>
          <span className="card__retailer">
            at {p.retailer}{p.region ? ` ${p.region}` : ''}
            {!own && <span className="sr-only"> (opens in a new tab)</span>}
          </span>
        </span>
      </a>

      <button type="button" className="card__save" aria-pressed={saved} onClick={onSave}
              aria-label={`${saved ? 'Remove' : 'Save'} ${p.brand} ${p.name}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20.3l-1.1-1C6 14.9 3 12.2 3 8.9 3 6.2 5.1 4.2 7.7 4.2c1.5 0 2.9.7 3.8 1.8h1c.9-1.1 2.3-1.8 3.8-1.8 2.6 0 4.7 2 4.7 4.7 0 3.3-3 6-7.9 10.4l-1.1 1z" />
        </svg>
      </button>
    </article>
  );
}

/* ---- the sidebar ------------------------------------------------
   Sticky on desktop, a drawer on mobile - the same markup either way.
   Urbanist throughout, per the brief. */
function Filters({ f, set, toggleIn, brands, retailers, open, onClose, total }) {
  const [brandQuery, setBrandQuery] = useState('');
  const [allBrands, setAllBrands] = useState(false);
  const [search, setSearch] = useState(f.q);

  useEffect(() => setSearch(f.q), [f.q]);

  const brandList = brands.filter(b => b.value.toLowerCase().includes(brandQuery.toLowerCase()));
  // ticked brands always stay visible, even past the fold
  const visibleBrands = allBrands || brandQuery
    ? brandList
    : brandList.filter((b, i) => i < 8 || f.brands.includes(b.value));

  return (
    <>
      <aside id="shop-filters" className={'shop__filters' + (open ? ' is-open' : '')}
             aria-label="Filters">
        <div className="filters__top">
          <h2>Filters</h2>
          <button type="button" className="filters__close" onClick={onClose} aria-label="Close filters">
            &times;
          </button>
        </div>

        <form className="filters__search" role="search"
              onSubmit={e => { e.preventDefault(); set({ q: search.trim() }); }}>
          <label className="sr-only" htmlFor="shop-q">Search brands or pieces</label>
          <input id="shop-q" type="search" placeholder="Search brands or pieces"
                 value={search} onChange={e => setSearch(e.target.value)}
                 onBlur={() => search.trim() !== f.q && set({ q: search.trim() })} />
        </form>

        <Group title="Category">
          <ul className="filters__cats">
            <li>
              <button type="button" className={!f.section ? 'is-active' : undefined}
                      aria-pressed={!f.section} onClick={() => set({ section: null, sub: null })}>
                Everything
              </button>
            </li>
            {SECTIONS.map(s => (
              <li key={s.id}>
                <button type="button" className={f.section === s.id ? 'is-active' : undefined}
                        aria-pressed={f.section === s.id}
                        onClick={() => set({ section: s.id, sub: null })}>
                  {s.label}
                </button>
                {f.section === s.id && (
                  <ul className="filters__subs">
                    {s.subs.map(x => (
                      <li key={x.slug}>
                        <button type="button" className={f.sub === x.slug ? 'is-active' : undefined}
                                aria-pressed={f.sub === x.slug}
                                onClick={() => set({ sub: f.sub === x.slug ? null : x.slug })}>
                          {x.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Group>

        <Group title="Gender">
          <Pills options={GENDERS} value={f.gender} onChange={v => set({ gender: v })} />
        </Group>

        <Group title="Saving">
          <Pills options={DISCOUNT} value={f.off} onChange={v => set({ off: v })} />
        </Group>

        <Group title="Max price">
          <Pills options={MAXPRICE} value={f.max} onChange={v => set({ max: v })} />
        </Group>

        <Group title="Retailer">
          <Checks items={retailers} picked={f.retailers} onToggle={v => toggleIn('retailers', v)} />
        </Group>

        <Group title="Brand">
          {brands.length > 8 && (
            <input className="filters__mini" type="search" placeholder="Find a brand"
                   aria-label="Find a brand" value={brandQuery}
                   onChange={e => setBrandQuery(e.target.value)} />
          )}
          <Checks items={visibleBrands} picked={f.brands} onToggle={v => toggleIn('brands', v)} />
          {!brandQuery && brandList.length > 8 && (
            <button type="button" className="filters__more" onClick={() => setAllBrands(a => !a)}>
              {allBrands ? 'Show fewer' : `Show all ${brandList.length}`}
            </button>
          )}
        </Group>

        <Group title="Retailer trust" defaultOpen={false}>
          <Pills options={TRUST} value={f.trust} onChange={v => set({ trust: v })} />
          <p className="filters__note">
            How confident we are in a retailer&rsquo;s authenticity, returns and delivery.
          </p>
        </Group>

        <div className="filters__apply">
          <button type="button" className="btn" onClick={onClose}>
            Show {total} {total === 1 ? 'piece' : 'pieces'}
          </button>
        </div>
      </aside>

      <div className={'shop__scrim' + (open ? ' is-open' : '')} aria-hidden="true" onClick={onClose} />
    </>
  );
}

function Group({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = 'fg-' + slug(title);
  return (
    <div className={'fgroup' + (open ? ' is-open' : '')}>
      <h3 className="fgroup__head">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(o => !o)}>
          {title}
          <span className="fgroup__icon" aria-hidden="true" />
        </button>
      </h3>
      <div className="fgroup__body" id={id} hidden={!open}>{children}</div>
    </div>
  );
}

function Pills({ options, value, onChange }) {
  return (
    <div className="pills">
      {options.map(([v, l]) => (
        <button key={v} type="button" className={'pill' + (value === v ? ' is-active' : '')}
                aria-pressed={value === v} onClick={() => onChange(v)}>
          {l}
        </button>
      ))}
    </div>
  );
}

function Checks({ items, picked, onToggle }) {
  return (
    <ul className="checks">
      {items.map(({ value, count }) => {
        const on = picked.includes(value);
        return (
          <li key={value}>
            <label className={'check' + (count === 0 && !on ? ' is-empty' : '')}>
              <input type="checkbox" checked={on} onChange={() => onToggle(value)} />
              <span className="check__box" aria-hidden="true" />
              <span className="check__label">{value}</span>
              <span className="check__count">{count}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
