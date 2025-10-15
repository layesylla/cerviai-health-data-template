"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function RegionalStats() {
  // Mock data - replace with real API data
  const regionalData = [
    { region: "Dakar", patients: 456, percentage: 36.5, color: "bg-primary" },
    { region: "Thiès", patients: 298, percentage: 23.9, color: "bg-secondary" },
    { region: "Saint-Louis", patients: 187, percentage: 15.0, color: "bg-chart-3" },
    { region: "Kaolack", patients: 156, percentage: 12.5, color: "bg-chart-4" },
    { region: "Ziguinchor", patients: 150, percentage: 12.1, color: "bg-chart-5" },
  ]

  const institutionData = [
    { name: "Hôpital Principal de Dakar", records: 892 },
    { name: "Institut Pasteur de Dakar", records: 567 },
    { name: "Hôpital Régional de Thiès", records: 445 },
    { name: "Centre Hospitalier de Saint-Louis", records: 389 },
    { name: "Laboratoire National", records: 312 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Distribution régionale</CardTitle>
          <CardDescription>Patients par région</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {regionalData.map((region) => (
            <div key={region.region} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{region.region}</span>
                <span className="text-muted-foreground">
                  {region.patients} patients ({region.percentage}%)
                </span>
              </div>
              <Progress value={region.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Institutions contributrices</CardTitle>
          <CardDescription>Top 5 des institutions par nombre de données</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {institutionData.map((institution, index) => (
              <div key={institution.name} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{institution.name}</p>
                  <p className="text-xs text-muted-foreground">{institution.records} enregistrements</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
