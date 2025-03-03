'use client'

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import Image from "next/image"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { RenderInput } from "@/components/form-components/input"
import { useForm } from "react-hook-form"


const formSchema = z.object({
    password: z.string().min(5, { message: "Password must be at least 5 characters." }),
    email: z.coerce.string().email({ message: "Must be a valid email." }).min(5, { message: "Email is required." }),
})


export function SignupForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col space-y-4 ", className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Signup</h1>
                    <small className="text-balance text-sm text-muted-foreground">
                        Enter your information to create your account
                    </small>
                </div>
                <RenderInput form={form} name="email" label="Email" />
                <RenderInput form={form} name="password" label="Password" />
                <Button type="submit" className="w-full">
                    Countinue
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        or
                    </span>
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
    )
}
