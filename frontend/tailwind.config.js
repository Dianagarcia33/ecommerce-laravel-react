/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f7ff',
          100: '#b3ecff',
          200: '#80e1ff',
          300: '#4dd5ff',
          400: '#26ccff',
          500: '#00c4ff',
          600: '#00b0e6',
          700: '#0099cc',
          800: '#0082b3',
          900: '#006b99',
        },
        accent: {
          50: '#f0ffe0',
          100: '#dfffb3',
          200: '#ccff80',
          300: '#b9ff4d',
          400: '#a8ff26',
          500: '#96ff00',
          600: '#86e600',
          700: '#75cc00',
          800: '#65b300',
          900: '#549900',
        },
        gloint: {
          cyan: '#00D4FF',
          lime: '#96FF00',
          orange: '#FFB800',
          blue: '#0099CC',
          green: '#75CC00',
        },
      },
    },
  },
  plugins: [],
}
