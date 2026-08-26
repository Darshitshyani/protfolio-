import React, { useEffect, useRef, useCallback, type CSSProperties, type ReactNode } from 'react';
// Styles live in src/styles/globals.css (.electric-border and friends):
// the Pages Router only allows global CSS to be imported from _app.

/* ── VALUE-NOISE HASH ──────────────────────────────────────────────────────
 *
 * Upstream hashes with `Math.sin(x * 12.9898) * 43758.5453 % 1` — the GLSL
 * one-liner, transplanted to JS where it is not free. It is called four times
 * per noise2D, twice per octave-stack, twice per sample: with the old
 * constants that was ~80 Math.sin per SAMPLE and ~50k per border per frame,
 * and this page draws up to fifteen borders.
 *
 * A precomputed table gives the same thing — a deterministic, uncorrelated
 * value per integer — for an integer multiply, an xorshift and an array read.
 * The table is filled once at module scope and shared by every instance.
 *
 * Range is (-1, 1) because that is what `sin(x) * k % 1` produces (the modulo
 * keeps the sign), and the displacement maths downstream is tuned for it.
 * `Math.imul` rather than `*` so a large `x` wraps at 32 bits instead of
 * quietly losing precision past 2^53 — `x` grows with elapsed time.
 */
const HASH_SIZE = 2048;
const HASH_MASK = HASH_SIZE - 1;
const HASH = (() => {
  const table = new Float32Array(HASH_SIZE);
  // Deterministic seed, not Math.random(): the border then looks the same on
  // the server-rendered first frame as it does on every reload.
  let seed = 0x9e3779b9;
  for (let i = 0; i < HASH_SIZE; i++) {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    seed |= 0;
    table[i] = (seed >>> 0) / 0x7fffffff - 1;
  }
  return table;
})();

const hash1D = (x: number): number => {
  let h = Math.imul(x | 0, 0x27d4eb2d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  return HASH[h & HASH_MASK];
};

interface ElectricBorderProps {
  children?: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#1E90FF', // site accent; upstream ships a purple demo colour
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className,
  style
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  const noise2D = useCallback(
    (x: number, y: number): number => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;

      const a = hash1D(i + j * 57);
      const b = hash1D(i + 1 + j * 57);
      const c = hash1D(i + (j + 1) * 57);
      const d = hash1D(i + 1 + (j + 1) * 57);

      const ux = fx * fx * (3.0 - 2.0 * fx);
      const uy = fy * fy * (3.0 - 2.0 * fy);

      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    },
    []
  );

  const octavedNoise = useCallback(
    (
      x: number,
      octaves: number,
      lacunarity: number,
      gain: number,
      baseAmplitude: number,
      baseFrequency: number,
      time: number,
      seed: number
    ): number => {
      let y = 0;
      // Octave 0 is skipped outright. Upstream multiplies it by `baseFlatness`,
      // which is 0 here — so it computed a full octave of noise every sample
      // and threw the result away.
      let amplitude = baseAmplitude * gain;
      let frequency = baseFrequency * lacunarity;

      for (let i = 1; i < octaves; i++) {
        y += amplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= lacunarity;
        amplitude *= gain;
      }

      return y;
    },
    [noise2D]
  );

  const getCornerPoint = useCallback(
    (
      centerX: number,
      centerY: number,
      radius: number,
      startAngle: number,
      arcLength: number,
      progress: number
    ): { x: number; y: number } => {
      const angle = startAngle + progress * arcLength;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    },
    []
  );

  const getRoundedRectPoint = useCallback(
    (t: number, left: number, top: number, width: number, height: number, radius: number): { x: number; y: number } => {
      const straightWidth = width - 2 * radius;
      const straightHeight = height - 2 * radius;
      const cornerArc = (Math.PI * radius) / 2;
      const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
      const distance = t * totalPerimeter;

      let accumulated = 0;

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + radius + progress * straightWidth, y: top };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left + width, y: top + radius + progress * straightHeight };
      }
      accumulated += straightHeight;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + width - radius - progress * straightWidth, y: top + height };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left, y: top + height - radius - progress * straightHeight };
      }
      accumulated += straightHeight;

      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
    },
    [getCornerPoint]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── COST CONSTANTS ───────────────────────────────────────────────────
    // `octaves` was 10, of which octave 0 was multiplied by a zero
    // `baseFlatness` and the tail was invisible: at gain 0.7 against
    // displacement 60, octaves 5-9 together contribute at most ~3px of
    // high-frequency wiggle to a 1px stroke that .eb-glow-* then blurs. Four
    // live octaves (1-4) is the whole visible shape of the arc for well under
    // half the noise work.
    const octaves = 5;
    const lacunarity = 1.6;
    const gain = 0.7;
    const amplitude = chaos;
    const frequency = 10;
    const displacement = 60;
    // The arc's peak excursion is `chaos * displacement * Σ gain^i`, which at
    // chaos 0.12 over these octaves is ~13px. 60px of margin per side was
    // sizing a canvas ~4x larger in area than the effect can ever reach.
    const borderOffset = 24;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width + borderOffset * 2;
      const height = rect.height + borderOffset * 2;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      return { width, height };
    };

    // ── THE BACKING STORE IS ALLOCATED LAZILY, AND RELEASED OFF SCREEN ───
    // A card-sized canvas at dpr 2 is ~2-3MB, and this page mounts up to
    // fifteen of them — several of which are react-slick's infinite-mode
    // clones that are never on screen at all. The IntersectionObserver below
    // already owns the rAF loop; it now owns the memory too. Setting
    // width/height to 0 frees the backing store outright, and the next entry
    // re-sizes before the first frame is drawn.
    let width = 0;
    let height = 0;
    let sized = false;
    let lastDpr = Math.min(window.devicePixelRatio || 1, 2);

    const ensureSize = () => {
      const next = updateSize();
      width = next.width;
      height = next.height;
      sized = true;
      lastDpr = Math.min(window.devicePixelRatio || 1, 2);
    };

    const releaseSize = () => {
      if (!sized) return;
      canvas.width = 0;
      canvas.height = 0;
      sized = false;
    };

    const renderFrame = (currentTime: number) => {
      if (!canvas || !ctx || !sized) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (dpr !== lastDpr) {
        lastDpr = dpr;
        const newSize = updateSize();
        width = newSize.width;
        height = newSize.height;
      }

      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      timeRef.current += deltaTime * speed;
      lastFrameTimeRef.current = currentTime;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const scale = displacement;
      const left = borderOffset;
      const top = borderOffset;
      const borderWidth = width - 2 * borderOffset;
      const borderHeight = height - 2 * borderOffset;
      const maxRadius = Math.min(borderWidth, borderHeight) / 2;
      const radius = Math.min(borderRadius, maxRadius);

      const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
      // One sample every 6px rather than every 2px. The stroke is 1px and then
      // blurred by .eb-glow-1/2, so the extra vertices were not distinguishable
      // — they were three times the noise work for the same picture.
      const sampleCount = Math.max(64, Math.floor(approximatePerimeter / 6));

      ctx.beginPath();

      for (let i = 0; i <= sampleCount; i++) {
        const progress = i / sampleCount;

        const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

        const xNoise = octavedNoise(
          progress * 8,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          timeRef.current,
          0
        );
        const yNoise = octavedNoise(
          progress * 8,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          timeRef.current,
          1
        );

        const displacedX = point.x + xNoise * scale;
        const displacedY = point.y + yNoise * scale;

        if (i === 0) {
          ctx.moveTo(displacedX, displacedY);
        } else {
          ctx.lineTo(displacedX, displacedY);
        }
      }

      ctx.closePath();
      ctx.stroke();

    };

    const loop = (currentTime: number) => {
      renderFrame(currentTime);
      animationRef.current = requestAnimationFrame(loop);
    };

    // NOTE: the IntersectionObserver below owns starting the loop AND sizing
    // the canvas — a resize while the border is parked off screen must not
    // re-allocate what was just released.
    const resizeObserver = new ResizeObserver(() => {
      if (!sized) return;
      ensureSize();
    });
    resizeObserver.observe(container);

    // Reduced motion: draw one static frame and stop. Upstream has no guard and
    // animates unconditionally. Still gated on visibility, because the memory
    // argument holds whether or not the arc is moving.
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only animate while on screen. Upstream keeps one rAF per instance running
    // forever — with a grid of these that is a permanent frame cost for borders
    // nobody is looking at.
    const io = new IntersectionObserver(
      entries => {
        const visible = entries.some(e => e.isIntersecting);
        if (visible) {
          if (!sized) ensureSize();
          if (still) {
            renderFrame(performance.now());
            return;
          }
          if (animationRef.current === null) {
            // Without this the first delta is `performance.now()` — the whole
            // page uptime in seconds — which throws the noise clock far ahead
            // and makes the arc pop on its first frame.
            lastFrameTimeRef.current = performance.now();
            animationRef.current = requestAnimationFrame(loop);
          }
        } else {
          if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
          releaseSize();
        }
      },
      { rootMargin: '120px' }
    );
    io.observe(container);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      io.disconnect();
      resizeObserver.disconnect();
    };
  }, [color, speed, chaos, borderRadius, octavedNoise, getRoundedRectPoint]);

  const vars = {
    '--electric-border-color': color,
    borderRadius
  } as CSSProperties;

  return (
    <div ref={containerRef} className={`electric-border ${className ?? ''}`} style={{ ...vars, ...style }}>
      <div className="eb-canvas-container">
        <canvas ref={canvasRef} className="eb-canvas" />
      </div>
      <div className="eb-layers">
        <div className="eb-glow-1" />
        <div className="eb-glow-2" />
        <div className="eb-background-glow" />
      </div>
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;
