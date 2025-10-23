-- Simple fix for user_roles table
-- Run this in your Supabase SQL Editor

-- Check if user_roles table exists, if not create it
DO $$ 
BEGIN
    -- Create the table if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_name = 'user_roles' 
        AND table_schema = 'public'
    ) THEN
        CREATE TABLE user_roles (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
            role TEXT NOT NULL DEFAULT 'member',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
        
        -- Create policies
        CREATE POLICY "Users can view own roles" ON user_roles
            FOR SELECT USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can insert own roles" ON user_roles
            FOR INSERT WITH CHECK (auth.uid() = user_id);
            
        CREATE POLICY "Users can update own roles" ON user_roles
            FOR UPDATE USING (auth.uid() = user_id);
        
        -- Grant permissions
        GRANT USAGE ON SCHEMA public TO anon, authenticated;
        GRANT ALL ON public.user_roles TO anon, authenticated;
        
        RAISE NOTICE 'user_roles table created successfully';
    ELSE
        RAISE NOTICE 'user_roles table already exists';
    END IF;
END $$;

-- Insert default role for existing users (only if they don't already have a role)
INSERT INTO user_roles (user_id, role)
SELECT id, 'member' 
FROM auth.users 
WHERE id NOT IN (SELECT user_id FROM user_roles)
ON CONFLICT DO NOTHING;
