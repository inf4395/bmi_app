import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

export default (db) => {
  // Route de test pour vérifier la base de données
  router.get("/test/db", requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Compter les enregistrements de l'utilisateur
      const count = await db.get(
        `SELECT COUNT(*) as count FROM bmi_records WHERE user_id = ?`,
        [userId]
      );
      
      // Récupérer tous les enregistrements
      const allRecords = await db.all(
        `SELECT id, name, email, weight, bmi, status, user_id, created_at 
         FROM bmi_records 
         WHERE user_id = ? 
         ORDER BY created_at DESC`,
        [userId]
      );
      
      // Vérifier les utilisateurs
      const user = await db.get(`SELECT id, name, email FROM users WHERE id = ?`, [userId]);
      
      res.json({
        user,
        recordCount: count.count,
        records: allRecords,
        message: "Database test successful",
      });
    } catch (error) {
      console.error("Database test error:", error);
      res.status(500).json({ error: "Database test failed", details: error.message });
    }
  });

  return router;
};

