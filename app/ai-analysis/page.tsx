"use client"

import { AppLayout } from "@/components/app-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { AIAnalysisPage } from "@/components/ai-analysis-page"

export default function AIAnalysis() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <AIAnalysisPage />
      </AppLayout>
    </ProtectedRoute>
  )
}
