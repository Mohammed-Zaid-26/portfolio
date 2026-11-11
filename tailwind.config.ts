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
          600: "rgb(var(--color-deepblue-600) / <alpha-value>)",
          700: "rgb(var(--color-deepblue-700) / <alpha-value>)",
        },
        electric: {
          400: "rgb(var(--color-electric-400) / <alpha-value>)",
          500: "rgb(var(--color-electric-500) / <alpha-value>)",
          600: "rgb(var(--color-electric-600) / <alpha-value>)",
        },
        vital: {
          400: "rgb(var(--color-vital-400) / <alpha-value>)",
          500: "rgb(var(--color-vital-500) / <alpha-value>)",
          600: "rgb(var(--color-vital-600) / <alpha-value>)",
        },
        signal: {
          400: "rgb(var(--color-signal-400) / <alpha-value>)",
          500: "rgb(var(--color-signal-500) / <alpha-value>)",
          600: "rgb(var(--color-signal-600) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        // Labels use the body sans (no monospace) for a less templated look
        mono: ["var(--font-body)", "sans-serif"],
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
