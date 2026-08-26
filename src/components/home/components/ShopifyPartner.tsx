import * as React from "react";
import Tilt3D from "@/components/shared/Tilt3D";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type MotionProps } from "motion/react";

import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import BrushOutlined from "@mui/icons-material/BrushOutlined";
import CodeOutlined from "@mui/icons-material/CodeOutlined";
import ExtensionOutlined from "@mui/icons-material/ExtensionOutlined";
import ImageOutlined from "@mui/icons-material/ImageOutlined";
import LocalOfferOutlined from "@mui/icons-material/LocalOfferOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import PaletteOutlined from "@mui/icons-material/PaletteOutlined";
import PrintOutlined from "@mui/icons-material/PrintOutlined";
import RocketLaunchOutlined from "@mui/icons-material/RocketLaunchOutlined";
import SellOutlined from "@mui/icons-material/SellOutlined";
import ShoppingCartCheckoutOutlined from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import SpeedOutlined from "@mui/icons-material/SpeedOutlined";
import StarRounded from "@mui/icons-material/StarRounded";
import StraightenOutlined from "@mui/icons-material/StraightenOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";

import {
  CountUp,
  FadeIn,
  HoverLift,
  Reveal,
  ScaleIn,
  SlideIn,
  SplitReveal,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import {
  BorderBeam,
  GridPattern,
  SoftBand,
  SpotlightCard,
} from "@/components/shared/backgrounds";
import PixelTransition from "@/components/shared/PixelTransition";
import ElectricBorder from "@/components/shared/backgrounds/ElectricBorder";
import PixelCard from "@/components/shared/PixelCard";
import { Parallax } from "@/components/shared/scroll";
import { APP_PORTFOLIO, MERCHANT_COUNT, SHOPIFY_APPS, type ShopifyApp } from "@/untils/data/shopifyApps";
import { PIMW, PIMW_HIGHLIGHTS, type PimwIconKey } from "@/untils/data/pimw";
import { AppIconDeliveryTimer, AppIconPimw, AppIconPxSchedule, AppIconTailorSizeGuide, ShopifyLogo } from "@/untils/images";

/**
 * Home-page Shopify band (`id="shopify"`).
 *
 * Three jobs, in this order:
 *  1. Establish Pixels Piece as a Shopify Partner that builds on the platform.
 *  2. Lead with the PORTFOLIO — every app we publish on the App Store, as a
 *     teaser strip that hands off to /shopify-apps.
 *  3. Give PIMW the flagship slot: the deepest of the apps we ship, not the
 *     only one we ship. There is no PIMW-only page any more — /shopify-apps
 *     carries all four with their full features and pricing — so the flagship
 *     CTA deep-links into PIMW's section there, and it reads that route out
 *     of the listing data's `internalUrl` rather than typing a path.
 *
 * ── DATA DOCTRINE ──────────────────────────────────────────────────────────
 * Every rating, review count, price and badge comes from
 * `@/untils/data/shopifyApps` — the verified listing data — and the roll-ups
 * come from its `APP_PORTFOLIO`. Nothing here is a literal: a hardcoded "4",
 * "18" or "5.0" is a defect, because the moment a fifth app ships the copy
 * would lie. PIMW's longer-form prose (marketing tagline, summary, feature
 * highlights) still comes from `@/untils/data/pimw`, which is the source of
 * truth for its deep page.
 *
 * No "Built for Shopify" badge is claimed anywhere — none of the apps carries
 * one. See the note in @/untils/data/shopifyApps.
 * so the section cannot render one for an app that has not earned it, and no
 * sentence here says or implies that all of our apps carry it.
 *
 * Nothing here invents install counts, merchant counts, partner tiers or
 * conversion-lift percentages.
 *
 * The "What we build on Shopify" list is a set of agency CAPABILITY statements —
 * what we take on — not client claims and not numbers.
 *
 * Colour doctrine: dodger blue stays the site's action colour, so the internal
 * CTAs are blue. The Shopify greens mark platform context only — this band, the
 * App Store buttons and the "works with" chips.
 * The badge and the App Store fills carry `text-static-white`, which never
 * flips with the theme, because they sit on a coloured fill.
 */

/** Icon for each PIMW highlight we surface, keyed by the data module's key. */
const HIGHLIGHT_ICONS: Partial<Record<PimwIconKey, React.ReactNode>> = {
  preview: <VisibilityOutlined fontSize="small" />,
  swatch: <PaletteOutlined fontSize="small" />,
  image: <ImageOutlined fontSize="small" />,
  pricing: <LocalOfferOutlined fontSize="small" />,
  logic: <AccountTreeOutlined fontSize="small" />,
};

/** Icon per app, keyed by the data module's `icon` union — exhaustive by type. */
const APP_ICONS: Record<ShopifyApp["icon"], React.ReactNode> = {
  personalize: <AutoAwesomeOutlined />,
  sizing: <StraightenOutlined />,
  delivery: <LocalShippingOutlined />,
  discount: <SellOutlined />,
};

interface ShopifyCapability {
  title: string;
  body: string;
  icon: React.ReactNode;
}

/** Agency capability statements — what we build on Shopify. No client claims. */
const SHOPIFY_CAPABILITIES: ShopifyCapability[] = [
  {
    title: "Custom Shopify apps",
    body: "Public and custom apps built on the Admin API and embedded in the Shopify admin, from first scaffold to App Store submission.",
    icon: <ExtensionOutlined />,
  },
  {
    title: "Theme development",
    body: "Online Store 2.0 themes with custom sections and app blocks that merchants can rearrange themselves, without touching Liquid.",
    icon: <BrushOutlined />,
  },
  {
    title: "App extensions",
    body: "Theme app extensions, admin blocks and checkout UI extensions that drop our work into the surfaces merchants already use.",
    icon: <CodeOutlined />,
  },
  {
    title: "Checkout and Cart Transform",
    body: "Shopify Functions work: Cart Transform pricing, cart and checkout validation, delivery and payment customization.",
    icon: <ShoppingCartCheckoutOutlined />,
  },
  {
    title: "Print on demand and personalization",
    body: "Product personalization flows and print-ready artwork pipelines wired through to print-on-demand fulfilment.",
    icon: <PrintOutlined />,
  },
  {
    title: "Headless and Hydrogen",
    body: "Storefront API front ends built with Hydrogen and deployed on Oxygen, for the stores a theme can no longer carry.",
    icon: <RocketLaunchOutlined />,
  },
  {
    title: "Migration and performance",
    body: "Moving stores onto Shopify, reshaping the catalogue and data that comes with them, then tuning storefront speed.",
    icon: <SpeedOutlined />,
  },
];

/**
 * The flagship listing, read out of the portfolio so its rating, review count
 * and badge state can never drift from the other three cards. The `??` keeps
 * the type non-optional under `strict` without inventing a fallback fact.
 */
const FLAGSHIP: ShopifyApp =
  SHOPIFY_APPS.find((app) => app.id === "pimw") ?? SHOPIFY_APPS[0];

interface PortfolioStat {
  id: string;
  /** Fed straight to <CountUp>. Always derived — never a literal. */
  value: number;
  decimals?: number;
  /** Rendered after the figure, e.g. "+" for an approximate floor. */
  suffix?: string;
  label: string;
}

/**
 * Portfolio roll-ups. Values come from APP_PORTFOLIO (listing-verified) except
 * the merchant count, which is first-party — see MERCHANT_COUNT. The two
 * labels that mention a count interpolate it rather than spelling it out, so
 * the whole row stays correct when the portfolio changes.
 */
const PORTFOLIO_STATS: PortfolioStat[] = [
  {
    id: "apps",
    value: APP_PORTFOLIO.appCount,
    label: "apps published on the Shopify App Store",
  },
  {
    id: "reviews",
    value: APP_PORTFOLIO.totalReviews,
    label: "merchant reviews across those listings",
  },
  {
    id: "rating",
    value: APP_PORTFOLIO.rating,
    decimals: 1,
    label: APP_PORTFOLIO.allFiveStar
      ? "star rating on every listing, without exception"
      : "average rating across the portfolio",
  },
  {
    // First-party, not a listing figure — see the note on MERCHANT_COUNT.
    id: "merchants",
    value: MERCHANT_COUNT,
    suffix: "+",
    label: "merchants running our apps on their stores",
  },
];

/** The listing highlights we lead with here. The full set lives on /shopify-apps. */
const LEAD_HIGHLIGHTS = PIMW_HIGHLIGHTS.slice(0, 4);

/**
 * One teaser card in the app strip. Deliberately tighter than the cards on
 * /shopify-apps: icon, short name, listing tagline, rating, price and — only
 */
/** Real App Store listing icons, keyed by ShopifyApp.id. */
const APP_LOGOS: Record<string, StaticImageData> = {
  pimw: AppIconPimw,
  "tailor-size-guide": AppIconTailorSizeGuide,
  "delivery-timer": AppIconDeliveryTimer,
  "px-schedule": AppIconPxSchedule,
};

/* ── Depth and life inside the cards ────────────────────────────────────────
 *
 * WHY EVERY PLATE BELOW OPENS ITS OWN `perspective`
 * <Tilt3D> gives each card a real 3D context, but that context does not survive
 * the trip down into the card's contents. Tilt3D's own `translateZ` lift wrapper
 * leaves `transform-style` at its `flat` default, and <SpotlightCard>,
 * <PixelCard> and <BorderBeam> are every one of them `overflow-hidden` — any
 * `overflow` other than `visible` forces the used value of `transform-style`
 * back to `flat`. A `translateZ` written below one of those is not a bug you can
 * see: it compiles, it renders, it simply does nothing. So each plate here opens
 * a LOCAL perspective root, which nothing above it can flatten, and moves inside
 * that. The bonus is that its depth then reads CONTINUOUSLY, instead of only
 * while the pointer happens to be on the card.
 *
 * WHY THE LOOPS ARE GATED
 * Every loop below is driven from a card-level `useInView`. Off screen the card
 * settles its accents and stops: this page already carries a WebGL logo, a
 * cursor-grid canvas, eight electric borders and a scroll-scrubbed ambient
 * layer, and none of that needs company from animations nobody is looking at.
 */

/**
 * `animate` + `transition` for one looping accent.
 *
 * `run` folds together "on screen" and "motion is welcome". When it is false the
 * element eases back to `rest` ONCE and then holds. The two props have to be
 * handed out together because the transition changes with the target: leaving
 * `repeat: Infinity` on the settle would keep the loop ticking at zero
 * amplitude, which is the entire cost of an animation with none of the payoff.
 *
 * `phase` is not optional decoration. Every card in a row shares one
 * IntersectionObserver threshold, so without a delay all four stars, all four
 * arrows and all four plates start at phase 0 the instant the row arrives.
 * Differing DURATIONS only separate them after several cycles — which is long
 * after the two seconds when someone is actually looking at a row that just
 * landed, so the grid reads as lockstep at exactly the moment lockstep is most
 * visible. A per-index delay separates them from the first frame.
 */
const accent = (
  run: boolean,
  cycle: number,
  keyframes: MotionProps["animate"],
  rest: MotionProps["animate"],
  phase = 0
): MotionProps => ({
  animate: run ? keyframes : rest,
  transition: run
    ? { duration: cycle, delay: phase, repeat: Infinity, ease: "easeInOut" }
    : { duration: 0.4, ease: "easeOut" },
});

/** Extrusion layers. Four reads solid at icon size; more is only more nodes. */
const PLATE_WALLS = [1, 2, 3, 4];

interface DepthPlateProps {
  /** The face. Rendered in flow at Z 0, so it should fill the plate. */
  children: React.ReactNode;
  /** Plate edge in px. */
  size: number;
  /** Seconds for one sway. VARY IT per card. */
  cycle: number;
  /** False parks the plate square-on and stops its loop. */
  run: boolean;
  /**
   * Seconds of delay before the loop's first cycle. Cards in one row share an
   * IntersectionObserver threshold, so without this every plate in the row
   * starts at phase 0 together and a differing `cycle` only pulls them apart
   * several seconds later — long after the moment anyone is looking at a row
   * that just arrived.
   */
  phase?: number;
  /** Fill for the extruded side copies. */
  wallClassName?: string;
  /** Inset + fill for the deep plane behind the plate. */
  haloClassName?: string;
  className?: string;
}

/**
 * A round icon plate with real thickness, on two depth planes.
 *
 * The face sits at Z 0; four copies recede behind it to build the rim — the same
 * construction <Text3D> uses to extrude letters — and a wider halo sits far
 * enough back that the sway visibly slides it against the face. That parallax
 * between the planes is the depth cue, and it is the one thing a flat icon with
 * a drop shadow cannot fake.
 */
const DepthPlate = ({
  children,
  size,
  cycle,
  run,
  phase = 0,
  wallClassName = "bg-shopify-300",
  haloClassName = "-inset-2 bg-shopify-200/60",
  className = "",
}: DepthPlateProps) => (
  <span
    className={`relative block shrink-0 ${className}`}
    style={{ width: size, height: size, perspective: size * 5 }}
  >
    {/* Sway on the group, Z offsets on the children. Both are `transform`, and
        two of them on one node means the later write erases the earlier. */}
    <motion.span
      className="relative block h-full w-full"
      style={{ transformStyle: "preserve-3d" }}
      {...accent(
        run,
        cycle,
        // Both tracks START at the resting angle, because a keyframe array
        // begins AT its first value: written [-15, 15, -15] the plate would jump
        // 15 degrees the instant the card scrolled into view. The X track runs
        // at twice the frequency of the Y track, which keeps the sway off any
        // single axis and stops it looking like a hinge.
        {
          rotateY: [0, -15, 0, 15, 0],
          rotateX: [0, 10, 0, -10, 0, 10, 0, -10, 0],
        },
        { rotateY: 0, rotateX: 0 },
        phase
      )}
    >
      <span
        aria-hidden="true"
        className={`absolute rounded-full ${haloClassName}`}
        style={{ transform: "translateZ(-20px)" }}
      />
      {PLATE_WALLS.map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute inset-0 rounded-full ${wallClassName}`}
          style={{
            // The scale cancels the perspective shrink of a receding copy, so
            // the rim still shows past the face instead of hiding behind it.
            transform: `translateZ(${-i * 3}px) scale(${1 + i * 0.03})`,
            opacity: 0.5 - i * 0.08,
          }}
        />
      ))}
      {children}
    </motion.span>
  </span>
);

const AppTeaser = ({ app, index }: { app: ShopifyApp; index: number }) => {
  const reduce = useReducedMotion();
  const cardRef = React.useRef<HTMLDivElement>(null);
  // One observer per card, feeding every loop inside it.
  const inView = useInView(cardRef, { margin: "120px" });
  const run = inView && !reduce;

  // ElectricBorder draws the arcing rim; the SpotlightCard inside keeps the
  // cursor highlight and the card surface. The border needs a concrete radius
  // (it renders a rounded-rect path on canvas, it cannot read a Tailwind
  // class), so 16 here must stay in step with the rounded-2xl below.
  return (
  <div ref={cardRef} className="h-full">
  <Tilt3D
    className="h-full"
    innerClassName="h-full"
    max={9}
    // Up from 18, so the card face rides further toward the viewer. Not higher
    // than this: <ElectricBorder> sizes its canvas from getBoundingClientRect(),
    // which reports the TRANSFORMED box, so a large lift walks the arc off the
    // real edge of the card.
    lift={26}
    // ── NO IDLE SWAY ON THIS CARD ──────────────────────────────────────────
    // The surface below carries `backdrop-blur-xl backdrop-saturate-150`. A
    // backdrop-filter is only cacheable while the element is STATIONARY
    // relative to what is behind it; rotate it every frame and the browser has
    // to re-sample and re-blur a 24px blur plus a saturate over the whole card,
    // every frame, for all four of them — over a backdrop that is itself moving
    // (SoftBand, GridPattern, the drifting word track, the fixed cursor grid).
    // At rest that frost is rasterized once.
    //
    // The pointer tilt stays: it costs only while a card is hovered, which is
    // one card at a time. The card's continuous life is the ElectricBorder rim
    // and the <DepthPlate> icon, neither of which touches the glass.
    idle={0}
  >
  <ElectricBorder
    // Brighter cyan than the site's dodger blue: the arc is a 1px stroke that
    // then gets blurred, so a mid-tone reads as a dull smudge rather than
    // electricity. The glow layers derive their tint from this via oklch().
    color="#5BD3FF"
    speed={0.8}
    // 0.12 is upstream's default and the value the reference card uses.
    // `chaos` scales a 60px displacement summed over 10 octaves, so it grows
    // fast: at 0.5 the arc swung ~30px per octave and scribbled across the
    // whole card instead of hugging its edge.
    chaos={0.12}
    borderRadius={16}
    className="h-full"
    // Same reasoning as the services row: four side-by-side halos at upstream's
    // 0.3 merge into one wash. Slightly higher than the services cards because
    // these sit on a darker band.
    style={{ "--eb-glow": 0.14, "--eb-glow-blur": "20px" } as React.CSSProperties}
  >
  {/* Glassmorphic surface. No border and no shadow: the electric arc IS the
      card's edge, and a solid 1px rim alongside it reads as two competing
      edges.
      `static-white` at very low alpha, NOT `common-white`: common-white is the
      themed surface token, which in dark mode resolves to #151B2A — tinting a
      dark card with more dark is not a frosted sheen. static-white never
      flips, so the sheen reads on both themes.
      The inset ring is the glass edge highlight; backdrop-blur + saturate
      frost the aurora, word track and cursor grid moving behind. */}
  <SpotlightCard
    color="green"
    className="h-full rounded-2xl bg-common-white/80 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-inset ring-static-white/10"
    contentClassName="h-full"
  >
    <a
      href={app.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col rounded-2xl p-5"
    >
      <span className="flex items-start justify-between gap-3">
        {/* Resting state is the generic category glyph; hovering dissolves it
            through a pixel field into the app's real App Store icon. The
            wrapper is `text-shopify-700` so the field inherits that tint via
            pixelColor="currentColor". */}
        <DepthPlate size={42} cycle={5.5 + index * 0.6} phase={index * 0.5} run={run}>
        <PixelTransition
          gridSize={6}
          animationStepDuration={0.28}
          className="h-full w-full rounded-full border border-shopify-200 bg-shopify-100 text-shopify-700"
          firstContent={
            <span aria-hidden="true" className="flex items-center justify-center">
              {APP_ICONS[app.icon]}
            </span>
          }
          secondContent={
            <Image
              src={APP_LOGOS[app.id]}
              alt=""
              aria-hidden="true"
              width={42}
              height={42}
              className="h-full w-full rounded-full object-cover"
            />
          }
        />
        </DepthPlate>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-black-200 bg-black-100 px-2 py-1 text-[12px] font-medium text-black-700">
          {/* The star is deliberately STILL. It was beating, which made a fourth
              permanent loop on a card the page rhythm budgets at one or two —
              and it beat directly beside the rating figures, so the one thing in
              this pill anybody actually reads had something twitching against it
              every three seconds. The card's life is the rim, the plate and the
              arrow; none of those sits next to a number. */}
          <StarRounded
            aria-hidden="true"
            fontSize="inherit"
            className="text-[14px] text-orange-main"
          />
          {app.rating.toFixed(1)}
          <span className="text-black-600">({app.reviewCount})</span>
        </span>
      </span>

      <span className="mt-4 block text-[16px] font-semibold text-common-black">
        {app.shortName}
      </span>
      <span className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-black-700">
        {app.tagline}
      </span>

      <span className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-black-200 bg-black-100 px-2.5 py-1 text-[11px] font-medium text-black-700">
          {app.priceLabel}
        </span>
      </span>

      <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-medium text-shopify-700">
        View listing
        {/* Drifts up and out, along the direction the glyph points. */}
        <motion.span
          className="inline-flex"
          {...accent(
            run,
            2.8 + index * 0.35,
            { x: [0, 2.5, 0], y: [0, -2.5, 0] },
            { x: 0, y: 0 },
            index * 0.35
          )}
        >
          <OpenInNewRounded aria-hidden="true" fontSize="inherit" className="text-[14px]" />
        </motion.span>
      </span>
    </a>
  </SpotlightCard>
  </ElectricBorder>
  </Tilt3D>
  </div>
  );
};

/**
 * One capability card.
 *
 * ── ONE CONTINUOUS ACCENT, NOT TWO ────────────────────────────────────────
 * Seven of these land on one screenful. The icon used to sit on a looping
 * <DepthPlate> as well as inside a <BorderBeam> that sweeps its rim forever,
 * which put twenty-plus permanent loops on a single screen — in a band the page
 * rhythm budgets at one to two per card. The beam is the better of the two: it
 * traces the card's edge rather than something sitting beside the heading, and
 * it is already there. So the icon is a plain circle again and the beam is this
 * card's life. The pointer tilt below is unaffected; hover is opt-in.
 */
const CapabilityCard = ({
  capability,
  index,
}: {
  capability: ShopifyCapability;
  index: number;
}) => {
  return (
    <div className="h-full">
      <Tilt3D
        className="h-full"
        innerClassName="h-full"
        max={8}
        // No canvas rim on these, so the lift can go further than the app cards.
        lift={26}
        idle={2.4}
        // Seven cards, seven clocks — see the note on <AppTeaser>.
        idleDuration={6.4 + index * 0.65}
      >
        <BorderBeam
          tone="shopify"
          radius={16}
          duration={5}
          className="h-full transition-transform duration-300 hover:-translate-y-1"
          contentClassName="h-full bg-common-white shadow-md transition-shadow duration-300 group-hover:shadow-xl"
        >
          {/* PixelCard fills the beam's inner surface: the beam lights the rim,
              the pixel field blooms inside it. noFocus because the beam shell is
              not focusable and the card has no interactive content — a tabIndex
              here would add a dead tab stop per card. */}
          <PixelCard
            variant="shopify"
            noFocus
            className="h-full rounded-[inherit]"
            contentClassName="flex h-full flex-col p-6"
          >
            {/* Same 46px box the plate occupied, so nothing below it shifts. */}
            <span className="relative block h-[46px] w-[46px] shrink-0">
              <span
                aria-hidden="true"
                className="flex h-full w-full items-center justify-center rounded-full border border-shopify-200 bg-shopify-100 text-shopify-700 transition-colors duration-300 group-hover:border-shopify-300 group-hover:bg-shopify-200"
              >
                {capability.icon}
              </span>
            </span>
            <h4 className="mt-4 text-[16px] font-semibold text-common-black md:text-[18px]">
              {capability.title}
            </h4>
            <p className="mt-2 text-[14px] text-black-700 md:text-[16px]">
              {capability.body}
            </p>
          </PixelCard>
        </BorderBeam>
      </Tilt3D>
    </div>
  );
};

/**
 * The flagship's "what it does" list. Extracted for the same reason as the cards
 * above, except that four plates in one column can share a single observer.
 */
const FlagshipHighlights = () => {
  const reduce = useReducedMotion();
  const listRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { margin: "120px" });
  const run = inView && !reduce;

  return (
    <div ref={listRef} className="w-full">
      <Stagger className="mt-4 w-full" stagger={0.09}>
        <ul className="flex flex-col gap-4">
          {LEAD_HIGHLIGHTS.map((highlight, index) => (
            <li key={highlight.title}>
              <StaggerItem className="flex items-start gap-4 rounded-2xl border border-black-200 bg-common-white p-4 shadow-md transition-shadow duration-300 hover:shadow-xl">
                <DepthPlate
                  size={38}
                  cycle={5.8 + index * 0.7}
                  phase={index * 0.5}
                  run={run}
                  haloClassName="-inset-1 bg-shopify-200/60"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center rounded-full bg-shopify-100 text-shopify-700"
                  >
                    {HIGHLIGHT_ICONS[highlight.icon] ?? (
                      <BoltOutlined fontSize="small" />
                    )}
                  </span>
                </DepthPlate>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold text-common-black md:text-[16px]">
                    {highlight.title}
                  </span>
                  <span className="mt-1 block text-[13px] text-black-700 md:text-[15px]">
                    {highlight.body}
                  </span>
                </span>
              </StaggerItem>
            </li>
          ))}
        </ul>
      </Stagger>
    </div>
  );
};

const ShopifyPartner = () => {
  return (
    <section
      id="shopify"
      aria-labelledby="shopify-heading"
      className="relative w-full overflow-hidden px-4 py-[50px] md:px-[50px] lg:px-[100px]"
    >
      {/* The tint rides its own feathered layer. `band-soft` on the <section>
          masks every painted descendant, so it would fade the Shopify Partner
          badge, the heading and the closing links out along with the band. */}
      <SoftBand className="bg-shopify-100/50" />
      {/* No aurora here. The home page gets ONE, in the hero — every other page
          in the set holds to the same budget. This section already stacks a
          SoftBand tint under a GridPattern, which is enough to differentiate it;
          adding a third layer made it the densest section on the site and tipped
          the page from rich into noisy. */}
      <GridPattern className="text-shopify-300" opacity={0.14} fade="edges" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        {/* ── Section header ─────────────────────────────────────────────── */}
        <FadeIn className="flex w-full flex-col items-center">
          <ScaleIn className="mb-5" delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full border border-shopify-200 bg-common-white px-3 py-1.5 text-[13px] font-medium text-shopify-700 shadow-md">
              <Image
                src={ShopifyLogo}
                alt=""
                aria-hidden="true"
                className="h-[16px] w-[16px]"
              />
              Shopify Partner
            </span>
          </ScaleIn>

          <div
            aria-hidden="true"
            className="mb-4 w-[100px] border-2 border-pink-500"
          />

          <Reveal>
            <p className="text-center text-[20px] text-black-800 md:text-[25px]">
              Built on Shopify
            </p>
          </Reveal>

          <h2
            id="shopify-heading"
            className="mt-1 max-w-[820px] text-center font-display text-[25px] font-bold tracking-tight text-common-black md:text-[35px]"
          >
            <SplitReveal text="A Shopify Partner that" />{" "}
            <SplitReveal
              text="ships its own apps"
              delay={0.3}
              className="text-shopify-700"
            />
          </h2>

          <p className="mt-6 max-w-[760px] text-center text-[15px] text-black-700 md:text-[18px]">
            Pixels Piece designs, builds and supports commerce on Shopify 
            theme work, app extensions, Cart Transform pricing logic and
            headless storefronts. We also publish our own apps on the Shopify
            App Store, so we ship against the same APIs, the same review process
            and the same merchants you do.
          </p>
        </FadeIn>

        {/* ── Portfolio roll-ups ─────────────────────────────────────────── */}
        <Stagger className="mt-10 w-full" stagger={0.08} amount={0.15}>
          <ul className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
            {PORTFOLIO_STATS.map((stat) => (
              <li key={stat.id} className="h-full">
                <StaggerItem className="flex h-full flex-col rounded-2xl border border-black-200 bg-common-white p-4 shadow-md transition-shadow duration-300 hover:shadow-xl md:p-5">
                  <p className="font-display text-[28px] font-bold leading-none text-shopify-700 md:text-[34px]">
                    <CountUp
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix ?? ""}
                      duration={1.2}
                    />
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-black-700 md:text-[14px]">
                    {stat.label}
                  </p>
                </StaggerItem>
              </li>
            ))}
          </ul>
        </Stagger>

        {/* ── The app strip (teaser — the full grid lives on /shopify-apps) ─ */}
        <div className="mt-14 w-full">
          <FadeIn className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-[13px] font-medium uppercase tracking-wide text-black-600">
                On the Shopify App Store
              </p>
              <h3 className="mt-1 font-display text-[20px] font-semibold tracking-tight text-common-black md:text-[25px]">
                <SplitReveal text="Every app we publish" />
              </h3>
            </div>

            <Link
              href="/shopify-apps"
              className="inline-flex w-fit items-center gap-1.5 text-[14px] font-medium text-primary-main underline underline-offset-4 transition-colors duration-200 hover:text-pink-700 dark:hover:text-pink-400 md:text-[15px]"
            >
              See all our apps
              <ArrowForwardRounded fontSize="small" />
            </Link>
          </FadeIn>

          {/* The lift rides this plain wrapper and NOT the <Stagger> inside:
              <Parallax> writes `transform` for the drift and motion writes
              `transform` for the entrance, and on one element the last writer
              silently wins. */}
          <Parallax speed={0.95} className="mt-6 w-full">
            <Stagger className="w-full" stagger={0.08} amount={0.1}>
              <ul className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {SHOPIFY_APPS.map((app, index) => (
                  <li key={app.id} className="h-full">
                    <StaggerItem className="h-full">
                      <AppTeaser app={app} index={index} />
                    </StaggerItem>
                  </li>
                ))}
              </ul>
            </Stagger>
          </Parallax>

        </div>

        {/* ── Flagship: PIMW, the one with a deep page here ──────────────── */}
        <FadeIn
          className="mt-14 w-full rounded-2xl border border-shopify-200 bg-common-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl md:p-10"
          delay={0.1}
        >
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: identity, proof, CTA */}
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-shopify-100 px-3 py-1 text-[13px] font-medium text-shopify-700">
                <BoltOutlined fontSize="small" />
                Flagship of our {APP_PORTFOLIO.appCount} apps
              </span>

              <h3 className="mt-4 break-words text-[20px] font-semibold text-common-black md:text-[25px]">
                {PIMW.longName}
              </h3>
              <p className="mt-2 text-[15px] italic text-black-700 md:text-[18px]">
                &ldquo;{PIMW.marketingTagline}&rdquo;
              </p>

              {/* Rating proof — read from the portfolio data, not restated */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <p className="flex items-baseline gap-1 text-[35px] font-bold text-shopify-700 md:text-[40px]">
                  <CountUp value={FLAGSHIP.rating} decimals={1} duration={1.2} />
                  <span className="text-[16px] font-medium text-black-700 md:text-[18px]">
                    / 5
                  </span>
                </p>
                <div className="min-w-0">
                  <p aria-hidden="true" className="text-[16px] text-orange-main">
                    ★★★★★
                  </p>
                  <p className="text-[13px] text-black-700 md:text-[15px]">
                    <CountUp value={FLAGSHIP.reviewCount} duration={1.2} />{" "}
                    five-star reviews on the Shopify App Store
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[14px] text-black-700 md:text-[16px]">
                {PIMW.summary}
              </p>

              {/* Works with — verbatim from the listing */}
              <div className="mt-5">
                <p className="text-[13px] font-medium text-black-600">
                  Works with
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {FLAGSHIP.worksWith.map((item) => (
                    <li key={item}>
                      <span className="inline-flex items-center rounded-full border border-shopify-200 bg-shopify-100 px-3 py-1 text-[13px] font-medium text-shopify-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap">
                <HoverLift className="w-full sm:w-auto">
                  <a
                    href={FLAGSHIP.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-shopify-500 px-6 py-3 text-[15px] font-medium text-static-white transition-colors duration-200 hover:bg-shopify-600 md:text-[16px]"
                  >
                    View {FLAGSHIP.shortName} on the App Store
                    <OpenInNewRounded fontSize="small" />
                  </a>
                </HoverLift>
              </div>
            </div>

            {/* Right: what the app actually does */}
            <SlideIn from="right" className="min-w-0" delay={0.15}>
              <p className="text-[13px] font-medium uppercase tracking-wide text-black-600">
                What it does
              </p>
              <FlagshipHighlights />
            </SlideIn>
          </div>
        </FadeIn>

        {/* ── Section CTAs ───────────────────────────────────────────────── */}
        <FadeIn
          className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
          delay={0.05}
        >
          <HoverLift className="w-full sm:w-auto">
            <Link
              href="/shopify-apps"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-main px-6 py-3 text-[15px] font-medium text-static-white transition-colors duration-200 hover:bg-pink-700 md:text-[16px]"
            >
              See all our apps
              <ArrowForwardRounded fontSize="small" />
            </Link>
          </HoverLift>

          {/* The deep link is READ from the listing, never typed: PIMW's
              `internalUrl` points at its section on the all-apps page, so this
              CTA follows the data if that anchor ever moves. The `??` keeps it
              a string under `strict` and falls back to the apps page itself,
              which is the correct destination either way. */}
          <HoverLift className="w-full sm:w-auto">
            <Link
              href={FLAGSHIP.internalUrl ?? "/shopify-apps"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary-main bg-common-white px-6 py-3 text-[15px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100 md:text-[16px]"
            >
              Inside {FLAGSHIP.shortName}
              <ArrowForwardRounded fontSize="small" />
            </Link>
          </HoverLift>
        </FadeIn>

        {/* ── What we build on Shopify ───────────────────────────────────── */}
        <div className="mt-14 w-full">
          <FadeIn className="flex w-full flex-col items-center">
            <h3 className="text-center font-display text-[20px] font-semibold tracking-tight text-common-black md:text-[25px]">
              <SplitReveal text="What we build on Shopify" />
            </h3>
            <p className="mt-3 max-w-[720px] text-center text-[14px] text-black-700 md:text-[16px]">
              The same team that ships those App Store apps takes on the rest of
              the platform — apps, themes, extensions and storefronts.
            </p>
          </FadeIn>

          {/* Grid only. Each card is a <BorderBeam> that already runs its own
              hover `-translate-y-1`, so a data-speed on the card would fight
              it; the wrapper keeps the two transforms on separate nodes. */}
          <Parallax speed={0.95} className="mt-8 w-full">
            <Stagger
              className="w-full"
              stagger={0.07}
              delayChildren={0.05}
              amount={0.1}
            >
              <ul className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SHOPIFY_CAPABILITIES.map((capability, index) => (
                  <li key={capability.title} className="h-full">
                    <StaggerItem className="h-full">
                      <CapabilityCard capability={capability} index={index} />
                    </StaggerItem>
                  </li>
                ))}
              </ul>
            </Stagger>
          </Parallax>

          <FadeIn className="mt-10 flex w-full justify-center" delay={0.05}>
            <p className="max-w-[760px] text-center text-[14px] text-black-700 md:text-[16px]">
              Building something on Shopify?{" "}
              <a
                href={FLAGSHIP.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-shopify-700 underline underline-offset-4 transition-colors duration-200 hover:text-shopify-600 dark:hover:text-shopify-400"
              >
                Read what merchants say about {FLAGSHIP.shortName}
              </a>
              , then{" "}
              <Link
                href="/#contact"
                className="font-medium text-primary-main underline underline-offset-4 transition-colors duration-200 hover:text-pink-700 dark:hover:text-pink-400"
              >
                tell us what you need
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ShopifyPartner;
