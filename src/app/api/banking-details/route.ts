import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

// Get user's banking details
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

    // Get user's banking details
    const { data: bankingDetails, error } = await supabase
      .from('banking_details')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('is_primary', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching banking details:', error);
      return NextResponse.json(
        { error: 'Error fetching banking details' },
        { status: 500 }
      );
    }

    return NextResponse.json(bankingDetails);
  } catch (error) {
    console.error('Error in banking details API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add new banking details
export async function POST(request: NextRequest) {
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

    const {
      bank_name,
      account_holder_name,
      account_number,
      branch_code,
      account_type,
      is_primary = false
    } = await request.json();

    // Validate required fields
    if (!bank_name || !account_holder_name || !account_number || !branch_code || !account_type) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Validate account type
    if (!['savings', 'cheque', 'business'].includes(account_type)) {
      return NextResponse.json(
        { error: 'Invalid account type' },
        { status: 400 }
      );
    }

    // If this is set as primary, unset other primary accounts
    if (is_primary) {
      await supabase
        .from('banking_details')
        .update({ is_primary: false })
        .eq('user_id', user.id);
    }

    // Create new banking details
    const { data: bankingDetail, error } = await supabase
      .from('banking_details')
      .insert({
        user_id: user.id,
        bank_name,
        account_holder_name,
        account_number,
        branch_code,
        account_type,
        is_primary,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating banking details:', error);
      return NextResponse.json(
        { error: 'Error creating banking details' },
        { status: 500 }
      );
    }

    return NextResponse.json(bankingDetail);
  } catch (error) {
    console.error('Error in create banking details API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update banking details
export async function PATCH(request: NextRequest) {
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

    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Banking detail ID is required' },
        { status: 400 }
      );
    }

    // If setting as primary, unset other primary accounts
    if (updateData.is_primary) {
      await supabase
        .from('banking_details')
        .update({ is_primary: false })
        .eq('user_id', user.id);
    }

    // Update banking details
    const { data: bankingDetail, error } = await supabase
      .from('banking_details')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating banking details:', error);
      return NextResponse.json(
        { error: 'Error updating banking details' },
        { status: 500 }
      );
    }

    return NextResponse.json(bankingDetail);
  } catch (error) {
    console.error('Error in update banking details API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete banking details
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Banking detail ID is required' },
        { status: 400 }
      );
    }

    // Soft delete by setting is_active to false
    const { error } = await supabase
      .from('banking_details')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting banking details:', error);
      return NextResponse.json(
        { error: 'Error deleting banking details' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete banking details API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
