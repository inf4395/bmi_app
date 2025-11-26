import express from "express";
import bcrypt from "bcryptjs";
import { createToken, requireAuth } from "../middleware/authMiddleware.js";

export default (db) => {
  const router = express.Router();

  router.post("/auth/register", async (req, res) => {
    console.log("POST /auth/register - Request received:", req.body);
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, E-Mail und Passwort sind erforderlich." });
      }

      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
      }

      // Validation du mot de passe
      if (password.length < 6) {
        return res.status(400).json({ error: "Das Passwort muss mindestens 6 Zeichen lang sein." });
      }

      const existing = await db.get(`SELECT id FROM users WHERE email = ?`, [email.toLowerCase()]);
      if (existing) {
        return res.status(409).json({ error: "Ein Konto mit dieser E-Mail existiert bereits." });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const result = await db.run(
        `INSERT INTO users (name, email, password)
         VALUES (?, ?, ?)`,
        [name, email.toLowerCase(), passwordHash]
      );

      const user = { id: parseInt(result.lastID), name, email: email.toLowerCase() };
      console.log(`[Register] Created user with id: ${user.id} (type: ${typeof user.id})`);
      const token = createToken(user);

      res.status(201).json({ user, token });
    } catch (error) {
      console.error("Registrierungsfehler:", error);
      res.status(500).json({ 
        error: "Serverfehler bei der Registrierung.",
        details: error.message 
      });
    }
  });

  router.post("/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "E-Mail und Passwort sind erforderlich." });
      }

      const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email.toLowerCase()]);
      if (!user) {
        return res.status(401).json({ error: "Ungültige Zugangsdaten." });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Ungültige Zugangsdaten." });
      }

      const userForToken = { id: parseInt(user.id), name: user.name, email: user.email };
      console.log(`[Login] User id: ${userForToken.id} (type: ${typeof userForToken.id})`);
      const token = createToken(userForToken);
      res.json({ user: userForToken, token });
    } catch (error) {
      console.error("Loginfehler:", error);
      res.status(500).json({ error: "Serverfehler beim Login." });
    }
  });

  router.get("/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await db.get(
        `SELECT id, name, email, gender, birth_date, height FROM users WHERE id = ?`,
        [req.user.id]
      );
      if (!user) {
        return res.status(404).json({ error: "Benutzer nicht gefunden." });
      }
      res.json({ user });
    } catch (error) {
      console.error("Fehler beim Laden des Nutzers:", error);
      res.status(500).json({ error: "Serverfehler." });
    }
  });

  router.put("/auth/profile", requireAuth, async (req, res) => {
    try {
      const { name, email, gender, birthDate, height } = req.body;
      const userId = parseInt(req.user.id); // S'assurer que c'est un nombre

      console.log(`[Profile] Updating profile for user_id: ${userId} (type: ${typeof userId})`);
      console.log(`[Profile] Request user object:`, req.user);
      console.log(`[Profile] Request body:`, { name, email, gender, birthDate, height });

      if (!userId || isNaN(userId)) {
        console.error(`[Profile] Invalid user_id: ${req.user.id}`);
        return res.status(400).json({ error: "Ungültige Benutzer-ID." });
      }

      // Vérifier d'abord que l'utilisateur existe
      const existingUser = await db.get(`SELECT id, name, email FROM users WHERE id = ?`, [userId]);
      
      if (!existingUser) {
        console.error(`[Profile] User not found in database: user_id=${userId}`);
        return res.status(404).json({ error: "Benutzer nicht gefunden." });
      }

      console.log(`[Profile] Existing user found:`, existingUser);

      // Validation
      if (!name || !email) {
        return res.status(400).json({ error: "Name und E-Mail sind erforderlich." });
      }

      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
      }

      // Convertir height en nombre ou null
      let heightValue = height ? parseFloat(height) : null;
      
      // Validation de la hauteur si fournie
      if (heightValue !== null && !isNaN(heightValue)) {
        if (heightValue < 0) {
          return res.status(400).json({ error: "Die Höhe muss eine positive Zahl sein." });
        }
        if (heightValue > 0 && (heightValue < 50 || heightValue > 300)) {
          return res.status(400).json({ error: "Die Höhe muss zwischen 50 und 300 cm liegen." });
        }
      }
      
      // Vérifier que birthDate est valide si fourni
      let birthDateValue = birthDate || null;
      if (birthDateValue && typeof birthDateValue === 'string' && birthDateValue.trim() === "") {
        birthDateValue = null;
      }

      console.log(`[Profile] Values to update:`, {
        name,
        email,
        gender: gender || null,
        birthDate: birthDateValue,
        height: heightValue,
        userId
      });

      const result = await db.run(
        `UPDATE users 
         SET name = ?, email = ?, gender = ?, birth_date = ?, height = ?
         WHERE id = ?`,
        [name, email, gender || null, birthDateValue, heightValue, userId]
      );

      console.log(`[Profile] Update result:`, result);
      console.log(`[Profile] Changes: ${result.changes}`);

      if (result.changes === 0) {
        console.warn(`[Profile] No rows updated for user_id: ${userId}`);
        // Vérifier à nouveau si l'utilisateur existe
        const checkUser = await db.get(`SELECT id FROM users WHERE id = ?`, [userId]);
        if (!checkUser) {
          return res.status(404).json({ error: "Benutzer nicht gefunden." });
        }
        return res.status(400).json({ error: "Keine Änderungen vorgenommen. Möglicherweise sind die Daten identisch." });
      }

      const updatedUser = await db.get(
        `SELECT id, name, email, gender, birth_date, height FROM users WHERE id = ?`,
        [userId]
      );

      console.log(`[Profile] Updated user:`, updatedUser);

      res.json({ user: updatedUser, message: "Profil erfolgreich aktualisiert." });
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Profils:", error);
      res.status(500).json({ 
        error: "Serverfehler beim Aktualisieren des Profils.",
        details: error.message 
      });
    }
  });

  return router;
};

