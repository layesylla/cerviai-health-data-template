"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/components/app-layout"
import { ChatbotSensibilisation } from "@/components/chatbot-sensibilisation"

export default function ChatbotPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "medecin", "chercheur", "agent"]}>
      <AppLayout>
        <ChatbotSensibilisation />
      </AppLayout>
    </ProtectedRoute>
  )
}
