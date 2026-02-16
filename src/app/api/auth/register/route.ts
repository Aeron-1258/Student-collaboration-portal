import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4),
})

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json()
        const result = registerSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { message: "Invalid input", errors: result.error.flatten() },
                { status: 400 }
            )
        }

        const { name, email: rawEmail, password } = result.data
        const email = rawEmail.toLowerCase()

        console.log(`Registration attempt for: ${email}`)

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log(`Registration failed: User already exists (${email})`)
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        console.log(`User created successfully: ${email}`)

        // Remove password from response
        const userWithoutPassword = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        }

        return NextResponse.json(
            { message: "User created successfully", user: userWithoutPassword },
            { status: 201 }
        )
    } catch (error) {
        console.error("Registration failed with error:", error)
        const message = error instanceof Error ? error.message : "Internal server error"
        return NextResponse.json(
            { message: message },
            { status: 500 }
        )
    }
}
