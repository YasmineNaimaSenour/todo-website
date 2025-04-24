import express from "express";
import cors from "cors"; // Cross-Origin Resource Sharing: allows to make requests to the server from different origins (ports, domains ...)
import cookieParser from "cookie-parser";

export const setupMiddleware = (app: express.Application) => {
    // CORS configuration
    app.use(cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5000",
        credentials: true // allows to send cookies to the server
    }));

    // Parse JSON bodies and cookies
    app.use(express.json()); 
    app.use(cookieParser());
}; 