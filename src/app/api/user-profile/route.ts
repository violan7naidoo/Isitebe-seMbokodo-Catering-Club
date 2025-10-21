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

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      return NextResponse.json(
        { error: 'Error fetching profile' },
        { status: 500 }
      );
    }

    // Get user's membership information separately
    const { data: membership, error: membershipError } = await supabase
      .from('user_memberships')
      .select('status, membership_number')
      .eq('user_id', user.id)
      .single();

    // Don't fail if no membership found
    if (membershipError && membershipError.code !== 'PGRST116') {
      console.error('Error fetching membership:', membershipError);
    }

    // Format the response
    const formattedProfile = {
      id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      membership_number: membership?.membership_number || null,
      membership_status: membership?.status || null,
    };

    return NextResponse.json(formattedProfile);
  } catch (error) {
    console.error('Error in user profile API:', error);
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

    const { first_name, last_name, email } = await request.json();

    // Update user profile in users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .update({
        first_name: first_name || null,
        last_name: last_name || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (profileError) {
      console.error('Error updating user profile:', profileError);
      return NextResponse.json(
        { error: 'Error updating profile' },
        { status: 500 }
      );
    }

    // If email is being changed, update auth user
    if (email && email !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({
        email: email
      });

      if (emailError) {
        console.error('Error updating email:', emailError);
        return NextResponse.json(
          { error: 'Error updating email' },
          { status: 500 }
        );
      }
    }

    // Get updated profile
    const { data: updatedProfile, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching updated profile:', fetchError);
      return NextResponse.json(
        { error: 'Error fetching updated profile' },
        { status: 500 }
      );
    }

    // Get updated membership information separately
    const { data: membership, error: membershipError } = await supabase
      .from('user_memberships')
      .select('status, membership_number')
      .eq('user_id', user.id)
      .single();

    // Don't fail if no membership found
    if (membershipError && membershipError.code !== 'PGRST116') {
      console.error('Error fetching membership:', membershipError);
    }

    // Format the response
    const formattedProfile = {
      id: updatedProfile.id,
      email: email || updatedProfile.email,
      first_name: updatedProfile.first_name,
      last_name: updatedProfile.last_name,
      created_at: updatedProfile.created_at,
      updated_at: updatedProfile.updated_at,
      membership_number: membership?.membership_number || null,
      membership_status: membership?.status || null,
    };

    return NextResponse.json(formattedProfile);
  } catch (error) {
    console.error('Error in update user profile API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
