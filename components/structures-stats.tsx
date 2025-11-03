"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Structure } from "@/lib/structures-context"
import type { Patient } from "@/lib/patients-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, MapPin, Building2 } from "lucide-react"

interface StructuresStatsProps {
  structures: Structure[]
  patients: Patient[]
}

export function StructuresStats({ structures, patients }: StructuresStatsProps) {
  // Statistics by region
  const regionStats = structures.reduce(
    (acc, structure) => {
      if (!acc[structure.region]) {
        acc[structure.region] = {
          region: structure.region,
          structures: 0,
          depistages: 0,
          agents: 0,
        }
      }
      acc[structure.region].structures++
      acc[structure.region].depistages += structure.nombreDepistages
      acc[structure.region].agents += structure.nombreAgents
      return acc
    },
    {} as Record<string, { region: string; structures: number; depistages: number; agents: number }>,
  )

  const regionData = Object.values(regionStats).sort((a, b) => b.depistages - a.depistages)

  // Statistics by type
  const typeStats = structures.reduce(
    (acc, structure) => {
      if (!acc[structure.type]) {
        acc[structure.type] = { type: structure.type, count: 0, depistages: 0 }
      }
      acc[structure.type].count++
      acc[structure.type].depistages += structure.nombreDepistages
      return acc
    },
    {} as Record<string, { type: string; count: number; depistages: number }>,
  )

  const typeLabels = {
    hopital: "Hôpitaux",
    "centre-sante": "Centres de santé",
    "poste-sante": "Postes de santé",
    clinique: "Cliniques",
  }

  const typeData = Object.values(typeStats).map((item) => ({
    name: typeLabels[item.type as keyof typeof typeLabels],
    value: item.count,
    depistages: item.depistages,
  }))

  const COLORS = ["#0EA5E9", "#EC4899", "#10B981", "#F59E0B"]

  // Top performing structures
  const topStructures = [...structures].sort((a, b) => b.nombreDepistages - a.nombreDepistages).slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Regional Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Statistiques par Région
          </CardTitle>
          <CardDescription>Nombre de dépistages réalisés par région</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="region" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="depistages" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-secondary" />
              Répartition par Type
            </CardTitle>
            <CardDescription>Distribution des structures de santé</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Structures */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Top 5 Structures
            </CardTitle>
            <CardDescription>Structures avec le plus de dépistages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStructures.map((structure, index) => (
                <div key={structure.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{structure.nom}</p>
                    <p className="text-xs text-muted-foreground">{structure.region}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{structure.nombreDepistages}</p>
                    <p className="text-xs text-muted-foreground">dépistages</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Regional Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tableau Détaillé par Région</CardTitle>
          <CardDescription>Vue d'ensemble complète des statistiques régionales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Région</th>
                  <th className="text-right py-3 px-4 font-medium">Structures</th>
                  <th className="text-right py-3 px-4 font-medium">Agents</th>
                  <th className="text-right py-3 px-4 font-medium">Dépistages</th>
                  <th className="text-right py-3 px-4 font-medium">Moyenne/Structure</th>
                </tr>
              </thead>
              <tbody>
                {regionData.map((region) => (
                  <tr key={region.region} className="border-b hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{region.region}</td>
                    <td className="text-right py-3 px-4">{region.structures}</td>
                    <td className="text-right py-3 px-4">{region.agents}</td>
                    <td className="text-right py-3 px-4">
                      <Badge variant="secondary">{region.depistages}</Badge>
                    </td>
                    <td className="text-right py-3 px-4 text-muted-foreground">
                      {(region.depistages / region.structures).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
