import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Site-wide ambient layer, mounted once in the wrapper behind every page.
 *
 * Three very large, very soft colour fields drifting on long mirrored loops,
 * plus a static dot texture. It is `fixed`, so it never adds to page height
 * and never creates horizontal scroll, and it sits at z-0 with the app content
 * above it — the page always has depth, so section bands read as gentle
 * changes in that depth rather than rectangles pasted on flat black.
 *
 * Deliberately slower and fainter than AuroraBackground: this runs on every
 * page at all times, so any per-section aurora still reads as an accent on top.
 * Reduced motion: the fields render in their resting position, no loops start.
 */
const AmbientBackground = () => {
  const reduce = useReducedMotion();

  const fields = [
    {
      className: "left-[-18%] top-[-12%] h-[65vh] w-[65vw]",
      background:
        "radial-gradient(circle at 50% 50%, rgba(30,144,255,0.22), rgba(30,144,255,0) 68%)",
      animate: { x: [0, 70, 0], y: [0, 44, 0], scale: [1, 1.1, 1] },
      duration: 34,
    },
    {
      className: "right-[-20%] top-[16%] h-[62vh] w-[62vw]",
      background:
        "radial-gradient(circle at 50% 50%, rgba(0,150,112,0.18), rgba(0,150,112,0) 68%)",
      animate: { x: [0, -58, 0], y: [0, 62, 0], scale: [1.06, 1, 1.06] },
      duration: 42,
    },
    {
      className: "bottom-[-20%] left-[22%] h-[60vh] w-[68vw]",
      background:
        "radial-gradient(circle at 50% 50%, rgba(86,120,255,0.16), rgba(86,120,255,0) 70%)",
      animate: { x: [0, 52, 0], y: [0, -46, 0], scale: [1, 1.12, 1] },
      duration: 38,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {fields.map((f, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${f.className}`}
          style={{ background: f.background, filter: "blur(90px)" }}
          animate={reduce ? undefined : f.animate}
          transition={
            reduce
              ? undefined
              : {
                  duration: f.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 2.5,
                }
          }
        />
      ))}

      {/* Static dot texture — breaks up the flat gradient without motion cost. */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,168,214,0.10) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 78%)",
        }}
      />
    </div>
  );
};

export default AmbientBackground;
