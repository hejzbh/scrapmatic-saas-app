import type { Config } from "tailwindcss";

export default {
  darkMode: ["selector", `data-mode="dark"`],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#6155c8",
        btnColors: {
          primary: "var(--btn-primary)",
        },
        borderColors: {
          primary: "var(--border-primary)",
        },
        textColors: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
      },
      backgroundImage: {
        sidebarGradient: "var(--bg-sidebar)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
