const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg'); // Import the Postgres driver

const app = express();
// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://dcnsww4644m28.cloudfront.net");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Essential for the "Preflight" check!
  }
  next();
});


app.use(express.json());

// 1. Connect to your Docker Postgres container
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || 'flimflam_db',
  port: 5432,
});

// 2. Use the Secret from your .env (SSM)
const SECRET_KEY = process.env.JWT_SECRET || 'fallback-secret';

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 3. Query the actual workout_tracker schema!
    const query = 'SELECT * FROM workout_tracker.users WHERE email = $1';
    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    // 4. Validate the password (Note: In production, use bcrypt here!)
    if (user && user.password === password) {
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name }, 
        SECRET_KEY, 
        { expiresIn: '1h' }
      );
      return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

app.listen(5000, () => console.log('Backend running on port 5000'));