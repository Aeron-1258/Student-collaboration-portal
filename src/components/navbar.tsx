"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AvailabilityStatus } from "@/components/AvailabilityStatus"
import { UserAvatar } from "@/components/UserAvatar"

export function Navbar() {
    const session = null; // NextAuth removed

    const pathname = usePathname()
    const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/settings") || pathname?.startsWith("/projects")

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-black/5 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
                <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        StudentCollab
                    </span>
                </Link>

                {/* Dashboard Navigation - Centered */}
                {session && isDashboard && (
                    <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                        <Link href="/dashboard" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === '/dashboard' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                            Overview
                        </Link>
                        <Link href="/projects" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname?.startsWith('/projects') ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                            Projects
                        </Link>
                        <Link href="/calendar" className="px-4 py-2 rounded-full text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                            Calendar
                        </Link>
                        <Link href="/messages" className="px-4 py-2 rounded-full text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                            Messages
                        </Link>
                        <Link href="/settings" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === '/settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                            Settings
                        </Link>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    {session ? (
                        <>
                            {isDashboard && <AvailabilityStatus />}

                            {!isDashboard && (
                                <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors hidden md:block">
                                    Dashboard
                                </Link>
                            )}

                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                <UserAvatar
                                    name="User"
                                    className="w-8 h-8 hidden sm:flex"
                                />
                                <span className="text-sm text-slate-600 font-medium hidden sm:block">
                                    User
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-500 hover:text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md shadow-blue-200">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
