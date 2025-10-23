import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// Test endpoint to debug banking details issues
export async function GET() {
  try {
    console.log('Testing banking details API...');
    
    const cookieStore = await cookies();
    console.log('Cookie store created');
    
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

    console.log('Supabase client created');

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('User check:', { user: !!user, error: userError });
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated', details: userError },
        { status: 401 }
      );
    }

    // Test if banking_details table exists
    const { data: testData, error: testError } = await supabase
      .from('banking_details')
      .select('id')
      .limit(1);

    console.log('Table test:', { testData, testError });

    if (testError) {
      return NextResponse.json({
        error: 'Table access error',
        details: testError.message,
        code: testError.code,
        hint: testError.hint
      }, { status: 500 });
    }

    // Get user's banking details
    const { data: bankingDetails, error } = await supabase
      .from('banking_details')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('is_primary', { ascending: false })
      .order('created_at', { ascending: false });

    console.log('Banking details query:', { bankingDetails, error });

    if (error) {
      return NextResponse.json({
        error: 'Error fetching banking details',
        details: error.message,
        code: error.code
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      user_id: user.id,
      banking_details: bankingDetails,
      count: bankingDetails.length
    });

  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
