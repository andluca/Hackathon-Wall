"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { fetchIdeas, postIdea, type Idea } from "@/lib/api"

export default function HackathonWall() {
  // Estados
  const [name, setName] = useState<string>("")
  const [ideaText, setIdeaText] = useState<string>("")
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Função de Carregar Dados
  async function loadIdeas() {
    try {
      const data = await fetchIdeas()
      setIdeas(data)
    } catch (error) {
      console.error("Erro ao carregar ideias:", error)
      alert("Falha ao carregar ideias. Verifique se o servidor está rodando.")
    }
  }

  // Effect de Inicialização
  useEffect(() => {
    loadIdeas()
  }, [])

  // Função de Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && ideaText.trim()) {
      try {
        setIsLoading(true)
        await postIdea(name, ideaText)
        setName("")
        setIdeaText("")
        loadIdeas()
      } catch (error) {
        console.error("Erro ao criar ideia:", error)
        alert("Falha ao criar ideia. Tente novamente.")
      } finally {
        setIsLoading(false)
      }
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
                  value={ideaText}
                  onChange={(e) => setIdeaText(e.target.value)}
                  placeholder="Share your hackathon idea..."
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ideas.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardContent className="flex-1 pt-6">
                <p className="text-foreground leading-relaxed">{item.idea_text}</p>
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
