import express from 'express';
import cors from 'cors';
import pool from './db.js';
import initializeDatabase from './initDb.js';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database on startup
await initializeDatabase();

// ==================== AUTHENTICATION ENDPOINTS ====================

// Signup endpoint
app.post('/api/users/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const checkQuery = `SELECT * FROM users WHERE username = $1 OR email = $2`;
    const checkResult = await pool.query(checkQuery, [username, email]);

    if (checkResult.rows.length > 0) {
      const existingField = checkResult.rows[0].username === username ? 'Usuario' : 'Correo';
      return res.status(400).json({ error: `${existingField} ya está registrado` });
    }

    // Insert new user
    const insertQuery = `
      INSERT INTO users (username, email, password, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, username;
    `;
    const result = await pool.query(insertQuery, [username, email, password]);
    const user = result.rows[0];

    console.log('User registered:', user.id);
    res.status(201).json({ 
      message: 'User registered successfully', 
      userId: user.id,
      username: user.username
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const query = `SELECT id, username, password FROM users WHERE username = $1`;
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const user = result.rows[0];

    // Check password (in production, use bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    console.log('User logged in:', user.id);
    res.json({ 
      message: 'Login successful',
      userId: user.id,
      username: user.username
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== MEDICAL DATA ENDPOINTS ====================

// Example endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected', time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Store medical information
app.post('/api/medical-info', async (req, res) => {
  try {
    const { glucose, oxygenBlood, bloodPressure, temperature, age, height, weight, respiratoryRate, bloodType, heartRate } = req.body;
    
    console.log('Received medical data:', { glucose, oxygenBlood, bloodPressure, temperature, age, height, weight, respiratoryRate, bloodType, heartRate });
    
    const query = `
      INSERT INTO medical_records (glucose, oxygen_blood, blood_pressure, temperature, age, height, weight, respiratory_rate, blood_type, heart_rate, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
      RETURNING id;
    `;
    
    const values = [glucose, oxygenBlood, bloodPressure, temperature, age, height, weight, respiratoryRate, bloodType, heartRate];
    
    const result = await pool.query(query, values);
    console.log('Medical record saved with ID:', result.rows[0].id);
    res.status(201).json({ message: 'Medical record saved', id: result.rows[0].id });
  } catch (error) {
    console.error('Error saving medical data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get latest medical record
app.get('/api/medical-info/latest', async (req, res) => {
  try {
    const query = `
      SELECT * FROM medical_records
      ORDER BY created_at DESC
      LIMIT 1;
    `;
    
    const result = await pool.query(query);
    console.log('Query result:', result.rows);
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      console.log('No medical records found in database');
      res.status(404).json({ error: 'No medical records found' });
    }
  } catch (error) {
    console.error('Error fetching medical data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Store user information
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if username already exists
    const checkQuery = `SELECT * FROM users WHERE username = $1 OR email = $2`;
    const checkResult = await pool.query(checkQuery, [username, email]);
    
    if (checkResult.rows.length > 0) {
      const existingField = checkResult.rows[0].username === username ? 'Usuario' : 'Correo';
      return res.status(400).json({ error: `${existingField} ya está registrado` });
    }
    
    const query = `
      INSERT INTO users (username, email, password, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id;
    `;
    
    const values = [username, email, password];
    
    const result = await pool.query(query, values);
    res.status(201).json({ message: 'User registered', id: result.rows[0].id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});