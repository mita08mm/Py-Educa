/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography' 
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            50 : '#e8f1ff',
            100: '#d6e4ff',
            200: '#0F172A',
            300: '#8daeff',
            400: '#3d7685',
            500: '#24324d',
            600: '#162033',
            700: '#1E293B',   
            800: '#0F172A',
            900: '#06111e',
          },
          surface: '#1E293B',  
        },
      },
    },
    plugins: [typography],
  }