import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next')

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.isithebesembokodo.co.za')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('Error exchanging code for session:', error)
        // Redirect to login with error message
        const loginUrl = new URL('/auth/login', baseUrl)
        loginUrl.searchParams.set('error', 'email-verification-failed')
        return NextResponse.redirect(loginUrl.toString())
      } else {
        console.log('Successfully exchanged code for session:', data)
        console.log('User data:', data.user)
        console.log('User metadata:', data.user?.user_metadata)
      }
    } catch (error) {
      console.error('Error exchanging code for session:', error)
      // Redirect to login with error message
      const loginUrl = new URL('/auth/login', baseUrl)
      loginUrl.searchParams.set('error', 'email-verification-failed')
      return NextResponse.redirect(loginUrl.toString())
    }
  }

  // Always redirect to dashboard after successful auth
  let redirectPath = next || '/dashboard'
  
  let redirectUrl: URL
  try {
    redirectUrl = new URL(redirectPath, baseUrl)
  } catch {
    redirectUrl = new URL(baseUrl)
    redirectUrl.pathname = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`
  }

  return NextResponse.redirect(redirectUrl.toString())
}