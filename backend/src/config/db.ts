import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : undefined,
});

pool.on("connect", () => {
  console.log(
    "Ansluten till postgreSQL (NEOOOON BRAM, aws är blä, fast det är aws nu kinda",
  );
});

pool.on("error", (err) => {
  console.error("Oväntat databasfel", err);
  process.exit(-1);
});
