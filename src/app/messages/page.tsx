"use client"

import DashboardScene from "@/components/DashboardScene"
import { ChatInterface } from "@/components/ChatInterface"
import { motion } from "framer-motion"

export default function MessagesPage() {
    return (
        <div className="relative min-h-screen bg-[#F8F9FB] overflow-hidden font-sans text-slate-900 pt-24">
            {/* 3D Background */}
            <DashboardScene />

            <div className="container mx-auto px-4 py-4 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <ChatInterface />
                </motion.div>
            </div>
        </div>
    )
}
