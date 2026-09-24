import { useEffect, useRef, useState } from 'react';
import Logo from '../components/Logo.jsx';
import { MENU } from '../data/assets.js';
import { lockScroll, unlockScroll } from '../lib/scroll.js';

const slug = s => s.toLowerCase()
  .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(MENU[0].id);
  const btn = useRef(null);

  // lock the page, and let Esc close, only while open
  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = e => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { unlockScroll(); window.removeEventListener('keydown', onKey); };
  }, [open]);

  const toggle = () => {
    setActive(MENU[0].id);   // always opens on the first section
    setOpen(o => !o);
  };

  const section = MENU.find(s => s.id === active);

  return (
    <>
      <nav className={'nav' + (open ? ' is-open' : '')}>

        <div className="nav__gender">
          <button
            ref={btn}
            className="nav__menu"
            type="button"
            aria-label={open ? 'Close menu' : 'Menu'}
            aria-expanded={open}
            aria-controls="nav-panel"
            onClick={toggle}
          >
            <svg viewBox="0 0 22 14" fill="none" aria-hidden="true">
              <path d="M0 1h22"  stroke="currentColor" strokeWidth="1.2" />
              <path d="M0 7h22"  stroke="currentColor" strokeWidth="1.2" />
              <path d="M0 13h22" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
          <span className="nav__sep" aria-hidden="true">|</span>
          <a href="/women" className="is-active">Women</a>
          <span className="nav__sep" aria-hidden="true">|</span>
          <a href="/men">Men</a>
        </div>

        <a className="nav__logo" href="/" aria-label="halfsy home">
          <Logo />
        </a>

        <div className="nav__right">
          <a className="nav__shop" href="/shop">Shop</a>
          <a className="nav__shop nav__brands" href="/brands">Brands</a>
          <form
            className="nav__search"
            role="search"
            onSubmit={e => {
              e.preventDefault();
              const q = e.currentTarget.elements.q.value.trim();
              // the shop page reads ?q= and runs the search itself
              location.href = '/shop' + (q ? '?q=' + encodeURIComponent(q) : '');
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.2" />
              <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <label className="sr-only" htmlFor="nav-search">Search</label>
            <input id="nav-search" name="q" type="search" placeholder="Search" autoComplete="off" />
          </form>
        </div>

        {/* Hover previews a section; click goes to it. On touch there is
            no hover, so the first tap on a section just selects it. */}
        <div id="nav-panel" className="nav__panel" data-lenis-prevent>
          <ul className="nav__sections">
            {MENU.map(s => (
              <li key={s.id}>
                <a
                  href={s.href}
                  className={s.id === active ? 'is-active' : undefined}
                  aria-current={s.id === active ? 'true' : undefined}
                  onMouseEnter={() => setActive(s.id)}
                  onFocus={() => setActive(s.id)}
                  onClick={e => {
                    if (s.id !== active) { e.preventDefault(); setActive(s.id); }
                  }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {/* keyed by section, so each switch remounts and fades in */}
          <div className="nav__body" key={section.id}>
            <div className="nav__list">
              <h2 className="nav__list-head">{section.label}</h2>
              <ul>
                {section.items.map(item => (
                  <li key={item}>
                    <a href={item.startsWith('All ') ? section.href : `${section.href}/${slug(item)}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <a className="nav__feature" href={section.feature.href}>
              {/* `fit` / `bg` in MENU: a near-square shot (the bag) is set
                  whole on its own backdrop instead of cropped to the frame */}
              <span className="nav__feature-media"
                    style={section.feature.bg ? { background: section.feature.bg } : undefined}>
                <img src={section.feature.image} alt=""
                     style={section.feature.fit ? { objectFit: section.feature.fit } : undefined} />
              </span>
              <span className="nav__feature-label">{section.feature.label}</span>
            </a>
          </div>
        </div>
      </nav>

      {/* outside the nav on purpose: inside, it would paint over the
          nav bar's own background */}
      <div
        className={'nav-scrim' + (open ? ' is-open' : '')}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
    </>
  );
}