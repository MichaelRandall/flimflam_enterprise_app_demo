# Flimflam Enterprise App

A modern workout tracking application built with React, TypeScript, and Express.js. The Flimflam Enterprise App helps users log exercises, track workouts by muscle group, and manage their fitness routines.

## 🎯 Features

- **User Authentication**: JWT-based login system for secure access
- **Exercise Management**: Browse and manage a comprehensive exercise database
- **Workout Tracking**: Log workouts with location and muscle group focus
- **Muscle Group Categorization**: Exercises tagged by muscle groups (push, pull, compound, bodyweight, etc.)
- **User Management**: View and manage user profiles
- **Protected Routes**: Secure pages that require authentication
- **Responsive Design**: Built with modern React and TypeScript

## 🏗️ Project Structure

```
flimflam-enterprise-app/
├── frontend/              # React + TypeScript + Vite SPA
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service calls
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript type definitions
│   └── package.json
├── backend/               # Express.js API server
│   ├── server.js          # Main server entry point
│   └── package.json
├── db/                    # Database setup
│   └── init.sql           # Schema and initial data
├── docker-compose.yml     # Local development compose config
├── docker-compose.prod.yml # Production compose config
├── infrastructure.yml     # Infrastructure configuration
└── Dockerfile.api         # API Docker image definition
```

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.3.1 (build tool & dev server)
- **React Router** 7.13.0 (navigation)
- **ESLint** (code quality)

### Backend
- **Express.js** 5.2.1
- **PostgreSQL** (via `pg` driver)
- **JWT** (authentication)
- **CORS** (cross-origin requests)
- **dotenv** (environment configuration)

### Infrastructure
- **Docker** & **Docker Compose** (containerization)
- **PostgreSQL** (database)

## 📋 Prerequisites

- **Node.js** 18+ and **npm**
- **Docker** and **Docker Compose** (for containerized setup)
- **PostgreSQL** (if running without Docker)

## 🚀 Quick Start

### With Docker Compose (Recommended)

1. **Clone and setup the project**
   ```bash
   cd flimflam-enterprise-app
   ```

2. **Create a `.env` file** in the root directory:
   ```
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=flimflam_db
   DB_HOST=flimflam_db
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. **Start the application**
   ```bash
   docker-compose up --build
   ```

4. **Access the app**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5001`

### Without Docker (Local Development)

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the backend directory with database credentials

4. **Start the backend server**
   ```bash
   npm start
   ```
   The API will run on `http://localhost:5000`

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` by default

## 📚 API Endpoints

### Authentication
- `POST /api/login` - Login with email and password

### Exercises
- `GET /api/exercises` - Get all exercises (requires authentication)

### Users
- `GET /api/users` - Get all users (requires authentication)

All protected endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## 💾 Database Schema

The database uses a `workout_tracker` schema with the following main tables:

- **users** - User accounts
- **exercises** - Exercise definitions with properties (push, pull, compound, etc.)
- **muscle_group** - Muscle group categories
- **exercise_muscle_groups** - Many-to-many relationship between exercises and muscle groups
- **workouts** - Logged workouts with location and focus
- **workout_location_lut** - Lookup table for workout locations

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start the server

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild images
docker-compose up --build
```

## 🔐 Authentication Flow

1. User logs in via the **LoginPage** with email and password
2. Backend returns a JWT token valid for 1 hour
3. Token is stored in the frontend (typically in localStorage or memory)
4. Subsequent requests include the token in the `Authorization` header
5. Protected routes verify the token and render content accordingly

## 📝 Environment Variables

### Required
- `POSTGRES_USER` - PostgreSQL username
- `POSTGRES_PASSWORD` - PostgreSQL password
- `POSTGRES_DB` - Database name
- `JWT_SECRET` - Secret key for JWT signing

### Optional
- `DB_HOST` - Database host (default: `flimflam_db` for Docker, `localhost` for local)
- `DB_PORT` - Database port (default: `5432`)
- `PORT` - API server port (default: `5000`)

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running and accessible
- Check that `DB_HOST` and `DB_PORT` are correct
- Verify credentials in the `.env` file

### CORS Errors
- Ensure the backend CORS configuration allows your frontend URL
- Check that both services are running on the correct ports

### JWT Token Errors
- Verify the `JWT_SECRET` is the same in `.env` and being used by the backend
- Check that tokens haven't expired (1 hour expiration)

## 📖 Development Notes

- The frontend uses **Vite** for fast HMR during development
- TypeScript is used throughout for type safety
- Custom hooks like `useFetch` handle API data fetching
- Protected routes prevent unauthorized access to sensitive pages

## 📄 License

ISC

## 👤 Author

Michael Randall
