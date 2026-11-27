/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app.js"],
  theme: {
    extend: {
      colors: {
        aceh: {
          maroon: "#7F1D1D",
          gold: "#D4A017",
          green: "#14532D",
          cream: "#FFF8EB",
          ink: "#1F2937"
        }
      }
    }
  },
  plugins: []
};
