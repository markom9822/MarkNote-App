/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bkgPrimary: "rgb(var(--color-bkgPrimary) / <alpha-value>)",
        bkgSecondary: "rgb(var(--color-bkgSecondary) / <alpha-value>)",
        textPrimary: "rgb(var(--color-textPrimary) / <alpha-value>)",
        textSecondary: "rgb(var(--color-textSecondary) / <alpha-value>)",
        iconPrimary: "rgb(var(--color-iconPrimary) / <alpha-value>)",
      }
    }
  },

  plugins: [
    require('@tailwindcss/typography'),
 
    plugin(function ({addVariant}) {
      addVariant( 
        'prose-inline-code',
        '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))'
      );
    })
  ],
  
} 

