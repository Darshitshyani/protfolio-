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
 * Cursor-driven 3D tilt for cards.
 *
 * The card rotates about X and Y toward wherever the pointer is, so it reads as
 * a physical panel being leaned rather than a flat rectangle with a hover
 * shadow.
 *
 * ── STRUCTURE, AND WHY IT IS TWO ELEMENTS ─────────────────────────────────
 * CSS `perspective` must live on the PARENT of the rotating element — set on
 * the same node it does nothing. So the outer div owns the perspective and the
 * inner motion.div owns the rotation.
 *
 * That split also keeps this composable with the rest of the card stack. Nearly
 * everything wrapping these cards writes `transform` too — <StaggerItem> for
 * the entrance, <HoverLift> and <BorderBeam> for their hover lift, <Parallax>
 * for scroll drift. Two transforms on ONE node means the later write silently
 * erases the earlier one, so each effect gets its own element.
 *
 * ── DETAILS THAT MATTER ───────────────────────────────────────────────────
 * • Rotation is spring-smoothed, so the card eases toward the pointer instead
 *   of snapping frame-to-frame with the mouse.
 * • `transform-style: preserve-3d` plus a small `translateZ` on the content
 *   gives the contents real depth inside the tilt rather than looking painted
 *   on a rotating billboard.
 * • Disabled on coarse pointers: there is no hover on touch, and tilting on tap
 *   just feels like a bug.
 * • Reduced motion renders a plain wrapper with no listeners at all.
 *
 * ── THE IDLE SWAY IS VIEWPORT-GATED ───────────────────────────────────────
 * `rotateX` and `rotateY` animated as separate transform components cannot be
 * handed to a compositor animation, so every instance costs a main-thread
 * interpolation plus a transform-string rebuild every frame. This page mounts
 * dozens of these; a card six viewports below the fold has no business paying
 * for that. So the loop runs off the same `useInView` gate the callers use for
 * their own accents, and off screen the card settles square-on ONCE and holds.
 * Leaving `repeat: Infinity` on the settle would keep the loop ticking at zero
 * amplitude — all of the cost, none of the payoff.
 *
 * ── THE KEYFRAMES OPEN AND CLOSE AT REST ──────────────────────────────────
 * A keyframe array begins AT its first value. Written `[idle, -idle, idle]`
 * every card on the page would SNAP to full idle angle the frame `enabled`
 * flips true (and again on every re-entry), which is a page-wide twitch one
 * frame after hydration. Both tracks therefore start and end at 0, and X runs
 * at twice Y's frequency so the sway never reads as a hinge on one axis.
 *
 * ── SIZING: WHY THE TWO INNER WRAPPERS CARRY `h-full` ─────────────────────
 * The enabled branch nests four boxes (perspective → idle sway → pointer tilt
 * → translateZ) where the disabled branch nests two. The sway and translateZ
 * boxes are plain blocks, so a caller's `h-full` on `innerClassName` would
 * resolve a percentage height against an auto-height parent, compute to auto,
 * and take every `h-full` below it down with it — equal-height card grids
 * would silently stop stretching, but ONLY on the enabled branch. `h-full` on
 * both internal wrappers keeps the chain unbroken; against an auto-height
 * parent it resolves to auto, so it is a no-op for callers that do not size.
 */

export interface Tilt3DProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: React.ReactNode;
  /** Max rotation in degrees at the card's edge. */
  max?: number;
  /** Perspective distance in px. Lower = stronger 3D. */
  perspective?: number;
  /** How far the content floats toward the viewer, in px. */
  lift?: number;
  /** Classes for the inner rotating element. */
  innerClassName?: string;
  /**
   * Continuous idle sway, in degrees. Without it a card only looks 3D while the
   * cursor is on it and sits flat the rest of the time — which is most of the
   * time. Set 0 to disable.
   */
  idle?: number;
  /** Seconds for one idle cycle. Varying this per card stops a grid of them
   *  breathing in lockstep, which reads as a glitch rather than as life. */
  idleDuration?: number;
}

export const Tilt3D = ({
  children,
  max = 9,
  perspective = 900,
  lift = 24,
  className = "",
  innerClassName = "",
  idle = 2.5,
  idleDuration = 7,
  ...rest
}: Tilt3DProps) => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);
  // 200px of margin so a card starts swaying just before it is actually seen,
  // rather than visibly kicking off as its top edge clears the fold.
  const inView = useInView(ref, { margin: "200px" });

  React.useEffect(() => {
    // No hover on touch — tilting on tap reads as a glitch.
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // -0.5 .. 0.5 across the card in each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  // ── THE CARD'S BOX IS MEASURED ON ENTER, NOT PER MOVE ───────────────────
  // getBoundingClientRect() forces a style recalc + layout flush. On a pointer
  // frame this component is not alone in wanting one — CursorGrid, Text3D and
  // SpotlightCard all want one too — and on a page where dozens of elements
  // are dirtying inline transforms, each flush is a full recalc rather than a
  // cheap one. The box only changes on enter, scroll or resize, so it is read
  // there and the move handler does nothing but arithmetic.
  const rectRef = React.useRef<DOMRect | null>(null);

  const measure = () => {
    const el = ref.current;
    if (el) rectRef.current = el.getBoundingClientRect();
  };

  // Scrolling with the pointer parked on a card moves the box under it, so the
  // cached rect is dropped on scroll and re-read on the next move. The listener
  // exists only while the card is actually hovered — one card at a time, page
  // wide — so this is not 40-odd permanent scroll subscribers. `useCallback`
  // with no deps keeps ONE identity, which is what removeEventListener needs.
  const invalidate = React.useCallback(() => {
    rectRef.current = null;
  }, []);

  const detach = React.useCallback(() => {
    window.removeEventListener("scroll", invalidate, true);
  }, [invalidate]);

  const onEnter = () => {
    measure();
    // capture: true so a scroll inside any scrolling ancestor counts too.
    window.addEventListener("scroll", invalidate, { passive: true, capture: true });
  };

  React.useEffect(() => detach, [detach]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = rectRef.current;
    if (!r || r.width === 0 || r.height === 0) {
      measure();
      return;
    }
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    detach();
    rectRef.current = null;
    px.set(0);
    py.set(0);
  };

  // Folds "on screen" and "3D is switched on at all" into one flag.
  const sway = idle > 0 && enabled && !reduce && inView;

  if (reduce || !enabled) {
    return (
      <div ref={ref} className={className} {...rest}>
        <div className={innerClassName}>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {/* Outer node = idle sway, inner = pointer tilt. Separate elements
          because both write `transform`; merged, the later write wins and the
          other silently stops. */}
      <motion.div
        className="h-full"
        style={{ transformStyle: "preserve-3d" }}
        // idle === 0 writes NO transform at all on this node, so a card that
        // opted out of the sway does not pay for an extra composited layer.
        animate={
          idle <= 0
            ? undefined
            : sway
              ? {
                  rotateX: [0, idle, 0, -idle, 0, idle, 0, -idle, 0],
                  rotateY: [0, -idle, 0, idle, 0],
                }
              : { rotateX: 0, rotateY: 0 }
        }
        transition={
          idle <= 0
            ? undefined
            : sway
              ? { duration: idleDuration, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4, ease: "easeOut" }
        }
      >
      <motion.div
        className={innerClassName}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* translateZ inside the preserve-3d parent gives the contents real
            depth, so they sit above the card face instead of being painted on
            a rotating billboard. */}
        <div className="h-full" style={{ transform: `translateZ(${lift}px)` }}>
          {children}
        </div>
      </motion.div>
      </motion.div>
    </div>
  );
};

export default Tilt3D;
