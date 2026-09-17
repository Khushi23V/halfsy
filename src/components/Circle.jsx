import { CIRCLE_HEADING, CIRCLE_BODY, STORY_IMAGE } from '../data/assets.js';

/* Split a string into character spans for the typewriter.

   Spaces stay as bare text, not spans, and the spans stay `inline`
   rather than inline-block - otherwise the browser treats each glyph
   as its own box and words break mid-word when the line wraps. Only
   opacity is animated, so inline is all that's needed. */
function Chars({ text }) {
  return (
    <>
      {[...text].map((ch, i) =>
        ch === ' '
          ? ' '
          : <span className="circle__char" key={i}>{ch}</span>
      )}
    </>
  );
}

/* BEAT 2. The spans are rendered here rather than split out of the DOM
   by circle.js. Under React that subtree belongs to the renderer;
   rewriting it by hand works until the day something above it
   re-renders, and then it breaks in a way that is hard to trace. */
export default function Circle() {
  return (
    <section className="beat circle" id="beat-circle">
      <div className="stage">
                <div className="circle__fill" />

        {/* Twin of .story__media. Beat 3 can't paint while beat 2 is
            pinned, so the window opens here and the real one continues
            from the same clip. Geometry must match exactly. */}
        <div className="circle__media" aria-hidden="true">
          <img src={STORY_IMAGE} alt="" />
        </div>
        <div className="circle__copy">
          {/* full sentence for screen readers; the spans are hidden
              from them so the copy isn't announced letter by letter */}
          <h2 aria-label={CIRCLE_HEADING.join(' ')}>
            <span aria-hidden="true">
              <Chars text={CIRCLE_HEADING[0]} />
              <br />
              <Chars text={CIRCLE_HEADING[1]} />
            </span>
          </h2>
          <p aria-label={CIRCLE_BODY}>
            <span aria-hidden="true"><Chars text={CIRCLE_BODY} /></span>
          </p>
        </div>
      </div>
    </section>
  );
}
