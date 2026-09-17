import { DROPS } from '../data/assets.js';

/* BEAT 7. Four polaroids, pinned to the page at slightly wrong angles.
   The timestamps are the argument - a price that moved at 02:41 is a
   price nobody announced - so they sit in the caption like a date
   scrawled on the border, not in a table column. */
export default function Drops() {
  return (
    <section className="beat drops" id="beat-drops">
      <header className="drops__head">
        <p className="drops__eyebrow">Since midnight</p>
        <h2>While you slept,<br />four pieces came down.</h2>
        <p className="drops__note">None of them announced it.</p>
      </header>

      <div className="drops__row">
        {DROPS.map((d, i) => (
          <figure className="pick" key={i}>
            <div className="pick__frame">
              <img src={d.src} alt={`${d.brand} ${d.piece}`} />
            </div>

            <figcaption className="pick__meta">
              <span className="pick__time">{d.time}</span>
              <h3 className="pick__brand">{d.brand}</h3>
              <p className="pick__piece">{d.piece}</p>
              <p className="pick__price">
                <span className="pick__was">{d.was}</span>
                <span className="pick__now">{d.now}</span>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}