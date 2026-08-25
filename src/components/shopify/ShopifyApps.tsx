/**
 * /shopify-apps — THE page for every Shopify app Pixels Piece publishes.
 *
 * This page replaced a per-app page (/shopify-app, now a permanent redirect to
 * here) that talked about PIMW and nothing else. The whole point of this one is
 * that it is a PORTFOLIO page: all four apps get the same structural weight,
 * the same generated section, the same depth of features and the same depth of
 * pricing. PIMW leads only because it currently has the most reviews, and even
 * that is derived (`APPS_IN_ORDER` sorts by `reviewCount`) rather than typed —
 * if another listing overtakes it, the page reorders itself.
 *
 * ── DATA DOCTRINE ──────────────────────────────────────────────────────────
 * Every fact is read from `@/untils/data/shopifyApps` (verified against the
 * live App Store listings) — never typed as a literal here:
 *
 *   • name / tagline / launched / categories / worksWith / languageCount
 *   • rating, reviewCount, reviewsUrl, appStoreUrl        -> `SHOPIFY_APPS`
 *   • the full feature list                               -> `app.features`
 *   • every tier, price, annual price and inclusion       -> `app.plans`
 *   • app count / review total / badge count roll-ups     -> `APP_PORTFOLIO`
 *   • the "Built for Shopify" wording                     -> `BUILT_FOR_SHOPIFY_BLURB`
 *
 * `@/untils/data/pimw` is imported for PIMW-SPECIFIC PROSE ONLY (its verbatim
 * reviews, its short name). Never take a figure from it — the portfolio numbers
 * all live in shopifyApps.ts so they cannot disagree with each other.
 *
 * ⚠ THE BADGE IS PER-APP. It renders only inside
 * `{app.builtForShopify ? <BuiltForShopifyBadge /> : null}`, so a blanket
 * "all our apps are Built for Shopify" line is impossible to write by accident.
 * PIMW does NOT carry it. Three of the four do, and
 * "3 of our 4 apps are Built for Shopify" — assembled from
 * `builtForShopifyCount` / `appCount` — is the accurate, strong version.
 *
 * ⚠ THE DELIVERY TIMER HAS ONE FREE TIER AND NO PAID PLAN. Its pricing block
 * therefore renders as a single full-width "Free — the whole app" card
 * (`app.plans.length === 1`), never as one lonely column in a 4-up grid, and
 * nothing on the page implies it has an upgrade path.
 *
 * ⚠ `app.internalUrl` is deliberately NOT linked from this page. PIMW's value
 * is "/shopify-app", which now permanently redirects here — rendering it would
 * be a link back to the page you are already on.
 *
 * Never claimed anywhere here: install or merchant counts, revenue or
 * conversion-lift figures, Shopify Plus, partner tiers, awards. Review quotes
 * are verbatim and come only from `APP_REVIEWS` and `PIMW_REVIEWS`; the Pixel
 * Estimated Delivery Timer's listing published review summaries rather than
 * full text, so it is deliberately not quoted and the page says so.
 *
 * Pages Router — deliberately no "use client" directive.
 *
 * Palette notes (tailwind.config.ts replaces Tailwind's default palette):
 *  - `pink-*` holds BLUE hex values; `primary-main` === `pink-600` === #1E90FF.
 *  - `common-white` / `common-black` are the themed surface/ink pair and FLIP
 *    in dark mode; `static-white` / `static-black` never flip, so they are what
 *    sits on a coloured fill (the dark CTA band, the blue buttons).
 *  - `shopify-*` marks Shopify-platform chrome only. Blue stays the action
 *    colour, so every primary CTA here is `bg-primary-main`.
 *
 * Band doctrine (the site has rejected hard colour seams repeatedly): a
 * full-width tint is translucent AND feathered, and the feather rides its own
 * absolutely positioned layer (<SoftBand />, or the local <DarkBand /> below)
 * inside a `relative` section whose content sits in a sibling `relative z-10`.
 * `band-soft` on the <section> itself would mask the headings and cards too.
 * The four per-app blocks alternate tinted / plain so they do not read as one
 * endless slab; the alternation is driven off the loop index, so adding a
 * fifth app keeps the rhythm without an edit.
 */

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import ExtensionOutlined from "@mui/icons-material/ExtensionOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import LocalOfferOutlined from "@mui/icons-material/LocalOfferOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import PaymentsOutlined from "@mui/icons-material/PaymentsOutlined";
import StarRounded from "@mui/icons-material/StarRounded";
import StraightenOutlined from "@mui/icons-material/StraightenOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";
import TranslateOutlined from "@mui/icons-material/TranslateOutlined";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";

import {
  AnimatedGradientText,
  CountUp,
  FadeIn,
  HoverLift,
  Reveal,
  ScaleIn,
  SplitReveal,
  Stagger,
  StaggerItem,
  cx,
  useReducedMotion,
} from "@/components/shared/motion";
import {
  AuroraBackground,
  GridPattern,
  SoftBand,
  SpotlightCard,
} from "@/components/shared/backgrounds";
import { BuiltForShopifyBadge } from "@/components/shared/BuiltForShopifyBadge";
import { ScrollStage } from "@/components/shared/scroll";
import {
  APP_PORTFOLIO,
  APP_REVIEWS,
  BUILT_FOR_SHOPIFY_BLURB,
  SHOPIFY_APPS,
  type AppPlan,
  type ShopifyApp,
} from "@/untils/data/shopifyApps";
import { PIMW, PIMW_REVIEWS } from "@/untils/data/pimw";
import { ShopifyLogo } from "@/untils/images";

/* ── derived facts ────────────────────────────────────────────────────────
 * Everything below is computed from the data module, so none of it can drift
 * out of step with the listings when an app is added, renamed or repriced.
 */

/**
 * Display order for BOTH the comparison row and the per-app sections — most
 * reviewed first. PIMW happens to lead today because it holds the most
 * reviews, which is a fact about the data and not a decision about the page.
 * `sort` on a copy: `SHOPIFY_APPS` is shared with the page shell's JSON-LD.
 */
const APPS_IN_ORDER: ShopifyApp[] = [...SHOPIFY_APPS].sort(
  (a, b) => b.reviewCount - a.reviewCount
);

/** True only while every listing genuinely offers a free plan. */
const EVERY_APP_HAS_FREE_PLAN = SHOPIFY_APPS.every((app) => app.freeplan);

/** Belt and braces: the free plan must also exist as a $0 tier in `plans`. */
const EVERY_APP_HAS_FREE_TIER = SHOPIFY_APPS.every((app) =>
  app.plans.some((plan) => plan.monthlyValue === 0)
);

/** Surfaces that EVERY app integrates with — the intersection of `worksWith`. */
const SHARED_SURFACES = SHOPIFY_APPS.reduce<string[]>(
  (shared, app) => shared.filter((surface) => app.worksWith.includes(surface)),
  [...(SHOPIFY_APPS[0]?.worksWith ?? [])]
);

/** "a, b and c" — used for the shared-surface and works-with lines. */
const formatList = (items: string[]): string =>
  items.length <= 1
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/** Small-number words, so headline copy reads "Four apps", not "4 apps". */
const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

const numberWord = (n: number): string => NUMBER_WORDS[n] ?? String(n);

const titleCaseNumber = (n: number): string => {
  const word = numberWord(n);
  return word.charAt(0).toUpperCase() + word.slice(1);
};

/** The one sentence that states the badge split. Assembled, never typed. */
const BADGE_RATIO = `${APP_PORTFOLIO.builtForShopifyCount} of our ${APP_PORTFOLIO.appCount} apps are Built for Shopify`;

/** Anchor id for an app's own section, shared by the comparison row's links. */
const sectionIdFor = (app: ShopifyApp): string => `app-${app.id}`;

/** "8 reviews" / "1 review" — used in three places, so it lives here once. */
const reviewCountLabel = (app: ShopifyApp): string =>
  `${app.reviewCount} ${app.reviewCount === 1 ? "review" : "reviews"}`;

/** A tier with no monthly cost is priced "forever", not "per 30 days". */
const planPeriodLabel = (plan: AppPlan): string =>
  plan.monthlyValue === 0 ? "forever" : "per 30 days";

/**
 * Column count for a pricing grid. A single-tier app never reaches this — it
 * renders the full-width solo card instead — but the ladder is written for any
 * count so a repriced listing cannot produce a broken row.
 */
const planGridClass = (count: number): string => {
  if (count >= 4) return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2";
};

/**
 * `@/untils/data/shopifyApps` stays JSX-free, so it names icons by key. Every
 * key in the union is mapped here; adding one without a mapping is a compile
 * error, which is the point.
 */
const ICON_MAP: Record<ShopifyApp["icon"], typeof AutoAwesomeOutlined> = {
  personalize: AutoAwesomeOutlined,
  sizing: StraightenOutlined,
  delivery: LocalShippingOutlined,
  discount: LocalOfferOutlined,
};

/* ── small shared pieces ──────────────────────────────────────────────────── */

/** The site's section rule: a short blue bar above every section heading. */
const SectionRule = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cx("w-[100px] border-2 border-pink-500", className)}
  />
);

/** Decorative star row. Always pair it with real text for assistive tech. */
const Stars = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={cx("inline-flex items-center text-orange-main", className)}
  >
    {[0, 1, 2, 3, 4].map((index) => (
      <StarRounded key={index} fontSize="small" />
    ))}
  </span>
);

/** The rounded icon tile that identifies an app wherever it appears. */
const AppIcon = ({
  app,
  size = "md",
}: {
  app: ShopifyApp;
  size?: "sm" | "md";
}) => {
  const Icon = ICON_MAP[app.icon];
  return (
    <span
      aria-hidden="true"
      className={cx(
        "flex shrink-0 items-center justify-center rounded-2xl border border-shopify-200 bg-shopify-100 text-shopify-700",
        size === "sm" ? "h-[40px] w-[40px]" : "h-[56px] w-[56px]"
      )}
    >
      <Icon fontSize={size === "sm" ? "small" : "medium"} />
    </span>
  );
};

/** Rating + a link to the listing's own reviews. The stars are decoration. */
const RatingLine = ({
  app,
  className,
}: {
  app: ShopifyApp;
  className?: string;
}) => (
  <span className={cx("inline-flex flex-wrap items-center gap-x-2.5 gap-y-1", className)}>
    <Stars />
    <span aria-hidden="true" className="text-[15px] font-bold text-common-black">
      {app.rating.toFixed(1)}
    </span>
    <a
      href={app.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${app.rating.toFixed(1)} from ${reviewCountLabel(app)} — read the ${app.name} reviews on the Shopify App Store, opens in a new tab`}
      className="text-[13px] text-black-700 underline decoration-black-300 underline-offset-4 transition-colors duration-200 hover:text-primary-main md:text-[14px]"
    >
      {app.rating.toFixed(1)} from {reviewCountLabel(app)}
    </a>
  </span>
);

/** Category chips, identical on the comparison row and the app sections. */
const CategoryChips = ({
  app,
  className,
}: {
  app: ShopifyApp;
  className?: string;
}) => (
  <ul className={cx("flex flex-wrap gap-2", className)}>
    {app.categories.map((category) => (
      <li key={category}>
        <span className="inline-flex items-center rounded-full border border-shopify-200 bg-shopify-100 px-3 py-1 text-[12px] font-medium text-shopify-700">
          {category}
        </span>
      </li>
    ))}
  </ul>
);

/** The one external CTA shape used for every "open this listing" link. */
const AppStoreCta = ({
  app,
  variant = "primary",
  children,
  className,
}: {
  app: ShopifyApp;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
}) => (
  <HoverLift className={cx("w-full sm:w-auto", className)}>
    <a
      href={app.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${app.name} on the Shopify App Store, opens in a new tab`}
      className={cx(
        "inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-[14px] font-medium transition-colors duration-200 sm:w-auto md:text-[15px]",
        variant === "primary"
          ? "bg-primary-main text-static-white shadow-md hover:bg-pink-700"
          : "border-2 border-primary-main bg-common-white text-primary-main hover:bg-pink-100"
      )}
    >
      <span>{children}</span>
      <OpenInNewRounded aria-hidden="true" fontSize="small" />
    </a>
  </HoverLift>
);

/**
 * The accent band under the final CTA is DELIBERATELY dark in BOTH themes.
 * `bg-black-900` cannot express that — the neutral ramp inverts in dark, so it
 * would paint a near-white band and the text on it would vanish. The fill is
 * baked here, and every scrap of text on it uses `static-*` so it never flips.
 *
 * The feather matches `band-soft`'s 9rem, so the host section carries >= 9rem
 * of vertical padding and the copy sits on the band's solid core, not the fade.
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

/* ── section 1: hero ──────────────────────────────────────────────────────── */

/**
 * Portfolio proof, up front. Each figure is a live read of `APP_PORTFOLIO`, so
 * publishing a fifth app changes this strip without an edit here.
 */
const HERO_STATS: Array<{ id: string; value: React.ReactNode; label: string }> = [
  {
    id: "apps",
    value: <CountUp value={APP_PORTFOLIO.appCount} duration={1.1} />,
    label: "apps published on the Shopify App Store",
  },
  {
    id: "reviews",
    value: <CountUp value={APP_PORTFOLIO.totalReviews} duration={1.5} />,
    label: "merchant reviews across those listings",
  },
  {
    id: "rating",
    value: <CountUp value={APP_PORTFOLIO.rating} decimals={1} duration={1.2} />,
    label: "the rating on every one of them",
  },
  {
    id: "badge",
    value: (
      <span className="inline-flex items-baseline">
        <CountUp value={APP_PORTFOLIO.builtForShopifyCount} duration={1.1} />
        <span className="px-1.5 text-[16px] font-medium text-black-600">of</span>
        <CountUp value={APP_PORTFOLIO.appCount} duration={1.1} />
      </span>
    ),
    label: "carry Shopify's Built for Shopify badge",
  },
];

/* The fixed topbar is 70px tall and floats at top-[2%], so the first section
   opens on ~85px of clearance. It is padding rather than a margin on purpose:
   a margin would start the aurora 85px down the page and draw exactly the
   horizontal seam the feathering exists to remove. */
const Hero = () => (
  <section
    aria-labelledby="apps-hero-heading"
    className="relative w-full overflow-hidden px-4 pb-[60px] pt-[120px] md:px-[50px] lg:px-[100px]"
  >
    {/* The page's ONE aurora. `fade="bottom"` is mandatory — the section clips,
        and a blob still at full alpha at the clip draws a seam against the
        next section. */}
    <AuroraBackground variant="mixed" intensity={0.45} fade="bottom" />
    <GridPattern className="text-black-300" opacity={0.18} fade="edges" />

    <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
      <ScaleIn>
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
      </ScaleIn>

      <h1
        id="apps-hero-heading"
        className="mt-6 font-display text-[32px] font-bold leading-tight tracking-tight text-common-black sm:text-[40px] lg:text-[48px]"
      >
        <SplitReveal
          text={`${titleCaseNumber(APP_PORTFOLIO.appCount)} Shopify apps,`}
          className="block"
        />
        <AnimatedGradientText className="block font-bold">
          built and supported by one team
        </AnimatedGradientText>
      </h1>

      <FadeIn y={16} delay={0.1}>
        <p className="mt-6 max-w-[760px] text-[15px] leading-relaxed text-black-700 md:text-[18px]">
          Product personalization, size guides and fit, estimated delivery dates
          and scheduled sales {numberWord(APP_PORTFOLIO.appCount)}{" "}
          separate listings, all built and maintained in-house. Every feature
          and every pricing tier for all of them is on this page. Between them
          they hold {APP_PORTFOLIO.totalReviews} merchant reviews, and{" "}
          {BADGE_RATIO}.
        </p>
      </FadeIn>

      <FadeIn y={16} delay={0.16} className="w-full">
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <HoverLift className="w-full sm:w-auto">
            <a
              href="#apps"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-main px-6 py-3 text-[15px] font-medium text-static-white shadow-md transition-colors duration-200 hover:bg-pink-700 sm:w-auto md:text-[16px]"
            >
              <span>Compare all {APP_PORTFOLIO.appCount} apps</span>
              <ArrowForwardRounded aria-hidden="true" fontSize="small" />
            </a>
          </HoverLift>
          <HoverLift className="w-full sm:w-auto">
            <Link
              href="/services/shopify-app-development"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary-main bg-common-white px-6 py-3 text-[15px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100 sm:w-auto md:text-[16px]"
            >
              <span>Have us build yours</span>
              <ExtensionOutlined aria-hidden="true" fontSize="small" />
            </Link>
          </HoverLift>
        </div>
      </FadeIn>

      <Stagger
        className="mt-14 w-full"
        stagger={0.08}
        delayChildren={0.05}
        amount={0.1}
      >
        <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <li key={stat.id} className="h-full">
              <StaggerItem className="flex h-full flex-col items-center rounded-2xl border border-black-200 bg-common-white px-5 py-6 text-center shadow-md transition-shadow duration-300 hover:shadow-xl">
                <span className="font-display text-[32px] font-bold leading-none text-primary-main md:text-[38px]">
                  {stat.value}
                </span>
                <span className="mt-3 text-[13px] leading-snug text-black-700">
                  {stat.label}
                </span>
              </StaggerItem>
            </li>
          ))}
        </ul>
      </Stagger>
    </div>
  </section>
);

/* ── section 2: the apps at a glance ──────────────────────────────────────── */

/**
 * The scannable summary. Two renderings of the SAME data, swapped by CSS:
 *
 *  - below xl: one card per app. At 360px the card is a single column of
 *    labelled rows, so nothing truncates and nothing scrolls sideways.
 *  - xl and up: a real <table> on an opaque surface. It lives inside its own
 *    `overflow-x-auto` wrapper, so even a future fifth column scrolls within
 *    the card instead of pushing the page sideways.
 *
 * xl rather than lg for the table: at exactly 1024px the section's
 * `lg:px-[100px]` leaves 824px of content width, which is tight for five
 * columns. The card grid is already two-up at that width and reads better.
 */

const GLANCE_COLUMNS = [
  "App",
  "Rating",
  "Pricing",
  "Categories",
  "Works with",
];

const GlanceTable = () => (
  <div className="hidden overflow-hidden rounded-2xl border border-black-200 bg-common-white shadow-md xl:block">
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-left">
        <caption className="sr-only">
          {APP_PORTFOLIO.appCount} Shopify apps by Pixels Piece, compared by
          rating, pricing, category and the Shopify surfaces they work with.
        </caption>
        <thead>
          <tr className="border-b border-black-200 bg-black-100">
            {GLANCE_COLUMNS.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-black-600"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {APPS_IN_ORDER.map((app) => (
            <tr
              key={app.id}
              className="border-b border-black-200 align-top transition-colors duration-200 last:border-b-0 hover:bg-black-100/60"
            >
              <th scope="row" className="max-w-[300px] px-5 py-5 font-normal">
                <span className="flex items-start gap-3">
                  <AppIcon app={app} size="sm" />
                  <span className="min-w-0">
                    <a
                      href={`#${sectionIdFor(app)}`}
                      className="block text-[15px] font-semibold leading-snug text-common-black transition-colors duration-200 hover:text-primary-main"
                    >
                      {app.name}
                    </a>
                    <span className="mt-1 block text-[13px] leading-snug text-black-700">
                      {app.tagline}
                    </span>
                    {/* Per-listing. Never rendered for an app without it. */}
                    {app.builtForShopify ? (
                      <BuiltForShopifyBadge className="mt-2" />
                    ) : null}
                  </span>
                </span>
              </th>

              <td className="whitespace-nowrap px-5 py-5">
                <span className="block text-[18px] font-bold text-common-black">
                  {app.rating.toFixed(1)}
                </span>
                <Stars className="mt-0.5" />
                <a
                  href={app.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read the ${app.name} reviews on the Shopify App Store, opens in a new tab`}
                  className="mt-1 block text-[13px] text-black-700 underline decoration-black-300 underline-offset-4 transition-colors duration-200 hover:text-primary-main"
                >
                  {reviewCountLabel(app)}
                </a>
              </td>

              <td className="px-5 py-5">
                <span className="block text-[15px] font-semibold text-common-black">
                  {app.priceLabel}
                </span>
                <span className="mt-1 block text-[13px] text-black-700">
                  {app.plans.length === 1
                    ? "One free plan — no paid tier"
                    : `${app.plans.length} plans, free tier included`}
                </span>
              </td>

              <td className="px-5 py-5">
                <CategoryChips app={app} />
              </td>

              <td className="px-5 py-5 text-[13px] leading-relaxed text-black-700">
                {formatList(app.worksWith)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const GlanceCard = ({ app }: { app: ShopifyApp }) => (
  <SpotlightCard
    color="green"
    className="h-full rounded-2xl border border-black-200 bg-common-white shadow-md transition-shadow duration-300 hover:shadow-xl"
    contentClassName="flex h-full flex-col p-6"
  >
    <div className="flex flex-wrap items-start justify-between gap-3">
      <AppIcon app={app} />
      {app.builtForShopify ? <BuiltForShopifyBadge /> : null}
    </div>

    <h3 className="mt-5 break-words font-display text-[19px] font-bold leading-snug tracking-tight text-common-black">
      <a
        href={`#${sectionIdFor(app)}`}
        className="transition-colors duration-200 hover:text-primary-main"
      >
        {app.name}
      </a>
    </h3>
    <p className="mt-2 text-[14px] leading-relaxed text-black-700">
      {app.tagline}
    </p>

    <RatingLine app={app} className="mt-4" />

    <dl className="mt-5 flex flex-col gap-4 border-t border-black-200 pt-4">
      <div className="min-w-0">
        <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black-600">
          Pricing
        </dt>
        <dd className="mt-1 text-[14px] font-semibold text-common-black">
          {app.priceLabel}
          <span className="ml-2 font-normal text-black-700">
            {app.plans.length === 1
              ? "· one free plan"
              : `· ${app.plans.length} plans`}
          </span>
        </dd>
      </div>
      <div className="min-w-0">
        <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black-600">
          Categories
        </dt>
        <dd className="mt-2">
          <CategoryChips app={app} />
        </dd>
      </div>
      <div className="min-w-0">
        <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black-600">
          Works with
        </dt>
        <dd className="mt-1 text-[14px] leading-relaxed text-black-700">
          {formatList(app.worksWith)}
        </dd>
      </div>
    </dl>

    <div className="mt-auto pt-6">
      <a
        href={`#${sectionIdFor(app)}`}
        className="inline-flex items-center gap-2 text-[14px] font-medium text-primary-main transition-colors duration-200 hover:text-pink-700"
      >
        <span>Features and pricing</span>
        <ArrowForwardRounded aria-hidden="true" fontSize="small" />
      </a>
    </div>
  </SpotlightCard>
);

/**
 * THE PAGE'S ONE GIANT WORD — nothing else on /shopify-apps gets one.
 *
 * This is the section that earns it: the comparison surface is one opaque
 * `bg-common-white` card, so as you scroll it rides up over "APPS" and occludes
 * it cleanly, and the word reads through the gutters and around the centred
 * heading block. `speed={0.6}` lags the page by 40%, so the word drifts down
 * behind the card instead of travelling with it.
 *
 * <ScrollStage> supplies the mandatory `relative overflow-hidden` — the word is
 * deliberately wider than the viewport and an unclipped one would scroll the
 * whole page sideways on mobile — and drops the children into their own
 * `relative z-10` layer. Below 1025px <GiantWord> hides itself, which is also
 * where this collapses to a single opaque column.
 *
 * The word takes <GiantWord>'s default tone and must not restate it: Tailwind's
 * `important: true` makes a call-site colour tie with the default on
 * specificity, so an "override" here would be decided by emit order.
 */
const AtAGlance = () => (
  <ScrollStage
    id="apps"
    aria-labelledby="apps-glance-heading"
    word="APPS"
    speed={0.6}
    className="scroll-mt-[100px] px-4 py-[70px] md:px-[50px] lg:px-[100px]"
    contentClassName="mx-auto w-full max-w-[1200px]"
  >
    <FadeIn className="flex w-full flex-col items-center text-center">
      <SectionRule className="mb-4" />
      <Reveal>
        <p className="text-[20px] text-black-800 md:text-[25px]">
          The apps at a glance
        </p>
      </Reveal>
      <h2
        id="apps-glance-heading"
        className="mt-1 max-w-[820px] font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
      >
        <SplitReveal text="Side by side, before the detail" />
      </h2>
      <p className="mt-6 max-w-[780px] text-[15px] leading-relaxed text-black-700 md:text-[18px]">
        Ratings, prices, categories and integrations, read straight from the
        listings. Pick the one that matches your problem and jump to its full
        feature list and pricing below.
      </p>
    </FadeIn>

    <FadeIn y={20} delay={0.08} className="mt-12 w-full">
      <GlanceTable />
    </FadeIn>

    <Stagger
      className="mt-12 w-full xl:hidden"
      stagger={0.08}
      delayChildren={0.05}
      amount={0.08}
    >
      <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {APPS_IN_ORDER.map((app) => (
          <li key={app.id} className="h-full">
            <StaggerItem className="h-full">
              <GlanceCard app={app} />
            </StaggerItem>
          </li>
        ))}
      </ul>
    </Stagger>
  </ScrollStage>
);

/* ── section 3: one substantial block per app ─────────────────────────────── */

/**
 * A single pricing tier. `featured` gets the blue treatment and the pill — but
 * only when the app actually has tiers to choose between, so the Delivery
 * Timer's lone free plan is never labelled "most popular" against nothing.
 */
const PlanCard = ({
  plan,
  showFeatured,
}: {
  plan: AppPlan;
  showFeatured: boolean;
}) => {
  const featured = showFeatured && plan.featured === true;

  return (
    <SpotlightCard
      className={cx(
        "h-full rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl",
        featured
          ? "border-2 border-pink-500 bg-pink-100"
          : "border border-black-200 bg-common-white"
      )}
      contentClassName="flex h-full flex-col p-6"
    >
      {featured ? (
        <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary-main px-3 py-1 text-[12px] font-semibold text-static-white">
          Most popular
        </span>
      ) : null}

      <h4 className="text-[18px] font-semibold text-common-black md:text-[20px]">
        {plan.name}
      </h4>

      <p className="mt-3 font-display text-[30px] font-bold leading-none text-common-black md:text-[34px]">
        {plan.monthly}
        <span className="ml-1.5 font-sans text-[13px] font-normal text-black-700">
          {planPeriodLabel(plan)}
        </span>
      </p>

      {/* Annual only where the listing actually offers it. */}
      <p className="mt-2 min-h-[18px] text-[12px] text-black-600">
        {plan.annual ? (
          <span className="text-shopify-dark">
            or {plan.annual} billed annually
          </span>
        ) : plan.monthlyValue === 0 ? (
          "Free plan"
        ) : (
          "Billed every 30 days"
        )}
      </p>

      <ul
        className={cx(
          "mt-5 flex flex-col gap-2.5 border-t pt-5",
          featured ? "border-pink-300" : "border-black-200"
        )}
      >
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[14px]">
            <CheckRounded
              aria-hidden="true"
              className="mt-[2px] shrink-0 text-shopify-main"
              fontSize="small"
            />
            <span className="min-w-0 text-black-800">{item}</span>
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
};

/**
 * The single-tier case. The Pixel Estimated Delivery Timer has ONE free plan
 * and no paid tier at all, so it gets a full-width card that says exactly that
 * — never a lone column stranded in a four-up grid.
 */
const SoloPlanCard = ({ app, plan }: { app: ShopifyApp; plan: AppPlan }) => (
  <SpotlightCard
    color="green"
    className="rounded-2xl border-2 border-shopify-300 bg-shopify-100 shadow-md transition-shadow duration-300 hover:shadow-xl"
    contentClassName="flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-start"
  >
    <div className="min-w-0 lg:w-[320px] lg:shrink-0">
      <h4 className="font-display text-[22px] font-bold leading-tight text-common-black md:text-[26px]">
        {plan.name} &mdash; the whole app
      </h4>
      <p className="mt-4 font-display text-[40px] font-bold leading-none text-common-black md:text-[48px]">
        {plan.monthly}
        <span className="ml-2 font-sans text-[14px] font-normal text-black-700">
          {planPeriodLabel(plan)}
        </span>
      </p>
      <p className="mt-4 text-[14px] leading-relaxed text-black-800 md:text-[15px]">
        {app.name} has a single plan and nothing to upgrade to. Everything in
        the feature list above is in it.
      </p>
    </div>

    <ul className="grid min-w-0 flex-1 gap-x-8 gap-y-3 sm:grid-cols-2">
      {plan.includes.map((item) => (
        <li key={item} className="flex items-start gap-2 text-[14px]">
          <CheckRounded
            aria-hidden="true"
            className="mt-[2px] shrink-0 text-shopify-main"
            fontSize="small"
          />
          <span className="min-w-0 text-black-800 md:text-[15px]">{item}</span>
        </li>
      ))}
    </ul>
  </SpotlightCard>
);

/**
 * ONE app block, generated for every entry in `APPS_IN_ORDER` — so the four
 * cannot drift apart in depth, order or wording. Header, full feature list,
 * full pricing, one CTA.
 *
 * `tinted` alternates off the loop index and rides a <SoftBand>, never
 * `band-soft` on the <section>: the section-level class would fade the heading
 * and the first and last cards out along with the tint.
 */
const AppSection = ({ app, index }: { app: ShopifyApp; index: number }) => {
  const tinted = index % 2 === 0;
  const solo = app.plans.length === 1;
  const soloPlan = app.plans[0];
  const headingId = `${app.id}-heading`;

  return (
    <section
      id={sectionIdFor(app)}
      aria-labelledby={headingId}
      className="relative w-full scroll-mt-[100px] px-4 py-[70px] md:px-[50px] lg:px-[100px]"
    >
      {tinted ? <SoftBand className="bg-black-100/60" /> : null}

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        {/* header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <FadeIn className="min-w-0 max-w-[720px]">
            <div className="flex flex-wrap items-center gap-3">
              <AppIcon app={app} />
              {/* Read from the listing. PIMW does not carry the badge. */}
              {app.builtForShopify ? <BuiltForShopifyBadge /> : null}
            </div>

            <h2
              id={headingId}
              className="mt-5 font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
            >
              <SplitReveal text={app.name} />
            </h2>

            <p className="mt-3 text-[15px] leading-relaxed text-black-700 md:text-[18px]">
              {app.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <RatingLine app={app} />
              <span className="inline-flex items-center gap-1.5 text-[13px] text-black-600 md:text-[14px]">
                <CalendarMonthOutlined
                  aria-hidden="true"
                  style={{ fontSize: 16 }}
                />
                On the App Store since {app.launched}
              </span>
            </div>

            <CategoryChips app={app} className="mt-5" />
          </FadeIn>

          {/* facts panel — the listing's own metadata, nothing invented */}
          <FadeIn
            y={20}
            delay={0.06}
            className="w-full min-w-0 lg:w-[320px] lg:shrink-0"
          >
            <dl className="flex flex-col gap-4 rounded-2xl border border-black-200 bg-common-white p-6 shadow-md">
              <div className="min-w-0">
                <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-black-600">
                  <PaymentsOutlined aria-hidden="true" style={{ fontSize: 16 }} />
                  Pricing
                </dt>
                <dd className="mt-1 text-[15px] font-semibold text-common-black">
                  {app.priceLabel}
                </dd>
              </div>
              <div className="min-w-0 border-t border-black-200 pt-4">
                <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-black-600">
                  <ExtensionOutlined aria-hidden="true" style={{ fontSize: 16 }} />
                  Works with
                </dt>
                <dd className="mt-1 text-[14px] leading-relaxed text-black-800">
                  {formatList(app.worksWith)}
                </dd>
              </div>
              {app.languageCount > 1 ? (
                <div className="min-w-0 border-t border-black-200 pt-4">
                  <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-black-600">
                    <TranslateOutlined
                      aria-hidden="true"
                      style={{ fontSize: 16 }}
                    />
                    Languages
                  </dt>
                  <dd className="mt-1 text-[14px] text-black-800">
                    {app.languageCount} languages
                  </dd>
                </div>
              ) : null}
            </dl>
          </FadeIn>
        </div>

        {/* features — the app's full list, two columns from lg */}
        <div className="mt-12">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black-600">
            What {app.shortName} does
          </h3>
          <Stagger
            className="mt-5 w-full"
            stagger={0.05}
            delayChildren={0.03}
            amount={0.05}
          >
            <ul className="grid w-full grid-cols-1 gap-x-10 gap-y-3.5 lg:grid-cols-2">
              {app.features.map((feature) => (
                <li key={feature}>
                  <StaggerItem className="flex items-start gap-3">
                    <CheckCircleRounded
                      aria-hidden="true"
                      className="mt-[2px] shrink-0 text-shopify-700"
                      style={{ fontSize: 18 }}
                    />
                    <span className="min-w-0 text-[14px] leading-relaxed text-black-800 md:text-[15px]">
                      {feature}
                    </span>
                  </StaggerItem>
                </li>
              ))}
            </ul>
          </Stagger>
        </div>

        {/* pricing — every tier the listing publishes */}
        <div className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black-600">
              {app.shortName} pricing
            </h3>
            <p className="text-[13px] text-black-700">
              {solo
                ? "One plan, free — there is no paid tier."
                : `${app.plans.length} plans, ${app.priceLabel}. Annual billing where the listing offers it.`}
            </p>
          </div>

          <div className="mt-6 w-full">
            {solo && soloPlan ? (
              <FadeIn y={20}>
                <SoloPlanCard app={app} plan={soloPlan} />
              </FadeIn>
            ) : (
              <Stagger
                className="w-full"
                stagger={0.07}
                delayChildren={0.04}
                amount={0.06}
              >
                <ul
                  className={cx("grid w-full gap-6", planGridClass(app.plans.length))}
                >
                  {app.plans.map((plan) => (
                    <li key={`${app.id}-${plan.name}`} className="h-full min-w-0">
                      <StaggerItem className="h-full">
                        <PlanCard plan={plan} showFeatured={!solo} />
                      </StaggerItem>
                    </li>
                  ))}
                </ul>
              </Stagger>
            )}
          </div>
        </div>

        {/* CTA — the listing itself. `app.internalUrl` is intentionally unused:
            PIMW's value is /shopify-app, which now redirects back to here. */}
        <FadeIn y={16} delay={0.06} className="w-full">
          <div className="mt-10 flex w-full flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <AppStoreCta app={app}>Get {app.shortName} on Shopify</AppStoreCta>
            <a
              href={app.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read all ${reviewCountLabel(app)} for ${app.name} on the Shopify App Store, opens in a new tab`}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-primary-main underline decoration-pink-300 underline-offset-4 transition-colors duration-200 hover:text-pink-700 md:text-[15px]"
            >
              <span>Read all {reviewCountLabel(app)}</span>
              <OpenInNewRounded aria-hidden="true" style={{ fontSize: 15 }} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const AppSections = () => (
  <>
    {APPS_IN_ORDER.map((app, index) => (
      <AppSection key={app.id} app={app} index={index} />
    ))}
  </>
);

/* ── section 4: what they share ───────────────────────────────────────────── */

interface CommonPoint {
  id: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  /** Guard: the point renders only while the data still supports it. */
  when: boolean;
}

const COMMON_POINTS: CommonPoint[] = [
  {
    id: "free",
    title: "A free plan on every app",
    body: `All ${APP_PORTFOLIO.appCount} apps have a free tier. You can install one, set it up and see it working on your storefront before you decide whether to pay for anything — and one of them has no paid tier at all.`,
    icon: <PaymentsOutlined />,
    when: EVERY_APP_HAS_FREE_PLAN && EVERY_APP_HAS_FREE_TIER,
  },
  {
    id: "rating",
    title: `Every listing sits at ${APP_PORTFOLIO.rating.toFixed(1)}`,
    body: `${APP_PORTFOLIO.totalReviews} merchant reviews across the ${APP_PORTFOLIO.appCount} listings, and not one of them has pulled an app below ${APP_PORTFOLIO.rating.toFixed(1)}.`,
    icon: <StarRounded />,
    when: APP_PORTFOLIO.allFiveStar,
  },
  {
    id: "badge",
    title: `${APP_PORTFOLIO.builtForShopifyCount} of ${APP_PORTFOLIO.appCount} are Built for Shopify`,
    body: `Shopify grants the badge to apps that, in its words, "${BUILT_FOR_SHOPIFY_BLURB.replace(/\.$/, "")}". ${APP_PORTFOLIO.builtForShopifyCount} of ours carry it, and it appears on those apps above and nowhere else.`,
    icon: <VerifiedRounded />,
    when:
      APP_PORTFOLIO.builtForShopifyCount > 0 &&
      APP_PORTFOLIO.builtForShopifyCount < APP_PORTFOLIO.appCount,
  },
  {
    id: "surfaces",
    title: "They plug into the same places",
    body: `Every app here works with ${formatList(SHARED_SURFACES)}, so each one installs into the store you already run instead of asking you to change how it works.`,
    icon: <ExtensionOutlined />,
    when: SHARED_SURFACES.length > 0,
  },
  {
    id: "team",
    title: "One team builds and maintains all of them",
    body: "The same developers who ship the apps also handle the roadmap, the Shopify API updates and the bug fixes. Nothing here is white-labelled or resold.",
    icon: <GroupsOutlined />,
    when: true,
  },
  {
    id: "support",
    title: "Support from the people who wrote the code",
    body: "The reviews below say it better than we can: merchants get answers from named people on our team, quickly, and those people stay with the problem until it is actually sorted.",
    icon: <SupportAgentOutlined />,
    when: true,
  },
].filter((point) => point.when);

const InCommon = () => (
  <section
    aria-labelledby="apps-common-heading"
    className="relative w-full px-4 py-[70px] md:px-[50px] lg:px-[100px]"
  >
    {/* Tint on its own feathered layer — `band-soft` on the <section> would fade
        the heading and the first/last card out along with the band. */}
    <SoftBand className="bg-shopify-100/50" />

    <div className="relative z-10 mx-auto w-full max-w-[1200px]">
      <FadeIn className="flex w-full flex-col items-center text-center">
        <SectionRule className="mb-4" />
        <Reveal>
          <p className="text-[20px] text-black-800 md:text-[25px]">
            The through-line
          </p>
        </Reveal>
        <h2
          id="apps-common-heading"
          className="mt-1 max-w-[820px] font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
        >
          <SplitReveal text="What they all have in common" />
        </h2>
      </FadeIn>

      <Stagger
        className="mt-10 w-full"
        stagger={0.07}
        delayChildren={0.05}
        amount={0.1}
      >
        <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMMON_POINTS.map((point) => (
            <li key={point.id} className="h-full">
              <StaggerItem className="h-full">
                <SpotlightCard
                  color="green"
                  className="h-full rounded-2xl border border-black-200 bg-common-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                  contentClassName="flex h-full flex-col p-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-shopify-200 bg-shopify-100 text-shopify-700"
                  >
                    {point.icon}
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold text-common-black md:text-[18px]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-black-700 md:text-[15px]">
                    {point.body}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            </li>
          ))}
        </ul>
      </Stagger>
    </div>
  </section>
);

/* ── section 5: merchant reviews ──────────────────────────────────────────── */

interface PortfolioReview {
  /** Listing name or short name — matched back to the app for the chip link. */
  app: string;
  store: string;
  country: string;
  date: string;
  text: string;
}

/**
 * PIMW's reviews live in `./pimw.ts` and carry no app label, so they are
 * stamped with PIMW's own short name on the way in. Four of the eight are shown
 * here, next to all of `APP_REVIEWS`.
 *
 * Pixel Estimated Delivery Timer is absent on purpose: its App Store reviews
 * were only available as summaries, and a paraphrase is not a quote. The
 * section says so out loud rather than leaving a silent gap.
 */
const PORTFOLIO_REVIEWS: PortfolioReview[] = [
  ...PIMW_REVIEWS.slice(0, 4).map((review) => ({
    app: PIMW.shortName,
    store: review.store,
    country: review.country,
    date: review.date,
    text: review.text,
  })),
  ...APP_REVIEWS,
];

/** Chip label -> listing, so each quote links to the reviews it came from. */
const appForLabel = (label: string): ShopifyApp | undefined =>
  SHOPIFY_APPS.find((app) => app.name === label || app.shortName === label);

/** Apps that have at least one quotable review on this page. */
const QUOTED_APP_IDS = new Set(
  PORTFOLIO_REVIEWS.map((review) => appForLabel(review.app)?.id).filter(
    (id): id is string => Boolean(id)
  )
);

/** Listings with a rating but no verbatim quote we can reproduce. */
const UNQUOTED_APPS = SHOPIFY_APPS.filter(
  (app) => app.reviewCount > 0 && !QUOTED_APP_IDS.has(app.id)
);

const Reviews = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="reviews"
      aria-labelledby="apps-reviews-heading"
      className="w-full scroll-mt-[100px] px-4 py-[70px] md:px-[50px] lg:px-[100px]"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-[660px]">
            <SectionRule className="mb-4" />
            <Reveal>
              <p className="text-[20px] text-black-800 md:text-[25px]">
                Merchant reviews
              </p>
            </Reveal>
            <h2
              id="apps-reviews-heading"
              className="mt-1 font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
            >
              <SplitReveal text="In the merchants' own words" />
            </h2>
            <FadeIn y={16} delay={0.08}>
              <p className="mt-6 text-[15px] leading-relaxed text-black-700 md:text-[18px]">
                Every quote below is reproduced in full from the Shopify App
                Store, with the store name, country and date exactly as
                published, and labelled with the app it was left on.
                {UNQUOTED_APPS.length > 0 ? (
                  <>
                    {" "}
                    {formatList(UNQUOTED_APPS.map((app) => app.name))}{" "}
                    {UNQUOTED_APPS.length === 1 ? "publishes" : "publish"} review
                    summaries rather than full text, so{" "}
                    {UNQUOTED_APPS.length === 1 ? "it is" : "they are"} rated
                    here but not quoted.
                  </>
                ) : null}
              </p>
            </FadeIn>
          </div>

          <ScaleIn className="shrink-0">
            <div className="flex items-center gap-4 rounded-2xl border border-black-200 bg-black-100 px-6 py-5 shadow-md">
              <p className="font-display text-[40px] font-bold leading-none text-primary-main">
                {APP_PORTFOLIO.rating.toFixed(1)}
              </p>
              <div className="min-w-0">
                <Stars />
                <p className="mt-1 text-[13px] text-black-700">
                  {APP_PORTFOLIO.totalReviews} reviews across{" "}
                  {APP_PORTFOLIO.appCount} apps
                </p>
              </div>
            </div>
          </ScaleIn>
        </div>

        <ul className="mt-10 gap-6 sm:columns-2 lg:columns-3">
          {PORTFOLIO_REVIEWS.map((review, index) => {
            const source = appForLabel(review.app);

            return (
              <li
                key={`${review.app}-${review.store}-${review.date}`}
                className="mb-6 break-inside-avoid"
              >
                <FadeIn delay={reduce ? 0 : (index % 3) * 0.08} amount={0.05}>
                  <SpotlightCard
                    className="rounded-2xl border border-black-200 bg-common-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                    contentClassName="flex flex-col p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {source ? (
                        <a
                          href={source.reviewsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Read the ${source.name} reviews on the Shopify App Store, opens in a new tab`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-shopify-200 bg-shopify-100 px-3 py-1 text-[12px] font-semibold text-shopify-700 transition-colors duration-200 hover:bg-shopify-200"
                        >
                          {source.shortName}
                          <OpenInNewRounded
                            aria-hidden="true"
                            style={{ fontSize: 13 }}
                          />
                        </a>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-shopify-200 bg-shopify-100 px-3 py-1 text-[12px] font-semibold text-shopify-700">
                          {review.app}
                        </span>
                      )}
                      <Stars />
                    </div>

                    <blockquote className="mt-4 text-[14px] leading-relaxed text-black-800 md:text-[15px]">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>

                    <footer className="mt-5 flex items-start justify-between gap-3 border-t border-black-200 pt-4">
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold text-primary-main">
                          {review.store}
                        </p>
                        <p className="text-[13px] text-black-600">
                          {review.country}
                        </p>
                      </div>
                      <p className="shrink-0 text-[13px] text-black-600">
                        {review.date}
                      </p>
                    </footer>
                  </SpotlightCard>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

/* ── section 6: final CTA ─────────────────────────────────────────────────── */

/* py >= the 9rem DarkBand feather, so the badge and the closing links sit on
   the band's solid core rather than in the fade. */
const FinalCta = () => (
  <section
    aria-labelledby="apps-cta-heading"
    className="relative w-full overflow-hidden px-4 py-[150px] md:px-[50px] lg:px-[100px]"
  >
    <DarkBand />

    <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
      <ScaleIn>
        <span className="inline-flex items-center gap-2 rounded-full border border-static-white/25 bg-static-white/10 px-3 py-1.5 text-[13px] font-medium text-static-white">
          <Image
            src={ShopifyLogo}
            alt=""
            aria-hidden="true"
            className="h-[16px] w-[16px]"
          />
          {EVERY_APP_HAS_FREE_PLAN
            ? "Every app has a free plan"
            : `${APP_PORTFOLIO.appCount} apps on the Shopify App Store`}
        </span>
      </ScaleIn>

      <h2
        id="apps-cta-heading"
        className="mt-6 font-display text-[25px] font-bold leading-tight tracking-tight text-static-white md:text-[35px]"
      >
        <SplitReveal text="Install one, or have us build yours" />
      </h2>

      <FadeIn y={16} delay={0.08}>
        <p className="mt-5 max-w-[680px] text-[15px] leading-relaxed text-static-white/75 md:text-[18px]">
          Open any listing and try it on your store on the free plan. If what
          you need isn&rsquo;t on the shelf, the same team takes on custom and
          public Shopify app builds &mdash; from first scaffold to App Store
          submission.
        </p>
      </FadeIn>

      <FadeIn y={16} delay={0.14} className="w-full">
        <ul className="mt-8 flex w-full flex-wrap items-center justify-center gap-3">
          {APPS_IN_ORDER.map((app) => (
            <li key={app.id}>
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${app.name} on the Shopify App Store, opens in a new tab`}
                className="inline-flex items-center gap-2 rounded-full border border-static-white/30 bg-static-white/10 px-4 py-2 text-[13px] font-medium text-static-white transition-colors duration-200 hover:bg-static-white/20 md:text-[14px]"
              >
                {app.shortName}
                <OpenInNewRounded aria-hidden="true" style={{ fontSize: 15 }} />
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn y={16} delay={0.2} className="w-full">
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <HoverLift className="w-full sm:w-auto">
            <Link
              href="/services/shopify-app-development"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-main px-6 py-3 text-[15px] font-medium text-static-white shadow-md transition-colors duration-200 hover:bg-pink-700 sm:w-auto md:text-[16px]"
            >
              <span>Shopify app development</span>
              <ArrowForwardRounded aria-hidden="true" fontSize="small" />
            </Link>
          </HoverLift>
          <HoverLift className="w-full sm:w-auto">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-static-white/40 bg-transparent-main px-6 py-3 text-[15px] font-medium text-static-white transition-colors duration-200 hover:bg-static-white/10 sm:w-auto md:text-[16px]"
            >
              <span>Talk to the team</span>
            </a>
          </HoverLift>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ── page ─────────────────────────────────────────────────────────────────── */

/**
 * The whole /shopify-apps page body. `Wrapper` (src/wrapper/wrapper.tsx)
 * already renders the topbar, the #contact form and the footer around it, so
 * nothing here repeats them; the hero just carries the fixed-topbar clearance.
 */
const ShopifyApps = () => (
  <main className="w-full">
    <Hero />
    <AtAGlance />
    <AppSections />
    <InCommon />
    <Reviews />
    <FinalCta />
  </main>
);

export default ShopifyApps;
