"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "medecin", "chercheur"]}>
      <AppLayout>
        <AdminDashboard />
      </AppLayout>
    </ProtectedRoute>
  )
}
