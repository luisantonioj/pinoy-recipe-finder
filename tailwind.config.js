/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",   // ✅ if using CRA / quickstart
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",       // Primary Green
        accent: "#FF9800",        // Warm Accent
        neutralbg: "#F5F5F5",     // Neutral Background
        text: "#333333",          // Text/Dark Neutral
        danger: "#E53935"         // Secondary Accent
      }
    }
  },
  plugins: [],
}
