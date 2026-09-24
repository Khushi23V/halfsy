import { DROPS } from '../data/assets.js';

/* BEAT 7. The Overnight Edition.

   The drops are printed as the front page of a morning paper lying
   on the maroon "table" - the night is the section, the paper is the
   morning. One lead story, three in the side column, each filed at
   the minute its price fell. The date and issue number are today's,
   so the paper is always this morning's.

   Every story is a link into the shop (a search on the brand) until
   the product info screen exists. */

const num = s => Number(String(s).replace(/[^0-9.]/g, '')) || 0;
const pct = d => Math.round((1 - num(d.now) / num(d.was)) * 100);

function dayOfYear(d) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - start) / 86400000);
}

const shopLink = d => '/shop?q=' + encodeURIComponent(d.brand);

function Price({ d }) {
  return (
    <span className="news__price">
      <s>{d.was}</s>
      <span className="sr-only">, now </span>
      <span className="news__now">{d.now}</span>
      <span className="news__pct">&minus;{pct(d)}%</span>
    </span>
  );
}

export default function Drops() {
  const today = new Date();
  const date = today.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  const [lead, ...rest] = DROPS;
  const last = DROPS[DROPS.length - 1];

  return (
    <section className="beat drops" id="beat-drops">


      <article className="paper" aria-labelledby="paper-title">
        <div className="paper__top">
          <span>Vol. I &middot; No. {dayOfYear(today)}</span>
          <time dateTime={today.toISOString().slice(0, 10)}>{date}</time>
        </div>

        <h2 className="paper__masthead" id="paper-title">
          The Overnight <span className="script">edition</span>
        </h2>

        <p className="paper__strap">
          <span>{DROPS.length} prices fell while you were asleep</span>
          <span>Last filed {last.time}</span>
        </p>

        <div className="paper__body">
          <a className="news news--lead" href={shopLink(lead)}>
            <span className="news__media">
              <img src={lead.src} alt="" draggable={false} />
            </span>
            <span className="news__text">
              <span className="news__kicker">Filed {lead.time} &middot; {lead.brand}</span>
              <h3 className="news__headline">{lead.headline}</h3>
              {lead.dek && <span className="news__dek">{lead.dek}</span>}
              <Price d={lead} />
            </span>
          </a>

          <div className="paper__column">
            {rest.map(d => (
              <a className="news" href={shopLink(d)} key={d.time}>
                <span className="news__media">
                  <img src={d.src} alt="" draggable={false} />
                </span>
                <span className="news__text">
                  <span className="news__kicker">{d.time} &middot; {d.brand}</span>
                  <h3 className="news__headline">{d.headline}</h3>
                  <Price d={d} />
                </span>
              </a>
            ))}
          </div>
        </div>

        <footer className="paper__foot">
          <a href="/shop?sort=discount">Shop</a>
        </footer>
      </article>
    </section>
  );
}
