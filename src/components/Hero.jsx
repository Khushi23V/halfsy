import { HERO_CARDS, CIRCLE_COPY, STORY_IMAGE } from '../data/assets.js';

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
          /* The whole card is the link, not just the tag - a 150px
             hover target that only becomes clickable once something
             has appeared inside it is a bad target. This also gives
             keyboard focus for free, and the tag's text is the link's
             accessible name, which is why the image stays alt="". */
          <a
            key={i}
            className="hero__card"
            data-speed={card.speed}
            style={card.style}
            href={card.href || 'https://www.halfsy.shop/'}
          >
            <img src={card.src} alt="" />

            <span className="hero__tag">
              <span className="hero__tag-brand">{card.brand}</span>
              <span className="hero__tag-name">{card.name}</span>
              <span className="hero__tag-price">
                <span className="hero__tag-now">{card.now}</span>
                <span className="hero__tag-was">{card.was}</span>
              </span>
            </span>
          </a>
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
          <p>{CIRCLE_COPY}</p>
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