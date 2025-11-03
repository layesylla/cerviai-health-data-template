"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { usePatients } from "@/lib/patients-context"
import { calculateRiskScore } from "@/lib/risk-calculation"
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Search,
  TrendingUp,
  Brain,
  Activity,
  Filter,
  Download,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export function AIAnalysisPage() {
  const { patients } = usePatients()
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState<string>("all")

  const patientsWithRisk = patients.map((patient) => {
    const riskResult = calculateRiskScore({
      statutHPV: patient.statutHPV,
      age: Number.parseInt(patient.age),
      symptomes: patient.symptomes,
      antecedents: patient.antecedentsGyneco,
      typeHPV: patient.typeHPV,
      vaccination: patient.vaccination,
      nombreGrossesses: Number.parseInt(patient.nombreGrossesses) || 0,
    })

    return {
      ...patient,
      riskScore: riskResult.score,
      risk: {
        level: riskResult.level,
        color: riskResult.color,
        icon: riskResult.level === "Faible" ? CheckCircle : riskResult.level === "Modéré" ? AlertTriangle : AlertCircle,
      },
    }
  })

  const filteredPatients = patientsWithRisk.filter((patient) => {
    const matchesSearch =
      patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === "all" || patient.risk.level.toLowerCase() === riskFilter.toLowerCase()
    return matchesSearch && matchesRisk
  })

  const stats = {
    total: patientsWithRisk.length,
    faible: patientsWithRisk.filter((p) => p.risk.level === "Faible").length,
    modere: patientsWithRisk.filter((p) => p.risk.level === "Modéré").length,
    eleve: patientsWithRisk.filter((p) => p.risk.level === "Élevé").length,
    avgScore: Math.round(patientsWithRisk.reduce((acc, p) => acc + p.riskScore, 0) / patientsWithRisk.length || 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Analyse IA des Risques
        </h1>
        <p className="text-muted-foreground">
          Évaluation prédictive du risque de cancer du col de l'utérus par intelligence artificielle
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Patientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Analysées par IA</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              Risque Faible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.faible}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((stats.faible / stats.total) * 100)}% du total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Risque Modéré
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.modere}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((stats.modere / stats.total) * 100)}% du total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-danger shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-danger" />
              Risque Élevé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{stats.eleve}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((stats.eleve / stats.total) * 100)}% du total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Brain className="h-4 w-4 text-secondary" />
              Score Moyen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgScore}</div>
            <Progress value={stats.avgScore} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres et Recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une patiente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full md:w-[200px] rounded-xl">
                <SelectValue placeholder="Niveau de risque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="faible">Risque Faible</SelectItem>
                <SelectItem value="modéré">Risque Modéré</SelectItem>
                <SelectItem value="élevé">Risque Élevé</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 rounded-xl bg-transparent">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients List with Risk Scores */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Analyse des Patientes ({filteredPatients.length})
          </CardTitle>
          <CardDescription>Scores de risque calculés par intelligence artificielle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPatients.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune patiente trouvée</p>
              </div>
            ) : (
              filteredPatients.map((patient) => {
                const RiskIcon = patient.risk.icon
                return (
                  <Card
                    key={patient.id}
                    className="border-l-4 shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      borderLeftColor:
                        patient.risk.color === "success"
                          ? "var(--color-success)"
                          : patient.risk.color === "warning"
                            ? "var(--color-warning)"
                            : "var(--color-danger)",
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                            {patient.prenom[0]}
                            {patient.nom[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">
                              {patient.prenom} {patient.nom}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {patient.age} ans
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{patient.region}</span>
                            <span>•</span>
                            <span>HPV: {patient.statutHPV}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <RiskIcon
                                className={
                                  patient.risk.color === "success"
                                    ? "h-5 w-5 text-success"
                                    : patient.risk.color === "warning"
                                      ? "h-5 w-5 text-warning"
                                      : "h-5 w-5 text-danger"
                                }
                              />
                              <span
                                className={
                                  patient.risk.color === "success"
                                    ? "font-semibold text-success"
                                    : patient.risk.color === "warning"
                                      ? "font-semibold text-warning"
                                      : "font-semibold text-danger"
                                }
                              >
                                {patient.risk.level}
                              </span>
                            </div>
                            <div className="text-2xl font-bold">{patient.riskScore}%</div>
                          </div>

                          <Button variant="outline" size="sm" className="gap-2 rounded-xl bg-transparent">
                            <TrendingUp className="h-4 w-4" />
                            Détails
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3">
                        <Progress value={patient.riskScore} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
