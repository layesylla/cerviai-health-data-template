"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, FlaskConical, Stethoscope } from "lucide-react"

export function RecentData() {
  // Mock data - replace with real API calls
  const recentRecords = [
    {
      id: "1",
      type: "medecin",
      patientId: "P-2024-156",
      diagnostic: "Paludisme",
      date: "2024-06-15",
      medecin: "Dr. Diallo",
      status: "complete",
    },
    {
      id: "2",
      type: "laborantin",
      echantillonId: "ECH-2024-089",
      analyse: "Hémogramme",
      date: "2024-06-15",
      technicien: "M. Koné",
      status: "complete",
    },
    {
      id: "3",
      type: "chercheur",
      etudeId: "ETU-2024-012",
      titre: "Étude épidémiologique",
      date: "2024-06-14",
      chercheur: "Prof. Ndiaye",
      status: "en-cours",
    },
    {
      id: "4",
      type: "medecin",
      patientId: "P-2024-157",
      diagnostic: "Diabète Type 2",
      date: "2024-06-14",
      medecin: "Dr. Sow",
      status: "complete",
    },
    {
      id: "5",
      type: "laborantin",
      echantillonId: "ECH-2024-090",
      analyse: "Glycémie",
      date: "2024-06-14",
      technicien: "Mme. Ba",
      status: "complete",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "medecin":
        return <Stethoscope className="h-4 w-4" />
      case "chercheur":
        return <FileText className="h-4 w-4" />
      case "laborantin":
        return <FlaskConical className="h-4 w-4" />
      default:
        return null
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "medecin":
        return "Clinique"
      case "chercheur":
        return "Recherche"
      case "laborantin":
        return "Laboratoire"
      default:
        return type
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Données récentes</CardTitle>
        <CardDescription>Dernières entrées dans la plateforme</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Identifiant</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getIcon(record.type)}
                    <span className="text-sm">{getTypeLabel(record.type)}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {record.type === "medecin" && record.patientId}
                  {record.type === "laborantin" && record.echantillonId}
                  {record.type === "chercheur" && record.etudeId}
                </TableCell>
                <TableCell>
                  {record.type === "medecin" && record.diagnostic}
                  {record.type === "laborantin" && record.analyse}
                  {record.type === "chercheur" && record.titre}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{record.date}</TableCell>
                <TableCell className="text-sm">
                  {record.type === "medecin" && record.medecin}
                  {record.type === "laborantin" && record.technicien}
                  {record.type === "chercheur" && record.chercheur}
                </TableCell>
                <TableCell>
                  <Badge variant={record.status === "complete" ? "default" : "secondary"}>
                    {record.status === "complete" ? "Complet" : "En cours"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
