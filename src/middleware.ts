import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromCookie } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const user = await getUserFromCookie(request);
    const staffRoles = ['admin', 'content_manager', 'viewer'] as const;
    if (!user || !staffRoles.includes(user.role as (typeof staffRoles)[number])) {
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
