"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function DataVisualization() {
  // Mock data - replace with real API data from your backend
  const monthlyData = [
    { month: "Jan", patients: 65, analyses: 120, etudes: 3 },
    { month: "Fév", patients: 78, analyses: 145, etudes: 4 },
    { month: "Mar", patients: 92, analyses: 178, etudes: 5 },
    { month: "Avr", patients: 110, analyses: 210, etudes: 6 },
    { month: "Mai", patients: 125, analyses: 245, etudes: 8 },
    { month: "Juin", patients: 142, analyses: 289, etudes: 9 },
  ]

  const diseaseData = [
    { name: "Paludisme", cas: 245 },
    { name: "Diabète", cas: 189 },
    { name: "Hypertension", cas: 167 },
    { name: "Tuberculose", cas: 98 },
    { name: "VIH", cas: 76 },
    { name: "Autres", cas: 312 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Évolution mensuelle</CardTitle>
          <CardDescription>Patients, analyses et études sur 6 mois</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="patients" stroke="hsl(var(--primary))" strokeWidth={2} name="Patients" />
              <Line type="monotone" dataKey="analyses" stroke="hsl(var(--secondary))" strokeWidth={2} name="Analyses" />
              <Line type="monotone" dataKey="etudes" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Études" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribution des pathologies</CardTitle>
          <CardDescription>Cas enregistrés par type de maladie</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={diseaseData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" angle={-45} textAnchor="end" height={80} />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="cas" fill="hsl(var(--primary))" name="Cas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
