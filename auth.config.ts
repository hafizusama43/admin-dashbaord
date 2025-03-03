import { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/server/data/user";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "abdurrehman@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log(credentials)
                if (!credentials?.email || !credentials.password) { return null }
                let user: User;
                try {
                    user = await getUserByEmail(credentials?.email as string);
                    if (!user) {
                        return null
                    } else {
                        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password as string);
                        if (!passwordsMatch) return null;
                        return user
                    }
                } catch (error) {
                    console.log(error)
                    return null
                }
            },

        })
    ],

    secret: process.env.NEXTAUTH_SECRET, // https://next-auth.js.org/configuration/options#:~:text=You%20can%20quickly%20create%20a%20good%20value%20on%20the%20command%20line%20via%20this%20openssl%20command.
    session: { strategy: "jwt" },
    pages: {
        "signIn": "login",
    },
    jwt: {
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60 * 24 * 30,
        // You can define your own encode/decode functions for signing and encryption
        // async encode() { },
        // async decode() { },
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            // console.log(object)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            session.user = token as any;
            return session;
        }
    }
}