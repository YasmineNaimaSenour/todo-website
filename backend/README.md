# Backend Setup Guide

This guide explains how to set up and run the backend service, including database migrations.

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── todo.controller.ts
│   │   └── user.controller.ts
│   ├── entities/
│   │   ├── Todo.ts
│   │   └── User.ts
│   ├── interfaces/
│   ├── middlewares/
│   ├── migrations/
│   │   └── 1745412919642-InitMigration.ts
│   ├── routes/
│   │   ├── todo.routes.ts
│   │   └── user.routes.ts
│   ├── services/
│   ├── data-source.ts
│   └── server.ts
├── node_modules/
├── package-lock.json
├── package.json
├── Dockerfile
├── README.md
└── tsconfig.json
```

## 🐳 Running with Docker

1. Start the containers from the project root:
```bash
sudo docker-compose up -d
```

2. Check if containers are running:
```bash
sudo docker ps
```
You should see both `todo-backend` and `todo-db` containers running.

## 📝 Generating Migrations

To generate a new migration file that will create the necessary database tables:

```bash
sudo docker exec -it todo-backend npm run migration:generate -- src/migrations/InitMigration
```

This will:
- Create a new migration file in `src/migrations/InitMigration.ts`
- Generate SQL based on your entity definitions (User and Todo)

## 🚀 Running Migrations

After generating the migration, run it to create the tables:

```bash
sudo docker exec -it todo-backend npm run migration:run
```

## 🔍 Viewing Migration Files

To view the generated migration file:

```bash
sudo docker exec -it todo-backend cat /app/src/migrations/InitMigration.ts
```

## 📊 Checking Database

To verify the tables were created, you can connect to the database:

```bash
sudo docker exec -it todo-db psql -U postgres -d todo-db
```

Then list the tables:
```sql
\dt
```

## 🐛 Troubleshooting

### Common Issues

1. **Container Not Running**
   ```bash
   sudo docker ps
   sudo docker-compose up -d
   ```

2. **Migration Generation Fails**
   - Check container logs: `sudo docker-compose logs -f backend`
   - Ensure database is running: `sudo docker ps | grep todo-db`
   - Verify environment variables in `.env`

3. **Migration Run Fails**
   - Check if migration file exists: `sudo docker exec -it todo-backend ls -la /app/src/migrations/`
   - View database logs: `sudo docker-compose logs -f db`

## 🔄 Useful Commands

- Stop containers: `sudo docker-compose down`
- Restart containers: `sudo docker-compose restart`
- View logs: `sudo docker-compose logs -f`
- Rebuild containers: `sudo docker-compose up -d --build` 