"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { WelcomeDashboard } from "@/components/welcome-dashboard"

export default function HomePage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "medecin", "chercheur", "agent"]}>
      <AppLayout>
        <WelcomeDashboard />
      </AppLayout>
    </ProtectedRoute>
  )
}
