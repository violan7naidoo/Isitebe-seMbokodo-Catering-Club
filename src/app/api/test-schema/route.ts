import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
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
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Check if payment_method column exists by trying to select it
    const { data: membership, error } = await supabase
      .from('user_memberships')
      .select('id, payment_method')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Schema check error:', error);
      return NextResponse.json({
        error: 'Schema check failed',
        details: error.message,
        code: error.code
      });
    }

    return NextResponse.json({
      success: true,
      membership,
      message: 'payment_method column exists'
    });

  } catch (error) {
    console.error('Error in schema test API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}
