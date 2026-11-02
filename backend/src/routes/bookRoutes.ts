import { Router } from "express";
import {
    createBook,
    deleteBook,
    getBooks,
    updateBook,
} from "../controllers/bookController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// Alla bokrutter kräver inloggning via token[cite: 1]
router.use(authenticateToken);

router.get("/", getBooks);
router.post("/", createBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
