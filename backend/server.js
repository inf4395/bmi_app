import express from "express";
import cors from "cors";
import { initDB } from "./db.js";
import bmiRoutes from "./routes/bmiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Route de test (accessible avant l'initialisation de la DB)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Route info pour /api
app.get("/api", (req, res) => {
  res.json({ 
    message: "BMI App API", 
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      bmi: "POST /api/bmi"
    }
  });
});

// Démarrer le serveur immédiatement
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend läuft auf Port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Initialiser la base de données et enregistrer les routes
const startServer = async () => {
  try {
    const db = await initDB();
    console.log("Database initialized successfully");
    
    // Enregistrer les routes
    app.use("/api", authRoutes(db));
    console.log("Auth routes registered: /api/auth/register, /api/auth/login, /api/auth/me");
    
    app.use("/api", bmiRoutes(db));
    console.log("BMI routes registered");
    
    app.use("/api", statsRoutes(db));
    console.log("Stats routes registered: /api/stats/summary, /api/stats/detailed");
    
    app.use("/api", testRoutes(db));
    console.log("Test routes registered: /api/test/db");
    
    console.log(`Register: POST http://localhost:${PORT}/api/auth/register`);
    console.log(`Login: POST http://localhost:${PORT}/api/auth/login`);
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
