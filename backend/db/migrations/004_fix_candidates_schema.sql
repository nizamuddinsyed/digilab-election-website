-- Comprehensive migration to fix candidates table schema
-- Ensure email field is nullable
ALTER TABLE candidates ALTER COLUMN email DROP NOT NULL;

-- Ensure updated_at column exists with default
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Ensure color column exists with default and check constraint
ALTER TABLE candidates ADD COLUMN IF NOT EXISTS color VARCHAR(20) DEFAULT 'purple' CHECK (color IN ('purple', 'silver', 'teal'));

-- Update existing rows to have default values if needed
UPDATE candidates SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL;
UPDATE candidates SET color = 'purple' WHERE color IS NULL;

-- Ensure the trigger exists for updating updated_at on UPDATE
DROP TRIGGER IF EXISTS update_candidates_updated_at ON candidates;
CREATE TRIGGER update_candidates_updated_at
    BEFORE UPDATE ON candidates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();