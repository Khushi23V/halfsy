import { REVIEWS } from '../data/assets.js';


export default function Reviews() {

  const POOL = 24;
  const rim = Array.from({ length: POOL }, (_, i) => ({
    r: REVIEWS[i % REVIEWS.length],
    dup: i >= REVIEWS.length
  }));

  return (
    <section className="beat reviews" id="beat-reviews">
      <header className="reviews__intro">
        <h2 className="reviews__head">
          Worth the watch
        </h2>
        <p className="reviews__note">What people found while they were not looking.</p>
      </header>

      <div className="reviews__stage">
        <div className="reviews__rim">
          {rim.map(({ r, dup }, i) => (
            <figure className="review" key={i} aria-hidden={dup ? 'true' : undefined}>
              <video
                className="review__video"
                src={r.video}
                poster={r.poster}
                muted
                playsInline
                loop
                /* metadata only - preloading every clip would cost
                   more than the rest of the page put together */
                preload="metadata"
              />

            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}