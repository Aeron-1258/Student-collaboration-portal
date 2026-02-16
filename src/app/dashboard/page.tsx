import { auth } from "@/auth"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/db"
import Project from "@/models/Project"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    await dbConnect();

    // Fetch user projects
    const projectsRaw = await Project.find({
        ownerId: session.user.id,
    }).lean();

    // Serialize for client component
    const projects = projectsRaw.map((p: any) => ({
        ...p,
        id: p._id.toString(), // Map _id to id for frontend compatibility
        _id: p._id.toString(),
        ownerId: p.ownerId.toString(),
        createdAt: p.createdAt?.toISOString(),
        updatedAt: p.updatedAt?.toISOString(),
    }));

    return <DashboardClient session={session} projects={projects} />
}
