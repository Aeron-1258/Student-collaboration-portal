"use client"

import { Activity, BarChart3, Users, Clock, Search, Bell, Menu, Plus } from "lucide-react"

export function HeroDashboard() {
    return (
        <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-slate-50 border border-slate-200/60 font-sans">
            {/* Window Header */}
            <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="h-6 bg-slate-100 rounded-md w-1/3 mx-auto flex items-center px-3 gap-2">
                    <Search className="w-3 h-3 text-slate-400" />
                    <div className="w-20 h-2 bg-slate-200 rounded-full"></div>
                </div>
                <div className="flex gap-3">
                    <Bell className="w-4 h-4 text-slate-400" />
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex h-[400px] md:h-[500px]">
                {/* Sidebar */}
                <div className="w-16 md:w-64 bg-slate-900 text-slate-300 flex flex-col p-4 gap-6 hidden md:flex">
                    <div className="font-bold text-white text-lg px-2">StudentCollab</div>
                    <div className="flex flex-col gap-1">
                        <div className="px-3 py-2 bg-blue-600/20 text-blue-400 rounded-md flex items-center gap-3">
                            <Activity className="w-4 h-4" />
                            <span className="text-sm font-medium">Dashboard</span>
                        </div>
                        <div className="px-3 py-2 hover:bg-white/5 rounded-md flex items-center gap-3">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-medium">Projects</span>
                        </div>
                        <div className="px-3 py-2 hover:bg-white/5 rounded-md flex items-center gap-3">
                            <BarChart3 className="w-4 h-4" />
                            <span className="text-sm font-medium">Analytics</span>
                        </div>
                        <div className="px-3 py-2 hover:bg-white/5 rounded-md flex items-center gap-3">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">History</span>
                        </div>
                    </div>
                    <div className="mt-auto px-3 py-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                            <div className="flex flex-col">
                                <div className="w-24 h-2 bg-slate-600 rounded-full mb-1"></div>
                                <div className="w-16 h-2 bg-slate-700 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-slate-50 p-6 md:p-8 overflow-hidden relative">

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome back, Alex!</h2>
                            <p className="text-slate-500">Here&apos;s what&apos;s happening with your projects today.</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-200">
                            <Plus className="w-4 h-4" /> New Project
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                            <div className="flex justify-between mb-4">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Users className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 bg-green-50 text-green-600 rounded-md">+12%</span>
                            </div>
                            <div className="text-3xl font-bold text-slate-800 mb-1">24</div>
                            <div className="text-sm text-slate-500">Active Collaborators</div>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                            <div className="flex justify-between mb-4">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 bg-green-50 text-green-600 rounded-md">+5%</span>
                            </div>
                            <div className="text-3xl font-bold text-slate-800 mb-1">12</div>
                            <div className="text-sm text-slate-500">Ongoing Projects</div>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                            <div className="flex justify-between mb-4">
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-500 rounded-md">0%</span>
                            </div>
                            <div className="text-3xl font-bold text-slate-800 mb-1">8h</div>
                            <div className="text-sm text-slate-500">Hours Collaborated</div>
                        </div>
                    </div>

                    {/* Recent Projects List */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                        <div className="text-lg font-bold text-slate-800 mb-4">Recent Projects</div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${i === 1 ? 'bg-blue-100 text-blue-600' : i === 2 ? 'bg-pink-100 text-pink-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                            <Layers className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800">AI Research Assistant</div>
                                            <div className="text-sm text-slate-500">Updated 2h ago</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                                            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fade out at bottom for "scroll" effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>

                </div>
            </div>
        </div>
    )
}

function Layers(props: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
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
            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
            <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
            <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
        </svg>
    )
}
