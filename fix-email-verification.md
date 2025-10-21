# Fix Email Verification Issues

## The Problem
- User gets created in Supabase Auth but shows "waiting for verification"
- Email confirmation redirects to signin page with error
- User metadata (display name) not being saved properly

## Step 1: Check Supabase Auth Settings

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Settings**
3. Check these settings:

### Email Settings:
- **Enable email confirmations**: Should be ON
- **Email confirmation URL**: Should be `http://localhost:3000/auth/callback`
- **Email confirmation template**: Use the default template (don't customize)

### URL Configuration:
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: Add `http://localhost:3000/auth/callback`

## Step 2: Test the Email Verification Flow

1. Try signing up again with a new email
2. Check your email for the confirmation link
3. The link should look like: `http://localhost:3000/auth/callback?code=...`
4. Click the link - it should redirect to `/dashboard` (not signin page)

## Step 3: Check for Auth Errors

If you still get errors, check the browser console for:
- Any error messages in the auth callback
- Network errors when clicking the confirmation link
- Supabase client errors

## Step 4: Alternative - Disable Email Confirmation (for testing)

If you want to test without email confirmation:

1. Go to **Authentication** → **Settings**
2. Turn OFF **Enable email confirmations**
3. Test signup (should work immediately)
4. Turn it back ON when ready for production

## Step 5: Check User Metadata

After successful signup, check in Supabase:
1. Go to **Authentication** → **Users**
2. Click on your user
3. Check the **User Metadata** section - it should show:
   ```json
   {
     "first_name": "YourFirstName",
     "last_name": "YourLastName",
     "firstName": "YourFirstName", 
     "lastName": "YourLastName"
   }
   ```
