import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHomepage =
        nextUrl.pathname.startsWith('/') && nextUrl.pathname.endsWith('/');
      const isOnLogin = nextUrl.pathname.startsWith('/auth/login');
      // console.log(isOnLogin);

      if (isOnHomepage) {
        if (isLoggedIn) {
          // console.log('Go home');
          return Response.redirect(new URL('/student/home', nextUrl));
        }
        // console.log('Redirect to login page');
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (isOnLogin) {
          // console.log('why');
          return Response.redirect(new URL('/student/home', nextUrl));
        }
        // console.log('normal');
        return true;
      }
      // console.log('Not login');
      return false;
    },
  },
  providers: [Google], // Add providers with an empty array for now
} satisfies NextAuthConfig;
