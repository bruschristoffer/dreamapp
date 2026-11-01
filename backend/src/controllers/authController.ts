import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Användarnamn och lösenord krävs" });
  }

  try {
    // finns user?
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username],
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Användarnamnet är redan upptaget" });
    }

    // hasha lösenordet med bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Spara användaren
    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at",
      [username, passwordHash],
    );

    res.status(201).json({
      message: "Användare skapad!",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Fel vid registrering:", error);
    res.status(500).json({ message: "Kunde inte registrera användare" });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Användarnamn och lösenord krävs" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Felaktigt användarnamn eller lösenord" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Felaktigt användarnamn eller lösenord" });
    }
    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({ id: user.id, username: user.username }, secret, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Inloggningen lyckades",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    res.status(500).json({ message: "Kunde inte logga in" });
  }
}
