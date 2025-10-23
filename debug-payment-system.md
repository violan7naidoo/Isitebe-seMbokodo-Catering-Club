# Debug Payment System Issues

## 🔍 **Step-by-Step Debugging:**

### **1. Test Database Tables**
Visit: `http://localhost:3000/api/test-db`

This will show you:
- ✅ Which tables exist in your database
- ❌ Which tables are missing
- 🔍 Specific error messages for each table

### **2. Test Banking Details API**
Visit: `http://localhost:3000/api/test-banking`

This will show you:
- ✅ If authentication is working
- ✅ If the banking_details table is accessible
- 🔍 Detailed error messages

### **3. Check Server Logs**
Look at your terminal where `npm run dev` is running for:
- ❌ Database connection errors
- ❌ Table not found errors
- ❌ Authentication errors

## 🚨 **Common Issues & Solutions:**

### **Issue 1: Table Doesn't Exist**
**Error:** `relation "banking_details" does not exist`
**Solution:** Run the SQL script in Supabase dashboard

### **Issue 2: RLS Policy Issues**
**Error:** `new row violates row-level security policy`
**Solution:** Check RLS policies are set up correctly

### **Issue 3: Authentication Issues**
**Error:** `Not authenticated`
**Solution:** Check if user is logged in properly

### **Issue 4: Environment Variables**
**Error:** `NEXT_PUBLIC_SUPABASE_URL is not defined`
**Solution:** Check your `.env.local` file

## 🔧 **Quick Fixes:**

### **Fix 1: Run SQL Script**
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the content from `setup-banking-payment-system-safe.sql`
3. Click "Run"

### **Fix 2: Check Environment Variables**
Make sure your `.env.local` has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### **Fix 3: Restart Development Server**
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## 📋 **Debugging Checklist:**

- [ ] Database tables exist (test-db endpoint)
- [ ] Authentication works (test-banking endpoint)
- [ ] Environment variables are set
- [ ] SQL script has been run
- [ ] Development server is running
- [ ] User is logged in

## 🎯 **Next Steps:**

1. **Run the test endpoints** to identify the specific issue
2. **Check the server logs** for detailed error messages
3. **Fix the identified issue** based on the error
4. **Test the payment system** again

Let me know what the test endpoints show and I'll help you fix the specific issue! 🚀
