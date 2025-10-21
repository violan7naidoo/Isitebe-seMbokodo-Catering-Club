-- Fix Row Level Security policies for user_memberships table
-- Run this in your Supabase SQL Editor

-- Enable RLS on user_memberships table
ALTER TABLE user_memberships ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own memberships" ON user_memberships;
DROP POLICY IF EXISTS "Users can insert own memberships" ON user_memberships;
DROP POLICY IF EXISTS "Users can update own memberships" ON user_memberships;

-- Create new policies
CREATE POLICY "Users can view own memberships" ON user_memberships
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own memberships" ON user_memberships
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own memberships" ON user_memberships
  FOR UPDATE USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_memberships TO anon, authenticated;
