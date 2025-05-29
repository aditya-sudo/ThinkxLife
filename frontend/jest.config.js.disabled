// frontend/jest.config.js
const nextJest = require("next/jest");

// Point to your Next.js app’s root
const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  // Run in a browser-like environment
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // Automatically handle .ts/.tsx with Next’s Babel config
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "\\.(test|spec)\\.(ts|tsx|js|jsx)$",
};

module.exports = createJestConfig(customJestConfig);
