import express from "express";
const router = express.Router();

export default (db) => {
  // 🟩 POST — calculer et enregistrer un BMI
  router.post("/bmi", async (req, res) => {
    try {
      const { name, email, age, height, weight } = req.body;

      if (!name || !email || !height || !weight) {
        return res.status(400).json({ error: "Fehlende Eingabedaten." });
      }

      const bmi = weight / ((height / 100) * (height / 100));

      let status = "";
      if (bmi < 18.5) status = "Untergewicht";
      else if (bmi < 25) status = "Normalgewicht";
      else if (bmi < 30) status = "Übergewicht";
      else status = "Adipositas";

      const result = await db.run(
        `INSERT INTO bmi_records (name, email, age, height, weight, bmi, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, email, age || null, height, weight, bmi, status]
      );

      res.json({ id: result.lastID, name, email, bmi: bmi.toFixed(1), status });
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      res.status(500).json({ error: "Serverfehler" });
    }
  });

  // 🟨 GET — récupérer les 10 derniers calculs BMI
  router.get("/history", async (req, res) => {
    try {
      const results = await db.all(`
        SELECT * FROM bmi_records
        ORDER BY created_at DESC
        LIMIT 10
      `);
      res.json(results);
    } catch (error) {
      console.error("Fehler beim Abrufen der Historie:", error);
      res.status(500).json({ error: "Serverfehler" });
    }
  });

  // 🟦 PUT — mettre à jour un calcul existant
  router.put("/bmi/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, height, weight } = req.body;

      if (!height || !weight) {
        return res.status(400).json({ error: "Höhe und Gewicht sind erforderlich." });
      }

      const bmi = weight / ((height / 100) * (height / 100));
      let status = "";
      if (bmi < 18.5) status = "Untergewicht";
      else if (bmi < 25) status = "Normalgewicht";
      else if (bmi < 30) status = "Übergewicht";
      else status = "Adipositas";

      await db.run(
        `UPDATE bmi_records
         SET name = ?, email = ?, height = ?, weight = ?, bmi = ?, status = ?
         WHERE id = ?`,
        [name, email, height, weight, bmi, status, id]
      );

      res.json({ id, name, email, bmi: bmi.toFixed(1), status });
    } catch (error) {
      console.error("Fehler beim Aktualisieren:", error);
      res.status(500).json({ error: "Serverfehler" });
    }
  });

  // 🟥 DELETE — supprimer un calcul
  router.delete("/bmi/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await db.run(`DELETE FROM bmi_records WHERE id = ?`, [id]);
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
