// frontend/eslint.config.cjs
const tsParser = require("@typescript-eslint/parser");
const pluginReact = require("eslint-plugin-react");
const pluginTs = require("@typescript-eslint/eslint-plugin");

module.exports = [
  // 0) Globally ignore build output
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "public/**",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // 1) Apply lint rules to JS/TS/JSX/TSX files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: pluginReact,
      "@typescript-eslint": pluginTs,
    },
    rules: {
      // React 17+ JSX runtime (no import React)
      "react/react-in-jsx-scope": "off",
      // allow unescaped apostrophes/quotes in JSX
      "react/no-unescaped-entities": "off",
      // we use TS for prop types
      "react/prop-types": "off",
      // allow nonstandard props (e.g. cmdk-input-wrapper)
      "react/no-unknown-property": "off",

      // unused vars OK if prefixed with _
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
