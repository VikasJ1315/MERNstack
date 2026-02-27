import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        thinkboard: {
          primary: "#22c55e",
          secondary: "#10b981",
          accent: "#34d399",
          neutral: "#1f2937",
          "base-100": "#050505",
          "base-200": "#0d0d0d",
          "base-300": "#141414",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
      "forest",
      "coffee",
      "cupcake",
    ],
  },
};
