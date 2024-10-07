// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value; // Replace 'token' with the name of the token you're using
//   const { pathname } = req.nextUrl;

//   // If no token and not accessing the login page, redirect to login
//   if (!token && pathname !== '/login') {
//     return NextResponse.redirect(new URL('/', req.url));
//   }


//   return NextResponse.next(); // Allow access to the requested page if authenticated
// }

// // Apply middleware to all routes except static assets and API routes
// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico).*)', // Exclude static files, API routes, and favicon
//   ],
};
