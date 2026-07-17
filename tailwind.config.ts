import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          50: "#fdfcfa",
          100: "#faf8f4",
          200: "#f3f1ea",
          300: "#e9e6dc",
        },
        ink: {
          950: "#14161a",
          800: "#2b2e35",
          600: "#585d68",
          400: "#8b8f99",
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
