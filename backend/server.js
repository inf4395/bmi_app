import express from "express";
import cors from "cors";
import { initDB } from "./db.js";
import bmiRoutes from "./routes/bmiRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  const db = await initDB();
  app.use("/api", bmiRoutes(db));

  app.listen(PORT, () => {
    console.log(`✅ Backend läuft auf Port ${PORT}`);
  });
};

startServer();
