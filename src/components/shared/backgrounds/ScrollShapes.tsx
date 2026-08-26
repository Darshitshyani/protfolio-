import * as React from "react";
import ShopifyBag3D from "./ShopifyBag3D";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Large gradient background shapes driven by scroll — the ring and the snaking
 * tube-with-spheres from gsap.com/scroll.
 *
 * ── HOW, WITHOUT A 3D ENGINE ──────────────────────────────────────────────
 * The reference renders these in WebGL. They are recreated here in plain SVG:
 *
 *  • TORUS — a circle drawn as a very thick gradient STROKE (not a fill), so
 *    the hole is real geometry rather than a punched-out shape. `scaleY` on the
 *    group fakes the perspective tilt, and scroll drives the rotation, so it
 *    reads as a ring turning in space.
 *  • TUBE — one thick `stroke-linecap: round` path. Round caps are what give
 *    the rounded pipe ends in the reference for free.
 *  • SPHERES — SVG circles walked along the tube. The path is sampled ONCE
 *    with `getPointAtLength` into a lookup table (see below) and the scroll
 *    handler only interpolates it, so no frame ever asks the SVG to resolve
 *    its geometry. NOT CSS `offset-path`: that resolves its path in CSS
 *    pixels, while this path is in viewBox units, so the spheres would slide
 *    off the tube at any size other than 1:1. Inside the SVG they scale with
 *    everything else. A radial gradient offset toward the top-left makes a
 *    flat circle read as a lit sphere.
 *
 * The whole thing is a handful of SVG nodes and no per-frame geometry work, so
 * it costs a fraction of the WebGL original.
 *
 * ── SCRUB ─────────────────────────────────────────────────────────────────
 * Everything is bound to document scroll progress through a spring, so the
 * shapes have weight and rewind exactly when you scroll back up. Same approach
 * as <AmbientBackground>, and again via motion's useScroll rather than GSAP
 * ScrollTrigger — GSAP is deliberately not in this bundle.
 *
 * Reduced motion: shapes render at their resting pose, nothing scrubs.
 */

/** The snaking tube. Two switchbacks, matching the reference's stepped path. */
const TUBE_PATH =
  "M 40 120 L 250 120 Q 320 120 320 190 Q 320 260 250 260 L 90 260 Q 20 260 20 330 Q 20 400 90 400 L 300 400";

/** The path's `M` point. The circles are anchored here and moved by transform. */
const PATH_ORIGIN_X = 40;
const PATH_ORIGIN_Y = 120;

/**
 * How finely the path is pre-sampled. 200 segments over a ~900-unit path in a
 * 340-unit viewBox is roughly 4.5 units per step, and the handler lerps between
 * neighbours — well under a device pixel of error at any size this renders at.
 */
const PATH_SAMPLES = 200;

const ScrollShapes = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 26,
    restDelta: 0.001,
  });

  const tubeY = useTransform(progress, [0, 1], ["46vh", "-40vh"]);
  // Spheres run the tube as you scroll; the second trails the first.

  // ── WALKING THE SPHERES, WITHOUT TOUCHING SVG GEOMETRY PER FRAME ────────
  //
  // The obvious version calls getTotalLength() + getPointAtLength() inside the
  // scroll handler. Both force the SVG's geometry to resolve, and `progress` is
  // a spring, so it keeps emitting for a second or so after the wheel stops —
  // twice per frame, one call per sphere, on a layer that is `fixed` and
  // therefore never gated by anything. getTotalLength() in particular is a
  // constant for a hardcoded `d`.
  //
  // So the path is sampled ONCE into a lookup table and the handler does an
  // array index plus a lerp. The table is built in an effect (never during
  // render) because SVG geometry is not measurable on the server.
  //
  // The values are written straight to motion values, so this runs off the
  // scroll frame loop and never triggers a React re-render.
  const pathRef = React.useRef<SVGPathElement>(null);
  const samplesRef = React.useRef<Float32Array | null>(null);

  // ── AND WHY THESE ARE OFFSETS, NOT `cx` / `cy` ──────────────────────────
  // Writing cx/cy writes ATTRIBUTES, which is a geometry change: it invalidates
  // and re-rasterizes the whole SVG layer — including the 60px-wide
  // gradient-stroked tube — on every scroll frame. A transform on the circle is
  // composited instead. cx/cy stay static at the path's start point below and
  // these carry the displacement from it.
  const c1x = useMotionValue(0);
  const c1y = useMotionValue(0);
  const c2x = useMotionValue(0);
  const c2y = useMotionValue(0);

  const place = React.useCallback(
    (
      t: number,
      x: ReturnType<typeof useMotionValue<number>>,
      y: ReturnType<typeof useMotionValue<number>>
    ) => {
      const samples = samplesRef.current;
      if (!samples) return;
      const steps = samples.length / 2 - 1;
      const at = (t < 0 ? 0 : t > 1 ? 1 : t) * steps;
      const i = Math.min(Math.floor(at), steps - 1);
      const f = at - i;
      const ax = samples[i * 2];
      const ay = samples[i * 2 + 1];
      const bx = samples[i * 2 + 2];
      const by = samples[i * 2 + 3];
      x.set(ax + (bx - ax) * f - PATH_ORIGIN_X);
      y.set(ay + (by - ay) * f - PATH_ORIGIN_Y);
    },
    []
  );

  useMotionValueEvent(progress, "change", (p) => {
    place(p, c1x, c1y);
    place(Math.max(p - 0.18, 0), c2x, c2y);
  });

  // Sample the path once it is measurable, then place the spheres.
  React.useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const samples = new Float32Array((PATH_SAMPLES + 1) * 2);
    for (let i = 0; i <= PATH_SAMPLES; i++) {
      const pt = path.getPointAtLength((i / PATH_SAMPLES) * len);
      samples[i * 2] = pt.x;
      samples[i * 2 + 1] = pt.y;
    }
    samplesRef.current = samples;

    place(reduce ? 0.2 : progress.get(), c1x, c1y);
    place(reduce ? 0.6 : Math.max(progress.get() - 0.18, 0), c2x, c2y);
  }, [place, progress, reduce, c1x, c1y, c2x, c2y]);

  return (
    <div
      aria-hidden="true"
      // FIXED, not absolute. Absolute made this span the whole document, so
      // `top-[8%]` put the ring 8% down a multi-thousand-pixel page and the
      // tube sat near the footer — nothing was on screen at the hero, and a
      // 26vh scrub is invisible at that scale. Pinned to the viewport the
      // shapes are always present and their scroll travel actually reads.
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Extruded 3D shopping-bag mark in Shopify green — replaces the torus,
          which was decorative but said nothing about the work. */}
      <ShopifyBag3D className="absolute right-[-4%] top-[8%] hidden h-[58vh] w-[46vw] max-w-[720px] lg:block" />

      {/* ── Snaking tube + spheres ───────────────────────────────────── */}
      <motion.div
        className="absolute bottom-[6%] left-[-14%] hidden w-[30vw] max-w-[420px] lg:block"
        style={reduce ? undefined : { y: tubeY }}
      >
        <motion.svg
          viewBox="0 0 340 440"
          className="h-auto w-full"
          animate={reduce ? undefined : { x: [0, 18, 0], y: [0, -14, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 26, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <defs>
            <linearGradient id="pp-tube-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5CC9EC" />
              <stop offset="50%" stopColor="#A9C0F2" />
              <stop offset="100%" stopColor="#F3B8E8" />
            </linearGradient>
            {/* Highlight offset toward the top-left is what makes a flat
                circle read as a lit sphere rather than a disc. */}
            <radialGradient id="pp-sphere-grad" cx="32%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="32%" stopColor="#DCEFFF" />
              <stop offset="66%" stopColor="#7FD5F0" />
              <stop offset="100%" stopColor="#63B9DE" />
            </radialGradient>
          </defs>

          <path
            ref={pathRef}
            d={TUBE_PATH}
            fill="none"
            stroke="url(#pp-tube-grad)"
            strokeWidth="60"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.28"
          />

          {/* Circles live INSIDE the svg, so they scale with the tube and their
              coordinates are the path's own units. */}
          <motion.circle
            cx={PATH_ORIGIN_X}
            cy={PATH_ORIGIN_Y}
            r="29"
            fill="url(#pp-sphere-grad)"
            opacity="0.5"
            style={{ x: c1x, y: c1y }}
          />
          <motion.circle
            cx={PATH_ORIGIN_X}
            cy={PATH_ORIGIN_Y}
            r="22"
            fill="url(#pp-sphere-grad)"
            opacity="0.4"
            style={{ x: c2x, y: c2y }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default ScrollShapes;
