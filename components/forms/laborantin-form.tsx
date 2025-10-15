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

export function LaborantinForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    echantillonId: "",
    patientId: "",
    typeAnalyse: "",
    datePrelevement: "",
    dateAnalyse: "",
    hemoglobine: "",
    leucocytes: "",
    plaquettes: "",
    glycemie: "",
    creatinine: "",
    resultats: "",
    interpretation: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    // Simulate API call to your Spring Boot backend
    // POST /api/lab-results
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Lab data submitted:", formData)
    setSuccess(true)
    setLoading(false)

    setTimeout(() => {
      setFormData({
        echantillonId: "",
        patientId: "",
        typeAnalyse: "",
        datePrelevement: "",
        dateAnalyse: "",
        hemoglobine: "",
        leucocytes: "",
        plaquettes: "",
        glycemie: "",
        creatinine: "",
        resultats: "",
        interpretation: "",
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
            <AlertDescription>Résultats de laboratoire enregistrés avec succès</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Informations de l'échantillon</CardTitle>
            <CardDescription>Identification et traçabilité</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="echantillonId">ID Échantillon *</Label>
                <Input
                  id="echantillonId"
                  placeholder="ECH-2024-001"
                  value={formData.echantillonId}
                  onChange={(e) => setFormData({ ...formData, echantillonId: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientId">ID Patient *</Label>
                <Input
                  id="patientId"
                  placeholder="P-2024-001"
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="typeAnalyse">Type d'analyse *</Label>
                <Select
                  value={formData.typeAnalyse}
                  onValueChange={(value) => setFormData({ ...formData, typeAnalyse: value })}
                  required
                >
                  <SelectTrigger id="typeAnalyse">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hemogramme">Hémogramme complet</SelectItem>
                    <SelectItem value="biochimie">Biochimie sanguine</SelectItem>
                    <SelectItem value="serologie">Sérologie</SelectItem>
                    <SelectItem value="parasitologie">Parasitologie</SelectItem>
                    <SelectItem value="bacteriologie">Bactériologie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="datePrelevement">Date prélèvement *</Label>
                <Input
                  id="datePrelevement"
                  type="date"
                  value={formData.datePrelevement}
                  onChange={(e) => setFormData({ ...formData, datePrelevement: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateAnalyse">Date analyse *</Label>
                <Input
                  id="dateAnalyse"
                  type="date"
                  value={formData.dateAnalyse}
                  onChange={(e) => setFormData({ ...formData, dateAnalyse: e.target.value })}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Résultats d'analyses</CardTitle>
            <CardDescription>Valeurs mesurées et paramètres biologiques</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hemoglobine">Hémoglobine (g/dL)</Label>
                <Input
                  id="hemoglobine"
                  type="number"
                  step="0.1"
                  placeholder="13.5"
                  value={formData.hemoglobine}
                  onChange={(e) => setFormData({ ...formData, hemoglobine: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="leucocytes">Leucocytes (10³/µL)</Label>
                <Input
                  id="leucocytes"
                  type="number"
                  step="0.1"
                  placeholder="7.5"
                  value={formData.leucocytes}
                  onChange={(e) => setFormData({ ...formData, leucocytes: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plaquettes">Plaquettes (10³/µL)</Label>
                <Input
                  id="plaquettes"
                  type="number"
                  placeholder="250"
                  value={formData.plaquettes}
                  onChange={(e) => setFormData({ ...formData, plaquettes: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="glycemie">Glycémie (g/L)</Label>
                <Input
                  id="glycemie"
                  type="number"
                  step="0.01"
                  placeholder="0.95"
                  value={formData.glycemie}
                  onChange={(e) => setFormData({ ...formData, glycemie: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creatinine">Créatinine (mg/L)</Label>
                <Input
                  id="creatinine"
                  type="number"
                  step="0.1"
                  placeholder="10.5"
                  value={formData.creatinine}
                  onChange={(e) => setFormData({ ...formData, creatinine: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resultats">Résultats complets *</Label>
              <Textarea
                id="resultats"
                placeholder="Détaillez tous les résultats d'analyses..."
                value={formData.resultats}
                onChange={(e) => setFormData({ ...formData, resultats: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interpretation">Interprétation</Label>
              <Textarea
                id="interpretation"
                placeholder="Commentaires et interprétation des résultats..."
                value={formData.interpretation}
                onChange={(e) => setFormData({ ...formData, interpretation: e.target.value })}
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
            {loading ? "Enregistrement..." : "Enregistrer les résultats"}
          </Button>
        </div>
      </div>
    </form>
  )
}
