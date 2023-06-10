/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'xs': { 'min': '480px' },
      'sm': { 'min': '640px' },
      'md': { 'min': '768px' },
      'lg': { 'min': '1024px' },
      'xl': { 'min': '1280px' },
      '2xl': { 'min': '1536px' },
    },
    extend: {
      backgroundColor: {
        'unilectives-blue1': '#1279F2',
        'unilectives-blue2': '#4B94EB'
      },
      colors: {
        'unilectives-blue': '#1279F2',
        'unilectives-headings': '#202020',
        'unilectives-subheadings': '#989898',
        'unilectives-placeholder': '#606060',
        'unilectives-tags': '#CCEBF6',
        'unilectives-card': '#FAFAFA',
        'unilectives-light-blue': '#84CEE7',
        'unilectives-purple': '#B789E5',
        'unilectives-indigo': '#9BADE8',
        'unilectives-button': '#33ABD1',
        'unilectives-search': '#9CADE9',
      },
      fontFamily: {
        custom: ["TT Commons Pro Variable", "Segoe UI", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        'img': {
          'max-width': 'none',
        },
        'body': {
          'background': '#FDFDFD',
          'margin': '0',
          'height': '100%',
        },
      });
    }),
  ],
}