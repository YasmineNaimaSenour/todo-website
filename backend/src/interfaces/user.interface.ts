export interface IUser {
    userId: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateUser {
    username: string;
    email: string;
    password: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IUpdateUser {
    username?: string;
    email?: string;
    password?: string;
}

export interface IUserResponse {
    userId: number;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAuthResponse {
    token: string;
    user: IUserResponse;
}
