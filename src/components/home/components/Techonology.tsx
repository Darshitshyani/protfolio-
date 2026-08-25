import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { theme } from "@/theme";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  EASE,
  HoverLift,
  Reveal,
  SplitReveal,
  Stagger,
  StaggerItem,
  useReducedMotion,
} from "@/components/shared/motion";
import { PIMW } from "@/untils/data/pimw";
import {
  Figma,
  Flutter,
  Laravel,
  Mongodb,
  NextJs,
  NodeJs,
  PhotoShop,
  Php,
  Python,
  ShopifyFullLogo,
  Tailwind,
  TypeScript,
  reactLogo,
} from "@/untils/images";

type LogoSource = React.ComponentProps<typeof Image>["src"];

interface TechLogo {
  src: LogoSource;
  /** Real alt text — the rest of this repo ships alt="not found". */
  alt: string;
}

interface TechGroup {
  label: string;
  /** Announced on the tab list so the group reads as more than one word. */
  logos: TechLogo[];
  /** Named capabilities that have no logo of their own. */
  tags?: string[];
  footnote?: {
    text: string;
    linkLabel: string;
    href: string;
  };
}

/**
 * Shopify gets its own tab rather than a logo dropped into Backend or
 * Frontend: a Shopify build is a platform, not a library — themes, app blocks
 * and Functions all sit inside it — and a dedicated tab is the only place that
 * story can be told next to the app we actually publish on the App Store.
 */
const TECH_GROUPS: TechGroup[] = [
  {
    label: "Backend",
    logos: [
      { src: NodeJs, alt: "Node.js" },
      { src: Laravel, alt: "Laravel" },
      { src: Mongodb, alt: "MongoDB" },
      { src: Php, alt: "PHP" },
      { src: Python, alt: "Python" },
    ],
  },
  {
    label: "Frontend",
    logos: [
      { src: reactLogo, alt: "React" },
      { src: NextJs, alt: "Next.js" },
      { src: Tailwind, alt: "Tailwind CSS" },
      { src: Flutter, alt: "Flutter" },
      { src: TypeScript, alt: "TypeScript" },
    ],
  },
  {
    label: "Design",
    logos: [
      { src: PhotoShop, alt: "Adobe Photoshop" },
      { src: Figma, alt: "Figma" },
    ],
  },
  {
    label: "Shopify",
    logos: [{ src: ShopifyFullLogo, alt: "Shopify" }],
    tags: [
      "Liquid",
      "Theme app blocks",
      "Shopify Functions",
      "Cart Transform",
      "Shopify Admin",
      "Checkout",
    ],
    footnote: {
      text: `${PIMW.name} is our own app on the Shopify App Store.`,
      linkLabel: "View the listing",
      href: PIMW.appStoreUrl,
    },
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

/**
 * Same contract as before — role="tabpanel", the `hidden` attribute, the
 * `simple-tabpanel-*` id and the `Box sx={{ p: 3 }}` body. The only change is
 * that the body now lives inside an <AnimatePresence>, so the outgoing panel
 * fades out instead of vanishing. `hidden` is therefore held open until that
 * exit finishes; every panel still renders, so each tab's aria-controls always
 * resolves to a real element.
 */
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const active = value === index;
  const [visible, setVisible] = React.useState(active);

  React.useEffect(() => {
    if (active) setVisible(true);
  }, [active]);

  return (
    <div
      role="tabpanel"
      hidden={!visible}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <AnimatePresence
        initial={false}
        onExitComplete={() => {
          // Guard against a fast A → B → A click: the exit can land after the
          // panel is active again, which would hide live content.
          if (!active) setVisible(false);
        }}
      >
        {active && (
          <PanelBody key={index}>
            <Box sx={{ p: 3 }}>{children}</Box>
          </PanelBody>
        )}
      </AnimatePresence>
    </div>
  );
}

/** The fading half of a tab panel. Reduced motion gets a plain cut. */
function PanelBody({ children }: { children?: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TechGroupContent({ group }: { group: TechGroup }) {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <Stagger
        className="flex flex-wrap gap-5 items-center justify-center"
        stagger={0.07}
        amount={0.1}
      >
        {group.logos.map((logo) => (
          <StaggerItem
            key={logo.alt}
            className="flex items-center justify-center"
          >
            <HoverLift lift={6}>
              {/* Brand SVGs bake their own colours — php, mongodb, laravel and
                  the Shopify wordmark are near-black artwork that disappears on
                  the dark page. Every logo therefore sits on the SAME
                  always-light chip (static-white never flips), so the row reads
                  as one deliberate brand wall in both themes. The box is a
                  fixed size and the mark is contained inside it, so a tall mark
                  (Flutter) and a wide one (Next.js) still line up. */}
              <div className="flex h-[84px] w-[128px] items-center justify-center rounded-xl border border-black-200 bg-static-white p-3 shadow-sm sm:h-[100px] sm:w-[178px]">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  className="h-auto max-h-[56px] w-[100px] max-w-full object-contain sm:max-h-[72px] sm:w-[150px]"
                />
              </div>
            </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>

      {group.tags && (
        <Stagger
          className="w-full"
          stagger={0.05}
          delayChildren={0.12}
          amount={0.1}
        >
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {group.tags.map((tag) => (
              <li key={tag}>
                <StaggerItem
                  y={10}
                  className="inline-flex items-center rounded-full border border-shopify-200 bg-shopify-100 px-3 py-1 text-[13px] font-medium text-shopify-700"
                >
                  {tag}
                </StaggerItem>
              </li>
            ))}
          </ul>
        </Stagger>
      )}

      {group.footnote && (
        <p className="max-w-[520px] text-[14px] text-black-700 md:text-[15px]">
          {group.footnote.text}{" "}
          <a
            href={group.footnote.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-shopify-700 underline underline-offset-2 transition-colors duration-200 hover:text-shopify-600 dark:hover:text-shopify-400"
          >
            {group.footnote.linkLabel}
          </a>
        </p>
      )}
    </div>
  );
}

export default function Techology() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <section className="text-center my-10 w-full px-4" id="hire">
      <div className="flex w-full flex-col justify-center items-center mt-5">
        <Reveal>
          <p className="text-[24px] sm:text-[30px] text-black-800">Our</p>
        </Reveal>
        <h2 className="font-display text-[28px] md:text-[34px] lg:text-[40px] font-bold tracking-tight text-common-black">
          <SplitReveal text="Tech Stack" delay={0.08} />
        </h2>
      </div>
      <Box
        sx={{ width: "100%" }}
        className="mt-5 w-full flex justify-center flex-col items-center"
      >
        <Box
          sx={{ fontFamily: "inherit", maxWidth: "100%" }}
          className="w-full flex justify-center"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Tech stack categories"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              maxWidth: "100%",
              // MUI's palette is authored light-mode, so anything that falls
              // back to `text.secondary` (tab labels, scroll buttons) renders
              // near-black and disappears on the dark page. Both are pinned to
              // the same CSS variables Tailwind reads, so they follow the theme.
              color: "rgb(var(--pp-neutral-700))",
              " & .MuiTabs-indicator": {
                bgcolor: theme.palette.primary.main,
              },
              "& .MuiTabs-scrollButtons.Mui-disabled": { opacity: 0.3 },
            }}
          >
            {TECH_GROUPS.map((group, index) => (
              <Tab
                key={group.label}
                label={group.label}
                sx={{
                  color: "rgb(var(--pp-neutral-700))",
                  "&:hover": { color: theme.palette.primary.main },
                  "&.Mui-selected": {
                    color: theme.palette.primary.main,
                  },
                }}
                {...a11yProps(index)}
                style={{ fontFamily: "inherit" }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Every panel shares one grid cell, so the outgoing panel can fade out
            on top of the incoming one without shifting the page. */}
        <div className="grid w-full min-h-[240px] place-items-center">
          {TECH_GROUPS.map((group, index) => (
            <CustomTabPanel
              key={group.label}
              value={value}
              index={index}
              className="col-start-1 row-start-1 w-full"
            >
              <TechGroupContent group={group} />
            </CustomTabPanel>
          ))}
        </div>
      </Box>
    </section>
  );
}
