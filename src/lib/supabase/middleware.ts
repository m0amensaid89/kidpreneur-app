import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/signup') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user) {
    // Check if the user has a profile and name setup
    // We only need to redirect if they're not already on the onboarding page
    // and they don't have a profile
    const isAuthRoute = request.nextUrl.pathname === '/' ||
                        request.nextUrl.pathname.startsWith('/login') ||
                        request.nextUrl.pathname.startsWith('/signup');

    const isOnboardingRoute = request.nextUrl.pathname.startsWith('/onboarding');
    const isApiRoute = request.nextUrl.pathname.startsWith('/api');

    // Skip checking for static assets or API routes just in case
    if (!isApiRoute) {
      try {
        // As requested by instructions, use the API route. We make an absolute URL
        // for fetch during SSR middleware.
        const apiUrl = new URL('/api/check-profile', request.url);

        // Pass the auth cookie to the API route so it can check
        const cookieHeader = request.headers.get('cookie') || '';

        const res = await fetch(apiUrl.toString(), {
          headers: {
            cookie: cookieHeader,
          },
        });

        const data = await res.json();
        const hasProfile = data.hasProfile;

        if (!hasProfile && !isOnboardingRoute) {
          const url = request.nextUrl.clone()
          url.pathname = '/onboarding'
          return NextResponse.redirect(url)
        }

        if (hasProfile && (isAuthRoute || isOnboardingRoute)) {
          const url = request.nextUrl.clone()
          url.pathname = '/home'
          return NextResponse.redirect(url)
        }
      } catch (e) {
        console.error("Middleware profile check failed:", e);
      }
    }
  }

  return supabaseResponse
}
