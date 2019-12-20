// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  /**
   * The directory where Jest should output its coverage files.
   */
  coverageDirectory: ".jest/coverage",

  /**
   * The paths to modules that run some code to configure or set up the testing environment
   * before each test.
   */
  setupFiles: ["<rootDir>/.jest/setupTests.ts"],

  /**
   * Print all test descriptions instead of just the name of the test suites.
   */
  verbose: true
};
