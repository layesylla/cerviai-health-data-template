"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { DataCollectionForm } from "@/components/data-collection-form"

export default function CollectPage() {
  return (
    <ProtectedRoute allowedRoles={["agent", "medecin", "chercheur"]}>
      <AppLayout>
        <DataCollectionForm />
      </AppLayout>
    </ProtectedRoute>
  )
}
