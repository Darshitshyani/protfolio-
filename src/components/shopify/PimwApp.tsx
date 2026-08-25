/**
 * PIMW product page — /shopify-app
 *
 * Every fact about PIMW traces back to `@/untils/data/pimw`, which in turn
 * traces back to the verified product brief (the live Shopify App Store listing
 * and printitmyway.com). The closing "More apps" row traces back to
 * `@/untils/data/shopifyApps`, the portfolio-level source of truth for all four
 * listings. Do not add a claim here that is not in one of those modules: no
 * install/merchant counts, no partner tier, no conversion-lift percentages.
 *
 * ⚠️ The "Built for Shopify" badge is PER-APP. PIMW does NOT carry one, so no
 * badge is ever rendered for it; the other listings render one only where
 * `app.builtForShopify` is true.
 *
 * Pages Router — deliberately no "use client" directive.
 *
 * Palette notes (tailwind.config.ts replaces Tailwind's default palette):
 *  - `pink-*` holds BLUE hex values; `primary-main` === `pink-600` === #1E90FF.
 *  - `black-*` is a cool grey ramp, not black. `common-white` / `common-black`
 *    are the only true white/black tokens — `bg-white` renders nothing.
 *  - `shopify-*` marks Shopify-platform chrome only. Blue stays the action
 *    colour, so every primary CTA on this page is `bg-primary-main`.
 *  - `shopify_lime` is never used for text (1.93:1 on white).
 */

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, animate, motion } from "motion/react";

import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import BuildOutlined from "@mui/icons-material/BuildOutlined";
import CardGiftcardOutlined from "@mui/icons-material/CardGiftcardOutlined";
import CheckRounded from "@mui/icons-material/CheckRounded";
import CheckroomOutlined from "@mui/icons-material/CheckroomOutlined";
import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import EmojiEventsOutlined from "@mui/icons-material/EmojiEventsOutlined";
import ExtensionOutlined from "@mui/icons-material/ExtensionOutlined";
import ImageOutlined from "@mui/icons-material/ImageOutlined";
import InsertDriveFileOutlined from "@mui/icons-material/InsertDriveFileOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import LocalOfferOutlined from "@mui/icons-material/LocalOfferOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import PaletteOutlined from "@mui/icons-material/PaletteOutlined";
import PlaylistAddCheckOutlined from "@mui/icons-material/PlaylistAddCheckOutlined";
import SellOutlined from "@mui/icons-material/SellOutlined";
import ShoppingCartCheckoutOutlined from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import StarRounded from "@mui/icons-material/StarRounded";
import StorefrontOutlined from "@mui/icons-material/StorefrontOutlined";
import StraightenOutlined from "@mui/icons-material/StraightenOutlined";
import TextFieldsOutlined from "@mui/icons-material/TextFieldsOutlined";
import TranslateOutlined from "@mui/icons-material/TranslateOutlined";
import TuneOutlined from "@mui/icons-material/TuneOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";

import {
  AnimatedGradientText,
  CountUp,
  EASE,
  FadeIn,
  HoverLift,
  MarqueeRow,
  Reveal,
  ScaleIn,
  SlideIn,
  SplitReveal,
  Stagger,
  StaggerItem,
  cx,
  useReducedMotion,
} from "@/components/shared/motion";
import {
  AuroraBackground,
  GlowOrb,
  GradientBeam,
  GridPattern,
  SoftBand,
  SpotlightCard,
} from "@/components/shared/backgrounds";
import { BuiltForShopifyBadge } from "@/components/shared/BuiltForShopifyBadge";
import { Parallax, ScrollStage } from "@/components/shared/scroll";
import {
  PIMW,
  PIMW_FEATURE_GROUPS,
  PIMW_HIGHLIGHTS,
  PIMW_PLANS,
  PIMW_PLAN_ROWS,
  PIMW_PRICING_NOTE,
  PIMW_PLATFORM,
  PIMW_REVIEWS,
  PIMW_STATS,
  PIMW_STEPS,
  PIMW_USE_CASES,
  type PimwIconKey,
} from "@/untils/data/pimw";
import {
  APP_PORTFOLIO,
  SHOPIFY_APPS,
  type ShopifyApp,
} from "@/untils/data/shopifyApps";
import { ShopifyLogo } from "@/untils/images";

/* ── icon map ─────────────────────────────────────────────────────────────── */

/**
 * `@/untils/data/pimw` stays JSX-free, so it names icons by key. Every key in
 * `PimwIconKey` is mapped here; adding a key to the union without adding it
 * below is a compile error, which is the point.
 */
const ICON_MAP: Record<PimwIconKey, typeof VisibilityOutlined> = {
  preview: VisibilityOutlined,
  swatch: PaletteOutlined,
  image: ImageOutlined,
  pricing: LocalOfferOutlined,
  logic: AccountTreeOutlined,
  upload: CloudUploadOutlined,
  customize: TuneOutlined,
  inventory: Inventory2Outlined,
  files: InsertDriveFileOutlined,
  install: ExtensionOutlined,
  build: BuildOutlined,
  assign: PlaylistAddCheckOutlined,
  personalize: AutoAwesomeOutlined,
  apparel: CheckroomOutlined,
  gift: CardGiftcardOutlined,
  merch: StorefrontOutlined,
  award: EmojiEventsOutlined,
  language: TranslateOutlined,
  fonts: TextFieldsOutlined,
  speed: BoltOutlined,
  star: StarRounded,
};

/** One icon per "Works with" entry, in listing order. */
const WORKS_WITH_ICONS: Array<typeof VisibilityOutlined> = [
  ShoppingCartCheckoutOutlined,
  AdminPanelSettingsOutlined,
  LocalShippingOutlined,
];

/* ── small shared pieces ──────────────────────────────────────────────────── */

/** The site's section rule: a short blue bar above every section heading. */
const SectionRule = ({ className }: { className?: string }) => (
  <div aria-hidden="true" className={cx("w-[100px] border-2 border-pink-500", className)} />
);

/* ── section bands ────────────────────────────────────────────────────────
 * The page-wide <AmbientBackground/> (mounted once in src/wrapper/wrapper.tsx)
 * drifts behind every section, so an OPAQUE full-width band cuts a rectangle
 * out of it and reads as a colour split. Both band primitives below therefore
 * ride their own absolutely-positioned layer, feathered at the top and bottom
 * edges, with the section content in a sibling `relative z-10` wrapper.
 *
 * Why a layer instead of the mask straight on the section: `band-soft` masks
 * the element AND every painted descendant, so a section carrying it fades its
 * own headings, CTAs and pricing buttons out along with the tint. The tint
 * feathers identically either way — only the content stays solid. This is the
 * site-wide form now; the home and service pages use the same <SoftBand>.
 */

/* The translucent tint band is now the shared <SoftBand> primitive in
 * @/components/shared/backgrounds — every page uses the same one. */

/**
 * The two accent bands (stat strip, final CTA) are DELIBERATELY dark in BOTH
 * themes. `bg-black-900` cannot express that: the neutral ramp inverts in dark,
 * so it would paint a near-white band and the `text-common-white` inside it
 * would vanish. The fill is baked here instead, and every scrap of text sitting
 * on it uses `static-white` so it never flips.
 *
 * The feather is the SAME 9rem as `band-soft`. It used to be 2.5rem, which
 * ramped the largest colour delta on the site (white -> near-black navy in
 * light, #0A0E17 -> #0C417A in dark) across 40px — a visible edge, i.e. the
 * same object as the rejected `bg-black-900` slabs with a different fill.
 * Both host sections therefore carry >= 9rem of vertical padding, so the solid
 * core of the band still sits behind all of the white text.
 */
const DARK_BAND_FILL =
  "linear-gradient(135deg, #0C417A 0%, #08315C 55%, #061D35 100%)";

const DARK_BAND_FEATHER =
  "linear-gradient(to bottom, transparent 0, #000 9rem, #000 calc(100% - 9rem), transparent 100%)";

const DarkBand = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: DARK_BAND_FILL,
      maskImage: DARK_BAND_FEATHER,
      WebkitMaskImage: DARK_BAND_FEATHER,
    }}
  />
);

/** Decorative star row. Always pair it with real text for assistive tech. */
const Stars = ({ className }: { className?: string }) => (
  <span aria-hidden="true" className={cx("inline-flex items-center text-orange-main", className)}>
    {[0, 1, 2, 3, 4].map((index) => (
      <StarRounded key={index} fontSize="small" />
    ))}
  </span>
);

interface AppStoreLinkProps {
  children: React.ReactNode;
  /** Distinguishes several links that share one destination. */
  ariaLabel: string;
  variant?: "primary" | "outline" | "onDark";
  className?: string;
}

/**
 * Every App Store CTA on the page. A real anchor, not a router push — the repo
 * has an existing bug where `router.push()` is handed an https:// URL, which
 * Next cannot navigate.
 */
const AppStoreLink = ({
  children,
  ariaLabel,
  variant = "primary",
  className,
}: AppStoreLinkProps) => (
  <a
    href={PIMW.appStoreUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className={cx(
      "inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-[15px] font-medium transition-colors duration-200 md:text-[16px]",
      variant === "primary" &&
        "bg-primary-main text-static-white shadow-md hover:bg-pink-700",
      variant === "outline" &&
        "border-2 border-primary-main bg-common-white text-primary-main hover:bg-pink-100",
      variant === "onDark" &&
        "border-2 border-static-white/40 bg-transparent-main text-static-white hover:bg-static-white/10",
      className
    )}
  >
    <span>{children}</span>
    <OpenInNewRounded aria-hidden="true" fontSize="small" />
  </a>
);


/* ── section 1: hero ──────────────────────────────────────────────────────── */

const Hero = () => (
  <section
    aria-labelledby="pimw-hero-heading"
    className="relative w-full overflow-hidden px-4 pb-[50px] pt-[120px] md:px-[50px] md:pb-[60px] lg:px-[100px]"
  >
    {/* The hero is the one rich surface on the page: aurora + grid over the
        global ambient mesh. `fade="bottom"` is mandatory — the section clips,
        and a blob still at full alpha at the clip draws a horizontal seam. */}
    <AuroraBackground variant="mixed" intensity={0.45} fade="bottom" />
    <GridPattern className="text-black-300" opacity={0.18} fade="edges" />

    <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-col items-center text-center">
      <Stagger className="min-w-0" stagger={0.09} amount={0.05}>
        <StaggerItem>
          <span className="inline-flex items-center gap-2 rounded-full border border-shopify-border bg-shopify-light px-3 py-1.5">
            <Image
              src={ShopifyLogo}
              alt=""
              aria-hidden="true"
              className="h-[18px] w-[18px]"
            />
            <span className="text-[13px] font-semibold text-shopify-dark">
              Shopify Partner &middot; Pixels Piece
            </span>
          </span>
        </StaggerItem>

        <StaggerItem>
          <h1
            id="pimw-hero-heading"
            className="mt-5 font-display text-[30px] font-bold leading-tight tracking-tight text-common-black lg:text-[40px]"
          >
            <SplitReveal text={PIMW.longName} />
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-3 text-[20px] font-semibold leading-snug text-black-800 md:text-[25px]">
            <AnimatedGradientText>Let your customers design it.</AnimatedGradientText>{" "}
            You just ship it.
          </p>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-black-700 md:text-[18px]">
            Shoppers add engraving, monogram text, photo uploads, swatches and dropdowns right on
            the product page, watch the design update live, and see the price move as they choose.
            You get a print-ready file with the order.
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Stars />
            <span aria-hidden="true" className="text-[15px] font-bold text-common-black">
              {PIMW.rating.toFixed(1)}
            </span>
            <a
              href={PIMW.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-black-700 underline decoration-black-300 underline-offset-4 transition-colors duration-200 hover:text-primary-main md:text-[15px]"
            >
              Rated {PIMW.rating.toFixed(1)} from {PIMW.reviewCount} reviews on the Shopify App
              Store
            </a>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <HoverLift className="w-full sm:w-auto">
              <AppStoreLink
                ariaLabel="View PIMW on the Shopify App Store, opens in a new tab"
                className="sm:w-auto"
              >
                View on Shopify App Store
              </AppStoreLink>
            </HoverLift>
            <HoverLift className="w-full sm:w-auto">
              <a
                href={PIMW.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary-main bg-common-white px-6 py-3 text-[15px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100 sm:w-auto md:text-[16px]"
              >
                <span>Visit printitmyway.com</span>
                <OpenInNewRounded aria-hidden="true" fontSize="small" />
              </a>
            </HoverLift>
          </div>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-5 text-[13px] text-black-600">
            {PIMW.launchedLabel} &middot; Free plan available &middot; No code &middot; Under five
            minutes to install
          </p>
        </StaggerItem>
      </Stagger>

    </div>
  </section>
);

/* ── section 2: stat strip ────────────────────────────────────────────────── */

/* py >= the 9rem DarkBand feather, so every stat sits on the band's solid core
   instead of in the fade. */
const StatStrip = () => (
  <section
    aria-labelledby="pimw-stats-heading"
    className="relative w-full overflow-hidden px-4 py-[150px] md:px-[50px] lg:px-[100px]"
  >
    <DarkBand />
    <h2 id="pimw-stats-heading" className="sr-only">
      PIMW at a glance
    </h2>
    <Stagger className="relative z-10 mx-auto w-full max-w-[1200px]" stagger={0.06}>
      <GradientBeam variant="mixed" className="mb-9 w-full" />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {PIMW_STATS.map((stat) => (
          <li key={stat.id} className="min-w-0">
            <StaggerItem className="flex h-full flex-col items-center text-center">
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className="text-[28px] font-bold leading-none text-pink-400 md:text-[35px]"
              />
              <p className="mt-3 text-[13px] leading-snug text-static-white/70">
                {stat.label}
              </p>
            </StaggerItem>
          </li>
        ))}
      </ul>
      <GradientBeam variant="mixed" className="mt-9 w-full" />
    </Stagger>
  </section>
);

/* ── section 3: what it does ──────────────────────────────────────────────── */

const WhatItDoes = () => (
  <section
    id="what-it-does"
    aria-labelledby="pimw-what-heading"
    className="w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]"
  >
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="max-w-[760px]">
        <SectionRule className="mb-4" />
        <Reveal>
          <p className="text-[20px] text-black-800 md:text-[25px]">What it does</p>
        </Reveal>
        <h2
          id="pimw-what-heading"
          className="mt-1 font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
        >
          <SplitReveal text="What the app does" />
        </h2>
        <FadeIn y={16} delay={0.08}>
          <p className="mt-6 text-[15px] leading-relaxed text-black-700 md:text-[18px]">
            All of them are set up from the Shopify admin without touching a theme file, and every
            one of them is live on the storefront the moment you assign it to a product.
          </p>
        </FadeIn>
      </div>

      <Stagger className="mt-10 w-full">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {PIMW_HIGHLIGHTS.map((highlight, index) => {
            const Icon = ICON_MAP[highlight.icon];
            return (
              <li
                key={highlight.title}
                className={cx("min-w-0", index < 3 ? "lg:col-span-2" : "lg:col-span-3")}
              >
                <StaggerItem className="flex h-full flex-col rounded-2xl border border-black-200 bg-common-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
                  <span className="w-fit rounded-full border border-black-300 p-1">
                    <span className="flex h-[50px] w-[50px] items-center justify-center text-primary-main">
                      <Icon aria-hidden="true" />
                    </span>
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold text-common-black md:text-[18px]">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-black-700 md:text-[16px]">
                    {highlight.body}
                  </p>
                </StaggerItem>
              </li>
            );
          })}
        </ul>
      </Stagger>

      <FadeIn y={16} className="mt-12">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-black-600">
          Built for
        </p>
      </FadeIn>

      <Stagger className="mt-4 w-full" stagger={0.06}>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PIMW_USE_CASES.map((useCase) => {
            const Icon = ICON_MAP[useCase.icon];
            return (
              <li key={useCase.title} className="min-w-0">
                <StaggerItem className="flex h-full gap-3 rounded-xl border-l-2 border-pink-500 bg-black-100 p-4">
                  <Icon aria-hidden="true" className="shrink-0 text-primary-main" fontSize="small" />
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold text-common-black">{useCase.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-black-700">{useCase.body}</p>
                  </div>
                </StaggerItem>
              </li>
            );
          })}
        </ul>
      </Stagger>
    </div>
  </section>
);

/* ── section 4: how it works ──────────────────────────────────────────────── */

const HowItWorks = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="how-it-works"
      aria-labelledby="pimw-steps-heading"
      className="relative w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]"
    >
      <SoftBand className="bg-black-100/50" />
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col items-center">
          <SectionRule className="mb-5" />
          <Reveal>
            <p className="text-center text-[20px] text-black-800 md:text-[25px]">Setup</p>
          </Reveal>
          <h2
            id="pimw-steps-heading"
            className="mt-1 text-center font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
          >
            <SplitReveal text="Live in four steps" />
          </h2>
          <FadeIn y={16} delay={0.08}>
            <p className="mt-6 max-w-[720px] text-center text-[15px] leading-relaxed text-black-700 md:text-[18px]">
              No developer and no theme edits. PIMW installs through app blocks, so it drops into
              every Shopify theme and the whole setup takes under five minutes.
            </p>
          </FadeIn>
        </div>

        <div className="relative mt-12">
          {/* the spine, drawn on scroll — vertical below lg, horizontal above */}
          <motion.div
            aria-hidden="true"
            className="absolute bottom-[12px] left-[27px] top-[28px] w-[2px] origin-top bg-gradient-to-b from-pink-500 via-pink-400 to-transparent-main lg:hidden"
            initial={reduce ? false : { scaleY: 0 }}
            animate={reduce ? { scaleY: 1 } : undefined}
            whileInView={reduce ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.1, ease: EASE }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[27px] hidden h-[2px] origin-left bg-gradient-to-r from-pink-500 via-pink-400 to-pink-200 lg:block"
            initial={reduce ? false : { scaleX: 0 }}
            animate={reduce ? { scaleX: 1 } : undefined}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: EASE }}
          />

          <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
            {PIMW_STEPS.map((step, index) => {
              const Icon = ICON_MAP[step.icon];
              const base = reduce ? 0 : index * 0.14;
              return (
                <li
                  key={step.step}
                  className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  <FadeIn y={0} delay={base} duration={0.45} className="relative z-10 shrink-0">
                    <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 border-pink-500 bg-common-white text-primary-main shadow-md">
                      <Icon aria-hidden="true" />
                    </span>
                  </FadeIn>
                  <FadeIn delay={base + 0.06} className="min-w-0 lg:mt-5">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black-600">
                      Step {step.step}
                    </p>
                    <h3 className="mt-1 text-[16px] font-semibold text-common-black md:text-[18px]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-black-700 md:text-[16px]">
                      {step.body}
                    </p>
                  </FadeIn>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

/* ── section 5: feature matrix ────────────────────────────────────────────── */

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * One stable panel id. `AnimatePresence mode="wait"` keeps a single panel in
 * the DOM at a time, so per-group ids would leave three tabs pointing
 * `aria-controls` at elements that do not exist.
 */
const FEATURE_PANEL_ID = "pimw-feature-panel";

/**
 * THE PAGE'S ONE GIANT WORD — and it lives here rather than behind "How it
 * works", which was the other candidate.
 *
 * Why this section: it is the only one in that stretch of the page carrying no
 * band of its own. "How it works" already runs a <SoftBand> tint plus two
 * gradient spines that draw on scroll, and its four steps are transparent text
 * over open space, so the word would sit directly under every line of body copy
 * and compete with the spine for the same empty background. The feature matrix
 * is untinted, and its content is solid: the tab rail and the `bg-black-100`
 * panel are opaque surfaces that ride up over "PIMW" and occlude it cleanly,
 * which is exactly the read we want. Only the left-aligned intro column sits on
 * the word directly.
 *
 * Neither dark band (the stat strip, the closing CTA) could host it — their
 * fill is a baked navy gradient that would swallow the word — and the pricing
 * cards are far too dense.
 *
 * <ScrollStage> supplies the mandatory `relative overflow-hidden` — the word is
 * wider than the viewport and an unclipped one scrolls the whole page sideways
 * on mobile — and puts the children in its own `relative z-10` layer, so the
 * section padding moved to `className` and the old inner max-width div is now
 * `contentClassName`. `id="features"` still anchors the page nav.
 *
 * The word takes <GiantWord>'s default tone and does not restate it. That
 * default is now `text-black-200/45`: at the old /60 the word composited to
 * rgb(238,239,243) over the white page (NOT #F3F4F7 — that is black-100, an
 * unrelated token) and `text-black-700` intro copy on it measured 4.41:1,
 * under the 4.5:1 AA floor. At /45 the composite is rgb(242,243,246) and the
 * same copy is 4.57:1. Dark mode was never the problem (8.3:1). Tone lives in
 * the primitive because `important: true` in the Tailwind config makes a
 * call-site colour tie with the default on specificity, leaving emit order to
 * pick the winner.
 */
const FeatureMatrix = () => {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const lastIndex = PIMW_FEATURE_GROUPS.length - 1;
  const activeGroup = PIMW_FEATURE_GROUPS[activeIndex];

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextIndex = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }
    if (nextIndex < 0) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <ScrollStage
      id="features"
      aria-labelledby="pimw-features-heading"
      word="PIMW"
      speed={0.6}
      className="px-4 py-[50px] md:px-[50px] lg:px-[100px]"
      contentClassName="mx-auto w-full max-w-[1200px]"
    >
      <div className="max-w-[760px]">
        <SectionRule className="mb-4" />
        <Reveal>
          <p className="text-[20px] text-black-800 md:text-[25px]">Feature matrix</p>
        </Reveal>
        <h2
          id="pimw-features-heading"
          className="mt-1 font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
        >
          <SplitReveal text="Everything in the box, grouped" />
        </h2>
        <FadeIn y={16} delay={0.08}>
          <p className="mt-6 text-[15px] leading-relaxed text-black-700 md:text-[18px]">
            Pick a group to see exactly what ships with the app. What each plan changes is how
            much you can build &mdash; option groups, fields, product assignments and templates.
          </p>
        </FadeIn>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
        <div
          role="tablist"
          aria-label="PIMW feature groups"
          className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap"
        >
          {PIMW_FEATURE_GROUPS.map((group, index) => {
            const Icon = ICON_MAP[group.icon];
            const selected = index === activeIndex;
            return (
              <button
                key={group.group}
                type="button"
                role="tab"
                id={`pimw-tab-${slug(group.group)}`}
                aria-selected={selected}
                aria-controls={FEATURE_PANEL_ID}
                tabIndex={selected ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                onClick={() => setActiveIndex(index)}
                onKeyDown={handleTabKeyDown}
                className={cx(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors duration-200 lg:w-full lg:justify-between lg:rounded-xl lg:px-5 lg:py-3.5 lg:text-[16px]",
                  selected
                    ? "border-primary-main bg-primary-main text-static-white shadow-md"
                    : "border-black-200 bg-common-white text-black-800 hover:border-pink-400 hover:text-primary-main"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon aria-hidden="true" fontSize="small" />
                  {group.group}
                </span>
                <span
                  aria-hidden="true"
                  className={cx(
                    "hidden text-[13px] lg:inline",
                    selected ? "text-static-white" : "text-black-600"
                  )}
                >
                  {group.items.length}
                </span>
              </button>
            );
          })}
        </div>

        <div className="min-w-0 rounded-2xl border border-black-200 bg-black-100 p-6 shadow-md sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeGroup.group}
              id={FEATURE_PANEL_ID}
              role="tabpanel"
              aria-labelledby={`pimw-tab-${slug(activeGroup.group)}`}
              tabIndex={0}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
              className="min-h-[160px]"
            >
              <h3 className="text-[18px] font-semibold text-common-black md:text-[20px]">
                {activeGroup.group}
              </h3>
              <p className="mt-1 text-[13px] text-black-700">
                {activeGroup.items.length} capabilities
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {activeGroup.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black-200 bg-common-white px-3 py-1.5 text-[13px] text-black-800 md:text-[14px]"
                  >
                    <CheckRounded
                      aria-hidden="true"
                      className="text-shopify-main"
                      fontSize="small"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ScrollStage>
  );
};

/* ── section 6: pricing ───────────────────────────────────────────────────── */

const Pricing = () => {
  const reduce = useReducedMotion();
  const [annual, setAnnual] = React.useState(false);

  return (
    <section
      id="pricing"
      aria-labelledby="pimw-pricing-heading"
      className="relative w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]"
    >
      <SoftBand className="bg-pink-100/50" />
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col items-center">
          <SectionRule className="mb-5" />
          <Reveal>
            <p className="text-center text-[20px] text-black-800 md:text-[25px]">Pricing</p>
          </Reveal>
          <h2
            id="pimw-pricing-heading"
            className="mt-1 text-center font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
          >
            <SplitReveal text="Start free, upgrade when you grow" />
          </h2>
          <FadeIn y={16} delay={0.08}>
            <p className="mt-6 max-w-[720px] text-center text-[15px] leading-relaxed text-black-700 md:text-[18px]">
              {PIMW_PRICING_NOTE}
            </p>
          </FadeIn>

          <FadeIn y={16} delay={0.14}>
            <div
              role="group"
              aria-label="Billing period"
              className="mt-8 inline-flex items-center gap-1 rounded-full border border-black-200 bg-common-white p-1 shadow-md"
            >
              <button
                type="button"
                onClick={() => setAnnual(false)}
                aria-pressed={!annual}
                className={cx(
                  "rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200",
                  annual
                    ? "text-black-700 hover:text-primary-main"
                    : "bg-primary-main text-static-white"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                aria-pressed={annual}
                className={cx(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200",
                  annual
                    ? "bg-primary-main text-static-white"
                    : "text-black-700 hover:text-primary-main"
                )}
              >
                Annual
                <span className="rounded-full bg-shopify-light px-2 py-0.5 text-[11px] font-semibold text-shopify-dark">
                  Save 20%
                </span>
              </button>
            </div>
          </FadeIn>
        </div>

        {/* No parallax on the pricing grid. It is a comparison surface and the
            page's conversion moment — people park on it and scan four plans
            against each other, so the one thing you most want held still is the
            last thing that should drift. The section's SoftBand tint already
            separates it from what is above. */}
        <div className="mt-10 w-full">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PIMW_PLANS.map((plan, index) => {
              const showAnnual = annual && plan.annual !== null;
              const price = showAnnual && plan.annual ? plan.annual : plan.monthly;
              const period =
                plan.monthlyValue === 0 ? "forever" : showAnnual ? "per year" : "per 30 days";
              const note =
                showAnnual && plan.annualNote
                  ? `${plan.annualNote} \u00b7 saves 20%`
                  : plan.monthlyValue === 0
                  ? "Free plan"
                  : "Billed every 30 days";

              return (
                <li key={plan.id} className="relative min-w-0">
                  {/* the one accent glow in this section, behind the Pro card */}
                  {plan.featured ? (
                    <GlowOrb
                      color="blue"
                      size={360}
                      className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  ) : null}
                  <ScaleIn delay={reduce ? 0 : index * 0.08} className="relative h-full">
                    <HoverLift lift={plan.featured ? 6 : 4} className="h-full">
                      {/* chrome on className, layout/padding on contentClassName */}
                      <SpotlightCard
                        className={cx(
                          "h-full rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl",
                          plan.featured
                            ? "border-2 border-pink-500 bg-pink-100"
                            : "border border-black-200 bg-common-white"
                        )}
                        contentClassName="flex h-full flex-col p-6"
                      >
                          {plan.featured ? (
                            <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary-main px-3 py-1 text-[12px] font-semibold text-static-white">
                              Recommended
                            </span>
                          ) : null}

                          <h3 className="text-[20px] font-semibold text-common-black md:text-[25px]">
                            {plan.name}
                          </h3>

                          <div className="mt-3 min-h-[76px]">
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.div
                                key={`${plan.id}-${showAnnual ? "annual" : "monthly"}`}
                                initial={reduce ? false : { opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
                                transition={{ duration: reduce ? 0 : 0.26, ease: EASE }}
                              >
                                <p className="text-[30px] font-bold leading-none text-common-black md:text-[35px]">
                                  {price}
                                  <span className="ml-1.5 text-[13px] font-normal text-black-700">
                                    {period}
                                  </span>
                                </p>
                                <p
                                  className={cx(
                                    "mt-2 text-[12px]",
                                    showAnnual && plan.annualNote
                                      ? "text-shopify-dark"
                                      : "text-black-600"
                                  )}
                                >
                                  {note}
                                </p>
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          <p className="mt-4 text-[14px] leading-relaxed text-black-700">{plan.blurb}</p>

                          <ul
                            className={cx(
                              "mt-5 flex flex-col gap-2.5 border-t pt-5",
                              plan.featured ? "border-pink-300" : "border-black-200"
                            )}
                          >
                            {PIMW_PLAN_ROWS.map((row) => (
                              <li key={row.key} className="flex items-start gap-2 text-[14px]">
                                <CheckRounded
                                  aria-hidden="true"
                                  className="mt-[2px] shrink-0 text-shopify-main"
                                  fontSize="small"
                                />
                                <span className="min-w-0 text-black-800">
                                  <span className="font-semibold text-common-black">{plan[row.key]}</span>{" "}
                                  {row.label.toLowerCase()}
                                </span>
                              </li>
                            ))}
                            <li className="flex items-start gap-2 text-[14px]">
                              <CheckRounded
                                aria-hidden="true"
                                className="mt-[2px] shrink-0 text-shopify-main"
                                fontSize="small"
                              />
                              <span className="min-w-0 text-black-800">Unlimited custom orders</span>
                            </li>
                          </ul>

                          <div className="mt-auto pt-6">
                            <AppStoreLink
                              variant={plan.featured ? "primary" : "outline"}
                              ariaLabel={`${plan.ctaLabel} on the Shopify App Store, opens in a new tab`}
                            >
                              {plan.ctaLabel}
                            </AppStoreLink>
                          </div>
                        </SpotlightCard>
                      </HoverLift>
                    </ScaleIn>
                  </li>
                );
              })}
          </ul>
        </div>
        </div>
      </section>
    );
  };

  /* ── section 7: merchant reviews ──────────────────────────────────────────── */

  const Reviews = () => {
    const reduce = useReducedMotion();

    return (
      <section
        id="reviews"
        aria-labelledby="pimw-reviews-heading"
        className="w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-[640px]">
              <SectionRule className="mb-4" />
              <Reveal>
                <p className="text-[20px] text-black-800 md:text-[25px]">Merchant reviews</p>
              </Reveal>
              <h2
                id="pimw-reviews-heading"
                className="mt-1 font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
              >
                <SplitReveal text="Eight reviews. All five stars." />
              </h2>
              <FadeIn y={16} delay={0.08}>
                <p className="mt-6 text-[15px] leading-relaxed text-black-700 md:text-[18px]">
                  Every quote below is reproduced in full from the Shopify App Store listing, with
                  the store name, country and date exactly as published.
                </p>
              </FadeIn>
            </div>

            <ScaleIn className="shrink-0">
              <div className="flex items-center gap-4 rounded-2xl border border-black-200 bg-black-100 px-6 py-5 shadow-md">
                <p className="text-[40px] font-bold leading-none text-primary-main">
                  {PIMW.rating.toFixed(1)}
                </p>
                <div className="min-w-0">
                  <Stars />
                  <p className="mt-1 text-[13px] text-black-700">
                    {PIMW.reviewCount} reviews &middot; 100% five star
                  </p>
                  <a
                    href={PIMW.reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-shopify-dark underline underline-offset-4 transition-colors duration-200 hover:text-shopify-main dark:hover:text-shopify-400"
                  >
                    Read them on the App Store
                    <OpenInNewRounded aria-hidden="true" style={{ fontSize: 14 }} />
                  </a>
                </div>
              </div>
            </ScaleIn>
          </div>

          <ul className="mt-10 gap-6 sm:columns-2 lg:columns-3">
            {PIMW_REVIEWS.map((review, index) => (
              <li key={review.store} className="mb-6 break-inside-avoid">
                <FadeIn
                  delay={reduce ? 0 : (index % 3) * 0.08}
                  amount={0.05}
                  className="flex flex-col rounded-2xl border border-black-200 bg-common-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Stars />
                    <span className="sr-only">
                      Rated {review.rating} out of 5 stars by {review.store}
                    </span>
                  </div>
                  <blockquote className="mt-4 text-[14px] leading-relaxed text-black-800 md:text-[15px]">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <footer className="mt-5 flex items-start justify-between gap-3 border-t border-black-200 pt-4">
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-primary-main">
                        {review.store}
                      </p>
                      <p className="text-[13px] text-black-600">{review.country}</p>
                    </div>
                    <p className="shrink-0 text-[13px] text-black-600">{review.date}</p>
                  </footer>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  };

  /* ── section 8: works with / languages ────────────────────────────────────── */

  const LanguageChip = ({ label }: { label: string }) => (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-shopify-border bg-common-white px-3 py-1.5 text-[13px] text-black-800">
      <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-shopify-main" />
      {label}
    </span>
  );

  const Compatibility = () => {
    const half = Math.ceil(PIMW.languages.length / 2);
    const firstRow = PIMW.languages.slice(0, half);
    const secondRow = PIMW.languages.slice(half);

    return (
      <section
        id="compatibility"
        aria-labelledby="pimw-compatibility-heading"
        className="relative w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]"
      >
        <SoftBand className="bg-shopify-100/50" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <SectionRule className="mb-4" />
              <Reveal>
                <p className="text-[20px] text-black-800 md:text-[25px]">Compatibility</p>
              </Reveal>
              <h2
                id="pimw-compatibility-heading"
                className="mt-1 font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
              >
                <SplitReveal text="Fits the store you already run" />
              </h2>

              <ul className="mt-6 flex flex-wrap gap-2">
                {PIMW.worksWith.map((item, index) => {
                  const Icon = WORKS_WITH_ICONS[index] ?? StorefrontOutlined;
                  return (
                    <li key={item}>
                      <ScaleIn
                        delay={index * 0.08}
                        className="inline-flex items-center gap-2 rounded-full border border-shopify-border bg-common-white px-4 py-2 text-[14px] font-medium text-shopify-dark shadow-md"
                      >
                        <Icon aria-hidden="true" fontSize="small" />
                        {item}
                      </ScaleIn>
                    </li>
                  );
                })}
              </ul>

              <Stagger className="mt-8 w-full" stagger={0.07}>
                <ul className="flex flex-col gap-3">
                  {PIMW_PLATFORM.map((fact) => (
                    <li key={fact}>
                      <StaggerItem className="flex items-start gap-3">
                        <CheckRounded
                          aria-hidden="true"
                          className="mt-[2px] shrink-0 text-shopify-main"
                          fontSize="small"
                        />
                        <span className="min-w-0 text-[15px] leading-relaxed text-black-800 md:text-[16px]">
                          {fact}
                        </span>
                      </StaggerItem>
                    </li>
                  ))}
                </ul>
              </Stagger>
            </div>

            <SlideIn
              from="right"
              className="rounded-2xl border border-shopify-border bg-common-white p-6 shadow-md sm:p-8"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={ShopifyLogo}
                  alt=""
                  aria-hidden="true"
                  className="h-[36px] w-[36px] shrink-0"
                />
                <div className="min-w-0">
                  <p className="truncate text-[16px] font-semibold text-common-black">{PIMW.name}</p>
                  <p className="text-[13px] text-black-600">
                    by {PIMW.developer} &middot; {PIMW.location}
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="min-w-0">
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-black-600">
                    Listed under
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {PIMW.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-md bg-shopify-light px-2 py-1 text-[12px] font-medium text-shopify-dark"
                      >
                        {category}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-black-600">
                    Languages
                  </dt>
                  <dd className="mt-2 text-[25px] font-bold leading-none text-common-black">
                    <CountUp value={PIMW.languageCount} />
                    <span className="ml-2 text-[14px] font-normal text-black-700">supported</span>
                  </dd>
                </div>
              </dl>

              <div className="mt-8">
                <AppStoreLink ariaLabel="Open the PIMW App Store listing in a new tab">
                  View the App Store listing
                </AppStoreLink>
              </div>
            </SlideIn>
          </div>

          <div className="mt-14">
            <h3 className="text-center font-display text-[16px] font-semibold tracking-tight text-common-black md:text-[18px]">
              <SplitReveal text={`Available in ${PIMW.languageCount} languages`} />
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <MarqueeRow aria-hidden="true" duration={38} gap={12}>
                {firstRow.map((language) => (
                  <LanguageChip key={language} label={language} />
                ))}
              </MarqueeRow>
              <MarqueeRow aria-hidden="true" duration={46} gap={12} direction="right">
                {secondRow.map((language) => (
                  <LanguageChip key={language} label={language} />
                ))}
              </MarqueeRow>
            </div>

            {/* the marquee is decorative; this is the list assistive tech reads */}
            <ul className="sr-only">
              {PIMW.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  };

/* ── section 9: the rest of the portfolio ─────────────────────────────────── */

/**
 * PIMW is one of several apps Pixelspiece publishes on the Shopify App Store,
 * so this page has to say so rather than reading as "the app".
 *
 * DATA: the list, the ratings, the review counts and the badges are read from
 * `@/untils/data/shopifyApps`. Never restate one as a literal here — the moment
 * a fifth app ships, hardcoded copy lies.
 *
 * ⚠️ THE "BUILT FOR SHOPIFY" BADGE IS PER-APP and is gated on
 * `app.builtForShopify`. PIMW does not carry it, and nothing on this page may
 * render or imply one for it — which is also why PIMW is filtered out of the
 * row below (you are already on its page).
 *
 * Visually calm on purpose: this page has already spent its one aurora (the
 * hero) and its two dark bands, so this is a plain section with the site's
 * standard card treatment, sitting between the tinted compatibility band and
 * the dark closing CTA.
 */
const OTHER_APPS = SHOPIFY_APPS.filter((app) => app.id !== "pimw");

/** Icon per listing, keyed by the data module's JSX-free `icon` union. */
const APP_ICON_MAP: Record<ShopifyApp["icon"], typeof VisibilityOutlined> = {
  personalize: AutoAwesomeOutlined,
  sizing: StraightenOutlined,
  delivery: LocalShippingOutlined,
  discount: SellOutlined,
};

const MoreApps = () => {
  if (OTHER_APPS.length === 0) return null;

  return (
    <section
      id="more-apps"
      aria-labelledby="pimw-more-apps-heading"
      className="w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col items-center">
          <SectionRule className="mb-5" />
          <Reveal>
            <p className="text-center text-[20px] text-black-800 md:text-[25px]">
              The rest of the portfolio
            </p>
          </Reveal>
          <h2
            id="pimw-more-apps-heading"
            className="mt-1 text-center font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
          >
            <SplitReveal text="More apps from Pixels Piece" />
          </h2>
          <FadeIn y={16} delay={0.08}>
            <p className="mt-6 max-w-[720px] text-center text-[15px] leading-relaxed text-black-700 md:text-[18px]">
              {PIMW.shortName} is one of {APP_PORTFOLIO.appCount} apps we publish
              on the Shopify App Store, and {APP_PORTFOLIO.builtForShopifyCount}{" "}
              of them carry Shopify&rsquo;s Built for Shopify badge. Here are the
              other {OTHER_APPS.length}.
            </p>
          </FadeIn>
        </div>

        {/* Same gentle lift as the pricing grid. <Stagger> is a motion.div, so
            the data-speed goes on this wrapper — merging the two onto the
            Stagger itself would kill either the parallax or the entrance. */}
        <Parallax speed={0.95} className="mt-10 w-full">
          <Stagger className="w-full" stagger={0.08}>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {OTHER_APPS.map((app) => {
                const Icon = APP_ICON_MAP[app.icon];
                return (
                  <li key={app.id} className="h-full min-w-0">
                    <StaggerItem className="h-full">
                      {/* Same treatment the app rows carry everywhere else —
                          chrome on className, layout on contentClassName. A
                          SpotlightCard, not a second BorderBeam: this page has
                          already spent its aurora and its beams above. */}
                      <SpotlightCard
                        color="green"
                        className="h-full rounded-2xl border border-black-200 bg-common-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                        contentClassName="flex h-full flex-col p-6"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border border-shopify-border bg-shopify-light text-shopify-dark"
                          >
                            <Icon />
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-[16px] font-semibold text-common-black md:text-[18px]">
                              {app.name}
                            </h3>
                            <p className="mt-1 text-[13px] text-black-600">{app.priceLabel}</p>
                          </div>
                        </div>

                        <p className="mt-4 text-[14px] leading-relaxed text-black-700 md:text-[15px]">
                          {app.tagline}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                          {/* Stars draw five glyphs, so they only stand in for a
                              five-star rating; the number below is always shown. */}
                          {app.rating === 5 ? <Stars /> : null}
                          <p className="text-[13px] text-black-700">
                            <span className="font-semibold text-common-black">
                              {app.rating.toFixed(1)}
                            </span>{" "}
                            from {app.reviewCount} reviews
                          </p>
                        </div>

                        {/* Per-app, never blanket. Driven by the data module, and
                            drawn by the shared badge so it matches every other
                            surface. */}
                        {app.builtForShopify ? (
                          <BuiltForShopifyBadge className="mt-4" />
                        ) : null}

                        <div className="mt-auto pt-6">
                          <HoverLift>
                            <a
                              href={app.appStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${app.name} on the Shopify App Store, opens in a new tab`}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary-main bg-common-white px-5 py-2.5 text-[14px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100 md:text-[15px]"
                            >
                              <span>View on the App Store</span>
                              <OpenInNewRounded aria-hidden="true" fontSize="small" />
                            </a>
                          </HoverLift>
                        </div>
                      </SpotlightCard>
                    </StaggerItem>
                  </li>
                );
              })}
            </ul>
          </Stagger>
        </Parallax>
      </div>
    </section>
  );
};

/* ── section 10: final CTA ────────────────────────────────────────────────── */

/* py >= the 9rem DarkBand feather, so the badge and the closing links sit on
   the band's solid core rather than in the fade. */
const FinalCta = () => (
  <section
    aria-labelledby="pimw-cta-heading"
    className="relative w-full overflow-hidden px-4 py-[150px] md:px-[50px] lg:px-[100px]"
  >
    <DarkBand />
    <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
      <ScaleIn>
        <span className="inline-flex items-center gap-2 rounded-full border border-static-white/25 bg-static-white/10 px-3 py-1.5 text-[13px] font-medium text-static-white">
          <Image src={ShopifyLogo} alt="" aria-hidden="true" className="h-[16px] w-[16px]" />
          Free plan &middot; No code &middot; Under five minutes
        </span>
      </ScaleIn>

      <h2
        id="pimw-cta-heading"
        className="mt-6 font-display text-[25px] font-bold leading-tight tracking-tight text-static-white md:text-[35px]"
      >
        <SplitReveal text="Put a live personalizer on your product pages" />
      </h2>

      <FadeIn y={16} delay={0.08}>
        <p className="mt-5 max-w-[660px] text-[15px] leading-relaxed text-static-white/75 md:text-[18px]">
          Install PIMW from the Shopify App Store, build your first option group and assign it to a
          product. Your customers design it &mdash; you just ship it.
        </p>
      </FadeIn>

      <FadeIn y={16} delay={0.14} className="w-full">
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <HoverLift className="w-full sm:w-auto">
            <AppStoreLink ariaLabel="Install PIMW from the Shopify App Store, opens in a new tab">
              Install from the App Store
            </AppStoreLink>
          </HoverLift>
          <HoverLift className="w-full sm:w-auto">
            <a
              href={PIMW.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-static-white/40 bg-transparent-main px-6 py-3 text-[15px] font-medium text-static-white transition-colors duration-200 hover:bg-static-white/10 sm:w-auto md:text-[16px]"
            >
              <span>Read the docs</span>
              <OpenInNewRounded aria-hidden="true" fontSize="small" />
            </a>
          </HoverLift>
        </div>
      </FadeIn>

      <FadeIn y={16} delay={0.2}>
        <p className="mt-6 text-[14px] text-static-white/75">
          Questions first?{" "}
          <a
            href={PIMW.faqUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-static-white underline underline-offset-4 transition-colors duration-200 hover:text-pink-300"
          >
            Browse the FAQ
          </a>{" "}
          or{" "}
          <a
            href="#contact"
            className="font-medium text-static-white underline underline-offset-4 transition-colors duration-200 hover:text-pink-300"
          >
            talk to the team
          </a>
          .
        </p>
      </FadeIn>
    </div>
  </section>
);

/* ── page ─────────────────────────────────────────────────────────────────── */

/**
 * The whole /shopify-app page body. `Wrapper` already renders the topbar, the
 * contact form (#contact) and the footer around it, so nothing here repeats
 * them; the hero just carries the fixed-topbar clearance.
 */
const PimwApp = () => (
  <main className="w-full">
    <Hero />
    <StatStrip />
    <WhatItDoes />
    <HowItWorks />
    <FeatureMatrix />
    <Pricing />
    <Reviews />
    <Compatibility />
    <MoreApps />
    <FinalCta />
  </main>
);

export default PimwApp;
