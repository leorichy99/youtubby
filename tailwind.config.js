/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        red: "#f40024",
        black: "#444441",
        veryLightGray: "hsl(210, 11%, 96%)",
        grayishBlack: "hsla(0, 0%, 16%, 0.484)",
        veryLightGrayishCyan: "hsl(189, 41%, 97%)",
        veryLightGray: "hsla(0, 0%, 83%, 0.616)",
        blue: '#0000FF',
        limeGreen: "#32CD32",
      }
    },
  },
  plugins: [],
}

