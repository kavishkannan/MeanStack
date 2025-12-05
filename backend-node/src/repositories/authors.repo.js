import { pool } from "../config/db.js";

export async function listAuthors() {
    const [rows] = await pool.query("SELECT * FROM authors ORDER BY name");
    return rows;
}

export async function createAuthor(data) {
    const { name } = data;
    await pool.query("INSERT INTO authors (name) VALUES (?)", [name]);
    return { message: "Author added successfully" };
}
