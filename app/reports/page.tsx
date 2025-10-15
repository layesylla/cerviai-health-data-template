"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { ReportsData } from "@/components/reports-data"

export default function ReportsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "chercheur"]}>
      <AppLayout>
        <ReportsData />
      </AppLayout>
    </ProtectedRoute>
  )
}
