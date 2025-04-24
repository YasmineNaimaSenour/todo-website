import { DataSource } from "typeorm";
import { Todo } from "./entities/Todo";
import { User } from "./entities/User";
import * as dotenv from "dotenv";

dotenv.config(); // load environment variables from .env file

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // we're gonna use migrations instead (do things manually)
    logging: false,
    entities: [Todo, User], // aka tables 
    migrations: ["./src/migrations/*.ts"],
});