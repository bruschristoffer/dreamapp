import { pool } from "./db.js";

export async function initDatabase() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createBooksTable = `
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255),
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createUsersTable);
    await pool.query(createBooksTable);
    console.log("Databasens tabeller (users, books) är initierade och redo!");
  } catch (error) {
    console.error("Kunde inte initiera databastabellerna:", error);
  }
}
