"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md text-[#1A6FBF] dark:text-[#3FA9D4] hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 shadow-sm focus:outline-none flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <FiSun className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100" />
      ) : (
        <FiMoon className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100" />
      )}
    </button>
  );
};

export default ThemeToggle;