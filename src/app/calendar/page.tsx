"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon, Clock, Users, Video, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [viewMode, setViewMode] = useState<"team" | "personal">("team")

    // Mock Current User
    const CURRENT_USER = {
        id: 0,
        name: "You",
        role: "Full Stack Dev",
        available: true,
        slots: ["9:00 AM", "1:00 PM", "3:00 PM"],
        isCurrentUser: true
    }

    // Mock Team Members
    const TEAM_MEMBERS = [
        { id: 1, name: "Sarah Connor", role: "UX Designer", available: true, slots: ["10:00 AM", "2:00 PM"], isCurrentUser: false },
        { id: 2, name: "Kyle Reese", role: "Frontend Dev", available: false, slots: [], isCurrentUser: false },
        { id: 3, name: "John Doe", role: "Backend Dev", available: true, slots: ["11:30 AM", "4:00 PM", "5:30 PM"], isCurrentUser: false },
    ]

    // Filter logic
    const displayMembers = viewMode === "team" ? [CURRENT_USER, ...TEAM_MEMBERS] : [CURRENT_USER]

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-12">
            <Navbar />

            <div className="container mx-auto px-6 max-w-5xl">
                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Calendar & Availability</h1>
                        <p className="text-slate-500 mt-1">Schedule meetings and check team availability.</p>
                    </div>
                    <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode("team")}
                            className={`${viewMode === "team" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"} rounded-md transition-all`}
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Team View
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode("personal")}
                            className={`${viewMode === "personal" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"} rounded-md transition-all`}
                        >
                            <User className="w-4 h-4 mr-2" />
                            Personal
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Date Picker Section */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-indigo-600 font-semibold">
                            <CalendarIcon className="w-5 h-5" />
                            <span>Select Date</span>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Date</Label>
                                <Input
                                    type="date"
                                    className="bg-slate-50 border-slate-200 text-slate-900 focus:ring-indigo-500 focus:border-indigo-500"
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>

                            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mt-4">
                                <h3 className="text-sm font-bold text-indigo-700 mb-3">Upcoming Events</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm">
                                        <div className="w-1 h-10 bg-purple-500 rounded-full mt-1"></div>
                                        <div>
                                            <p className="text-slate-900 font-semibold">Sprint Review</p>
                                            <p className="text-slate-500 text-xs">Today, 2:00 PM</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm">
                                        <div className="w-1 h-10 bg-emerald-500 rounded-full mt-1"></div>
                                        <div>
                                            <p className="text-slate-900 font-semibold">Design Sync</p>
                                            <p className="text-slate-500 text-xs">Tomorrow, 11:00 AM</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Availability View */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                {viewMode === 'team' ? <Users className="w-5 h-5 text-emerald-500" /> : <User className="w-5 h-5 text-emerald-500" />}
                                {viewMode === 'team' ? 'Team Availability' : 'My Availability'}
                                {selectedDate && <span className="text-slate-400 text-base font-normal">for {selectedDate}</span>}
                            </h2>

                            <div className="space-y-4">
                                {displayMembers.map(member => (
                                    <div
                                        key={member.id}
                                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all
                                            ${member.isCurrentUser
                                                ? "bg-indigo-50 border-indigo-200 hover:border-indigo-300 shadow-sm"
                                                : "bg-slate-50 border-slate-100 hover:border-slate-200 hover:shadow-sm"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg relative shadow-sm 
                                                ${member.available
                                                    ? "bg-white text-emerald-600 border-2 border-emerald-100"
                                                    : "bg-white text-red-500 border-2 border-red-100"
                                                }`}>
                                                {member.name.charAt(0)}
                                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${member.available ? "bg-emerald-500" : "bg-red-500"}`} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-slate-900">{member.name}</h3>
                                                    {member.isCurrentUser && (
                                                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 text-[10px] px-2 h-5">You</Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            {member.available ? (
                                                member.slots.map((slot, i) => (
                                                    <Button key={i} size="sm" variant="outline" className={`border-slate-200 text-slate-600 hover:text-white font-medium transition-all shadow-sm
                                                        ${member.isCurrentUser
                                                            ? "bg-white hover:bg-indigo-600 hover:border-indigo-600"
                                                            : "bg-white hover:bg-indigo-600 hover:border-indigo-600"
                                                        }`}>
                                                        {slot}
                                                    </Button>
                                                ))
                                            ) : (
                                                <span className="text-sm text-slate-400 font-medium px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200">
                                                    No slots available
                                                </span>
                                            )}
                                            {member.available && (
                                                <Button size="icon" variant="ghost" className="text-indigo-600 hover:bg-indigo-50 rounded-full w-8 h-8 ml-2">
                                                    <Video className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
