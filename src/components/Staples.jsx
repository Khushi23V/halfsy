import { STAPLES } from '../data/assets.js';

/* BEAT 5b. Five FW26 trends, one per menu category, in one row. Each
   tile is a door into a category (Cigarette Jeans -> /shop/clothing/
   jeans), so the caption names the trend and the category, never a
   single product or price. Replaces The Edits on the homepage
   (Edits.jsx is kept, unmounted, for an /edits page later). */
export default function Staples() {
  return (
    <section className="beat staples" id="beat-staples">
      <header className="staples__intro">
        <p className="staples__eyebrow">Fall &rsquo;26 trends</p>
        <h2 className="staples__head">
          Five to fall for
        </h2>
      </header>

      <ol className="staples__row">
        {STAPLES.map((s, i) => (
          <li className="staple" key={s.id}>
            <a className="staple__link" href={s.href}>
              <span className={'staple__media'
                + (s.src ? '' : ' staple__media--empty')
                + (s.fit === 'contain' ? ' staple__media--contain' : '')}
                style={s.bg ? { background: s.bg } : undefined}>
                {s.src
                  ? <img src={s.src} alt="" draggable={false} />
                  : <span className="staple__soon" aria-hidden="true">Image to come</span>}
              </span>

              <span className="staple__meta">
                <span className="staple__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="staple__trend">{s.trend}</span>
                <span className="staple__cta">
                  Shop {s.category.toLowerCase()}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
