import { Router } from "express";
import userRoutes from "./user.routes";
import todoRoutes from "./todo.routes";

const router = Router();

// Mount routes
router.use("/users", userRoutes);
router.use("/todos", todoRoutes);

export default router; 