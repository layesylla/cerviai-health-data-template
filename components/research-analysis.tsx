"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FlaskConical, TrendingUp, BarChart3, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from "recharts"

const ageDistribution = [
  { tranche: "18-25", total: 120, positifs: 15 },
  { tranche: "26-35", total: 280, positifs: 42 },
  { tranche: "36-45", total: 195, positifs: 38 },
  { tranche: "46-55", total: 85, positifs: 22 },
  { tranche: "56+", total: 45, positifs: 12 },
]

const correlationData = [
  { age: 22, grossesses: 0, risque: 15 },
  { age: 28, grossesses: 2, risque: 35 },
  { age: 35, grossesses: 3, risque: 58 },
  { age: 42, grossesses: 4, risque: 72 },
  { age: 38, grossesses: 5, risque: 65 },
  { age: 31, grossesses: 1, risque: 28 },
  { age: 45, grossesses: 6, risque: 78 },
]

const evolutionTemporelle = [
  { mois: "Jan", depistages: 45, positifs: 8 },
  { mois: "Fév", depistages: 62, positifs: 12 },
  { mois: "Mar", depistages: 78, positifs: 15 },
  { mois: "Avr", depistages: 95, positifs: 18 },
  { mois: "Mai", depistages: 110, positifs: 22 },
  { mois: "Jun", depistages: 125, positifs: 25 },
]

export function ResearchAnalysis() {
  const [variable1, setVariable1] = useState("age")
  const [variable2, setVariable2] = useState("risque")

  const handleGenerateReport = () => {
    console.log("[v0] Generating research report")
    alert("Génération du rapport de recherche... (connecter à votre API)")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10">
          <FlaskConical className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Recherche & Analyse</h1>
          <p className="text-muted-foreground mt-1">Exploration des données anonymisées et analyses statistiques</p>
        </div>
      </div>

      <Tabs defaultValue="distribution" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="correlation">Corrélations</TabsTrigger>
          <TabsTrigger value="evolution">Évolution</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution par tranche d'âge</CardTitle>
              <CardDescription>Analyse de la prévalence HPV selon l'âge</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={ageDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tranche" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="hsl(var(--primary))" name="Total dépistages" />
                  <Bar dataKey="positifs" fill="hsl(var(--destructive))" name="Cas positifs" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Taux de prévalence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">17.8%</div>
                <p className="text-sm text-muted-foreground mt-2">Sur l'ensemble des dépistages</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tranche la plus touchée</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">36-45 ans</div>
                <p className="text-sm text-muted-foreground mt-2">19.5% de cas positifs</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Région prioritaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">Dakar</div>
                <p className="text-sm text-muted-foreground mt-2">18.4% de prévalence</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyse de corrélation</CardTitle>
              <CardDescription>Relation entre variables médicales et socio-démographiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Variable 1</Label>
                  <Select value={variable1} onValueChange={setVariable1}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="age">Âge</SelectItem>
                      <SelectItem value="grossesses">Nombre de grossesses</SelectItem>
                      <SelectItem value="vaccination">Statut vaccinal</SelectItem>
                      <SelectItem value="region">Région</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Variable 2</Label>
                  <Select value={variable2} onValueChange={setVariable2}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="risque">Score de risque</SelectItem>
                      <SelectItem value="statutHPV">Statut HPV</SelectItem>
                      <SelectItem value="typeHPV">Type HPV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" name="Âge" />
                  <YAxis dataKey="risque" name="Score de risque" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Legend />
                  <Scatter name="Patientes" data={correlationData} fill="hsl(var(--primary))" />
                </ScatterChart>
              </ResponsiveContainer>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Résultats de l'analyse</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    • Coefficient de corrélation: <strong>0.78</strong> (corrélation forte)
                  </li>
                  <li>
                    • P-value: <strong>0.002</strong> (statistiquement significatif)
                  </li>
                  <li>• Interprétation: L'âge est fortement corrélé au score de risque HPV</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution temporelle des dépistages</CardTitle>
              <CardDescription>Tendances mensuelles et saisonnières</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={evolutionTemporelle}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="depistages"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Dépistages"
                  />
                  <Line
                    type="monotone"
                    dataKey="positifs"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    name="Cas positifs"
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold">Tendance positive</h4>
                  </div>
                  <p className="text-sm">
                    Augmentation de <strong>178%</strong> des dépistages entre janvier et juin 2024
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Taux de détection</h4>
                  </div>
                  <p className="text-sm">
                    Taux de détection stable autour de <strong>18-20%</strong> sur la période
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Générer un rapport de recherche</CardTitle>
          <CardDescription>Créer un rapport complet avec toutes les analyses</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateReport} size="lg">
            <Download className="mr-2 h-4 w-4" />
            Générer le rapport PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
