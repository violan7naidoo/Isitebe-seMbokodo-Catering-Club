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
      phone: profile.phone || null,
      address: profile.address || null,
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

    const { first_name, last_name, email, phone, address, currentPassword, newPassword } = await request.json();

    // Build update object with only provided fields
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    // Only include fields that are provided in the request
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;

    // Update user profile in users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .update(updateData)
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
    if (email !== undefined && email !== user.email) {
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

    // If password is being changed, verify current password first
    if (newPassword !== undefined && currentPassword !== undefined) {
      // First, verify the current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: currentPassword
      });

      if (signInError) {
        console.error('Current password verification failed:', signInError);
        return NextResponse.json(
          { error: 'Current password is incorrect. Please try again.' },
          { status: 400 }
        );
      }

      // If current password is correct, update to new password
      const { error: passwordError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (passwordError) {
        console.error('Error updating password:', passwordError);
        return NextResponse.json(
          { error: 'Error updating password. Please try again.' },
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
      email: email !== undefined ? email : updatedProfile.email,
      first_name: updatedProfile.first_name,
      last_name: updatedProfile.last_name,
      phone: updatedProfile.phone || null,
      address: updatedProfile.address || null,
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
