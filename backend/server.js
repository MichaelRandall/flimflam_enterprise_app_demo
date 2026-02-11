const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Looks for .env in current directory

const app = express();

// --- 1. Production CORS ---
// origin: true allows the CloudFront URL to access the API
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// --- 2. Database Connection ---
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.DB_HOST || 'flimflam_db', // Matches docker-compose service name
  database: process.env.POSTGRES_DB || 'flimflam_db',
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Set Search Path for your specific schema
pool.on('connect', (client) => {
  client.query('SET search_path TO workout_tracker, public');
});

// --- 3. Auth Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// --- 4. Routes ---
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  // Demo Logic: Replace with your DB validation
  if (email && password) {
    const user = { name: 'Authenticated User', email: email };
    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token: accessToken, user });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

app.get('/api/exercises', authenticateToken, async (req, res) => {
  try {
    const query = `
      SELECT e.*, json_agg(mg.*) AS muscle_groups
      FROM workout_tracker.exercises e
      LEFT JOIN workout_tracker.exercise_muscle_groups emg ON e.exercise_id = emg.exercise_id
      LEFT JOIN workout_tracker.muscle_group mg ON emg.muscle_group_id = mg.muscle_group_id
      GROUP BY e.exercise_id;`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workout_tracker.users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 5. Listener ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
