import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
// Screens for responsive
      screens: {
        "max-xlg": { max: "1492px" },
        "max-lg": { max: "1024px" },
        "max-md955": { max: "955px" },
        "max-md": { max: "768px" },
        "max-sm": { max: "640px" },
        "max-lg4": { max: "1146px" },
        "max-lg2": { max: "1348px" },
        "max-lg3": { max: "1208px" },
        "between568-950": { 'min': '568px', 'max': '950px' },
        "between280-568": { 'min': '280px', 'max': '568px' },
        "between280-320": { 'min': '280px', 'max': '320px' },

      },
    },
  },
  plugins: [],
};
export default config;
