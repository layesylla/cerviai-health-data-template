"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { ScoringAI } from "@/components/scoring-ai"

export default function ScoringPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "medecin", "chercheur", "agent"]}>
      <AppLayout>
        <ScoringAI />
      </AppLayout>
    </ProtectedRoute>
  )
}
