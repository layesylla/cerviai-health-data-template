"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { calculateRiskScore, type RiskCalculationInput } from "@/lib/risk-calculation"

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
  structureId?: string
  campagneId?: string
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
  riskScore?: number
  createdAt: Date
}

interface PatientsContextType {
  patients: Patient[]
  addPatient: (patient: Omit<Patient, "id" | "createdAt" | "risque" | "riskScore">) => void
  updatePatientRiskScore: (patientId: string, riskData: RiskCalculationInput) => void
  getPatients: () => Patient[]
  getPatientsByStructure: (structureId: string) => Patient[]
  getPatientsByCampaign: (campagneId: string) => Patient[]
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
    structureId: "1",
    campagneId: "1",
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
    riskScore: 75,
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
    structureId: "3",
    campagneId: "2",
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
    riskScore: 15,
    createdAt: new Date("2024-01-16"),
  },
]

export function PatientsProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)

  const addPatient = (patientData: Omit<Patient, "id" | "createdAt" | "risque" | "riskScore">) => {
    const riskResult = calculateRiskScore({
      statutHPV: patientData.statutHPV,
      age: Number.parseInt(patientData.age),
      symptomes: patientData.symptomes,
      antecedents: patientData.antecedentsGyneco,
      typeHPV: patientData.typeHPV,
      vaccination: patientData.vaccination,
      nombreGrossesses: Number.parseInt(patientData.nombreGrossesses) || 0,
    })

    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      risque: riskResult.level,
      riskScore: riskResult.score,
      createdAt: new Date(),
    }

    console.log("[v0] Adding patient to context:", newPatient)
    console.log("[v0] Calculated risk:", riskResult)
    setPatients((prev) => [newPatient, ...prev])
  }

  const updatePatientRiskScore = (patientId: string, riskData: RiskCalculationInput) => {
    const riskResult = calculateRiskScore(riskData)

    setPatients((prev) =>
      prev.map((patient) => {
        if (patient.patientId === patientId || patient.id === patientId) {
          console.log("[v0] Updating patient risk score:", patientId, riskResult)
          return {
            ...patient,
            risque: riskResult.level,
            riskScore: riskResult.score,
          }
        }
        return patient
      }),
    )
  }

  const getPatients = () => patients

  const getPatientsByStructure = (structureId: string) => patients.filter((p) => p.structureId === structureId)

  const getPatientsByCampaign = (campagneId: string) => patients.filter((p) => p.campagneId === campagneId)

  return (
    <PatientsContext.Provider
      value={{
        patients,
        addPatient,
        updatePatientRiskScore,
        getPatients,
        getPatientsByStructure,
        getPatientsByCampaign,
      }}
    >
      {children}
    </PatientsContext.Provider>
  )
}

export function usePatients() {
  const context = useContext(PatientsContext)
  if (context === undefined) {
    throw new Error("usePatients must be used within a PatientsProvider")
  }
  return context
}
