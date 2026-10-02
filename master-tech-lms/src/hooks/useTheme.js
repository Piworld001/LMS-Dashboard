import { useState } from "react";

export function useTheme() {
  // Start from whatever was saved last time
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("lms_theme") === "light" ? "light" : "dark"
  );

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem("lms_theme", next);
    setTheme(next);
  }

  return { theme, toggleTheme };
}