// import type { NextAuthConfig } from 'next-auth';
// import Google from 'next-auth/providers/google';

// export const authConfig = {
//   pages: {
//     signIn: '/auth/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnHomepage = nextUrl.pathname.startsWith('/') && nextUrl.pathname.endsWith('/');
//       const isOnLogin = nextUrl.pathname.startsWith('/auth/login');
//       // console.log(isOnForm);

//       if (isOnHomepage) {
//         if (isLoggedIn) {
//           // console.log('Go home');
//           return Response.redirect(new URL('/student/home', nextUrl));
//         }
//         // console.log('Redirect to login page');
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         if (isOnLogin) {
//           // console.log('why');
//           return Response.redirect(new URL('/student/home', nextUrl));
//         }
//         // console.log('normal');
//         return true;
//       }
//       // console.log('Not login');
//       return false;
//     },
//   },
//   providers: [Google], // Add providers with an empty array for now
// } satisfies NextAuthConfig;

import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   // const urlPath = nextUrl.pathname;
    //   const isLoggedIn = !!auth?.user;
    //   const isOnLogin = nextUrl.pathname.startsWith('/auth/login');
    //   const isOnHomepage = nextUrl.pathname === '/';

    //   // Handle redirection
    //   if (isOnHomepage && isLoggedIn) return Response.redirect(new URL('/student/home', nextUrl));
    //   if (isOnLogin && isLoggedIn) return Response.redirect(new URL('/student/home', nextUrl));

    //   return isLoggedIn || isOnLogin; // Allow login or require auth
    // },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
} satisfies NextAuthConfig;