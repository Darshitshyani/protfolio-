import { Color, createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    common: {
      white: "#fff",
      black: "#000",
    },
    text: {
      primary: "#000",
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
    pink: {
<<<<<<< HEAD
  // 50: "#0", // Optional, unused
  100: "#EBF5FF",   // lightest blue
  200: "#D6EFFF",
  300: "#A8DCFF",
  400: "#75C2FF",
  500: "#3BA6FF",   // primary blue
  600: "#1E90FF",   // a bit deeper (same as 500 in intensity)
  700: "#1572CC",
  800: "#105699",
  900: "#0C417A",
  A100: "#08315C",  // darkest blue (accent)
},
    primary: { main: "#1E90FF", light: "#FFF1F3", dark: "#CC424F" },
=======
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
    primary: { main: "#FF5263", light: "#FFF1F3", dark: "#CC424F" },
>>>>>>> ac734b40864ca5d8cbac17a0fdfccb4d8e423695
    secondary: { main: "#17181B", light: "#17181bcd" },
    success: { main: "#40C34D", dark: "#1FDC1B", light: "#0EA32E" },
    error: { main: "#DD5757", dark: "#642728", light: "#A04041" },
    orange: { main: "#FF8227", light: "FFF5EE" },
    blue: { light: "#F1F8EE", main: "#1448FF", dark: "#6597BE" },
    green: { main: "#4DAC2B" },
  },
  typography: {
    button: {
      fontSize: 16,
      fontWeight: 500,
      textTransform: "none",
      fontFamily: "inherit",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
});
import "@mui/material";
import { ColorPartial } from "@mui/material/styles/createPalette";
declare module "@mui/material/styles" {
  interface Palette {
    orange: Palette["primary"];
    blue: Palette["primary"];
    green: Palette["primary"];
    pink: Color;
    black: Color;
  }
  interface PaletteOptions {
    orange?: PaletteOptions["primary"];
    blue?: PaletteOptions["primary"];
    green?: PaletteOptions["primary"];
    pink?: ColorPartial;
    black: ColorPartial & { A300: string; A500: string };
  }
  interface BreakpointOverrides {
    // xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}
