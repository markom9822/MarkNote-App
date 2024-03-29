/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
    },
  },
    
  },
  plugins: [require('@tailwindcss/typography')],
}

