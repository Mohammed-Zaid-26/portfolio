import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          50: "rgb(var(--color-paper-50) / <alpha-value>)",
          100: "rgb(var(--color-paper-100) / <alpha-value>)",
          200: "rgb(var(--color-paper-200) / <alpha-value>)",
          300: "rgb(var(--color-paper-300) / <alpha-value>)",
        },
        ink: {
          950: "rgb(var(--color-ink-950) / <alpha-value>)",
          800: "rgb(var(--color-ink-800) / <alpha-value>)",
          700: "rgb(var(--color-ink-700) / <alpha-value>)",
          600: "rgb(var(--color-ink-600) / <alpha-value>)",
          500: "rgb(var(--color-ink-500) / <alpha-value>)",
          400: "rgb(var(--color-ink-400) / <alpha-value>)",
        },
        deepblue: {
          600: "#1c3a7a",
          700: "#152c5c",
        },
        electric: {
          400: "#5b8def",
          500: "#3163dd",
          600: "#2350c0",
        },
        vital: {
          400: "#2fbf8a",
          500: "#0f9d64",
          600: "#0c8054",
        },
        signal: {
          400: "#9678e8",
          500: "#7c56d6",
          600: "#6642b8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "drift-slow": "drift 11s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
