import express from "express";
import cors from "cors";

import bookRoutes from "./routes/books.routes.js";
import authorRoutes from "./routes/authors.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import userRoutes from "./routes/users.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

// after all routes

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Route mounting
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Library API Running ✅");
});

export default app;
