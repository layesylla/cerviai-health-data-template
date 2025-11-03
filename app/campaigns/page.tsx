"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { CampaignsManagement } from "@/components/campaigns-management"

export default function CampaignsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AppLayout>
        <CampaignsManagement />
      </AppLayout>
    </ProtectedRoute>
  )
}
