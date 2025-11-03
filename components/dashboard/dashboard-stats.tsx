"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, Database, Users } from "lucide-react"
import { usePatients } from "@/lib/patients-context"
import { useMemo } from "react"

export function DashboardStats() {
  const { patients } = usePatients()

  const stats = useMemo(() => {
    const totalPatients = patients.length
    const highRiskPatients = patients.filter((p) => p.risque === "Élevé").length
    const positiveTests = patients.filter((p) => p.statutHPV === "Positif").length

    return {
      totalPatients,
      totalRecords: patients.length,
      activeStudies: 12, // Keep mock for now
      alerts: highRiskPatients, // Use real high-risk patient count
    }
  }, [patients])

  const statCards = [
    {
      title: "Patients enregistrés",
      value: stats.totalPatients.toLocaleString(),
      icon: Users,
      description: `${stats.totalPatients} au total`,
      color: "text-primary",
    },
    {
      title: "Données collectées",
      value: stats.totalRecords.toLocaleString(),
      icon: Database,
      description: "Dépistages enregistrés",
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
      description: "Patientes à haut risque",
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
