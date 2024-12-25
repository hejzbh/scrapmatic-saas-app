import type { Config } from "tailwindcss";

export default {
  darkMode: ["selector", `data-mode="dark"`],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
