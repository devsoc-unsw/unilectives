/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontWeight: {
      bold: 600,
    },
    screens: {
      'xxs': { 'max': '280px' },
      'xs': { 'min': '480px' },
      'sm': { 'min': '640px' },
      'md': { 'min': '768px' },
      'lg': { 'min': '1024px' },
      'xl': { 'min': '1280px' },
      '2xl': { 'min': '1536px' },
    },
    fontFamily: {
      sans: ['"TT Commons Pro"', 'sans-serif']
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
        'term-blue': '#247BA0',
        'faculty-blue': '#13293D'

      },
      flexShrink: {
        'std': '2'
      },
      boxShadow: {
        'btn': '-0.313rem 0.313rem 0.625rem -0.063rem rgb(0 0 0 / 15%)',
        'btn-hovered': '0 0.125rem 0.625rem 0 rgb(0 0 0 / 50%)',
        'card': '-0.125rem 0.25rem 0.625rem rgba(0, 0, 0, 0.15)',
        'input': '0 0 0.5rem 0.063rem rgba(0, 0, 0, 0.1);',
      },
      gridTemplateColumns: {
        "responsive-cards": "repeat(auto-fit, minmax(315px, 1fr))",
      }
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
