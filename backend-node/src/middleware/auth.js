import jwt from "jsonwebtoken";

export function auth(req, res, next) {
    const header = req.headers["authorization"];

    if (!header || !header.startsWith("Bearer "))
        return res.status(401).json({ success: false, message: "Unauthorized" });

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user info
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}
