import { TRIO } from '../data/assets.js';

/* The three-word section (under the opening, landing page only).

   Three large words run across the top with a search bar set into the
   gap before the last one, and a wide photograph under them. The tail
   of the "y" hangs over the top edge of the photograph - the words sit
   as close to the picture as their baseline allows, not as their
   tails would.

   The heading is one <h2> ("Luxury for less") but its last word is
   on the far side of the search bar. The bar is not part of the
   heading, so it cannot sit inside it: the heading is a subgrid over
   the row's three columns (first words | gap | last word) and the
   bar is its neighbour, placed in the middle column. See trio.css.

   THE SEARCH BAR does what the one in the nav does: it sends the
   words to the shop page, which reads ?q= and runs the search itself.

   The photograph is a model shot from a live listing, cropped to a
   band (TRIO.focus says which). It links to the retailer, with the
   arrow box every product picture on the site has.

   THE WORDS' FACE has two settings (trio.css, "faces"):
     sans  - Urbanist, sentence case
     serif - Cormorant capitals, like the other section headings
   TRIO.face in data/assets.js is the one the site uses. To look at
   the other without editing anything, add it to the address:
   /?words=serif or /?words=sans. */
const FACES = ['sans', 'serif'];

function wordsFace() {
  const asked = new URLSearchParams(window.location.search).get('words');
  if (FACES.includes(asked)) return asked;
  return FACES.includes(TRIO.face) ? TRIO.face : 'sans';
}

const widths = [1000, 1600, 2400];
const sized = (src, w) => src + (src.includes('?') ? '&' : '?') + 'width=' + w;

export default function Trio() {
  const p = TRIO.piece;
  const lead = TRIO.words.slice(0, -1);
  const last = TRIO.words[TRIO.words.length - 1];

  const search = e => {
    e.preventDefault();
    const q = e.currentTarget.elements.q.value.trim();
    window.location.href = '/shop' + (q ? '?q=' + encodeURIComponent(q) : '');
  };

  return (
    <section className={'beat trio trio--' + wordsFace()} id="beat-trio" aria-labelledby="trio-head"
             style={{ '--trio-focus': TRIO.focus, '--trio-focus-phone': TRIO.focusPhone || TRIO.focus }}>

      <div className="trio__top">
        <h2 className="trio__head" id="trio-head" aria-label={TRIO.words.join(' ')}>
          <span className="trio__lead" aria-hidden="true">
            {lead.map(w => <span className="trio__word" key={w}>{w}</span>)}
          </span>
          <span className="trio__last" aria-hidden="true">
            <span className="trio__word">{last}</span>
          </span>
        </h2>

        <form className="trio__search" role="search" onSubmit={search}>
          <svg className="trio__glass" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.2" />
            <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <label className="sr-only" htmlFor="trio-search">Search halfsy</label>
          <input id="trio-search" name="q" type="search" placeholder={TRIO.search} autoComplete="off" />
          <button className="trio__go" type="submit" aria-label="Search">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8h12M9.5 3.5L14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>

      <a className="trio__photo" href={p.href} target="_blank" rel="noopener noreferrer sponsored">
        <img src={sized(TRIO.image, 1600)}
             srcSet={widths.map(w => sized(TRIO.image, w) + ' ' + w + 'w').join(', ')}
             sizes="(max-width: 860px) 100vw, 92vw"
             alt={TRIO.alt} loading="lazy" draggable={false} />
        <span className="trio__arrow" aria-hidden="true">
          <svg viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.2"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="sr-only">
          {p.brand} {p.name}, {p.now}, was {p.was}. Shop on {p.retailer} (opens in a new tab)
        </span>
      </a>

    </section>
  );
}
