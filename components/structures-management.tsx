"use client"

import { useState } from "react"
import { useStructures } from "@/lib/structures-context"
import { usePatients } from "@/lib/patients-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Building2, Users, Activity, Search, Plus, MapIcon, BarChart3 } from "lucide-react"
import { StructuresMap } from "@/components/structures-map"
import { StructuresStats } from "@/components/structures-stats"
import { AddStructureDialog } from "@/components/add-structure-dialog"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { StructureAgentsList } from "@/components/structure-agents-list"
import { getAgentsByStructure } from "@/lib/auth"
import type { User } from "@/lib/auth"

export function StructuresManagement() {
  const { structures } = useStructures()
  const { patients } = usePatients()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(null)

  const getAgentsForStructure = (structureId: string): User[] => {
    return getAgentsByStructure(structureId)
  }

  const regions = ["all", ...Array.from(new Set(structures.map((s) => s.region)))]

  const filteredStructures = structures.filter((structure) => {
    const matchesSearch =
      structure.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      structure.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || structure.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  const calculateTotalAgents = () => {
    let total = 0
    structures.forEach((structure) => {
      total += getAgentsForStructure(structure.id).length
    })
    return total
  }

  const totalDepistages = structures.reduce((sum, s) => sum + s.nombreDepistages, 0)
  const totalAgents = calculateTotalAgents()
  const activeStructures = structures.filter((s) => s.statut === "actif").length

  const typeLabels = {
    hopital: "Hôpital",
    "centre-sante": "Centre de santé",
    "poste-sante": "Poste de santé",
    clinique: "Clinique",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Structures de Santé
          </h1>
          <p className="text-muted-foreground mt-1">Géolocalisation et gestion des structures de dépistage</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter une structure
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Structures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{structures.length}</div>
              <Building2 className="h-8 w-8 text-primary opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{activeStructures} actives</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Agents de Santé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalAgents}</div>
              <Users className="h-8 w-8 text-secondary opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Répartis dans {structures.length} structures</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dépistages Réalisés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalDepistages}</div>
              <Activity className="h-8 w-8 text-success opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Toutes structures confondues</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-gold">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Couverture Régionale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{regions.length - 1}</div>
              <MapPin className="h-8 w-8 text-rose-gold opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Régions couvertes</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="map" className="gap-2">
            <MapIcon className="h-4 w-4" />
            Carte
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-2">
            <Building2 className="h-4 w-4" />
            Liste
          </TabsTrigger>
          <TabsTrigger value="stats" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistiques
          </TabsTrigger>
        </TabsList>

        {/* Map View */}
        <TabsContent value="map" className="space-y-4">
          <StructuresMap structures={filteredStructures} />
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une structure..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedRegion === "all" ? "default" : "outline"}
                    onClick={() => setSelectedRegion("all")}
                    size="sm"
                  >
                    Toutes les régions
                  </Button>
                  {regions.slice(1, 4).map((region) => (
                    <Button
                      key={region}
                      variant={selectedRegion === region ? "default" : "outline"}
                      onClick={() => setSelectedRegion(region)}
                      size="sm"
                    >
                      {region}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Structures List */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStructures.map((structure) => {
              const agentCount = getAgentsForStructure(structure.id).length

              return (
                <Card key={structure.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{structure.nom}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {structure.region}, {structure.departement}
                        </CardDescription>
                      </div>
                      <Badge variant={structure.statut === "actif" ? "default" : "secondary"}>{structure.statut}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <Badge variant="outline">{typeLabels[structure.type]}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Dépistages</p>
                        <p className="text-2xl font-bold text-primary">{structure.nombreDepistages}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Agents</p>
                        <p className="text-2xl font-bold text-secondary">{agentCount}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Équipements disponibles</p>
                      <div className="flex flex-wrap gap-1">
                        {structure.equipements.slice(0, 3).map((eq, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {eq}
                          </Badge>
                        ))}
                        {structure.equipements.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{structure.equipements.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t space-y-1 text-xs text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {structure.adresse}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setSelectedStructureId(structure.id)}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Voir les agents ({agentCount})
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {selectedStructureId && (
            <Dialog open={!!selectedStructureId} onOpenChange={() => setSelectedStructureId(null)}>
              <DialogContent className="max-w-2xl">
                <StructureAgentsList
                  structureId={selectedStructureId}
                  structureName={structures.find((s) => s.id === selectedStructureId)?.nom || ""}
                  agents={getAgentsForStructure(selectedStructureId)}
                />
              </DialogContent>
            </Dialog>
          )}

          {filteredStructures.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">Aucune structure trouvée</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Statistics View */}
        <TabsContent value="stats" className="space-y-4">
          <StructuresStats structures={structures} patients={patients} />
        </TabsContent>
      </Tabs>

      {/* Add Structure Dialog */}
      <AddStructureDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
