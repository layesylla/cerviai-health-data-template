"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { SettingsPage } from "@/components/settings-page"

export default function Settings() {
  return (
    <ProtectedRoute allowedRoles={["admin", "medecin", "chercheur", "agent"]}>
      <AppLayout>
        <SettingsPage />
      </AppLayout>
    </ProtectedRoute>
  )
}
