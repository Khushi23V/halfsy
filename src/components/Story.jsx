import { STORY_IMAGE } from '../data/assets.js';

/* BEATS 3 + 4 in one section: they share a background, and splitting
   them would mean pinning the same image twice. */
export default function Story() {
  return (
    <section className="beat story" id="beat-story">
      <div className="stage story__stage">
        <div className="story__media">
          <img src={STORY_IMAGE} alt="" />
        </div>

        <div className="story__marquee">
          <span className="story__marquee-text"><em>Shirts</em></span>
          <span className="story__rule" />
          <span className="story__marquee-text"><em>Dresses</em></span>
          <span className="story__rule" />
          <span className="story__marquee-text"><em>Jackets</em></span>
          <span className="story__rule" />
          <span className="story__marquee-text">everything at the best price</span>
        </div>

        <div className="story__shop">
          <a className="btn btn--bone" href="https://www.halfsy.shop/">Shop</a>
        </div>
      </div>
    </section>
  );
}
