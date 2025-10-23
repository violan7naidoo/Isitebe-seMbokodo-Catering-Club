-- If your name data got wiped, you can restore it from the auth.users table
-- Run this in Supabase SQL Editor to restore names from auth data

-- First, let's check what data we have
SELECT 
  u.id, 
  u.first_name, 
  u.last_name, 
  u.email,
  au.raw_user_meta_data->>'first_name' as auth_first_name,
  au.raw_user_meta_data->>'last_name' as auth_last_name
FROM users u
LEFT JOIN auth.users au ON au.id = u.id
WHERE u.first_name IS NULL OR u.last_name IS NULL;

-- Update using a proper JOIN to avoid subquery issues
UPDATE users 
SET 
  first_name = au.raw_user_meta_data->>'first_name',
  last_name = au.raw_user_meta_data->>'last_name'
FROM auth.users au
WHERE users.id = au.id 
  AND (users.first_name IS NULL OR users.last_name IS NULL);

-- Check the results
SELECT id, first_name, last_name, email, phone, address 
FROM users 
ORDER BY created_at DESC;
