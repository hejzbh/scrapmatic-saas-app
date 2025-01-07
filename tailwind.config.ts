import type { Config } from "tailwindcss";

export default {
  darkMode: "selector",
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
          secondary: "var(--btn-secondary)",
          muted: "var(--btn-muted)",
        },
        bgColors: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          muted: "var(--bg-muted)",
          node: "var(--bg-node)",
        },
        borderColors: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
        },
        textColors: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          active: "var(--text-active)",
          label: "var(--text-label)",
          hover: "#6155c8",
          required: "#F59E0B",
          optional: "#6B7280",
        },
        danger: "#FF6B6B",
        success: "#4CAF50",
        info: "yellow",
      },
      screens: {
        "2k": "1930px",
      },
      backgroundImage: {
        sidebarGradient: "var(--bg-sidebar)",
        appHeaderGradient: "var(--bg-sidebar)",
        bodyGradient: "var(--bg-body)",
        modalGradient: "var(--bg-modal)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
