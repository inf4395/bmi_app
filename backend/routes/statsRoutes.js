import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

export default (db) => {
  // GET — Statistiques résumées
  router.get("/stats/summary", requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(`[Stats] Fetching summary for user_id: ${userId}`);

      // Récupérer toutes les mesures de l'utilisateur
      const records = await db.all(
        `SELECT * FROM bmi_records 
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
      );

      console.log(`[Stats] Found ${records.length} records for user ${userId}`);

      if (records.length === 0) {
        console.log(`[Stats] No records found for user ${userId}`);
        return res.json({
          totalRecords: 0,
          averageBMI: null,
          latestBMI: null,
          latestWeight: null,
          weightChange: null,
        });
      }

      // Calculer la moyenne du BMI
      const totalBMI = records.reduce((sum, record) => sum + parseFloat(record.bmi), 0);
      const averageBMI = totalBMI / records.length;

      // Dernière mesure (la plus récente est records[0] car tri DESC)
      const latest = records[0];
      // Plus ancienne mesure (la plus ancienne est à la fin car tri DESC)
      const oldest = records[records.length - 1];

      // Changement de poids (poids actuel - poids initial)
      const weightChange =
        records.length > 1
          ? parseFloat(latest.weight) - parseFloat(oldest.weight)
          : null;

      const result = {
        totalRecords: records.length,
        averageBMI: parseFloat(averageBMI.toFixed(2)),
        latestBMI: parseFloat(latest.bmi),
        latestWeight: parseFloat(latest.weight),
        weightChange: weightChange ? parseFloat(weightChange.toFixed(2)) : null,
        latestStatus: latest.status,
      };

      console.log(`[Stats] Summary result:`, result);
      res.json(result);
    } catch (error) {
      console.error("Fehler beim Abrufen der Statistiken:", error);
      res.status(500).json({ error: "Serverfehler", details: error.message });
    }
  });

  // GET — Statistiques détaillées pour graphiques
  router.get("/stats/detailed", requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      const { startDate, endDate } = req.query;

      let query = `SELECT * FROM bmi_records WHERE user_id = ?`;
      const params = [userId];

      if (startDate) {
        query += ` AND created_at >= ?`;
        params.push(startDate);
      }

      if (endDate) {
        query += ` AND created_at <= ?`;
        params.push(endDate);
      }

      query += ` ORDER BY created_at ASC`;

      const records = await db.all(query, params);

      res.json(records);
    } catch (error) {
      console.error("Fehler beim Abrufen der detaillierten Statistiken:", error);
      res.status(500).json({ error: "Serverfehler" });
    }
  });

  return router;
};

