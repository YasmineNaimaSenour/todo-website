import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IResponse } from "../interfaces/response.interface";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            error: {
                message: "Authentication required",
                details: "No token provided"
            },
            data: {
                redirect: "/login"
            }
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        // Clear invalid token from cookies
        res.clearCookie('token');
        return res.status(401).json({
            success: false,
            error: {
                message: "Invalid or expired token",
                details: error
            },
            data: {
                redirect: "/login"
            }
        });
    }
}; 