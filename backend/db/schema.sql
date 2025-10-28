-- Election Candidates Database Schema

-- Create candidates table
CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    bio_de TEXT NOT NULL,
    bio_en TEXT NOT NULL,
    goals_de TEXT NOT NULL,
    goals_en TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    social_links JSONB DEFAULT '{}',
    photo_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_candidates_is_active ON candidates(is_active);
CREATE INDEX IF NOT EXISTS idx_candidates_created_at ON candidates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for candidates table
DROP TRIGGER IF EXISTS update_candidates_updated_at ON candidates;
CREATE TRIGGER update_candidates_updated_at
    BEFORE UPDATE ON candidates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123 - MUST BE CHANGED IN PRODUCTION)
-- Password hash for 'admin123'
INSERT INTO admin_users (username, password_hash, email)
VALUES ('admin', '$2b$10$5DRHFy0j8ItA0MhXbGSU5OJHLz8iD71rSE0XyAZ7uuCa9GutG.SgC', 'admin@election.com')
ON CONFLICT (username) DO NOTHING;

-- Insert sample candidates (bilingual content)
INSERT INTO candidates (name, position, bio_de, bio_en, goals_de, goals_en, email, social_links, photo_url, is_active)
VALUES 
    (
        'Dr. Maria Schmidt',
        'Bürgermeisterin',
        'Dr. Maria Schmidt ist eine erfahrene Politikerin mit über 15 Jahren Erfahrung in der Kommunalverwaltung. Sie hat einen Doktortitel in Politikwissenschaften und setzt sich leidenschaftlich für nachhaltige Stadtentwicklung ein.',
        'Dr. Maria Schmidt is an experienced politician with over 15 years of experience in municipal administration. She holds a PhD in Political Science and is passionate about sustainable urban development.',
        'Nachhaltige Stadtentwicklung fördern\nÖffentlichen Nahverkehr ausbauen\nBildung und Jugendförderung stärken\nDigitalisierung der Verwaltung vorantreiben',
        'Promote sustainable urban development\nExpand public transportation\nStrengthen education and youth programs\nAdvance digitalization of administration',
        'maria.schmidt@election.com',
        '{"twitter": "https://twitter.com/maria_schmidt", "linkedin": "https://linkedin.com/in/maria-schmidt", "facebook": "https://facebook.com/maria.schmidt.official"}',
        '/uploads/default-candidate.jpg',
        true
    ),
    (
        'Thomas Müller',
        'Stadtrat',
        'Thomas Müller ist ein engagierter Unternehmer und Gemeindemitglied, der sich für lokale Wirtschaftsentwicklung und Schaffung von Arbeitsplätzen einsetzt. Er bringt praktische Geschäftserfahrung in die Politik.',
        'Thomas Müller is a dedicated entrepreneur and community member committed to local economic development and job creation. He brings practical business experience to politics.',
        'Lokale Wirtschaft stärken\nArbeitsplätze schaffen\nKleinunternehmen unterstützen\nInfrastruktur modernisieren',
        'Strengthen local economy\nCreate jobs\nSupport small businesses\nModernize infrastructure',
        'thomas.mueller@election.com',
        '{"twitter": "https://twitter.com/thomas_mueller", "linkedin": "https://linkedin.com/in/thomas-mueller"}',
        '/uploads/default-candidate.jpg',
        true
    ),
    (
        'Sarah Weber',
        'Stadträtin',
        'Sarah Weber ist eine Umweltaktivistin und Lehrerin, die sich für Klimaschutz und umweltfreundliche Stadtpolitik einsetzt. Sie hat mehrere erfolgreiche Umweltinitiativen in der Region geleitet.',
        'Sarah Weber is an environmental activist and teacher committed to climate protection and eco-friendly urban policies. She has led several successful environmental initiatives in the region.',
        'Klimaschutz priorisieren\nGrünflächen erweitern\nErneuerbare Energien fördern\nPlastikreduktion umsetzen',
        'Prioritize climate protection\nExpand green spaces\nPromote renewable energy\nImplement plastic reduction',
        'sarah.weber@election.com',
        '{"twitter": "https://twitter.com/sarah_weber", "instagram": "https://instagram.com/sarah.weber.green"}',
        '/uploads/default-candidate.jpg',
        true
    ),
    (
        'Michael Schneider',
        'Stadtrat',
        'Michael Schneider ist ein ehemaliger Polizeibeamter, der sich für öffentliche Sicherheit und Gemeinschaftspolizeiarbeit einsetzt. Er hat über 20 Jahre Erfahrung im öffentlichen Dienst.',
        'Michael Schneider is a former police officer committed to public safety and community policing. He has over 20 years of experience in public service.',
        'Öffentliche Sicherheit verbessern\nGemeinschaftspolizeiarbeit stärken\nJugendkriminalität bekämpfen\nBürgerbeteiligung fördern',
        'Improve public safety\nStrengthen community policing\nCombat youth crime\nPromote citizen participation',
        'michael.schneider@election.com',
        '{"twitter": "https://twitter.com/m_schneider", "facebook": "https://facebook.com/michael.schneider.official"}',
        '/uploads/default-candidate.jpg',
        true
    );
