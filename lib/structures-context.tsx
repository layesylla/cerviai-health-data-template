"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Structure {
  id: string
  nom: string
  type: "hopital" | "centre-sante" | "poste-sante" | "clinique"
  region: string
  departement: string
  commune: string
  adresse: string
  telephone: string
  email: string
  latitude: number
  longitude: number
  effectif: number
  equipements: string[]
  statut: "actif" | "inactif"
  nombreDepistages: number
  createdAt: Date
}

interface StructuresContextType {
  structures: Structure[]
  addStructure: (structure: Omit<Structure, "id" | "createdAt">) => void
  getStructures: () => Structure[]
  getStructuresByRegion: (region: string) => Structure[]
  updateStructureStats: (structureId: string, depistages: number) => void
}

const StructuresContext = createContext<StructuresContextType | undefined>(undefined)

// Coordonnées approximatives des régions du Sénégal
const regionCoordinates: Record<string, { lat: number; lng: number }> = {
  Dakar: { lat: 14.7167, lng: -17.4677 },
  Thiès: { lat: 14.7886, lng: -16.9261 },
  "Saint-Louis": { lat: 16.0179, lng: -16.4897 },
  Diourbel: { lat: 14.6537, lng: -16.2314 },
  Kaolack: { lat: 14.1522, lng: -16.0755 },
  Fatick: { lat: 14.3397, lng: -16.4111 },
  Louga: { lat: 15.6167, lng: -16.2167 },
  Matam: { lat: 15.6556, lng: -13.2553 },
  Tambacounda: { lat: 13.7708, lng: -13.6678 },
  Kolda: { lat: 12.8833, lng: -14.95 },
  Ziguinchor: { lat: 12.5833, lng: -16.2667 },
  Sédhiou: { lat: 12.7081, lng: -15.5569 },
  Kaffrine: { lat: 14.1061, lng: -15.5506 },
  Kédougou: { lat: 12.5569, lng: -12.1747 },
}

// Structures de santé initiales
const initialStructures: Structure[] = [
  {
    id: "1",
    nom: "Hôpital Principal de Dakar",
    type: "hopital",
    region: "Dakar",
    departement: "Dakar",
    commune: "Plateau",
    adresse: "Avenue Nelson Mandela",
    telephone: "+221 33 839 50 50",
    email: "contact@hopital-dakar.sn",
    latitude: 14.6928,
    longitude: -17.4467,
    effectif: 250,
    equipements: ["Laboratoire HPV", "Colposcopie", "Échographie", "Radiologie"],
    statut: "actif",
    nombreDepistages: 145,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    nom: "Centre de Santé de Pikine",
    type: "centre-sante",
    region: "Dakar",
    departement: "Pikine",
    commune: "Pikine Nord",
    adresse: "Route de Pikine",
    telephone: "+221 33 834 12 34",
    email: "cs.pikine@sante.sn",
    latitude: 14.7547,
    longitude: -17.3906,
    effectif: 45,
    equipements: ["Test HPV", "Consultation gynéco"],
    statut: "actif",
    nombreDepistages: 89,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    nom: "Hôpital Régional de Thiès",
    type: "hopital",
    region: "Thiès",
    departement: "Thiès",
    commune: "Thiès Nord",
    adresse: "Avenue Lamine Gueye",
    telephone: "+221 33 951 10 10",
    email: "hr.thies@sante.sn",
    latitude: 14.7886,
    longitude: -16.9261,
    effectif: 180,
    equipements: ["Laboratoire HPV", "Colposcopie", "Échographie"],
    statut: "actif",
    nombreDepistages: 67,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    nom: "Centre de Santé de Saint-Louis",
    type: "centre-sante",
    region: "Saint-Louis",
    departement: "Saint-Louis",
    commune: "Saint-Louis Centre",
    adresse: "Rue Blaise Diagne",
    telephone: "+221 33 961 23 45",
    email: "cs.stlouis@sante.sn",
    latitude: 16.0179,
    longitude: -16.4897,
    effectif: 35,
    equipements: ["Test HPV", "Consultation gynéco"],
    statut: "actif",
    nombreDepistages: 42,
    createdAt: new Date("2024-01-01"),
  },
]

const STRUCTURES_KEY = "cerviai_structures"

function getStoredStructures(): Structure[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STRUCTURES_KEY)
    return stored ? JSON.parse(stored) : initialStructures
  } catch {
    return initialStructures
  }
}

function saveStructures(structures: Structure[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STRUCTURES_KEY, JSON.stringify(structures))
  } catch (error) {
    console.error("[v0] Error saving structures:", error)
  }
}

export function StructuresProvider({ children }: { children: ReactNode }) {
  const [structures, setStructures] = useState<Structure[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const stored = getStoredStructures()
    setStructures(stored)
    setIsInitialized(true)
  }, [])

  const addStructure = (structureData: Omit<Structure, "id" | "createdAt">) => {
    const newStructure: Structure = {
      ...structureData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }

    console.log("[v0] Adding structure to context:", newStructure)
    const updated = [newStructure, ...structures]
    setStructures(updated)
    saveStructures(updated)
  }

  const getStructures = () => structures

  const getStructuresByRegion = (region: string) => structures.filter((s) => s.region === region)

  const updateStructureStats = (structureId: string, depistages: number) => {
    const updated = structures.map((s) =>
      s.id === structureId ? { ...s, nombreDepistages: s.nombreDepistages + depistages } : s
    )
    setStructures(updated)
    saveStructures(updated)
  }

  if (!isInitialized) return null

  return (
    <StructuresContext.Provider
      value={{ structures, addStructure, getStructures, getStructuresByRegion, updateStructureStats }}
    >
      {children}
    </StructuresContext.Provider>
  )
}

export function useStructures() {
  const context = useContext(StructuresContext)
  if (context === undefined) {
    throw new Error("useStructures must be used within a StructuresProvider")
  }
  return context
}

export { regionCoordinates }
