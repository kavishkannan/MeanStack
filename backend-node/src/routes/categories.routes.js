import express from "express";
import {
    listCategories,
    createCategory
} from "../controllers/categories.controller.js";

const router = express.Router();

router.get("/", listCategories);
router.post("/", createCategory);

export default router;
