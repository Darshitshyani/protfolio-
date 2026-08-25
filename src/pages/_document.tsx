import { Html, Head, Main, NextScript } from "next/document";

// Runs before first paint so the initial theme never flashes. The site
// defaults to DARK; an explicit user choice in localStorage ("pp-theme")
// wins. ThemeToggle (src/components/shared/ThemeToggle.tsx) keeps the
// class and the stored value in sync after hydration.
const themeInit = `
(function () {
  try {
    var t = localStorage.getItem("pp-theme");
    if (t === "light") return;
  } catch (e) {}
  document.documentElement.classList.add("dark");
})();
`;

export default function Document() {
  return (
    <Html>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* Favicon: the brand mark, cropped out of the lockup artwork.
            Two variants because the mark's inner square is near-black in one
            and white in the other — a single file would lose that square
            against matching browser chrome. The plain link comes FIRST as the
            fallback for browsers that ignore `media` on rel="icon"; the
            media-scoped pair below overrides it where supported. */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-dark.png"
          media="(prefers-color-scheme: dark)"
        />
        {/* iOS composites this onto a solid tile, so the light-chrome variant
            (dark square on blue) is the one that reads. */}
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
