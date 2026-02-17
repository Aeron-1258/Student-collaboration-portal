"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Command, ArrowRight, Github, Chrome } from "lucide-react"
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion"
import dynamic from "next/dynamic"

const Globe3D = dynamic(() => import("@/components/features/globe-3d").then((mod) => mod.Globe3D), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-slate-900 w-full h-full" />,
})

function Particles() {
    const particles = Array.from({ length: 20 })
    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white/10 rounded-full"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: Math.random() * 0.5
                    }}
                    animate={{
                        y: [null, Math.random() * 100 + "%"],
                        opacity: [null, Math.random() * 0.5, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        width: Math.random() * 4 + 1 + "px",
                        height: Math.random() * 4 + 1 + "px",
                    }}
                />
            ))}
        </div>
    )
}

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // Spotlight Effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string

        const name = email.split("@")[0]
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1)

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            await auth.login({
                name: formattedName,
                email: email
            })
            router.push("/dashboard")
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex h-screen w-full bg-[#020617] overflow-hidden">

            {/* Left Side - Visuals (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 text-white z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

                {/* 3D Background */}
                <div className="absolute inset-0 z-[-1] opacity-60">
                    <Globe3D />
                </div>

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-2 text-xl font-bold tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                        <Command className="w-5 h-5" />
                    </div>
                    StudentCollab
                </div>

                {/* Testimonial */}
                <div className="relative z-10 max-w-md">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;This platform revolutionized how I find project partners. I met my co-founder here within a week.&rdquo;
                        </p>
                        <footer className="text-sm opacity-80">Sofia Davis - Computer Science, MIT</footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center relative p-8" onMouseMove={handleMouseMove}>
                {/* Abstract Background blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                <Particles />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group relative w-full max-w-md space-y-8 z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Spotlight Gradient */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    650px circle at ${mouseX}px ${mouseY}px,
                                    rgba(165, 180, 252, 0.15),
                                    transparent 80%
                                )
                            `,
                        }}
                    />

                    <div className="text-center space-y-2 relative z-10">
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            <TypewriterText text="Welcome back" />
                        </h1>
                        <p className="text-sm text-slate-400">
                            Enter your email to sign in to your account
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-200">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-slate-200">Password</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="bg-white/5 border-white/10 text-white focus:border-indigo-500 transition-colors"
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white transition-all hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="relative z-10">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#0f172a] px-2 text-slate-500 rounded">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                            <Github className="mr-2 h-4 w-4" /> Github
                        </Button>
                        <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                            <Chrome className="mr-2 h-4 w-4" /> Google
                        </Button>
                    </div>

                    <div className="text-center text-sm text-slate-400 relative z-10">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function TypewriterText({ text }: { text: string }) {
    // Simple typewriter effect
    return (
        <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    )
}
