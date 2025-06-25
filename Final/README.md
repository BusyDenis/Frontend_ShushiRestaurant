# Sushi Restaurant Application

This is a full-stack sushi restaurant application with a React frontend and Spring Boot backend, both running in Docker containers and connecting to an existing PostgreSQL database.

## Architecture

- **Frontend**: React application with Vite (Port 3000)
- **Backend**: Spring Boot REST API (Port 8080)
- **Database**: Existing PostgreSQL container (Port 5432)

## Prerequisites

- Docker
- Docker Compose
- Existing PostgreSQL container running on port 5432

## Quick Start

1. **Ensure your PostgreSQL container is running**
   ```bash
   # Your existing PostgreSQL container should be running on port 5432
   # Container name: uek295db
   # Database: postgres
   # Username: postgres
   # Password: postgres
   ```

2. **Clone and navigate to the project directory**
   ```bash
   cd /path/to/your/project
   ```

3. **Build and start the application services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Documentation: http://localhost:8080/swagger-ui.html

## Services

### Frontend (React)
- **Port**: 3000
- **Technology**: React + Vite
- **Features**: Modern UI with Framer Motion animations

### Backend (Spring Boot)
- **Port**: 8080
- **Technology**: Spring Boot 3.5.0 + Java 21
- **Features**: REST API with JPA, PostgreSQL

### Database (PostgreSQL)
- **Port**: 5432 (existing container)
- **Container**: uek295db
- **Database**: postgres
- **Username**: postgres
- **Password**: postgres

## Development Commands

### Start application services
```bash
docker-compose up
```

### Start in background
```bash
docker-compose up -d
```

### Stop application services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### Rebuild and start
```bash
docker-compose up --build
```

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create a new menu item
- `PUT /api/menu/{id}` - Update a menu item
- `DELETE /api/menu/{id}` - Delete a menu item
- `POST /api/reservation` - Create a reservation

## Troubleshooting

1. **Port conflicts**: Make sure ports 3000 and 8080 are available
2. **Database connection**: Ensure your PostgreSQL container (uek295db) is running
3. **CORS issues**: CORS is configured to allow requests from localhost:3000
4. **Database access**: The backend connects to your existing PostgreSQL container via host.docker.internal

## File Structure

```
Final/
├── docker-compose.yml          # Main orchestration file
├── Suhi_Code/                  # Frontend React application
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── 2025-rest-foods-backend--8-/ # Backend Spring Boot application
│   └── sushi_backend/
│       ├── Dockerfile
│       └── src/
└── README.md
``` 