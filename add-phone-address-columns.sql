-- Add phone and address columns to users table
-- Run this SQL in your Supabase SQL Editor

ALTER TABLE users 
ADD COLUMN phone TEXT,
ADD COLUMN address TEXT;

-- Add comments to document the new columns
COMMENT ON COLUMN users.phone IS 'User phone number';
COMMENT ON COLUMN users.address IS 'User address';

-- Optional: Add constraints if needed
-- ALTER TABLE users ADD CONSTRAINT phone_format CHECK (phone ~ '^[+]?[0-9\s\-\(\)]+$');
