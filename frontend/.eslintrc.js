// frontend/.eslintrc.js
module.exports = {
  root: true,
  ignorePatterns: ["node_modules/", ".next/", "public/"],

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    jsxRuntime: "automatic", // ← Tell ESLint you’re on React 17+ auto runtime
  },

  plugins: ["react", "@typescript-eslint"],

  settings: {
    react: {
      version: "detect", // ← auto-detect React version
    },
  },

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],

  rules: {
    // 1) No need to import React() in every .tsx
    "react/react-in-jsx-scope": "off",

    // 2) Unescaped entities are fine in JSX if you prefer
    "react/no-unescaped-entities": "off",

    // 3) We’re using TS; skip prop-types checks
    "react/prop-types": "off",

    // 4) Allow Tailwind-style unknown props (like cmdk-input-wrapper)
    "react/no-unknown-property": "off",

    // 5) Unused vars are OK if prefixed with _
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
};
