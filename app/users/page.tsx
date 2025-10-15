"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { UserManagement } from "@/components/user-management"

export default function UsersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AppLayout>
        <UserManagement />
      </AppLayout>
    </ProtectedRoute>
  )
}
