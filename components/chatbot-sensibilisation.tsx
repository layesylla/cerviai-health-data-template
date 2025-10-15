"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send, Bot, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  role: "user" | "bot"
  content: string
  timestamp: Date
}

const quickQuestions = [
  "Qu'est-ce que le HPV ?",
  "Comment se transmet le HPV ?",
  "Qui devrait se faire dépister ?",
  "La vaccination HPV est-elle efficace ?",
  "Quels sont les symptômes du cancer du col ?",
]

const botResponses: Record<string, string> = {
  "qu'est-ce que le hpv":
    "Le HPV (Papillomavirus Humain) est un virus très courant qui se transmet principalement par contact sexuel. Il existe plus de 100 types de HPV, dont certains peuvent causer le cancer du col de l'utérus.",
  "comment se transmet le hpv":
    "Le HPV se transmet principalement par contact sexuel (vaginal, anal ou oral). Il peut aussi se transmettre par contact peau à peau dans la région génitale. La plupart des personnes sexuellement actives seront infectées par le HPV à un moment de leur vie.",
  "qui devrait se faire dépister":
    "Le dépistage du cancer du col de l'utérus est recommandé pour toutes les femmes de 25 à 65 ans. Il devrait être fait tous les 3 ans pour les femmes de 25 à 29 ans, et tous les 5 ans pour celles de 30 à 65 ans.",
  "la vaccination hpv est-elle efficace":
    "Oui ! La vaccination HPV est très efficace. Elle protège contre les types de HPV les plus dangereux (HPV-16 et HPV-18) qui causent environ 70% des cancers du col de l'utérus. Elle est recommandée pour les filles de 9 à 14 ans.",
  "quels sont les symptômes du cancer du col":
    "Aux premiers stades, le cancer du col de l'utérus ne présente souvent aucun symptôme. C'est pourquoi le dépistage est si important. Les symptômes tardifs peuvent inclure : saignements anormaux, pertes vaginales inhabituelles, douleurs pelviennes.",
}

export function ChatbotSensibilisation() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Bonjour ! Je suis votre assistant de sensibilisation sur le HPV et le cancer du col de l'utérus. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("fr")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const normalizedInput = input.toLowerCase()
      let botResponse =
        "Je suis désolé, je n'ai pas compris votre question. Pourriez-vous la reformuler ? Vous pouvez aussi utiliser les questions rapides ci-dessous."

      for (const [key, value] of Object.entries(botResponses)) {
        if (normalizedInput.includes(key)) {
          botResponse = value
          break
        }
      }

      const botMessage: Message = {
        role: "bot",
        content: botResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInput("")
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Chatbot de sensibilisation</h1>
          <p className="text-muted-foreground mt-1">Informations sur la prévention et le dépistage HPV</p>
        </div>
        <div className="w-32">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="wo">Wolof</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
              <CardDescription>Posez vos questions sur le HPV et la prévention</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Tapez votre question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Questions rapides</CardTitle>
              <CardDescription>Cliquez pour poser une question</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 bg-transparent"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ressources utiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-semibold mb-1">Centres de dépistage</h4>
                <p className="text-xs text-muted-foreground">Trouvez un centre près de chez vous</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-semibold mb-1">Vaccination HPV</h4>
                <p className="text-xs text-muted-foreground">Informations sur la vaccination</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-semibold mb-1">Guides de prévention</h4>
                <p className="text-xs text-muted-foreground">Documents téléchargeables</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
