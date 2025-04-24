import express from "express";
import todoRoutes from "./routes/todo.routes";
import userRoutes from "./routes/user.routes";
import { AppDataSource } from "./data-source";
import { setupMiddleware } from "./middlewares/server.middleware";

const app = express();

// Setup middleware
setupMiddleware(app);

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", userRoutes);

// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        
        // Start server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("Error connecting to database:", error));
