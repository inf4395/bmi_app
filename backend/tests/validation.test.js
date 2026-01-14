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
  db = await initDB(":memory:");
  app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", authRoutes(db));
  app.use("/api", bmiRoutes(db));

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
    test("lehnt eine ungültige E-Mail bei der Registrierung ab", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "invalid-email",
        password: "password123",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("E-Mail");
    });

    test("lehnt eine leere E-Mail bei der Registrierung ab", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "",
        password: "password123",
      });

      expect(response.statusCode).toBe(400);
    });

    test("lehnt eine ungültige E-Mail bei der Anmeldung ab", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "not-an-email",
        password: "password123",
      });

      expect(response.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe("Password Validation", () => {
    test("lehnt ein zu kurzes Passwort ab", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "12345",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Passwort");
    });

    test("lehnt ein leeres Passwort ab", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "",
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("BMI Input Validation", () => {
    test("lehnt ein negatives Gewicht ab", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          height: 180,
          weight: -10,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Gewicht");
    });

    test("lehnt ein Gewicht von null ab", async () => {
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

    test("lehnt eine negative Größe ab", async () => {
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

    test("lehnt eine Größe von null ab", async () => {
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

    test("lehnt eine zu große Größe ab (realistische Grenze)", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          height: 350,
          weight: 75,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Höhe");
    });

    test("lehnt ein zu hohes Gewicht ab (realistische Grenze)", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test User",
          email: "test@example.com",
          height: 180,
          weight: 600,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toContain("Gewicht");
    });

    test("lehnt fehlende Werte ab", async () => {
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
    test("lehnt einen leeren Namen bei der Registrierung ab", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "",
        email: `test${Date.now()}@example.com`,
        password: "password123",
      });

      expect(response.statusCode).toBe(400);
    });

    test("lehnt einen fehlenden Namen bei der Registrierung ab", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: `test${Date.now()}@example.com`,
        password: "password123",
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("Profile Validation", () => {
    test("lehnt eine ungültige E-Mail bei der Profilaktualisierung ab", async () => {
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

    test("lehnt eine negative Größe im Profil ab", async () => {
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

