# User Roles Error Fix ✅

## 🔧 **Issue Identified:**

### **Error:** `relation "public.user_roles" does not exist`
- **Problem:** Database trigger or RLS policy is trying to access a `user_roles` table that doesn't exist
- **Cause:** Likely from a Supabase auth trigger that expects this table to exist
- **Solution:** Create the missing `user_roles` table

## 🛠️ **Fix Applied:**

### **1. Created User Roles Table:**
```sql
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **2. Added RLS Policies:**
```sql
-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own roles" ON user_roles
    FOR SELECT USING (auth.uid() = user_id);
```

### **3. Added Default Roles:**
```sql
-- Insert default role for existing users
INSERT INTO user_roles (user_id, role)
SELECT id, 'member' 
FROM auth.users 
WHERE id NOT IN (SELECT user_id FROM user_roles)
ON CONFLICT DO NOTHING;
```

## 📋 **Next Steps:**

### **1. Run the SQL Script:**
1. **Go to Supabase Dashboard** → SQL Editor
2. **Run the contents** of `create-user-roles-table.sql`
3. **This will create** the missing `user_roles` table

### **2. Test Payment Again:**
1. **Try making a payment** again
2. **Check console logs** for any remaining errors
3. **Should now work** without the user_roles error

## 🎯 **Expected Result:**

- ✅ **No more user_roles error** - Table now exists
- ✅ **Payment creation works** - Database operations complete
- ✅ **PayFast redirect** - User gets redirected to PayFast sandbox
- ✅ **Payment processing** - Full payment flow works

The payment system should now work without the database error! 🎉
