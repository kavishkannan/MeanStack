import express from "express";
import {
    listAuthors,
    createAuthor
} from "../controllers/authors.controller.js";

const router = express.Router();

router.get("/", listAuthors);
router.post("/", createAuthor);

export default router;
