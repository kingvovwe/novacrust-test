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
        primary: "#002F35", // The dark green from Figma
        primaryHover: "#004045",
        bgDark: "#0A0B0F", // The black background
      },
    },
  },
  plugins: [],
};
export default config;