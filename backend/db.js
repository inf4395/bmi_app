import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const initDB = async (filename = "./bmi.db") => {
  const db = await open({
    filename,
    driver: sqlite3.Database,
  });
  
  // Configurer SQLite pour gérer mieux la concurrence
  await db.exec("PRAGMA busy_timeout = 5000;"); // Attendre jusqu'à 5 secondes si la DB est verrouillée
  
  // Le mode WAL ne fonctionne pas avec les bases de données en mémoire
  if (filename !== ":memory:") {
    await db.exec("PRAGMA journal_mode = WAL;"); // Mode WAL pour de meilleures performances en lecture
  }

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      gender TEXT,
      birth_date DATE,
      height REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Ajouter les nouvelles colonnes si elles n'existent pas
  try {
    const userColumns = await db.all(`PRAGMA table_info(users);`);
    const columnNames = userColumns.map((col) => col.name);
    
    if (!columnNames.includes("gender")) {
      await db.exec(`ALTER TABLE users ADD COLUMN gender TEXT;`);
    }
    if (!columnNames.includes("birth_date")) {
      await db.exec(`ALTER TABLE users ADD COLUMN birth_date DATE;`);
    }
    if (!columnNames.includes("height")) {
      await db.exec(`ALTER TABLE users ADD COLUMN height REAL;`);
    }
  } catch (error) {
    console.warn("Konnte User-Spalten nicht hinzufügen:", error.message);
  }

  await db.exec(`
    CREATE TABLE IF NOT EXISTS bmi_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      age INTEGER,
      height REAL,
      weight REAL,
      bmi REAL,
      status TEXT,
      user_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  try {
    const columns = await db.all(`PRAGMA table_info(bmi_records);`);
    const columnNames = columns.map((col) => col.name);
    
    if (!columnNames.includes("user_id")) {
      await db.exec(`ALTER TABLE bmi_records ADD COLUMN user_id INTEGER;`);
    }
  } catch (error) {
    console.warn("Konnte user_id Spalte nicht hinzufügen:", error.message);
  }

  // Table pour les objectifs de poids
  await db.exec(`
    CREATE TABLE IF NOT EXISTS weight_goals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      target_weight REAL NOT NULL,
      current_weight REAL NOT NULL,
      target_date DATE,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Table pour les programmes
  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_programs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      program_type TEXT NOT NULL,
      program_name TEXT NOT NULL,
      description TEXT,
      start_date DATE,
      end_date DATE,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  return db;
};
