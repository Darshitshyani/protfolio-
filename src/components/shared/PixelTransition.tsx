import * as React from "react";

/**
 * PixelTransition — pixel-dissolve between two pieces of content on hover.
 *
 * Ported from React Bits (reactbits.dev/animations/pixel-transition). The
 * behaviour is unchanged: a gridSize×gridSize field of squares switches on in
 * random order, the underlying content swaps while the field is opaque, then
 * the squares switch off in random order.
 *
 * WHAT CHANGED FROM UPSTREAM
 *
 * 1. NO GSAP. Upstream drives this with `gsap.to(..., { stagger: { from:
 *    'random' } })` plus a `delayedCall`. GSAP was deliberately removed from
 *    this project (it cost ~50 kB on every route), so re-adding it for a hover
 *    effect would be a bad trade. The same result comes from one rAF loop:
 *    with a pre-shuffled reveal order, the number of visible squares at time t
 *    is just `floor(progress * total)`. That is also cheaper than upstream's
 *    approach, which schedules one tween per square (49 at the default grid).
 * 2. SSR SAFE. Upstream reads `window`/`navigator` during render to detect
 *    touch, which throws on the server in the Pages Router. Moved into an
 *    effect.
 * 3. REDUCED MOTION. Upstream has none. Here the field never animates and the
 *    content swaps directly, which is the honest resting state.
 * 4. SIZING. Upstream ships `width: 300px` and a `2px solid #fff` border in
 *    CSS, sized for its demo. This component is layout-neutral so it can sit
 *    inside an existing card.
 */

export interface PixelTransitionProps {
  /** Resting content. */
  firstContent: React.ReactNode;
  /** Revealed while hovered/focused. */
  secondContent: React.ReactNode;
  /** Squares per side. 7 is upstream's default; higher = finer, more nodes. */
  gridSize?: number;
  /** Any CSS colour. Defaults to currentColor so the parent can tint it. */
  pixelColor?: string;
  /** Seconds for the field to fill (and, separately, to clear). */
  animationStepDuration?: number;
  /** Once revealed, stay revealed. */
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/** Fisher-Yates — the reveal order, shuffled once per grid. */
const shuffledOrder = (n: number) => {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const PixelTransition = ({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "currentColor",
  animationStepDuration = 0.35,
  once = false,
  className = "",
  style,
}: PixelTransitionProps) => {
  const total = gridSize * gridSize;
  const [active, setActive] = React.useState(false);
  const [visible, setVisible] = React.useState(0); // squares currently shown
  const [isTouch, setIsTouch] = React.useState(false);
  const [reduce, setReduce] = React.useState(false);

  // Browser capability checks belong in effects — reading them at render is an
  // SSR crash in the Pages Router and a hydration mismatch in the best case.
  React.useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Stable per-instance order, so the dissolve pattern does not change on every
  // hover — re-shuffled only if the grid size does.
  const order = React.useMemo(() => shuffledOrder(total), [total]);

  const rafRef = React.useRef<number | null>(null);
  const run = React.useCallback(
    (to: boolean) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      if (reduce) {
        setActive(to);
        setVisible(0);
        return;
      }

      const step = animationStepDuration * 1000;
      const start = performance.now();
      let swapped = false;

      const tick = (now: number) => {
        const t = now - start;
        if (t < step) {
          // Phase 1 — fill.
          setVisible(Math.floor((t / step) * total));
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        if (!swapped) {
          // Field is full: swap the content behind it, unseen.
          swapped = true;
          setVisible(total);
          setActive(to);
        }
        const t2 = t - step;
        if (t2 < step) {
          // Phase 2 — clear.
          setVisible(total - Math.floor((t2 / step) * total));
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        setVisible(0);
        rafRef.current = null;
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [animationStepDuration, reduce, total]
  );

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const enter = () => {
    if (!active) run(true);
  };
  const leave = () => {
    if (active && !once) run(false);
  };

  const size = 100 / gridSize;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseEnter={isTouch ? undefined : enter}
      onMouseLeave={isTouch ? undefined : leave}
      onFocus={enter}
      onBlur={leave}
      // Tapping is the touch equivalent of hover here.
      onClick={isTouch ? () => run(!active) : undefined}
    >
      {/* BOTH layers stay mounted and are toggled by opacity. Conditionally
          rendering the second one would mean its <Image> only starts loading on
          first hover — the pixel field would finish and reveal an empty box
          while the network fetch ran. Upstream keeps both in the DOM for the
          same reason (it toggles `display`); opacity additionally avoids a
          layout pass on every transition. */}
      <div
        className="absolute inset-0 grid place-items-center transition-opacity duration-150"
        style={{ opacity: active ? 0 : 1 }}
      >
        {firstContent}
      </div>
      <div
        className="absolute inset-0 grid place-items-center transition-opacity duration-150"
        style={{ opacity: active ? 1 : 0 }}
      >
        {secondContent}
      </div>

      {/* The pixel field. aria-hidden: it is pure transition chrome, and both
          contents are real DOM that a screen reader reaches directly. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {order.slice(0, visible).map((idx) => {
          const row = Math.floor(idx / gridSize);
          const col = idx % gridSize;
          return (
            <span
              key={idx}
              className="absolute block"
              style={{
                width: `${size}%`,
                height: `${size}%`,
                left: `${col * size}%`,
                top: `${row * size}%`,
                backgroundColor: pixelColor,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PixelTransition;
