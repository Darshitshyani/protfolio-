/**
 * Animated background library — PIMW marketing surfaces.
 *
 * Decorative, always-subtly-alive layers that sit BEHIND section content.
 * Everything here is GPU-cheap (transform / opacity / filter only), SSR-safe
 * (no window/document at render), and honors `prefers-reduced-motion` by
 * rendering the resting state with no loops.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * LAYERING CONTRACT (every consumer must follow it)
 * ────────────────────────────────────────────────────────────────────────────
 * Backgrounds are `absolute inset-0 pointer-events-none aria-hidden z-0` and
 * MUST live inside a `relative overflow-hidden` parent, with the real content
 * in a sibling `relative z-10` wrapper:
 *
 *   <section className="relative overflow-hidden">
 *     <AuroraBackground variant="mixed" />
 *     <div className="relative z-10">…content…</div>
 *   </section>
 *
 * …or let <SectionGlow> do exactly that in one line:
 *
 *   <SectionGlow aurora="blue" grid id="services" className="py-20">
 *     …content…
 *   </SectionGlow>
 *
 * The aurora layer clips itself (`overflow-hidden` on the layer) as a second
 * belt-and-braces guard, so blur bleed can never create horizontal scroll at
 * 360px even if a caller forgets `overflow-hidden` on the parent.
 *
 * COLOR STRATEGY — dark is the default theme, light must still read:
 * every blob / orb / spotlight gradient bakes TWO rgba stops — a bright core
 * (reads as a glow over the #080B12 page) fading through a deeper, saturated
 * mid tone (reads as a tint over #fff) — so the same markup is correct in both
 * themes with no `dark:` variants. GridPattern instead themes via
 * `currentColor`: pass a `text-*` token (e.g. `className="text-black-300"`).
 *
 * REDUCED MOTION / HYDRATION: loops start at their resting keyframe, so the
 * server HTML carries no transform and the reduced branch (no `animate` prop)
 * produces identical markup — no mismatch, no flash. Where a CLASS must fork
 * on the preference (GradientBeam), the swap is gated on a post-mount state,
 * exactly like <MarqueeRow> in @/components/shared/motion.
 */

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cx, useReducedMotion } from "@/components/shared/motion";

const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));

/* ── AuroraBackground ─────────────────────────────────────────────────────── */

export type AuroraVariant = "blue" | "green" | "mixed";

interface BlobSpec {
  /** Static placement — inline styles, so Tailwind never sees dynamic classes. */
  position: React.CSSProperties;
  /** Diameter (blobs are circles). Clamped so 360px screens still get a wash. */
  size: string;
  /** Two-tone radial: bright core (reads on dark) → deep mid (reads on light). */
  gradient: string;
  x: [string, string];
  y: [string, string];
  scale: [number, number];
  /** Seconds for one out-leg; the loop mirrors back, so a cycle is 2×this. */
  duration: number;
}

const BLUE_A =
  "radial-gradient(circle at 35% 35%, rgba(59, 166, 255, 0.9) 0%, rgba(21, 114, 204, 0.45) 45%, rgba(21, 114, 204, 0) 72%)";
const BLUE_B =
  "radial-gradient(circle at 60% 40%, rgba(30, 144, 255, 0.8) 0%, rgba(12, 65, 122, 0.5) 48%, rgba(12, 65, 122, 0) 74%)";
const BLUE_C =
  "radial-gradient(circle at 50% 50%, rgba(117, 194, 255, 0.7) 0%, rgba(21, 114, 204, 0.35) 45%, rgba(21, 114, 204, 0) 70%)";
const GREEN_A =
  "radial-gradient(circle at 35% 35%, rgba(86, 199, 159, 0.85) 0%, rgba(0, 128, 96, 0.5) 45%, rgba(0, 128, 96, 0) 72%)";
const GREEN_B =
  "radial-gradient(circle at 60% 40%, rgba(79, 174, 142, 0.75) 0%, rgba(0, 110, 82, 0.45) 48%, rgba(0, 110, 82, 0) 74%)";
const LIME_C =
  "radial-gradient(circle at 50% 50%, rgba(149, 191, 71, 0.6) 0%, rgba(123, 163, 56, 0.3) 45%, rgba(123, 163, 56, 0) 70%)";

/** Three placements shared by every variant; only the gradients change. */
const blobLayout = (
  g1: string,
  g2: string,
  g3: string
): readonly BlobSpec[] => [
  {
    position: { left: "-12%", top: "-22%" },
    size: "clamp(320px, 55vw, 780px)",
    gradient: g1,
    x: ["0%", "7%"],
    y: ["0%", "5%"],
    scale: [1, 1.06],
    duration: 15, // ~30s full cycle
  },
  {
    position: { right: "-14%", top: "8%" },
    size: "clamp(280px, 45vw, 640px)",
    gradient: g2,
    x: ["0%", "-6%"],
    y: ["0%", "7%"],
    scale: [1, 1.1],
    duration: 19, // ~38s full cycle
  },
  {
    position: { left: "18%", bottom: "-28%" },
    size: "clamp(260px, 40vw, 560px)",
    gradient: g3,
    x: ["0%", "5%"],
    y: ["0%", "-6%"],
    scale: [1, 1.05],
    duration: 12, // ~24s full cycle
  },
];

const AURORA_BLOBS: Record<AuroraVariant, readonly BlobSpec[]> = {
  blue: blobLayout(BLUE_A, BLUE_B, BLUE_C),
  green: blobLayout(GREEN_A, GREEN_B, LIME_C),
  mixed: blobLayout(BLUE_A, GREEN_A, LIME_C),
};

export interface AuroraBackgroundProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** blue = primary #1E90FF family, green = Shopify family, mixed = both. */
  variant?: AuroraVariant;
  /**
   * 0–1, default 0.5. Maps linearly to layer opacity 0.12–0.32; combined with
   * the gradients' internal alpha the effective blob alpha lands ~0.14–0.25
   * on the dark page at the default, so text above always stays readable.
   */
  intensity?: number;
  /**
   * How the layer dissolves at the section boundary. The parent clips with
   * `overflow-hidden`, so a blob still at full alpha when it reaches the edge
   * draws a hard horizontal seam between sections. Default "bottom" fades the
   * lower portion out, which is what stops the seam in a stacked page.
   * "none" only for a section that genuinely fills the viewport edge-to-edge.
   */
  fade?: "bottom" | "both" | "none";
}

/**
 * The hero piece: 2–3 huge blurred radial blobs drifting on slow mirrored
 * loops. Drop it as the first child of a `relative overflow-hidden` section.
 *
 *   <section className="relative overflow-hidden">
 *     <AuroraBackground variant="mixed" intensity={0.6} />
 *     <div className="relative z-10">…</div>
 *   </section>
 *
 * Reduced motion: the same blobs render as a static wash — no loops run.
 */
const AURORA_FADES: Record<"bottom" | "both" | "none", string | undefined> = {
  bottom: "linear-gradient(to bottom, #000 0%, #000 55%, transparent 97%)",
  both:
    "linear-gradient(to bottom, transparent 0%, #000 18%, #000 70%, transparent 98%)",
  none: undefined,
};

export const AuroraBackground = ({
  variant = "blue",
  intensity = 0.5,
  fade = "bottom",
  className,
  style,
  ...rest
}: AuroraBackgroundProps) => {
  const reduce = useReducedMotion();
  const opacity = 0.12 + clamp01(intensity) * 0.2;
  const maskImage = AURORA_FADES[fade];

  return (
    <div
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
      style={{
        opacity,
        ...(maskImage ? { maskImage, WebkitMaskImage: maskImage } : null),
        ...style,
      }}
      {...rest}
    >
      {AURORA_BLOBS[variant].map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            ...blob.position,
            width: blob.size,
            height: blob.size,
            backgroundImage: blob.gradient,
            filter: "blur(100px)",
            willChange: "transform",
          }}
          // Keyframes begin at rest, so the SSR markup carries no transform
          // and the reduced branch (no animate at all) matches it exactly.
          animate={
            reduce
              ? undefined
              : { x: blob.x, y: blob.y, scale: blob.scale }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
};

/* ── GridPattern ──────────────────────────────────────────────────────────── */

export type GridPatternVariant = "lines" | "dots";
export type GridPatternFade = "edges" | "bottom" | "top" | "none";

const GRID_MASKS: Record<GridPatternFade, string | undefined> = {
  edges:
    "radial-gradient(ellipse 85% 75% at 50% 50%, #000 40%, transparent 92%)",
  bottom: "linear-gradient(to bottom, #000 50%, transparent 97%)",
  top: "linear-gradient(to top, #000 50%, transparent 97%)",
  none: undefined,
};

export interface GridPatternProps
  extends Omit<React.SVGProps<SVGSVGElement>, "children" | "opacity"> {
  variant?: GridPatternVariant;
  /** Cell size in px. */
  size?: number;
  /** Layer opacity, 0–1. Keep it faint — this is texture, not content. */
  opacity?: number;
  /** Which edges the pattern fades out toward. */
  fade?: GridPatternFade;
}

/**
 * Faint static line- or dot-grid with a mask fading to transparent at the
 * edges. Strokes use `currentColor`, so ALWAYS pass a text token:
 *
 *   <GridPattern className="text-black-300" />
 *   <GridPattern variant="dots" size={24} className="text-shopify-300" fade="bottom" />
 *
 * Without a token it inherits the page ink, which is stronger than intended.
 */
export const GridPattern = ({
  variant = "lines",
  size = 32,
  opacity = 0.4,
  fade = "edges",
  className,
  style,
  ...rest
}: GridPatternProps) => {
  // useId is SSR-stable; strip the ":" wrappers so url(#…) stays clean.
  const patternId = `pp-grid-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const mask = GRID_MASKS[fade];

  return (
    <svg
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-0 z-0 h-full w-full",
        className
      )}
      style={{ opacity, maskImage: mask, WebkitMaskImage: mask, ...style }}
      {...rest}
    >
      <defs>
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          {variant === "lines" ? (
            <path
              d={`M ${size} 0 H 0 V ${size}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            />
          ) : (
            <circle cx={1.25} cy={1.25} r={1.25} fill="currentColor" />
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

/* ── GlowOrb ──────────────────────────────────────────────────────────────── */

export type GlowColor = "blue" | "green";

const ORB_GRADIENTS: Record<GlowColor, string> = {
  blue: "radial-gradient(circle at 50% 50%, rgba(59, 166, 255, 0.5) 0%, rgba(21, 114, 204, 0.22) 45%, rgba(21, 114, 204, 0) 70%)",
  green:
    "radial-gradient(circle at 50% 50%, rgba(86, 199, 159, 0.45) 0%, rgba(0, 128, 96, 0.2) 45%, rgba(0, 128, 96, 0) 70%)",
};

export interface GlowOrbProps
  extends Omit<
    HTMLMotionProps<"div">,
    "children" | "animate" | "initial" | "transition"
  > {
  color?: GlowColor;
  /** Diameter in px. */
  size?: number;
  /** Seconds per breathe half-cycle. */
  duration?: number;
}

/**
 * One soft glow spot with a very slow scale/opacity breathe. Position it with
 * className inside a `relative overflow-hidden` parent:
 *
 *   <GlowOrb color="green" size={360} className="-top-24 right-[10%]" />
 *
 * Reduced motion: the orb renders static at full rest — no breathe.
 */
export const GlowOrb = ({
  color = "blue",
  size = 320,
  duration = 9,
  className,
  style,
  ...rest
}: GlowOrbProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={cx("pointer-events-none absolute z-0 rounded-full", className)}
      style={{
        width: size,
        height: size,
        backgroundImage: ORB_GRADIENTS[color],
        filter: "blur(60px)",
        willChange: "transform, opacity",
        ...style,
      }}
      animate={reduce ? undefined : { scale: [1, 1.12], opacity: [1, 0.72] }}
      transition={
        reduce
          ? undefined
          : {
              duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }
      }
      {...rest}
    />
  );
};

/* ── SpotlightCard ────────────────────────────────────────────────────────── */

const SPOT_COLORS: Record<GlowColor, string> = {
  blue: "rgba(59, 166, 255, 0.16)",
  green: "rgba(86, 199, 159, 0.15)",
};

export interface SpotlightCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: GlowColor;
  /** Radius of the highlight circle in px. */
  radius?: number;
  /** Classes for the inner content wrapper (`relative z-10`). Put layout
   * classes (flex, grid, padding) HERE; card chrome goes on `className`. */
  contentClassName?: string;
}

/**
 * Card wrapper with a radial highlight that follows the cursor. Compose it
 * with the standard card chrome:
 *
 *   <SpotlightCard
 *     className="rounded-2xl border border-black-200 bg-common-white shadow-md"
 *     contentClassName="p-6"
 *   >
 *     …card content…
 *   </SpotlightCard>
 *
 * Touch / no-hover devices and reduced-motion visitors never see the
 * highlight (gated on a `(hover: hover) and (pointer: fine)` media query
 * checked in an effect — SSR-safe). The highlight layer is pointer-events-none
 * and sits under the `relative z-10` content, so clicks are never intercepted.
 */
export const SpotlightCard = ({
  children,
  className,
  contentClassName,
  color = "blue",
  radius = 280,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: SpotlightCardProps) => {
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    // Older Safari
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  const enabled = canHover && !reduce;

  // ── THE CARD'S BOX IS MEASURED ON ENTER, NOT PER MOVE ────────────────────
  // getBoundingClientRect() forces a style recalc + layout flush, and this is
  // not the only component that wants one on a given pointer frame — Tilt3D,
  // Text3D and CursorGrid all do — on a page where dozens of elements are
  // dirtying inline transforms, so each flush is a full recalc. The box only
  // changes on enter, scroll or resize, so it is read there and the move
  // handler does nothing but arithmetic and two custom-property writes.
  const rectRef = React.useRef<DOMRect | null>(null);

  const invalidate = React.useCallback(() => {
    rectRef.current = null;
  }, []);

  const detach = React.useCallback(() => {
    window.removeEventListener("scroll", invalidate, true);
  }, [invalidate]);

  React.useEffect(() => detach, [detach]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);
    if (!enabled) return;
    const el = rootRef.current;
    if (!el) return;
    let rect = rectRef.current;
    if (!rect || rect.width === 0) {
      rect = el.getBoundingClientRect();
      rectRef.current = rect;
    }
    // CSS vars on the element itself — no re-render per mousemove.
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(e);
    if (!enabled) return;
    rectRef.current = rootRef.current?.getBoundingClientRect() ?? null;
    // Only while hovered — one card at a time, page wide.
    window.addEventListener("scroll", invalidate, { passive: true, capture: true });
    setActive(true);
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e);
    detach();
    rectRef.current = null;
    setActive(false);
  };

  return (
    <div
      ref={rootRef}
      className={cx("relative overflow-hidden", className)}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: enabled && active ? 1 : 0,
          backgroundImage: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${SPOT_COLORS[color]} 0%, transparent 70%)`,
        }}
      />
      <div className={cx("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
};

/* ── GradientBeam ─────────────────────────────────────────────────────────── */

export type GradientBeamVariant = "blue" | "green" | "mixed";

const BEAM_GRADIENTS: Record<GradientBeamVariant, string> = {
  blue: "linear-gradient(90deg, rgba(30, 144, 255, 0) 0%, #1E90FF 35%, #75C2FF 50%, #1E90FF 65%, rgba(30, 144, 255, 0) 100%)",
  green:
    "linear-gradient(90deg, rgba(0, 128, 96, 0) 0%, #008060 35%, #56C79F 50%, #008060 65%, rgba(0, 128, 96, 0) 100%)",
  mixed:
    "linear-gradient(90deg, rgba(30, 144, 255, 0) 0%, #1E90FF 30%, #56C79F 50%, #008060 70%, rgba(0, 128, 96, 0) 100%)",
};

export interface GradientBeamProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: GradientBeamVariant;
  /** Seconds for one sweep. */
  duration?: number;
  /** Line height in px (1–2 look best). */
  thickness?: number;
}

/**
 * Thin divider line with an animated gradient sweep, riding the existing
 * `shimmer` keyframes from tailwind.config.ts. Width comes from className:
 *
 *   <GradientBeam className="w-full" />                     — section divider
 *   <GradientBeam variant="blue" className="w-[100px]" />   — under a heading
 *
 * Reduced motion: the sweep freezes into a static centred gradient over the
 * same faint track (the class swap is gated post-mount, like MarqueeRow, so
 * hydration markup always matches the server).
 */
export const GradientBeam = ({
  variant = "mixed",
  duration = 3,
  thickness = 2,
  className,
  style,
  ...rest
}: GradientBeamProps) => {
  const reduce = useReducedMotion();
  // Server and first client render always take the animated branch so the
  // hydrated class list matches the SSR markup; reduced-motion visitors get
  // the static branch on the post-mount re-render.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const sweep = !(mounted && reduce);

  return (
    <div
      aria-hidden="true"
      className={cx(
        "pointer-events-none relative overflow-hidden rounded-full bg-black-200/60",
        className
      )}
      style={{ height: thickness, ...style }}
      {...rest}
    >
      <div
        className={cx("absolute inset-0", sweep && "animate-shimmer")}
        style={
          {
            backgroundImage: BEAM_GRADIENTS[variant],
            backgroundSize: sweep ? "200% 100%" : "100% 100%",
            "--shimmer-duration": `${duration}s`,
          } as React.CSSProperties
        }
      />
    </div>
  );
};

/* ── SoftBand ─────────────────────────────────────────────────────────────── */

export interface SoftBandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** REQUIRED tint token, e.g. "bg-black-100/50" / "bg-pink-100/50". */
  className: string;
}

/**
 * Translucent, top/bottom-feathered tint for a full-width section band.
 *
 * ALWAYS use this instead of putting `band-soft` on the <section> itself.
 * `band-soft` (globals.css) masks the element AND every painted descendant, so
 * a section carrying it fades its own headings and CTAs out along with the
 * tint — the first and last 9rem of content render at partial opacity. Riding
 * the mask on a dedicated `absolute inset-0` layer feathers ONLY the tint.
 *
 *   <section className="relative w-full py-[50px]">
 *     <SoftBand className="bg-black-100/50" />
 *     <div className="relative z-10">…content…</div>
 *   </section>
 *
 * The parent must be `relative`; the content must sit in a `relative z-10`
 * sibling so it paints above the tint.
 */
export const SoftBand = ({ className, ...rest }: SoftBandProps) => (
  <div
    aria-hidden="true"
    className={cx("band-soft pointer-events-none absolute inset-0 z-0", className)}
    {...rest}
  />
);

/* ── SectionGlow ──────────────────────────────────────────────────────────── */

export interface SectionGlowProps extends React.HTMLAttributes<HTMLElement> {
  /** Aurora variant behind the content, or `false` for none. */
  aurora?: AuroraVariant | false;
  /** Passed straight to <AuroraBackground intensity>. */
  auroraIntensity?: number;
  /** Also render a faint line grid. */
  grid?: boolean;
  /** REPLACES the grid's default classes ("text-black-300") when provided —
   * include your own text token. */
  gridClassName?: string;
  /** Classes for the `relative z-10` content wrapper. */
  contentClassName?: string;
}

/**
 * One-line section wrapper: `relative overflow-hidden` <section> with the
 * background layers behind and children inside a `relative z-10` div — so
 * page agents can wrap an existing section without restructuring it:
 *
 *   <SectionGlow id="services" aurora="mixed" grid className="py-20">
 *     …existing section content, unchanged…
 *   </SectionGlow>
 */
export const SectionGlow = ({
  aurora = "blue",
  auroraIntensity,
  grid = false,
  gridClassName,
  contentClassName,
  className,
  children,
  ...rest
}: SectionGlowProps) => (
  <section className={cx("relative overflow-hidden", className)} {...rest}>
    {aurora !== false && (
      <AuroraBackground variant={aurora} intensity={auroraIntensity} />
    )}
    {grid && <GridPattern className={gridClassName ?? "text-black-300"} />}
    <div className={cx("relative z-10", contentClassName)}>{children}</div>
  </section>
);

/* ── BorderBeam ───────────────────────────────────────────────────────────── */

export interface BorderBeamProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
  /** Beam hue. "shopify" for platform surfaces, "blue" for the site accent. */
  tone?: "blue" | "shopify";
  /** Seconds for one full rotation. */
  duration?: number;
  /** Border thickness in px. */
  thickness?: number;
  /** Corner radius in px — must match the inner surface's radius. */
  radius?: number;
  /** Only spin while hovered. Default true, so a grid of cards stays calm. */
  onHoverOnly?: boolean;
  /** Classes for the inner content surface. */
  contentClassName?: string;
}

const BEAM_TONES: Record<"blue" | "shopify", string> = {
  blue: "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, #1E90FF 340deg, #7FC4FF 355deg, #1E90FF 360deg)",
  shopify:
    "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, #008060 340deg, #95BF47 355deg, #008060 360deg)",
};

/**
 * A card whose border carries a travelling light beam.
 *
 * Structure: an outer element painted with a rotating conic gradient, and an
 * inner surface inset by `thickness` that covers all of it except the rim —
 * so the gradient is only ever visible AS the border. The conic layer is
 * square and oversized (200% of the longest side) because a conic gradient
 * rotating inside a non-square box would visibly stretch at the corners.
 *
 * Idle state keeps a soft static edge so the card never looks unfinished; the
 * beam itself only spins on hover by default, which keeps a grid of six cards
 * from turning into a light show.
 *
 * Reduced motion: the beam never rotates — the static edge is all that shows.
 * The class is gated post-mount so SSR and first client paint agree.
 */
export const BorderBeam = ({
  children,
  tone = "blue",
  duration = 6,
  thickness = 1,
  radius = 16,
  onHoverOnly = true,
  className,
  contentClassName,
  ...rest
}: BorderBeamProps) => {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const spin = !(mounted && reduce);

  return (
    <div
      className={cx(
        "group relative isolate overflow-hidden",
        onHoverOnly && "[--beam-play:paused] hover:[--beam-play:running]",
        className
      )}
      style={{ borderRadius: radius, padding: thickness }}
      {...rest}
    >
      {/* Static rim — always visible, so the card has a defined edge at rest. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-[inherit] bg-black-200"
      />
      {/* Rotating beam. Opacity ramps up on hover rather than appearing. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
      >
        <span
          className={cx(
            "absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            spin && "animate-border-spin"
          )}
          style={
            {
              backgroundImage: BEAM_TONES[tone],
              "--beam-duration": `${duration}s`,
            } as React.CSSProperties
          }
        />
      </span>
      <div
        className={cx("relative h-full rounded-[inherit]", contentClassName)}
        style={{ borderRadius: Math.max(radius - thickness, 0) }}
      >
        {children}
      </div>
    </div>
  );
};
