/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["/node_modules/"],

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "node"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@app(.*)$": "<rootDir>/$1",
    "^@shared(.*)$": "<rootDir>/../shared/dist$1",
    "^@config(.*)$": "<rootDir>/src/config$1",
    "^@models(.*)$": "<rootDir>/src/models$1",
    "^@routes(.*)$": "<rootDir>/src/routes$1",
    "^@controllers(.*)$": "<rootDir>/src/controllers$1",
    "^@middlewares(.*)$": "<rootDir>/src/middlewares$1",
    "^@services(.*)$": "<rootDir>/src/services$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
  },

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>/jest.config.js"],

  // The test environment that will be used for testing
  testEnvironment: "node",
};

module.exports = config;
