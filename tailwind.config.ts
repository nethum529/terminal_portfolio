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
        mono: ["'Share Tech Mono'", "'Courier New'", "monospace"],
      },
      colors: {
        terminal: {
          bg: "#080c10",
          panel: "#0a0f14",
          border: "#1a3a5c",
          glow: "#00b4ff",
          dim: "#1e3a5f",
          text: "#a8c8e8",
          bright: "#e0f0ff",
          muted: "#4a7a9b",
          accent: "#00d4ff",
          warning: "#ffaa00",
          success: "#00ff88",
        },
      },
      boxShadow: {
        glow: "0 0 8px rgba(0, 180, 255, 0.3), inset 0 0 8px rgba(0, 180, 255, 0.05)",
        "glow-strong": "0 0 16px rgba(0, 180, 255, 0.5)",
        "glow-accent": "0 0 12px rgba(0, 212, 255, 0.4)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0, 180, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 180, 255, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        blink: "blink 1.2s step-end infinite",
        scan: "scan 4s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
