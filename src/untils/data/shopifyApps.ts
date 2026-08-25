/**
 * Every Shopify app published by Pixelspiece solutions.
 *
 * VERIFIED against the live Shopify App Store listings on 2026-08-25.
 * Single source of truth — do not hardcode a rating, review count, price or
 * badge anywhere else in the app. PIMW's deeper page content (plans, feature
 * groups, verbatim reviews, languages) lives in ./pimw.ts; this module is the
 * portfolio-level view of all four.
 *
 * ── NEVER CLAIM ────────────────────────────────────────────────────────────
 * No install counts, no merchant counts, no revenue/conversion-lift figures,
 * no Shopify Plus or partner-tier claims, no awards. And note the badge is
 * per-app: THREE of the four carry "Built for Shopify"; PIMW does NOT.
 * Never state or imply the badge for PIMW.
 */

export type ShopifyApp = {
  id: string;
  /** Exact listing name. */
  name: string;
  /** Short label for chips and cards where the full name will not fit. */
  shortName: string;
  /** Verbatim listing tagline. */
  tagline: string;
  appStoreUrl: string;
  reviewsUrl: string;
  rating: number;
  reviewCount: number;
  /** Shopify's "Built for Shopify" badge — verified per listing. */
  builtForShopify: boolean;
  launched: string;
  /** Human-readable price range for a card. */
  priceLabel: string;
  freeplan: boolean;
  categories: string[];
  worksWith: string[];
  languageCount: number;
  /** 3-5 short capability lines, rewritten in clean prose from the listing. */
  highlights: string[];
  /** Internal deep-dive route, when one exists. */
  internalUrl: string | null;
  /** Icon key the UI maps to an MUI icon. */
  icon: "personalize" | "sizing" | "delivery" | "discount";
  /**
   * Pricing tiers, verbatim from the listing. Every app has a free tier.
   * `annual` is null where the listing shows no annual option.
   */
  plans: AppPlan[];
  /** Longer capability list for the comparison page, in clean prose. */
  features: string[];
};

export type AppPlan = {
  name: string;
  monthly: string;
  /** Numeric monthly price, for sorting and schema. */
  monthlyValue: number;
  /** Annual total, or null when the listing offers no annual billing. */
  annual: string | null;
  /** What the tier includes — the listing's own limits. */
  includes: string[];
  featured?: boolean;
};

export const BUILT_FOR_SHOPIFY_BLURB =
  "Meets our highest standards for performance, design, and integration.";

export const SHOPIFY_APPS: ShopifyApp[] = [
  {
    id: "pimw",
    name: "PIMW product personalizer",
    shortName: "PIMW",
    tagline: "Add product options variants options & live personalization",
    appStoreUrl: "https://apps.shopify.com/add-on-builder",
    reviewsUrl: "https://apps.shopify.com/add-on-builder/reviews",
    rating: 5.0,
    reviewCount: 8,
    builtForShopify: false,
    launched: "May 4, 2026",
    priceLabel: "Free – $24.99/mo",
    freeplan: true,
    categories: ["Product variants", "Custom products", "Custom file upload"],
    worksWith: ["Checkout", "Shopify Admin", "Print on demand"],
    languageCount: 18,
    highlights: [
      "Live preview so customers see their personalized design on the product in real time",
      "Unlimited option types: swatches, dropdowns, monogram, text and engraving",
      "Dynamic pricing per option — charge extra for engraving, text or add-ons",
      "Conditional logic, file upload and image swatches, with no code",
    ],
    internalUrl: "/shopify-apps#pimw",
    icon: "personalize",
    plans: [
      {
        name: "Free",
        monthly: "$0",
        monthlyValue: 0,
        annual: null,
        includes: [
          "1 option group",
          "2 fields per group",
          "10 product assignments",
          "1 personalizer template",
          "Unlimited custom orders",
        ],
      },
      {
        name: "Basic",
        monthly: "$7.99",
        monthlyValue: 7.99,
        annual: "$76.70/yr",
        includes: [
          "10 option groups",
          "8 fields per group",
          "50 product assignments",
          "5 templates",
          "Unlimited custom orders",
        ],
      },
      {
        name: "Pro",
        monthly: "$13.99",
        monthlyValue: 13.99,
        annual: "$134.30/yr",
        includes: [
          "30 option groups",
          "15 fields per group",
          "200 product assignments",
          "15 templates",
          "Unlimited custom orders",
        ],
        featured: true,
      },
      {
        name: "Unlimited",
        monthly: "$24.99",
        monthlyValue: 24.99,
        annual: "$239.99/yr",
        includes: [
          "Unlimited option groups",
          "Unlimited fields",
          "Unlimited product assignments",
          "Unlimited templates",
          "Unlimited custom orders",
        ],
      },
    ],
    features: [
      "Live preview — customers see the personalized design on the product in real time",
      "Engraving, monogram text, photo upload, swatches and dropdowns",
      "Dynamic pricing per option, applied through Shopify's Cart Transform",
      "Conditional logic that shows or hides fields based on earlier answers",
      "10 option field types, plus custom text with 35+ fonts",
      "PNG and JPEG uploads with rotation and print-ready output",
      "AI builds option sets in seconds",
      "Works with every theme through app blocks — no code",
    ],
  },
  {
    id: "tailor-size-guide",
    name: "Tailor Size guide & size chart",
    shortName: "Tailor Size Guide",
    tagline:
      "Reduce returns with custom size charts, size recommendations & made to measure custom clothing.",
    appStoreUrl: "https://apps.shopify.com/tailor-size-guide",
    reviewsUrl: "https://apps.shopify.com/tailor-size-guide/reviews",
    rating: 5.0,
    reviewCount: 4,
    builtForShopify: true,
    launched: "March 20, 2026",
    priceLabel: "Free – $24.99/mo",
    freeplan: true,
    categories: ["Custom products", "Product variants"],
    worksWith: ["Shopify Admin"],
    languageCount: 19,
    highlights: [
      "AI reads a size-chart image and fills in the data for you",
      "AI recommends the right size from a shopper's measurements",
      "Guided measurement flow, saved and reused for returning customers",
      "Size charts by gender and category, styled to match the theme",
    ],
    internalUrl: null,
    icon: "sizing",
    plans: [
      {
        name: "Free",
        monthly: "$0",
        monthlyValue: 0,
        annual: null,
        includes: [
          "Up to 2 size charts",
          "1 custom measurement form",
          "3 AI scans",
          "5 AI descriptions",
          "Unlimited size recommender",
        ],
      },
      {
        name: "Starter",
        monthly: "$7.99",
        monthlyValue: 7.99,
        annual: "$76.71/yr",
        includes: [
          "Up to 15 size charts",
          "2 measurement forms",
          "20 AI scans",
          "20 AI descriptions",
          "Advanced features",
        ],
      },
      {
        name: "Professional",
        monthly: "$13.99",
        monthlyValue: 13.99,
        annual: "$134.30/yr",
        includes: [
          "Up to 20 size charts",
          "10 measurement forms",
          "30 AI scans",
          "30 AI descriptions",
          "10 premium themes",
        ],
        featured: true,
      },
      {
        name: "Advanced",
        monthly: "$24.99",
        monthlyValue: 24.99,
        annual: "$239.90/yr",
        includes: [
          "Unlimited size charts",
          "Unlimited forms",
          "35 AI scans",
          "35 AI descriptions",
          "Premium themes",
        ],
      },
    ],
    features: [
      "AI reads a size-chart image and fills in the data for you",
      "AI recommends the right size from a shopper's measurements",
      "Guided measurement flow, saved and reused for returning customers",
      "Size charts by gender and category",
      "Styling that matches the store theme",
      "cm-to-inch conversion, in 19 languages",
      "Built to cut returns on apparel and made-to-measure",
    ],
  },
  {
    id: "delivery-timer",
    name: "Pixel Estimated Delivery Timer",
    shortName: "Delivery Timer",
    tagline: "Show Estimated delivery date & countdown timer on product page",
    appStoreUrl: "https://apps.shopify.com/shipdate",
    reviewsUrl: "https://apps.shopify.com/shipdate/reviews",
    rating: 5.0,
    reviewCount: 3,
    builtForShopify: true,
    launched: "May 12, 2026",
    priceLabel: "Free",
    freeplan: true,
    categories: ["Delivery and pickup"],
    worksWith: ["Checkout", "Shopify POS", "Shopify Admin", "Online Store 2.0"],
    languageCount: 1,
    highlights: [
      "Estimated delivery date and countdown on product pages, cart and checkout",
      "ETAs from the shopper's country, postal code and shipping zone",
      "Processing time, cutoff hours, holidays and weekend blackout dates",
      "Rules per product, collection, country or zone",
    ],
    internalUrl: null,
    icon: "delivery",
    plans: [
      {
        name: "Free",
        monthly: "$0",
        monthlyValue: 0,
        annual: null,
        includes: [
          "Estimated delivery date and countdown",
          "Product page, cart and checkout",
          "Rules by product, collection, country or zone",
          "Processing time, cutoffs and holidays",
          "No paid tier — the whole app is free",
        ],
        featured: true,
      },
    ],
    features: [
      "Estimated delivery date and countdown on product pages, cart and checkout",
      "ETAs from the shopper's country, postal code and shipping zone",
      "Processing time, cutoff hours, holidays and weekend blackout dates",
      "Transit time by zone, country, postal code, product or collection",
      "Works with Checkout, Shopify POS and Online Store 2.0",
      "Set expectations up front to cut delivery-related enquiries",
    ],
  },
  {
    id: "px-schedule",
    name: "PX Schedule Sales & Discounts",
    shortName: "PX Schedule",
    tagline:
      "Schedule flash sales, BOGO offers & volume discounts with countdown timer to create sales urgency",
    appStoreUrl: "https://apps.shopify.com/pulse-countdown-timer-bar",
    reviewsUrl: "https://apps.shopify.com/pulse-countdown-timer-bar/reviews",
    rating: 5.0,
    reviewCount: 3,
    builtForShopify: true,
    launched: "June 1, 2026",
    priceLabel: "Free – $9.99/mo",
    freeplan: true,
    categories: ["Countdown timer", "Discounts"],
    worksWith: ["Checkout", "Shopify Admin"],
    languageCount: 1,
    highlights: [
      "Schedule sales in advance and run them on autopilot",
      "Percentage, fixed-amount and free-shipping discounts with a countdown",
      "BOGO / Buy X Get Y and volume tiers, applied automatically at checkout",
      "No discount codes needed — everything applies at checkout",
    ],
    internalUrl: null,
    icon: "discount",
    plans: [
      {
        name: "Free",
        monthly: "$0",
        monthlyValue: 0,
        annual: null,
        includes: [
          "Unlimited campaigns and timers",
          "Full design customization",
          "3 AI credits per month",
        ],
      },
      {
        name: "Starter",
        monthly: "$5.99",
        monthlyValue: 5.99,
        annual: "$57.50/yr",
        includes: [
          "Everything in Free",
          "Announcement bar",
          "Product and cart timers",
          "Floating widget and pop-up placement",
          "10 AI credits per month",
        ],
      },
      {
        name: "Growth",
        monthly: "$7.99",
        monthlyValue: 7.99,
        annual: "$76.70/yr",
        includes: [
          "Everything in Starter",
          "15 AI credits per month",
        ],
        featured: true,
      },
      {
        name: "Pro",
        monthly: "$9.99",
        monthlyValue: 9.99,
        annual: "$95.90/yr",
        includes: [
          "Everything in Growth",
          "25 AI credits per month",
        ],
      },
    ],
    features: [
      "Schedule sales in advance and run them on autopilot",
      "Percentage, fixed-amount and free-shipping discounts with a countdown",
      "BOGO / Buy X Get Y and volume tier discounts",
      "Spend-more-save-more goals with a flash-sale countdown",
      "Start, end and recurring sale rules",
      "Target by product, collection or page, with discount tags and sale icons",
      "Everything applies automatically at checkout — no discount codes",
    ],
  },
];

/** Portfolio-level roll-ups. Derived, so they can never drift from the list. */
export const APP_PORTFOLIO = {
  appCount: SHOPIFY_APPS.length,
  totalReviews: SHOPIFY_APPS.reduce((sum, app) => sum + app.reviewCount, 0),
  builtForShopifyCount: SHOPIFY_APPS.filter((a) => a.builtForShopify).length,
  /** Every app currently sits at 5.0, so this is exact, not an average of averages. */
  allFiveStar: SHOPIFY_APPS.every((a) => a.rating === 5),
  rating: 5.0,
};

/**
 * Verbatim reviews across the newer apps. PIMW's eight live in ./pimw.ts.
 * Only quote what is listed here — the Pixel Estimated Delivery Timer reviews
 * were only available as summaries, so they are deliberately absent rather
 * than paraphrased into fake quotes.
 */
export type AppReview = {
  app: string;
  store: string;
  country: string;
  date: string;
  text: string;
};

export const APP_REVIEWS: AppReview[] = [
  {
    app: "Tailor Size Guide",
    store: "Clothen",
    country: "India",
    date: "August 23, 2026",
    text: "I've had a great experience using Tailor Size Guide. The app is easy to use, and the team has been extremely helpful throughout the setup process. They provided clear guidance on how to create size guides and helped me understand the process of publishing them correctly. Their support team is responsive, patient, and genuinely focused on helping merchants succeed. Highly recommended for Shopify stores looking for an easy way to add professional size guides and improve the customer shopping experience.",
  },
  {
    app: "Tailor Size Guide",
    store: "RS SAKHIYA DIAMOND",
    country: "India",
    date: "April 4, 2026",
    text: "We use size chart features regularly, and it's very easy to create and manage. This app is best for custom size chart needs and helps our customers choose the right size with confidence. Simple, effective, and very useful.",
  },
  {
    app: "Tailor Size Guide",
    store: "Vasudhara Vastra",
    country: "India",
    date: "April 9, 2026",
    text: "Perfect size charts and custom measurements — zero returns, happy customers!",
  },
  {
    app: "PX Schedule Sales & Discounts",
    store: "Sellmed",
    country: "India",
    date: "July 1, 2026",
    text: "We've had a great experience with this app so far. After using the Growth plan for a few days, we've already seen better customer engagement and an increase in conversions. The features are well thought out, everything runs smoothly, and it's nice that there's also a free plan for merchants who want to try it first.",
  },
  {
    app: "PX Schedule Sales & Discounts",
    store: "boonbabies",
    country: "India",
    date: "July 2, 2026",
    text: "working well and excellent customer support",
  },
  {
    app: "PX Schedule Sales & Discounts",
    store: "Vasudhara Vastra",
    country: "India",
    date: "June 9, 2026",
    text: "Best Budget Friendly App",
  },
];
