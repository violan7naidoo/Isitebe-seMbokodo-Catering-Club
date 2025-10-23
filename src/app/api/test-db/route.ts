import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// Test endpoint to check database tables
export async function GET() {
  try {
    console.log('Testing database tables...');
    
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({
        error: 'Not authenticated',
        details: userError
      }, { status: 401 });
    }

    const results: any = {
      user_id: user.id,
      tables: {}
    };

    // Test banking_details table
    try {
      const { data: bankingData, error: bankingError } = await supabase
        .from('banking_details')
        .select('id')
        .limit(1);
      
      results.tables.banking_details = {
        exists: !bankingError,
        error: bankingError?.message,
        code: bankingError?.code
      };
    } catch (err) {
      results.tables.banking_details = {
        exists: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }

    // Test payments table
    try {
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('id')
        .limit(1);
      
      results.tables.payments = {
        exists: !paymentsError,
        error: paymentsError?.message,
        code: paymentsError?.code
      };
    } catch (err) {
      results.tables.payments = {
        exists: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }

    // Test user_memberships table
    try {
      const { data: membershipData, error: membershipError } = await supabase
        .from('user_memberships')
        .select('id')
        .limit(1);
      
      results.tables.user_memberships = {
        exists: !membershipError,
        error: membershipError?.message,
        code: membershipError?.code
      };
    } catch (err) {
      results.tables.user_memberships = {
        exists: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }

    return NextResponse.json(results);

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
