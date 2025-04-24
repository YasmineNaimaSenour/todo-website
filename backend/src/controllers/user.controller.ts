import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { IUser, ICreateUser, IUserResponse, ILoginUser, IAuthResponse } from "../interfaces/user.interface";
import { IResponse } from "../interfaces/response.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<Response<IResponse<IUserResponse>>> => {
    try {
        const userData: ICreateUser = req.body;
        const repository = AppDataSource.getRepository(User);

        // Check if user already exists
        const existingUser = await repository.findOne({
            where: [
                { username: userData.username },
                { email: userData.email }
            ] // checks if username OR email already exists
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: {
                    message: "Username or email already exists"
                }
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the salt
        
        const user = repository.create({
            ...userData,
            password: hashedPassword
        });
        
        const savedUser = await repository.save(user);
        const { password, ...userResponse } = savedUser;

        return res.status(201).json({
            success: true,
            data: userResponse
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Error registering user",
                details: error
            }
        });
    }
};

export const login = async (req: Request, res: Response): Promise<Response<IResponse<IAuthResponse>>> => {
    try {
        const loginData: ILoginUser = req.body;
        const repository = AppDataSource.getRepository(User);

        const user = await repository.findOne({ where: { email: loginData.email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "Invalid email"
                }
            });
        }

        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "Wrong password"
                }
            });
        }

        const token = jwt.sign(
            { userId: user.userId, email: user.email },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "1h" }
        );

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour in milliseconds
        });

        const { password, ...userResponse } = user;
        return res.json({
            success: true,
            data: {
                token,
                user: userResponse
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Error logging in",
                details: error
            }
        });
    }
};

export const logout = async (req: Request, res: Response): Promise<Response<IResponse>> => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.json({
            success: true,
            data: {
                message: "Logged out successfully",
                redirect: "/login"
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Error logging out",
                details: error
            }
        });
    }
};
