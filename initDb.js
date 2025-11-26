import pool from './db.js';

async function initializeDatabase() {
  try {
    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create medical_records table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS medical_records (
        id SERIAL PRIMARY KEY,
        glucose NUMERIC,
        oxygen_blood NUMERIC,
        blood_pressure NUMERIC,
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
