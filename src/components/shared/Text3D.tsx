import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Extruded 3D text.
 *
 * ── HOW THE EXTRUSION WORKS ───────────────────────────────────────────────
 * The word is rendered `depth + 1` times, stacked in Z inside a `preserve-3d`
 * parent. The rearmost copies are darkened and form the solid side of the
 * letters; the front copy carries the gradient face. Because they are real
 * elements in 3D space, rotating the group reveals the extrusion the way a
 * solid would — a text-shadow stack cannot do that, it stays flat the moment
 * anything rotates.
 *
 * Kept in CSS 3D rather than WebGL on purpose: real glyph extrusion needs font
 * loading, triangulation and a mesh per string, which is a great deal of weight
 * for a heading. This gets the read for a few divs.
 *
 * ── MOTION ────────────────────────────────────────────────────────────────
 * Two sources, so it never looks static:
 *  • a continuous idle sway on both axes, and
 *  • pointer influence layered on top, spring-smoothed.
 * The pointer is tracked on the nearest section rather than the text itself, so
 * the heading responds as you move anywhere near it instead of only when the
 * cursor is exactly over the glyphs.
 *
 * Reduced motion: renders one flat copy, no listeners, no loop. The swap is
 * gated on `mounted` — the same guard <MarqueeRow> uses — because
 * useReducedMotion() is null on the server (so SSR always emits the full
 * extruded tree) but already TRUE on a reduced-motion visitor's first client
 * render. Forking the ELEMENT TREE on it directly is a structural hydration
 * mismatch: React 18 does not patch it, it throws away the whole SSR tree and
 * re-renders the root on the client — the heaviest possible outcome for
 * exactly the visitors who asked for less work. Rendering the animated tree on
 * the first client pass and swapping to the flat copy in an effect keeps
 * server and client markup identical.
 *
 * The idle sway is gated on `useInView` for the same reason <Tilt3D>'s is: a
 * heading parked below the fold has no business interpolating a rotation every
 * frame. Its keyframes also open and close at rest, because a keyframe array
 * begins AT its first value — starting at full amplitude would snap the
 * heading sideways the frame it entered the viewport.
 */

export interface Text3DProps {
  children: string;
  /** Number of extrusion layers. 6-14 reads solid; more just costs nodes. */
  depth?: number;
  /** Z distance between layers, px. */
  step?: number;
  /** Max pointer-driven rotation, degrees. */
  max?: number;
  /** Idle sway amplitude, degrees. */
  sway?: number;
  className?: string;
  /** Tailwind classes for the front face (usually a gradient text treatment). */
  faceClassName?: string;
  /** Colour of the extruded side. */
  sideColor?: string;
  /**
   * Resting rotation, degrees. NON-ZERO BY DEFAULT and load-bearing: the
   * extrusion layers sit directly behind the front face, so at rotation 0 they
   * are perfectly occluded and the text renders completely flat. The heading
   * only looked 3D while the pointer happened to be turning it.
   */
  restX?: number;
  restY?: number;
  /**
   * Per-layer diagonal offset in px. Real extruded type steps down-right as it
   * recedes; without it the side is only visible from an angle.
   */
  offset?: number;
}

/**
 * Static extrusion for the reduced-motion branch: a text-shadow stack cannot
 * rotate, but nothing rotates there, so it reproduces the same stepped side at
 * a fraction of the nodes.
 */
const buildStaticExtrusion = (depth: number, offset: number, color: string) =>
  Array.from({ length: depth }, (_, i) => {
    const d = (i + 1) * offset;
    return `${d}px ${d}px 0 ${color}`;
  }).join(", ");

export const Text3D = ({
  children,
  depth = 6,
  step = 1.4,
  max = 14,
  sway = 6,
  className = "",
  faceClassName = "text-common-black",
  sideColor = "#0B1A2E",
  restX = 5,
  restY = -9,
  offset = 0.55,
}: Text3DProps) => {
  const reduce = useReducedMotion();
  const hostRef = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);
  // Server and first client render always take the animated branch, so the
  // hydrated tree matches the markup Next.js sent. See the header note.
  const [mounted, setMounted] = React.useState(false);
  const inView = useInView(hostRef, { margin: "200px" });

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 20, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 140, damping: 20, mass: 0.7 });
  // Offset by the resting pose so the extrusion is visible even with the
  // pointer at centre (or absent entirely, as on touch).
  const rotY = useTransform(sx, [-0.5, 0.5], [restY - max, restY + max]);
  const rotX = useTransform(sy, [-0.5, 0.5], [restX + max, restX - max]);

  React.useEffect(() => {
    setMounted(true);
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  React.useEffect(() => {
    if (reduce || !enabled) return;
    const host = hostRef.current;
    if (!host) return;
    // Track on the surrounding section, so the heading reacts to the cursor
    // being near it rather than only directly over the glyphs.
    const zone = host.closest("section") ?? host.parentElement ?? host;

    // ── THE ZONE IS MEASURED ON ENTER / SCROLL / RESIZE, NEVER PER MOVE ────
    // `zone` is a whole section, so this handler fires for pointer movement
    // anywhere in it — not just over the glyphs. A getBoundingClientRect() in
    // there forces a style-recalc + layout flush on every pointer frame, and
    // it is not the only component asking for one on that frame (CursorGrid,
    // SpotlightCard and Tilt3D all do). On a page where dozens of elements are
    // dirtying inline transforms each flush is a full recalc. The section's
    // box only changes when the page scrolls or resizes, so it is cached and
    // the move handler does nothing but arithmetic.
    let rect: DOMRect | null = null;
    const measure = () => {
      rect = zone.getBoundingClientRect();
    };
    const invalidate = () => {
      rect = null;
    };

    const onMove = (e: MouseEvent) => {
      if (!rect || rect.width === 0 || rect.height === 0) {
        measure();
        if (!rect) return;
      }
      px.set((e.clientX - rect.left) / rect.width - 0.5);
      py.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => {
      invalidate();
      px.set(0);
      py.set(0);
    };
    zone.addEventListener("mouseenter", measure);
    zone.addEventListener("mousemove", onMove as EventListener);
    zone.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);
    return () => {
      zone.removeEventListener("mouseenter", measure);
      zone.removeEventListener("mousemove", onMove as EventListener);
      zone.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
    };
  }, [enabled, reduce, px, py]);

  if (mounted && reduce) {
    // Still extruded, just not animated — the depth is the design, the motion
    // is the enhancement.
    return (
      <span
        className={`relative inline-block ${className} ${faceClassName}`}
        style={{ textShadow: buildStaticExtrusion(depth, offset, sideColor) }}
      >
        {children}
      </span>
    );
  }

  // Folds "motion is welcome" and "on screen" into one flag. Off screen the
  // heading eases square-on ONCE and holds — leaving `repeat: Infinity` on the
  // settle keeps the loop ticking at zero amplitude, all cost and no payoff.
  const swaying = sway > 0 && inView && !(mounted && reduce);
  const swayAmount = sway * 0.25;

  const layers = Array.from({ length: depth }, (_, i) => i + 1);

  return (
    <div
      ref={hostRef}
      className={`inline-block ${className}`}
      style={{ perspective: 700 }}
    >
      {/* Outer = idle sway. Inner = pointer rotation. Two nodes because both
          write `transform`, and on one node the later write erases the other. */}
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        // Opens and closes at 0: a keyframe array begins AT its first value, so
        // `[-a, a, -a]` would snap the heading `a` degrees the frame it entered
        // the viewport, and again on every re-entry.
        animate={
          swaying
            ? { rotateZ: [0, -swayAmount, 0, swayAmount, 0] }
            : { rotateZ: 0 }
        }
        transition={
          swaying
            ? { duration: 9, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4, ease: "easeOut" }
        }
      >
        <motion.div
          className="relative"
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Extruded side: copies receding in Z, darkening with distance. */}
          {layers.map((i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute inset-0 select-none whitespace-pre"
              style={{
                transform: `translate(${i * offset}px, ${i * offset}px) translateZ(${-i * step}px)`,
                color: sideColor,
                // Opaque. Fading each layer composites them into a soft smear —
                // a real extruded side is solid and uniformly darker than the face.
                opacity: 1,
              }}
            >
              {children}
            </span>
          ))}
          {/* Front face — the only copy a screen reader sees. */}
          <span className={`relative whitespace-pre ${faceClassName}`}>
            {children}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Text3D;
