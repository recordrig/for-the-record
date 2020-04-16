module.exports = {
  /*
   * We collect coverage reports for files which are 1) not adopted and left in their original
   * (non-TS) language; 2) not config files; 3) not files that are better tested using
   * integration tests, e.g. pages and code that ties other code together.
   *
   * This leaves our components and our store's logic.
   */
  collectCoverage: true,
  collectCoverageFrom: [
    // Include:
    "./components/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}",
    // Exlude:
    "!./components/**/*.stories.tsx",
    "!./components/**/*Container.tsx",
    "!./store/_rootReducer.ts",
    "!**/node_modules/**"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageDirectory: ".jest/coverage",

  /*
   * The paths to modules that run some code to configure or set up the testing environment
   * before each test.
   */
  setupFiles: ["<rootDir>/.jest/setupTests.ts"],

  /*
   * Print all test descriptions instead of just the name of the test suites.
   */
  verbose: true
};
