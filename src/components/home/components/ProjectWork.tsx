import React from "react";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { FolderCopy } from "@mui/icons-material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  AnimatedGradientText,
  CountUp,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import { GradientBeam } from "@/components/shared/backgrounds";
import Tilt3D from "@/components/shared/Tilt3D";
import { MERCHANT_COUNT } from "@/untils/data/shopifyApps";

/**
 * The proof strip that sits directly under the hero.
 *
 * It used to float in dead space between the hero and the services band, so it
 * now reads as a deliberate divider: the figures count up on first view, the
 * three items arrive on a stagger, and a GradientBeam closes the strip off.
 *
 * The old `animate-slide-out` class was a mount-time translateX(100%) sweep —
 * it ignored `prefers-reduced-motion` and pushed the row off-canvas on load.
 * <Stagger> replaces it and honours the reduced-motion contract.
 *
 * Figures: 3+ years, 10+ clients, 20+ projects, 200+ merchants.
 *
 * NOTE ON THE MERCHANT COUNT: it comes from MERCHANT_COUNT in
 * src/untils/data/shopifyApps.ts, which carries the caveat — it is first-party
 * data, not a published listing figure, so it does not self-update.
 *
 * ── WHY EACH STAT IS A CARD NOW ───────────────────────────────────────────
 * <Tilt3D> leans a surface toward the pointer and sways it continuously when
 * the pointer is elsewhere. Applied to four bare icon-and-label rows that read
 * as free-floating text drifting for no reason, so each stat gets a restrained
 * translucent panel for the tilt to catch. The panel is translucent on purpose:
 * the aurora and the page word track still show through, so the strip does not
 * become an opaque bar across the page.
 *
 * Every idleDuration is different (6s, 6.7s, 7.4s, 8.1s). A grid breathing in
 * lockstep reads as a rendering glitch; four unrelated periods read as life.
 */

interface Stat {
  /** The number the counter lands on. */
  value: number;
  /** Two-line label, exactly as it read before. */
  lead: string;
  tail: string;
  icon: React.ReactNode;
}

/**
 * Sweep colours for the figures.
 *
 * NOT the DEFAULT_TEXT_GRADIENT from @/components/shared/motion: its #105699
 * stop measures 2.66:1 against the dark page (#080B12), under the 3:1 floor
 * large bold text needs, so the figure would dim to unreadable once per sweep
 * in the default theme. Every stop here clears 3:1 in BOTH themes —
 * #1E90FF 3.24 / 6.06, #1572CC 4.93 / 3.98, #008060 4.94 / 3.97 (white / dark).
 */
const FIGURE_GRADIENT =
  "linear-gradient(90deg, #1E90FF 0%, #1572CC 30%, #008060 55%, #1E90FF 100%)";

const STATS: Stat[] = [
  {
    value: 5,
    lead: "Years in",
    tail: "Industry",
    icon: (
      <HomeWorkIcon style={{ fontSize: "40px" }} className="sm:text-[50px]" />
    ),
  },
  {
    value: 10,
    lead: "Happy",
    tail: "Clients",
    icon: (
      <SignalCellularAltIcon
        style={{ fontSize: "40px" }}
        className="sm:text-[50px]"
      />
    ),
  },
  {
    value: 20,
    lead: "Completed",
    tail: "Projects",
    icon: (
      <FolderCopy style={{ fontSize: "40px" }} className="sm:text-[50px]" />
    ),
  },
  {
    value: MERCHANT_COUNT,
    lead: "Merchants",
    tail: "Using Our Apps",
    icon: (
      <StorefrontIcon style={{ fontSize: "40px" }} className="sm:text-[50px]" />
    ),
  },
];

const ProjectWork = () => {
  return (
    <div className="w-full mb-[40px] px-4">
      <Stagger
        className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        stagger={0.1}
        amount={0.3}
      >
        {STATS.map((stat, index) => (
          // Three nested elements, three transforms, zero collisions:
          // StaggerItem writes the entrance `y`, Tilt3D's own outer node writes
          // the idle sway and its inner node the pointer tilt. Merged onto one
          // node the later write would erase the earlier and the strip would
          // silently go still.
          <StaggerItem key={stat.tail} className="h-full">
            <Tilt3D
              className="h-full"
              innerClassName="h-full rounded-2xl border border-black-200 bg-common-white/60 px-4 py-5 shadow-md sm:px-5 sm:py-6"
              max={7}
              perspective={800}
              lift={16}
              idle={2.2}
              idleDuration={6 + index * 0.7}
            >
              {/* ONE child element on purpose. Tilt3D wraps its children in an
                  extra translateZ div when the tilt is live and does not when
                  it is disabled (touch / reduced motion), so any layout put on
                  innerClassName would apply to a different set of boxes in the
                  two branches. Keeping the layout here keeps both identical. */}
              {/* `h-full` so the row stays vertically centred now that the four
                  panels stretch to a common height (Tilt3D passes a definite
                  height all the way down; before, each panel collapsed to its
                  own content and the strip had ragged bottoms). It resolves the
                  same on both of Tilt3D's branches, so the two still match. */}
              <div className="flex h-full items-center justify-center gap-4 lg:justify-start">
                <span
                  aria-hidden="true"
                  className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] flex items-center justify-center border rounded-full text-pink-500 shadow-lg bg-pink-100 border-pink-600 shrink-0"
                >
                  {stat.icon}
                </span>
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-display text-[26px] sm:text-[32px] font-bold leading-none tracking-tight text-common-black">
                    {/* The continuous half of the figure: a slow gradient
                        sweep that keeps running long after the CountUp has
                        landed. It rides background-position, not a transform,
                        so it cannot collide with the tilt above it — and the
                        per-card duration keeps the four sweeps out of phase.
                        CountUp still emits its sr-only final value, so the
                        figure is read exactly once and never as a gradient. */}
                    <AnimatedGradientText
                      gradient={FIGURE_GRADIENT}
                      duration={5 + index * 0.6}
                    >
                      <CountUp value={stat.value} suffix="+" duration={1.4} />
                    </AnimatedGradientText>
                  </p>
                  <p className="mt-1 font-semibold text-[15px] sm:text-[17px] text-black-700 text-center sm:text-left">
                    {stat.lead}
                    <br />
                    {stat.tail}
                  </p>
                </div>
              </div>
            </Tilt3D>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Closes the strip so it reads as a divider, not a gap. */}
      <GradientBeam className="mx-auto mt-10 w-full max-w-[900px]" />
    </div>
  );
};

export default ProjectWork;
