-- Fix all Row Level Security policies for payment system
-- Run this in your Supabase SQL Editor

-- Fix payments table RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
DROP POLICY IF EXISTS "Users can insert own payments" ON payments;
DROP POLICY IF EXISTS "Users can update own payments" ON payments;
DROP POLICY IF EXISTS "Users can delete own payments" ON payments;

-- Create new policies for payments table
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments" ON payments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payments" ON payments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own payments" ON payments
    FOR DELETE USING (auth.uid() = user_id);

-- Fix banking_details table RLS
ALTER TABLE banking_details ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own banking details" ON banking_details;
DROP POLICY IF EXISTS "Users can insert own banking details" ON banking_details;
DROP POLICY IF EXISTS "Users can update own banking details" ON banking_details;
DROP POLICY IF EXISTS "Users can delete own banking details" ON banking_details;

-- Create new policies for banking_details table
CREATE POLICY "Users can view own banking details" ON banking_details
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own banking details" ON banking_details
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own banking details" ON banking_details
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own banking details" ON banking_details
    FOR DELETE USING (auth.uid() = user_id);

-- Fix user_memberships table RLS
ALTER TABLE user_memberships ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own memberships" ON user_memberships;
DROP POLICY IF EXISTS "Users can insert own memberships" ON user_memberships;
DROP POLICY IF EXISTS "Users can update own memberships" ON user_memberships;
DROP POLICY IF EXISTS "Users can delete own memberships" ON user_memberships;

-- Create new policies for user_memberships table
CREATE POLICY "Users can view own memberships" ON user_memberships
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own memberships" ON user_memberships
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own memberships" ON user_memberships
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own memberships" ON user_memberships
    FOR DELETE USING (auth.uid() = user_id);

-- Grant necessary permissions for all tables
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.payments TO anon, authenticated;
GRANT ALL ON public.banking_details TO anon, authenticated;
GRANT ALL ON public.user_memberships TO anon, authenticated;
GRANT ALL ON public.user_roles TO anon, authenticated;
