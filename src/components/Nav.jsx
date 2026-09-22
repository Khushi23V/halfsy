import Logo from '../components/Logo.jsx';

export default function Nav() {
  return (
    <nav className="nav">

      <div className="nav__gender">
        <a href="/women" className="is-active">Women</a>
        <span className="nav__sep" aria-hidden="true">|</span>
        <a href="/men">Men</a>
      </div>

      <a className="nav__logo" href="/" aria-label="halfsy home">
        <Logo />
      </a>

      <form
        className="nav__search"
        role="search"
        onSubmit={e => { e.preventDefault(); /* wire to /search?q= later */ }}
      >
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.2" />
          <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <label className="sr-only" htmlFor="nav-search">Search</label>
        <input id="nav-search" type="search" placeholder="Search" autoComplete="off" />
      </form>

    </nav>
  );
}