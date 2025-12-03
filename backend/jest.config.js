export default {
  testEnvironment: "node",
  transform: {},
  maxWorkers: 1, // Exécuter les tests en série pour éviter les conflits SQLite
  testTimeout: 30000, // Timeout de 30 secondes par test (augmenté pour les tests de performance)
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
