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

    // Get user's membership with plan details
    const { data: membership, error } = await supabase
      .from('user_memberships')
      .select(`
        *,
        plan:membership_plans(*)
      `)
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user membership:', error);
      return NextResponse.json(
        { error: 'Error fetching membership' },
        { status: 500 }
      );
    }

    return NextResponse.json(membership);
  } catch (error) {
    console.error('Error in user membership API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    const { plan_id } = await request.json();

    if (!plan_id) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Check if user already has a membership
    const { data: existingMembership } = await supabase
      .from('user_memberships')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (existingMembership) {
      return NextResponse.json(
        { error: 'User already has a membership' },
        { status: 400 }
      );
    }

    // Get the plan details
    const { data: plan, error: planError } = await supabase
      .from('membership_plans')
      .select('*')
      .eq('id', plan_id)
      .single();

    if (planError || !plan) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
        { status: 400 }
      );
    }

    // Get user details for membership number
    const { data: userDetails } = await supabase
      .from('users')
      .select('first_name, last_name')
      .eq('id', user.id)
      .single();

    // Calculate dates based on billing cycle
    const startDate = new Date();
    const endDate = new Date();
    
    // Handle different billing cycles
    if (plan.billing_cycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (plan.billing_cycle === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      // Default to 1 month if billing_cycle is not specified
      endDate.setMonth(endDate.getMonth() + 1);
    }

    // Generate user-friendly membership number
    const generateMembershipNumber = () => {
      const firstName = userDetails?.first_name || user.user_metadata?.first_name || user.user_metadata?.firstName || 'USER';
      const lastName = userDetails?.last_name || user.user_metadata?.last_name || user.user_metadata?.lastName || 'MEMBER';
      
      // Get first 3 letters of first name and last name
      const firstInitial = firstName.substring(0, 3).toUpperCase();
      const lastInitial = lastName.substring(0, 3).toUpperCase();
      
      // Get first 3 letters of plan name
      const planInitial = plan.name.substring(0, 3).toUpperCase().replace(/\s/g, '');
      
      // Get current year
      const currentYear = new Date().getFullYear().toString().slice(-2);
      
      // Generate a short random number (2 digits)
      const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
      
      return `${firstInitial}${lastInitial}-${planInitial}-${currentYear}${randomNum}`;
    };

    // Create membership
    const { data: membership, error: membershipError } = await supabase
      .from('user_memberships')
      .insert({
        user_id: user.id,
        plan_id: plan_id,
        status: 'active',
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        auto_renew: false,
        membership_number: generateMembershipNumber(),
      })
      .select(`
        *,
        plan:membership_plans(*)
      `)
      .single();

    if (membershipError) {
      console.error('Error creating membership:', membershipError);
      return NextResponse.json(
        { error: 'Error creating membership' },
        { status: 500 }
      );
    }

    return NextResponse.json(membership);
  } catch (error) {
    console.error('Error in create membership API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
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

    const { action } = await request.json();

    if (action === 'deactivate') {
      // Deactivate user's membership
      const { data: membership, error: membershipError } = await supabase
        .from('user_memberships')
        .update({ 
          status: 'inactive',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select(`
          *,
          plan:membership_plans(*)
        `)
        .single();

      if (membershipError) {
        console.error('Error deactivating membership:', membershipError);
        return NextResponse.json(
          { error: 'Error deactivating membership' },
          { status: 500 }
        );
      }

      return NextResponse.json(membership);
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in update membership API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
