import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Todo } from "../entities/Todo";
import { ITodo, ICreateTodo, IUpdateTodo } from "../interfaces/todo.interface";
import { IResponse, IPagination } from "../interfaces/response.interface";

interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        email: string;
    };
}

export const getAllTodos = async (req: AuthenticatedRequest, res: Response): Promise<Response<IResponse<ITodo[]>>> => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "Unauthorized"
                }
            });
        }

        // Get pagination parameters from query
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const skip = (page - 1) * pageSize; // skip is the number of todos to skip

        const repository = AppDataSource.getRepository(Todo);
        
        // Get total count of todos
        const totalItems = await repository.count({
            where: { userId: req.user.userId }
        });

        // Get paginated todos
        const todos = await repository.find({
            where: { userId: req.user.userId },
            order: { createdAt: "DESC" },
            skip,
            take: pageSize
        });

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalItems / pageSize);
        const pagination: IPagination = {
            currentPage: page,
            totalPages,
            pageSize,
            totalItems
        };

        return res.json({
            success: true,
            data: todos,
            pagination
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Error fetching todos",
                details: error
            }
        });
    }
};

export const getTodoById = async (req: AuthenticatedRequest, res: Response): Promise<Response<IResponse<ITodo>>> => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "Unauthorized"
                }
            });
        }

        const { id } = req.params;
        const repository = AppDataSource.getRepository(Todo);
        const todo = await repository.findOne({
            where: { todoId: parseInt(id), userId: req.user.userId }
        });

        if (!todo) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "Todo not found"
                }
            });
        }

        return res.json({
            success: true,
            data: todo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Error fetching todo",
                details: error
            }
        });
    }
};

export const createTodo = async (req: AuthenticatedRequest, res: Response): Promise<Response<IResponse<ITodo>>> => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "Unauthorized"
                }
            });
        }

        const todoData: ICreateTodo = req.body;
        const repository = AppDataSource.getRepository(Todo);
        
        const todo = repository.create({
            ...todoData,
            userId: req.user.userId
        });
        
        const savedTodo = await repository.save(todo);
        
        return res.status(201).json({
            success: true,
            data: savedTodo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Error creating todo",
                details: error
            }
        });
    }
};

export const updateTodo = async (req: AuthenticatedRequest, res: Response): Promise<Response<IResponse<ITodo>>> => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "Unauthorized"
                }
            });
        }

        const { id } = req.params;
        const todoData: IUpdateTodo = req.body;
        const repository = AppDataSource.getRepository(Todo);
        
        const todo = await repository.findOne({
            where: { todoId: parseInt(id), userId: req.user.userId }
        });

        if (!todo) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "Todo not found"
                }
            });
        }

        repository.merge(todo, todoData);
        const updatedTodo = await repository.save(todo);
        
        return res.json({
            success: true,
            data: updatedTodo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Error updating todo",
                details: error
            }
        });
    }
};

export const deleteTodo = async (req: AuthenticatedRequest, res: Response): Promise<Response<IResponse>> => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "Unauthorized"
                }
            });
        }

        const { id } = req.params;
        const repository = AppDataSource.getRepository(Todo);
        
        const todo = await repository.findOne({
            where: { todoId: parseInt(id), userId: req.user.userId }
        });

        if (!todo) {
            return res.status(404).json({
                success: false,
                error: {
                    message: "Todo not found"
                }
            });
        }

        await repository.remove(todo);
        
        return res.json({
            success: true,
            data: {
                message: "Todo deleted successfully"
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Error deleting todo",
                details: error
            }
        });
    }
};