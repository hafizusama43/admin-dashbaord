'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React, { useState } from "react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { RenderInput } from "@/components/form-components/input"

const formSchema = z.object({
    password: z.string().min(5, { message: "Password must be at least 5 characters." }),
    c_password: z.string().min(5, { message: "Confirm password must be at least 5 characters." }),
})

export function ResetPassForm() {
    const [linkSent, setLinkSent] = useState<boolean>(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            c_password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        setLinkSent(true)
    }

    return (
        <React.Fragment>
            {linkSent ?
                <React.Fragment>
                    <div className="flex justify-center items-center gap-3 flex-col">
                        <Image
                            width={40}
                            height={40}
                            src="/svgs/success.svg"
                            alt=".."
                            className=""
                        />
                        <h3>Password Changed!</h3>
                        <p className="text-green-700 text-center">
                            Your password has been changed successfully.
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
                :
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-2xl font-bold">Reset password</h1>
                            <p className="text-balance text-sm text-muted-foreground">
                                Enter a strong password
                            </p>
                        </div>
                        <RenderInput form={form} name="password" label="Password" />
                        <RenderInput form={form} name="c_password" label="Confirm Password" />
                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>

                        <div className="text-center text-sm">
                            Go back to login? &nbsp;
                            <Link href="/login" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </form>
                </Form>
            }

        </React.Fragment>
    )
}
