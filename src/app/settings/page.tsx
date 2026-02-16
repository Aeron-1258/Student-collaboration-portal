"use client"

import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, User, Code, Link as LinkIcon, Save, ArrowLeft, Mail, Github, Globe, ExternalLink, ImageIcon } from "lucide-react"
import Link from "next/link"
import DashboardScene from "@/components/DashboardScene"
import { motion } from "framer-motion"
import { UserAvatar } from "@/components/UserAvatar"

export default function SettingsPage() {
    return (
        <div className="relative min-h-screen bg-[#F8F9FB] overflow-hidden font-sans text-slate-900">
            {/* Background */}
            <DashboardScene />

            <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-white/50">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                        </Button>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg overflow-hidden rounded-3xl">
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                            <div className="absolute -bottom-16 left-8 p-1 bg-white rounded-full shadow-md">
                                <UserAvatar
                                    name="Aeron" // Mock
                                    image={null} // Mock
                                    className="w-32 h-32 border-4 border-white text-4xl"
                                />
                                <button className="absolute bottom-1 right-1 bg-slate-900 text-white p-2 rounded-full hover:bg-slate-700 transition-colors shadow-sm">
                                    <ImageIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="pt-20 px-8 pb-8">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
                                    <p className="text-slate-500">Manage your public profile and skills</p>
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/20">
                                    <Save className="w-4 h-4 mr-2" /> Save Changes
                                </Button>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Profile Picture URL</label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900"
                                                placeholder="https://example.com/me.jpg"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Display Name</label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900"
                                                placeholder="Your Name"
                                                defaultValue="Aeron" // Mock value
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Bio</label>
                                        <textarea
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 min-h-[120px] resize-none"
                                            placeholder="Tell us about yourself..."
                                            defaultValue="Computer Science student passionate about AI and Web Development. Looking for collaborators for my final year project."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Contact Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="email"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-slate-700 block">Skills & Tags</label>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {["React", "TypeScript", "Node.js", "UI/UX", "Python"].map((skill) => (
                                                <Badge key={skill} variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer border-blue-100">
                                                    {skill} <button className="ml-1 hover:text-blue-800">×</button>
                                                </Badge>
                                            ))}
                                            <Badge variant="outline" className="px-3 py-1 border-dashed border-slate-300 text-slate-400 hover:text-slate-600 hover:border-slate-400 cursor-pointer">
                                                <Plus className="w-3 h-3 mr-1" /> Add Skill
                                            </Badge>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 text-sm"
                                            placeholder="Type a skill and press Enter..."
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-semibold text-slate-700 block">Social Links</label>

                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 text-white">
                                                <Github className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 text-sm"
                                                placeholder="GitHub Profile URL"
                                            />
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 text-white">
                                                <Globe className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 text-sm"
                                                placeholder="Portfolio Website URL"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

function Plus(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
