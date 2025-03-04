"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export function ForgotPassForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const [linkSent, setLinkSent] = useState<boolean>(false);
  const handleSubmit = () => {
    setLinkSent(true);
  };

  return (
    <React.Fragment>
      {linkSent ? (
        <React.Fragment>
          <div className="flex flex-col items-center justify-center gap-3">
            <Image width={40} height={40} src="/svgs/success.svg" alt=".." className="" />
            <p className="text-center text-green-700">
              A password reset link has been sent to your email address.
              <br />
              Click the link to reset your password
            </p>
          </div>
          <Separator className="my-3" />
          <div className="text-center text-sm">
            Go back to login? &nbsp;
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </React.Fragment>
      ) : (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Forgot password</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to reset your password
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </div>
          <div className="text-center text-sm">
            Go back to login? &nbsp;
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </form>
      )}
    </React.Fragment>
  );
}
