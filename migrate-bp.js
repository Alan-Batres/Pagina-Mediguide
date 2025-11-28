import pool from './db.js';

async function migrateDatabase() {
  try {
    console.log('Starting database migration...');
    
    await pool.query(`
      ALTER TABLE medical_records 
      ADD COLUMN IF NOT EXISTS blood_pressure_systolic NUMERIC,
      ADD COLUMN IF NOT EXISTS blood_pressure_diastolic NUMERIC;
    `);
    
    await pool.query(`
      ALTER TABLE medical_records 
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
    `);
    
    console.log('✓ Database migration completed successfully');
    console.log('✓ Added blood_pressure_systolic column');
    console.log('✓ Added blood_pressure_diastolic column');
    console.log('✓ Added user_id column with foreign key relationship');
    
  } catch (error) {
    console.error('✗ Error during migration:', error.message);
    process.exit(1);
  }
}

await migrateDatabase();
process.exit(0);
