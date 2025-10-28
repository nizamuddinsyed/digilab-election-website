const fs = require('fs');
const path = require('path');
const pool = require('../db/db');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Read schema file
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema
    await pool.query(schema);
    
    console.log('Database initialized successfully!');
    console.log('\n=== Default Admin Credentials ===');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('⚠️  CHANGE THIS PASSWORD IN PRODUCTION!');
    console.log('================================\n');
    
    // Create default candidate photo
    const uploadsDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();
