import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { payfastService } from '@/lib/payfast';

export const runtime = 'nodejs';

// Handle PayFast payment notifications
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
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

    // Get the form data from PayFast
    const formData = await request.formData();
    const notificationData: Record<string, string> = {};
    
    for (const [key, value] of formData.entries()) {
      notificationData[key] = value.toString();
    }

    console.log('PayFast notification received:', notificationData);

    // Verify the signature
    if (!payfastService.verifyCallback(notificationData)) {
      console.error('Invalid PayFast signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const {
      m_payment_id,
      pf_payment_id,
      payment_status,
      name_first,
      name_last,
      email_address,
      amount_gross,
      amount_fee,
      amount_net
    } = notificationData;

    // Find the payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('transaction_id', m_payment_id)
      .single();

    if (paymentError || !payment) {
      console.error('Payment not found:', m_payment_id);
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Update payment status based on PayFast response
    let newStatus = 'pending';
    if (payment_status === 'COMPLETE') {
      newStatus = 'completed';
    } else if (payment_status === 'CANCELLED') {
      newStatus = 'cancelled';
    } else if (payment_status === 'FAILED') {
      newStatus = 'failed';
    }

    // Update payment record
    const { error: updateError } = await supabase
      .from('payments')
      .update({
        status: newStatus,
        payfast_payment_id: pf_payment_id,
        callback_data: notificationData,
        updated_at: new Date().toISOString()
      })
      .eq('id', payment.id);

    if (updateError) {
      console.error('Error updating payment:', updateError);
      return NextResponse.json(
        { error: 'Error updating payment' },
        { status: 500 }
      );
    }

    // If payment is completed, update membership status
    if (newStatus === 'completed') {
      const { error: membershipError } = await supabase
        .from('user_memberships')
        .update({
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', payment.membership_id);

      if (membershipError) {
        console.error('Error updating membership status:', membershipError);
      }
    }

    // Return success response to PayFast
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Error in PayFast notification handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (PayFast sometimes sends GET for notifications)
export async function GET(request: NextRequest) {
  return POST(request);
}
