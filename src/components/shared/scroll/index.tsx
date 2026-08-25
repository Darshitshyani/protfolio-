import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { GlowWord } from "./WordTrack";

/**
 * Scroll-stage primitives — giant background type that drifts under the
 * content scrolling over it.
 *
 * ── HOW THE EFFECT WORKS ──────────────────────────────────────────────────
 * ScrollSmoother's `effects: true` reads `data-speed` off any element and
 * moves it at a multiple of the scroll rate. A value below 1 makes the
 * element lag the page, so as you scroll down it appears to drift downward
 * while normal-speed content rides up over it. No pinning, no ScrollTrigger
 * instance to clean up, and nothing to recalculate on resize — the whole
 * effect is one attribute plus correct stacking.
 *
 * Pinning would give a harder "held in place" version of this, but it forces
 * a fixed section height and fights the smoother's transform on route change;
 * the parallax read is the same and it degrades far more gracefully.
 *
 * ── LAYERING CONTRACT ─────────────────────────────────────────────────────
 * The backdrop is aria-hidden and pointer-events-none at z-0; the section must
 * be `relative` and clip with `overflow-hidden`, and real content must sit in
 * `relative z-10`. <ScrollStage> wires all of that up for you.
 *
 * Reduced motion / under 1025px: ScrollSmoother is not created at all, so
 * `data-speed` is inert. <GiantWord> therefore HIDES itself below 1025px
 * (`max-[1024px]:hidden`, the exact breakpoint SmoothScroll bails out at — not
 * `lg:`, whose min-width is 1024 and would overlap the disabled range by a
 * pixel). A static giant word does not read as a watermark at those widths:
 * that is precisely where every card grid collapses to one full-width opaque
 * column, so the word ends up entirely behind the stack and survives only as
 * grey fragments in the gutters, which reads as a rendering artifact. The
 * auroras and bands carry the richness on narrow screens instead. Under
 * reduced motion at >=1025px it does still render in place, which is the one
 * genuinely calm resting state.
 *
 * ── TONE (defined once, here) ─────────────────────────────────────────────
 * `text-black-200/45` on the span is THE tone for every word on the site. Do
 * not restate it at a call site. Two reasons:
 *  1. Cascade: tailwind.config.ts sets `important: true`, so a call-site
 *     `text-black-200/60` and this default are both !important at equal
 *     specificity — the winner is decided by Tailwind's emit order, not by
 *     the call site. An override here is a coin flip, not an override.
 *  2. Light-mode AA: black-200 (226 228 235) at 45% over the white page
 *     composites to rgb(242,243,246), and black-700 body copy (#626E8E) on
 *     that measures 4.57:1 — over the 4.5:1 floor. At /60 the composite is
 *     rgb(238,239,243) and the same copy lands at 4.41:1, which FAILS, and
 *     copy genuinely does overlap the word on several pages. Dark mode is
 *     comfortable either way (8.34:1 at /45).
 */

export interface GiantWordProps {
  /** The word. Short and uppercase reads best — WORK, APPS, STUDIO. */
  word: string;
  /**
   * Scroll rate multiplier. Below 1 lags the page (the effect you want);
   * 0.5–0.75 is the useful range. Lower than 0.4 drifts far enough to leave
   * the section.
   */
  speed?: number;
  /** Vertical placement within the section. */
  align?: "top" | "center" | "bottom";
  /**
   * Extra classes on the word itself. NOT for re-stating the tone — the
   * default below is the system tone and call sites must not override it (see
   * the note on the span).
   */
  className?: string;
}

/**
 * The oversized word itself. Sized in vw so it always spans the viewport
 * regardless of length, and clamped so a long word does not overflow on
 * mobile. `select-none` because it is decoration, not copy — and it is
 * aria-hidden so a screen reader never reads a stray "WORK".
 */
export const GiantWord = ({
  word,
  speed = 0.65,
  align = "center",
  className,
}: GiantWordProps) => {
  const alignClass =
    align === "top"
      ? "top-[6%]"
      : align === "bottom"
      ? "bottom-[6%]"
      : "top-1/2 -translate-y-1/2";

  // Rendering is delegated to <GlowWord> so a section watermark and a page-long
  // <PageWordTrack> are lit identically — one implementation, one tone. A flat
  // low-alpha grey glyph reads as dead weight; GlowWord stacks a blurred accent
  // bloom, a top-lit gradient fill and a hairline stroke instead.
  return (
    <div className={`absolute inset-x-0 ${alignClass} ${className ?? ""}`}>
      <GlowWord text={word} speed={speed} side="center" />
    </div>
  );
};

export interface ScrollStageProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "title"> {
  /** Backdrop word. Omit for a stage with no giant type. */
  word?: string;
  speed?: number;
  align?: GiantWordProps["align"];
  /** Colour token for the word, e.g. "text-black-200/50". */
  wordClassName?: string;
  /** Classes for the inner content column. */
  contentClassName?: string;
  children: React.ReactNode;
}

/**
 * A section with a giant drifting word behind its content.
 *
 *   <ScrollStage word="WORK" className="py-[120px]">
 *     …cards…
 *   </ScrollStage>
 *
 * `overflow-hidden` is mandatory here: the word is deliberately wider than the
 * viewport, and without clipping it would create horizontal page scroll.
 */
export const ScrollStage = ({
  word,
  speed,
  align,
  wordClassName,
  contentClassName,
  className,
  children,
  ...rest
}: ScrollStageProps) => (
  <section
    className={`relative w-full overflow-hidden ${className ?? ""}`}
    {...rest}
  >
    {word ? (
      <GiantWord
        word={word}
        speed={speed}
        align={align}
        className={wordClassName}
      />
    ) : null}
    <div className={`relative z-10 ${contentClassName ?? ""}`}>{children}</div>
  </section>
);

export interface ParallaxProps
  // Omit the DOM drag/animation handlers: motion redefines them with its own
  // signatures, and the plain React ones are structurally incompatible.
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    | "children"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onDragEnter"
    | "onDragExit"
    | "onDragLeave"
    | "onDragOver"
    | "onDrop"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "style"
  > {
  style?: React.CSSProperties;
  children: React.ReactNode;
  /**
   * Drift rate. <1 lags the page (the effect you want), >1 outruns it.
   * Keep content within 0.85–1.15; below ~0.5 the element visibly leaves its
   * own layout box.
   */
  speed?: number;
  /** Kept for call-site compatibility; treated as a gentle speed. */
  lag?: number;
}

/**
 * Scroll parallax, driven by `motion`'s useScroll.
 *
 * This used to emit `data-speed` for GSAP ScrollSmoother. The smoother has been
 * removed — the page scrolls natively now — so the drift is computed here from
 * the element's own progress through the viewport instead. motion is already in
 * the bundle for every entrance animation, so this costs no extra bytes, and
 * native scroll is untouched.
 *
 * Distance is proportional to the viewport, not a fixed pixel count, so the
 * effect reads the same on a laptop and a large display.
 *
 * STILL A SEPARATE ELEMENT from any motion entrance: this writes `y`, and a
 * FadeIn/SlideIn inside writes its own transform. Wrap, never merge.
 */
export const Parallax = ({
  children,
  speed = 1,
  lag,
  className,
  style,
  ...rest
}: ParallaxProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // A `lag` call site is just a soft speed.
  const rate = lag !== undefined ? 1 - lag : speed;
  const [travel, setTravel] = React.useState(0);
  React.useEffect(() => {
    const sync = () => setTravel(window.innerHeight * 0.5 * (1 - rate));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [rate]);

  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? style : { ...style, y }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/**
 * Convenience hook for callers that need to branch on whether the smoother is
 * actually running (reduced motion, or narrow viewport). Returns null during
 * SSR and the first client render so markup always matches.
 */
export const useSmootherActive = () => {
  const reduce = useReducedMotion();
  const [narrow, setNarrow] = React.useState<boolean | null>(null);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  if (narrow === null) return null;
  return !reduce && !narrow;
};
