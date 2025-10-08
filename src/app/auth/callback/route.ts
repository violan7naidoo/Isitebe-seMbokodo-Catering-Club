import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Get the base URL from environment or use a default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.isithebesembokodo.co.za';
  
  // Construct the redirect URL, ensuring it's a valid URL
  let redirectUrl: URL;
  try {
    // If next is a full URL, use it directly
    redirectUrl = new URL(next, baseUrl);
  } catch {
    // If next is a path, append it to the base URL
    redirectUrl = new URL(baseUrl);
    redirectUrl.pathname = next.startsWith('/') ? next : `/${next}`;
  }

  return NextResponse.redirect(redirectUrl.toString());
}