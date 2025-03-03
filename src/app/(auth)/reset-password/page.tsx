import { GalleryVerticalEnd } from "lucide-react"

import Image from "next/image"
import { ResetPassForm } from "./_form"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Brands Outlets
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <ResetPassForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:flex justify-center items-center">
                <Image
                    width={440}
                    height={440}
                    src="/svgs/login.svg"
                    alt=".."
                    className=""
                />
            </div>
        </div>
    )
}
