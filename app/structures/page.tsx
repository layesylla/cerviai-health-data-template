import { ProtectedRoute } from "@/components/protected-route"
import { StructuresManagement } from "@/components/structures-management"

export default function StructuresPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "medecin", "chercheur"]}>
      <StructuresManagement />
    </ProtectedRoute>
  )
}
