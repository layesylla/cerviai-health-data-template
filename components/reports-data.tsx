"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Database, Download, FileSpreadsheet, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const mockData = [
  {
    id: "P-2024-001",
    nom: "Diop Fatou",
    age: 35,
    region: "Dakar",
    statutHPV: "Positif",
    resultat: "Lésion précancéreuse",
    date: "2024-01-15",
  },
  {
    id: "P-2024-002",
    nom: "Ndiaye Aminata",
    age: 28,
    region: "Thiès",
    statutHPV: "Négatif",
    resultat: "Normal",
    date: "2024-01-16",
  },
  {
    id: "P-2024-003",
    nom: "Sow Mariama",
    age: 42,
    region: "Saint-Louis",
    statutHPV: "Positif",
    resultat: "Suivi requis",
    date: "2024-01-17",
  },
  {
    id: "P-2024-004",
    nom: "Fall Aissatou",
    age: 31,
    region: "Kaolack",
    statutHPV: "Négatif",
    resultat: "Normal",
    date: "2024-01-18",
  },
  {
    id: "P-2024-005",
    nom: "Ba Khady",
    age: 38,
    region: "Dakar",
    statutHPV: "Positif",
    resultat: "Cancer détecté",
    date: "2024-01-19",
  },
]

const regionData = [
  { region: "Dakar", total: 245, positifs: 45 },
  { region: "Thiès", total: 180, positifs: 32 },
  { region: "Saint-Louis", total: 120, positifs: 18 },
  { region: "Kaolack", total: 95, positifs: 12 },
]

const resultatData = [
  { name: "Normal", value: 520, color: "#10b981" },
  { name: "Suivi requis", value: 85, color: "#f59e0b" },
  { name: "Lésion précancéreuse", value: 32, color: "#ef4444" },
  { name: "Cancer détecté", value: 8, color: "#991b1b" },
]

export function ReportsData() {
  const [filterRegion, setFilterRegion] = useState("all")
  const [filterPeriode, setFilterPeriode] = useState("all")
  const [filterStatut, setFilterStatut] = useState("all")

  const handleExportCSV = () => {
    console.log("[v0] Exporting data as CSV")
    // API call: GET /api/reports/export?format=csv&filters=...
    alert("Export CSV en cours... (connecter à votre API Spring Boot)")
  }

  const handleExportExcel = () => {
    console.log("[v0] Exporting data as Excel")
    // API call: GET /api/reports/export?format=excel&filters=...
    alert("Export Excel en cours... (connecter à votre API Spring Boot)")
  }

  const handleExportPDF = () => {
    console.log("[v0] Exporting data as PDF")
    // API call: GET /api/reports/export?format=pdf&filters=...
    alert("Export PDF en cours... (connecter à votre API Spring Boot)")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10">
          <Database className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Données & Rapports</h1>
          <p className="text-muted-foreground mt-1">Visualisation et export des données de dépistage</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtres et export</CardTitle>
          <CardDescription>Filtrer les données et exporter dans différents formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Période</Label>
              <Select value={filterPeriode} onValueChange={setFilterPeriode}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les périodes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  <SelectItem value="7days">7 derniers jours</SelectItem>
                  <SelectItem value="30days">30 derniers jours</SelectItem>
                  <SelectItem value="3months">3 derniers mois</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Région</Label>
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les régions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les régions</SelectItem>
                  <SelectItem value="Dakar">Dakar</SelectItem>
                  <SelectItem value="Thiès">Thiès</SelectItem>
                  <SelectItem value="Saint-Louis">Saint-Louis</SelectItem>
                  <SelectItem value="Kaolack">Kaolack</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Statut HPV</Label>
              <Select value={filterStatut} onValueChange={setFilterStatut}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Positif">Positif</SelectItem>
                  <SelectItem value="Négatif">Négatif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Actions</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportCSV}>
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportExcel}>
                  <FileSpreadsheet className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportPDF}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dépistages par région</CardTitle>
            <CardDescription>Nombre total et cas positifs par région</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="hsl(var(--primary))" name="Total dépistages" />
                <Bar dataKey="positifs" fill="hsl(var(--destructive))" name="Cas positifs" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution des résultats</CardTitle>
            <CardDescription>Répartition des diagnostics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={resultatData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {resultatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Données exportables</CardTitle>
          <CardDescription>Aperçu des données filtrées ({mockData.length} entrées)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Âge</TableHead>
                <TableHead>Région</TableHead>
                <TableHead>Statut HPV</TableHead>
                <TableHead>Résultat</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-sm">{row.id}</TableCell>
                  <TableCell>{row.nom}</TableCell>
                  <TableCell>{row.age} ans</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>
                    {row.statutHPV === "Positif" ? (
                      <Badge variant="destructive">{row.statutHPV}</Badge>
                    ) : (
                      <Badge className="bg-secondary text-secondary-foreground">{row.statutHPV}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{row.resultat}</TableCell>
                  <TableCell>{new Date(row.date).toLocaleDateString("fr-FR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
