import cors from "cors";
import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import { initDatabase } from "./config/initDb.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/books", bookRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Backend körs!" });
});

app.listen(PORT, async () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
  await initDatabase();
});

export default app;
