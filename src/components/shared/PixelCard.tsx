import * as React from "react";

/**
 * PixelCard — canvas pixel-bloom on hover/focus.
 *
 * Ported from React Bits (reactbits.dev/components/pixel-card). The Pixel class
 * and the appear/disappear/shimmer logic are kept faithful to the original; what
 * changed is everything that made it a demo-only component:
 *
 *  1. SIZING. The original ships `height: 400px; width: 300px; aspect-ratio: 4/5`
 *     in CSS, which would force every card on this site to one fixed shape. Here
 *     the wrapper is layout-neutral and simply fills whatever grid cell it is
 *     given, so it can wrap the existing cards.
 *  2. PALETTE. The stock variants are slate/sky/yellow/rose. These use the site's
 *     own tokens — dodger blue and Shopify green — so the bloom belongs here.
 *  3. THEME. The original's centre vignette is a hardcoded near-black
 *     (`#09090b`), which would glow *darker* than a light-mode page. It reads
 *     from the surface token instead, so it works in both themes.
 *
 * Reduced motion is handled the same way the original does it: `getEffectiveSpeed`
 * returns 0 and every pixel's delay is zeroed, so the field appears instantly
 * with no travel rather than animating.
 *
 * NOTE ON CRISPNESS: like the original, the canvas is sized in CSS pixels with no
 * devicePixelRatio scaling, so pixels are slightly soft on retina. That is
 * inherent to the effect as published; scaling by DPR would change the pixel
 * count and density and stop looking like the reference.
 */

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

function getEffectiveSpeed(value: number, reducedMotion: boolean) {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  if (value <= min || reducedMotion) return min;
  if (value >= max) return max * throttle;
  return value * throttle;
}

type VariantConfig = { gap: number; speed: number; colors: string };

/** Site-palette variants. `colors` is a comma-separated list, as upstream. */
const VARIANTS: Record<string, VariantConfig> = {
  // Neutral — reads on any surface.
  default: { gap: 5, speed: 35, colors: "#E2E4EB,#B3BACB,#828DA9" },
  // Dodger blue, the site's action colour.
  blue: { gap: 6, speed: 30, colors: "#EBF5FF,#75C2FF,#1E90FF" },
  // Shopify green, for platform surfaces.
  shopify: { gap: 6, speed: 30, colors: "#E8F5F0,#4FAE8E,#008060" },
};

export interface PixelCardProps {
  variant?: keyof typeof VARIANTS;
  gap?: number;
  speed?: number;
  colors?: string;
  /** Skip focus handling when the card already contains its own focusables. */
  noFocus?: boolean;
  className?: string;
  /** Classes for the content layer that sits above the canvas. */
  contentClassName?: string;
  children: React.ReactNode;
}

export const PixelCard = ({
  variant = "default",
  gap,
  speed,
  colors,
  noFocus = false,
  className = "",
  contentClassName = "",
  children,
}: PixelCardProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pixelsRef = React.useRef<Pixel[]>([]);
  const animationRef = React.useRef<number | null>(null);
  const timePreviousRef = React.useRef(0);

  // Read in an effect, not during render: touching matchMedia at render time is
  // an SSR hazard and would differ between server and first client paint.
  const [reducedMotion, setReducedMotion] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const cfg = VARIANTS[variant] ?? VARIANTS.default;
  const finalGap = gap ?? cfg.gap;
  const finalSpeed = speed ?? cfg.speed;
  const finalColors = colors ?? cfg.colors;

  const initPixels = React.useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    if (width === 0 || height === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const colorsArray = finalColors.split(",");
    const pxs: Pixel[] = [];
    const step = Math.max(1, Math.floor(finalGap));
    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        // Delay by distance from centre — this is what makes the field bloom
        // outward from the middle instead of all appearing at once.
        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        pxs.push(
          new Pixel(
            canvasRef.current,
            ctx,
            x,
            y,
            color,
            getEffectiveSpeed(finalSpeed, reducedMotion),
            reducedMotion ? 0 : distance
          )
        );
      }
    }
    pixelsRef.current = pxs;
  }, [finalColors, finalGap, finalSpeed, reducedMotion]);

  const doAnimate = React.useCallback((fnName: "appear" | "disappear") => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60;
    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let allIdle = true;
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i];
      pixel[fnName]();
      if (!pixel.isIdle) allIdle = false;
    }
    // Stop the loop once every pixel has settled — an idle card must not hold
    // a rAF open, or a grid of them would burn frames doing nothing.
    if (allIdle && animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const handleAnimation = React.useCallback(
    (name: "appear" | "disappear") => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(() => doAnimate(name));
    },
    [doAnimate]
  );

  React.useEffect(() => {
    initPixels();
    const observer = new ResizeObserver(() => initPixels());
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [initPixels]);

  const onFocus: React.FocusEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    handleAnimation("appear");
  };
  const onBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    handleAnimation("disappear");
  };

  return (
    <div
      ref={containerRef}
      className={`pixel-card group relative isolate overflow-hidden ${className}`}
      onMouseEnter={() => handleAnimation("appear")}
      onMouseLeave={() => handleAnimation("disappear")}
      onFocus={noFocus ? undefined : onFocus}
      onBlur={noFocus ? undefined : onBlur}
      // Only make the shell focusable when it has no focusable content of its
      // own — otherwise it adds a dead tab stop in front of a real link.
      tabIndex={noFocus ? -1 : 0}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default PixelCard;
