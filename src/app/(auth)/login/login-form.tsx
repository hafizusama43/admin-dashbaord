"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { RenderInput } from "@/components/form-components/input";
import { useForm } from "react-hook-form";
import { Spin } from "@/components/ui/spin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  password: z.string().min(5, { message: "Password must be at least 5 characters." }),
  email: z.coerce
    .string()
    .email({ message: "Must be a valid email." })
    .min(5, { message: "Email is required." }),
});

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        // callbackUrl: "/"
      });
      if (res?.error && res.error === "CredentialsSignin") {
        toast.error("Invalid credentials!");
        setLoading(false);
      } else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col space-y-4", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <small className="text-muted-foreground text-sm text-balance">
            Enter your credentials below to login to your account
          </small>
        </div>

        <RenderInput form={form} name="email" label="Email" />
        <RenderInput form={form} name="password" label="Password" />
        <div className="flex items-center">
          <Link href="/forgot-password" className="ml-auto text-sm hover:underline">
            Forgot your password?
          </Link>
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Spin size="sm" /> : "Login"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">or</span>
        </div>
        <Button disabled variant="outline" className="w-full">
          <Image src="/svgs/google.svg" width={20} height={20} alt="google" />
          Login with Google
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
