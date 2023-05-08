/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'lato': ['lato', 'sans-serif'],
      'poppins': ['poppins', 'sans-serif'],
    },
    spacing: {
    },
    extend: {
      colors: {
        'unilectives_blue': '#1279F2',
        'unilectives_blue2': '#2C93FF',
      },
      flexShrink: {
        'std': '2'
      }
    },
  },
  plugins: [],
  gridTemplateColumns: {
    "responsive-cards": "repeat(auto-fit, minmax(315px, 1fr))",
  },
};
