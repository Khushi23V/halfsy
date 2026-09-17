import Logo from './Logo.jsx';

/* Persistent. The story page is the front door, so SHOP has to be
   reachable from every beat - this never unmounts. The colour flip is
   driven by a class on <body>, set from invertNavDuring in scroll.js,
   deliberately outside React: it changes many times a scroll and has
   no business causing re-renders. */
export default function Nav() {
  return (
    <nav className="nav">
      <a className="nav__logo" href="/" aria-label="halfsy home">
        <Logo />
      </a>

      <div className="nav__links">
        <a href="#beat-products">Shop</a>
        <a href="#beat-brands">Brands</a>
        <a className="nav__cta" href="https://www.halfsy.shop/">Start browsing</a>
      </div>
    </nav>
  );
}
