"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { auth } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { AvailabilityStatus } from "@/components/AvailabilityStatus"
import { UserAvatar } from "@/components/UserAvatar"
import { Menu, X, Rocket, Users, Globe, BookOpen } from "lucide-react"

export function Navbar() {
    const router = useRouter()
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState("User")
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Hide Navbar on Auth Pages to prevent overlap
    if (pathname === "/login" || pathname === "/signup") {
        return null
    }

    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(auth.isAuthenticated());
            const user = auth.getUser();
            if (user) {
                setUserName(user.name);
            }
        }
        checkAuth();
        const unsubscribe = auth.onChange(checkAuth);
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/settings") || pathname?.startsWith("/projects") || pathname?.startsWith("/calendar") || pathname?.startsWith("/messages")

    return (
        <header
            className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300 rounded-full border ${isScrolled
                    ? "bg-black/50 backdrop-blur-md border-white/10 shadow-lg py-2"
                    : "bg-transparent border-transparent py-4"
                }`}
        >
            <div className="container flex items-center justify-between px-6 mx-auto">
                {/* Logo */}
                <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
                    <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                        <Rocket className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        StudentCollab
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {isLoggedIn && isDashboard ? (
                        <>
                            <NavLink href="/dashboard" active={pathname === '/dashboard'}>Overview</NavLink>
                            <NavLink href="/projects" active={pathname?.startsWith('/projects')}>Projects</NavLink>
                            <NavLink href="/calendar" active={pathname === '/calendar'}>Calendar</NavLink>
                            <NavLink href="/messages" active={pathname === '/messages'}>Messages</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink href="/mentors" icon={<Users className="w-4 h-4 mr-1" />}>Mentors</NavLink>
                            <NavLink href="/projects" icon={<Globe className="w-4 h-4 mr-1" />}>Explore</NavLink>
                            <NavLink href="/community" icon={<BookOpen className="w-4 h-4 mr-1" />}>Community</NavLink>
                        </>
                    )}
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            {!isDashboard && (
                                <Link href="/dashboard" className="hidden lg:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                            )}

                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                <UserAvatar
                                    name={userName}
                                    className="w-8 h-8 rounded-full ring-2 ring-indigo-500/20"
                                />
                                <span className="text-sm text-slate-200 font-medium hidden sm:block">
                                    {userName}
                                </span>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 hover:text-white hover:bg-white/10"
                                onClick={() => {
                                    auth.logout()
                                    router.push("/")
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                Sign In
                            </Link>
                            <Link href="/signup">
                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-6 shadow-lg shadow-indigo-500/25">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-300 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full mt-2 p-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl md:hidden flex flex-col gap-2">
                    {isLoggedIn ? (
                        <>
                            <MobileLink href="/dashboard">Dashboard</MobileLink>
                            <MobileLink href="/projects">Projects</MobileLink>
                            <MobileLink href="/messages">Messages</MobileLink>
                        </>
                    ) : (
                        <>
                            <MobileLink href="/mentors">Mentors</MobileLink>
                            <MobileLink href="/projects">Explore</MobileLink>
                            <MobileLink href="/login">Sign In</MobileLink>
                            <MobileLink href="/signup">Get Started</MobileLink>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}

function NavLink({ href, active, children, icon }: { href: string, active?: boolean, children: React.ReactNode, icon?: React.ReactNode }) {
    return (
        <Link
            href={href}
            className={`
                flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${active
                    ? 'bg-white/10 text-white shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
            `}
        >
            {icon}
            {children}
        </Link>
    )
}

function MobileLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="block w-full px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
        >
            {children}
        </Link>
    )
}
