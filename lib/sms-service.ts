export interface SMSMessage {
  id: string
  recipientPhone: string
  recipientName: string
  recipientId?: string
  message: string
  type: "reminder" | "alert" | "result" | "appointment"
  status: "pending" | "sent" | "failed"
  sentAt?: Date
  createdAt: Date
  patientId?: string
  read?: boolean
}

const SMS_STORAGE_KEY = "cerviai_sms_messages"
const SMS_INBOX_KEY = "cerviai_sms_inbox"

export function getSMSMessages(): SMSMessage[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(SMS_STORAGE_KEY)
    return stored
      ? JSON.parse(stored).map((msg: any) => ({
          ...msg,
          createdAt: new Date(msg.createdAt),
          sentAt: msg.sentAt ? new Date(msg.sentAt) : undefined,
        }))
      : []
  } catch {
    return []
  }
}

function saveSMSMessages(messages: SMSMessage[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(SMS_STORAGE_KEY, JSON.stringify(messages))
  } catch (error) {
    console.error("[v0] Error saving SMS messages:", error)
  }
}

export function getSMSInbox(recipientId: string): SMSMessage[] {
  if (typeof window === "undefined") return []
  try {
    const messages = getSMSMessages()
    return messages.filter((msg) => msg.recipientId === recipientId && msg.status === "sent")
  } catch {
    return []
  }
}

export function markSMSAsRead(messageId: string) {
  if (typeof window === "undefined") return
  try {
    const messages = getSMSMessages()
    const updatedMessages = messages.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg))
    saveSMSMessages(updatedMessages)
  } catch (error) {
    console.error("[v0] Error marking SMS as read:", error)
  }
}

export function sendSMS(
  recipientPhone: string,
  recipientName: string,
  message: string,
  type: SMSMessage["type"],
  recipientId?: string,
): SMSMessage {
  const newMessage: SMSMessage = {
    id: `sms-${Date.now()}`,
    recipientPhone,
    recipientName,
    recipientId,
    message,
    type,
    status: "pending",
    createdAt: new Date(),
    read: false,
  }

  // Simulate SMS sending
  setTimeout(() => {
    const messages = getSMSMessages()
    const updatedMessage = {
      ...newMessage,
      status: "sent" as const,
      sentAt: new Date(),
    }
    const updatedMessages = messages.map((m) => (m.id === newMessage.id ? updatedMessage : m))
    saveSMSMessages(updatedMessages)
    console.log("[v0] SMS sent and saved to inbox:", updatedMessage)
  }, 1000)

  const messages = getSMSMessages()
  saveSMSMessages([...messages, newMessage])

  return newMessage
}

export function sendReminderSMS(patientPhone: string, patientName: string, message: string, patientId: string) {
  return sendSMS(patientPhone, patientName, message, "reminder", patientId)
}

export function sendAlertSMS(patientPhone: string, patientName: string, message: string, patientId: string) {
  return sendSMS(patientPhone, patientName, message, "alert", patientId)
}

export function sendResultSMS(patientPhone: string, patientName: string, message: string, patientId: string) {
  return sendSMS(patientPhone, patientName, message, "result", patientId)
}

export const SMS_TEMPLATES = {
  highRiskAlert: (name: string) =>
    `Bonjour ${name}, vos résultats de dépistage nécessitent un suivi urgent. Veuillez contacter votre médecin dès que possible. CerviAI`,
  appointmentReminder: (name: string, date: string) =>
    `Bonjour ${name}, rappel de votre rendez-vous de suivi le ${date}. Merci de confirmer votre présence. CerviAI`,
  resultAvailable: (name: string) =>
    `Bonjour ${name}, vos résultats de dépistage sont disponibles. Connectez-vous à CerviAI ou contactez votre structure de santé. CerviAI`,
  followUpReminder: (name: string) =>
    `Bonjour ${name}, il est temps de planifier votre prochain dépistage. Contactez votre structure de santé. CerviAI`,
}
