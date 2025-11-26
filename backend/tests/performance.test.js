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
  db = await initDB();
  app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", authRoutes(db));
  app.use("/api", bmiRoutes(db));
  app.use("/api", statsRoutes(db));

  // Créer un utilisateur de test
  const testEmail = `perftest_${Date.now()}@example.com`;
  const password = "Secret123!";

  await request(app).post("/api/auth/register").send({
    name: "Performance Tester",
    email: testEmail,
    password,
  });

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: testEmail,
    password,
  });

  token = loginResponse.body.token;

  // Créer quelques enregistrements pour les tests de performance
  for (let i = 0; i < 10; i++) {
    await request(app)
      .post("/api/bmi")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Performance Test",
        email: testEmail,
        height: 180,
        weight: 75 + i,
      });
  }
});

afterAll(async () => {
  await db.close();
});

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

