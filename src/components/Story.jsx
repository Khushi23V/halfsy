import { STORY_IMAGE, MARQUEE } from '../data/assets.js';

/* BEATS 3 + 4. The image starts full bleed, exactly where the hero
   left it, so that seam is two identical full-screen images and there
   is nothing to match up.

   SHOP rides inside the marquee rather than sitting in its own layer:
   it is the end of the sentence, so it should arrive with the line
   rather than as a separate event. */
export default function Story() {
  const label = MARQUEE.map(m => m.text).join(' ');

  return (
    <section className="beat story" id="beat-story">
      <div className="stage story__stage">
        <div className="story__media">
          <img src={STORY_IMAGE} alt="" />
        </div>

        <div className="story__marquee" aria-label={label}>
          {MARQUEE.map((item, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={'story__word story__word--' + item.style}
            >
              {item.text}
            </span>
          ))}

          <span className="story__arrow" aria-hidden="true" />

          <a className="story__shop btn btn--bone" href="https://www.halfsy.shop/">
            Shop
          </a>
        </div>
      </div>
    </section>
  );
}
