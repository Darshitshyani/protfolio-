/** @type {import('tailwindcss').Config} */

import { keyframes } from "@emotion/react";
import { grey } from "@mui/material/colors";

// Theme-dependent colors read CSS variables (RGB triplets) defined in
// src/styles/globals.css on `:root` (light) and `html.dark` (dark). The
// `rgb(var(--x) / <alpha-value>)` form keeps `/NN` opacity modifiers working.
// Colors that are the same in both themes stay literal hex.
const v = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const colorPalette = {
  pink: {
    // Misleading name kept for compatibility: these are the site BLUES.
    100: v("--pp-pink-100"), // tinted band — flips to deep navy in dark
    200: v("--pp-pink-200"),
    300: "#A8DCFF",
    400: "#75C2FF",
    500: "#3BA6FF", // primary blue
    600: "#1E90FF",
    700: "#1572CC",
    800: "#105699",
    900: "#0C417A",
    A100: "#08315C",
  },
  black: {
    // Neutral scale. In dark mode the whole ladder inverts (100 stays the
    // subtlest surface tint, 900 the strongest text) so existing classes keep
    // their *role* without any call-site edits.
    100: v("--pp-neutral-100"),
    200: v("--pp-neutral-200"),
    300: v("--pp-neutral-300"),
    400: v("--pp-neutral-400"),
    500: v("--pp-neutral-500"),
    600: v("--pp-neutral-600"),
    700: v("--pp-neutral-700"),
    800: v("--pp-neutral-800"),
    900: v("--pp-neutral-900"),
    A100: v("--pp-neutral-a100"),
    A200: v("--pp-neutral-a200"),
    A300: v("--pp-neutral-a300"),
    A400: v("--pp-neutral-a400"),
    A500: v("--pp-neutral-a500"),
  },
  gradient: {
    main: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);",
  },
  common: {
    // THEMED surface/ink pair: `bg-common-white` = card surface (near-black in
    // dark), `text-common-black` = heading ink (near-white in dark). For a
    // color that must never flip (text on a filled button, dark overlays), use
    // `static-white` / `static-black`.
    white: v("--pp-surface"),
    black: v("--pp-ink"),
  },
  static: {
    white: "#ffffff",
    black: "#000000",
  },
  page: v("--pp-page"), // page background (body); bg-page
  transparent: { main: "#00000000" },
  primary: { main: "#1E90FF", light: "#FFF1F3", dark: "#CC424F" },
  secondary: { main: "#17181B", light: "#17181bcd" },
  success: { main: "#40C34D", dark: "#1FDC1B", light: "#0EA32E" },
  error: { main: "#DD5757", dark: "#642728", light: "#A04041" },
  // `light` is THEMED like every other *-light tint: as a literal #FFF5EE it
  // painted a near-white disc on the dark page, and the themed ink on top of
  // it (black-900 -> #DEE4F2 in dark) dropped to 1.19:1.
  orange: { main: "#FF8227", light: v("--pp-orange-light") },
  blue: { light: "#50D5FF", main: "#1448FF", dark: "#6597BE" },
  green: { main: "#4DAC2B", light: v("--pp-green-light") },
  grey: { light: v("--pp-grey-light") },
  salmon_Pink: {
    light: v("--pp-salmon-light"),
  },
  // ── Shopify platform accents ────────────────────────────────────────────
  // Fills (400-600/main/hover) are static — same in both themes. Tints and
  // TEXT tones (100/200/300/700/light/border/dark) are themed: in dark mode
  // the tints go deep green and 700/dark become a bright, readable green.
  shopify: {
    100: v("--pp-shopify-100"),
    200: v("--pp-shopify-200"),
    300: v("--pp-shopify-300"),
    400: "#4FAE8E",
    500: "#008060", // Shopify brand green — the anchor
    600: "#006E52", // hover
    700: v("--pp-shopify-700"), // text tone — brightens in dark
    800: "#004734",
    900: "#003527",
    light: v("--pp-shopify-100"),
    border: v("--pp-shopify-200"),
    main: "#008060",
    hover: "#006E52",
    dark: v("--pp-shopify-700"),
    darkest: "#003527",
  },
  // Shopify's light green. #95BF47 on white is 1.93:1 — it FAILS every contrast
  // rule, so it is a fill / underline / chart colour only, never text and never
  // a button. For lime-flavoured text use `shopify_lime-dark` (#62842B, 4.6:1).
  shopify_lime: {
    100: "#F4F8EA",
    200: "#E5EFCF",
    300: "#D0E3A9",
    400: "#B4D278",
    500: "#95BF47", // Shopify brand light green — the anchor
    600: "#7BA338",
    700: "#62842B",
    800: "#4B6620",
    900: "#374C18",
    light: "#F4F8EA",
    border: "#E5EFCF",
    main: "#95BF47",
    dark: "#62842B",
  },
};
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colorPalette,
    },

    screens: {
      sm: "640px",
      md: "868px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      animation:{
        "fade-in":"fade-in 1s ease-in-out",
        "slide-in":"slideIn 1s ease-in-out",
        "slide-out":"slideOut 1s ease-in-out",
        "slide-bottom":"slideBottom 1s ease-in-out",
        // Speed and play state ride on CSS custom properties because
        // `important: true` makes the shorthand below beat any inline
        // animation-duration. Set them from the element's style prop:
        //   style={{ "--marquee-duration": "24s", "--marquee-play": "paused" }}
        // Consumed by <MarqueeRow> in @/components/shared/motion.
        marquee:
          "marquee var(--marquee-duration, 30s) linear infinite var(--marquee-play, running)",
        "marquee-reverse":
          "marquee-reverse var(--marquee-duration, 30s) linear infinite var(--marquee-play, running)",
        // Consumed by <AnimatedGradientText>. Needs bg-[length:200%_auto].
        "gradient-pan":
          "gradient-pan var(--gradient-duration, 6s) ease-in-out infinite alternate",
        // Skeleton / highlight sweep across a 200%-wide background.
        shimmer: "shimmer var(--shimmer-duration, 2.4s) linear infinite",
        // Slow idle bob for a hero mockup or badge.
        float: "float var(--float-duration, 5s) ease-in-out infinite alternate",
        // Consumed by <BorderBeam>: rotates a conic gradient around a card edge.
        "border-spin":
          "border-spin var(--beam-duration, 6s) linear infinite var(--beam-play, running)"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideOut: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideBottom: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        // The track holds two identical copies of its children, so -50% is
        // exactly one copy and the loop is seamless.
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "gradient-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-8px)" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        }
      },
      fontFamily: {
        // Variables are set by next/font in _app.tsx (Inter + Space Grotesk).
        // Poppins (self-hosted, globals.css) stays as the offline fallback.
        sans: ["var(--font-body)", "Inter", "Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "Poppins", "sans-serif"],
      },
      boxShadow: {
        "3xl":
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        "4xl":
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      },
      fontWeight: {
        // light: 200,
        // normal: 300,
        // medium: 400,
        // semibold: 500,
        // bold: 600,
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: true },
  important: true,
};
