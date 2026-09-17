import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, initScroll, destroyScroll } from './lib/scroll.js';

import { initScatter }  from './beats/scatter.js';
import { initCircle }   from './beats/circle.js';
import { initStory }    from './beats/story.js';
import { initProducts } from './beats/products.js';
import { initBrands }   from './beats/brands.js';
import { initFooter }   from './beats/footer.js';

import Nav      from './components/Nav.jsx';
import Scatter  from './components/Scatter.jsx';
import Circle   from './components/Circle.jsx';
import Story    from './components/Story.jsx';
import Products from './components/Products.jsx';
import Brands   from './components/Brands.jsx';
import Footer   from './components/Footer.jsx';

export default function App() {
  const root = useRef(null);

  /* useLayoutEffect, not useEffect: the beats measure geometry
     (offsetTop, offsetHeight, scrollWidth) and pin against it. Running
     after paint means one frame where the page is laid out but nothing
     is pinned, which shows as a visible jump on load. */
  useLayoutEffect(() => {
    initScroll();

    /* Everything GSAP creates inside this callback is recorded by the
       context, and ctx.revert() destroys all of it - tweens,
       ScrollTriggers, pin-spacers, and any inline styles they wrote.
       That is what makes StrictMode's double mount harmless: the first
       mount's triggers are torn down before the second builds its own.
       Without it you get two sets of pin-spacers and a page twice the
       height it should be. */
    const ctx = gsap.context(() => {
      const cleanups = [
        initScatter(),
        initCircle(),
        initStory(),
        initProducts(),
        initBrands(),
        initFooter()
      ].filter(Boolean);

      // plain DOM listeners the context cannot collect on its own
      return () => cleanups.forEach(fn => fn());
    }, root);

    /* Images decode after first paint and change the page height. Pin
       distances measured before that are wrong, and every beat lands
       early. This is not optional now that the cards have no fixed
       height - their travel distance is read from offsetHeight. */
    let cancelled = false;
    const pending = Array.from(document.images).filter(img => !img.complete);
    Promise.all(
      pending.map(img => new Promise(res => {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
      }))
    ).then(() => { if (!cancelled) ScrollTrigger.refresh(); });

    document.documentElement.classList.add('is-ready');

    return () => {
      cancelled = true;
      ctx.revert();
      destroyScroll();
      document.documentElement.classList.remove('is-ready');
      document.body.classList.remove('is-inverted');
    };
  }, []);

  return (
    <div ref={root}>
      <a className="skip-link" href="#beat-products">Skip to the edit</a>

      <Nav />

      <main className="main">
        <Scatter />
        <Circle />
        <Story />
        <Products />
        <Brands />
      </main>

      {/* sibling of main, not a child - see Footer.jsx */}
      <div className="footer__spacer" aria-hidden="true" />

      <Footer />
    </div>
  );
}
