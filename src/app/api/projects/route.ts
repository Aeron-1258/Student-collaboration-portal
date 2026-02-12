import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const projectSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    requiredSkills: z.string().optional(),
})

export async function POST(req: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const result = projectSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { message: "Invalid input", errors: result.error.flatten() },
                { status: 400 }
            )
        }

        const { title, description, requiredSkills } = result.data

        const project = await prisma.project.create({
            data: {
                title,
                description,
                requiredSkills,
                ownerId: session.user.id,
                status: "OPEN",
            },
        })

        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        console.error("Failed to create project:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
