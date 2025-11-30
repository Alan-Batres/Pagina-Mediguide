import express from 'express';
import cors from 'cors';
import pool from './db.js';
import initializeDatabase from './initDb.js';

const app = express();
app.use(cors());
app.use(express.json());

await initializeDatabase();


app.post('/api/users/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const checkQuery = `SELECT * FROM users WHERE username = $1 OR email = $2`;
    const checkResult = await pool.query(checkQuery, [username, email]);

    if (checkResult.rows.length > 0) {
      const existingField = checkResult.rows[0].username === username ? 'Usuario' : 'Correo';
      return res.status(400).json({ error: `${existingField} ya está registrado` });
    }

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

app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = `SELECT id, username, password FROM users WHERE username = $1`;
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const user = result.rows[0];

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

app.post('/api/users/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const userQuery = `SELECT id FROM users WHERE email = $1`;
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró cuenta con este correo' });
    }

    const userId = userResult.rows[0].id;
    const resetCode = Math.random().toString().substring(2, 8);
    const expiryTime = new Date(Date.now() + 30 * 60 * 1000);

    const updateQuery = `
      UPDATE users 
      SET reset_code = $1, reset_code_expiry = $2
      WHERE id = $3
    `;
    await pool.query(updateQuery, [resetCode, expiryTime, userId]);

    console.log(`Reset code sent to ${email}: ${resetCode}`);
    res.json({ 
      message: 'Reset code sent to email',
      resetCode: resetCode
    });
  } catch (error) {
    console.error('Error during forgot password:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/verify-reset-code', async (req, res) => {
  try {
    const { email, resetCode } = req.body;

    const query = `
      SELECT id, reset_code, reset_code_expiry FROM users 
      WHERE email = $1 AND reset_code = $2
    `;
    const result = await pool.query(query, [email, resetCode]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Código de recuperación inválido' });
    }

    const user = result.rows[0];
    const now = new Date();

    if (new Date(user.reset_code_expiry) < now) {
      return res.status(401).json({ error: 'El código de recuperación ha expirado' });
    }

    console.log('Reset code verified for user:', user.id);
    res.json({ 
      message: 'Reset code verified',
      userId: user.id
    });
  } catch (error) {
    console.error('Error during code verification:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/reset-password', async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const verifyQuery = `
      SELECT id, reset_code_expiry FROM users 
      WHERE email = $1 AND reset_code = $2
    `;
    const verifyResult = await pool.query(verifyQuery, [email, resetCode]);

    if (verifyResult.rows.length === 0) {
      return res.status(401).json({ error: 'Código de recuperación inválido' });
    }

    const user = verifyResult.rows[0];
    const now = new Date();

    if (new Date(user.reset_code_expiry) < now) {
      return res.status(401).json({ error: 'El código de recuperación ha expirado' });
    }

    const updateQuery = `
      UPDATE users 
      SET password = $1, reset_code = NULL, reset_code_expiry = NULL
      WHERE email = $2
      RETURNING id, username
    `;
    const result = await pool.query(updateQuery, [newPassword, email]);

    console.log('Password reset for user:', result.rows[0].id);
    res.json({ 
      message: 'Contraseña actualizada exitosamente',
      userId: result.rows[0].id,
      username: result.rows[0].username
    });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected', time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/medical-info', async (req, res) => {
  try {
    const { glucose, oxygenBlood, bloodPressureSystolic, bloodPressureDiastolic, temperature, age, height, weight, respiratoryRate, bloodType, heartRate, userId } = req.body;
    
    console.log('Received medical data:', { glucose, oxygenBlood, bloodPressureSystolic, bloodPressureDiastolic, temperature, age, height, weight, respiratoryRate, bloodType, heartRate, userId });
    
    const query = `
      INSERT INTO medical_records (user_id, glucose, oxygen_blood, blood_pressure_systolic, blood_pressure_diastolic, temperature, age, height, weight, respiratory_rate, blood_type, heart_rate, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
      RETURNING id;
    `;
    
    const values = [userId, glucose, oxygenBlood, bloodPressureSystolic, bloodPressureDiastolic, temperature, age, height, weight, respiratoryRate, bloodType, heartRate];
    
    const result = await pool.query(query, values);
    console.log('Medical record saved with ID:', result.rows[0].id);
    res.status(201).json({ message: 'Medical record saved', id: result.rows[0].id });
  } catch (error) {
    console.error('Error saving medical data:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/medical-info/latest', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const query = `
      SELECT * FROM medical_records
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 1;
    `;
    
    const result = await pool.query(query, [userId]);
    console.log('Query result:', result.rows);
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      console.log('No medical records found for user:', userId);
      res.status(404).json({ error: 'No medical records found' });
    }
  } catch (error) {
    console.error('Error fetching medical data:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
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