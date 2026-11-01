import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Ansluten till postgreSQL");
});

pool.on("error", (err) => {
  console.error("Oväntat databasfel", err);
  process.exit(-1);
});
