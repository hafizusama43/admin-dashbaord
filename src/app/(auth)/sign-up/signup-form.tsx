"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { RenderInput } from "@/components/form-components/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formSchema = z
  .object({
    password: z.string().min(5, { message: "Password must be at least 5 characters." }),
    email: z.coerce
      .string()
      .email({ message: "Must be a valid email." })
      .min(5, { message: "Email is required." }),
    username: z.string().min(5, { message: "Username must be at least 5 characters." }),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    confirmPassword: z
      .string()
      .min(5, { message: "Confirm password must be at least 5 characters." }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match.",
        code: "custom",
      });
    }
  });

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/register";
      if (!apiUrl) throw new Error("API base URL is not defined");

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

      toast.success("User created successfully!");
      form.reset();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to create user. Please try again.");
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
          <h1 className="text-2xl font-bold">Signup</h1>
          <small className="text-muted-foreground text-sm text-balance">
            Enter your information to create your account
          </small>
        </div>
        <div className="flex gap-3">
          <div className="w-full lg:w-1/2">
            <RenderInput form={form} name="email" label="Email" />
          </div>
          <div className="w-full lg:w-1/2">
            <RenderInput form={form} name="username" label="Username" />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-full lg:w-1/2">
            <RenderInput form={form} name="firstName" label="First name" />
          </div>
          <div className="w-full lg:w-1/2">
            <RenderInput form={form} name="lastName" label="Last name" />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-full lg:w-1/2">
            <RenderInput form={form} name="password" label="Password" />
          </div>
          <div className="w-full lg:w-1/2">
            <RenderInput form={form} name="confirmPassword" label="Confirm password" />
          </div>
        </div>
        <Button disabled type="submit" className="w-full">
          Countinue
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">or</span>
        </div>
        <Button disabled variant="outline" className="w-full">
          <Image src="/svgs/google.svg" width={20} height={20} alt="google" />
          Login with Google
        </Button>
        <div className="text-center text-sm">
          Alreadt have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
