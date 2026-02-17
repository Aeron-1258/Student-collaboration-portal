"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { auth } from "@/lib/auth-client"
import {
    FolderKanban,
    Plus,
    Users,
    Clock,
    Video,
    MessageSquare,
    CheckCircle2
} from "lucide-react"
import { motion } from "framer-motion"
import ProjectNetwork3D from "@/components/ProjectNetwork3D"
import { UserAvatar } from "@/components/UserAvatar"

interface DashboardClientProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    projects: any[];
}

export default function DashboardClient({ session, projects }: DashboardClientProps) {
    // State to hold the user info, initialized with session props but updated from client auth
    const [user, setUser] = useState(session?.user || { name: "User", email: "", image: undefined });

    const [requests, setRequests] = useState([
        { id: 1, name: "John Doe", role: "Video Editor", initials: "JD", bg: "bg-indigo-100", color: "text-indigo-600", message: "Hi, I'd love to help with the video editing for your content creation project.", time: "10m ago" },
        { id: 2, name: "Alice Smith", role: "UI Designer", initials: "AS", bg: "bg-pink-100", color: "text-pink-600", message: "Portfolio link attached below!", time: "1h ago" }
    ])

    const handleAccept = (id: number) => {
        setRequests(prev => prev.filter(r => r.id !== id))
        // Here you would typically make an API call
    }

    const handleDecline = (id: number) => {
        setRequests(prev => prev.filter(r => r.id !== id))
    }

    useEffect(() => {
        const clientUser = auth.getUser();
        if (clientUser) {
            setUser({ ...user, ...clientUser });
        }
    }, [])


    const stats = [
        { label: "Total Projects", value: projects.length.toString(), icon: FolderKanban, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Collaborators", value: "12", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
        { label: "Hours Logged", value: "324", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    ]

    const feedbacks = [
        { user: "Sarah M.", comment: "Great work on the UI!", rating: 5, date: "2h ago" },
        { user: "David K.", comment: "Can we check the API?", rating: 4, date: "5h ago" },
        { user: "Prof. Alvis", comment: "Submission received.", rating: 5, date: "1d ago" },
    ]

    return (
        <div className="relative min-h-screen bg-[#F8F9FB] overflow-x-hidden font-sans text-slate-900 pt-24">
            {/* 3D Background */}
            {/* Static Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/30 to-indigo-50/30 z-10" />
                <img
                    src="/dashboard-bg.png"
                    alt="Dashboard Background"
                    className="w-full h-full object-cover opacity-90"
                />
            </div>

            <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">

                {/* Dashboard Grid (Bento Layout) */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">

                    {/* Column 1: Navigation & User (Left Sidebar replacement) - Spans 1 col */}
                    <div className="md:col-span-1 space-y-6">
                        {/* User Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                            className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">
                                    <UserAvatar
                                        name={user?.name}
                                        image={user?.image}
                                        className="w-24 h-24 text-3xl shadow-lg ring-4 ring-white/50"
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                                <p className="text-sm text-slate-500 mb-6">Computer Science • Year 3</p>


                            </div>
                        </motion.div>

                        {/* Quick Stats Vertical */}
                        <div className="space-y-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                                    className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/50 flex items-center gap-4 hover:bg-white/80 transition-all cursor-pointer group"
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                                        <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 & 3: Main Content (Hero & Projects) - Spans 2 cols */}
                    <div className="md:col-span-2 space-y-6">
                        {/* 3D Hero Widget */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                            className="bg-[#0F1116] rounded-3xl p-1 relative overflow-hidden shadow-2xl shadow-slate-900/20 h-64 group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
                            <div className="absolute inset-0 z-0">
                                <ProjectNetwork3D />
                            </div>
                            <div className="absolute top-6 left-6 z-10">
                                <Badge className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border-0 mb-3">Live Network</Badge>
                                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">Collaborate like<br />never before.</h1>
                            </div>
                            <div className="absolute bottom-6 right-6 z-10">
                                <Link href="/projects/create">
                                    <Button className="bg-white text-black hover:bg-blue-50 rounded-full px-6 font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95">
                                        <Plus className="w-4 h-4 mr-2" /> Create Project
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Projects Grid (Mini) */}
                        <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm min-h-[400px]">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <FolderKanban className="w-5 h-5 text-blue-500" /> Current Projects
                                </h3>
                                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">View All</Button>
                            </div>

                            {projects.length === 0 ? (
                                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                                    <p className="text-slate-500 mb-4">No active projects</p>
                                    <Button variant="outline" size="sm">Start One</Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {projects.map((project) => (
                                        <div key={project.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center group cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                                    {project.title[0]}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</h4>
                                                    <p className="text-xs text-slate-500 line-clamp-1">{project.description}</p>
                                                    <div className="flex gap-2 mt-1">
                                                        <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-slate-50 border-slate-200 text-slate-600">
                                                            {project.role || "Member"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge variant={project.status === 'OPEN' ? 'default' : 'secondary'} className="rounded-md">
                                                {project.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Column 4: Tools & Communication (Right Sidebar) - Spans 1 col */}
                    <div className="md:col-span-1 space-y-6">

                        {/* Join Requests Widget */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                                <Users className="w-24 h-24 text-blue-600" />
                            </div>

                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-blue-500" /> Join Requests
                                </h3>
                                {requests.length > 0 && <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 border-0">{requests.length} New</Badge>}
                            </div>

                            <div className="space-y-3 relative z-10">
                                {requests.length === 0 ? (
                                    <div className="text-center py-8 opacity-50">
                                        <CheckCircle2 className="w-8 h-8 mx-auto text-green-500 mb-2" />
                                        <p className="text-xs text-slate-500">All caught up!</p>
                                    </div>
                                ) : (
                                    requests.map((req) => (
                                        <div key={req.id} className="bg-white/60 p-3 rounded-xl border border-slate-100">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-8 h-8 rounded-full ${req.bg} flex items-center justify-center ${req.color} font-bold text-xs`}>
                                                        {req.initials}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-800">{req.name}</p>
                                                        <p className="text-[10px] text-slate-500">{req.role}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-slate-400">{req.time}</span>
                                            </div>
                                            <p className="text-[11px] text-slate-600 mb-3 line-clamp-2">
                                                &quot;{req.message}&quot;
                                            </p>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleAccept(req.id)}
                                                    className="h-7 text-xs flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDecline(req.id)}
                                                    className="h-7 text-xs flex-1 border-slate-200 text-slate-500 hover:text-slate-700"
                                                >
                                                    Decline
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>

                        {/* My Applications Widget */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                            className="bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <FolderKanban className="w-4 h-4 text-purple-500" /> My Applications
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-xs text-slate-800">EcoTrack App</span>
                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 text-[10px] px-1.5 py-0">Pending</Badge>
                                    </div>
                                    <p className="text-[10px] text-slate-500">Frontend Developer role</p>
                                    <p className="text-[10px] text-slate-400 mt-1">Sent 2 days ago</p>
                                </div>

                                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm opacity-80">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-xs text-slate-800">AI Study Group</span>
                                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-[10px] px-1.5 py-0">Accepted</Badge>
                                    </div>
                                    <p className="text-[10px] text-slate-500">ML Engineer role</p>
                                    <p className="text-[10px] text-slate-400 mt-1">Joined yesterday</p>
                                </div>

                                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm opacity-60">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-xs text-slate-800">Crypto Trader</span>
                                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-[10px] px-1.5 py-0">Rejected</Badge>
                                    </div>
                                    <p className="text-[10px] text-slate-500">Blockchain Dev role</p>
                                    <p className="text-[10px] text-slate-400 mt-1">Updated 3 days ago</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Meeting Hub Widget */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Video className="w-4 h-4 text-rose-500" /> Meetings
                                </h3>
                                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 text-[10px]">LIVE</Badge>
                            </div>

                            <div className="space-y-3">
                                <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer" className="block">
                                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 rounded-xl bg-white hover:bg-blue-50 hover:border-blue-200 group border-slate-200">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                            <Video className="w-4 h-4 text-blue-600 group-hover:text-white" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-xs text-slate-700">Google Meet</div>
                                            <div className="text-[10px] text-slate-400">Launch Instant Meeting</div>
                                        </div>
                                    </Button>
                                </a>

                                <a href="https://meeting.zoho.com/meeting" target="_blank" rel="noopener noreferrer" className="block">
                                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 rounded-xl bg-white hover:bg-green-50 hover:border-green-200 group border-slate-200">
                                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                                            <Video className="w-4 h-4 text-green-600 group-hover:text-white" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-xs text-slate-700">Zoho Meeting</div>
                                            <div className="text-[10px] text-slate-400">Schedule Session</div>
                                        </div>
                                    </Button>
                                </a>
                            </div>
                        </motion.div>

                        {/* Feedback & Notifications Widget */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-sm h-full max-h-[400px] overflow-hidden">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-indigo-500" /> Recent Feedback
                            </h3>

                            <div className="space-y-4">
                                {feedbacks.map((item, i) => (
                                    <div key={i} className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm relative">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-xs text-slate-800">{item.user}</span>
                                            <span className="text-[10px] text-slate-400">{item.date}</span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed">&quot;{item.comment}&quot;</p>
                                        <div className="flex gap-0.5 mt-2">
                                            {[...Array(5)].map((_, stars) => (
                                                <div key={stars} className={`w-1.5 h-1.5 rounded-full ${stars < item.rating ? 'bg-yellow-400' : 'bg-slate-200'}`} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="w-full text-xs text-slate-400 mt-2">View All Reviews</Button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
