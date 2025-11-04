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
    email VARCHAR(255),
    social_links JSONB DEFAULT '{}',
    photo_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    color VARCHAR(20) DEFAULT 'purple' CHECK (color IN ('purple', 'silver', 'teal')),
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

-- Create policies table
CREATE TABLE IF NOT EXISTS policies (
    id SERIAL PRIMARY KEY,
    title_de VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_de TEXT NOT NULL,
    description_en TEXT NOT NULL,
    color VARCHAR(20) DEFAULT 'purple' CHECK (color IN ('purple', 'silver', 'teal')),
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create basic_topics table
CREATE TABLE IF NOT EXISTS basic_topics (
    id SERIAL PRIMARY KEY,
    title_de VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_de TEXT NOT NULL,
    description_en TEXT NOT NULL,
    color VARCHAR(20) DEFAULT 'purple' CHECK (color IN ('purple', 'silver', 'teal')),
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    id SERIAL PRIMARY KEY,
    question_de VARCHAR(255) NOT NULL,
    question_en VARCHAR(255) NOT NULL,
    answer_de TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title_de VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location_de VARCHAR(255) NOT NULL,
    location_en VARCHAR(255) NOT NULL,
    description_de TEXT NOT NULL,
    description_en TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_candidates_is_active ON candidates(is_active);
CREATE INDEX IF NOT EXISTS idx_candidates_created_at ON candidates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_policies_is_active ON policies(is_active);
CREATE INDEX IF NOT EXISTS idx_policies_display_order ON policies(display_order);
CREATE INDEX IF NOT EXISTS idx_basic_topics_is_active ON basic_topics(is_active);
CREATE INDEX IF NOT EXISTS idx_basic_topics_display_order ON basic_topics(display_order);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON faqs(display_order);
CREATE INDEX IF NOT EXISTS idx_events_is_active ON events(is_active);
CREATE INDEX IF NOT EXISTS idx_events_display_order ON events(display_order);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for policies, basic_topics, faqs and events
DROP TRIGGER IF EXISTS update_policies_updated_at ON policies;
CREATE TRIGGER update_policies_updated_at
    BEFORE UPDATE ON policies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_basic_topics_updated_at ON basic_topics;
CREATE TRIGGER update_basic_topics_updated_at
    BEFORE UPDATE ON basic_topics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
CREATE TRIGGER update_faqs_updated_at
    BEFORE UPDATE ON faqs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

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

-- Insert sample basic topics
INSERT INTO basic_topics (title_de, title_en, description_de, description_en, color, is_active)
VALUES 
    ('Bildung', 'Education', 'Wir investieren in Bildung für alle. Bessere Schulen, bessere Zukunft.', 'We invest in education for everyone. Better schools, better future.', 'purple', true),
    ('Wirtschaft', 'Economy', 'Starke Wirtschaft durch nachhaltige Entwicklung.', 'Strong economy through sustainable development.', 'teal', true),
    ('Umwelt', 'Environment', 'Schutz unserer Umwelt für zukünftige Generationen.', 'Protecting our environment for future generations.', 'silver', true)
ON CONFLICT DO NOTHING;

-- Insert sample events
INSERT INTO events (title_de, title_en, event_date, event_time, location_de, location_en, description_de, description_en, is_active)
VALUES 
    ('Öffentliche Debatte', 'Public Debate', '2025-04-15', '18:00:00', 'Rathaus, Hauptstraße 1', 'Town Hall, Main Street 1', 'Diskussion über die wichtigsten Themen der Wahl 2025.', 'Discussion about the key topics of the 2025 election.', true),
    ('Kandidatenforum', 'Candidate Forum', '2025-05-03', '19:30:00', 'Gemeindezentrum, Markt 5', 'Community Center, Market 5', 'Treffen Sie die Kandidaten und stellen Sie Ihre Fragen.', 'Meet the candidates and ask your questions.', true),
    ('Wahlabend', 'Election Night', '2025-06-15', '20:00:00', 'Kulturzentrum, Bahnhofstraße 12', 'Cultural Center, Station Street 12', 'Verfolgen Sie die Wahlergebnisse live.', 'Follow the election results live.', true)
ON CONFLICT DO NOTHING;
