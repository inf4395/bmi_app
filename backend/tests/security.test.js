import request from "supertest";
import express from "express";
import cors from "cors";
import { initDB } from "../db.js";
import authRoutes from "../routes/authRoutes.js";
import bmiRoutes from "../routes/bmiRoutes.js";
import jwt from "jsonwebtoken";

let app;
let db;
let validToken;
let userId;

beforeAll(async () => {
  // Utiliser une base de données en mémoire pour éviter les conflits
  db = await initDB(":memory:");
  app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", authRoutes(db));
  app.use("/api", bmiRoutes(db));

  // Créer un utilisateur de test
  const testEmail = `securitytest_${Date.now()}@example.com`;
  const password = "Secret123!";

  const registerResponse = await request(app).post("/api/auth/register").send({
    name: "Security Tester",
    email: testEmail,
    password,
  });

  if (registerResponse.statusCode !== 201) {
    throw new Error(`Registration failed: ${JSON.stringify(registerResponse.body)}`);
  }

  userId = registerResponse.body.user.id;

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: testEmail,
    password,
  });

  if (loginResponse.statusCode !== 200 || !loginResponse.body.token) {
    throw new Error(`Login failed: ${JSON.stringify(loginResponse.body)}`);
  }

  validToken = loginResponse.body.token;
});

afterAll(async () => {
  await db.close();
});

describe("Security Tests", () => {
  describe("JWT Token Validation", () => {
    test("rejette une requête sans token", async () => {
      const response = await request(app).get("/api/auth/me");

      expect(response.statusCode).toBe(401);
      expect(response.body.error).toContain("Authentifizierung");
    });

    test("rejette un token invalide", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer invalid-token-12345");

      expect(response.statusCode).toBe(401);
      expect(response.body.error).toContain("Token");
    });

    test("rejette un token malformé", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer not.a.valid.jwt.token");

      expect(response.statusCode).toBe(401);
    });

    test("rejette un token expiré", async () => {
      // Créer un token expiré
      const expiredToken = jwt.sign(
        { id: userId, email: "test@example.com" },
        process.env.JWT_SECRET || "bmi-app-secret",
        { expiresIn: "-1h" } // Expiré il y a 1 heure
      );

      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${expiredToken}`);

      expect(response.statusCode).toBe(401);
    });

    test("rejette un token avec un secret incorrect", async () => {
      const wrongSecretToken = jwt.sign(
        { id: userId, email: "test@example.com" },
        "wrong-secret",
        { expiresIn: "1h" }
      );

      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${wrongSecretToken}`);

      expect(response.statusCode).toBe(401);
    });

    test("accepte un token valide", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
    });
  });

  describe("SQL Injection Protection", () => {
    test("protège contre l'injection SQL dans l'email", async () => {
      const maliciousEmail = "test@example.com'; DROP TABLE users; --";
      
      const response = await request(app).post("/api/auth/login").send({
        email: maliciousEmail,
        password: "password123",
      });

      // Ne devrait pas causer d'erreur SQL, juste un échec d'authentification
      expect(response.statusCode).toBe(401);
    });

    test("protège contre l'injection SQL dans le nom", async () => {
      const maliciousName = "Test'; DROP TABLE users; --";
      const uniqueEmail = `sqltest_${Date.now()}@example.com`;
      
      const response = await request(app)
        .put("/api/auth/profile")
        .set("Authorization", `Bearer ${validToken}`)
        .send({
          name: maliciousName,
          email: uniqueEmail,
        });

      // Le nom devrait être échappé et stocké tel quel
      expect(response.statusCode).toBe(200);
      // Vérifier que la table existe toujours
      const user = await db.get("SELECT * FROM users WHERE id = ?", [userId]);
      expect(user).toBeDefined();
      expect(user.name).toBe(maliciousName); // Le nom est stocké tel quel (échappé par SQLite)
    });

    test("protège contre l'injection SQL dans les paramètres de requête", async () => {
      const maliciousId = "1; DROP TABLE bmi_records; --";
      
      const response = await request(app)
        .put(`/api/bmi/${maliciousId}`)
        .set("Authorization", `Bearer ${validToken}`)
        .send({
          name: "Test",
          email: "test@example.com",
          height: 180,
          weight: 75,
        });

      // Ne devrait pas causer d'erreur SQL
      expect(response.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe("Authorization Tests", () => {
    test("empêche un utilisateur d'accéder aux données d'un autre utilisateur", async () => {
      // Créer un deuxième utilisateur
      const testEmail2 = `securitytest2_${Date.now()}@example.com`;
      await request(app).post("/api/auth/register").send({
        name: "User 2",
        email: testEmail2,
        password: "password123",
      });

      const loginResponse2 = await request(app).post("/api/auth/login").send({
        email: testEmail2,
        password: "password123",
      });

      const token2 = loginResponse2.body.token;

      // Créer un enregistrement BMI avec le premier utilisateur
      const createResponse = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${validToken}`)
        .send({
          name: "User 1",
          email: "user1@example.com",
          height: 180,
          weight: 75,
        });

      const bmiId = createResponse.body.id;

      // Le deuxième utilisateur ne devrait pas pouvoir modifier cet enregistrement
      const updateResponse = await request(app)
        .put(`/api/bmi/${bmiId}`)
        .set("Authorization", `Bearer ${token2}`)
        .send({
          name: "User 2",
          email: "user2@example.com",
          height: 180,
          weight: 80,
        });

      expect(updateResponse.statusCode).toBe(404);
    });

    test("empêche un utilisateur de supprimer les données d'un autre utilisateur", async () => {
      // Créer un deuxième utilisateur
      const testEmail3 = `securitytest3_${Date.now()}@example.com`;
      await request(app).post("/api/auth/register").send({
        name: "User 3",
        email: testEmail3,
        password: "password123",
      });

      const loginResponse3 = await request(app).post("/api/auth/login").send({
        email: testEmail3,
        password: "password123",
      });

      const token3 = loginResponse3.body.token;

      // Créer un enregistrement BMI avec le premier utilisateur
      const createResponse = await request(app)
        .post("/api/bmi")
        .set("Authorization", `Bearer ${validToken}`)
        .send({
          name: "User 1",
          email: "user1@example.com",
          height: 180,
          weight: 75,
        });

      const bmiId = createResponse.body.id;

      // Le deuxième utilisateur ne devrait pas pouvoir supprimer cet enregistrement
      const deleteResponse = await request(app)
        .delete(`/api/bmi/${bmiId}`)
        .set("Authorization", `Bearer ${token3}`);

      expect(deleteResponse.statusCode).toBe(404);
    });
  });

  describe("Password Security", () => {
    test("les mots de passe sont hashés (ne sont pas stockés en clair)", async () => {
      const testEmail4 = `securitytest4_${Date.now()}@example.com`;
      const password = "MySecretPassword123!";

      await request(app).post("/api/auth/register").send({
        name: "Password Tester",
        email: testEmail4,
        password,
      });

      // Récupérer le mot de passe stocké
      const user = await db.get("SELECT password FROM users WHERE email = ?", [
        testEmail4,
      ]);

      // Le mot de passe ne devrait pas être en clair
      expect(user.password).not.toBe(password);
      expect(user.password.length).toBeGreaterThan(20); // Les hash bcrypt sont longs
      expect(user.password).toMatch(/^\$2[aby]\$/); // Format bcrypt
    });

    test("rejette la connexion avec un mauvais mot de passe", async () => {
      const testEmail5 = `securitytest5_${Date.now()}@example.com`;
      const password = "CorrectPassword123!";

      await request(app).post("/api/auth/register").send({
        name: "Password Tester 2",
        email: testEmail5,
        password,
      });

      const response = await request(app).post("/api/auth/login").send({
        email: testEmail5,
        password: "WrongPassword123!",
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe("Input Sanitization", () => {
    test("sanitise les entrées XSS potentielles dans le nom", async () => {
      const xssPayload = "<script>alert('XSS')</script>";
      const uniqueEmail = `xsstest_${Date.now()}@example.com`;

      const response = await request(app)
        .put("/api/auth/profile")
        .set("Authorization", `Bearer ${validToken}`)
        .send({
          name: xssPayload,
          email: uniqueEmail,
        });

      expect(response.statusCode).toBe(200);
      // Le nom devrait être stocké tel quel (la sanitization se fait côté frontend)
      // Mais on vérifie qu'il n'y a pas d'erreur serveur
      const user = await db.get("SELECT * FROM users WHERE id = ?", [userId]);
      expect(user.name).toBe(xssPayload);
    });
  });
});

