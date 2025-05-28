// frontend/eslint.config.js
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginTs from "@typescript-eslint/eslint-plugin";

export default [
  // 1) Global settings for *all* files
  {
    ignores: ["node_modules/**", ".next/**", "public/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" }, // auto‐detect React version
    },
  },

  // 2) Apply these rules only to JS/TS/JSX/TSX files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: pluginReact,
      "@typescript-eslint": pluginTs,
    },
    rules: {
      // pull in each plugin’s “recommended” set:
      ...pluginReact.configs.recommended.rules,
      ...pluginTs.configs.recommended.rules,

      // then override:
      "react/react-in-jsx-scope": "off", // no need to import React
      "react/no-unescaped-entities": "off", // allow straight apostrophes/quotes
      "react/prop-types": "off", // we use TS, not prop-types
      "react/no-unknown-property": "off", // allow non-standard props (e.g. cmdk input)

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
