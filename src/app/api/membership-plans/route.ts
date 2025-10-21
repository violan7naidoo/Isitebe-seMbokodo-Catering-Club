import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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

    // Get all available membership plans
    const { data: plans, error } = await supabase
      .from('membership_plans')
      .select('*')
      .order('price', { ascending: true });

    if (error) {
      console.error('Error fetching membership plans:', error);
      return NextResponse.json(
        { error: 'Error fetching membership plans' },
        { status: 500 }
      );
    }

    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error in membership plans API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
