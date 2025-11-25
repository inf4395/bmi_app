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
  const testEmail = `testuser_${Date.now()}@example.com`;
  const password = "Secret123!";

  await request(app).post("/api/auth/register").send({
    name: "Stats Tester",
    email: testEmail,
    password,
  });

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: testEmail,
    password,
  });

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
  await db.close();
});

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
});

