"use client";

import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="btn rounded-full"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;