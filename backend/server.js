const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });


console.log("DB User:", process.env.POSTGRES_USER);
console.log("JWT Secret:", process.env.JWT_SECRET);

const app = express();

// 1. Explicitly allow BOTH IPv4 and IPv6 localhost
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// 2. Add this specific handler for OPTIONS
app.use(express.json());



// --- 2. Database Connection ---
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT,
});

// Set Search Path for all queries
pool.on('connect', (client) => {
  client.query('SET search_path TO workout_tracker, public');
});

// --- 3. Auth Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Grabs the second part of "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- 4. Public Routes ---
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // In a real application, you would query your database to verify the user's email and password.
  // For this example, replace the following condition with your database lookup and password verification logic.
  // If the credentials are valid, generate and return a JWT.
  if (email && password) { // Replace with actual validation
    const user = { name: 'Authenticated User', email: email }; // Replace with actual user data from DB
    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token: accessToken, user });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// --- 5. Protected Routes ---

// Get all exercises with joined muscle groups
app.get('/api/exercises', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT
        e.*,
        json_agg(mg.*) AS muscle_groups
      FROM workout_tracker.exercises e
      LEFT JOIN workout_tracker.exercise_muscle_groups emg ON e.exercise_id = emg.exercise_id
      LEFT JOIN workout_tracker.muscle_group mg ON emg.muscle_group_id = mg.muscle_group_id
      GROUP BY e.exercise_id;
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Get users
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workout_tracker.users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 6. Server Listener ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
