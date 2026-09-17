import { BRANDS } from '../data/assets.js';

/* BEAT 6. */
export default function Brands() {
  return (
    <section className="beat brands" id="beat-brands">
      <div className="stage brands__stage">
        <div className="brands__field">
          {BRANDS.map((b, i) => (
            <div className="brands__logo" key={i}>
              <img src={b.src} alt={b.label} />
            </div>
          ))}
        </div>

        <div className="brands__veil" />

        <div className="brands__reveal">
          <h2>Forty-some retailers,<br />watched daily.</h2>
          <p>Every listing links straight to the original store.</p>
          <a className="btn" href="https://www.halfsy.shop/brands">Explore brands</a>
        </div>
      </div>
    </section>
  );
}
