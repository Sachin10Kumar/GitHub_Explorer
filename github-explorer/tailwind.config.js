/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void:    "#0D1117", // page background — GitHub's own dark base
        surface: "#161B22", // card surfaces
        border:  "#21262D", // dividers and borders
        accent:  "#58A6FF", // GitHub blue — the single interactive accent
        bright:  "#F0F6FC", // primary text
        muted:   "#8B949E", // secondary text / labels
        success: "#3FB950", // green for open issues, stars
        warn:    "#D29922", // yellow / forks
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease both",
        "pulse-once": "pulse 0.6s ease",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
