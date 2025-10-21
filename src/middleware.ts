import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const url = req.nextUrl.pathname

  // If user is not signed in and the current path starts with /dashboard
  if (!session && url.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // If user is signed in and the current path is /auth
  if (session && url.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
