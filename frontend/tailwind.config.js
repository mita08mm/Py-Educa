/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neo: {
          mint: "#e8f1ff", // Azul muy claro (tu 50)
          sage: "#d6e4ff", // Azul claro (tu 100)
          cream: "#b8d4ff", // Azul suave
          peach: "#9ac3ff", // Azul medio claro
          lavender: "#8daeff", // Azul medio (tu 300)
          periwinkle: "#7ba0ff", // Azul medio-oscuro
          aqua: "#6891ff", // Azul vivo
          lime: "#5582ff", // Azul intenso
          yellow: "#4773ff", // Azul fuerte
          coral: "#3d7685", // Tu 400 - azul grisáceo
          pink: "#2d5a75", // Azul oscuro suave
          purple: "#24324d", // Tu 500 - azul principal
          sky: "#1c2741", // Azul oscuro
          green: "#162033", // Tu 600 - azul muy oscuro
          gold: "#1E293B", // Tu 700 - azul slate
          orange: "#6891ff", // Tu 200/800 - azul casi negro
          rose: "#0a0e1a", // Azul muy oscuro
          violet: "#06111e", // Tu 900 - azul profundo
          cyan: "#4a90e2", // Azul brillante para acentos
          forest: "#2563eb", // Azul estándar
          amber: "#1d4ed8", // Azul profundo
          red: "#1e40af", // Azul oscuro intenso
          magenta: "#1e3a8a", // Azul marino
          indigo: "#312e81", // Azul índigo oscuro
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
