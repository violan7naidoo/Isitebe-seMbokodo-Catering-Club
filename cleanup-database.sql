-- Clean up existing database setup
-- Run this in your Supabase SQL Editor to remove all existing triggers and functions

-- Drop all triggers on users table first
DROP TRIGGER IF EXISTS set_membership_number ON users;
DROP TRIGGER IF EXISTS handle_new_user ON users;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function with CASCADE to remove all dependencies
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Drop any other user-related functions
DROP FUNCTION IF EXISTS public.set_membership_number() CASCADE;

-- Drop existing policies on users table
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Drop the users table completely (this will delete all data)
DROP TABLE IF EXISTS users CASCADE;

-- Now create a fresh users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  membership_number TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create fresh policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO anon, authenticated;
