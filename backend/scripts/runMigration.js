const fs = require('fs');
const path = require('path');
const pool = require('../db/db');

async function runMigration() {
  try {
    console.log('🔄 Running migration to make email optional...');
    
    const migrationPath = path.join(__dirname, '../db/migrations/002_make_email_optional.sql');
    const migration = fs.readFileSync(migrationPath, 'utf8');
    
    console.log(`Executing: ${migration}`);
    await pool.query(migration);
    
    console.log('✅ Migration executed successfully!');
    
    console.log('🔄 Running migration to add candidates trigger...');
    
    const triggerMigrationPath = path.join(__dirname, '../db/migrations/003_add_candidates_trigger.sql');
    const triggerMigration = fs.readFileSync(triggerMigrationPath, 'utf8');
    
    console.log(`Executing: ${triggerMigration}`);
    await pool.query(triggerMigration);
    
    console.log('✅ Trigger migration executed successfully!');
    
    console.log('🔄 Running comprehensive schema fix migration...');
    
    const fixMigrationPath = path.join(__dirname, '../db/migrations/004_fix_candidates_schema.sql');
    const fixMigration = fs.readFileSync(fixMigrationPath, 'utf8');
    
    console.log(`Executing: ${fixMigration}`);
    await pool.query(fixMigration);
    
    console.log('✅ Comprehensive schema fix migration executed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

runMigration();