"use client";
import { useTheme } from "@/hooks/use-theme";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggler = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <button
      title={`Change to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-primary/20 transition duration-300 hover:opacity-70"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FiSun size={20} className="text-yellow-500" />
      ) : (
        <FiMoon size={20} className="text-primary" />
      )}
    </button>
  );
};

export default ThemeToggler;
