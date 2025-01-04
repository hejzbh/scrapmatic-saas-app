"use client";
import { useEffect, useState } from "react";
type ThemeType = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as ThemeType) || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};
