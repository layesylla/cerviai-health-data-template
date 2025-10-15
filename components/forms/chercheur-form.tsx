"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export function ChercheurForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    etudeId: "",
    typeEtude: "",
    population: "",
    tailleEchantillon: "",
    region: "",
    periode: "",
    objectif: "",
    methodologie: "",
    resultats: "",
    conclusions: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    // Simulate API call to your Spring Boot backend
    // POST /api/research-data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Research data submitted:", formData)
    setSuccess(true)
    setLoading(false)

    setTimeout(() => {
      setFormData({
        etudeId: "",
        typeEtude: "",
        population: "",
        tailleEchantillon: "",
        region: "",
        periode: "",
        objectif: "",
        methodologie: "",
        resultats: "",
        conclusions: "",
      })
      setSuccess(false)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {success && (
          <Alert className="bg-secondary text-secondary-foreground border-secondary">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>Données de recherche enregistrées avec succès</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Informations de l'étude</CardTitle>
            <CardDescription>Identification et contexte de la recherche</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="etudeId">ID Étude *</Label>
                <Input
                  id="etudeId"
                  placeholder="ETU-2024-001"
                  value={formData.etudeId}
                  onChange={(e) => setFormData({ ...formData, etudeId: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="typeEtude">Type d'étude *</Label>
                <Select
                  value={formData.typeEtude}
                  onValueChange={(value) => setFormData({ ...formData, typeEtude: value })}
                  required
                >
                  <SelectTrigger id="typeEtude">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="epidemiologique">Épidémiologique</SelectItem>
                    <SelectItem value="clinique">Clinique</SelectItem>
                    <SelectItem value="observationnelle">Observationnelle</SelectItem>
                    <SelectItem value="interventionnelle">Interventionnelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="population">Population cible *</Label>
                <Input
                  id="population"
                  placeholder="Ex: Adultes 18-65 ans"
                  value={formData.population}
                  onChange={(e) => setFormData({ ...formData, population: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tailleEchantillon">Taille échantillon *</Label>
                <Input
                  id="tailleEchantillon"
                  type="number"
                  placeholder="500"
                  value={formData.tailleEchantillon}
                  onChange={(e) => setFormData({ ...formData, tailleEchantillon: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Région *</Label>
                <Input
                  id="region"
                  placeholder="Ex: Dakar, Sénégal"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="periode">Période *</Label>
                <Input
                  id="periode"
                  placeholder="Ex: Janvier - Juin 2024"
                  value={formData.periode}
                  onChange={(e) => setFormData({ ...formData, periode: e.target.value })}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails de la recherche</CardTitle>
            <CardDescription>Objectifs, méthodologie et résultats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="objectif">Objectif de l'étude *</Label>
              <Textarea
                id="objectif"
                placeholder="Décrivez l'objectif principal de votre recherche..."
                value={formData.objectif}
                onChange={(e) => setFormData({ ...formData, objectif: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="methodologie">Méthodologie *</Label>
              <Textarea
                id="methodologie"
                placeholder="Décrivez la méthodologie utilisée..."
                value={formData.methodologie}
                onChange={(e) => setFormData({ ...formData, methodologie: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resultats">Résultats préliminaires</Label>
              <Textarea
                id="resultats"
                placeholder="Résumez les résultats obtenus..."
                value={formData.resultats}
                onChange={(e) => setFormData({ ...formData, resultats: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="conclusions">Conclusions</Label>
              <Textarea
                id="conclusions"
                placeholder="Conclusions et recommandations..."
                value={formData.conclusions}
                onChange={(e) => setFormData({ ...formData, conclusions: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => window.location.reload()}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Enregistrement..." : "Enregistrer les données"}
          </Button>
        </div>
      </div>
    </form>
  )
}
