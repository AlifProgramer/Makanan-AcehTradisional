/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app.js"],
  theme: {
    extend: {
      colors: {
        aceh: {
          terracotta: "#9A3412",
          turmeric: "#F59E0B",
          leaf: "#3F6212",
          cream: "#FFFBEB",
          white: "#FFFFFF",
          ink: "#1F2937",
          error: "#B91C1C"
        }
      }
    }
  },
  plugins: []
};
