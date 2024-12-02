import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHomepage = nextUrl.pathname.startsWith('/home');
      if (isOnHomepage) {
        if (isLoggedIn) {
          console.log('Logged in');
          return true;
        }
        console.log('Redirect to login page');
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log('normal');
        return true;
      }
      console.log('Redirect to login page');
      return false;
    },
  },
  providers: [Google], // Add providers with an empty array for now
} satisfies NextAuthConfig;
