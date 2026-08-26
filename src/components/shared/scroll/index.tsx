import * as React from "react";
import {
  cubicBezier,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
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

/**
 * The DOM props a motion-backed wrapper can safely accept. motion redefines the
 * drag/animation handlers with its own signatures and the plain React ones are
 * structurally incompatible, so they come off; `style` is re-declared as a
 * plain CSSProperties below because motion's own style type accepts
 * MotionValues that callers here never pass.
 */
type MotionDivPassThrough = Omit<
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
>;

export interface ParallaxProps extends MotionDivPassThrough {
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

/* ── Scroll-LINKED section choreography ───────────────────────────────────── */

/**
 * ⚠️ ONE TRANSFORM PER ELEMENT — read this before using anything below.
 *
 * `motion`, <Parallax>, <ScrollReveal>, <ScrollDrift>, <Tilt3D>, <HoverLift>,
 * <BorderBeam>'s hover lift and <Text3D> ALL write `transform` on the node they
 * are applied to. Two of them on ONE element means the later write silently
 * erases the earlier one: it compiles, it type-checks, it just stops animating.
 * There is no warning. Give every effect its own element and nest them:
 *
 *   <ScrollDrift from="left">        ← writes x
 *     <ScrollReveal scale={0.94}>    ← writes scale + y (+ opacity)
 *       <FadeIn>…</FadeIn>           ← writes its own entrance transform
 *     </ScrollReveal>
 *   </ScrollDrift>
 *
 * NEVER:  <FadeIn style={{ scale }} />   ·   <Parallax className="hover:-translate-y-1">
 *
 * ── WHY SCROLL-LINKED AND NOT `whileInView` ───────────────────────────────
 * An in-view entrance fires once and is over. These map the element's OWN
 * progress through the viewport onto the value, so the page keeps transforming
 * for as long as the visitor keeps moving — scroll up and it plays backwards.
 * That is the difference between a page that arrives and a page that responds.
 *
 * ── FULL-BLEED TINTS: VERTICAL MOTION ONLY ────────────────────────────────
 * `band-soft` (the mask behind <SoftBand>) feathers TOP AND BOTTOM ONLY —
 * globals.css says so explicitly. So a section carrying a <SoftBand> may be
 * moved on Y and faded freely (that is the feathered axis), but it must NOT be
 * scaled or drifted on X: either one insets the band from the viewport edge and
 * exposes exactly the hard vertical colour seam the feathering exists to
 * prevent. Scale/drift the section's INNER content instead, leaving the
 * <SoftBand> itself at rest.
 *
 * ── COST ──────────────────────────────────────────────────────────────────
 * Both primitives are transform/opacity only — never width/height/top/left —
 * and motion batches every scroll subscriber into one rAF pass, so a dozen of
 * these cost one measurement loop, not a dozen. Nothing runs off-screen: a
 * scroll listener that is not intersecting produces a clamped, unchanged value
 * and writes nothing to the DOM.
 */

/** House settle curve — the same shape as EASE in @/components/shared/motion. */
const SETTLE = cubicBezier(0.22, 1, 0.36, 1);

/**
 * Ease one value toward another across a 0-1 scroll progress.
 *
 * ── WHY THIS IS A TRANSFORMER FUNCTION AND NOT `useTransform(v, [0,1], [a,b])`
 * The output-range form of useTransform copies the scroll value's `accelerate`
 * descriptor onto its result — and when such a value is bound to a key motion
 * can hardware-accelerate (`opacity`, `filter`, `clipPath`, `transform`), the
 * visual element skips the JS subscription entirely and hands the keyframes to
 * a native ScrollTimeline animation ONCE, at bind time. The MotionValue is
 * reused across renders, so it is never re-bound — meaning any later change to
 * the range (here: switching the amplitudes on after mount, see the body of
 * <ScrollReveal>) would update the JS value while the DOM kept animating the
 * keyframes captured at mount. Opacity would silently never fade.
 *
 * Passing a transformer FUNCTION skips the accelerate branch by design, so the
 * value stays on motion's normal rAF-batched path and picks up the new
 * amplitudes on the render that changes them. The eased shape also survives,
 * which the accelerated path would only approximate.
 *
 * Progress is already clamped to 0-1 by useScroll; the clamp here is belt and
 * braces so a bezier is never asked to extrapolate.
 */
const settleTo = (progress: number, from: number, to: number) => {
  const p = progress < 0 ? 0 : progress > 1 ? 1 : progress;
  return from + (to - from) * SETTLE(p);
};

/**
 * True when `el` has not begun its pass yet — its top edge is still at or below
 * the fold, which is the `"start end"` edge both primitives measure from.
 *
 * Both of them start their amplitudes at rest and switch them on in an effect
 * (see <ScrollReveal>), and switching them on under an element that is ALREADY
 * part way through its pass would snap it — backwards into a dimmed, shrunken
 * state, or sideways by the full drift distance — one frame after hydration.
 * That is the jolt people describe as "the page glitched on load". An element
 * that is already on screen has nothing left to reveal, so it simply stays at
 * rest for the session: nobody can miss an animation that never started.
 *
 * Called from an effect only — never during render — so there is no window
 * access on the server and nothing for hydration to disagree about.
 */
const isBelowTheFold = (el: HTMLElement | null) =>
  !!el && el.getBoundingClientRect().top >= window.innerHeight * 0.98;

export interface ScrollRevealProps extends MotionDivPassThrough {
  style?: React.CSSProperties;
  children: React.ReactNode;
  /**
   * Scale as the element enters; settles to 1. Keep it at or BELOW 1 — a value
   * above 1 would overhang a full-bleed section's edges. 1 disables.
   * 0.88–0.92 is a strong arrival, 0.96–0.98 a whisper.
   */
  scale?: number;
  /** Vertical offset in px as it enters; settles to 0. Positive = rises. */
  y?: number;
  /**
   * Opacity as it enters; settles to 1. Clamped to a 0.25 floor on purpose:
   * this is the value the element sits at for as long as it is below the fold,
   * and a section that is merely dim degrades acceptably where one that is
   * invisible does not — if a scroll frame never arrives, 0 would mean blank
   * page. 1 disables the fade entirely (no opacity is written at all).
   */
  fade?: number;
}

/**
 * Scale / lift / fade driven by the element's own approach to the viewport.
 *
 *   <ScrollReveal className="w-full" scale={0.9} y={70} fade={0.35}>
 *     <ProjectWork />
 *   </ScrollReveal>
 *
 * ── THE RANGE, AND WHY IT IS THIS ONE ─────────────────────────────────────
 * offset `["start end", "start center"]`: progress 0 when the element's top
 * edge touches the bottom of the viewport, 1 when that same edge reaches the
 * middle. So the arrival always takes HALF A VIEWPORT of scrolling, whatever
 * the element's height — the "settles as it centres" read the brief asks for.
 *
 * `["start end", "end start"]` (what <Parallax> uses, correctly, for drift) is
 * wrong here: its span is height + viewport, so on a tall band the entrance
 * would still be finishing long after the section's top had left the screen.
 *
 * Progress is clamped by useScroll, and useTransform clamps by default, so an
 * element that never reaches the centre (bottom of a short page) simply holds
 * its last value rather than overshooting.
 *
 * Reduced motion: every amplitude stays at its rest value, so the element is
 * rendered and left exactly where the layout puts it. It is deliberately the
 * SAME element either way — see the note in the body for why forking it would
 * be worse than useless.
 */
export const ScrollReveal = ({
  children,
  scale = 1,
  y = 0,
  fade = 1,
  className,
  style,
  ...rest
}: ScrollRevealProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  // ── WHY THE AMPLITUDES ARE STATE AND NOT JUST THE PROPS ─────────────────
  // Everything below renders at REST until an effect has run, which makes the
  // server's HTML and the client's first render byte-identical. That is not
  // tidiness, it is the only safe shape here:
  //
  //  • useReducedMotion() is false on the server and already TRUE on a reduced-
  //    motion visitor's first client render. Forking the element tree (or the
  //    style prop) on it produces a hydration mismatch — and React 18 does not
  //    patch mismatched ATTRIBUTES, it only warns. The server's
  //    `opacity: 0.35` would therefore stick, permanently, for exactly the
  //    visitors who asked for less motion.
  //  • useScroll cannot measure during SSR either, so a server-rendered
  //    progress is always 0 — i.e. fully un-entered — for every section on the
  //    page, including ones that are above the fold.
  //
  // <Parallax> and <GlowWord> already deal with the same problem the same way
  // (their `travel` starts at 0); this is that pattern, extended to cover the
  // reduced-motion case as well. `isBelowTheFold` is the other half of it —
  // rest values are only worth switching away from for an element that has not
  // started its pass yet.
  const [live, setLive] = React.useState(false);
  React.useEffect(() => {
    if (reduce) return;
    if (!isBelowTheFold(ref.current)) return;
    setLive(true);
  }, [reduce]);

  // 0.25 floor: this is the opacity the section holds for the whole time it is
  // below the fold, so a 0 would mean any visitor whose scroll frames never
  // arrive gets blank bands. Dim degrades; blank does not.
  const fade0 = live ? Math.max(0.25, Math.min(1, fade)) : 1;
  const scale0 = live ? scale : 1;
  const y0 = live ? y : 0;

  const s = useTransform(scrollYProgress, (p) => settleTo(p, scale0, 1));
  const ty = useTransform(scrollYProgress, (p) => settleTo(p, y0, 0));
  const o = useTransform(scrollYProgress, (p) => settleTo(p, fade0, 1));

  return (
    <motion.div
      ref={ref}
      className={className}
      // Which KEYS are written is decided by the props alone — never by `live`
      // or `reduce` — so the set of style properties is identical on the server
      // and on every client render. It also means a ScrollReveal used purely
      // for lift never paints an opacity layer (and so never creates a
      // stacking context) for nothing.
      style={{
        ...style,
        ...(scale === 1 ? null : { scale: s }),
        ...(y === 0 ? null : { y: ty }),
        ...(fade >= 1 ? null : { opacity: o }),
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollDriftProps extends MotionDivPassThrough {
  style?: React.CSSProperties;
  children: React.ReactNode;
  /** Which side it comes in from. Alternate it between adjacent bands. */
  from?: "left" | "right";
  /**
   * Half the total lateral travel, in px at >=1280px wide, scaled down with the
   * viewport so a phone never gets a shove that pushes copy under the page's
   * clip. 18–28 is the useful range; past ~40 it reads as a layout bug.
   */
  distance?: number;
}

/**
 * Continuous LATERAL drift across the whole time the element is on screen — the
 * horizontal counterpart to <Parallax>. Adjacent bands set opposite `from`
 * values, which makes the page shear gently as it moves instead of sliding as
 * one rigid sheet.
 *
 *   <ScrollDrift className="w-full" from="right"><Techology /></ScrollDrift>
 *
 * Range is `["start end", "end start"]` — the full pass — because unlike an
 * arrival this is meant to still be moving while you read.
 *
 * Travel starts at 0 (state, not a measurement) so the server and the first
 * client render agree; the real distance lands in an effect. No window at
 * render time, ever. Under reduced motion the effect simply leaves it at 0,
 * which is also why there is no separate reduced branch to hydrate against.
 *
 * The host page must clip horizontally (the home page root is
 * `overflow-hidden`) or a drifting band widens the document.
 */
export const ScrollDrift = ({
  children,
  from = "left",
  distance = 24,
  className,
  style,
  ...rest
}: ScrollDriftProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Travel stays 0 until an effect sets it: no window at render time, the SSR
  // and hydration renders agree, and a reduced-motion visitor simply never
  // leaves 0 — no forked element tree, so no unpatchable attribute mismatch
  // (see the long note in <ScrollReveal>).
  const [travel, setTravel] = React.useState(0);
  React.useEffect(() => {
    if (reduce) return;
    if (!isBelowTheFold(ref.current)) return;
    const sync = () =>
      setTravel(distance * Math.min(1, window.innerWidth / 1280));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [distance, reduce]);

  // Linear on purpose — a drift that eases is a drift that looks like it is
  // catching on something. The output-range form is safe here (unlike the
  // opacity in <ScrollReveal>): `x` is not one of the keys motion hands to a
  // native scroll animation, so it stays on the JS path and picks up `travel`
  // on the render that sets it — exactly as <Parallax> above relies on.
  const sign = from === "left" ? -1 : 1;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [sign * travel, -sign * travel]
  );

  return (
    <motion.div ref={ref} className={className} style={{ ...style, x }} {...rest}>
      {children}
    </motion.div>
  );
};
