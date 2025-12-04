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
  const testEmail = `testuser_${Date.now()}@example.com`;
  const password = "Secret123!";

  const registerResponse = await request(app).post("/api/auth/register").send({
    name: "Stats Tester",
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

  // Créer quelques enregistrements BMI pour les tests
  await request(app)
    .post("/api/bmi")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Stats Test",
      email: testEmail,
      age: 30,
      height: 180,
      weight: 75,
    });

  await request(app)
    .post("/api/bmi")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Stats Test",
      email: testEmail,
      age: 30,
      height: 180,
      weight: 80,
    });
});

afterAll(async () => {
  // Attendre que toutes les opérations asynchrones soient terminées
  await new Promise(resolve => setTimeout(resolve, 100));
  if (db) {
    await db.close();
  }
}, 10000);

describe("Statistics Routes", () => {
  // Test GET /api/stats/summary
  test("GET /api/stats/summary retourne les statistiques résumées", async () => {
    const response = await request(app)
      .get("/api/stats/summary")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("totalRecords");
    expect(response.body).toHaveProperty("averageBMI");
    expect(response.body).toHaveProperty("latestBMI");
    expect(response.body).toHaveProperty("latestWeight");
    expect(response.body.totalRecords).toBeGreaterThan(0);
    expect(response.body.averageBMI).toBeGreaterThan(0);
  });

  // Test GET /api/stats/summary avec aucun enregistrement
  test("GET /api/stats/summary retourne des valeurs nulles si aucun enregistrement", async () => {
    // Créer un nouvel utilisateur sans enregistrements
    const testEmail2 = `testuser2_${Date.now()}@example.com`;
    await request(app).post("/api/auth/register").send({
      name: "Empty Stats",
      email: testEmail2,
      password: "Secret123!",
    });

    const loginResponse2 = await request(app).post("/api/auth/login").send({
      email: testEmail2,
      password: "Secret123!",
    });

    const token2 = loginResponse2.body.token;

    const response = await request(app)
      .get("/api/stats/summary")
      .set("Authorization", `Bearer ${token2}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.totalRecords).toBe(0);
    expect(response.body.averageBMI).toBeNull();
  });

  // Test GET /api/stats/detailed
  test("GET /api/stats/detailed retourne les statistiques détaillées", async () => {
    const response = await request(app)
      .get("/api/stats/detailed")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("bmi");
    expect(response.body[0]).toHaveProperty("weight");
    expect(response.body[0]).toHaveProperty("created_at");
  });

  // Test POST /api/programs/start
  test("POST /api/programs/start crée un nouveau programme", async () => {
    const response = await request(app)
      .post("/api/programs/start")
      .set("Authorization", `Bearer ${token}`)
      .send({
        programType: "Fitness",
        programName: "Test Programm",
        description: "Ein Test-Programm",
        duration: "12 Wochen",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("program");
    expect(response.body.program.programType).toBe("Fitness");
    expect(response.body.program.programName).toBe("Test Programm");
    expect(response.body.program.status).toBe("active");
  });

  // Test POST /api/programs/start avec données manquantes
  test("POST /api/programs/start retourne une erreur si données manquantes", async () => {
    const response = await request(app)
      .post("/api/programs/start")
      .set("Authorization", `Bearer ${token}`)
      .send({
        programType: "Fitness",
        // programName manquant
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  // Test GET /api/programs
  test("GET /api/programs retourne les programmes de l'utilisateur", async () => {
    // Créer d'abord un programme
    await request(app)
      .post("/api/programs/start")
      .set("Authorization", `Bearer ${token}`)
      .send({
        programType: "Sport",
        programName: "Programm 1",
        description: "Description 1",
        duration: "8 Wochen",
      });

    const response = await request(app)
      .get("/api/programs")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("program_type");
    expect(response.body[0]).toHaveProperty("program_name");
    expect(response.body[0]).toHaveProperty("status");
  });

  // Test GET /api/stats/detailed avec startDate
  test("GET /api/stats/detailed avec startDate filtre les résultats", async () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const startDateStr = startDate.toISOString().split('T')[0];

    const response = await request(app)
      .get(`/api/stats/detailed?startDate=${startDateStr}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /api/stats/detailed avec endDate
  test("GET /api/stats/detailed avec endDate filtre les résultats", async () => {
    const endDate = new Date();
    const endDateStr = endDate.toISOString().split('T')[0];

    const response = await request(app)
      .get(`/api/stats/detailed?endDate=${endDateStr}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /api/stats/detailed avec startDate et endDate
  test("GET /api/stats/detailed avec startDate et endDate filtre les résultats", async () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDate = new Date();
    const endDateStr = endDate.toISOString().split('T')[0];

    const response = await request(app)
      .get(`/api/stats/detailed?startDate=${startDateStr}&endDate=${endDateStr}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test POST /api/programs/start avec duration sans nombre
  test("POST /api/programs/start avec duration invalide", async () => {
    const response = await request(app)
      .post("/api/programs/start")
      .set("Authorization", `Bearer ${token}`)
      .send({
        programType: "Fitness",
        programName: "Test Programm",
        duration: "Dauerhaft", // Pas de nombre
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    // endDate devrait être null si duration n'a pas de nombre
  });

  // Test POST /api/programs/start sans description
  test("POST /api/programs/start sans description", async () => {
    const response = await request(app)
      .post("/api/programs/start")
      .set("Authorization", `Bearer ${token}`)
      .send({
        programType: "Sport",
        programName: "Programm sans description",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    // description peut être null ou undefined si non fournie
    expect(response.body.program.description === null || response.body.program.description === undefined).toBe(true);
  });

  // Test GET /api/history avec limit
  test("GET /api/history retourne l'historique avec limite", async () => {
    const response = await request(app)
      .get("/api/history?limit=1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeLessThanOrEqual(1);
  });

  // Test GET /api/history sans limite
  test("GET /api/history retourne tout l'historique", async () => {
    const response = await request(app)
      .get("/api/history")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

