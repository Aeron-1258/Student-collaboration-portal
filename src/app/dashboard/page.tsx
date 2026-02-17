import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
    // const session = await auth()

    // if (!session?.user) {
    //     redirect("/login")
    // }

    // Mock session for now since we removed auth
    const session = { user: { id: "mock-user-id", name: "Mock User", email: "mock@example.com" } };

    // await dbConnect();

    // Fetch user projects
    // const projectsRaw = await Project.find({
    //     ownerId: session.user.id,
    // }).lean();

    // Serialize for client component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const projects = projectsRaw.map((p: any) => ({
    //     ...p,
    //     id: p._id.toString(), // Map _id to id for frontend compatibility
    //     _id: p._id.toString(),
    //     ownerId: p.ownerId.toString(),
    //     createdAt: p.createdAt?.toISOString(),
    //     updatedAt: p.updatedAt?.toISOString(),
    // }));

    const projects: any[] = [
        {
            id: "1",
            title: "AI Study Group",
            description: "Collaborative learning for machine learning basics.",
            status: "OPEN",
            role: "Owner",
            createdAt: new Date().toISOString()
        },
        {
            id: "2",
            title: "EcoTrack App",
            description: "Mobile app for tracking carbon footprint.",
            status: "IN_PROGRESS",
            role: "Member", // Joined project
            createdAt: new Date(Date.now() - 86400000).toISOString()
        }
    ];

    return <DashboardClient session={session} projects={projects} />
}
