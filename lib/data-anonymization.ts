import type { Patient } from "./patients-context"

export function anonymizePatientData(patient: Patient, userRole: string): Patient {
  // Researchers should only see anonymized data
  if (userRole === "chercheur") {
    return {
      ...patient,
      nom: "***",
      prenom: "***",
      telephone: "***",
      // Keep only medical and statistical data
      patientId: patient.patientId.substring(0, 3) + "***", // Partial ID
    }
  }

  // Other roles can see full data
  return patient
}

export function anonymizePatientList(patients: Patient[], userRole: string): Patient[] {
  return patients.map((patient) => anonymizePatientData(patient, userRole))
}

export function canViewPatientDetails(userRole: string): boolean {
  return ["admin", "medecin", "agent"].includes(userRole)
}
