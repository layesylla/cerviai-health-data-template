"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Mail, CheckCircle, AlertCircle, Eye } from "lucide-react"
import { getSMSInbox, markSMSAsRead, type SMSMessage } from "@/lib/sms-service"
import { getCurrentUser } from "@/lib/auth"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function SMSInbox() {
  const [messages, setMessages] = useState<SMSMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<SMSMessage | null>(null)
  const user = getCurrentUser()

  useEffect(() => {
    if (user?.id) {
      setMessages(getSMSInbox(user.id))
      const interval = setInterval(() => {
        setMessages(getSMSInbox(user.id))
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [user?.id])

  const unreadCount = messages.filter((m) => !m.read).length

  const typeIcons = {
    reminder: <Mail className="h-5 w-5 text-blue-500" />,
    alert: <AlertCircle className="h-5 w-5 text-red-500" />,
    result: <CheckCircle className="h-5 w-5 text-green-500" />,
    appointment: <Mail className="h-5 w-5 text-purple-500" />,
  }

  const typeLabels = {
    reminder: "Rappel",
    alert: "Alerte",
    result: "Résultat",
    appointment: "Rendez-vous",
  }

  const handleMarkAsRead = (messageId: string) => {
    markSMSAsRead(messageId)
    setMessages(getSMSInbox(user?.id || ""))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Mes SMS
        </h1>
        <p className="text-muted-foreground mt-1">Notifications et messages reçus</p>
      </div>

      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Boîte de réception
            </CardTitle>
            <CardDescription>{messages.length} message(s)</CardDescription>
          </div>
          {unreadCount > 0 && <Badge className="bg-red-500 text-white px-3 py-1">{unreadCount} non lu(s)</Badge>}
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3 pr-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/20 mb-3" />
                  <p className="text-muted-foreground">Aucun SMS reçu</p>
                </div>
              ) : (
                messages.map((message) => (
                  <Dialog key={message.id}>
                    <DialogTrigger asChild>
                      <div
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                          message.read ? "bg-background/50" : "bg-primary/5 border-primary/20"
                        }`}
                        onClick={() => {
                          setSelectedMessage(message)
                          if (!message.read) {
                            handleMarkAsRead(message.id)
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          {typeIcons[message.type]}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm">{typeLabels[message.type]}</p>
                              {!message.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(message.sentAt || message.createdAt).toLocaleString("fr-FR")}
                            </p>
                          </div>
                          <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {typeIcons[message.type]}
                          {typeLabels[message.type]}
                        </DialogTitle>
                        <DialogDescription>
                          {new Date(message.sentAt || message.createdAt).toLocaleString("fr-FR")}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Message</p>
                          <p className="p-4 bg-muted rounded-lg text-sm leading-relaxed">{message.message}</p>
                        </div>
                        <Button className="w-full" onClick={() => (window.location.href = "/")}>
                          Retour à l'accueil
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
