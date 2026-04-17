import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    try {
      const session = request.cookies.get('session');
      
      if (!session) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Parse session cookie to get user role
      let user: any = null;
      try {
        user = JSON.parse(session.value);
      } catch {
        // If it's a Firebase session cookie (JWT), we can't parse it client-side
        // Allow access and let client-side auth handle verification
        return NextResponse.next();
      }

      // If we successfully parsed it, check the role
      const staffRoles = ['admin', 'content_manager', 'viewer'] as const;
      if (!user || !staffRoles.includes(user.role?.toLowerCase() as (typeof staffRoles)[number])) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      // If auth check fails, redirect to login
      console.error('[Middleware] Auth check failed:', error);
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
