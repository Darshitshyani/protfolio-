/**
 * PIMW — single source of truth for every PIMW marketing surface on this site.
 *
 * Everything in this file comes from the verified product brief: the live
 * Shopify App Store listing (apps.shopify.com/add-on-builder) and
 * printitmyway.com. If a fact is not in here, do not write copy that depends
 * on it — add it here first, with a source, or leave it out.
 *
 * ── NEVER CLAIM (not verified, do not add) ────────────────────────────────
 *  - a "Built for Shopify" badge — the listing does not carry one
 *  - install counts, merchant counts, "10,000+ stores", any user number
 *  - Shopify Plus certification, a Partner tier/level, awards
 *  - any conversion-lift / revenue-lift percentage
 *  - client names beyond the reviews below
 * ── SAFE TO STATE ─────────────────────────────────────────────────────────
 *  - Pixels Piece is a Shopify Partner and publishes a public App Store app
 *  - PIMW is rated 5.0 from 8 reviews, all five-star
 *
 * Verbatim listing strings are kept alongside the cleaned-up copy so a section
 * can quote the source exactly where a quote is wanted. The listing's own
 * grammar slips ("options variants options", "swatchs") stay only in the
 * `*Verbatim` fields — never render those as our prose.
 */

/* ── types ────────────────────────────────────────────────────────────────── */

/**
 * Short icon keys. Each consuming section maps these to an MUI icon itself —
 * this module stays free of JSX so it can be imported anywhere.
 * Suggested @mui/icons-material mappings are noted next to each union member.
 */
export type PimwIconKey =
  | "preview" // VisibilityOutlined
  | "swatch" // PaletteOutlined
  | "image" // ImageOutlined
  | "pricing" // LocalOfferOutlined
  | "logic" // AccountTreeOutlined
  | "upload" // CloudUploadOutlined
  | "customize" // TuneOutlined
  | "inventory" // Inventory2Outlined
  | "files" // InsertDriveFileOutlined
  | "install" // ExtensionOutlined
  | "build" // BuildOutlined
  | "assign" // PlaylistAddCheckOutlined
  | "personalize" // AutoAwesomeOutlined
  | "apparel" // CheckroomOutlined
  | "gift" // CardGiftcardOutlined
  | "merch" // StorefrontOutlined
  | "award" // EmojiEventsOutlined
  | "language" // TranslateOutlined
  | "fonts" // TextFieldsOutlined
  | "speed" // BoltOutlined
  | "star"; // StarRounded

export interface PimwHighlight {
  /** Short, clean headline written by us. */
  title: string;
  /** Clean prose that preserves the listing bullet's meaning. */
  body: string;
  icon: PimwIconKey;
  /** The App Store bullet, exactly as published. Quote only, never as prose. */
  sourceVerbatim: string;
}

export interface PimwFeatureGroup {
  group: string;
  icon: PimwIconKey;
  items: string[];
}

export interface PimwPlan {
  id: string;
  name: string;
  /** Display price per 30 days. */
  monthly: string;
  monthlyValue: number;
  /** Display price per year, or null when the tier has no annual option. */
  annual: string | null;
  annualValue: number | null;
  annualNote: string | null;
  optionGroups: string;
  fieldsPerGroup: string;
  productAssignments: string;
  templates: string;
  /** Exactly one tier is featured (Pro). */
  featured: boolean;
  ctaLabel: string;
  /** One-line positioning derived only from the tier's own limits. */
  blurb: string;
}

export interface PimwStep {
  step: number;
  title: string;
  body: string;
  icon: PimwIconKey;
}

export interface PimwUseCase {
  title: string;
  body: string;
  icon: PimwIconKey;
}

export interface PimwReview {
  store: string;
  country: string;
  rating: number;
  /** As shown on the listing, e.g. "Aug 19, 2026" or "edited Jul 13, 2026". */
  date: string;
  /** Verbatim review text. Do not edit, trim or paraphrase this. */
  text: string;
}

export interface PimwStat {
  id: string;
  /** Numeric target — feed it straight to <CountUp value={...} />. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places for CountUp; 1 keeps the rating as "5.0". */
  decimals?: number;
  label: string;
}

/* ── identity ─────────────────────────────────────────────────────────────── */

export const PIMW = {
  /** App name as it appears in the App Store search listing. */
  name: "PIMW product personalizer",
  /** The listing's own H1 / long product name. */
  longName: "PIMW Custom Product Designer",
  /** Short name for nav items, chips and breadcrumbs. */
  shortName: "PIMW",
  /** Listing subtitle, verbatim. */
  tagline: "Add product options variants options & live personalization",
  /** Product-site tagline, verbatim — the better line for a hero. */
  marketingTagline: "Let your customers design it. You just ship it.",

  developer: "Pixelspiece solutions",
  developerSite: "https://www.pixelspiece.com/",
  location: "Surat, GJ, IN",

  appStoreUrl: "https://apps.shopify.com/add-on-builder",
  reviewsUrl: "https://apps.shopify.com/add-on-builder/reviews",
  siteUrl: "https://printitmyway.com",
  docsUrl: "https://printitmyway.com/docs.html",
  faqUrl: "https://www.printitmyway.com/#faq",
  privacyUrl: "https://printitmyway.com/privacy.html",

  rating: 5.0,
  reviewCount: 8,
  launchedLabel: "Launched May 4, 2026",

  /** Long description, verbatim from the listing. Quote or paraphrase — never contradict. */
  description:
    "Sell custom products your customers design themselves. Add unlimited product options variants options: engraving, monogram text, photo upload, swatches, dropdowns and custom file upload. Buyers see their design in live preview before checkout. This product customizer sets dynamic pricing, shows or hides fields with conditional logic, and builds option sets in seconds with AI. From personalized jewelry engraving, product Live personalization live customization that convert. No code.",

  /** Our own clean summary of the description above. Safe for meta tags. */
  summary:
    "PIMW lets Shopify merchants sell products their customers design themselves — engraving, monogram text, photo upload, swatches and dropdowns, with a live preview before checkout, dynamic pricing per option and conditional logic. No code.",

  /** Listing categories, verbatim. */
  categories: ["Product variants", "Custom products", "Custom file upload"],
  /** Listing "Works with", verbatim. */
  worksWith: ["Checkout", "Shopify Admin", "Print on demand"],

  /** All 18 supported languages, in listing order. */
  languages: [
    "English",
    "German",
    "French",
    "Spanish",
    "Dutch",
    "Portuguese (Portugal)",
    "Russian",
    "Japanese",
    "Chinese (Simplified)",
    "Korean",
    "Turkish",
    "Polish",
    "Swedish",
    "Danish",
    "Finnish",
    "Thai",
    "Vietnamese",
    "Italian",
  ],
  languageCount: 18,
};

/* ── listing highlights (rewritten cleanly, meaning preserved) ────────────── */

export const PIMW_HIGHLIGHTS: PimwHighlight[] = [
  {
    title: "Live preview",
    body: "Customers see their personalized design on the product in real time, before they add it to the cart.",
    icon: "preview",
    sourceVerbatim:
      "Live preview: customers see the personalized design on the product in real time",
  },
  {
    title: "Unlimited option types",
    body: "Build as many product options as you need: swatches, dropdowns, monogram text and engraving.",
    icon: "swatch",
    sourceVerbatim:
      "Unlimited variants options: swatches, dropdowns, monogram, text & engraving",
  },
  {
    title: "Text and image personalization",
    body: "Made for print on demand and customized products, with both text and uploaded artwork on the same item.",
    icon: "image",
    sourceVerbatim:
      "Text & image Personalization, built for print on demand & customized product",
  },
  {
    title: "Dynamic pricing per option",
    body: "Charge extra for engraving, custom text or any add-on, and the price updates as the customer chooses.",
    icon: "pricing",
    sourceVerbatim:
      "Dynamic pricing per option: charge extra for engraving, text, or add-ons",
  },
  {
    title: "Conditional logic and file upload",
    body: "Show or hide fields based on earlier answers, accept file uploads and offer image swatches.",
    icon: "logic",
    sourceVerbatim:
      "product options & customizer with conditional logic, file upload & image swatchs",
  },
];

/* ── feature groups (from the listing's own grouping) ─────────────────────── */

export const PIMW_FEATURE_GROUPS: PimwFeatureGroup[] = [
  {
    group: "Customization",
    icon: "customize",
    items: [
      "Checkboxes",
      "Swatches",
      "Conditional logic",
      "Fonts",
      "Dropdowns",
      "File upload",
      "Multi-select",
      "Numbers",
      "Radio buttons",
      "Custom text",
      "Gift wrap",
      "Preview",
      "Translations",
    ],
  },
  {
    group: "Pricing",
    icon: "pricing",
    items: [
      "Conditional pricing",
      "Custom pricing",
      "Dynamic pricing",
      "Add-ons",
      "Variant upcharges",
      "Tiered pricing",
      "Premium upcharges",
    ],
  },
  {
    group: "Inventory",
    icon: "inventory",
    items: ["SKU management", "Stock availability tracking", "Auto-updates"],
  },
  {
    group: "Files",
    icon: "files",
    items: [
      "PNG and JPEG",
      "Image rotation",
      "Add text",
      "Custom fonts",
      "Custom fields",
      "Preview",
      "File download",
      "Print-ready output",
    ],
  },
];

/* ── pricing ──────────────────────────────────────────────────────────────── */

/** Shown once above or below the plan grid. */
export const PIMW_PRICING_NOTE =
  "Prices in USD, billed every 30 days. Annual billing saves 20%. Every plan includes unlimited custom orders.";

export const PIMW_PLANS: PimwPlan[] = [
  {
    id: "free",
    name: "Free",
    monthly: "$0",
    monthlyValue: 0,
    annual: null,
    annualValue: null,
    annualNote: null,
    optionGroups: "1",
    fieldsPerGroup: "2",
    productAssignments: "10",
    templates: "1",
    featured: false,
    ctaLabel: "Install free",
    blurb: "Put live personalization on a first set of products and try it end to end.",
  },
  {
    id: "basic",
    name: "Basic",
    monthly: "$7.99",
    monthlyValue: 7.99,
    annual: "$76.70",
    annualValue: 76.7,
    annualNote: "billed yearly",
    optionGroups: "10",
    fieldsPerGroup: "8",
    productAssignments: "50",
    templates: "5",
    featured: false,
    ctaLabel: "Choose Basic",
    blurb: "For a growing range of personalized products across a small catalogue.",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: "$13.99",
    monthlyValue: 13.99,
    annual: "$134.30",
    annualValue: 134.3,
    annualNote: "billed yearly",
    optionGroups: "30",
    fieldsPerGroup: "15",
    productAssignments: "200",
    templates: "15",
    featured: true,
    ctaLabel: "Choose Pro",
    blurb: "For stores running personalization across most of the catalogue.",
  },
  {
    id: "unlimited",
    name: "Unlimited",
    monthly: "$24.99",
    monthlyValue: 24.99,
    annual: "$239.99",
    annualValue: 239.99,
    annualNote: "billed yearly",
    optionGroups: "Unlimited",
    fieldsPerGroup: "Unlimited",
    productAssignments: "Unlimited",
    templates: "Unlimited",
    featured: false,
    ctaLabel: "Choose Unlimited",
    blurb: "No caps on option groups, fields, product assignments or templates.",
  },
];

/** Row labels for a plan comparison table, in the order the plan fields appear. */
export const PIMW_PLAN_ROWS: Array<{
  key: "optionGroups" | "fieldsPerGroup" | "productAssignments" | "templates";
  label: string;
}> = [
  { key: "optionGroups", label: "Option groups" },
  { key: "fieldsPerGroup", label: "Fields per group" },
  { key: "productAssignments", label: "Product assignments" },
  { key: "templates", label: "Templates" },
];

/* ── how it works (printitmyway.com) ──────────────────────────────────────── */

export const PIMW_STEPS: PimwStep[] = [
  {
    step: 1,
    title: "Install the app",
    body: "Add PIMW from the Shopify App Store. It works with every Shopify theme through app blocks, and setup takes under five minutes with no code.",
    icon: "install",
  },
  {
    step: 2,
    title: "Create your options",
    body: "Build an option group from ten field types — custom text, dropdowns, swatches, file upload and more — and set add-on pricing per option.",
    icon: "build",
  },
  {
    step: 3,
    title: "Assign it to products",
    body: "Apply the group to the products that should be personalizable, and use conditional logic to show or hide fields as customers choose.",
    icon: "assign",
  },
  {
    step: 4,
    title: "Customers personalize",
    body: "Shoppers type, upload and preview their design live on the product, then check out with print-ready output ready for fulfilment.",
    icon: "personalize",
  },
];

/* ── use cases ────────────────────────────────────────────────────────────── */

export const PIMW_USE_CASES: PimwUseCase[] = [
  {
    title: "Custom apparel",
    body: "Let shoppers add names, numbers or their own artwork to a garment and see it on the product before they buy.",
    icon: "apparel",
  },
  {
    title: "Personalized gifts",
    body: "Offer monograms, engraved messages and gift wrap as priced options on the same product page.",
    icon: "gift",
  },
  {
    title: "Branded merchandise",
    body: "Take a customer logo upload, keep the print-ready file with the order and hand it straight to fulfilment.",
    icon: "merch",
  },
  {
    title: "Awards and engraving",
    body: "Collect engraving text, pick a font from the library and preview the finished piece live on the product.",
    icon: "award",
  },
];

/* ── platform facts (all verified) ───────────────────────────────────────── */

export const PIMW_PLATFORM: string[] = [
  "Works with every Shopify theme through app blocks",
  "Real-time option pricing through Shopify's Cart Transform function",
  "Live canvas preview with custom text, 35+ fonts and logo uploads",
  "Ten option field types with conditional logic",
  "No code required — installs in under five minutes",
];

/* ── reviews (VERBATIM — do not edit the text) ────────────────────────────── */

export const PIMW_REVIEWS: PimwReview[] = [
  {
    store: "Krishnam Jewel",
    country: "India",
    rating: 5,
    date: "Aug 19, 2026",
    text: "One of the best apps I've added to my jewelry store. I use it for engraving so customers can type their name and see it on the piece live before they order, which has saved me a ton of back-and-forth. But the thing that really won me over is the support. Whenever I get stuck, they reply fast and actually solve the problem instead of sending me in circles. Small fixes they handle on the spot, and anything bigger they follow up on by email and stay with it until it's sorted.",
  },
  {
    store: "Tala Gold Collection",
    country: "United Arab Emirates",
    rating: 5,
    date: "Aug 19, 2026",
    text: "First of all, a special thanks to Mr. Mohit Shyani for his amazing support! I installed the PIMW app for my Shopify store, and the team really helped me customize the options according to my specific requirements. They were very patient, responsive, and guided me through the setup whenever I needed help. The app is very helpful and flexible, especially for stores that need product customization and different options. What impressed me the most was the excellent customer support and their willingness to understand and implement my requirements. Highly recommended!",
  },
  {
    store: "Sellmed",
    country: "India",
    rating: 5,
    date: "Jun 19, 2026",
    text: "This product options app is excellent and very easy to use. Setting up option pricing is simple and straightforward, even for beginners. The biggest advantage is that it handles both product options and print-on-demand functionality in one app, which saves a lot of time and effort. The interface is clean, easy to understand, and the features work exactly as expected. If you're looking for a reliable solution for product customization and print-on-demand products, I highly recommend this app.",
  },
  {
    store: "Cutiglow.in",
    country: "India",
    rating: 5,
    date: "May 9, 2026",
    text: "Been using this app for a short time on my Shopify store and honestly it's been really useful so far. The addon builder is clean, easy to understand, and gives much more flexibility compared to standard Shopify product options. Setting up custom add-ons and personalization options was smoother than expected. What I liked most is that it doesn't feel overly complicated even with multiple option types and conditional logic. The UI is simple and works well with the store theme. Support team was also responsive whenever I had small setup questions. Definitely a good option for stores selling customizable products.",
  },
  {
    store: "52 Degree",
    country: "India",
    rating: 5,
    date: "Aug 9, 2026",
    text: "The experience has been phenomenal, the team is really responsive and goes out of their way to help you set the tool up. Overall its really clean and an amazing tool to use. Much recommended for your store front. 5/5 rating for sure.",
  },
  {
    store: "Blackship.in",
    country: "India",
    rating: 5,
    date: "Jul 2, 2026",
    text: "Excellent app for custom product options at a budget-friendly price. Darshit from the support team was super helpful and gave us a great solution.",
  },
  {
    store: "Vanasparsh",
    country: "India",
    rating: 5,
    date: "edited Jul 13, 2026",
    text: "One of the best product options apps on Shopify! The user interface is clean, intuitive, and very easy to understand, making it simple to set up and manage product options. A special thanks to Darshit for providing outstanding support throughout the setup process. He was responsive, knowledgeable, and ensured everything worked perfectly. Highly recommended for anyone looking for a reliable and easy-to-use product options app!",
  },
  {
    store: "Vasudhara Vastra",
    country: "India",
    rating: 5,
    date: "Jun 19, 2026",
    text: "In this app, the product options are very easy to manage. The UI is simple and easy to understand, and the implementation is straightforward.",
  },
];

/** The two shortest reviews — for tight cards (the testimonial card is 290px tall). */
export const PIMW_SHORT_REVIEWS: PimwReview[] = PIMW_REVIEWS.filter(
  (review) => review.text.length <= 260
);

/* ── stat strip (safe, verified numbers only) ─────────────────────────────── */

export const PIMW_STATS: PimwStat[] = [
  {
    id: "rating",
    value: 5.0,
    decimals: 1,
    label: "Rating on the Shopify App Store",
  },
  {
    id: "reviews",
    value: 8,
    label: "Five-star merchant reviews",
  },
  {
    id: "languages",
    value: 18,
    label: "Supported languages",
  },
  {
    id: "fonts",
    value: 35,
    suffix: "+",
    label: "Fonts for custom text",
  },
  {
    id: "fieldTypes",
    value: 10,
    label: "Option field types",
  },
  {
    id: "setupMinutes",
    value: 5,
    prefix: "<",
    suffix: " min",
    label: "To install, with no code",
  },
];
