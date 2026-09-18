import Logo from './Logo.jsx';

/* The intro. One job: hold the page until the fonts have landed, draw
   the wordmark while it waits, then lift and let the site through.

   aria-hidden with a live region would be the wrong call - a screen
   reader should not be made to sit through an animation. The overlay
   is hidden from the tree entirely and the page beneath is already
   readable, so assistive tech simply starts at the top of the page. */
export default function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__inner">
        <Logo className="loader__logo" />
      </div>
    </div>
  );
}
