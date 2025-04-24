import { TodoStatus } from '../entities/Todo';

export interface ITodo {
    todoId: number;
    title: string;
    status: TodoStatus;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}

export interface ITodoWithUser extends ITodo {
    user: {
        userId: number;
        username: string;
        email: string;
    };
}

export interface ICreateTodo {
    title: string;
    userId: number;
}

export interface IUpdateTodo {
    title?: string;
    status?: TodoStatus;
}
