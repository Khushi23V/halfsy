import { ScrollTrigger, prefersReducedMotion } from '../lib/scroll.js';
import { revealOnScroll } from '../lib/reveal.js';

/* BEAT 9 - the footer never moves. It sits fixed at a lower z-index
   and the opaque page scrolls up off it. The spacer between </main>
   and <footer> is what gives it room to be uncovered. */
export function initFooter() {
  if (prefersReducedMotion) return;
  const footer = document.querySelector('.footer');
  const spacer = document.querySelector('.footer__spacer');
  if (!footer || !spacer) return;

  const sync = () => { spacer.style.height = footer.offsetHeight + 'px'; };
  sync();
  window.addEventListener('resize', sync);

  /* The footer is uncovered rather than scrolled to, so its own
     position never changes - a trigger on the footer would never
     fire. The SPACER is what moves, so that is what drives both the
     nav and the text reveal. */
  revealOnScroll('.footer__col h3, .footer__legal span',
    { trigger: spacer, start: 'top 55%', stagger: 0.06,
      groupStagger: 0.05, duration: 0.85 });

  /* The nav steps aside. The wordmark artwork carries the brand here,
     so a second logo pinned over it is one too many. */
  ScrollTrigger.create({
    trigger: spacer,
    start: 'top 75%',
    end: 'bottom top',
    onToggle: self =>
      document.body.classList.toggle('is-footer', self.isActive)
  });

  return () => {
    window.removeEventListener('resize', sync);
    document.body.classList.remove('is-footer');
    document.body.classList.remove('is-glass');
  };
}
