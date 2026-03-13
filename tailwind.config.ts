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
        mono: ["var(--font-mono)", "'Courier New'", "monospace"],
      },
      colors: {
        mono: {
          bg: "#000000",
          panel: "#080808",
          border: "rgba(255,255,255,0.18)",
          text: "#EAEAEA",
          bright: "#FFFFFF",
          muted: "#666666",
          dim: "#333333",
          faint: "#1a1a1a",
        },
      },
      boxShadow: {
        panel: "0 2px 20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)",
        "panel-hover":
          "0 8px 40px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.14)",
        "panel-float":
          "0 16px 48px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)",
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
