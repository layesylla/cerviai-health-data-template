"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DataVisualization } from "@/components/dashboard/data-visualization"
import { RecentData } from "@/components/dashboard/recent-data"
import { RegionalStats } from "@/components/dashboard/regional-stats"
import { BarChart3, Database, TrendingUp, Users } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tableau de bord administrateur</h1>
        <p className="text-muted-foreground">Vue d'ensemble des données de santé collectées et analyses prédictives</p>
      </div>

      <DashboardStats />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Database className="h-4 w-4" />
            Données récentes
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Analyses
          </TabsTrigger>
          <TabsTrigger value="regional" className="gap-2">
            <Users className="h-4 w-4" />
            Statistiques régionales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <DataVisualization />
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <RecentData />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyses prédictives IA</CardTitle>
              <CardDescription>Modèles de scoring et prédictions basés sur l'intelligence artificielle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Module d'analyse prédictive</p>
                <p className="text-sm mt-2">Intégration avec votre modèle Python via API</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <RegionalStats />
        </TabsContent>
      </Tabs>
    </div>
  )
}
