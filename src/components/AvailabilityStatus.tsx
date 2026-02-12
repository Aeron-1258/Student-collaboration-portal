"use client"

import { useState } from "react"
import { Video, CheckCircle2, XCircle } from "lucide-react"

export function AvailabilityStatus() {
    const [isAvailable, setIsAvailable] = useState(true)

    return (
        <button
            onClick={() => setIsAvailable(!isAvailable)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/60 hover:bg-white/80 rounded-full border border-slate-200 transition-all cursor-pointer group"
        >
            <div className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide group-hover:text-slate-900">
                {isAvailable ? 'Available' : 'Busy'}
            </span>
            <div className="h-3 w-[1px] bg-slate-300 mx-1" />
            <Video className={`w-3.5 h-3.5 ${isAvailable ? 'text-blue-500' : 'text-slate-400'}`} />
        </button>
    )
}
