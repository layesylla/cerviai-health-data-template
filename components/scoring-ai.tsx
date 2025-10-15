"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Brain, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function ScoringAI() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    score: number
    niveau: string
    recommandations: string[]
  } | null>(null)

  const [formData, setFormData] = useState({
    patientId: "",
    age: "",
    statutHPV: "",
    typeHPV: "",
    symptomes: [] as string[],
    antecedents: "",
    vaccination: "",
    nombreGrossesses: "",
    region: "",
    tabagisme: "",
    immunodeficience: "",
  })

  const symptomesOptions = [
    "Saignements anormaux",
    "Pertes vaginales inhabituelles",
    "Douleurs pelviennes",
    "Douleurs pendant les rapports",
    "Aucun symptôme",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    // Simulate AI scoring API call to Python microservice
    // POST /api/scoring/calculate
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI scoring result
    const mockScore = Math.floor(Math.random() * 100)
    let niveau = "Faible"
    let recommandations = ["Suivi de routine annuel", "Maintenir un mode de vie sain"]

    if (mockScore >= 70) {
      niveau = "Élevé"
      recommandations = [
        "Consultation spécialisée urgente recommandée",
        "Biopsie et examens complémentaires nécessaires",
        "Suivi rapproché tous les 3 mois",
        "Évaluation pour traitement immédiat",
      ]
    } else if (mockScore >= 40) {
      niveau = "Moyen"
      recommandations = [
        "Consultation de suivi dans les 3 mois",
        "Examens complémentaires recommandés",
        "Surveillance régulière tous les 6 mois",
        "Éducation sur les facteurs de risque",
      ]
    }

    setResult({ score: mockScore, niveau, recommandations })
    setLoading(false)
  }

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case "Élevé":
        return "text-red-600"
      case "Moyen":
        return "text-orange-600"
      case "Faible":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getNiveauIcon = (niveau: string) => {
    switch (niveau) {
      case "Élevé":
        return <AlertTriangle className="h-8 w-8 text-red-600" />
      case "Moyen":
        return <Info className="h-8 w-8 text-orange-600" />
      case "Faible":
        return <CheckCircle className="h-8 w-8 text-green-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Scoring IA - Évaluation du risque</h1>
          <p className="text-muted-foreground mt-1">Analyse prédictive basée sur l'intelligence artificielle</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Identification de la patiente</CardTitle>
                  <CardDescription>Sélectionner ou saisir les informations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientId">ID Patiente *</Label>
                      <Input
                        id="patientId"
                        placeholder="P-2024-001"
                        value={formData.patientId}
                        onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Âge *</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="35"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paramètres médicaux</CardTitle>
                  <CardDescription>Données cliniques pour l'analyse</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="statutHPV">Statut HPV *</Label>
                      <Select
                        value={formData.statutHPV}
                        onValueChange={(value) => setFormData({ ...formData, statutHPV: value })}
                        required
                      >
                        <SelectTrigger id="statutHPV">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Positif">Positif</SelectItem>
                          <SelectItem value="Négatif">Négatif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="typeHPV">Type HPV</Label>
                      <Select
                        value={formData.typeHPV}
                        onValueChange={(value) => setFormData({ ...formData, typeHPV: value })}
                      >
                        <SelectTrigger id="typeHPV">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HPV-16">HPV-16 (haut risque)</SelectItem>
                          <SelectItem value="HPV-18">HPV-18 (haut risque)</SelectItem>
                          <SelectItem value="HPV-31">HPV-31</SelectItem>
                          <SelectItem value="Autre">Autre type</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vaccination">Vaccination HPV</Label>
                      <Select
                        value={formData.vaccination}
                        onValueChange={(value) => setFormData({ ...formData, vaccination: value })}
                      >
                        <SelectTrigger id="vaccination">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Oui">Oui (complète)</SelectItem>
                          <SelectItem value="Partielle">Partielle</SelectItem>
                          <SelectItem value="Non">Non</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nombreGrossesses">Nombre de grossesses</Label>
                      <Input
                        id="nombreGrossesses"
                        type="number"
                        placeholder="0"
                        value={formData.nombreGrossesses}
                        onChange={(e) => setFormData({ ...formData, nombreGrossesses: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Symptômes observés</Label>
                    <div className="space-y-2">
                      {symptomesOptions.map((symptome) => (
                        <div key={symptome} className="flex items-center space-x-2">
                          <Checkbox
                            id={`scoring-${symptome}`}
                            checked={formData.symptomes.includes(symptome)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, symptomes: [...formData.symptomes, symptome] })
                              } else {
                                setFormData({
                                  ...formData,
                                  symptomes: formData.symptomes.filter((s) => s !== symptome),
                                })
                              }
                            }}
                          />
                          <Label htmlFor={`scoring-${symptome}`} className="font-normal cursor-pointer">
                            {symptome}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Facteurs socio-démographiques</CardTitle>
                  <CardDescription>Contexte et facteurs de risque</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="region">Région *</Label>
                      <Select
                        value={formData.region}
                        onValueChange={(value) => setFormData({ ...formData, region: value })}
                        required
                      >
                        <SelectTrigger id="region">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dakar">Dakar</SelectItem>
                          <SelectItem value="Thiès">Thiès</SelectItem>
                          <SelectItem value="Saint-Louis">Saint-Louis</SelectItem>
                          <SelectItem value="Kaolack">Kaolack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tabagisme">Tabagisme</Label>
                      <Select
                        value={formData.tabagisme}
                        onValueChange={(value) => setFormData({ ...formData, tabagisme: value })}
                      >
                        <SelectTrigger id="tabagisme">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Oui">Oui</SelectItem>
                          <SelectItem value="Non">Non</SelectItem>
                          <SelectItem value="Ancien">Ancien fumeur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="immunodeficience">Immunodéficience</Label>
                      <Select
                        value={formData.immunodeficience}
                        onValueChange={(value) => setFormData({ ...formData, immunodeficience: value })}
                      >
                        <SelectTrigger id="immunodeficience">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Oui">Oui</SelectItem>
                          <SelectItem value="Non">Non</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading} size="lg">
                  {loading ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-pulse" />
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyser le risque
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          {result ? (
            <div className="space-y-4 sticky top-4">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getNiveauIcon(result.niveau)}
                    Résultat de l'analyse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Score de risque</p>
                    <p className={`text-6xl font-bold ${getNiveauColor(result.niveau)}`}>{result.score}%</p>
                    <Progress value={result.score} className="h-3" />
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Niveau de risque</p>
                    <p className={`text-2xl font-bold ${getNiveauColor(result.niveau)}`}>{result.niveau}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-sm">Recommandations :</p>
                    <ul className="space-y-2">
                      {result.recommandations.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Note importante</AlertTitle>
                    <AlertDescription className="text-xs">
                      Ce score est généré par IA et doit être interprété par un professionnel de santé qualifié.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Résultat de l'analyse</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p>Remplissez le formulaire et cliquez sur "Analyser le risque" pour obtenir le score prédictif</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
