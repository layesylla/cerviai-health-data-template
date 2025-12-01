import { ProtectedRoute } from "@/components/protected-route"
import { SMSInbox } from "@/components/sms-inbox"

export default function SMSInboxPage() {
  return (
    <ProtectedRoute allowedRoles={["patiente"]}>
      <SMSInbox />
    </ProtectedRoute>
  )
}
