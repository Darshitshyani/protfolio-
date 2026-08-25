import React, { useEffect, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

/**
 * Sun/moon theme switch. The source of truth is the `dark` class on
 * <html>, set before first paint by the inline script in _document.tsx
 * (default: dark). This component only reads that class after mount and
 * flips it + persists the choice, so SSR markup never depends on the
 * theme and there is no hydration mismatch.
 */
const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("pp-theme", next ? "dark" : "light");
    } catch (e) {
      /* private mode — the class still switches for this visit */
    }
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        isDark === null
          ? "Toggle color theme"
          : isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
      }
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-black-200 bg-common-white text-black-700 transition-colors duration-200 hover:border-primary-main hover:text-primary-main ${className}`}
    >
      {/* Until mounted we don't know the theme — render a fixed icon so the
          server and first client paint agree; it corrects itself on mount. */}
      {isDark === false ? (
        <DarkModeOutlinedIcon fontSize="small" />
      ) : (
        <LightModeOutlinedIcon fontSize="small" />
      )}
    </button>
  );
};

export default ThemeToggle;
