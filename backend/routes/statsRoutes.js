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

  // POST — Programme starten (sauvegarder un programme pour l'utilisateur)
  router.post("/programs/start", requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      const { programType, programName, description, duration } = req.body;

      if (!programType || !programName) {
        return res.status(400).json({ error: "Programmtyp und Programmname sind erforderlich." });
      }

      // Calculer la date de fin basée sur la durée
      const startDate = new Date().toISOString().split('T')[0];
      let endDate = null;
      
      if (duration) {
        const weeks = parseInt(duration.match(/\d+/)?.[0] || 0);
        if (weeks > 0) {
          const end = new Date();
          end.setDate(end.getDate() + (weeks * 7));
          endDate = end.toISOString().split('T')[0];
        }
      }

      console.log(`[Programs] Starting program for user_id: ${userId}`, {
        programType,
        programName,
        startDate,
        endDate
      });

      const result = await db.run(
        `INSERT INTO user_programs (user_id, program_type, program_name, description, start_date, end_date, status)
         VALUES (?, ?, ?, ?, ?, ?, 'active')`,
        [userId, programType, programName, description || null, startDate, endDate]
      );

      console.log(`[Programs] Program started with id: ${result.lastID} for user ${userId}`);

      res.json({
        id: result.lastID,
        message: "Programm erfolgreich gestartet!",
        program: {
          id: result.lastID,
          programType,
          programName,
          description,
          startDate,
          endDate,
          status: 'active'
        }
      });
    } catch (error) {
      console.error("Fehler beim Starten des Programms:", error);
      res.status(500).json({ error: "Serverfehler", details: error.message });
    }
  });

  // GET — Programme de l'utilisateur
  router.get("/programs", requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      
      const programs = await db.all(
        `SELECT * FROM user_programs 
         WHERE user_id = ? 
         ORDER BY created_at DESC`,
        [userId]
      );

      res.json(programs);
    } catch (error) {
      console.error("Fehler beim Abrufen der Programme:", error);
      res.status(500).json({ error: "Serverfehler" });
    }
  });

  return router;
};

