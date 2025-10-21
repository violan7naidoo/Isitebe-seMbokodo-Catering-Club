# Supabase Database Error Troubleshooting

## Step 1: Clean up the database completely

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Run the `cleanup-database.sql` script
4. This will remove all existing triggers, functions, and the users table

## Step 2: Check Supabase Auth Settings

1. Go to **Authentication** → **Settings** in your Supabase dashboard
2. Check the following settings:

### Email Settings:
- **Enable email confirmations**: Should be ON
- **Email confirmation URL**: Should be `http://localhost:3000/auth/callback` (for development)
- **Email confirmation template**: Make sure it's not custom

### User Management:
- **Enable user signups**: Should be ON
- **Enable email confirmations**: Should be ON

## Step 3: Check for Custom Auth Hooks

1. Go to **Database** → **Functions** in your Supabase dashboard
2. Look for any functions that might be interfering with user creation
3. If you see any functions like `handle_new_user` or similar, delete them

## Step 4: Check for Database Triggers

1. Go to **Database** → **Triggers** in your Supabase dashboard
2. Look for any triggers on the `auth.users` table
3. Delete any triggers that might be causing issues

## Step 5: Test with a simple signup

After cleanup, try signing up again. The error should be resolved.

## Step 6: If the error persists

The issue might be in your Supabase project configuration. Check:

1. **Project Settings** → **API** → Make sure your API keys are correct
2. **Authentication** → **URL Configuration** → Make sure your site URL is set correctly
3. **Database** → **Extensions** → Make sure no conflicting extensions are enabled

## Alternative: Disable email confirmation temporarily

If you want to test without email confirmation:

1. Go to **Authentication** → **Settings**
2. Turn OFF **Enable email confirmations**
3. Test signup (should work immediately)
4. Turn it back ON when ready for production
