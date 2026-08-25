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
        {/* Add or update this line for your favicon */}
        <link rel="icon" href="/logo.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
