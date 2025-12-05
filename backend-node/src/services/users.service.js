import * as userRepo from "../repositories/users.repo.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser(data) {
    const { username, email, password, role } = data;

    if (!username || !email || !password)
        throw new Error("Username, email and password are required");

    // Check duplicates
    const existing = await userRepo.findByUsername(username);
    if (existing) throw new Error("Username already exists");

    const existingEmail = await userRepo.findByEmail(email);
    if (existingEmail) throw new Error("Email already exists");

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // default role = 'user'
    return userRepo.createUser({
        username,
        email,
        password_hash,
        role: role || "viewer",
    });
}

export async function loginUser(data) {
    const { username, password } = data;

    if (!username || !password)
        throw new Error("Username and password required");

    const user = await userRepo.findByUsername(username);

    if (!user) throw new Error("Invalid username or password");

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error("Invalid username or password");

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    };
}
