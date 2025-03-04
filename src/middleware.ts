import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const secret = process.env.AUTH_SECRET;

export async function middleware(request: NextRequest) {
  const user = await getToken({ req: request, secret });

  if (!user || user.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard(.*)", // Secure dashboard routes
  ],
};
