import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Page-length word track — a sequence of giant words running the full height of
 * a page, each drifting at its own rate as you scroll from top to bottom.
 *
 * This is the multi-word version of <GiantWord>. Where GiantWord watermarks one
 * section, a track spans the whole page: words sit at even intervals down it,
 * alternate side to side, and each carries its own `data-speed` so they slide
 * past each other rather than moving as one slab.
 *
 * ── WHY IT LIVES INSIDE THE PAGE, NOT THE WRAPPER ─────────────────────────
 * ScrollSmoother only applies `data-speed` to elements inside #smooth-content.
 * <AmbientBackground/> is `fixed` and deliberately OUTSIDE the smoother, so a
 * word track cannot live there — it would never move. It mounts per page as an
 * absolutely-positioned layer inside the scrolling content instead.
 *
 * ── LIGHT ─────────────────────────────────────────────────────────────────
 * A flat low-alpha grey word reads as dead weight. Each word here is three
 * stacked layers:
 *   1. bloom  — the same text, heavily blurred, in the accent hue. This is the
 *               actual "light": it spills past the glyph edges and lifts the
 *               word off the page background.
 *   2. fill   — a vertical gradient clipped to the text, bright at the top edge
 *               and fading down, so the glyph looks lit from above instead of
 *               uniformly tinted.
 *   3. stroke — a hairline outline that keeps the shape legible where the
 *               gradient fades out to nothing.
 * `mix-blend-screen` on the bloom means it only ever ADDS light on dark — it
 * cannot darken the page — and it is dropped in light mode where screen-blend
 * over white would do nothing but wash the word out.
 *
 * ── CONTRAST ──────────────────────────────────────────────────────────────
 * Real copy scrolls over these. Total ink stays at or below the /45 tone that
 * <GiantWord> documents as the AA-safe ceiling for this site: the gradient
 * tops out at 0.30 alpha and the bloom is blurred so far that its contribution
 * to any single pixel under text is negligible. Do not raise these values
 * without re-checking body copy over the word in LIGHT mode, which is the
 * tighter of the two.
 */

export type TrackWord = {
  /** Short and uppercase reads best — 3-8 characters. */
  text: string;
  /** Scroll-rate multiplier. <1 lags the page. 0.5–0.85 is the useful range. */
  speed?: number;
  /** Horizontal bias, so consecutive words do not stack in a column. */
  side?: "left" | "center" | "right";
  /** Accent hue for the bloom. */
  tone?: "blue" | "green";
};

export interface PageWordTrackProps {
  words: TrackWord[];
  /**
   * Where the first and last word sit, as a percentage of page height. Insetting
   * keeps a word from colliding with the hero or the footer.
   */
  from?: number;
  to?: number;
  className?: string;
}

const BLOOM: Record<"blue" | "green", string> = {
  blue: "rgba(30,144,255,0.55)",
  green: "rgba(0,150,112,0.5)",
};

const SIDE_CLASS: Record<"left" | "center" | "right", string> = {
  left: "justify-start pl-[2vw]",
  center: "justify-center",
  right: "justify-end pr-[2vw]",
};

/** One lit word. Exported so a single section can use it without a full track. */
export const GlowWord = ({
  text,
  speed = 0.65,
  side = "center",
  tone = "blue",
  style,
}: TrackWord & { style?: React.CSSProperties }) => {
  // Scale from length so a longer word never outgrows the viewport.
  const vw = Math.min(20, Math.floor(150 / Math.max(text.length, 3)));
  const size = `clamp(3.5rem, ${vw}vw, 18rem)`;
  const shared: React.CSSProperties = {
    fontSize: size,
    lineHeight: 1,
  };

  // Drift is computed from the word's own progress through the viewport.
  // This previously emitted `data-speed` for GSAP ScrollSmoother; the smoother
  // is gone (the page scrolls natively now) so motion drives it instead — no
  // extra bundle cost, since motion is already here for every entrance.
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const [travel, setTravel] = React.useState(0);
  React.useEffect(() => {
    const sync = () => setTravel(window.innerHeight * 0.5 * (1 - speed));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [speed]);
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 flex ${SIDE_CLASS[side]}`}
      style={reduce ? style : { ...style, y }}
    >
      <span className="relative select-none whitespace-nowrap font-display font-bold uppercase tracking-tighter">
        {/* 1. bloom — the light itself. Screen-blend so it can only add. */}
        <span
          className="absolute inset-0 hidden dark:block"
          style={{
            ...shared,
            color: BLOOM[tone],
            filter: "blur(38px)",
            mixBlendMode: "screen",
          }}
        >
          {text}
        </span>
        {/* 2. fill — lit from above, fading downward. */}
        <span
          className="relative bg-clip-text text-transparent-main"
          style={{
            ...shared,
            backgroundImage:
              "linear-gradient(to bottom, rgb(var(--pp-neutral-400) / 0.30), rgb(var(--pp-neutral-400) / 0.04))",
            WebkitBackgroundClip: "text",
          }}
        >
          {text}
        </span>
        {/* 3. stroke — holds the shape where the gradient fades out. */}
        <span
          className="absolute inset-0"
          style={{
            ...shared,
            color: "transparent",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "rgb(var(--pp-neutral-400) / 0.18)",
          }}
        >
          {text}
        </span>
      </span>
    </motion.div>
  );
};

/**
 * The full-page track. Drop it as the FIRST child of a page's outermost
 * container, which must be `relative` and `overflow-hidden` — the words are
 * wider than the viewport and would otherwise create horizontal page scroll.
 *
 *   <div className="relative isolate overflow-hidden">
 *     <PageWordTrack words={[{ text: "DESIGN" }, { text: "BUILD" }, …]} />
 *     …sections…
 *   </div>
 *
 * `isolate` is load-bearing: it makes the host a stacking context, so the
 * track's negative z-index lands above the host's own background and below its
 * content. Without it the track can fall behind an ancestor background and
 * disappear entirely.
 */
export const PageWordTrack = ({
  words,
  from = 12,
  to = 88,
  className,
}: PageWordTrackProps) => {
  if (!words.length) return null;
  const span = to - from;
  const step = words.length > 1 ? span / (words.length - 1) : 0;

  return (
    <div
      aria-hidden="true"
      // -z-10, not z-0: a POSITIONED element with z-index 0 paints above
      // non-positioned in-flow siblings, so at z-0 the track would cover any
      // section that is not itself `relative`. A negative index drops it below
      // all content — and the host's `isolate` (see the usage note above) keeps
      // it from falling behind an ancestor background instead.
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${
        className ?? ""
      }`}
    >
      {words.map((word, i) => (
        <GlowWord
          key={`${word.text}-${i}`}
          {...word}
          // Alternate sides unless the caller pinned one, so consecutive words
          // do not line up in a single column down the middle.
          side={word.side ?? (i % 2 === 0 ? "left" : "right")}
          // Vary the rate slightly per word so they slide past one another
          // instead of travelling as a single rigid sheet.
          speed={word.speed ?? 0.55 + (i % 3) * 0.09}
          style={{ top: `${from + step * i}%` }}
        />
      ))}
    </div>
  );
};

export default PageWordTrack;
