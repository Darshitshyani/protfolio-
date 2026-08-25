import React from "react";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { FolderCopy } from "@mui/icons-material";
import { CountUp, Stagger, StaggerItem } from "@/components/shared/motion";
import { GradientBeam } from "@/components/shared/backgrounds";

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
 * Figures are unchanged: 3+ years, 10+ clients, 20+ projects.
 */

interface Stat {
  /** The number the counter lands on. */
  value: number;
  /** Two-line label, exactly as it read before. */
  lead: string;
  tail: string;
  icon: React.ReactNode;
}

const STATS: Stat[] = [
  {
    value: 3,
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
];

const ProjectWork = () => {
  return (
    <div className="w-full mb-[40px] px-4">
      <Stagger
        className="flex flex-wrap gap-5 items-center justify-center md:justify-around"
        stagger={0.1}
        amount={0.3}
      >
        {STATS.map((stat) => (
          <StaggerItem
            key={stat.tail}
            className="flex items-center gap-4 sm:gap-2"
          >
            <span
              aria-hidden="true"
              className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] flex items-center justify-center border rounded-full text-pink-500 shadow-lg bg-pink-100 border-pink-600 shrink-0"
            >
              {stat.icon}
            </span>
            <div className="flex flex-col items-center sm:items-start">
              <p className="font-display text-[26px] sm:text-[32px] font-bold leading-none tracking-tight text-common-black">
                <CountUp value={stat.value} suffix="+" duration={1.4} />
              </p>
              <p className="mt-1 font-semibold text-[15px] sm:text-[17px] text-black-700 text-center sm:text-left">
                {stat.lead}
                <br />
                {stat.tail}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Closes the strip so it reads as a divider, not a gap. */}
      <GradientBeam className="mx-auto mt-10 w-full max-w-[900px]" />
    </div>
  );
};

export default ProjectWork;
