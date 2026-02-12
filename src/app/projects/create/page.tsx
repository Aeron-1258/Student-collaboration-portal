"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function CreateProjectPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const requiredSkills = formData.get("requiredSkills") as string

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, requiredSkills })
            })

            if (res.ok) {
                router.push("/dashboard")
                router.refresh()
            } else {
                alert("Failed to create project")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Post a New Project</CardTitle>
                    <CardDescription>Describe your project and what skills you are looking for.</CardDescription>
                </CardHeader>
                <form onSubmit={onSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Project Title</Label>
                            <Input id="title" name="title" required placeholder="e.g. AI-powered Study Assistant" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            {/* We need a Textarea component, mocking it or using customized Input for now if Textarea missing */}
                            <Textarea
                                id="description"
                                name="description"
                                required
                                placeholder="Describe the project goal..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="requiredSkills">Required Skills</Label>
                            <Input id="requiredSkills" name="requiredSkills" placeholder="e.g. React, Python, UI/UX" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button disabled={isLoading} type="submit">Post Project</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
