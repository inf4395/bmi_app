import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "bmi-app-secret";

export const createToken = (user) => {
  // S'assurer que l'ID est un nombre
  const userId = parseInt(user.id);
  const payload = { id: userId, email: user.email, name: user.name };
  console.log(`[Token] Creating token with payload:`, payload);
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "2h",
  });
};

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ error: "Authentifizierung erforderlich." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log(`[Auth] Token verified, user payload:`, payload);
    req.user = payload;
    next();
  } catch (error) {
    console.error(`[Auth] Token verification failed:`, error.message);
    return res.status(401).json({ error: "Ungültiger oder abgelaufener Token." });
  }
};

