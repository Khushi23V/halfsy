/* BEAT 7. The footer never moves - it is fixed at a lower z-index and
   the opaque page scrolls up off it. The spacer is a sibling of
   <main>, NOT a child: inside main it sits under main's opaque bone
   background and the footer never shows. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__body">
        <div className="footer__col footer__col--social">
          <h3>Follow</h3>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">Pinterest</a>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h3>Shop</h3>
            <a href="#">Womenswear</a>
            <a href="#">Menswear</a>
            <a href="#">Accessories</a>
          </div>
          <div className="footer__col">
            <h3>About</h3>
            <a href="#">How it works</a>
            <a href="#">Retailers</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>

      <div className="footer__legal">
        <span>&copy; 2026 Halfsy</span>
        <span>All product listings redirect to their original retailers.</span>
      </div>
    </footer>
  );
}
