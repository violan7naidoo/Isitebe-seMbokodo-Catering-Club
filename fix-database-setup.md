# Fix Database Setup

## Step 1: Set up the users table

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Run the updated SQL script from `setup-users-table.sql` (the one without triggers)

## Step 2: Verify the table was created

1. Go to **Table Editor** in your Supabase dashboard
2. Look for the `users` table
3. Check that it has the correct columns:
   - id (UUID, Primary Key)
   - email (Text)
   - first_name (Text)
   - last_name (Text)
   - membership_number (Text, Unique)
   - created_at (Timestamp)
   - updated_at (Timestamp)

## Step 3: Test the signup flow

1. Try signing up again
2. The signup should work without the "Database error saving new user" error
3. After email confirmation, you should be redirected to the dashboard
4. Check the `users` table - you should see your user record there

## What was changed:

- ✅ Removed the problematic database trigger
- ✅ Made user profile creation non-blocking
- ✅ Added error handling to prevent auth failures
- ✅ Simplified the database setup

The authentication should now work smoothly without database errors!
