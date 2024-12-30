"use client";
import { useTheme } from "@/hooks/use-theme";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggler = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <button
      title={`Change to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className="w-10 h-10 flex  text-xl items-center bg-bgColors-secondary justify-center rounded-full transition duration-300 active:opacity-70 hover:md:opacity-70"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FiSun className="text-yellow-500" />
      ) : (
        <FiMoon className="text-primary" />
      )}
    </button>
  );
};

export default ThemeToggler;
