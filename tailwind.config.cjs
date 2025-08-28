/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',   // Primary Green
        accent: '#FF9800',    // Warm Accent
        neutralBg: '#F5F5F5', // Neutral Background
        textDark: '#333333',  // Text/Dark Neutral
        danger: '#E53935'     // Secondary Accent
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}
