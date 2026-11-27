/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app.js"],
  theme: {
    extend: {
      colors: {
        aceh: {
          background: "#EFE8DD",
          accent: "#76ABAE",
          ink: "#303841",
          action: "#FF5722",
          white: "#FFFFFF",
          error: "#B91C1C"
        }
      }
    }
  },
  plugins: []
};
