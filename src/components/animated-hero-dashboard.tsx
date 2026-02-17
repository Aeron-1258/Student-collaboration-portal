"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, BarChart3, Users, Clock, Search, Bell, Plus, MousePointer2 } from "lucide-react"

export function AnimatedHeroDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 })
    const [activeScale, setActiveScale] = useState(1)
    const [showNotification, setShowNotification] = useState(false)

    // Simulation loop
    useEffect(() => {
        let mounted = true

        const sequence = async () => {
            if (!mounted) return

            // Reset
            setCursorPosition({ x: 50, y: 50 })
            setActiveTab("dashboard")
            setShowNotification(false)

            // Initial delay
            await new Promise(r => setTimeout(r, 1000))
            if (!mounted) return

            // Move to "Projects"
            setCursorPosition({ x: 100, y: 160 })
            await new Promise(r => setTimeout(r, 800))
            if (!mounted) return

            // Click Projects
            setActiveScale(0.9)
            setTimeout(() => setActiveScale(1), 150)
            setActiveTab("projects")

            // Wait
            await new Promise(r => setTimeout(r, 1500))
            if (!mounted) return

            // Move to "New Project" button (top rightish)
            setCursorPosition({ x: 650, y: 80 })
            await new Promise(r => setTimeout(r, 800))
            if (!mounted) return

            // Click New Project
            setActiveScale(0.9)
            setTimeout(() => setActiveScale(1), 150)
            setShowNotification(true)

            // Wait and reset
            await new Promise(r => setTimeout(r, 3000))
            if (!mounted) return

            // Loop functionality handled by recreating the sequence
            sequence()
        }

        sequence()

        return () => { mounted = false }
    }, [])

    return (
        <div className="relative mx-auto w-full max-w-4xl perspective-[2000px]">
            {/* Device Frame (Macbook Style) */}
            <motion.div
                initial={{ rotateX: 20, opacity: 0, y: 50 }}
                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="relative rounded-[1.5rem] bg-[#0d0d0d] p-1.5 ring-1 ring-white/10 shadow-2xl"
            >
                {/* Camera / Bezel Details */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#0d0d0d] rounded-b-xl flex items-center justify-center z-50">
                    <div className="w-1 h-1 rounded-full bg-[#333]"></div>
                </div>

                {/* Screen Content */}
                <div className="relative rounded-xl overflow-hidden bg-slate-50 aspect-[16/10] shadow-inner w-full">

                    {/* Simulated Cursor */}
                    <motion.div
                        className="absolute z-50 pointer-events-none drop-shadow-xl"
                        animate={{
                            x: cursorPosition.x,
                            y: cursorPosition.y,
                            scale: activeScale
                        }}
                        transition={{
                            x: { duration: 0.8, ease: "easeInOut" },
                            y: { duration: 0.8, ease: "easeInOut" },
                            scale: { duration: 0.1 }
                        }}
                    >
                        <MousePointer2
                            className="w-5 h-5 text-black fill-black/20"
                            strokeWidth={1.5}
                        />
                    </motion.div>

                    {/* Dashboard Header */}
                    <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between h-10">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <div className="h-5 bg-slate-100 rounded-md w-1/3 mx-auto flex items-center px-2 gap-2">
                            <Search className="w-3 h-3 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex h-[calc(100%-2.5rem)]">
                        {/* Sidebar */}
                        <div className="w-16 md:w-56 bg-slate-900 text-slate-300 flex flex-col p-3 gap-4 hidden md:flex">
                            <div className="font-bold text-white text-sm px-2">StudentCollab</div>
                            <div className="flex flex-col gap-1">
                                <SidebarItem icon={Activity} label="Dashboard" isActive={activeTab === "dashboard"} />
                                <SidebarItem icon={Users} label="Projects" isActive={activeTab === "projects"} />
                                <SidebarItem icon={BarChart3} label="Analytics" isActive={false} />
                                <SidebarItem icon={Clock} label="History" isActive={false} />
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 bg-slate-50 p-6 overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                {activeTab === "dashboard" ? (
                                    <DashboardView key="dashboard" showNotification={showNotification} />
                                ) : (
                                    <ProjectsView key="projects" />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Base Reflection */}
            <div className="absolute -bottom-4 left-[2%] right-[2%] h-4 bg-black/20 blur-xl rounded-[100%]"></div>
        </div>
    )
}

// Subcomponents

function SidebarItem({ icon: Icon, label, isActive }: { icon: any, label: string, isActive: boolean }) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return (
        <motion.div
            animate={{
                backgroundColor: isActive ? "rgba(37, 99, 235, 0.2)" : "rgba(255, 255, 255, 0)",
                color: isActive ? "#60a5fa" : "#cbd5e1"
            }}
            className="px-2 py-1.5 rounded-md flex items-center gap-3 transition-colors"
        >
            <Icon className="w-4 h-4" />
            <span className="text-xs font-medium">{label}</span>
        </motion.div>
    )
}

function DashboardView({ showNotification }: { showNotification: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col"
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Welcome back!</h2>
                    <p className="text-sm text-slate-500">Overview of your activity.</p>
                </div>
                <motion.button
                    animate={{ scale: showNotification ? 0.95 : 1 }}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 shadow-md shadow-blue-200"
                >
                    <Plus className="w-3 h-3" /> New Project
                </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <StatCard icon={Users} value="24" label="Collaborators" color="blue" />
                <StatCard icon={Activity} value="12" label="Projects" color="purple" />
                <StatCard icon={Clock} value="8h" label="Hours" color="orange" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex-1">
                <div className="text-sm font-bold text-slate-800 mb-3">Recent Activity</div>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100"
                        >
                            <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${i === 1 ? 'bg-blue-100 text-blue-600' : i === 2 ? 'bg-pink-100 text-pink-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                <Activity className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-xs text-slate-800 truncate">Project Alpha {i}</div>
                                <div className="text-[10px] text-slate-400">Updated 2m ago</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, x: "-50%" }}
                        className="absolute bottom-6 left-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 z-50 pointer-events-none"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span className="text-xs font-medium">New Project Created</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function ProjectsView() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
        >
            <h2 className="text-xl font-bold text-slate-800 mb-4">All Projects</h2>
            <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"
                    >
                        <div className="h-20 bg-slate-100 rounded-lg mb-2"></div>
                        <div className="h-3 w-3/4 bg-slate-200 rounded mb-1"></div>
                        <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

function StatCard({ icon: Icon, value, label, color }: { icon: any, value: string, label: string, color: string }) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const bgColors: { [key: string]: string } = {
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600"
    }

    return (
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
            <div className={`w-8 h-8 rounded-lg ${bgColors[color]} flex items-center justify-center mb-2`}>
                <Icon className="w-4 h-4" />
            </div>
            <div className="text-xl font-bold text-slate-800">{value}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</div>
        </div>
    )
}
