/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      'light-blue': '#e0ebfe',
      'light-red': '#ffe0d7',
      'light-yellow': '#fff8da',
      'gray': '#f5f5f5',
    }
  },
  plugins: [],
}

