/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neo: {
          mint:      "#E2E8F0", // gris claro, fondo secundario
          sage:      "#94A3B8", // gris azulado claro, detalles
          cream:     "#FFFFFF", // blanco, textos o fondos
          peach:     "#46838C", // azul verdoso, botones de acción
          lavender:  "#334155", // gris azulado, tarjetas, headers
          periwinkle:"#1E293B", // azul muy oscuro, headers/nav
          aqua:      "#0F172A", // azul oscuro, fondo principal
          lime:      "#46838C", // botones de acción, alternativo
          yellow:    "#E2E8F0", // fondo alternativo
          coral:     "#334155", // tarjetas, paneles
          pink:      "#0F172A", // fondo principal alternativo
          purple:    "#1E293B", // headers/nav alternativo
          sky:       "#E2E8F0", // fondo claro alternativo
          green:     "#46838C", // acción/éxito
          gold:      "#334155", // detalles, bordes
          orange:    "#46838C", // acción/acento
          rose:      "#EF4444", // rojo para error
          violet:    "#22C55E", // verde para éxito
          cyan:      "#46838C", // acción/acento
          forest:    "#334155", // detalles, bordes
          amber:     "#E2E8F0", // fondo claro alternativo
          red:       "#EF4444", // error
          magenta:   "#0F172A", // fondo principal
          indigo:    "#1E293B", // headers/nav
          // Extendidos para UI
          success:   "#22C55E", // verde éxito
          error:     "#EF4444", // rojo error
          warning:   "#FACC15", // amarillo advertencia
          accent:    "#3B82F6", // azul acento
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
        brutal: "0px 0px 0px #000000",
        "brutal-lg": "0px 0px 0px #000000",
        "brutal-xl": "0px 0px 0px #000000",
        "brutal-2xl": "0px 0px 0px #000000",
      },
      borderWidth: {
        2: "2px",
        2: "2px",
        2: "2px",
        2: "2px",
      },
      animation: {
        "bounce-brutal": "bounce 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
