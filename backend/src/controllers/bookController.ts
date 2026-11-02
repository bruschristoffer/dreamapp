import type { Response } from "express";
import { pool } from "../config/db.js";
import type { AuthRequest } from "../middleware/auth.js";

export async function getBooks(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  try {
    const result = await pool.query(
      "SELECT * FROM books WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Fel vid hämtning av böcker:", error);
    res.status(500).json({ message: "Kunde inte hämta böcker" });
  }
}

export async function createBook(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  const { title, author } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Boktitel krävs" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO books (user_id, title, author) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, author || ""],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid skapande av bok:", error);
    res.status(500).json({ message: "Kunde inte spara boken" });
  }
}

export async function updateBook(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  const { id } = req.params;
  const { is_read, title, author } = req.body;

  try {
    const result = await pool.query(
      `UPDATE books 
       SET is_read = COALESCE($1, is_read),
           title = COALESCE($2, title),
           author = COALESCE($3, author)
       WHERE id = $4 AND user_id = $5 
       RETURNING *`,
      [is_read, title, author, id, userId],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Boken hittades inte eller tillhör inte dig" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Fel vid uppdatering av bok:", error);
    res.status(500).json({ message: "Kunde inte uppdatera boken" });
  }
}

export async function deleteBook(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, userId],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Boken hittades inte eller tillhör inte dig" });
    }

    res.status(200).json({ message: "Boken har raderats" });
  } catch (error) {
    console.error("Fel vid radering av bok:", error);
    res.status(500).json({ message: "Kunde inte radera boken" });
  }
}
