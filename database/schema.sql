CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(10),
  is_pitcher BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true
);

-- Optional: Seed data
INSERT INTO players (name, position, is_pitcher, is_active) VALUES
('Aaron Judge', 'RF', false, true),
('Gerrit Cole', 'SP', true, true),
('Anthony Volpe', 'SS', false, true);
