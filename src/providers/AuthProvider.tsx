"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface PageProps {
  session?: Session; // Make it optional to handle cases where it might be undefined
}

interface AuthProviderProps {
  children?: ReactNode;
  pageProps?: PageProps;
}

function AuthProvider({ children, pageProps }: AuthProviderProps) {
  return (
    <SessionProvider session={pageProps?.session} basePath="/api/auth">
      {children}
    </SessionProvider>
  );
}

export default AuthProvider;
