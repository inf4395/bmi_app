export default {
  testEnvironment: "node",
  transform: {},
  maxWorkers: 1, // Exécuter les tests en série pour éviter les conflits SQLite
  testTimeout: 10000, // Timeout de 10 secondes par test
};
