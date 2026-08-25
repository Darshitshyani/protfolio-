/**
 * Shared motion primitives — PIMW marketing surfaces.
 *
 * Import from "motion/react" (package `motion` v12). NEVER from "framer-motion":
 * it is only present as a transitive dependency and is not a declared dep here.
 * Pages Router — there is deliberately no "use client" directive in this file.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * REDUCED-MOTION CONTRACT (every export below obeys it)
 * ────────────────────────────────────────────────────────────────────────────
 * Each primitive calls `useReducedMotion()`. When the visitor has
 * `prefers-reduced-motion: reduce` set, the primitive degrades to a no-op: the
 * element mounts directly in its final, visible state — no opacity ramp, no
 * transform, no timing — and no interval / rAF / CSS loop is ever started.
 *
 * Why the reduced branch passes `initial={false}` *together with* an explicit
 * final `animate` target: on the server `useReducedMotion()` cannot know the
 * visitor's preference, so the SSR HTML is always written with the hidden start
 * styles (e.g. `opacity: 0`). React does not patch attribute mismatches during
 * hydration, so simply dropping the animation would leave a reduced-motion
 * visitor staring at permanently invisible content. `initial={false}` + the
 * final target makes motion write the finished values to the DOM imperatively
 * on mount, repairing the server styles without ever running a transition.
 *
 * House rules baked in:
 *  - transform + opacity only (no width / height / top / left animation)
 *  - one shared easing curve (EASE) and one shared spring (SPRING)
 *  - `...rest` is spread on every primitive so callers can pass id / aria-* / style
 *  - nothing here measures the DOM during render, so all of it is SSR-safe
 *
 * NOTE ON REFS: these are plain function components, not forwardRef. If you need
 * a scroll target, put the `id` on the primitive (it spreads) or wrap it.
 */

import * as React from "react";
import {
  animate,
  motion,
  useInView,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";

/* ── shared tokens ────────────────────────────────────────────────────────── */

/** House easing curve. Used by every timed transition in this file. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** House spring. Used for hover / press feedback. */
export const SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 26,
  mass: 0.6,
} as const;

/** How much of the element must be visible before an in-view animation fires. */
export type ViewportAmount = "some" | "all" | number;

/** Tiny classname joiner (no clsx / tailwind-merge in this project). */
export const cx = (
  ...classes: Array<string | false | null | undefined>
): string => classes.filter(Boolean).join(" ");

type MotionDivProps = HTMLMotionProps<"div">;

type BaseMotionProps = Omit<
  MotionDivProps,
  "initial" | "animate" | "whileInView" | "viewport" | "transition" | "variants"
>;

export interface InViewProps extends BaseMotionProps {
  children?: React.ReactNode;
  className?: string;
  /** Seconds to wait before the entrance starts. */
  delay?: number;
  /** Entrance length in seconds. */
  duration?: number;
  /** Animate only the first time it enters the viewport. */
  once?: boolean;
  /** Visible fraction that triggers the entrance. */
  amount?: ViewportAmount;
}

/* ── FadeIn ───────────────────────────────────────────────────────────────── */

export interface FadeInProps extends InViewProps {
  /** Pixels of travel on the Y axis. Set 0 for a pure cross-fade. */
  y?: number;
}

/**
 * Fade + rise as the element scrolls into view. The default section entrance.
 */
export const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 24,
  once = true,
  amount = 0.2,
  ...rest
}: FadeInProps) => {
  const reduce = useReducedMotion();
  const shown = { opacity: 1, y: 0 };

  if (reduce) {
    return (
      <motion.div className={className} initial={false} animate={shown} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={shown}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/* ── SlideIn ──────────────────────────────────────────────────────────────── */

export type SlideFrom = "left" | "right" | "top" | "bottom";

export interface SlideInProps extends InViewProps {
  /** Edge the element travels in from. */
  from?: SlideFrom;
  /** Travel distance in pixels. */
  distance?: number;
}

const slideOffset = (from: SlideFrom, distance: number) => {
  switch (from) {
    case "left":
      return { x: -distance, y: 0 };
    case "right":
      return { x: distance, y: 0 };
    case "top":
      return { x: 0, y: -distance };
    default:
      return { x: 0, y: distance };
  }
};

/**
 * Directional entrance for split layouts (copy on one side, art on the other).
 */
export const SlideIn = ({
  children,
  className,
  from = "left",
  distance = 40,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  ...rest
}: SlideInProps) => {
  const reduce = useReducedMotion();
  const shown = { opacity: 1, x: 0, y: 0 };

  if (reduce) {
    return (
      <motion.div className={className} initial={false} animate={shown} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...slideOffset(from, distance) }}
      whileInView={shown}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/* ── ScaleIn ──────────────────────────────────────────────────────────────── */

export interface ScaleInProps extends InViewProps {
  /** Starting scale. Keep it close to 1 — big pops read as jank. */
  from?: number;
}

/**
 * Gentle scale + fade. For badges, pricing cards, stat tiles, logos.
 */
export const ScaleIn = ({
  children,
  className,
  from = 0.92,
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.2,
  ...rest
}: ScaleInProps) => {
  const reduce = useReducedMotion();
  const shown = { opacity: 1, scale: 1 };

  if (reduce) {
    return (
      <motion.div className={className} initial={false} animate={shown} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: from }}
      whileInView={shown}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/* ── Stagger / StaggerItem ────────────────────────────────────────────────── */

export interface StaggerProps extends InViewProps {
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delayChildren?: number;
}

/**
 * Container that releases its <StaggerItem> children one after another.
 * Put it on the <ul> / grid wrapper and wrap each <li> in <StaggerItem>.
 *
 *   <Stagger className="grid gap-6 sm:grid-cols-2">
 *     {items.map((i) => <StaggerItem key={i.id}>…</StaggerItem>)}
 *   </Stagger>
 */
export const Stagger = ({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  ...rest
}: StaggerProps) => {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  };

  if (reduce) {
    return (
      <motion.div
        className={className}
        variants={container}
        initial={false}
        animate="visible"
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerItemProps extends BaseMotionProps {
  children?: React.ReactNode;
  className?: string;
  /** Pixels of travel on the Y axis. */
  y?: number;
  /** Entrance length in seconds. */
  duration?: number;
}

/**
 * The child half of <Stagger>. Inherits the parent's timing through variants.
 * Safe to use on a <li> — it renders a plain <div> by default, so pass
 * `as` semantics by wrapping, or keep the <li> outside and put this inside it.
 */
export const StaggerItem = ({
  children,
  className,
  y = 20,
  duration = 0.5,
  ...rest
}: StaggerItemProps) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        className={className}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  const item: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
  };

  return (
    <motion.div className={className} variants={item} {...rest}>
      {children}
    </motion.div>
  );
};

/* ── Reveal ───────────────────────────────────────────────────────────────── */

export interface RevealProps extends InViewProps {
  /** Classes for the inner, moving element. */
  innerClassName?: string;
}

/**
 * Masked heading reveal: the text slides up from inside an overflow-hidden box.
 * Wrap a single line of text — a two-line heading needs one Reveal per line so
 * the mask does not clip the second line.
 *
 * The wrapper adds a hair of bottom padding so descenders (g, y, p) are not cut.
 */
export const Reveal = ({
  children,
  className,
  innerClassName,
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.4,
  ...rest
}: RevealProps) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div className={cx("overflow-hidden pb-[0.12em]", className)} {...rest}>
        <motion.div className={innerClassName} initial={false} animate={{ y: 0, opacity: 1 }}>
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className={cx("overflow-hidden pb-[0.12em]", className)} {...rest}>
      <motion.div
        className={innerClassName}
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once, amount }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

/* ── CountUp ──────────────────────────────────────────────────────────────── */

const formatNumber = (n: number, decimals: number, separator: string) => {
  const sign = n < 0 ? "-" : "";
  const fixed = Math.abs(n).toFixed(decimals);
  const [intPart, fracPart] = fixed.split(".");
  const grouped = separator
    ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : intPart;
  return fracPart ? `${sign}${grouped}.${fracPart}` : `${sign}${grouped}`;
};

export interface CountUpProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The number to land on. */
  value: number;
  /** Rendered before the number, e.g. "$". */
  prefix?: string;
  /** Rendered after the number, e.g. "+" or "★". */
  suffix?: string;
  /** Seconds the count takes. */
  duration?: number;
  /** Fixed decimal places — use 1 for a 5.0 rating. */
  decimals?: number;
  /** Thousands separator. Pass "" to disable grouping. */
  separator?: string;
  once?: boolean;
  amount?: ViewportAmount;
  className?: string;
}

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 *
 * SSR / hydration: the markup always contains the FINAL number, so crawlers and
 * no-JS visitors see the real figure and there is no hydration mismatch. A
 * layout effect rewinds the text to 0 before the first paint, so the animation
 * still starts from zero with no flash. With reduced motion the rewind never
 * happens and the final number simply stays on screen.
 */
export const CountUp = ({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  decimals = 0,
  separator = ",",
  once = true,
  amount = 0.4,
  className,
  ...rest
}: CountUpProps) => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount });

  const render = React.useCallback(
    (n: number) => `${prefix}${formatNumber(n, decimals, separator)}${suffix}`,
    [prefix, suffix, decimals, separator]
  );
  const final = render(value);

  useIsomorphicLayoutEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (el) el.textContent = render(0);
    // Runs once, before paint. Intentionally not re-run on prop changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !inView) return;

    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (latest: number) => {
        el.textContent = render(latest);
      },
      onComplete: () => {
        el.textContent = final;
      },
    });

    return () => controls.stop();
  }, [inView, reduce, value, duration, render, final]);

  return (
    <span className={className} {...rest}>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
};

/* ── HoverLift ────────────────────────────────────────────────────────────── */

export interface HoverLiftProps extends BaseMotionProps {
  children?: React.ReactNode;
  className?: string;
  /** Pixels the element rises on hover. */
  lift?: number;
  /** Scale applied while pressed. */
  press?: number;
}

/**
 * Hover lift + press feedback, transform-only.
 *
 * It deliberately does NOT animate box-shadow: Tailwind runs with
 * `important: true`, so a `shadow-md hover:shadow-xl` class would win over any
 * inline shadow motion writes and the two would fight. Compose them instead:
 *
 *   <HoverLift className="rounded-2xl border border-black-200 bg-common-white
 *                         shadow-md transition-shadow duration-300 hover:shadow-xl">
 *
 * The site's standard card treatment is shadow-only (no lift) — reach for this
 * on CTAs, badges and pricing tiles rather than on every card.
 */
export const HoverLift = ({
  children,
  className,
  lift = 4,
  press = 0.98,
  ...rest
}: HoverLiftProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -lift }}
      whileTap={reduce ? undefined : { scale: press }}
      transition={SPRING}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/* ── MarqueeRow ───────────────────────────────────────────────────────────── */

export interface MarqueeRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode;
  className?: string;
  /** Classes for the moving track. */
  trackClassName?: string;
  /** Seconds for one full loop. Bigger = slower. */
  duration?: number;
  /** Pixel gap between items (also used as the seam gap, so the loop is exact). */
  gap?: number;
  /** Travel direction. */
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

/**
 * Seamless horizontal loop for a logo / feature / review strip.
 *
 * The children are rendered twice inside a `w-max` track that translates by
 * exactly -50%; each copy carries a trailing pad equal to `gap`, so the seam
 * spacing matches the internal spacing and the loop is invisible. The duplicate
 * copy is aria-hidden, so assistive tech reads the list once.
 *
 * Speed and play state ride on CSS custom properties (`--marquee-duration`,
 * `--marquee-play`) because Tailwind's `important: true` would otherwise beat an
 * inline `animation-duration`. See the `marquee` entries in tailwind.config.ts.
 *
 * Reduced motion: no loop at all — after mount the children render once as a
 * centred, wrapping flex row, which also keeps 360px viewports free of
 * side-scroll. The swap is gated on `mounted` because `useReducedMotion()`
 * returns null on the server but the real boolean on the client's first render;
 * forking the DOM structure on it directly would be a hydration mismatch and
 * would make React throw away the whole SSR tree.
 */
export const MarqueeRow = ({
  children,
  className,
  trackClassName,
  duration = 30,
  gap = 40,
  direction = "left",
  pauseOnHover = true,
  ...rest
}: MarqueeRowProps) => {
  const reduce = useReducedMotion();
  const [paused, setPaused] = React.useState(false);
  // Server and first client render always take the animated branch, so the
  // hydrated tree matches the markup Next.js sent.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (mounted && reduce) {
    return (
      <div className={cx("w-full", className)} {...rest}>
        <div
          className="flex w-full flex-wrap items-center justify-center"
          style={{ columnGap: gap, rowGap: gap / 2 }}
        >
          {children}
        </div>
      </div>
    );
  }

  const groupStyle: React.CSSProperties = { columnGap: gap, paddingRight: gap };
  const trackStyle = {
    "--marquee-duration": `${duration}s`,
    "--marquee-play": paused ? "paused" : "running",
  } as React.CSSProperties;

  const hold = pauseOnHover ? () => setPaused(true) : undefined;
  const release = pauseOnHover ? () => setPaused(false) : undefined;

  return (
    <div
      className={cx("relative w-full overflow-hidden", className)}
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocus={hold}
      onBlur={release}
      {...rest}
    >
      <div
        className={cx(
          "flex w-max items-center",
          // Same class on the server and on the first client render (so the
          // markup matches), then dropped on the post-mount re-render for a
          // reduced-motion visitor, so no loop actually runs for them.
          (!mounted || !reduce) &&
            (direction === "right" ? "animate-marquee-reverse" : "animate-marquee"),
          trackClassName
        )}
        style={trackStyle}
      >
        <div className="flex shrink-0 items-center" style={groupStyle}>
          {children}
        </div>
        <div
          className="flex shrink-0 items-center"
          style={groupStyle}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/* ── AnimatedGradientText ─────────────────────────────────────────────────── */

/** Dodger-blue house accent sweeping through the Shopify green. */
export const DEFAULT_TEXT_GRADIENT =
  "linear-gradient(90deg, #1E90FF 0%, #105699 30%, #008060 55%, #1E90FF 100%)";

export interface AnimatedGradientTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode;
  className?: string;
  /** Any CSS gradient string. */
  gradient?: string;
  /** Seconds for one sweep. */
  duration?: number;
}

/**
 * Gradient-filled inline text with a slow sweep. Use it on ONE phrase inside a
 * heading, never on a whole paragraph — gradient text is decorative and its
 * contrast varies across the sweep.
 *
 * Renders as an inline-block <span>, so it nests inside an <h1>/<h2> safely.
 * Reduced motion keeps the gradient but freezes the sweep.
 */
export const AnimatedGradientText = ({
  children,
  className,
  gradient = DEFAULT_TEXT_GRADIENT,
  duration = 6,
  ...rest
}: AnimatedGradientTextProps) => {
  const reduce = useReducedMotion();

  const style = {
    backgroundImage: gradient,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    "--gradient-duration": `${duration}s`,
  } as React.CSSProperties;

  return (
    <span
      className={cx(
        "inline-block bg-clip-text text-transparent-main",
        !reduce && "animate-gradient-pan",
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </span>
  );
};

/** Re-exported so callers can gate their own effects without a second import. */
export { useReducedMotion } from "motion/react";

/* ────────────────────────────────────────────────────────────────────────────
 * Text animation primitives (appended)
 * ──────────────────────────────────────────────────────────────────────────── */

export interface SplitRevealProps extends InViewProps {
  /** The text to animate. Plain string only — markup is not split. */
  text: string;
  /** Split granularity. Words keep their spacing; chars are heavier. */
  per?: "word" | "char";
  /** Seconds between item starts. */
  stagger?: number;
  /** Per-item rise duration. */
  duration?: number;
  /** Rise distance (em units so it scales with the font). */
  riseEm?: number;
  /** Wrapper element. Defaults to span so it nests inside any heading. */
  as?: "span" | "div";
}

/**
 * Masked per-word (or per-char) rise, for headings. Each unit sits in its own
 * overflow-hidden inline-block and slides up into view with a stagger.
 *
 * Accessibility: the wrapper carries the full text as aria-label and every
 * animated fragment is aria-hidden, so screen readers hear one sentence, not
 * confetti. Reduced motion / SSR: same contract as everything in this file —
 * the server writes the hidden state, `initial={false}` + a final target
 * repairs it on mount without running a transition.
 */
export const SplitReveal = ({
  text,
  per = "word",
  stagger = 0.045,
  duration = 0.55,
  riseEm = 1.1,
  delay = 0,
  once = true,
  amount = 0.3,
  className,
  as = "span",
  ...rest
}: SplitRevealProps) => {
  const reduce = useReducedMotion();
  const units =
    per === "word" ? text.split(/(\s+)/).filter((u) => u.length > 0) : Array.from(text);
  // Ternary instead of motion[as]: the indexed access degrades to the raw
  // span props type and rejects motion props under strict mode.
  const Wrapper = (as === "div" ? motion.div : motion.span) as typeof motion.span;
  let animIndex = 0;
  return (
    <Wrapper
      aria-label={text}
      role="text"
      className={cx("inline-block", className)}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount }}
      {...rest}
    >
      {units.map((unit, i) => {
        if (/^\s+$/.test(unit)) {
          // Real whitespace between word masks so line wrapping stays natural.
          return <span key={i}>{" "}</span>;
        }
        const order = animIndex++;
        return (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: `${riseEm}em`, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: reduce
                    ? { duration: 0 }
                    : {
                        duration,
                        delay: delay + order * stagger,
                        ease: EASE,
                      },
                },
              }}
            >
              {unit}
            </motion.span>
          </span>
        );
      })}
    </Wrapper>
  );
};

export interface UnderlineDrawProps extends InViewProps {
  children: React.ReactNode;
  /** Underline color class or gradient classes, e.g. "bg-primary-main". */
  lineClassName?: string;
  /** Line thickness in px. */
  thickness?: number;
  duration?: number;
}

/**
 * Wraps an inline phrase and draws an underline from left to right when it
 * scrolls into view. Pure scaleX transform — no layout properties.
 */
export const UnderlineDraw = ({
  children,
  lineClassName = "bg-primary-main",
  thickness = 3,
  duration = 0.7,
  delay = 0,
  once = true,
  amount = 0.6,
  className,
  ...rest
}: UnderlineDrawProps) => {
  const reduce = useReducedMotion();
  return (
    <motion.span className={cx("relative inline-block", className)} {...rest}>
      {children}
      <motion.span
        aria-hidden="true"
        className={cx("absolute bottom-0 left-0 w-full origin-left rounded-full", lineClassName)}
        style={{ height: thickness }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once, amount }}
        transition={reduce ? { duration: 0 } : { duration, delay, ease: EASE }}
      />
    </motion.span>
  );
};
