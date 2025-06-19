/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neo: {
          mint: "#DAF5F0",
          sage: "#B5D2AD",
          cream: "#FDFD96",
          peach: "#F8D6B3",
          lavender: "#FCDFFF",
          periwinkle: "#E3DFF2",

          aqua: "#A7DBD8",
          lime: "#BAFCA2",
          yellow: "#FFDB58",
          coral: "#FFA07A",
          pink: "#FFC0CB",
          purple: "#C4A1FF",

          sky: "#87CEEB",
          green: "#90EE90",
          gold: "#F4D738",
          orange: "#FF7A5C",
          rose: "#FFB2EF",
          violet: "#A388EE",

          cyan: "#69D2E7",
          forest: "#7FBC8C",
          amber: "#E3A018",
          red: "#FF6B6B",
          magenta: "#FF69B4",
          indigo: "#9723C9",
        },
        brutal: {
          black: "#000000",
          white: "#FFFFFF",
          shadow: "#000000",
        },
      },
      fontFamily: {
        brutal: ["Arial Black", "Helvetica", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      boxShadow: {
        brutal: "4px 4px 0px #000000",
        "brutal-lg": "8px 8px 0px #000000",
        "brutal-xl": "12px 12px 0px #000000",
        "brutal-2xl": "16px 16px 0px #000000",
      },
      borderWidth: {
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
      },
      animation: {
        "bounce-brutal": "bounce 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
