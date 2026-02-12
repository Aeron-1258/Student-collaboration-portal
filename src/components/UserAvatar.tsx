"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
    name?: string | null
    image?: string | null
    className?: string
}

export function UserAvatar({ name, image, className }: UserAvatarProps) {
    return (
        <Avatar className={className}>
            <AvatarImage src={image || ""} alt={name || "User"} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold">
                {name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
        </Avatar>
    )
}
