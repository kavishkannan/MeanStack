import { pool } from "../config/db.js";

export async function listCategories() {
    const [rows] = await pool.query("SELECT * FROM categories ORDER BY name");
    return rows;
}

export async function createCategory(data) {
    const { name } = data;
    await pool.query("INSERT INTO categories (name) VALUES (?)", [name]);
    return { message: "Category added successfully" };
}
