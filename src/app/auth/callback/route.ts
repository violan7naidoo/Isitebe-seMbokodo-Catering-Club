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
  let redirectPath = next || '/dashboard';
  
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