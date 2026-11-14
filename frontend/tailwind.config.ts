import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/primitives/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#020202",
        "void-black": "#000000",
        "card-black": "#0A0A0A",
        "sidebar-black": "#050505",
        "row-black": "#0C0C0C",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-border-subtle": "rgba(255, 255, 255, 0.05)",
        "glass-highlight": "rgba(255, 255, 255, 0.15)",
        "off-white": "#F2F2F2",
        "muted-gray": "#A1A1AA",
        "hot-pink": "#FF007F",
        "neon-cyan": "#00F0FF",
        "neon-mint": "#00FFCC",
        "electric-blue": "#00E5FF",
        "deep-purple": "#7800FF",
        pastel: {
          lilac: "#D8B4FE",
          mint: "#A7F3D0",
          orange: "#FED7AA",
          cyan: "#BAE6FD",
          rose: "#FECDD3",
          yellow: "#FEF08A",
        },
      },
      borderRadius: {
        bubbly: "2rem",
        "bubbly-lg": "2.5rem",
        "bubbly-sm": "1.25rem",
        "bubbly-pill": "9999px",
      },
      fontFamily: {
        serif: ["var(--font-ubuntu-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-ubuntu-sans)", "Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
        cursive: ["var(--font-cursive)", "Caveat", "Dancing Script", "cursive"],
      },
      boxShadow: {
        glass: "0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        "glass-flat": "0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        "glow-cyan": "0 0 30px rgba(0, 240, 255, 0.4)",
        "glow-pink": "0 0 30px rgba(255, 0, 127, 0.4)",
        "glow-purple": "0 0 40px rgba(120, 0, 255, 0.3)",
        "glow-mint": "0 0 30px rgba(0, 255, 204, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
