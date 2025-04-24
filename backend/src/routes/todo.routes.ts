import { Router } from "express";
import { 
    getAllTodos, 
    getTodoById, 
    createTodo, 
    updateTodo, 
    deleteTodo 
} from "../controllers/todo.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { validateTodoCreation, validateTodoUpdate, validate } from "../middlewares/validation.middleware";

const router = Router();

// All todo routes require authentication
router.use(authenticateToken);

// Protected routes
router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", validateTodoCreation, validate, createTodo);
router.put("/:id", validateTodoUpdate, validate, updateTodo);
router.delete("/:id", deleteTodo);

export default router;