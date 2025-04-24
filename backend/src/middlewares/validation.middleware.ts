import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationError } from "express-validator";
import { IResponse } from "../interfaces/response.interface";
import { TodoStatus } from "../entities/Todo";

// User validation rules
export const validateUserRegistration = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username can only contain letters, numbers, and underscores"),
    
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),
    
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
];

export const validateUserLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),
    
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
];

// Todo validation rules
export const validateTodoCreation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),
    
    body("status")
        .optional()
        .isIn([TodoStatus.PENDING, TodoStatus.COMPLETED])
        .withMessage(`Status must be one of: ${Object.values(TodoStatus).join(', ')}`)
];

export const validateTodoUpdate = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),
    
    body("status")
        .optional()
        .isIn([TodoStatus.PENDING, TodoStatus.COMPLETED])
        .withMessage(`Status must be one of: ${Object.values(TodoStatus).join(', ')}`)
];

// Validation middleware
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: {
                message: "Validation failed",
                details: errors.array().map((err: ValidationError) => ({
                    field: err.type === 'field' ? err.path : err.type,
                    message: err.msg
                }))
            }
        } as IResponse);
    }
    next();
}; 