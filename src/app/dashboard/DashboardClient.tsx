"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
    LayoutDashboard,
    FolderKanban,
    Settings,
    Plus,
    BarChart3,
    Users,
    Clock,
    MoreHorizontal,
    Search,
    Bell,
    Video,
    MessageSquare,
    CheckCircle2,
    XCircle,
    Calendar,
    LogOut,
    ExternalLink
} from "lucide-react"
import { motion } from "framer-motion"
import ProjectNetwork3D from "@/components/ProjectNetwork3D"
import { UserAvatar } from "@/components/UserAvatar"

interface DashboardClientProps {
    session: any;
    projects: any[];
}

export default function DashboardClient({ session, projects }: DashboardClientProps) {


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
                                        name={session.user?.name}
                                        image={session.user?.image}
                                        className="w-24 h-24 text-3xl shadow-lg ring-4 ring-white/50"
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">{session.user.name}</h2>
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
                                <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 border-0">2 New</Badge>
                            </div>

                            <div className="space-y-3 relative z-10">
                                <div className="bg-white/60 p-3 rounded-xl border border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                JD
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">John Doe</p>
                                                <p className="text-[10px] text-slate-500">Video Editor</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-slate-400">10m ago</span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 mb-3 line-clamp-2">
                                        "Hi, I'd love to help with the video editing for your content creation project."
                                    </p>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="h-7 text-xs flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Accept</Button>
                                        <Button size="sm" variant="outline" className="h-7 text-xs flex-1 border-slate-200 text-slate-500 hover:text-slate-700">Decline</Button>
                                    </div>
                                </div>

                                <div className="bg-white/60 p-3 rounded-xl border border-slate-100 opacity-80">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs">
                                                AS
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">Alice Smith</p>
                                                <p className="text-[10px] text-slate-500">UI Designer</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-slate-400">1h ago</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <Button size="sm" className="h-7 text-xs flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Accept</Button>
                                        <Button size="sm" variant="outline" className="h-7 text-xs flex-1 border-slate-200 text-slate-500 hover:text-slate-700">Decline</Button>
                                    </div>
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
                                        <p className="text-xs text-slate-600 leading-relaxed">"{item.comment}"</p>
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
