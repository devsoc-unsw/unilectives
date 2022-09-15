module.exports = {
  env: {
    es2020: true,
    browser: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["airbnb-typescript", "prettier"],
  rules: {
    "@typescript-eslint/camelcase": "off",
    "react/destructuring-assignment": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "max-len": "warn",
    "implicit-arrow-linebreak": "off",
    "react/state-in-constructor": "off",
    "jsx-a11y/media-has-caption": "off",
    "object-curly-newline": "off",
    // Warnings that should be fixed but shouldn’t error
    "arrow-body-style": "off",
    "eol-last": "warn",
    "no-trailing-spaces": "warn",
    // "padded-blocks": "o",
    // Ignore for RTK state mutation
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["state"] },
    ],
    // Won’t need to type check as TypeScript does it
    "react/require-default-props": "off",
    // Below rules were throwing error in application so turning off for now
    // but needs to be reviewed.
    "react/prop-types": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-filename-extension": "off",
    "import/extensions": "off",
    "no-plusplus": "off",
    "react/jsx-props-no-spreading": "off",
    "no-console": "off",
    // Turning these rules off as they conflicts with prettier
    "operator-linebreak": "off",
    "no-confusing-arrow": "off",
    "function-paren-newline": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-cycle": "off",
    "global-require": "off",
    "@typescript-eslint/dot-notation": "off",
    "no-else-return": "off",
    "no-param-reassign": "off",
  },
};
