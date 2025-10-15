"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Patient {
  id: string
  patientId: string
  nom: string
  prenom: string
  age: string
  dateNaissance: string
  telephone: string
  region: string
  departement: string
  commune: string
  statutHPV: string
  typeHPV: string
  resultatDepistage: string
  dateDepistage: string
  antecedentsGyneco: string
  symptomes: string[]
  grossesseEnCours: string
  nombreGrossesses: string
  vaccination: string
  dateVaccination: string
  observations: string
  risque?: string
  createdAt: Date
}

interface PatientsContextType {
  patients: Patient[]
  addPatient: (patient: Omit<Patient, "id" | "createdAt" | "risque">) => void
  getPatients: () => Patient[]
}

const PatientsContext = createContext<PatientsContextType | undefined>(undefined)

// Mock initial data
const initialPatients: Patient[] = [
  {
    id: "1",
    patientId: "P-2024-001",
    nom: "Diop",
    prenom: "Fatou",
    age: "35",
    dateNaissance: "1989-03-15",
    telephone: "+221771234567",
    region: "Dakar",
    departement: "Pikine",
    commune: "Guédiawaye",
    statutHPV: "Positif",
    typeHPV: "HPV-16",
    resultatDepistage: "Lésion précancéreuse",
    dateDepistage: "2024-01-15",
    antecedentsGyneco: "Aucun antécédent particulier",
    symptomes: ["Saignements anormaux"],
    grossesseEnCours: "Non",
    nombreGrossesses: "3",
    vaccination: "Non",
    dateVaccination: "",
    observations: "Suivi recommandé dans 3 mois",
    risque: "Élevé",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    patientId: "P-2024-002",
    nom: "Ndiaye",
    prenom: "Aminata",
    age: "28",
    dateNaissance: "1996-07-22",
    telephone: "+221772345678",
    region: "Thiès",
    departement: "Thiès",
    commune: "Thiès Nord",
    statutHPV: "Négatif",
    typeHPV: "",
    resultatDepistage: "Normal",
    dateDepistage: "2024-01-16",
    antecedentsGyneco: "Aucun",
    symptomes: ["Aucun symptôme"],
    grossesseEnCours: "Non",
    nombreGrossesses: "1",
    vaccination: "Oui",
    dateVaccination: "2020-05-10",
    observations: "Contrôle annuel recommandé",
    risque: "Faible",
    createdAt: new Date("2024-01-16"),
  },
]

export function PatientsProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)

  const addPatient = (patientData: Omit<Patient, "id" | "createdAt" | "risque">) => {
    // Calculate risk based on HPV status and result
    let risque = "Faible"
    if (patientData.statutHPV === "Positif") {
      if (patientData.resultatDepistage === "Cancer détecté") {
        risque = "Élevé"
      } else if (patientData.resultatDepistage === "Lésion précancéreuse") {
        risque = "Élevé"
      } else {
        risque = "Moyen"
      }
    }

    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      risque,
      createdAt: new Date(),
    }

    console.log("[v0] Adding patient to context:", newPatient)
    setPatients((prev) => [newPatient, ...prev])
  }

  const getPatients = () => patients

  return <PatientsContext.Provider value={{ patients, addPatient, getPatients }}>{children}</PatientsContext.Provider>
}

export function usePatients() {
  const context = useContext(PatientsContext)
  if (context === undefined) {
    throw new Error("usePatients must be used within a PatientsProvider")
  }
  return context
}
