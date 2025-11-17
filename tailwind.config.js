/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        102: "1.02",
        103: "1.03",
        105: "1.05",
        110: "1.10",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.25)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      colors: {
        brand: {
          teal: "#14b8a6",
          dark: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};