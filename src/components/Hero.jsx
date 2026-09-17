import { HERO_CARDS, CIRCLE_COPY, STORY_IMAGE } from '../data/assets.js';

/* Character spans for the typewriter. Spaces stay as bare text and the
   spans stay `inline` - inline-block makes every glyph its own box and
   words break mid-word when the line wraps. Only opacity animates. */
function Chars({ text }) {
  return (
    <>
      {[...text].map((ch, i) =>
        ch === ' ' ? ' ' : <span className="hero__char" key={i}>{ch}</span>
      )}
    </>
  );
}

/* BEATS 1 + 2, one section.

   They used to be two pinned sections that overlapped by a viewport,
   which is why the circle needed a twin in the scatter, why 26% had to
   match across two files, and why this copy was visible over the hero
   before its own beat began. One section, one timeline, no seam. */
export default function Hero() {
  return (
    <section className="beat hero" id="beat-hero">
      <div className="stage">
        <div className="grid-overlay" />

        {HERO_CARDS.map((card, i) => (
          <div key={i} className="hero__card" data-speed={card.speed} style={card.style}>
            <img src={card.src} alt="" />
          </div>
        ))}

        <div className="hero__type">
          <h1 className="hero__display">
            Luxury <span className="script">for</span> less.
          </h1>
        </div>

        <p className="hero__hint">Scroll</p>

        {/* grows from below the fold to cover the screen */}
        <div className="hero__fill" aria-hidden="true" />

        {/* One paragraph, not a heading plus a sub. A single block of
            Cormorant at one size reads as a held thought; a heading
            and a body would read as two. */}
        <div className="hero__copy">
          <p aria-label={CIRCLE_COPY}>
            <span aria-hidden="true"><Chars text={CIRCLE_COPY} /></span>
          </p>
        </div>

        {/* rises from below, parks over the copy, then opens to full
            bleed - and beat 3 starts from full bleed, so that seam is
            two identical full-screen images and cannot show */}
        <div className="hero__media" aria-hidden="true">
          <img src={STORY_IMAGE} alt="" />
        </div>
      </div>
    </section>
  );
}
