// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';


// export default NextAuth(authConfig).auth;

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

// import { NextResponse, NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // Check if the pathname is the root (`/`)
//   if (request.nextUrl.pathname === '/') {
//     // Redirect the user to another page (e.g., '/home')
//     const url = request.nextUrl.clone();
//     url.pathname = '/home'; // Replace with your desired path
//     return NextResponse.redirect(url);
//   }

//   // Allow other routes to proceed
//   return NextResponse.next();
// }

import { NextResponse, NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

import { auth } from '#/auth';

export async function middleware(request: NextRequest) {
  // const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const session = await auth();
  // console.log(token);
  const { pathname } = request.nextUrl;

  // Check if the user is authenticated
  // const isAuthenticated = !!token;
  const isAuthenticated = !!session;
  // console.log(
  //   '%c dd',
  //   `background: #ddd; color: #000; padding: 4px; border-radius: 2px`
  // );
  console.log(session);
  console.log("Auth : ", isAuthenticated);

  // Redirect unauthenticated users to login page if they're accessing a protected route
  if (!isAuthenticated && pathname !== '/auth/login') {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }


  // // Redirect authenticated users from the login page to the home page
  if (isAuthenticated && (pathname === '/' || pathname === '/auth/login')) {
    const homeUrl = new URL('/student/home', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // // browser check
  // const { browser } = userAgent(request);
  // const browserName = browser.name || 'Unknown Browser';

  // // Add browserName to a custom header
  // const response = NextResponse.next();
  // response.headers.set('x-browser-name', browserName);

  // return response;
}

// Apply the middleware only to specific routes
export const config = {
  matcher: ['/', '/auth/login','/auth/logout', '/student/:path*'],
};
