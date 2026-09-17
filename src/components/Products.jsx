import { PRODUCTS } from '../data/assets.js';

/* BEAT 5. When these come from the shop API, this is the component
   that gains state - and the one place you must call
   ScrollTrigger.refresh() after the data resolves, or every beat
   below it will be measured against the wrong page height. */
export default function Products() {
  return (
    <section className="beat products" id="beat-products">
      <h2 className="products__head">
        Prices <span className="script">for</span> you
      </h2>

      <div className="products__row">
        {PRODUCTS.map((p, i) => (
          <article className="product" key={i}>
            <div className="product__media"><img src={p.src} alt="" /></div>
            <h3 className="product__name">{p.name}</h3>
            <p className="product__price">
              <span className="product__now">{p.now}</span>
              <span className="product__was">{p.was}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
