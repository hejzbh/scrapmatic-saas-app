import type { Config } from "tailwindcss";

export default {
  darkMode: ["selector", `data-mode="dark"`],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
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
        btnColors: {
          primary: "var(--btn-primary)",
        },
        textColors: {
          primary: "red",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
