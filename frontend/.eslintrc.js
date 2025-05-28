module.exports = {
  root: true,

  // 1) Files & folders to skip
  ignorePatterns: ["node_modules/", ".next/", "public/"],

  env: { browser: true, es2021: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    jsxRuntime: "automatic", // <-- auto import JSX runtime
  },
  settings: {
    react: { version: "detect" }, // <-- auto-detect React version
  },
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],

  rules: {
    // 2) Allow unused vars if they start with _
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],

    // 3) You’re on React 17+ with automatic JSX; disable the old rule
    "react/react-in-jsx-scope": "off",

    // 4) If you prefer not to escape apostrophes in JSX
    "react/no-unescaped-entities": "off",
  },
};
