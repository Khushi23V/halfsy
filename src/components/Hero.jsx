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
        

                {/* Two passes of the same cards, so the row never runs out on
            either side while it slides. The second pass is decorative:
            hidden from AT and out of the tab order. */}
        <div className="hero__carousel">
          <div className="hero__track">
            {[...HERO_CARDS, ...HERO_CARDS, ...HERO_CARDS].map((card, i) => {
              // the middle pass is the real one; the outer two are decorative
              const dup = Math.floor(i / HERO_CARDS.length) !== 1;
              return (
                <a
                                  
                  key={i}
                  className="hero__card"
                  draggable={false}
                  href={card.href || 'https://www.halfsy.shop/'}
                  aria-hidden={dup || undefined}
                  tabIndex={dup ? -1 : undefined}
                >
                  <img src={card.src} alt="" />
                  {/* the link's accessible name - the image is alt="" */}
                  <span className="sr-only">
                    {card.brand} {card.name}, {card.now}
                  </span>
                  <span className="hero__arrow" aria-hidden="true">
                    <svg viewBox="0 0 12 12" fill="none">
                      <path d="M3 9L9 3M4 3h5v5" stroke="currentColor"
                        strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              );
            })}
          </div>
        </div>

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