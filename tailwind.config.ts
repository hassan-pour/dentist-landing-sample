import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "Tahoma", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#effaf8",
          100: "#d3f3ee",
          200: "#a8e6de",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          900: "#134e4a",
        },
        ink: "#0f1e2e",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(15, 30, 46, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
