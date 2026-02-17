"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Globe, ScanLine } from "lucide-react"

// Types for our "planets"
type Planet = {
    id: number
    name: string
    type: string
    color: string
    habitability: number // Match percentage equivalent
    size: string
}

const PLANETS: Planet[] = [
    { id: 1, name: "Kepler-186f", type: "Super-Earth", color: "bg-gradient-to-br from-orange-400 to-red-600", habitability: 45, size: "w-8 h-8" },
    { id: 2, name: "Proxima b", type: "Rocky", color: "bg-gradient-to-br from-gray-300 to-stone-500", habitability: 60, size: "w-6 h-6" },
    { id: 3, name: "TRAPPIST-1e", type: "Aquaplanet", color: "bg-gradient-to-br from-cyan-400 to-blue-600", habitability: 85, size: "w-7 h-7" },
    { id: 4, name: "Earth 2.0", type: "Habitable", color: "bg-gradient-to-br from-green-400 to-emerald-600", habitability: 98, size: "w-10 h-10" }, // The Match
    { id: 5, name: "Gliese 667Cc", type: "Exoplanet", color: "bg-gradient-to-br from-purple-400 to-indigo-600", habitability: 72, size: "w-9 h-9" },
]

export function MatchingAnim() {
    const [isScanning, setIsScanning] = useState(true)
    const [foundMatch, setFoundMatch] = useState<Planet | null>(null)

    useEffect(() => {
        let mounted = true

        const runSequence = async () => {
            if (!mounted) return

            // Reset
            setIsScanning(true)
            setFoundMatch(null)

            // Phase 1: Scanning
            await new Promise(r => setTimeout(r, 3000))
            if (!mounted) return

            // Phase 2: Found Match
            setIsScanning(false)
            setFoundMatch(PLANETS[3]) // Earth 2.0

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
        <div className="relative w-full aspect-square max-w-md mx-auto bg-slate-900/5 rounded-full flex items-center justify-center p-8 overflow-hidden border border-white/5">

            {/* Background Radar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-indigo-500/10 rounded-full"
                        style={{ width: `${i * 33}%`, height: `${i * 33}%` }}
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.3, 0.1, 0.3],
                            borderWidth: ["1px", "2px", "1px"]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Scanning Radar Sweep */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-500/10 to-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        style={{ clipPath: "polygon(50% 50%, 0 0, 100% 0)" }} // Wedge shape
                    />
                )}
            </AnimatePresence>

            {/* Central Node (The Ship/Scanner) */}
            <div className="relative z-20 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center border border-white/20">
                <div className="w-full h-full rounded-full flex items-center justify-center text-white relative">
                    <Globe className="w-10 h-10 text-indigo-400" />
                    <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-full animate-ping opacity-20" />
                </div>
            </div>

            {/* Orbiting Planets */}
            {PLANETS.map((planet, index) => {
                const angle = (index / PLANETS.length) * 360
                const radius = 140 // Distance from center
                const isMatch = foundMatch?.id === planet.id

                return (
                    <motion.div
                        key={planet.id}
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
                                    className="absolute top-1/2 left-1/2 h-0.5 bg-indigo-500 origin-left"
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

                            {/* Planet Sphere */}
                            <div className={`rounded-full shadow-lg ${planet.size} ${planet.color} relative overflow-hidden ring-2 ring-white/10`}>
                                {/* Atmosphere/Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-80" />
                            </div>

                            {/* Labels */}
                            <div className="absolute -bottom-6 flex flex-col items-center">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white/80 px-1 rounded-sm backdrop-blur-sm mb-1">{planet.name}</span>
                            </div>

                            {/* Match Tag */}
                            {isMatch && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -bottom-12 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap flex items-center gap-1 shadow-lg border border-indigo-400"
                                >
                                    <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                                    {planet.habitability}% Habitable
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
