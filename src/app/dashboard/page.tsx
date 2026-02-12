import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    // Fetch user projects
    const projects = await prisma.project.findMany({
        where: {
            ownerId: session.user.id,
        },
    })

    return <DashboardClient session={session} projects={projects} />
}
