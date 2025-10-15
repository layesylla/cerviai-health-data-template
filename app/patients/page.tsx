"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { PatientsList } from "@/components/patients-list"

export default function PatientsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "medecin", "chercheur", "agent"]}>
      <AppLayout>
        <PatientsList />
      </AppLayout>
    </ProtectedRoute>
  )
}
