-- Migration to make email field optional in candidates table
ALTER TABLE candidates ALTER COLUMN email DROP NOT NULL;