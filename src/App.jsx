import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, initScroll, destroyScroll } from './lib/scroll.js';
import { initReveal } from './lib/reveal.js';
import { initLoader } from './beats/loader.js';

import { initHero }     from './beats/hero.js';
import { initStory }    from './beats/story.js';
import { initProducts } from './beats/products.js';
import { initBrands }   from './beats/brands.js';
import { initFooter }   from './beats/footer.js';

import Loader   from './components/Loader.jsx';
import Nav      from './components/Nav.jsx';
import Hero     from './components/Hero.jsx';
import Story    from './components/Story.jsx';
import Products from './components/Products.jsx';
import Brands   from './components/Brands.jsx';
import Footer   from './components/Footer.jsx';

import { initLook }     from './beats/look.js';

import Look     from './components/Look.jsx';
import { initSpot }     from './beats/spot.js';
import Spot     from './components/Spot.jsx';
import { initCover }    from './beats/cover.js';
import Cover    from './components/Cover.jsx';
import { initBleed }    from './beats/bleed.js';
import Bleed    from './components/Bleed.jsx';
import { initTrio }     from './beats/trio.js';
import Trio     from './components/Trio.jsx';
import { initAbout }    from './beats/about.js';
import About    from './components/About.jsx';
import { initReviews }  from './beats/reviews.js';
import { initStaples }  from './beats/staples.js';
import Staples  from './components/Staples.jsx';
import Reviews  from './components/Reviews.jsx';


/* variant - which opening the page has:
     'bleed'   the full-screen photograph (Bleed), then the three-word
               section (Trio), the about circle (About) and the image
               section (Story)
     'cover'   the overlap headline (Cover)
     'classic' the first one (Hero, then Story)
   Everything from the product row down is the same page in all three.
   Chosen by the URL in main.jsx. */
export default function App({ variant = 'bleed' }) {
  const root = useRef(null);
  const classic = variant === 'classic';
  const cover = variant === 'cover';

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
        /* first: it owns the resize/font re-split that every other
           beat's line reveals depend on */
        initReveal(),
        /* second: it locks the scroll and holds the ready promise the
           hero's intro waits on, so it has to exist before the hero
           asks for it */
        initLoader(),
        /* the opening */
        ...(classic ? [initHero(), initStory()]
          : cover ? [initCover({ landing: true })]
          : [initBleed(), initTrio(), initAbout(), initStory()]),
        initProducts(),
        initStaples(),
        initReviews(),
        initLook(),
        initSpot(),
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
    /* "textured" = grain + soft light on the light sections (styles/paper.css);
       take the class off to go back to the flat background */
    <div ref={root} className={'textured' + (classic ? '' : cover ? ' landing-cover' : ' landing-bleed')}>
      <Loader />

      <a className="skip-link" href="#beat-products">Skip to the edit</a>

      <Nav />

      <main className="main">
        {classic ? <><Hero /><Story /></> : cover ? <Cover landing />
          : <>
              <Bleed />
              <Trio />     {/* the three-word section, on trial under the opening */}
              <About />    {/* the burgundy circle and the about text */}
              <Story />    {/* the image section */}
            </>}
        <Products />
        <Staples />
        <Look />
        <Spot />
        <Reviews />
        <Brands />
      </main>

      {/* sibling of main, not a child - see Footer.jsx */}
      <div className="footer__spacer" aria-hidden="true" />

      <Footer />
    </div>
  );
}
