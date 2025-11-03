import { ProtectedRoute } from "@/components/protected-route"
import { SMSManagement } from "@/components/sms-management"

export default function SMSPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "medecin", "agent"]}>
      <SMSManagement />
    </ProtectedRoute>
  )
}
