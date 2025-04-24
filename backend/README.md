# TODO Application Backend

A RESTful API backend for a TODO application built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- User authentication (register, login, logout)
- TODO CRUD operations
- JWT-based authentication
- Input validation
- Pagination
- Error handling
- TypeScript support
- PostgreSQL database with TypeORM

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- PostgreSQL (via Docker)

## Setup

### Manual Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file.

3. Start the development server:
```bash
npm run dev
```

### Docker Setup

1. Build and start the containers:
```bash
docker-compose up -d --build
```

2. Stop the containers:
```bash
docker-compose down
```

3. View logs:
```bash
docker-compose logs -f
```

## API Documentation

### Authentication

#### Register
- **URL**: `/api/users/register`
- **Method**: `POST`
- **Body**:
```json
{
    "username": "string (3-20 chars, alphanumeric + underscore)",
    "email": "string (valid email)",
    "password": "string (min 8 chars, requires uppercase, lowercase, number, special char)"
}
```

#### Login
- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body**:
```json
{
    "email": "string",
    "password": "string"
}
```

#### Logout
- **URL**: `/api/users/logout`
- **Method**: `POST`
- **Headers**: `Cookie: token=<jwt_token>`

### TODO Operations

#### Get All TODOs
- **URL**: `/api/todos`
- **Method**: `GET`
- **Headers**: `Cookie: token=<jwt_token>`
- **Query Parameters**:
  - `page`: number (default: 1)
  - `pageSize`: number (default: 10, max: 100)

#### Get TODO by ID
- **URL**: `/api/todos/:id`
- **Method**: `GET`
- **Headers**: `Cookie: token=<jwt_token>`

#### Create TODO
- **URL**: `/api/todos`
- **Method**: `POST`
- **Headers**: `Cookie: token=<jwt_token>`
- **Body**:
```json
{
    "title": "string (3-100 chars)",
    "status": "enum (pending, completed)"
}
```

#### Update TODO
- **URL**: `/api/todos/:id`
- **Method**: `PUT`
- **Headers**: `Cookie: token=<jwt_token>`
- **Body**:
```json
{
    "title": "string (3-100 chars, optional)",
    "status": "enum (pending, completed, optional)"
}
```

#### Delete TODO
- **URL**: `/api/todos/:id`
- **Method**: `DELETE`
- **Headers**: `Cookie: token=<jwt_token>`

## Response Format

All responses follow this format:
```json
{
    "success": boolean,
    "data": any,
    "error": {
        "message": "string",
        "details": any
    },
    "pagination": {
        "currentPage": number,
        "totalPages": number,
        "pageSize": number,
        "totalItems": number
    }
}
```

## Error Codes

- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `404`: Not Found
- `500`: Internal Server Error

## Database Schema

### User
```sql
CREATE TABLE "user" (
    "userId" SERIAL PRIMARY KEY,
    "username" VARCHAR(20) UNIQUE NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Todo
```sql
CREATE TABLE "todo" (
    "todoId" SERIAL PRIMARY KEY,
    "title" VARCHAR(100) NOT NULL,
    "status" VARCHAR(20) DEFAULT 'pending',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER REFERENCES "user"("userId")
);
```

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build TypeScript files
- `npm run start`: Start production server
- `npm run typeorm`: Run TypeORM CLI
- `npm run migration:generate`: Generate new migration
- `npm run migration:run`: Run pending migrations
- `npm run migration:revert`: Revert last migration

### Project Structure

```
src/
├── controllers/     # Route controllers
├── entities/        # TypeORM entities
├── interfaces/      # TypeScript interfaces
├── middlewares/     # Express middlewares
├── migrations/      # Database migrations
├── routes/          # API routes
├── data-source.ts   # TypeORM configuration
└── server.ts        # Application entry point
```
