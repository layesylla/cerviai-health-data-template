"use client"
import { getCurrentUser } from "@/lib/auth"
import { MedecinForm } from "@/components/forms/medecin-form"
import { ChercheurForm } from "@/components/forms/chercheur-form"
import { LaborantinForm } from "@/components/forms/laborantin-form"
import { FileText, FlaskConical, Stethoscope } from "lucide-react"

export function DataCollectionForm() {
  const user = getCurrentUser()

  if (!user) return null

  const roleIcons = {
    medecin: Stethoscope,
    chercheur: FileText,
    laborantin: FlaskConical,
  }

  const roleTitles = {
    medecin: "Collecte de données cliniques",
    chercheur: "Collecte de données de recherche",
    laborantin: "Collecte de données de laboratoire",
  }

  const roleDescriptions = {
    medecin: "Enregistrez les données des patients et les observations cliniques",
    chercheur: "Documentez vos études et collectez des données épidémiologiques",
    laborantin: "Saisissez les résultats d'analyses et tests de laboratoire",
  }

  const Icon = roleIcons[user.role as keyof typeof roleIcons]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {Icon && <Icon className="h-8 w-8 text-primary" />}
          <h1 className="text-3xl font-bold">{roleTitles[user.role as keyof typeof roleTitles]}</h1>
        </div>
        <p className="text-muted-foreground">{roleDescriptions[user.role as keyof typeof roleDescriptions]}</p>
      </div>

      {user.role === "medecin" && <MedecinForm />}
      {user.role === "chercheur" && <ChercheurForm />}
      {user.role === "laborantin" && <LaborantinForm />}
    </div>
  )
}
