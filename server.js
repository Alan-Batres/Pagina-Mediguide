import express from 'express';
import cors from 'cors';
import pool from './db.js';
import initializeDatabase from './initDb.js';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database on startup
await initializeDatabase();

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
    
    const query = `
      INSERT INTO medical_records (glucose, oxygen_blood, blood_pressure, temperature, age, height, weight, respiratory_rate, blood_type, heart_rate, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
      RETURNING id;
    `;
    
    const values = [glucose, oxygenBlood, bloodPressure, temperature, age, height, weight, respiratoryRate, bloodType, heartRate];
    
    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Medical record saved', id: result.rows[0].id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Store user information
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
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