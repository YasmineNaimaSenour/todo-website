import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { setupMiddleware, errorHandler } from "./middlewares/server.middleware";

const app = express();

// Setup middleware
setupMiddleware(app);

// Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });
