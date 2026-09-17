import { HERO_CARDS } from '../data/assets.js';

/* BEAT 1. Card geometry lives in data/assets.js so the markup stays
   readable and the positions are editable in one place. */
export default function Scatter() {
  return (
    <section className="beat scatter" id="beat-scatter">
      <div className="stage">
        <div className="grid-overlay" />

        {/* Twin of .circle__fill - lets beat 2's circle begin rising
            while beat 1 is still pinned, so there is no empty frame at
            the seam. End radius must match circle.js. */}
        <div className="scatter__circle" aria-hidden="true" />

        {HERO_CARDS.map((card, i) => (
          <div
            key={i}
            className="scatter__card"
            data-speed={card.speed}
            style={card.style}
          >
            <img src={card.src} alt="" />
          </div>
        ))}

        <div className="scatter__type">
          <h1 className="scatter__display">
            Luxury <span className="script">for</span> less.
          </h1>
          <a className="scatter__cta" href="https://www.halfsy.shop/">Shop the edit</a>
        </div>

        <p className="scatter__hint">Scroll</p>
      </div>
    </section>
  );
}
