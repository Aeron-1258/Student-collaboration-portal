"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UserAvatar } from "@/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react"

// Mock Data
interface Contact {
    id: number
    name: string
    role: string
    avatar: string | null
    lastMessage: string
    time: string
    unread: number
}

interface Message {
    id: number
    sender: string
    content: string
    time: string
}

const CONTACTS: Contact[] = [
    { id: 1, name: "Sarah Miller", role: "UX Designer", avatar: null, lastMessage: "Can you send me the latest wireframes?", time: "10:30 AM", unread: 2 },
    { id: 2, name: "David Kim", role: "Frontend Dev", avatar: null, lastMessage: "I fixed the bug in the API route.", time: "9:15 AM", unread: 0 },
    { id: 3, name: "Prof. Alvis", role: "Mentor", avatar: null, lastMessage: "Great progress on the project!", time: "Yesterday", unread: 0 },
    { id: 4, name: "Emily Chen", role: "Data Scientist", avatar: null, lastMessage: "The model training is complete.", time: "Mon", unread: 0 },
]

const MESSAGES: Record<number, Message[]> = {
    1: [
        { id: 1, sender: "them", content: "Hey! How's the dashboard coming along?", time: "10:00 AM" },
        { id: 2, sender: "me", content: "It's going great! Just polishing the UI.", time: "10:05 AM" },
        { id: 3, sender: "them", content: "That's awesome. Can you send me the latest wireframes?", time: "10:30 AM" },
    ],
    2: [
        { id: 1, sender: "me", content: "Did you check the API endpoint?", time: "9:00 AM" },
        { id: 2, sender: "them", content: "I fixed the bug in the API route.", time: "9:15 AM" },
    ],
    3: [
        { id: 1, sender: "me", content: "Professor, I've updated the project proposal.", time: "Yesterday" },
        { id: 2, sender: "them", content: "Great progress on the project! Keep it up.", time: "Yesterday" },
    ]
}

export function ChatInterface() {
    const [selectedContact, setSelectedContact] = useState<Contact>(CONTACTS[0])
    const [messages, setMessages] = useState<Message[]>(MESSAGES[1])
    const [inputText, setInputText] = useState("")

    const handleSendMessage = () => {
        if (!inputText.trim()) return

        const newMessage = {
            id: Date.now(),
            sender: "me",
            content: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages([...messages, newMessage])
        setInputText("")
    }

    const handleSelectContact = (contact: Contact) => {
        setSelectedContact(contact)
        setMessages(MESSAGES[contact.id] || [])
    }

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl overflow-hidden">
            {/* Sidebar: Contact List */}
            <div className="w-80 border-r border-slate-200/60 bg-white/50 flex flex-col">
                <div className="p-4 border-b border-slate-200/60">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-9 pr-4 py-2 bg-white/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-1">
                        {CONTACTS.map((contact) => (
                            <button
                                key={contact.id}
                                onClick={() => handleSelectContact(contact)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selectedContact.id === contact.id
                                    ? "bg-blue-50/80 border border-blue-100 shadow-sm"
                                    : "hover:bg-white/60 border border-transparent"
                                    }`}
                            >
                                <div className="relative">
                                    <UserAvatar name={contact.name} className="w-10 h-10" />
                                    {contact.unread > 0 && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">
                                            {contact.unread}
                                        </div>
                                    )}
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className={`text-sm font-semibold truncate ${selectedContact.id === contact.id ? "text-blue-900" : "text-slate-900"}`}>{contact.name}</h4>
                                        <span className="text-[10px] text-slate-400">{contact.time}</span>
                                    </div>
                                    <p className={`text-xs truncate ${selectedContact.id === contact.id ? "text-blue-600 font-medium" : "text-slate-500"}`}>
                                        {contact.lastMessage}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Main: Chat Window */}
            <div className="flex-1 flex flex-col bg-white/30">
                {/* Chat Header */}
                <div className="h-16 border-b border-slate-200/60 flex items-center justify-between px-6 bg-white/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <UserAvatar name={selectedContact.name} className="w-10 h-10" />
                        <div>
                            <h3 className="font-bold text-slate-900">{selectedContact.name}</h3>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/50">
                            <Phone className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/50">
                            <Video className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/50">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${msg.sender === "me"
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-white text-slate-800 rounded-bl-none border border-slate-100"
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                    <span className={`text-[10px] block mt-1 ${msg.sender === "me" ? "text-blue-100" : "text-slate-400"}`}>
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-white/60 border-t border-slate-200/60">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 p-2 pr-2">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                            <Paperclip className="w-5 h-5" />
                        </Button>
                        <input
                            type="text"
                            className="flex-1 bg-transparent px-2 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                            placeholder="Type a message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                            <Smile className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={handleSendMessage}
                            className={`rounded-xl transition-all ${inputText.trim() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
                            size="icon"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
