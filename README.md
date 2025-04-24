# 📝 TODO Web Application

A full-stack TODO web application with authentication, infinite scroll, bulk operations, and clean architecture using modern technologies.

---

## ⚙️ Tech Stack

### 🚀 Frontend
- React 19 with Vite
- React Router
- Axios
- Material UI (MUI)
- Clean architecture: UI / ViewModel / Repository layers

### 🛠️ Backend
- Node.js with Express.js (TypeScript)
- PostgreSQL (via Docker)
- TypeORM with migrations
- JWT Authentication (Token stored in cookies)
- Clean structure: Controllers / Services / Middlewares / Repositories / Entities

---

## 📦 Project Structure

```
/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   │   └── Todo.ts
│   │   ├── migrations/
│   │   ├── interfaces/
│   │   ├── data-source.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/
│   └── ...
├── docker-compose.yml
├── .env
└── README.md
```

---

## 🔧 Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# PostgreSQL Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=P0stgr3s!S3cur3P@ss2024
POSTGRES_DB=todo-db

# JWT Configuration
JWT_SECRET=6b6d24a69322e5afd8577e70d619f5c6c9196858355b80e81dd1d57c790b4678

# Database Connection
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=P0stgr3s!S3cur3P@ss2024
DB_NAME=todo-db
```

> ⚠️ Important: Add `.env` to your `.gitignore` file to prevent committing sensitive information.

### 2. Docker Setup

1. Start the application using Docker Compose:
```bash
sudo docker-compose up -d
```

This will:
- Start PostgreSQL database on port 5432
- Start the backend server on port 3000
- Set up the necessary networking between services
- Mount volumes for data persistence

2. To stop the services:
```bash
sudo docker-compose down
```

3. To view logs:
```bash
sudo docker-compose logs -f
```

### 3. Manual Setup (Alternative)

If you prefer to run the services manually:

1. Start PostgreSQL server:
```bash
sudo systemctl start postgresql
```

2. Create the database:
```bash
createdb todo-db
```

3. Backend Setup:
```bash
cd backend
npm install
npm run migration:generate -- src/migrations/InitMigration
npm run migration:run
npm run dev
```

4. Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```

---

## 📝 Available Scripts

### Backend Scripts

```bash
# Start the development server
npm run dev

# Build the project
npm run build

# Start the production server
npm start

# TypeORM Commands
npm run migration:generate -- src/migrations/YourMigrationName  # Generate new migration
npm run migration:run                                          # Run pending migrations
npm run migration:revert                                       # Revert last migration
npm run migration:show                                         # Show all migrations and their status
```

---

## 📝 Entity Definitions

### User Entity
```typescript
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId!: number;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos!: Todo[];
}
```

### Todo Entity
```typescript
@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    todoId!: number;

    @Column()
    title!: string;

    @Column({
        type: 'varchar',
        default: TodoStatus.PENDING
    })
    status!: string;

    @ManyToOne(() => User, (user) => user.todos)
    user!: User;
}
```

---

## 🔒 Security Notes

- JWT tokens are stored in HTTP-only cookies for enhanced security
- Passwords are hashed before storage
- Database credentials are managed through environment variables
- All sensitive information is excluded from version control

---

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure PostgreSQL is running: `sudo systemctl status postgresql`
   - Verify database exists: `psql -l`
   - Check connection details in `.env`

2. **TypeORM Migration Issues**
   - Ensure you're in the backend directory
   - Verify data-source.ts configuration
   - Check PostgreSQL connection

3. **TypeScript Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check tsconfig.json settings
   - Verify type definitions are properly installed

4. **Docker Issues**
   - Check if Docker is running: `sudo systemctl status docker`
   - View container logs: `sudo docker-compose logs -f`
   - Restart containers: `sudo docker-compose restart`
   - Rebuild containers: `sudo docker-compose up -d --build`

---

## 📄 License

MIT

---

## 👨‍💻 Author

Made by Mimina under JSON supervision
