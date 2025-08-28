/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        accent: "#FF9800",
        neutralbg: "#F5F5F5",
        text: "#333333",
        danger: "#E53935"
      },
    },
  },
  plugins: [],
}
