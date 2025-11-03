"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, MapPin, Users, TrendingUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCampaigns } from "@/lib/campaigns-context"
import { usePatients } from "@/lib/patients-context"

export function CampaignsManagement() {
  const { campaigns, addCampaign } = useCampaigns()
  const { patients, getPatientsByCampaign } = usePatients()

  const calculateStatut = (dateDebut: string, dateFin: string): "En cours" | "Terminée" | "Planifiée" => {
    const today = new Date("2025-10-27")
    const debut = new Date(dateDebut)
    const fin = new Date(dateFin)

    if (today < debut) {
      return "Planifiée"
    } else if (today >= debut && today <= fin) {
      return "En cours"
    } else {
      return "Terminée"
    }
  }

  const [newCampaign, setNewCampaign] = useState({
    nom: "",
    region: "",
    dateDebut: "",
    dateFin: "",
    objectif: "",
    description: "",
  })

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleCreateCampaign = () => {
    addCampaign({
      nom: newCampaign.nom,
      region: newCampaign.region,
      dateDebut: newCampaign.dateDebut,
      dateFin: newCampaign.dateFin,
      objectif: Number.parseInt(newCampaign.objectif),
      description: newCampaign.description,
    })

    setNewCampaign({
      nom: "",
      region: "",
      dateDebut: "",
      dateFin: "",
      objectif: "",
      description: "",
    })
    setDialogOpen(false)
  }

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "En cours":
        return <Badge className="bg-green-500 text-white">{statut}</Badge>
      case "Terminée":
        return <Badge variant="secondary">{statut}</Badge>
      case "Planifiée":
        return <Badge className="bg-blue-500 text-white">{statut}</Badge>
      default:
        return <Badge variant="outline">{statut}</Badge>
    }
  }

  const getDepistees = (campaignId: string) => {
    return getPatientsByCampaign(campaignId).length
  }

  const getProgress = (campaignId: string, objectif: number) => {
    const depistees = getDepistees(campaignId)
    return ((depistees / objectif) * 100).toFixed(1)
  }

  const totalDepistees = patients.filter((p) => p.campagneId).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des campagnes</h1>
          <p className="text-muted-foreground mt-1">Créer et suivre les campagnes de dépistage</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle campagne
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle campagne</DialogTitle>
              <DialogDescription>Planifier une campagne de dépistage dans une région</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom de la campagne *</Label>
                <Input
                  id="nom"
                  placeholder="Ex: Campagne Dakar 2024"
                  value={newCampaign.nom}
                  onChange={(e) => setNewCampaign({ ...newCampaign, nom: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Région *</Label>
                  <Select
                    value={newCampaign.region}
                    onValueChange={(value) => setNewCampaign({ ...newCampaign, region: value })}
                  >
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dakar">Dakar</SelectItem>
                      <SelectItem value="Thiès">Thiès</SelectItem>
                      <SelectItem value="Saint-Louis">Saint-Louis</SelectItem>
                      <SelectItem value="Kaolack">Kaolack</SelectItem>
                      <SelectItem value="Ziguinchor">Ziguinchor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectif">Objectif (nombre de patientes) *</Label>
                  <Input
                    id="objectif"
                    type="number"
                    placeholder="5000"
                    value={newCampaign.objectif}
                    onChange={(e) => setNewCampaign({ ...newCampaign, objectif: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateDebut">Date de début *</Label>
                  <Input
                    id="dateDebut"
                    type="date"
                    value={newCampaign.dateDebut}
                    onChange={(e) => setNewCampaign({ ...newCampaign, dateDebut: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFin">Date de fin *</Label>
                  <Input
                    id="dateFin"
                    type="date"
                    value={newCampaign.dateFin}
                    onChange={(e) => setNewCampaign({ ...newCampaign, dateFin: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez les objectifs et le déroulement de la campagne..."
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateCampaign}>Créer la campagne</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campagnes actives</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter((c) => calculateStatut(c.dateDebut, c.dateFin) === "En cours").length}
            </div>
            <p className="text-xs text-muted-foreground">En cours actuellement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total dépistées</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDepistees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Toutes campagnes confondues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réalisation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.length > 0
                ? ((totalDepistees / campaigns.reduce((acc, c) => acc + c.objectif, 0)) * 100).toFixed(1)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Objectifs atteints</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => {
          const currentStatut = calculateStatut(campaign.dateDebut, campaign.dateFin)
          const depistees = getDepistees(campaign.id)
          const progress = getProgress(campaign.id, campaign.objectif)

          return (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{campaign.nom}</CardTitle>
                    <CardDescription className="mt-1">{campaign.description}</CardDescription>
                  </div>
                  {getStatutBadge(currentStatut)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Région</p>
                      <p className="font-semibold">{campaign.region}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Période</p>
                      <p className="font-semibold text-sm">
                        {new Date(campaign.dateDebut).toLocaleDateString("fr-FR")} -{" "}
                        {new Date(campaign.dateFin).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Progression</p>
                      <p className="font-semibold">
                        {depistees.toLocaleString()} / {campaign.objectif.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Taux</p>
                      <p className="font-semibold">{progress}%</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
