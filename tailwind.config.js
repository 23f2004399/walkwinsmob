/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6fff7e',
          DEFAULT: '#30d45c',
          dark: '#228b22'
        },
        background: '#0B1D3D'
      },
    },
  },
  plugins: [],
};
