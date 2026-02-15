import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#fd5750",
          hover: "#ff6b65",
          soft: "rgba(253, 87, 80, 0.12)",
        },
        dark: {
          bg: "#0c0c0c",
          secondary: "#111111",
          tertiary: "#161616",
          panel: "#111111",
          "panel-strong": "#1a1a1a",
          border: "#262626",
          "border-light": "#404040",
        },
        light: {
          bg: "#ffffff",
          secondary: "#fafafa",
          tertiary: "#f5f5f5",
          panel: "#fafafa",
          "panel-strong": "#f0f0f0",
          border: "#e5e5e5",
          "border-light": "#d4d4d4",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "SF Mono",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light", ".light &");
    }),
  ],
};
export default config;
