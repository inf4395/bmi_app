export default {
  testEnvironment: "node",
  transform: {},
  maxWorkers: 1,
  testTimeout: 30000,
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: ".",
        outputName: "test-results.xml",
        suiteName: "Backend Tests",
        classNameTemplate: "{classname}",
        titleTemplate: "{title}",
        ancestorSeparator: " › ",
        usePathForSuiteName: "true"
      }
    ]
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"]
};
