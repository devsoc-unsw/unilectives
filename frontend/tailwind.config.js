/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // The following screen sizes are converted into css like so
      // @media (max-width: ...px) { ... }
      "2xl": { max: "1536px" },
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "480px" },
    },
    extend: {
      backgroundColor: {
        "unilectives-bg": "#FDFDFD",
      },
      colors: {
        "unilectives-blue": "#1279F2",
        "unilectives-headings": "#202020",
        "unilectives-subheadings": "#989898",
        "unilectives-placeholder": "#606060",
        "unilectives-tags": "#CCEBF6",
        "unilectives-card": "#f6f6f6",
        "unilectives-light-blue": "#84CEE7",
        "unilectives-purple": "#B789E5",
        "unilectives-indigo": "#9BADE8",
        "unilectives-button": "#33ABD1",
        "unilectives-search": "#9CADE9",
        "unilectives-modal": "#EEEEEE",
        "unilectives-icon": "#60A8D8",
        "unilectives-tags-pink": "#F7D6E0",
      },
      boxShadow: {
        btn: "-0.313rem 0.313rem 0.625rem -0.063rem rgb(0 0 0 / 15%)",
        "btn-hovered": "0 0.125rem 0.625rem 0 rgb(0 0 0 / 50%)",
        card: "-0.125rem 0.25rem 0.625rem rgba(0, 0, 0, 0.15)",
        input: "0 0 0.5rem 0.063rem rgba(0, 0, 0, 0.1);",
        "review-card": "0px 2px 2px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        custom: ["TT Commons Pro Variable", "Segoe UI", "Arial", "sans-serif"],
      },
      scale: {
        "-1": "-1",
      },
    },
    listStyleType: {
      decimal: "decimal",
      roman: "lower-roman",
      latin: "upper-Latin",
      disc: "disc",
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        img: {
          "max-width": "none",
        },
        body: {
          background: "#FDFDFD",
          margin: "0",
          height: "100%",
        },
      });
    }),
    require("tailwind-scrollbar"),
  ],
};
