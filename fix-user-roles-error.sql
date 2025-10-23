-- Fix user_roles table error
-- Run this in your Supabase SQL Editor

-- Check if there are any triggers or functions referencing user_roles
-- First, let's see what's causing the issue

-- Check for any triggers on auth.users that might reference user_roles
SELECT 
    trigger_name, 
    event_manipulation, 
    action_statement 
FROM information_schema.triggers 
WHERE event_object_table = 'users' 
AND action_statement LIKE '%user_roles%';

-- Check for any functions that reference user_roles
SELECT 
    routine_name, 
    routine_definition 
FROM information_schema.routines 
WHERE routine_definition LIKE '%user_roles%';

-- If there are any triggers or functions causing this, we need to drop them
-- Let's create a simple user_roles table to satisfy any references
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles
CREATE POLICY "Users can view own roles" ON user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roles" ON user_roles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own roles" ON user_roles
    FOR UPDATE USING (auth.uid() = user_id);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_roles TO anon, authenticated;

-- Insert a default role for existing users
INSERT INTO user_roles (user_id, role)
SELECT id, 'member' 
FROM auth.users 
WHERE id NOT IN (SELECT user_id FROM user_roles)
ON CONFLICT DO NOTHING;

-- Create a trigger to automatically create user_roles when a new user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into users table
    INSERT INTO public.users (id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', '')
    );
    
    -- Insert into user_roles table
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'member');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
