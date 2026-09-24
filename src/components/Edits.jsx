import { EDITS } from '../data/assets.js';

/* BEAT 5b. The edits sit between the product row and the polaroids,
   so the page reads shop -> read -> curate instead of two product
   rows back to back. Bone, like the products above it, so the maroon
   of the drops still lands as its own moment.

   Each tile is one link. The images are decorative (alt="") - the
   title is the link's name, and a screen reader hearing "The Wedding
   Guest, up to 60% under retail, 48 pieces, explore the edit" gets
   everything a sighted reader does. */
export default function Edits() {
  return (
    <section className="beat edits" id="beat-edits">
      <header className="edits__intro">
        <div>
          <h2 className="edits__head">THE EDITS</h2>
          <p className="edits__note">Dressed for the occasion. Priced for less.</p>
        </div>
        <a className="edits__all" href="/edits">Every edit</a>
      </header>

      <div className="edits__grid">
        {EDITS.map(e => (
          <a className={'edit edit--' + e.layout} href={`/edits/${e.id}`} key={e.id}>
            <span className="edit__media">
              {/* the frame is taller than the window it sits in, so the
                  drift has room to move without showing an edge */}
              <span className="edit__frame">
                <img className="edit__img" src={e.src} alt="" draggable={false} />
                {e.alt && (
                  <img className="edit__img edit__img--alt" src={e.alt} alt="" draggable={false} />
                )}
              </span>
            </span>

            <span className="edit__meta">
              <span className="edit__title script">{e.title}</span>
              <span className="edit__line">
                {e.line}<span aria-hidden="true"> &middot; </span>
                <span className="sr-only">, </span>{e.count} pieces
              </span>
              {e.intro && <span className="edit__intro">{e.intro}</span>}
              <span className="edit__cta">Explore the edit</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
