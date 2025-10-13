import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  try {
    console.log('Checking database structure...');
    
    // Check memberships table
    console.log('\nChecking memberships table...');
    const { data: memberships, error: membershipsError } = await supabase
      .from('memberships')
      .select('*')
      .limit(1);
    
    if (membershipsError) {
      console.error('Error fetching memberships:', membershipsError);
    } else {
      console.log('Memberships table exists with columns:', memberships.length > 0 ? Object.keys(memberships[0]) : 'No data');
    }

    // Check user_memberships table
    console.log('\nChecking user_memberships table...');
    const { data: userMemberships, error: userMembershipsError } = await supabase
      .from('user_memberships')
      .select('*')
      .limit(1);
    
    if (userMembershipsError) {
      console.error('Error fetching user memberships:', userMembershipsError);
    } else {
      console.log('User memberships table exists with columns:', userMemberships.length > 0 ? Object.keys(userMemberships[0]) : 'No data');
    }

    // Check payments table
    console.log('\nChecking payments table...');
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .limit(1);
    
    if (paymentsError) {
      console.error('Error fetching payments:', paymentsError);
    } else {
      console.log('Payments table exists with columns:', payments.length > 0 ? Object.keys(payments[0]) : 'No data');
    }

    // Check users table (if you have access)
    try {
      console.log('\nChecking users table (if accessible)...');
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')
        .limit(1);
      
      if (usersError) {
        console.error('Error fetching users (this might be expected due to RLS):', usersError);
      } else {
        console.log('Users table exists with columns:', users.length > 0 ? Object.keys(users[0]) : 'No data');
      }
    } catch (error) {
      console.log('Could not access users table (this is expected with RLS)');
    }

  } catch (error) {
    console.error('Error checking database:', error);
  }
}

checkDatabase();
