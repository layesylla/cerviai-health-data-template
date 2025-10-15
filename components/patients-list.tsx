"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Eye, Calculator } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { usePatients } from "@/lib/patients-context"
import { useRouter } from "next/navigation"

export function PatientsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRegion, setFilterRegion] = useState("all")
  const [filterStatut, setFilterStatut] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const { patients } = usePatients()
  const router = useRouter()

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = filterRegion === "all" || patient.region === filterRegion
    const matchesStatut = filterStatut === "all" || patient.statutHPV === filterStatut
    return matchesSearch && matchesRegion && matchesStatut
  })

  const getRisqueBadge = (risque: string) => {
    switch (risque) {
      case "Élevé":
        return <Badge variant="destructive">{risque}</Badge>
      case "Moyen":
        return <Badge className="bg-orange-500 text-white">{risque}</Badge>
      case "Faible":
        return <Badge className="bg-secondary text-secondary-foreground">{risque}</Badge>
      default:
        return <Badge variant="outline">{risque}</Badge>
    }
  }

  const getStatutBadge = (statut: string) => {
    return statut === "Positif" ? (
      <Badge variant="destructive">{statut}</Badge>
    ) : (
      <Badge className="bg-secondary text-secondary-foreground">{statut}</Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des patientes</h1>
          <p className="text-muted-foreground mt-1">Liste des patientes dépistées</p>
        </div>
        <Button onClick={() => router.push("/collect")}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle patiente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recherche et filtres</CardTitle>
          <CardDescription>Filtrer les patientes par critères</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nom, prénom ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des patientes ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom complet</TableHead>
                <TableHead>Âge</TableHead>
                <TableHead>Région</TableHead>
                <TableHead>Statut HPV</TableHead>
                <TableHead>Type HPV</TableHead>
                <TableHead>Résultat</TableHead>
                <TableHead>Niveau de risque</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-mono text-sm">{patient.patientId}</TableCell>
                  <TableCell className="font-medium">
                    {patient.prenom} {patient.nom}
                  </TableCell>
                  <TableCell>{patient.age} ans</TableCell>
                  <TableCell>{patient.region}</TableCell>
                  <TableCell>{getStatutBadge(patient.statutHPV)}</TableCell>
                  <TableCell>{patient.typeHPV || "-"}</TableCell>
                  <TableCell>{patient.resultatDepistage}</TableCell>
                  <TableCell>{getRisqueBadge(patient.risque || "Faible")}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Détails de la patiente</DialogTitle>
                            <DialogDescription>Informations complètes du dossier médical</DialogDescription>
                          </DialogHeader>
                          {selectedPatient && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">ID Patiente</p>
                                  <p className="font-mono">{selectedPatient.patientId}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Nom complet</p>
                                  <p className="font-medium">
                                    {selectedPatient.prenom} {selectedPatient.nom}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Âge</p>
                                  <p>{selectedPatient.age} ans</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Région</p>
                                  <p>{selectedPatient.region}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Statut HPV</p>
                                  <div className="mt-1">{getStatutBadge(selectedPatient.statutHPV)}</div>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Type HPV</p>
                                  <p>{selectedPatient.typeHPV || "-"}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Résultat</p>
                                  <p>{selectedPatient.resultatDepistage}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Date de dépistage</p>
                                  <p>{new Date(selectedPatient.dateDepistage).toLocaleDateString("fr-FR")}</p>
                                </div>
                                <div className="col-span-2">
                                  <p className="text-sm text-muted-foreground">Niveau de risque</p>
                                  <div className="mt-1">{getRisqueBadge(selectedPatient.risque || "Faible")}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
