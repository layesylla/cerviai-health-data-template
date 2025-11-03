"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Campaign {
  id: string
  nom: string
  region: string
  dateDebut: string
  dateFin: string
  objectif: number
  description: string
  createdAt: Date
}

interface CampaignsContextType {
  campaigns: Campaign[]
  addCampaign: (campaign: Omit<Campaign, "id" | "createdAt">) => void
  getCampaigns: () => Campaign[]
  getCampaignsByRegion: (region: string) => Campaign[]
}

const CampaignsContext = createContext<CampaignsContextType | undefined>(undefined)

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    nom: "Campagne Dakar 2024",
    region: "Dakar",
    dateDebut: "2024-01-01",
    dateFin: "2024-03-31",
    objectif: 5000,
    description: "Campagne de dépistage massif dans la région de Dakar",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    nom: "Campagne Thiès 2024",
    region: "Thiès",
    dateDebut: "2024-02-01",
    dateFin: "2024-04-30",
    objectif: 3000,
    description: "Dépistage dans les centres de santé de Thiès",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    nom: "Campagne Saint-Louis 2025",
    region: "Saint-Louis",
    dateDebut: "2025-09-01",
    dateFin: "2025-11-30",
    objectif: 2000,
    description: "Campagne en cours dans la région de Saint-Louis",
    createdAt: new Date("2025-09-01"),
  },
  {
    id: "4",
    nom: "Campagne Kaolack 2025",
    region: "Kaolack",
    dateDebut: "2025-12-01",
    dateFin: "2026-02-28",
    objectif: 2500,
    description: "Campagne planifiée pour la région de Kaolack",
    createdAt: new Date("2025-12-01"),
  },
]

export function CampaignsProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)

  const addCampaign = (campaignData: Omit<Campaign, "id" | "createdAt">) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }

    console.log("[v0] Adding campaign to context:", newCampaign)
    setCampaigns((prev) => [newCampaign, ...prev])
  }

  const getCampaigns = () => campaigns

  const getCampaignsByRegion = (region: string) => campaigns.filter((c) => c.region === region)

  return (
    <CampaignsContext.Provider value={{ campaigns, addCampaign, getCampaigns, getCampaignsByRegion }}>
      {children}
    </CampaignsContext.Provider>
  )
}

export function useCampaigns() {
  const context = useContext(CampaignsContext)
  if (context === undefined) {
    throw new Error("useCampaigns must be used within a CampaignsProvider")
  }
  return context
}
