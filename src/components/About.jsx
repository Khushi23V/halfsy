import { CIRCLE_COPY, STORY_IMAGE } from '../data/assets.js';

/* The about beat: the burgundy circle and the few lines inside it.

   It is the second half of the first opening (components/Hero.jsx)
   lifted out to stand on its own, so it can follow any section: a
   burgundy circle swells up from under the screen and fills it, the
   about text is set in it, then the image rises from below, rests
   over the text for a moment and opens to the full screen - which is
   exactly where the image section (Story.jsx) begins.

   Nothing here can be clicked, and the section overlaps the end of
   whatever comes before it (see about.css), so it lets every pointer
   event through.

   The words are CIRCLE_COPY and the image is STORY_IMAGE in
   data/assets.js - the same ones the first opening uses. */
export default function About() {
  return (
    <section className="beat about" id="beat-about" aria-label="About halfsy">
      <div className="stage about__stage">

        {/* grows from below the fold to cover the screen */}
        <div className="about__fill" aria-hidden="true" />

        <div className="about__copy">
          <p>{CIRCLE_COPY}</p>
        </div>

        {/* rises, rests over the text, then opens to full bleed */}
        <div className="about__media" aria-hidden="true">
          <img src={STORY_IMAGE} alt="" />
        </div>

      </div>
    </section>
  );
}
