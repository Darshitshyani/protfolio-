/** @type {import('tailwindcss').Config} */

import { keyframes } from "@emotion/react";
import { grey } from "@mui/material/colors";

const colorPalette = {
  pink: {
    // 50: "#0",
    100: "#FFF1F3",
    200: "#FFE4E6",
    300: "#FFC1C7",
    400: "#FF98A2",
    500: "#FF5263",
    600: "#FF5263",
    700: "#CC424F",
    800: "#98313B",
    900: "#7A272F",
    A100: "#5C1E24",
  },
  black: {
    100: "#F3F4F7",
    200: "#E2E4EB",
    300: "#CCD0DC",
    400: "#B3BACB",
    500: "#9BA4BA",
    600: "#828DA9",
    700: "#626E8E",
    800: "#49526A",
    900: "#303646",
    A100: "#2A2F3D",
    A200: "#20242F",
    A300: "#191C23",
    A400: "#15181E",
    A500: "#121419",
  },
  gradient: {
    main: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);",
  },
  common: {
    white: "#fff",
    black: "#000",
  },
  transparent: { main: "#00000000" },
  primary: { main: "#FF5263", light: "#FFF1F3", dark: "#CC424F" },
  secondary: { main: "#17181B", light: "#17181bcd" },
  success: { main: "#40C34D", dark: "#1FDC1B", light: "#0EA32E" },
  error: { main: "#DD5757", dark: "#642728", light: "#A04041" },
  orange: { main: "#FF8227", light: "#FFF5EE" },
  blue: { light: "#50D5FF", main: "#1448FF", dark: "#6597BE" },
  green: { main: "#4DAC2B", light: "#F1F8EE" },
  grey: { light: "#F1F2FF" },
  salmon_Pink: {
    light: "#E7DAED",
  },
};
module.exports = {
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
        "slide-bottom":"slideBottom 1s ease-in-out"
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
        }
      },
      fontFamily: {
        sans: ["Poppins"],
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
