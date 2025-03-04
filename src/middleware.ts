import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const secret = process.env.AUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  console.log(token)
  const { pathname } = request.nextUrl;

  if (!token && pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
      "/dashboard(.*)",        // Secure dashboard routes
      // "/api/(.*)" // Apply to all API routes (if needed)
  ],
};
