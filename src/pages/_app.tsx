import "@/styles/globals.css";
import Wrapper from "@/wrapper/wrapper";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter, Space_Grotesk } from "next/font/google";

// Typography system: Space Grotesk for display (headings), Inter for body.
// next/font self-hosts both at build time — no external requests, no FOUT.
// The styled-jsx block below applies them globally (html + headings), which
// also covers MUI portals (Popover/Dialog render outside the React tree).
// Tailwind's `font-display` / `font-sans` utilities read the same variables
// (see tailwind.config.ts), so both routes stay consistent.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Site-wide default title. next/head is last-wins, and this sits above
          <Component/>, so any page that sets its own <title> overrides it. */}
      <Head>
        <title>Pixels Piece  Web, Mobile & Shopify App Development</title>
      </Head>
      <style jsx global>{`
        :root {
          --font-body: ${inter.style.fontFamily};
          --font-display: ${grotesk.style.fontFamily};
        }
        html {
          font-family: ${inter.style.fontFamily};
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${grotesk.style.fontFamily};
          letter-spacing: -0.02em;
        }
      `}</style>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
      {/* OUTSIDE <Wrapper>, and that is load-bearing. Wrapper renders
          <SmoothScroll>, which transforms #smooth-content — and a transformed
          ancestor becomes the containing block for its descendants, so
          `position: fixed` inside it silently stops being fixed.
          `.Toastify__toast-container` is fixed, so in there the contact-form
          toasts would be positioned against the transformed content and scroll
          away with the page instead of staying pinned. Same rule that keeps
          <Topbar /> and <AmbientBackground /> out of the smoother. */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
