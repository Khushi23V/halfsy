import { BLEED } from '../data/assets.js';

/* Landing idea one: the full-screen photograph.

   One picture fills the first screen, edge to edge, and everything
   else sits on it in three corners:
     bottom left  - the headline, two lines
     bottom right - the button (and, beside it, what she is wearing
                    and what it costs today)
     top right    - a few small product pictures over a short note

   The photograph is a model shot from a live listing. A tall picture
   on a wide screen is always cropped to a band, so BLEED.focus says
   which band (a CSS object-position); BLEED.focusPhone does the same
   for an upright screen, where the crop is from the sides instead.

   The small pictures are real listings too and each one is a link to
   its retailer. Three is what the corner holds comfortably.

   This is the page's first screen, so the heading is its <h1>. The
   entrance and the nav's colour over the picture are in
   beats/bleed.js; the layout is styles/bleed.css. */
export default function Bleed() {
  const p = BLEED.piece;

  return (
    <section className="beat bleed" id="beat-bleed" aria-labelledby="bleed-head"
             style={{ '--bleed-focus': BLEED.focus, '--bleed-focus-phone': BLEED.focusPhone || BLEED.focus }}>

      <div className="bleed__media">
        <img src={BLEED.image} alt={BLEED.alt} draggable={false} />
      </div>

      <div className="bleed__inner">

        <div className="bleed__aside">
          <ul className="bleed__picks">
            {BLEED.picks.map(k => (
              <li key={k.id}>
                <a className="bleed__pick" href={k.href} target="_blank" rel="noopener noreferrer sponsored">
                  <img src={k.img} alt="" loading="eager" draggable={false} />
                  <span className="sr-only">
                    {k.brand} {k.name}, {k.now}, was {k.was} (opens in a new tab)
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="bleed__note">{BLEED.note}</p>
        </div>

        <h1 className="bleed__head" id="bleed-head" aria-label={BLEED.lines.join(' ')}>
          {BLEED.lines.map(line => (
            <span className="bleed__line" aria-hidden="true" key={line}>{line}</span>
          ))}
        </h1>

        <div className="bleed__foot">
          <a className="bleed__credit" href={p.href} target="_blank" rel="noopener noreferrer sponsored">
            <span className="bleed__brand">{p.brand}</span>
            <span className="bleed__name">{p.name}</span>
            <span className="bleed__price">
              <span className="bleed__now">{p.now}</span>
              <span className="sr-only">, was </span>
              <s>{p.was}</s>
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className="btn btn--bone bleed__cta" href={BLEED.cta.href}>{BLEED.cta.label}</a>
        </div>

      </div>
    </section>
  );
}
