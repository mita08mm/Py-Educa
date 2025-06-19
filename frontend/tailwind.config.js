/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          mint: "#DAF5F0",
          sage: "#B5D2AD",
          cream: "#FDFD96",
          peach: "#F8D6B3",
          lavender: "#FCDFFF",
          gray: "#E3DFF2",
        },
        secondary: {
          teal: "#A7DBD8",
          lime: "#BAFCA2",
          gold: "#FFDB58",
          coral: "#FFA07A",
          pink: "#FFC0CB",
          purple: "#C4A1FF",
        },
        accent: {
          sky: "#87CEEB",
          green: "#90EE90",
          yellow: "#F4D738",
          orange: "#FF7A5C",
          rose: "#FFB2EF",
          violet: "#A388EE",
        },
        bold: {
          cyan: "#69D2E7",
          olive: "#7FBC8C",
          amber: "#E3A018",
          red: "#FF6B6B",
          magenta: "#FF69B4",
          indigo: "#9723C9",
        },
        // Colores adicionales para el estilo neobrutalista
        black: "#000000",
        white: "#FFFFFF",
        shadow: "#000000",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontWeight: {
        black: "900",
        extrabold: "800",
        bold: "700",
        semibold: "600",
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #000000",
        "brutal-lg": "6px 6px 0px 0px #000000",
        "brutal-xl": "8px 8px 0px 0px #000000",
        "brutal-2xl": "12px 12px 0px 0px #000000",
        "brutal-inner": "inset 4px 4px 0px 0px #000000",
      },
      borderWidth: {
        3: "3px",
        4: "4px",
        6: "6px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
    },
  },
  plugins: [],
};
