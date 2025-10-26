"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Idea {
  id: string
  name: string
  idea: string
}

export default function HackathonWall() {
  const [name, setName] = useState("")
  const [idea, setIdea] = useState("")
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: "1",
      name: "Sarah Chen",
      idea: "An AI-powered code review assistant that learns from your team's coding standards and provides real-time suggestions.",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      idea: "A collaborative whiteboard app with voice-to-diagram conversion for remote brainstorming sessions.",
    },
    {
      id: "3",
      name: "Priya Patel",
      idea: "Smart grocery app that tracks your pantry inventory and suggests recipes based on what you have.",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && idea.trim()) {
      const newIdea: Idea = {
        id: Date.now().toString(),
        name: name.trim(),
        idea: idea.trim(),
      }
      setIdeas([newIdea, ...ideas])
      setName("")
      setIdea("")
    }
  }

  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Hackathon Wall</h1>

        <Card className="mb-12">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="idea" className="mb-2 block text-sm font-medium text-foreground">
                  Your Idea
                </label>
                <Textarea
                  id="idea"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Share your hackathon idea..."
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ideas.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardContent className="flex-1 pt-6">
                <p className="text-foreground leading-relaxed">{item.idea}</p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 py-3">
                <p className="text-sm font-medium text-muted-foreground">{item.name}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
