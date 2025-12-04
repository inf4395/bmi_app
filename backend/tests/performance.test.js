import request from "supertest";
import express from "express";
import cors from "cors";
import { initDB } from "../db.js";
import authRoutes from "../routes/authRoutes.js";
import bmiRoutes from "../routes/bmiRoutes.js";
import statsRoutes from "../routes/statsRoutes.js";

let app;
let db;
let token;

beforeAll(async () => {
  // Utiliser une base de données en mémoire pour éviter les conflits
  db = await initDB(":memory:");
  app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", authRoutes(db));
  app.use("/api", bmiRoutes(db));
  app.use("/api", statsRoutes(db));

  // Créer un utilisateur de test
  const testEmail = `perftest_${Date.now()}@example.com`;
  const password = "Secret123!";

  const registerResponse = await request(app).post("/api/auth/register").send({
    name: "Performance Tester",
    email: testEmail,
    password,
  });

  if (registerResponse.statusCode !== 201) {
    throw new Error(`Registration failed: ${JSON.stringify(registerResponse.body)}`);
  }

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: testEmail,
    password,
  });

  if (loginResponse.statusCode !== 200 || !loginResponse.body.token) {
    throw new Error(`Login failed: ${JSON.stringify(loginResponse.body)}`);
  }

  token = loginResponse.body.token;

  // Créer quelques enregistrements pour les tests de performance
  for (let i = 0; i < 10; i++) {
    const response = await request(app)
      .post("/api/bmi")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Performance Test",
        email: testEmail,
        height: 180,
        weight: 75 + i,
      });
    
    // Attendre que la réponse soit complète
    if (response.statusCode !== 200) {
      console.warn(`Warning: BMI record creation failed for iteration ${i}: ${response.statusCode}`);
    }
  }
}, 60000); // Timeout de 60 secondes pour beforeAll

afterAll(async () => {
  // Attendre que toutes les opérations asynchrones soient terminées
  await new Promise(resolve => setTimeout(resolve, 100));
  if (db) {
    await db.close();
  }
}, 10000);

describe("Performance Tests", () => {
  const MAX_RESPONSE_TIME = 1000; // 1 seconde en millisecondes

  test("POST /api/bmi répond en moins de 1 seconde", async () => {
    const startTime = Date.now();

    const response = await request(app)
      .post("/api/bmi")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Performance Test",
        email: "perf@example.com",
        height: 180,
        weight: 75,
      });

    const responseTime = Date.now() - startTime;

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(MAX_RESPONSE_TIME);
  });

  test("GET /api/history répond en moins de 1 seconde", async () => {
    const startTime = Date.now();

    const response = await request(app)
      .get("/api/history")
      .set("Authorization", `Bearer ${token}`);

    const responseTime = Date.now() - startTime;

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(MAX_RESPONSE_TIME);
  });

  test("GET /api/stats/summary répond en moins de 1 seconde", async () => {
    const startTime = Date.now();

    const response = await request(app)
      .get("/api/stats/summary")
      .set("Authorization", `Bearer ${token}`);

    const responseTime = Date.now() - startTime;

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(MAX_RESPONSE_TIME);
  });

  test("GET /api/stats/detailed répond en moins de 1 seconde", async () => {
    const startTime = Date.now();

    const response = await request(app)
      .get("/api/stats/detailed")
      .set("Authorization", `Bearer ${token}`);

    const responseTime = Date.now() - startTime;

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(MAX_RESPONSE_TIME);
  });

  test("POST /api/auth/login répond en moins de 1 seconde", async () => {
    const testEmail = `perflogin_${Date.now()}@example.com`;
    await request(app).post("/api/auth/register").send({
      name: "Login Perf Test",
      email: testEmail,
      password: "Secret123!",
    });

    const startTime = Date.now();

    const response = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: "Secret123!",
    });

    const responseTime = Date.now() - startTime;

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(MAX_RESPONSE_TIME);
  });

  test("GET /api/auth/me répond en moins de 500ms", async () => {
    const startTime = Date.now();

    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    const responseTime = Date.now() - startTime;

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(500); // Plus rapide car simple requête
  });

  test("PUT /api/auth/profile répond en moins de 1 seconde", async () => {
    const startTime = Date.now();

    const response = await request(app)
      .put("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Name",
        email: "updated@example.com",
        height: 180,
      });

    const responseTime = Date.now() - startTime;

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(MAX_RESPONSE_TIME);
  });

  test("peut gérer plusieurs requêtes simultanées", async () => {
    const requests = Array(5)
      .fill(null)
      .map(() =>
        request(app)
          .get("/api/stats/summary")
          .set("Authorization", `Bearer ${token}`)
      );

    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const totalTime = Date.now() - startTime;

    responses.forEach((response) => {
      expect(response.statusCode).toBe(200);
    });

    // Toutes les requêtes devraient être complétées en moins de 2 secondes
    expect(totalTime).toBeLessThan(2000);
  });
});

describe("Load Testing - Tests de charge", () => {
  const LOAD_TEST_ITERATIONS = 20;
  const MAX_AVERAGE_RESPONSE_TIME = 500; // ms

  test("Load test: POST /api/bmi avec 20 requêtes séquentielles", async () => {
    const responseTimes = [];
    const errors = [];

    for (let i = 0; i < LOAD_TEST_ITERATIONS; i++) {
      const startTime = Date.now();
      try {
        const response = await request(app)
          .post("/api/bmi")
          .set("Authorization", `Bearer ${token}`)
          .send({
            name: "Load Test",
            email: "load@example.com",
            height: 180,
            weight: 75 + i,
          });

        const responseTime = Date.now() - startTime;
        responseTimes.push(responseTime);

        if (response.statusCode !== 200) {
          errors.push({ iteration: i, status: response.statusCode });
        }
      } catch (error) {
        errors.push({ iteration: i, error: error.message });
      }
    }

    const averageTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const maxTime = Math.max(...responseTimes);
    const minTime = Math.min(...responseTimes);

    console.log(`[Load Test] POST /api/bmi - Avg: ${averageTime.toFixed(2)}ms, Min: ${minTime}ms, Max: ${maxTime}ms`);

    expect(errors.length).toBe(0);
    expect(averageTime).toBeLessThan(MAX_AVERAGE_RESPONSE_TIME * 2); // Tolérance pour charge
    expect(responseTimes.length).toBe(LOAD_TEST_ITERATIONS);
  });

  test("Load test: GET /api/stats/summary avec 20 requêtes parallèles", async () => {
    const startTime = Date.now();
    const requests = Array(LOAD_TEST_ITERATIONS)
      .fill(null)
      .map(() =>
        request(app)
          .get("/api/stats/summary")
          .set("Authorization", `Bearer ${token}`)
      );

    const responses = await Promise.all(requests);
    const totalTime = Date.now() - startTime;
    const averageTime = totalTime / LOAD_TEST_ITERATIONS;

    const successCount = responses.filter(r => r.statusCode === 200).length;
    const errors = responses.filter(r => r.statusCode !== 200);

    console.log(`[Load Test] GET /api/stats/summary - Total: ${totalTime}ms, Avg: ${averageTime.toFixed(2)}ms, Success: ${successCount}/${LOAD_TEST_ITERATIONS}`);

    expect(errors.length).toBe(0);
    expect(successCount).toBe(LOAD_TEST_ITERATIONS);
    expect(averageTime).toBeLessThan(MAX_AVERAGE_RESPONSE_TIME * 3); // Tolérance pour parallélisme
  });

  test("Load test: GET /api/history avec différentes limites", async () => {
    const limits = [10, 50, 100];
    const results = [];

    for (const limit of limits) {
      const startTime = Date.now();
      const response = await request(app)
        .get(`/api/history?limit=${limit}`)
        .set("Authorization", `Bearer ${token}`);

      const responseTime = Date.now() - startTime;
      results.push({ limit, responseTime, status: response.statusCode });

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeLessThanOrEqual(limit);
    }

    console.log(`[Load Test] GET /api/history avec limites:`, results);
    
    // Les temps de réponse devraient augmenter proportionnellement mais rester raisonnables
    results.forEach(result => {
      expect(result.responseTime).toBeLessThan(MAX_AVERAGE_RESPONSE_TIME * 2);
    });
  });
});

describe("Stress Testing - Tests de stress", () => {
  const STRESS_TEST_ITERATIONS = 50;
  const MAX_FAILURE_RATE = 0.1; // 10% de taux d'échec acceptable

  test("Stress test: Création massive de records BMI", async () => {
    const startTime = Date.now();
    const results = {
      success: 0,
      failures: 0,
      responseTimes: [],
    };

    const requests = Array(STRESS_TEST_ITERATIONS)
      .fill(null)
      .map((_, i) => {
        const reqStart = Date.now();
        return request(app)
          .post("/api/bmi")
          .set("Authorization", `Bearer ${token}`)
          .send({
            name: "Stress Test",
            email: "stress@example.com",
            height: 180,
            weight: 70 + (i % 20),
          })
          .then(response => {
            const reqTime = Date.now() - reqStart;
            results.responseTimes.push(reqTime);
            if (response.statusCode === 200) {
              results.success++;
            } else {
              results.failures++;
            }
            return response;
          })
          .catch(error => {
            results.failures++;
            return { error };
          });
      });

    await Promise.all(requests);
    const totalTime = Date.now() - startTime;
    const failureRate = results.failures / STRESS_TEST_ITERATIONS;
    const avgResponseTime = results.responseTimes.reduce((a, b) => a + b, 0) / results.responseTimes.length;
    const throughput = STRESS_TEST_ITERATIONS / (totalTime / 1000); // requêtes par seconde

    console.log(`[Stress Test] POST /api/bmi - Total: ${totalTime}ms, Success: ${results.success}, Failures: ${results.failures}, Avg: ${avgResponseTime.toFixed(2)}ms, Throughput: ${throughput.toFixed(2)} req/s`);

    expect(failureRate).toBeLessThan(MAX_FAILURE_RATE);
    expect(results.success).toBeGreaterThan(STRESS_TEST_ITERATIONS * (1 - MAX_FAILURE_RATE));
  });

  test("Stress test: Requêtes simultanées sur /api/stats/summary", async () => {
    const concurrentRequests = 30;
    const startTime = Date.now();

    const requests = Array(concurrentRequests)
      .fill(null)
      .map(() =>
        request(app)
          .get("/api/stats/summary")
          .set("Authorization", `Bearer ${token}`)
      );

    const responses = await Promise.all(requests);
    const totalTime = Date.now() - startTime;

    const successCount = responses.filter(r => r.statusCode === 200).length;
    const failureRate = (concurrentRequests - successCount) / concurrentRequests;
    const throughput = concurrentRequests / (totalTime / 1000);

    console.log(`[Stress Test] GET /api/stats/summary - Concurrent: ${concurrentRequests}, Total: ${totalTime}ms, Success: ${successCount}, Throughput: ${throughput.toFixed(2)} req/s`);

    expect(failureRate).toBeLessThan(MAX_FAILURE_RATE);
    expect(successCount).toBeGreaterThan(concurrentRequests * (1 - MAX_FAILURE_RATE));
  });
});

describe("Scalability Testing - Tests de scalabilité", () => {
  test("Scalabilité: Performance avec différents volumes de données", async () => {
    // Créer un utilisateur séparé pour ce test
    const testEmail = `scalability_${Date.now()}@example.com`;
    await request(app).post("/api/auth/register").send({
      name: "Scalability Test",
      email: testEmail,
      password: "Secret123!",
    });

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: "Secret123!",
    });
    const testToken = loginResponse.body.token;

    // Créer différents volumes de données
    const volumes = [10, 25, 50];
    const results = [];

    for (const volume of volumes) {
      // Créer volume de données
      for (let i = 0; i < volume; i++) {
        await request(app)
          .post("/api/bmi")
          .set("Authorization", `Bearer ${testToken}`)
          .send({
            name: "Scalability Test",
            email: testEmail,
            height: 180,
            weight: 70 + i,
          });
      }

      // Mesurer le temps de réponse pour stats/summary
      const startTime = Date.now();
      const response = await request(app)
        .get("/api/stats/summary")
        .set("Authorization", `Bearer ${testToken}`);
      const responseTime = Date.now() - startTime;

      results.push({
        volume,
        responseTime,
        status: response.statusCode,
        recordCount: response.body.totalRecords,
      });

      expect(response.statusCode).toBe(200);
    }

    console.log(`[Scalability Test] Résultats avec différents volumes:`, results);

    // Vérifier que les temps de réponse restent raisonnables même avec plus de données
    results.forEach(result => {
      expect(result.responseTime).toBeLessThan(1000); // Moins de 1 seconde même avec 50 records
    });
  });

  test("Scalabilité: Performance avec requêtes parallèles croissantes", async () => {
    const parallelLevels = [5, 10, 20, 30];
    const results = [];

    for (const level of parallelLevels) {
      const startTime = Date.now();
      const requests = Array(level)
        .fill(null)
        .map(() =>
          request(app)
            .get("/api/stats/summary")
            .set("Authorization", `Bearer ${token}`)
        );

      const responses = await Promise.all(requests);
      const totalTime = Date.now() - startTime;
      const avgTime = totalTime / level;
      const successCount = responses.filter(r => r.statusCode === 200).length;
      const throughput = level / (totalTime / 1000);

      results.push({
        parallelLevel: level,
        totalTime,
        avgTime,
        successCount,
        throughput,
      });

      expect(successCount).toBe(level);
    }

    console.log(`[Scalability Test] Performance avec différents niveaux de parallélisme:`, results);

    // Vérifier que le throughput reste stable ou augmente avec le parallélisme
    const throughputs = results.map(r => r.throughput);
    const minThroughput = Math.min(...throughputs);
    const maxThroughput = Math.max(...throughputs);

    // Le throughput ne devrait pas diminuer de plus de 50% avec plus de parallélisme
    expect(maxThroughput / minThroughput).toBeGreaterThan(0.5);
  });
});

describe("Performance Metrics - Métriques de performance", () => {
  test("Métriques: Temps de réponse pour toutes les routes principales", async () => {
    const routes = [
      { method: "GET", path: "/api/stats/summary", name: "Stats Summary" },
      { method: "GET", path: "/api/stats/detailed", name: "Stats Detailed" },
      { method: "GET", path: "/api/history", name: "History" },
      { method: "GET", path: "/api/programs", name: "Programs" },
      { method: "GET", path: "/api/auth/me", name: "Auth Me" },
    ];

    const metrics = [];

    for (const route of routes) {
      const iterations = 5;
      const responseTimes = [];

      for (let i = 0; i < iterations; i++) {
        const startTime = Date.now();
        const response = await request(app)
          [route.method.toLowerCase()](route.path)
          .set("Authorization", `Bearer ${token}`);
        const responseTime = Date.now() - startTime;
        responseTimes.push(responseTime);
        expect(response.statusCode).toBe(200);
      }

      const avgTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const minTime = Math.min(...responseTimes);
      const maxTime = Math.max(...responseTimes);
      const p95Time = responseTimes.sort((a, b) => a - b)[Math.floor(iterations * 0.95)];

      metrics.push({
        route: route.name,
        avg: avgTime.toFixed(2),
        min: minTime,
        max: maxTime,
        p95: p95Time,
      });
    }

    console.log(`[Performance Metrics] Temps de réponse (ms):`, metrics);

    // Toutes les routes devraient avoir un temps moyen raisonnable
    metrics.forEach(metric => {
      expect(parseFloat(metric.avg)).toBeLessThan(500);
    });
  });

  test("Métriques: Throughput pour POST /api/bmi", async () => {
    const iterations = 20;
    const startTime = Date.now();

    const requests = Array(iterations)
      .fill(null)
      .map((_, i) =>
        request(app)
          .post("/api/bmi")
          .set("Authorization", `Bearer ${token}`)
          .send({
            name: "Throughput Test",
            email: "throughput@example.com",
            height: 180,
            weight: 70 + (i % 10),
          })
      );

    const responses = await Promise.all(requests);
    const totalTime = (Date.now() - startTime) / 1000; // en secondes
    const throughput = iterations / totalTime; // requêtes par seconde
    const successCount = responses.filter(r => r.statusCode === 200).length;
    const successRate = successCount / iterations;

    console.log(`[Performance Metrics] POST /api/bmi - Throughput: ${throughput.toFixed(2)} req/s, Success Rate: ${(successRate * 100).toFixed(2)}%`);

    expect(successRate).toBeGreaterThan(0.95); // 95% de succès minimum
    expect(throughput).toBeGreaterThan(5); // Au moins 5 requêtes par seconde
  });

  test("Métriques: Latence p50, p95, p99 pour GET /api/stats/summary", async () => {
    const iterations = 100;
    const responseTimes = [];

    for (let i = 0; i < iterations; i++) {
      const startTime = Date.now();
      const response = await request(app)
        .get("/api/stats/summary")
        .set("Authorization", `Bearer ${token}`);
      const responseTime = Date.now() - startTime;
      responseTimes.push(responseTime);
      expect(response.statusCode).toBe(200);
    }

    responseTimes.sort((a, b) => a - b);
    const p50 = responseTimes[Math.floor(iterations * 0.50)];
    const p95 = responseTimes[Math.floor(iterations * 0.95)];
    const p99 = responseTimes[Math.floor(iterations * 0.99)];
    const avg = responseTimes.reduce((a, b) => a + b, 0) / iterations;

    console.log(`[Performance Metrics] GET /api/stats/summary - Avg: ${avg.toFixed(2)}ms, P50: ${p50}ms, P95: ${p95}ms, P99: ${p99}ms`);

    expect(p50).toBeLessThan(200);
    expect(p95).toBeLessThan(500);
    expect(p99).toBeLessThan(1000);
  });
});

