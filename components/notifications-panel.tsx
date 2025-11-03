"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, CheckCircle, X } from "lucide-react"
import { usePatients } from "@/lib/patients-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getCurrentUser, canViewAlerts } from "@/lib/auth"

interface Notification {
  id: string
  type: "warning" | "success" | "info"
  title: string
  message: string
  patientId?: string
  timestamp: Date
  read: boolean
}

export function NotificationsPanel() {
  const { patients } = usePatients()
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set())
  const [showPanel, setShowPanel] = useState(false)
  const currentUser = getCurrentUser()

  const notifications = useMemo(() => {
    if (!currentUser || !canViewAlerts(currentUser.role)) {
      return []
    }

    const highRiskPatients = patients.filter((p) => p.risque === "Élevé")
    return highRiskPatients.map((patient) => ({
      id: `notif-${patient.id}`,
      type: "warning" as const,
      title: "Patiente à haut risque détectée",
      message: `${patient.prenom} ${patient.nom} (${patient.patientId}) nécessite un suivi urgent. Statut HPV: ${patient.statutHPV}, Résultat: ${patient.resultatDepistage}`,
      patientId: patient.id,
      timestamp: patient.createdAt,
      read: readNotifications.has(`notif-${patient.id}`),
    }))
  }, [patients, currentUser, readNotifications])

  if (!currentUser || !canViewAlerts(currentUser.role)) {
    return null
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setReadNotifications((prev) => new Set([...prev, id]))
  }

  const markAllAsRead = () => {
    setReadNotifications(new Set(notifications.map((n) => n.id)))
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="relative bg-transparent"
        onClick={() => setShowPanel(!showPanel)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </Button>

      {showPanel && (
        <Card className="absolute right-0 top-12 w-96 max-h-[500px] overflow-y-auto shadow-2xl z-50 border-2">
          <CardHeader className="sticky top-0 bg-background z-10 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>{unreadCount} non lue(s)</CardDescription>
              </div>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Tout marquer
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => setShowPanel(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>Aucune notification</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notif) => (
                  <Alert key={notif.id} className={`rounded-none border-0 ${!notif.read ? "bg-accent/50" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {notif.type === "warning" && <AlertTriangle className="h-5 w-5 text-destructive" />}
                        {notif.type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{notif.title}</h4>
                          {!notif.read && (
                            <Badge variant="destructive" className="text-xs">
                              Nouveau
                            </Badge>
                          )}
                        </div>
                        <AlertDescription className="text-xs leading-relaxed">{notif.message}</AlertDescription>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-muted-foreground">{notif.timestamp.toLocaleDateString("fr-FR")}</p>
                          {!notif.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs"
                              onClick={() => markAsRead(notif.id)}
                            >
                              Marquer comme lu
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
