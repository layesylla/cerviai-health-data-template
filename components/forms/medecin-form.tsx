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
import { Checkbox } from "@/components/ui/checkbox"
import { usePatients } from "@/lib/patients-context"
import { useRouter } from "next/navigation"

export function MedecinForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { addPatient } = usePatients()
  const router = useRouter()

  const [formData, setFormData] = useState({
    patientId: "",
    nom: "",
    prenom: "",
    age: "",
    dateNaissance: "",
    telephone: "",
    region: "",
    departement: "",
    commune: "",
    statutHPV: "",
    typeHPV: "",
    resultatDepistage: "",
    dateDepistage: "",
    antecedentsGyneco: "",
    symptomes: [] as string[],
    grossesseEnCours: "",
    nombreGrossesses: "",
    vaccination: "",
    dateVaccination: "",
    observations: "",
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
    setSuccess(false)

    // POST /api/depistage/create
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] HPV screening data submitted:", formData)

    addPatient(formData)

    setSuccess(true)
    setLoading(false)

    setTimeout(() => {
      router.push("/patients")
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {success && (
          <Alert className="bg-secondary text-secondary-foreground border-secondary">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Données de dépistage enregistrées avec succès. Redirection vers la liste des patientes...
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Informations de la patiente</CardTitle>
            <CardDescription>Données démographiques et identification</CardDescription>
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
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  placeholder="Nom de famille"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom *</Label>
                <Input
                  id="prenom"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
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

              <div className="space-y-2">
                <Label htmlFor="dateNaissance">Date de naissance</Label>
                <Input
                  id="dateNaissance"
                  type="date"
                  value={formData.dateNaissance}
                  onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  placeholder="+221 77 123 45 67"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Localisation géographique</CardTitle>
            <CardDescription>Zone de dépistage au Sénégal</CardDescription>
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
                    <SelectItem value="Diourbel">Diourbel</SelectItem>
                    <SelectItem value="Kaolack">Kaolack</SelectItem>
                    <SelectItem value="Fatick">Fatick</SelectItem>
                    <SelectItem value="Louga">Louga</SelectItem>
                    <SelectItem value="Matam">Matam</SelectItem>
                    <SelectItem value="Tambacounda">Tambacounda</SelectItem>
                    <SelectItem value="Kolda">Kolda</SelectItem>
                    <SelectItem value="Ziguinchor">Ziguinchor</SelectItem>
                    <SelectItem value="Sédhiou">Sédhiou</SelectItem>
                    <SelectItem value="Kaffrine">Kaffrine</SelectItem>
                    <SelectItem value="Kédougou">Kédougou</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="departement">Département</Label>
                <Input
                  id="departement"
                  placeholder="Ex: Pikine"
                  value={formData.departement}
                  onChange={(e) => setFormData({ ...formData, departement: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commune">Commune</Label>
                <Input
                  id="commune"
                  placeholder="Ex: Guédiawaye"
                  value={formData.commune}
                  onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Données de dépistage HPV</CardTitle>
            <CardDescription>Résultats et statut HPV</CardDescription>
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
                    <SelectItem value="En attente">En attente de résultat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="typeHPV">Type HPV (si positif)</Label>
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
                    <SelectItem value="HPV-33">HPV-33</SelectItem>
                    <SelectItem value="HPV-45">HPV-45</SelectItem>
                    <SelectItem value="Autre">Autre type</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resultatDepistage">Résultat du dépistage *</Label>
                <Select
                  value={formData.resultatDepistage}
                  onValueChange={(value) => setFormData({ ...formData, resultatDepistage: value })}
                  required
                >
                  <SelectTrigger id="resultatDepistage">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Lésion précancéreuse">Lésion précancéreuse</SelectItem>
                    <SelectItem value="Cancer détecté">Cancer détecté</SelectItem>
                    <SelectItem value="Suivi requis">Suivi requis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateDepistage">Date du dépistage *</Label>
                <Input
                  id="dateDepistage"
                  type="date"
                  value={formData.dateDepistage}
                  onChange={(e) => setFormData({ ...formData, dateDepistage: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Symptômes observés</Label>
              <div className="space-y-2">
                {symptomesOptions.map((symptome) => (
                  <div key={symptome} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptome}
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
                    <Label htmlFor={symptome} className="font-normal cursor-pointer">
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
            <CardTitle>Antécédents et historique</CardTitle>
            <CardDescription>Informations gynécologiques et vaccination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="antecedentsGyneco">Antécédents gynécologiques</Label>
              <Textarea
                id="antecedentsGyneco"
                placeholder="Historique médical, interventions précédentes..."
                value={formData.antecedentsGyneco}
                onChange={(e) => setFormData({ ...formData, antecedentsGyneco: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grossesseEnCours">Grossesse en cours</Label>
                <Select
                  value={formData.grossesseEnCours}
                  onValueChange={(value) => setFormData({ ...formData, grossesseEnCours: value })}
                >
                  <SelectTrigger id="grossesseEnCours">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oui">Oui</SelectItem>
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
            </div>

            {formData.vaccination === "Oui" && (
              <div className="space-y-2">
                <Label htmlFor="dateVaccination">Date de vaccination</Label>
                <Input
                  id="dateVaccination"
                  type="date"
                  value={formData.dateVaccination}
                  onChange={(e) => setFormData({ ...formData, dateVaccination: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="observations">Observations complémentaires</Label>
              <Textarea
                id="observations"
                placeholder="Notes additionnelles, recommandations de suivi..."
                value={formData.observations}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
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
            {loading ? "Enregistrement..." : "Enregistrer le dépistage"}
          </Button>
        </div>
      </div>
    </form>
  )
}
