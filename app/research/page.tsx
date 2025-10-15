"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { ResearchAnalysis } from "@/components/research-analysis"

export default function ResearchPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "chercheur"]}>
      <AppLayout>
        <ResearchAnalysis />
      </AppLayout>
    </ProtectedRoute>
  )
}
