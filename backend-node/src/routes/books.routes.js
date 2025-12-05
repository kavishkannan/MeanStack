import express from "express";
import {
    listBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from "../controllers/books.controller.js";

const router = express.Router();

router.get("/", listBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
