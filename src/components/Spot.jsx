import { SPOT } from '../data/assets.js';

/* BEAT 8. The spotlight - one category, in season.

   Half the screen is a single model photograph; the other half is a
   heading over four pieces from that category, each one a link to the
   retailer. Nothing else: no eyebrow, no copy, no panel. On desktop
   the whole section is exactly one screen under the nav (spot.css).

   Sits straight after Get the look and mirrors it - there the model
   is on the right, here she is on the left.

   Changing the category is a data change only: swap SPOT in
   data/assets.js (title, image, four pieces). */
export default function Spot() {
  return (
    <section className="beat spot" id="beat-spot" aria-labelledby="spot-head">
      <div className="spot__figure">
        <img className="spot__photo" src={SPOT.image} alt={SPOT.alt} draggable={false}
             style={{ objectPosition: SPOT.focus }} />
      </div>

      <div className="spot__body">
        <h2 className="spot__head" id="spot-head">{SPOT.title}</h2>

        <ul className="spot__grid">
          {SPOT.pieces.map(p => (
            <li key={p.id} className="spot__item">
              <a className="spot__card" href={p.href}
                 target="_blank" rel="noopener noreferrer sponsored">
                <span className="spot__media">
                  <img src={p.img} alt="" loading="lazy" draggable={false}
                       onError={e => e.currentTarget.parentElement.classList.add('is-broken')} />
                  <span className="spot__arrow" aria-hidden="true">
                    <svg viewBox="0 0 12 12" fill="none">
                      <path d="M3 9L9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.2"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
                <span className="spot__meta">
                  <span className="spot__brand">{p.brand}</span>
                  <span className="spot__name">{p.name}</span>
                  <span className="spot__price">
                    <span className="spot__now">{p.now}</span>
                    <span className="sr-only">, was </span>
                    <s>{p.was}</s>
                  </span>
                  <span className="sr-only">Shop on {p.retailer} (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
