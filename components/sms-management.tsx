"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Clock, CheckCircle, XCircle } from "lucide-react"
import { getSMSMessages, sendSMS, SMS_TEMPLATES, type SMSMessage } from "@/lib/sms-service"
import { usePatients } from "@/lib/patients-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SMSManagement() {
  const [messages, setMessages] = useState<SMSMessage[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [customMessage, setCustomMessage] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const { patients } = usePatients()

  useEffect(() => {
    setMessages(getSMSMessages())
    const interval = setInterval(() => {
      setMessages(getSMSMessages())
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleSendSMS = () => {
    const patient = patients.find((p) => p.id === selectedPatient)
    if (!patient || !customMessage) return

    sendSMS(patient.telephone, `${patient.prenom} ${patient.nom}`, customMessage, "alert", patient.id)
    setCustomMessage("")
    setSelectedPatient("")
    setTimeout(() => setMessages(getSMSMessages()), 100)
  }

  const statusIcons = {
    pending: <Clock className="h-4 w-4 text-yellow-500" />,
    sent: <CheckCircle className="h-4 w-4 text-green-500" />,
    failed: <XCircle className="h-4 w-4 text-red-500" />,
  }

  const statusLabels = {
    pending: "En attente",
    sent: "Envoyé",
    failed: "Échec",
  }

  const typeLabels = {
    reminder: "Rappel",
    alert: "Alerte",
    result: "Résultat",
    appointment: "Rendez-vous",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Gestion des SMS
        </h1>
        <p className="text-muted-foreground mt-1">Envoi de notifications et rappels par SMS</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total envoyés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{messages.filter((m) => m.status === "sent").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{messages.filter((m) => m.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Échecs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{messages.filter((m) => m.status === "failed").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="send" className="space-y-4">
        <TabsList>
          <TabsTrigger value="send">Envoyer SMS</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Nouveau SMS</CardTitle>
              <CardDescription>Envoyer un SMS à une patiente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Patiente</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une patiente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.prenom} {patient.nom} - {patient.telephone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Modèle de message</Label>
                <Select
                  value={selectedTemplate}
                  onValueChange={(value) => {
                    setSelectedTemplate(value)
                    const patient = patients.find((p) => p.id === selectedPatient)
                    if (patient) {
                      const name = `${patient.prenom} ${patient.nom}`
                      switch (value) {
                        case "highRisk":
                          setCustomMessage(SMS_TEMPLATES.highRiskAlert(name))
                          break
                        case "result":
                          setCustomMessage(SMS_TEMPLATES.resultAvailable(name))
                          break
                        case "followUp":
                          setCustomMessage(SMS_TEMPLATES.followUpReminder(name))
                          break
                      }
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un modèle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="highRisk">Alerte haut risque</SelectItem>
                    <SelectItem value="result">Résultats disponibles</SelectItem>
                    <SelectItem value="followUp">Rappel de suivi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Votre message..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={4}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">{customMessage.length}/160 caractères</p>
              </div>

              <Button onClick={handleSendSMS} disabled={!selectedPatient || !customMessage} className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Envoyer SMS
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique des SMS</CardTitle>
              <CardDescription>{messages.length} message(s) au total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>Aucun SMS envoyé</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div className="mt-1">{statusIcons[msg.status]}</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{msg.recipientName}</h4>
                            <p className="text-sm text-muted-foreground">{msg.recipientPhone}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline">{typeLabels[msg.type]}</Badge>
                            <Badge
                              variant={
                                msg.status === "sent"
                                  ? "default"
                                  : msg.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {statusLabels[msg.status]}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {msg.sentAt
                            ? `Envoyé le ${new Date(msg.sentAt).toLocaleString("fr-FR")}`
                            : `Créé le ${new Date(msg.createdAt).toLocaleString("fr-FR")}`}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
