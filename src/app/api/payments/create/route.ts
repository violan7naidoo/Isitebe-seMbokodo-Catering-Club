import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { payfastService } from '@/lib/payfast';

export const runtime = 'nodejs';

// Create a new payment and generate PayFast URL
export async function POST(request: NextRequest) {
  try {
    console.log('Payment creation request received');
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
      membership_id,
      amount,
      description,
      payment_type = 'membership_payment'
    } = await request.json();

    console.log('Payment request data:', { membership_id, amount, description, payment_type });

    // Validate required fields
    if (!membership_id || !amount || !description) {
      console.error('Missing required fields:', { membership_id, amount, description });
      return NextResponse.json(
        { error: 'Membership ID, amount, and description are required' },
        { status: 400 }
      );
    }

    // Get user's membership details
    const { data: membership, error: membershipError } = await supabase
      .from('user_memberships')
      .select(`
        *,
        plan:membership_plans(*)
      `)
      .eq('id', membership_id)
      .eq('user_id', user.id)
      .single();

    if (membershipError || !membership) {
      console.error('Membership error:', membershipError);
      return NextResponse.json(
        { error: 'Membership not found' },
        { status: 404 }
      );
    }

    console.log('Membership found:', membership.id);

    // Get user profile for payment details
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('first_name, last_name, email, phone')
      .eq('id', user.id)
      .single();

    if (profileError || !userProfile) {
      console.error('User profile error:', profileError);
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    console.log('User profile found:', userProfile.email);

    // Generate unique payment ID
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        membership_id: membership_id,
        amount: amount,
        currency: 'ZAR',
        payment_method: 'payfast',
        status: 'pending',
        transaction_id: paymentId,
        description: description,
        payfast_merchant_id: process.env.PAYFAST_MERCHANT_ID,
        payfast_merchant_key: process.env.PAYFAST_MERCHANT_KEY,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments/cancel`,
        notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/notify`,
        payment_method_details: {
          payment_type,
          membership_plan: membership.plan.name,
          membership_number: membership.membership_number
        }
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error creating payment:', paymentError);
      return NextResponse.json(
        { error: 'Error creating payment', details: paymentError.message },
        { status: 500 }
      );
    }

    console.log('Payment created successfully:', payment.id);

    // Generate PayFast payment URL
    const payfastData = payfastService.createPaymentData({
      firstName: userProfile.first_name || '',
      lastName: userProfile.last_name || '',
      email: userProfile.email,
      phone: userProfile.phone || '',
      amount: amount,
      itemName: `${membership.plan.name} Membership`,
      itemDescription: description,
      paymentId: paymentId,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments/cancel`,
      notifyUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/notify`,
      customData: {
        membership_id: membership_id,
        user_id: user.id,
        payment_id: payment.id
      }
    });

    const payfastUrl = payfastService.generatePaymentUrl(payfastData);
    console.log('PayFast URL generated:', payfastUrl);

    // Update payment with PayFast signature
    const signature = payfastService.generateSignature(payfastData);
    await supabase
      .from('payments')
      .update({ payfast_signature: signature })
      .eq('id', payment.id);

    console.log('Payment process completed successfully');

    return NextResponse.json({
      payment_id: payment.id,
      payfast_url: payfastUrl,
      payment_data: payfastData
    });
  } catch (error) {
    console.error('Error in create payment API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
