-- Test if we can create a user manually
-- This will help identify if the issue is with the database or auth flow

-- First, let's see what's in the auth.users table
SELECT id, email, created_at, raw_user_meta_data 
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;

-- Check if the users table exists and is accessible
SELECT * FROM users LIMIT 1;

-- Test inserting a user manually (replace with actual values)
-- INSERT INTO users (id, email, first_name, last_name) 
-- VALUES ('00000000-0000-0000-0000-000000000000', 'test@example.com', 'Test', 'User');

-- Check for any existing triggers
SELECT trigger_name, event_manipulation, action_statement 
FROM information_schema.triggers 
WHERE event_object_table = 'users';

-- Check for any existing functions
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%user%';
