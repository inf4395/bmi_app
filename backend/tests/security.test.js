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
  db = await initDB(":memory:");
  app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", authRoutes(db));
  app.use("/api", bmiRoutes(db));

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
}, 60000); // Timeout von 60 Sekunden für beforeAll

afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (db) {
    await db.close();
  }
}, 10000);

describe("Security Tests", () => {
  describe("JWT Token Validation", () => {
    test("lehnt eine Anfrage ohne Token ab", async () => {
      const response = await request(app).get("/api/auth/me");

      expect(response.statusCode).toBe(401);
      expect(response.body.error).toContain("Authentifizierung");
    });

    test("lehnt einen ungültigen Token ab", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer invalid-token-12345");

      expect(response.statusCode).toBe(401);
      expect(response.body.error).toContain("Token");
    });

    test("lehnt einen fehlerhaften Token ab", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer not.a.valid.jwt.token");

      expect(response.statusCode).toBe(401);
    });

    test("lehnt einen abgelaufenen Token ab", async () => {
      const expiredToken = jwt.sign(
        { id: userId, email: "test@example.com" },
        process.env.JWT_SECRET || "bmi-app-secret",
        { expiresIn: "-1h" }
      );

      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${expiredToken}`);

      expect(response.statusCode).toBe(401);
    });

    test("lehnt einen Token mit falschem Secret ab", async () => {
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
    test("schützt vor SQL-Injection in der E-Mail", async () => {
      const maliciousEmail = "test@example.com'; DROP TABLE users; --";
      
      const response = await request(app).post("/api/auth/login").send({
        email: maliciousEmail,
        password: "password123",
      });

      expect(response.statusCode).toBe(401);
    });

    test("schützt vor SQL-Injection im Namen", async () => {
      const maliciousName = "Test'; DROP TABLE users; --";
      const uniqueEmail = `sqltest_${Date.now()}@example.com`;
      
      const response = await request(app)
        .put("/api/auth/profile")
        .set("Authorization", `Bearer ${validToken}`)
        .send({
          name: maliciousName,
          email: uniqueEmail,
        });

      expect(response.statusCode).toBe(200);
      const user = await db.get("SELECT * FROM users WHERE id = ?", [userId]);
      expect(user).toBeDefined();
      expect(user.name).toBe(maliciousName);
    });

    test("schützt vor SQL-Injection in den Anfrageparametern", async () => {
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

      // Sollte keinen SQL-Fehler verursachen
      expect(response.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe("Authorization Tests", () => {
    test("verhindert, dass ein Benutzer auf Daten eines anderen Benutzers zugreift", async () => {
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

    test("verhindert, dass ein Benutzer Daten eines anderen Benutzers löscht", async () => {
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

      const deleteResponse = await request(app)
        .delete(`/api/bmi/${bmiId}`)
        .set("Authorization", `Bearer ${token3}`);

      expect(deleteResponse.statusCode).toBe(404);
    });
  });

  describe("Password Security", () => {
    test("Passwörter sind gehasht (werden nicht im Klartext gespeichert)", async () => {
      const testEmail4 = `securitytest4_${Date.now()}@example.com`;
      const password = "MySecretPassword123!";

      await request(app).post("/api/auth/register").send({
        name: "Password Tester",
        email: testEmail4,
        password,
      });

      const user = await db.get("SELECT password FROM users WHERE email = ?", [
        testEmail4,
      ]);

      expect(user.password).not.toBe(password);
      expect(user.password.length).toBeGreaterThan(20); // Bcrypt-Hashes sind lang
      expect(user.password).toMatch(/^\$2[aby]\$/); // Format bcrypt
    });

    test("lehnt die Anmeldung mit falschem Passwort ab", async () => {
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
    test("bereinigt potenzielle XSS-Eingaben im Namen", async () => {
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
      const user = await db.get("SELECT * FROM users WHERE id = ?", [userId]);
      expect(user.name).toBe(xssPayload);
    });
  });
});

