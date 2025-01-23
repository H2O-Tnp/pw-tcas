import { NextResponse, NextRequest } from 'next/server';

import { auth } from '#/auth';
import { userAgent } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Check if the user is authenticated
  const isAuthenticated = !!session;
  // console.log(session);
  // console.log("Auth : ", isAuthenticated);

  // Redirect unauthenticated users to login page if they're accessing a protected route
  if (!isAuthenticated && pathname !== '/auth/login') {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // // Redirect authenticated users from the login page to the home page
  if (isAuthenticated && (pathname === '/' || pathname === '/auth/login')) {
    const homeUrl = new URL('/main/home', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // browser check
  const { browser } = userAgent(request);
  const browserName = browser.name || 'Unknown Browser';

  // Add browserName to a custom header
  const response = NextResponse.next();
  response.headers.set('x-browser-name', browserName);

  return response;
}

// Apply the middleware only to specific routes
export const config = {
  matcher: ['/', '/auth/login','/auth/logout', '/main/:path*'],
};
