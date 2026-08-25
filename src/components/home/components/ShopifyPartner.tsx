import * as React from "react";
import Image from "next/image";
import Link from "next/link";

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
import { BuiltForShopifyBadge } from "@/components/shared/BuiltForShopifyBadge";
import PixelCard from "@/components/shared/PixelCard";
import { Parallax } from "@/components/shared/scroll";
import {
  APP_PORTFOLIO,
  BUILT_FOR_SHOPIFY_BLURB,
  SHOPIFY_APPS,
  type ShopifyApp,
} from "@/untils/data/shopifyApps";
import { PIMW, PIMW_HIGHLIGHTS, type PimwIconKey } from "@/untils/data/pimw";
import { ShopifyLogo } from "@/untils/images";

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
 * ⚠️ THE "BUILT FOR SHOPIFY" BADGE IS PER-APP. Three of the four listings
 * carry it; PIMW does NOT. Every badge below is gated on `app.builtForShopify`
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
 * App Store buttons, the "works with" chips and the Built for Shopify badge.
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
  label: string;
}

/**
 * Portfolio roll-ups. Every value is read from APP_PORTFOLIO, and the two
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
    id: "built-for-shopify",
    value: APP_PORTFOLIO.builtForShopifyCount,
    label: `of our ${APP_PORTFOLIO.appCount} apps are Built for Shopify`,
  },
];

/** The listing highlights we lead with here. The full set lives on /shopify-apps. */
const LEAD_HIGHLIGHTS = PIMW_HIGHLIGHTS.slice(0, 4);

/**
 * One teaser card in the app strip. Deliberately tighter than the cards on
 * /shopify-apps: icon, short name, listing tagline, rating, price and — only
 * when the listing actually carries it — the Built for Shopify badge.
 */
const AppTeaser = ({ app }: { app: ShopifyApp }) => (
  <SpotlightCard
    color="green"
    className="h-full rounded-2xl border border-black-200 bg-common-white shadow-md transition-shadow duration-300 hover:shadow-xl"
    contentClassName="h-full"
  >
    <a
      href={app.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col rounded-2xl p-5"
    >
      <span className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-shopify-200 bg-shopify-100 text-shopify-700"
        >
          {APP_ICONS[app.icon]}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-black-200 bg-black-100 px-2 py-1 text-[12px] font-medium text-black-700">
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
        {/* Gated on the listing's own flag — never rendered for PIMW. The
            pill itself is the shared component, so this badge is drawn
            identically here and on every app card elsewhere on the site. */}
        {app.builtForShopify ? <BuiltForShopifyBadge /> : null}
      </span>

      <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-medium text-shopify-700">
        View listing
        <OpenInNewRounded aria-hidden="true" fontSize="inherit" className="text-[14px]" />
      </span>
    </a>
  </SpotlightCard>
);

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
            Pixels Piece designs, builds and supports commerce on Shopify —
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
              GSAP writes `transform` for data-speed and motion writes
              `transform` for the entrance, and on one element the last writer
              silently wins. Same reason it is on the grid and never on an
              <AppTeaser> — those are SpotlightCards. */}
          <Parallax speed={0.95} className="mt-6 w-full">
            <Stagger className="w-full" stagger={0.08} amount={0.1}>
              <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {SHOPIFY_APPS.map((app) => (
                  <li key={app.id} className="h-full">
                    <StaggerItem className="h-full">
                      <AppTeaser app={app} />
                    </StaggerItem>
                  </li>
                ))}
              </ul>
            </Stagger>
          </Parallax>

          <FadeIn className="mt-6 flex w-full justify-center" delay={0.05}>
            <p className="max-w-[760px] text-center text-[13px] text-black-600 md:text-[14px]">
              <span className="font-medium text-shopify-700">
                Built for Shopify
              </span>{" "}
              is Shopify&rsquo;s own badge:{" "}
              <span className="italic">
                &ldquo;{BUILT_FOR_SHOPIFY_BLURB}&rdquo;
              </span>{" "}
              {APP_PORTFOLIO.builtForShopifyCount} of our{" "}
              {APP_PORTFOLIO.appCount} apps clear that bar.
            </p>
          </FadeIn>
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
              <Stagger className="mt-4 w-full" stagger={0.09}>
                <ul className="flex flex-col gap-4">
                  {LEAD_HIGHLIGHTS.map((highlight) => (
                    <li key={highlight.title}>
                      <StaggerItem className="flex items-start gap-4 rounded-2xl border border-black-200 bg-common-white p-4 shadow-md transition-shadow duration-300 hover:shadow-xl">
                        <span
                          aria-hidden="true"
                          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-shopify-100 text-shopify-700"
                        >
                          {HIGHLIGHT_ICONS[highlight.icon] ?? (
                            <BoltOutlined fontSize="small" />
                          )}
                        </span>
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
                {SHOPIFY_CAPABILITIES.map((capability) => (
                  <li key={capability.title} className="h-full">
                    <StaggerItem className="h-full">
                      <BorderBeam
                        tone="shopify"
                        radius={16}
                        duration={5}
                        className="h-full transition-transform duration-300 hover:-translate-y-1"
                        contentClassName="h-full bg-common-white shadow-md transition-shadow duration-300 group-hover:shadow-xl"
                      >
                        {/* PixelCard fills the beam's inner surface: the beam
                            lights the rim, the pixel field blooms inside it.
                            noFocus because the beam shell is not focusable and
                            the card has no interactive content — a tabIndex
                            here would add a dead tab stop per card. */}
                        <PixelCard
                          variant="shopify"
                          noFocus
                          className="h-full rounded-[inherit]"
                          contentClassName="flex h-full flex-col p-6"
                        >
                          <span
                            aria-hidden="true"
                            className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-shopify-200 bg-shopify-100 text-shopify-700 transition-colors duration-300 group-hover:border-shopify-300 group-hover:bg-shopify-200"
                          >
                            {capability.icon}
                          </span>
                          <h4 className="mt-4 text-[16px] font-semibold text-common-black md:text-[18px]">
                            {capability.title}
                          </h4>
                          <p className="mt-2 text-[14px] text-black-700 md:text-[16px]">
                            {capability.body}
                          </p>
                        </PixelCard>
                      </BorderBeam>
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
