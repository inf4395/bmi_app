import request from "supertest";
import express from "express";
import cors from "cors";
import { initDB } from "../db.js";
import authRoutes from "../routes/authRoutes.js";

let app;
let db;

beforeAll(async () => {
  // Utiliser une base de données en mémoire pour éviter les conflits
  db = await initDB(":memory:");
  app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", authRoutes(db));
});

afterAll(async () => {
  // Attendre que toutes les opérations asynchrones soient terminées
  await new Promise(resolve => setTimeout(resolve, 100));
  if (db) {
    await db.close();
  }
}, 10000);

describe("Authentication Routes", () => {
  let testEmail;
  let testPassword = "Secret123!";
  let token;
  let userId;

  beforeEach(() => {
    testEmail = `testuser_${Date.now()}@example.com`;
  });

  // Test d'inscription
  test("POST /api/auth/register crée un nouvel utilisateur", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: testEmail,
      password: testPassword,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toBe(testEmail.toLowerCase());
    expect(response.body.user.name).toBe("Test User");
    userId = response.body.user.id;
  });

  // Test d'inscription avec email existant
  test("POST /api/auth/register rejette un email déjà utilisé", async () => {
    await request(app).post("/api/auth/register").send({
      name: "First User",
      email: testEmail,
      password: testPassword,
    });

    const response = await request(app).post("/api/auth/register").send({
      name: "Second User",
      email: testEmail,
      password: testPassword,
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toContain("existiert bereits");
  });

  // Test de connexion
  test("POST /api/auth/login connecte un utilisateur valide", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Login Test",
      email: testEmail,
      password: testPassword,
    });

    const response = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: testPassword,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toBe(testEmail.toLowerCase());
    token = response.body.token;
  });

  // Test de connexion avec mauvais mot de passe
  test("POST /api/auth/login rejette un mauvais mot de passe", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Login Test",
      email: testEmail,
      password: testPassword,
    });

    const response = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: "WrongPassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toContain("Ungültige Zugangsdaten");
  });

  // Test GET /api/auth/me
  test("GET /api/auth/me retourne les informations de l'utilisateur", async () => {
    const registerResponse = await request(app).post("/api/auth/register").send({
      name: "Me Test",
      email: testEmail,
      password: testPassword,
    });

    const authToken = registerResponse.body.token;

    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("name");
    expect(response.body.user).toHaveProperty("email");
  });

  // Test PUT /api/auth/profile
  test("PUT /api/auth/profile met à jour le profil utilisateur", async () => {
    const registerResponse = await request(app).post("/api/auth/register").send({
      name: "Profile Test",
      email: testEmail,
      password: testPassword,
    });

    const authToken = registerResponse.body.token;

    const response = await request(app)
      .put("/api/auth/profile")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Updated Name",
        email: testEmail,
        gender: "männlich",
        birthDate: "1990-01-01",
        height: 180,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.name).toBe("Updated Name");
    expect(response.body.user.gender).toBe("männlich");
    expect(response.body.user.height).toBe(180);
  });
});

