import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

export default (db) => {
  // POST — calculer et enregistrer un BMI
  router.post("/bmi", requireAuth, async (req, res) => {
    try {
      const { name, email, age, height, weight } = req.body;

      if (!name || !email || !height || !weight) {
        return res.status(400).json({ error: "Fehlende Eingabedaten." });
      }

      // Validation des valeurs numériques
      const heightNum = parseFloat(height);
      const weightNum = parseFloat(weight);

      if (isNaN(heightNum) || heightNum <= 0) {
        return res.status(400).json({ error: "Die Höhe muss eine positive Zahl sein." });
      }

      if (isNaN(weightNum) || weightNum <= 0) {
        return res.status(400).json({ error: "Das Gewicht muss eine positive Zahl sein." });
      }

      // Limites réalistes
      if (heightNum < 50 || heightNum > 300) {
        return res.status(400).json({ error: "Die Höhe muss zwischen 50 und 300 cm liegen." });
      }

      if (weightNum < 10 || weightNum > 500) {
        return res.status(400).json({ error: "Das Gewicht muss zwischen 10 und 500 kg liegen." });
      }

      const bmi = weightNum / ((heightNum / 100) * (heightNum / 100));

      let status = "";
      if (bmi < 18.5) status = "Untergewicht";
      else if (bmi < 25) status = "Normalgewicht";
      else if (bmi < 30) status = "Übergewicht";
      else status = "Adipositas";

      const userId = req.user.id;
      console.log(`[BMI] Creating record for user_id: ${userId}`, { name, email, age, height: heightNum, weight: weightNum, bmi, status });
      
      const result = await db.run(
        `INSERT INTO bmi_records (name, email, age, height, weight, bmi, status, user_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, age || null, heightNum, weightNum, bmi, status, userId]
      );

      console.log(`[BMI] Record created with id: ${result.lastID} for user ${userId}`);

      res.json({
        id: result.lastID,
        name,
        email,
        bmi: bmi.toFixed(1),
        status,
      });
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      res.status(500).json({ error: "Serverfehler" });
    }
  });

  //  GET — récupérer l'historique des calculs BMI
  router.get("/history", requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      const limit = parseInt(req.query.limit) || 10;
      console.log(`[History] Fetching history for user_id: ${userId}, limit: ${limit}`);
      
      const results = await db.all(
        `SELECT * FROM bmi_records
         WHERE user_id = ?
         ORDER BY created_at DESC
         LIMIT ?`,
        [userId, limit]
      );
      
      console.log(`[History] Found ${results.length} records for user ${userId}`);
      res.json(results);
    } catch (error) {
      console.error("Fehler beim Abrufen der Historie:", error);
      res.status(500).json({ error: "Serverfehler", details: error.message });
    }
  });

  //  PUT — mettre à jour un calcul existant
  router.put("/bmi/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, height, weight } = req.body;

      if (!height || !weight) {
        return res.status(400).json({ error: "Höhe und Gewicht sind erforderlich." });
      }

      // Validation des valeurs numériques
      const heightNum = parseFloat(height);
      const weightNum = parseFloat(weight);

      if (isNaN(heightNum) || heightNum <= 0) {
        return res.status(400).json({ error: "Die Höhe muss eine positive Zahl sein." });
      }

      if (isNaN(weightNum) || weightNum <= 0) {
        return res.status(400).json({ error: "Das Gewicht muss eine positive Zahl sein." });
      }

      // Limites réalistes
      if (heightNum < 50 || heightNum > 300) {
        return res.status(400).json({ error: "Die Höhe muss zwischen 50 und 300 cm liegen." });
      }

      if (weightNum < 10 || weightNum > 500) {
        return res.status(400).json({ error: "Das Gewicht muss zwischen 10 und 500 kg liegen." });
      }

      const bmi = weightNum / ((heightNum / 100) * (heightNum / 100));
      let status = "";
      if (bmi < 18.5) status = "Untergewicht";
      else if (bmi < 25) status = "Normalgewicht";
      else if (bmi < 30) status = "Übergewicht";
      else status = "Adipositas";

      const result = await db.run(
        `UPDATE bmi_records
         SET name = ?, email = ?, height = ?, weight = ?, bmi = ?, status = ?
         WHERE id = ? AND user_id = ?`,
        [name, email, heightNum, weightNum, bmi, status, id, req.user.id]
      );

      if (result.changes === 0) {
        return res.status(404).json({ error: "Datensatz nicht gefunden." });
      }

      res.json({ id, name, email, bmi: bmi.toFixed(1), status });
    } catch (error) {
      console.error("Fehler beim Aktualisieren:", error);
      res.status(500).json({ error: "Serverfehler" });
    }
  });

  //  DELETE — supprimer un calcul
  router.delete("/bmi/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;

      const result = await db.run(`DELETE FROM bmi_records WHERE id = ? AND user_id = ?`, [
        id,
        req.user.id,
      ]);
      if (result.changes === 0) {
        return res.status(404).json({ error: "Datensatz nicht gefunden." });
      }

      res.json({ message: `Datensatz ${id} erfolgreich gelöscht.` });
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      res.status(500).json({ error: "Serverfehler" });
    }
  });

  return router;
};
