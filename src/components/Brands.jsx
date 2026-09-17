import { BRANDS } from '../data/assets.js';

/* BEAT 6. Rows of 4-3-4-3-4, each row wider than the viewport so the
   field reads as a fragment of something much larger rather than a
   tidy grid that happens to fit. There are only twelve marks, so they
   cycle - which is fine visually, and why only the first appearance of
   each carries alt text. Eighteen announcements of twelve brands would
   be worse than none. */
const PATTERN = [4, 3, 4, 3, 4];

function buildRows() {
  const rows = [];
  const seen = new Set();
  let i = 0;
  for (const count of PATTERN) {
    const row = [];
    for (let k = 0; k < count; k++) {
      const brand = BRANDS[i % BRANDS.length];
      row.push({ ...brand, first: !seen.has(brand.src) });
      seen.add(brand.src);
      i++;
    }
    rows.push(row);
  }
  return rows;
}

export default function Brands() {
  const rows = buildRows();

  return (
    <section className="beat brands" id="beat-brands">
      <div className="stage brands__stage">
        <div className="brands__field">
          {rows.map((row, ri) => (
            <div className={'brands__row brands__row--' + row.length} key={ri}>
              {row.map((b, ci) => (
                <div className="brands__logo" key={ci}>
                  <img
                    src={b.src}
                    alt={b.first ? b.label : ''}
                    aria-hidden={b.first ? undefined : 'true'}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="brands__veil" />

        <div className="brands__reveal">
          <h2>BROWSE THROUGH<br />HUNDREDS OF BRANDS</h2>
          <p>Every listing links straight to the original store.</p>
          <a className="btn" href="https://www.halfsy.shop/brands">Explore brands</a>
        </div>
      </div>
    </section>
  );
}
