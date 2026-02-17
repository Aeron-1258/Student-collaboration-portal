"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, Search, Zap } from "lucide-react"

// Types for our "students"
type Student = {
    id: number
    name: string
    role: string
    color: string
    match: number // Match percentage
    image?: string
}

const CANDIDATES: Student[] = [
    { id: 1, name: "Sarah", role: "UI Designer", color: "bg-pink-500", match: 45 },
    { id: 2, name: "Mike", role: "Backend Dev", color: "bg-blue-500", match: 60 },
    { id: 3, name: "Jessica", role: "Product Mgr", color: "bg-purple-500", match: 30 },
    { id: 4, name: "David", role: "Frontend Dev", color: "bg-cyan-500", match: 98 }, // The Match
    { id: 5, name: "Alex", role: "Data Scientist", color: "bg-green-500", match: 55 },
]

export function MatchingAnim() {
    const [isScanning, setIsScanning] = useState(true)
    const [foundMatch, setFoundMatch] = useState<Student | null>(null)
    const [scanPosition, setScanPosition] = useState(0)

    useEffect(() => {
        let mounted = true

        const runSequence = async () => {
            if (!mounted) return

            // Reset
            setIsScanning(true)
            setFoundMatch(null)

            // Phase 1: Scanning
            // Allow the CSS animation to run for a bit
            await new Promise(r => setTimeout(r, 3000))
            if (!mounted) return

            // Phase 2: Found Match
            setIsScanning(false)
            setFoundMatch(CANDIDATES[3]) // David

            // Phase 3: Celebrate/Connect
            await new Promise(r => setTimeout(r, 4000))
            if (!mounted) return

            // Loop
            runSequence()
        }

        runSequence()

        return () => { mounted = false }
    }, [])

    return (
        <div className="relative w-full aspect-square max-w-md mx-auto bg-slate-900/5 rounded-full flex items-center justify-center p-8 overflow-hidden">

            {/* Background Radar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-blue-500/10 rounded-full"
                        style={{ width: `${i * 33}%`, height: `${i * 33}%` }}
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.1, 0.3],
                            borderWidth: ["1px", "2px", "1px"]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Scanning Radar Sweep */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/10 to-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ clipPath: "polygon(50% 50%, 0 0, 100% 0)" }} // Wedge shape
                    />
                )}
            </AnimatePresence>

            {/* Central Node (The User/Project) */}
            <div className="relative z-20 w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-white">
                <div className="w-full h-full rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <Zap className="w-10 h-10 fill-current" />
                </div>
                {/* Pulse from center */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-indigo-500"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            {/* Orbiting Candidates */}
            {CANDIDATES.map((student, index) => {
                const angle = (index / CANDIDATES.length) * 360
                const radius = 140 // Distance from center
                const isMatch = foundMatch?.id === student.id

                return (
                    <motion.div
                        key={student.id}
                        className="absolute z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: isMatch ? 1.2 : 1,
                            // Convert polar to cartesian for position
                            x: Math.cos((angle * Math.PI) / 180) * radius,
                            y: Math.sin((angle * Math.PI) / 180) * radius,
                            zIndex: isMatch ? 30 : 10
                        }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className={`relative flex flex-col items-center ${isMatch ? "scale-110" : "opacity-70 grayscale"}`}>
                            {/* Connection Line */}
                            {isMatch && !isScanning && (
                                <motion.div
                                    className="absolute top-1/2 left-1/2 h-0.5 bg-blue-500 origin-left"
                                    style={{
                                        width: radius,
                                        transform: `rotate(${angle + 180}deg)`, // Point back to center
                                        zIndex: -1
                                    }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                            )}

                            <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                                <AvatarFallback className={`${student.color} text-white text-xs`}>
                                    {student.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            {/* Match Tag */}
                            {isMatch && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -bottom-8 bg-black text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap flex items-center gap-1 shadow-lg"
                                >
                                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                                    {student.match}% Match
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
