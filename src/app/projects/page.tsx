"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Calendar, Users, ArrowRight } from "lucide-react"

// Mock data for projects
const PROJECTS = [
    {
        id: 1,
        title: "AI Research Assistant",
        description: "Building a RAG-based AI assistant to help students summarize research papers and find relevant citations.",
        tags: ["Python", "LangChain", "React"],
        author: "Alex Chen",
        date: "2 days ago",
        members: "3/5"
    },
    {
        id: 2,
        title: "Smart Campus App",
        description: "Mobile application for tracking campus bus schedules, cafeteria menus, and event notifications in real-time.",
        tags: ["Flutter", "Firebase", "Google Maps"],
        author: "Sarah Jones",
        date: "1 week ago",
        members: "2/4"
    },
    {
        id: 3,
        title: "EcoTrack: Carbon Footprint",
        description: "Web platform helping students track and reduce their carbon footprint through gamified challenges.",
        tags: ["Next.js", "Tailwind", "Node.js"],
        author: "Mike Ross",
        date: "3 days ago",
        members: "1/3"
    },
    {
        id: 4,
        title: "Crypto Trading Bot",
        description: "Algorithmic trading bot focused on arbitrage opportunities across decentralized exchanges.",
        tags: ["Solidity", "Rust", "Python"],
        author: "Jessica Lee",
        date: "5 hours ago",
        members: "4/6"
    },
    {
        id: 5,
        title: "VR Classroom Experience",
        description: "Virtual reality environment for conducting chemistry experiments safely without physical equipment.",
        tags: ["Unity", "C#", "Oculus SDK"],
        author: "David Kim",
        date: "1 day ago",
        members: "2/5"
    }
]

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredProjects = PROJECTS.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div className="min-h-screen bg-[#F5F5F7]">
            <Navbar />

            <main className="container mx-auto px-4 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-slate-900 mb-2">Explore Projects</h1>
                            <p className="text-slate-500">Discover ongoing projects and find your next team.</p>
                        </div>
                        <Link href="/projects/create">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-200">
                                Post a Project
                            </Button>
                        </Link>
                    </div>

                    {/* Search and Filter */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                                placeholder="Search projects by title, description, or tags..."
                                className="pl-10 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                            <Filter className="w-4 h-4 mr-2" /> Filters
                        </Button>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid gap-6">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <Card key={project.id} className="border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-blue-200 group bg-white">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                                                    {project.title}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2 text-base">
                                                    {project.description}
                                                </CardDescription>
                                            </div>
                                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                                {project.members} Members
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="border-slate-200 text-slate-600 bg-slate-50">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>{project.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{project.date}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="border-t border-slate-100 pt-4 flex justify-between items-center">
                                        <Button variant="ghost" className="text-slate-500 hover:text-slate-900 font-medium p-0 h-auto text-xs">
                                            View Details
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md shadow-blue-200"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                const button = e.currentTarget as HTMLButtonElement
                                                button.innerText = "Requested"
                                                button.className += " opacity-70 pointer-events-none"
                                            }}
                                        >
                                            Request to Join
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-1">No projects found</h3>
                                <p className="text-slate-500 max-w-sm mx-auto">
                                    We couldn&apos;t find any projects matching &quot;{searchQuery}&quot;. Try adjusting your search terms.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
