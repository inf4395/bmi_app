import request from "supertest";
import express from "express";
import cors from "cors";
import { initDB } from "../db.js";
import bmiRoutes from "../routes/bmiRoutes.js";
import authRoutes from "../routes/authRoutes.js";
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

  const testEmail = `testuser_${Date.now()}@example.com`;
  const password = "Secret123!";

  await request(app).post("/api/auth/register").send({
    name: "Tester",
    email: testEmail,
    password,
  });

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: testEmail,
    password,
  });

  token = loginResponse.body.token;
});

afterAll(async () => {
  await db.close();
});

// Test 1 : POST /api/bmi
test("POST /api/bmi erstellt neuen Datensatz", async () => {
  const response = await request(app)
    .post("/api/bmi")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test User",
      email: "test@example.com",
      age: 25,
      height: 180,
      weight: 75,
    });

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("bmi");
  expect(response.body).toHaveProperty("status");
  expect(response.body.name).toBe("Test User");
});

// Test 2 : GET /api/history
test("GET /api/history gibt Liste der letzten Berechnungen zurück", async () => {
  const response = await request(app).get("/api/history").set("Authorization", `Bearer ${token}`);
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

//  Test 3 : PUT /api/bmi/:id
test("PUT /api/bmi/:id aktualisiert einen Datensatz", async () => {
  // d’abord on crée un enregistrement
  const create = await request(app)
    .post("/api/bmi")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Update Test",
      email: "update@example.com",
      height: 170,
      weight: 70,
    });

  const id = create.body.id;
  const response = await request(app)
    .put(`/api/bmi/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Updated Name",
      email: "updated@example.com",
      height: 175,
      weight: 72,
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe("Updated Name");
});

// Test 4 : DELETE /api/bmi/:id
test("DELETE /api/bmi/:id löscht einen Datensatz", async () => {
  // Crée d'abord un nouvel enregistrement à supprimer
  const create = await request(app)
    .post("/api/bmi")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Delete Test",
      email: "delete@example.com",
      height: 180,
      weight: 80,
    });

  const id = create.body.id;
  const response = await request(app).delete(`/api/bmi/${id}`).set("Authorization", `Bearer ${token}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toMatch(/erfolgreich gelöscht/i);
});
