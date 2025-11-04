const fs = require('fs');
const path = require('path');
const pool = require('../db/db');
require('dotenv').config();

async function runSchema() {
  try {
    console.log('🔄 Running database schema...');
    
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = schema.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.substring(0, 50)}...`);
        await pool.query(statement);
      }
    }
    
    console.log('✅ Database schema executed successfully!');
    
    // Insert sample policies
    await pool.query(`
      INSERT INTO policies (title_de, title_en, description_de, description_en, color, is_active)
      VALUES 
        ('Bildung', 'Education', 'Wir investieren in Bildung für alle. Bessere Schulen, bessere Zukunft.', 'We invest in education for everyone. Better schools, better future.', 'purple', true),
        ('Wirtschaft', 'Economy', 'Starke Wirtschaft durch nachhaltige Entwicklung.', 'Strong economy through sustainable development.', 'teal', true),
        ('Umwelt', 'Environment', 'Schutz unserer Umwelt für zukünftige Generationen.', 'Protecting our environment for future generations.', 'silver', true)
      ON CONFLICT DO NOTHING
    `);
    
    console.log('✅ Sample policies inserted!');
    
    // Insert sample FAQs
    await pool.query(`
      INSERT INTO faqs (question_de, question_en, answer_de, answer_en, is_active)
      VALUES 
        ('Wer sind die Kandidaten?', 'Who are the candidates?', 'Unsere Kandidaten sind engagierte Menschen, die sich für Veränderung einsetzen.', 'Our candidates are committed people dedicated to change.', true),
        ('Wie kann ich abstimmen?', 'How can I vote?', 'Sie können bei der Wahl 2025 teilnehmen.', 'You can participate in the 2025 election.', true),
        ('Was sind die Hauptrichtlinien?', 'What are the main policies?', 'Unsere Hauptrichtlinien konzentrieren sich auf Bildung, Wirtschaft und Umweltschutz.', 'Our main policies focus on education, economy, and environmental protection.', true),
        ('Wie kann ich mit den Kandidaten in Kontakt treten?', 'How can I contact the candidates?', 'Auf jeder Kandidatenseite finden Sie Kontaktinformationen.', 'You can find contact information on each candidate page.', true)
      ON CONFLICT DO NOTHING
    `);
    
    console.log('✅ Sample FAQs inserted!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running schema:', error);
    process.exit(1);
  }
}

runSchema();
