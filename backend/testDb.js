const pool = require('./db/db');

console.log('Testing database connection...');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
  
  // Test candidates table
  pool.query('SELECT COUNT(*) FROM candidates', (err, res) => {
    if (err) {
      console.error('Error querying candidates table:', err);
    } else {
      console.log('Candidates count:', res.rows[0].count);
    }
    
    process.exit(0);
  });
});