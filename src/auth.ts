import NextAuth from "next-auth"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                console.log("Authorize attempt for:", credentials?.email)
                const parsedCredentials = loginSchema.safeParse(credentials)

                if (!parsedCredentials.success) {
                    console.log("Authorize failed: Invalid input", parsedCredentials.error.format())
                    return null
                }

                const { email: rawEmail, password } = parsedCredentials.data
                const email = rawEmail.toLowerCase()

                await dbConnect(); // Ensure DB is connected

                const user = await User.findOne({ email });

                if (!user) {
                    console.log("Authorize failed: User not found", email)
                    return null
                }

                if (!user.password) {
                    console.log("Authorize failed: User has no password", email)
                    return null
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                )

                if (!isPasswordValid) {
                    console.log("Authorize failed: Invalid password", email)
                    return null
                }

                console.log("Authorize successful for:", email)
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
    },
    pages: {
        signIn: "/login",
    },
})
