"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, Database, Users } from "lucide-react"

export function DashboardStats() {
  // Mock data - replace with real API calls to your Spring Boot backend
  const stats = {
    totalPatients: 1247,
    totalRecords: 3891,
    activeStudies: 12,
    alerts: 5,
  }

  const statCards = [
    {
      title: "Patients enregistrés",
      value: stats.totalPatients.toLocaleString(),
      icon: Users,
      description: "+12% ce mois",
      color: "text-primary",
    },
    {
      title: "Données collectées",
      value: stats.totalRecords.toLocaleString(),
      icon: Database,
      description: "+234 cette semaine",
      color: "text-secondary",
    },
    {
      title: "Études actives",
      value: stats.activeStudies,
      icon: Activity,
      description: "3 en cours",
      color: "text-chart-3",
    },
    {
      title: "Alertes",
      value: stats.alerts,
      icon: AlertTriangle,
      description: "Nécessitent attention",
      color: "text-destructive",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
