"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, FileText, AlertCircle, CheckCircle2, Clock, Download } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default function MesResultatsPage() {
  const user = getCurrentUser()

  // Mock data - replace with API call to fetch patient's results
  const patientData = {
    nom: user?.name || "Mariama Sow",
    age: 34,
    telephone: "+221 77 123 45 67",
    dernierDepistage: "2024-01-15",
    prochainRDV: "2024-07-15",
    statutHPV: "Négatif",
    resultat: "Normal",
    recommandations: "Continuer le dépistage régulier tous les 3 ans. Maintenir une bonne hygiène de vie.",
    historique: [
      {
        date: "2024-01-15",
        type: "Test HPV",
        resultat: "Négatif",
        statut: "Normal",
      },
      {
        date: "2021-02-10",
        type: "Test HPV",
        resultat: "Négatif",
        statut: "Normal",
      },
    ],
  }

  const getStatutColor = (statut: string) => {
    if (statut === "Négatif" || statut === "Normal") return "bg-green-500"
    if (statut === "Positif") return "bg-red-500"
    return "bg-yellow-500"
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mes résultats de dépistage</h1>
          <p className="text-muted-foreground mt-2">
            Consultez vos résultats de dépistage HPV et suivez vos rendez-vous
          </p>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900">
            Vos données sont confidentielles et sécurisées. Seuls vous et votre équipe médicale y avez accès.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Dernier dépistage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{patientData.dernierDepistage}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Statut HPV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${getStatutColor(patientData.statutHPV)}`} />
                <span className="text-2xl font-bold">{patientData.statutHPV}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Prochain RDV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                <span className="text-2xl font-bold">{patientData.prochainRDV}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dernier résultat de dépistage</CardTitle>
            <CardDescription>Résultat du test HPV du {patientData.dernierDepistage}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">Résultat: {patientData.resultat}</p>
                  <p className="text-sm text-green-700">Statut HPV: {patientData.statutHPV}</p>
                </div>
              </div>
              <Badge className="bg-green-600">Normal</Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Recommandations médicales</h4>
              <p className="text-sm text-muted-foreground">{patientData.recommandations}</p>
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Télécharger le rapport complet
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historique des dépistages</CardTitle>
            <CardDescription>Tous vos résultats de dépistage précédents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patientData.historique.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.type}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.resultat === "Négatif" ? "secondary" : "destructive"}>{item.resultat}</Badge>
                    <Badge variant="outline">{item.statut}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Besoin d'aide?</CardTitle>
            <CardDescription>Posez vos questions sur le dépistage HPV</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => (window.location.href = "/chatbot")}>
              Discuter avec notre assistant virtuel
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
