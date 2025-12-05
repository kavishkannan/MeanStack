import { pool } from "../config/db.js";

export async function createUser(data) {
    const { username, email, password_hash, role } = data;

    await pool.query(
        "INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)",
        [username, email, password_hash, role]
    );

    return { message: "User registered successfully" };
}

export async function findByUsername(username) {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );
    return rows[0];
}

export async function findByEmail(email) {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return rows[0];
}
