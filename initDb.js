import pool from './db.js';

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        reset_code VARCHAR(10),
        reset_code_expiry TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS medical_records (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        glucose NUMERIC,
        oxygen_blood NUMERIC,
        blood_pressure_systolic NUMERIC,
        blood_pressure_diastolic NUMERIC,
        temperature NUMERIC,
        age INTEGER,
        height NUMERIC,
        weight NUMERIC,
        respiratory_rate NUMERIC,
        blood_type VARCHAR(2),
        heart_rate NUMERIC,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✓ Database initialized successfully');
  } catch (error) {
    console.error('✗ Error initializing database:', error.message);
    process.exit(1);
  }
}

export default initializeDatabase;
