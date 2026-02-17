"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { auth } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Loader2, Chrome, Github, ArrowRight, Command } from "lucide-react"
import Globe3D from "@/components/features/globe-3d"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500))
            // Mock login - in real app, validate credentials
            await auth.login({ email: email })
            router.push("/dashboard")
        } catch (error) {
            console.error("Login failed", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden">
            {/* Left Side - 3D Visual & Testimonial */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 bg-[#020617] overflow-hidden">
                <div className="relative z-10 flex items-center gap-2">
                    <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 backdrop-blur-sm">
                        <Command className="w-6 h-6 text-indigo-400" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">StudentCollab</span>
                </div>

                {/* 3D Scene Container */}
                <div className="absolute inset-0 z-0">
                    <Globe3D />
                    {/* Dark Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50" />
                </div>

                <div className="relative z-10 max-w-md">
                    <blockquote className="space-y-4">
                        <p className="text-lg font-medium leading-relaxed text-indigo-100/90">
                            &ldquo;This platform revolutionized how I find project partners. I met my co-founder here within a week of joining.&rdquo;
                        </p>
                        <footer className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500" />
                            <div>
                                <div className="font-semibold text-white">Sofia Davis</div>
                                <div className="text-sm text-indigo-300">Computer Science, MIT</div>
                            </div>
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0f172a] relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8 relative z-10 bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl"
                >
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
                        <p className="text-slate-400">Enter your email to sign in to your account</p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                required
                                className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20 h-11"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-slate-300">Password</Label>
                                <Link href="/forgot-password" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20 h-11"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-11 font-medium shadow-lg shadow-indigo-500/25 transition-all group"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#0f172a] px-2 text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="bg-slate-800/50 border-white/10 hover:bg-slate-800 hover:text-white text-slate-300 h-11">
                            <Github className="mr-2 h-4 w-4" /> Github
                        </Button>
                        <Button variant="outline" className="bg-slate-800/50 border-white/10 hover:bg-slate-800 hover:text-white text-slate-300 h-11">
                            <Chrome className="mr-2 h-4 w-4 text-red-400" /> Google
                        </Button>
                    </div>

                    <p className="text-center text-sm text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-all">
                            Sign up
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
