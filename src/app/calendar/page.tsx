"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, Video, Plus } from "lucide-react"
import DashboardScene from "@/components/DashboardScene"
import { motion } from "framer-motion"

// Mock Data for Team Availability
const TEAM_SCHEDULE = [
    { day: 12, users: [{ name: "Sarah", status: "busy" }, { name: "David", status: "free" }] },
    { day: 14, users: [{ name: "Prof. Alvis", status: "busy" }] },
    { day: 15, users: [{ name: "Sarah", status: "free" }, { name: "David", status: "free" }] },
]

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<number | null>(null)
    const [myAvailability, setMyAvailability] = useState<number[]>([15, 16, 20]) // Days I am available

    // Calendar Logic
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

    const toggleAvailability = (day: number) => {
        if (myAvailability.includes(day)) {
            setMyAvailability(myAvailability.filter(d => d !== day))
        } else {
            setMyAvailability([...myAvailability, day])
        }
    }

    return (
        <div className="relative min-h-screen bg-[#F8F9FB] overflow-hidden font-sans text-slate-900 pt-24">
            <DashboardScene />

            <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Calendar Area */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl p-6">
                                <div className="flex justify-between items-center mb-8">
                                    <h1 className="text-2xl font-bold text-slate-900">
                                        {monthNames[month]} {year}
                                    </h1>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={prevMonth} className="rounded-full hover:bg-white/80">
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={nextMonth} className="rounded-full hover:bg-white/80">
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-4 mb-4">
                                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                                        <div key={day} className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-4">
                                    {/* Empty cells for previous month */}
                                    {[...Array(firstDayOfMonth)].map((_, i) => (
                                        <div key={`empty-${i}`} className="h-24" />
                                    ))}

                                    {/* Days */}
                                    {[...Array(daysInMonth)].map((_, i) => {
                                        const dayPromise = i + 1
                                        const isSelected = selectedDate === dayPromise
                                        const isMyAvailable = myAvailability.includes(dayPromise)
                                        const teamInfo = TEAM_SCHEDULE.find(s => s.day === dayPromise)

                                        return (
                                            <div
                                                key={dayPromise}
                                                onClick={() => setSelectedDate(dayPromise)}
                                                className={`
                                                    h-24 rounded-2xl border p-2 relative transition-all cursor-pointer group
                                                    ${isSelected ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/20' : 'bg-white/40 border-slate-100 hover:border-blue-200 hover:bg-white/60'}
                                                `}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className={`text-sm font-semibold ${isSelected ? 'text-blue-600' : 'text-slate-700'}`}>
                                                        {dayPromise}
                                                    </span>
                                                    {isMyAvailable && (
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" title="You are Available" />
                                                    )}
                                                </div>

                                                {/* Team Dots */}
                                                <div className="flex gap-1 mt-2 flex-wrap">
                                                    {teamInfo?.users.map((user, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`w-1.5 h-1.5 rounded-full ${user.status === 'free' ? 'bg-indigo-400' : 'bg-rose-400'}`}
                                                            title={`${user.name} is ${user.status}`}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Hover Action */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-[1px] rounded-2xl">
                                                    <Plus className="w-6 h-6 text-blue-500" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Sidebar: Selected Day Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl p-6 h-full">
                                {selectedDate ? (
                                    <>
                                        <h2 className="text-xl font-bold text-slate-900 mb-1">{monthNames[month]} {selectedDate}</h2>
                                        <p className="text-sm text-slate-500 mb-6">Schedule Overview</p>

                                        <div className="space-y-6">
                                            {/* My Status Toggle */}
                                            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                                <h3 className="font-semibold text-slate-800 mb-3 text-sm">Your Status</h3>
                                                <Button
                                                    onClick={() => toggleAvailability(selectedDate)}
                                                    className={`w-full ${myAvailability.includes(selectedDate) ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 border' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200 border'}`}
                                                    variant="ghost"
                                                >
                                                    {myAvailability.includes(selectedDate) ? "Available All Day" : "Mark as Available"}
                                                </Button>
                                            </div>

                                            {/* Team Availability List */}
                                            <div>
                                                <h3 className="font-semibold text-slate-800 mb-3 text-sm flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-indigo-500" /> Team Schedule
                                                </h3>

                                                <div className="space-y-3">
                                                    {TEAM_SCHEDULE.find(s => s.day === selectedDate)?.users.map((user, i) => (
                                                        <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${user.status === 'free' ? 'bg-indigo-500' : 'bg-slate-400'}`}>
                                                                    {user.name[0]}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                                                                    <p className="text-xs text-slate-500 capitalize">{user.status}</p>
                                                                </div>
                                                            </div>
                                                            <Badge variant="outline" className={`${user.status === 'free' ? 'text-indigo-600 bg-indigo-50 border-indigo-100' : 'text-slate-500 bg-slate-50 border-slate-100'}`}>
                                                                {user.status === 'free' ? 'Free' : 'Busy'}
                                                            </Badge>
                                                        </div>
                                                    )) || (
                                                            <p className="text-xs text-slate-400 italic text-center py-4">No team updates for this day.</p>
                                                        )}
                                                </div>
                                            </div>

                                            {/* Create Meeting */}
                                            <div className="pt-4 border-t border-slate-200">
                                                <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer">
                                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                                                        <Video className="w-4 h-4 mr-2" /> Schedule Meeting
                                                    </Button>
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                                        <Clock className="w-12 h-12 mb-4 opacity-20" />
                                        <p>Select a date to view<br />team availability</p>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
