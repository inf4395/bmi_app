import request from "supertest";
import express from "express";
import cors from "cors";
import { initDB } from "../db.js";
import authRoutes from "../routes/authRoutes.js";
import bmiRoutes from "../routes/bmiRoutes.js";

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

  // Créer un utilisateur de test
  const testEmail = `testuser_${Date.now()}@example.com`;
  const password = "Secret123!";

  const registerResponse = await request(app).post("/api/auth/register").send({
    name: "Validation Tester",
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
});

afterAll(async () => {
  await db.close();
});

describe("Validation Tests", () => {
  describe("Email Validation", () => {
    test("rejette un email invalide lors de l'inscription", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "invalid-email",
        password: "password123",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("E-Mail");
    });

    test("rejette un email vide lors de l'inscription", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "",
        password: "password123",
      });

      expect(response.statusCode).toBe(400);
    });

    test("rejette un email invalide lors de la connexion", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "not-an-email",
        password: "password123",
      });

      expect(response.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe("Password Validation", () => {
    test("rejette un mot de passe trop court", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "12345", // Moins de 6 caractères
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Passwort");
    });

    test("rejette un mot de passe vide", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "",
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("BMI Input Validation", () => {
    test("rejette un poids négatif", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          height: 180,
          weight: -10, // Poids négatif
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Gewicht");
    });

    test("rejette un poids de zéro", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          height: 180,
          weight: 0,
        });

      expect(response.statusCode).toBeGreaterThanOrEqual(400);
    });

    test("rejette une hauteur négative", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          height: -180,
          weight: 75,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Höhe");
    });

    test("rejette une hauteur de zéro", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          height: 0,
          weight: 75,
        });

      expect(response.statusCode).toBeGreaterThanOrEqual(400);
    });

    test("rejette une hauteur trop grande (limite réaliste)", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          height: 350, // 3.5 mètres - au-delà de la limite
          weight: 75,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Höhe");
    });

    test("rejette un poids trop élevé (limite réaliste)", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          height: 180,
          weight: 600, // 600 kg - au-delà de la limite
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Gewicht");
    });

    test("rejette des valeurs manquantes", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          // height et weight manquants
        });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("Name Validation", () => {
    test("rejette un nom vide lors de l'inscription", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "",
        email: `test${Date.now()}@example.com`,
        password: "password123",
      });

      expect(response.statusCode).toBe(400);
    });

    test("rejette un nom manquant lors de l'inscription", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: `test${Date.now()}@example.com`,
        password: "password123",
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("Profile Validation", () => {
    test("rejette un email invalide lors de la mise à jour du profil", async () => {
      const response = await request(app)
        .put("/api/auth/profile")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "invalid-email",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("E-Mail");
    });

    test("rejette une hauteur négative dans le profil", async () => {
      const response = await request(app)
        .put("/api/auth/profile")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          height: -100,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Höhe");
    });
  });
});

