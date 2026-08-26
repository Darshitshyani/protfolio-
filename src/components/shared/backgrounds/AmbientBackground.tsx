import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Site-wide ambient layer, mounted once in the wrapper behind every page.
 *
 * Three very large, very soft colour fields plus a dot texture. `fixed`, so it
 * never adds page height or horizontal scroll, and it sits behind the app
 * content — the page always has depth, so section bands read as gentle changes
 * in that depth rather than rectangles pasted on flat black.
 *
 * ── TWO MOTION SOURCES ────────────────────────────────────────────────────
 * 1. IDLE DRIFT — long mirrored loops on their own clock, so the page is alive
 *    even when nobody is scrolling.
 * 2. SCROLL SCRUB — the whole layer is additionally driven by document scroll
 *    progress: the fields counter-rotate, spread apart and shift hue as you
 *    move down the page. This is the ScrollTrigger "scrub" idea (see
 *    gsap.com/scroll): the animation's playhead IS the scrollbar, so the
 *    background is somewhere different at the footer than at the hero, and
 *    scrolling back up rewinds it exactly.
 *
 * Done with motion's `useScroll`, not GSAP ScrollTrigger. GSAP was removed from
 * this project on purpose (it cost ~50 kB on every route) and motion is already
 * bundled for every entrance animation, so scrubbing costs nothing extra here.
 *
 * The raw scroll value is passed through a spring so the fields ease toward
 * their target instead of snapping frame-to-frame with the wheel — that is what
 * makes a scrubbed background feel weighty rather than twitchy.
 *
 * Reduced motion: no loops, no scroll binding, fields render at rest.
 */
const AmbientBackground = () => {
  const reduce = useReducedMotion();

  // No target → progress across the whole document, 0 at the top, 1 at the end.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 24,
    restDelta: 0.001,
  });

  // Each field gets a different scrub so they separate as the page moves.
  const rotateA = useTransform(progress, [0, 1], [0, 45]);
  const yA = useTransform(progress, [0, 1], ["0vh", "26vh"]);
  const rotateB = useTransform(progress, [0, 1], [0, -38]);
  const yB = useTransform(progress, [0, 1], ["0vh", "-22vh"]);
  const scaleC = useTransform(progress, [0, 1], [1, 1.45]);
  const yC = useTransform(progress, [0, 1], ["0vh", "-30vh"]);
  // A slow hue sweep across the whole layer ties the three together.
  const hue = useTransform(progress, [0, 1], [0, 40]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);
  // The texture recedes as you descend, which reads as depth rather than motion.
  const gridScale = useTransform(progress, [0, 1], [1, 1.25]);
  const gridOpacity = useTransform(progress, [0, 1], [0.35, 0.12]);

  const fields = [
    {
      className: "left-[-18%] top-[-12%] h-[65vh] w-[65vw]",
      background:
        "radial-gradient(circle at 50% 50%, rgba(30,144,255,0.22), rgba(30,144,255,0) 68%)",
      animate: { x: [0, 70, 0], y: [0, 44, 0], scale: [1, 1.1, 1] },
      duration: 34,
      scrub: { rotate: rotateA, y: yA },
    },
    {
      className: "right-[-20%] top-[16%] h-[62vh] w-[62vw]",
      background:
        "radial-gradient(circle at 50% 50%, rgba(0,150,112,0.18), rgba(0,150,112,0) 68%)",
      animate: { x: [0, -58, 0], y: [0, 62, 0], scale: [1.06, 1, 1.06] },
      duration: 42,
      scrub: { rotate: rotateB, y: yB },
    },
    {
      className: "bottom-[-20%] left-[22%] h-[60vh] w-[68vw]",
      background:
        "radial-gradient(circle at 50% 50%, rgba(86,120,255,0.16), rgba(86,120,255,0) 70%)",
      animate: { x: [0, 52, 0], y: [0, -46, 0], scale: [1, 1.12, 1] },
      duration: 38,
      scrub: { scale: scaleC, y: yC },
    },
  ];

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={reduce ? undefined : { filter }}
    >
      {fields.map((f, i) => (
        // Two nested elements on purpose: the OUTER one carries the scroll
        // scrub and the INNER one the idle loop. Both write `transform`, so on
        // a single node whichever updates last would erase the other.
        <motion.div
          key={i}
          className={`absolute ${f.className}`}
          style={reduce ? undefined : f.scrub}
        >
          <motion.div
            className="h-full w-full rounded-full"
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
        </motion.div>
      ))}

      {/* Static dot texture — breaks up the flat gradient without motion cost. */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,168,214,0.10) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 78%)",
          ...(reduce ? { opacity: 0.35 } : { scale: gridScale, opacity: gridOpacity }),
        }}
      />
    </motion.div>
  );
};

export default AmbientBackground;
