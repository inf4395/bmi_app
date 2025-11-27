export default {
  testEnvironment: "node",
  transform: {},
  maxWorkers: 1, // Exécuter les tests en série pour éviter les conflits SQLite
  testTimeout: 10000, // Timeout de 10 secondes par test
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
