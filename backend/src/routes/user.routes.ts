import { Router } from "express";
import { register, login, logout } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { validateUserRegistration, validateUserLogin, validate } from "../middlewares/validation.middleware";

const router = Router();

// User routes
router.post("/register", validateUserRegistration, validate, register);
router.post("/login", validateUserLogin, validate, login);
router.post("/logout", authenticateToken, logout);

export default router;
