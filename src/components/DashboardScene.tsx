"use client"

import Image from "next/image"

export default function DashboardScene() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
            {/* Static Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/dashboard-bg.png"
                    alt="Student Collaboration Background"
                    fill
                    priority
                    className="object-cover object-center"
                    quality={90}
                />
            </div>

            {/* Overlay for readability - Less opaque */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/40 to-blue-50/30 backdrop-blur-[1px]" />
        </div>
    )
}
