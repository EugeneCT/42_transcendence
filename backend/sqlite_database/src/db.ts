import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './db.sqlite',
    driver: sqlite3.Database
  });
}

export async function initDb() {
  const db = await openDb();

  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      totalGamesPlayed INTEGER NOT NULL DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Trigger to automatically update modifiedAt on any update
  await db.exec(`
    CREATE TRIGGER IF NOT EXISTS update_modifiedAt
    BEFORE UPDATE ON users
    FOR EACH ROW
    BEGIN
      SET NEW.modifiedAt = CURRENT_TIMESTAMP;
    END;
  `);

  console.log('Database initialized with auto-updating modifiedAt.');
}