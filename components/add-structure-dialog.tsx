"use client"

import type React from "react"

import { useState } from "react"
import { useStructures, regionCoordinates } from "@/lib/structures-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface AddStructureDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddStructureDialog({ open, onOpenChange }: AddStructureDialogProps) {
  const { addStructure } = useStructures()
  const [formData, setFormData] = useState({
    nom: "",
    type: "centre-sante" as "hopital" | "centre-sante" | "poste-sante" | "clinique",
    region: "",
    departement: "",
    commune: "",
    adresse: "",
    telephone: "",
    email: "",
    effectif: "",
    equipements: [] as string[],
  })

  const equipementsList = [
    "Laboratoire HPV",
    "Colposcopie",
    "Échographie",
    "Radiologie",
    "Test HPV",
    "Consultation gynéco",
    "Biopsie",
    "Cryothérapie",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const coords = regionCoordinates[formData.region] || { lat: 14.7167, lng: -17.4677 }

    addStructure({
      ...formData,
      latitude: coords.lat + (Math.random() - 0.5) * 0.1,
      longitude: coords.lng + (Math.random() - 0.5) * 0.1,
      effectif: Number.parseInt(formData.effectif) || 10,
      statut: "actif",
      nombreDepistages: 0,
    })

    onOpenChange(false)
    setFormData({
      nom: "",
      type: "centre-sante",
      region: "",
      departement: "",
      commune: "",
      adresse: "",
      telephone: "",
      email: "",
      effectif: "",
      equipements: [],
    })
  }

  const toggleEquipement = (equipement: string) => {
    setFormData((prev) => ({
      ...prev,
      equipements: prev.equipements.includes(equipement)
        ? prev.equipements.filter((e) => e !== equipement)
        : [...prev.equipements, equipement],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une Structure de Santé</DialogTitle>
          <DialogDescription>Enregistrez une nouvelle structure dans le système</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom de la structure *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hopital">Hôpital</SelectItem>
                  <SelectItem value="centre-sante">Centre de santé</SelectItem>
                  <SelectItem value="poste-sante">Poste de santé</SelectItem>
                  <SelectItem value="clinique">Clinique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Région *</Label>
              <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(regionCoordinates).map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departement">Département *</Label>
              <Input
                id="departement"
                value={formData.departement}
                onChange={(e) => setFormData({ ...formData, departement: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commune">Commune *</Label>
              <Input
                id="commune"
                value={formData.commune}
                onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="effectif">Effectif</Label>
              <Input
                id="effectif"
                type="number"
                value={formData.effectif}
                onChange={(e) => setFormData({ ...formData, effectif: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="adresse">Adresse *</Label>
              <Input
                id="adresse"
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Équipements disponibles</Label>
            <div className="grid grid-cols-2 gap-3">
              {equipementsList.map((equipement) => (
                <div key={equipement} className="flex items-center space-x-2">
                  <Checkbox
                    id={equipement}
                    checked={formData.equipements.includes(equipement)}
                    onCheckedChange={() => toggleEquipement(equipement)}
                  />
                  <label htmlFor={equipement} className="text-sm cursor-pointer">
                    {equipement}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter la structure</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
