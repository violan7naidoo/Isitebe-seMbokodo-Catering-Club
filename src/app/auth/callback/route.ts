import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next');

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.isithebesembokodo.co.za';
  
  // Handle password reset flow
  if (type === 'recovery' && code) {
    const redirectUrl = new URL('/auth/update-password', baseUrl);
    redirectUrl.searchParams.set('token', code);
    return NextResponse.redirect(redirectUrl.toString());
  }

  // Handle email verification
  if (type === 'signup' && code) {
    try {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      await supabase.auth.verifyOtp({
        email: requestUrl.searchParams.get('email') || '',
        token: code,
        type: 'signup',
      });
      // After successful verification, redirect to dashboard
      const dashboardUrl = new URL('/dashboard', baseUrl);
      return NextResponse.redirect(dashboardUrl.toString());
    } catch (error) {
      console.error('Error verifying email:', error);
      // If verification fails, still redirect to login but with an error message
      const loginUrl = new URL('/auth/login', baseUrl);
      loginUrl.searchParams.set('error', 'email-verification-failed');
      return NextResponse.redirect(loginUrl.toString());
    }
  }

  // Handle regular OAuth or email sign-in
  if (code) {
    try {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('Error exchanging code for session:', error);
      // Continue with redirect even if there's an error
    }
  }

  // Determine where to redirect after successful auth
  let redirectPath = next || (type === 'signup' ? '/dashboard' : '/');
  
  // Ensure the redirect path is a valid URL
  let redirectUrl: URL;
  try {
    redirectUrl = new URL(redirectPath, baseUrl);
  } catch {
    redirectUrl = new URL(baseUrl);
    redirectUrl.pathname = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`;
  }

  return NextResponse.redirect(redirectUrl.toString());
}