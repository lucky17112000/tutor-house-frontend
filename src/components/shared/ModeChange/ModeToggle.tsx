"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (resolvedTheme ?? theme) === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-zinc-800 shadow-[0_8px_24px_-10px_rgba(10,10,10,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-[0_12px_28px_-12px_rgba(29,78,216,0.45)] dark:border-white/10 dark:bg-white/5 dark:text-white"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.15rem] w-[1.15rem] transition-all duration-300 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.15rem] w-[1.15rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
      {!mounted && (
        <span className="absolute inset-0 rounded-full bg-white/10" />
      )}
    </button>
  );
}
