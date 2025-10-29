-- Add color field to candidates table
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS color VARCHAR(20) DEFAULT 'purple' CHECK (color IN ('purple', 'silver', 'teal'));

-- Update existing candidates with colors based on their ID
UPDATE candidates SET color = CASE 
    WHEN (id - 1) % 3 = 0 THEN 'purple'
    WHEN (id - 1) % 3 = 1 THEN 'silver'
    WHEN (id - 1) % 3 = 2 THEN 'teal'
END
WHERE color = 'purple' AND id IN (SELECT id FROM candidates);
