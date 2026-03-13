import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        bg:     "#000000",
        panel:  "#080808",
        border: "rgba(255,255,255,0.15)",
        dim:    "#2a2a2a",
        muted:  "#555555",
        sub:    "#888888",
        text:   "#CACACA",
        bright: "#EAEAEA",
      },
    },
  },
  plugins: [],
};

export default config;
