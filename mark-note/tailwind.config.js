/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography (theme) {
        return {
          DEFAULT: {
            css: {
              'code::before': {
                content: 'none', // don’t generate the pseudo-element
//                content: '""', // this is an alternative: generate pseudo element using an empty string
              },
              'code::after': {
                content: 'none'
              },
              'ul > li:has(input[type="checkbox"])': {
                listStyle: 'none',
              },
              'ul > li > input[type="checkbox"]:first-child': {
                margin: '0 16px 0 -32px !important',
              },
              code: {
                color: theme('colors.slate.500'),
                backgroundColor: theme('colors.stone.100'),
                borderRadius: theme('borderRadius.DEFAULT'),
                paddingLeft: theme('spacing[1.5]'),
                paddingRight: theme('spacing[1.5]'),
              },
              pre: {
                // codeblock
              },
              'blockquote p:first-of-type::before': { 
                content: 'none' 
              },
              'blockquote p:first-of-type::after': { 
                content: 'none'
              },
            
            }
          }
        }
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

