'use client'

import type React from 'react'
import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { getCurrentUser } from '@/lib/auth'

export interface Message {
  id: string
  senderId: string
  senderName: string
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
}

interface MessagingContextType {
  messages: Message[]
  sendMessage: (receiverId: string, content: string) => void
  markAsRead: (messageId: string) => void
  getUnreadCount: (userId: string) => number
  getConversation: (otherUserId: string) => Message[]
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined)

const GLOBAL_MESSAGES_STORAGE_KEY = 'cerviai_global_messages'

function getGlobalMessages(): Message[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(GLOBAL_MESSAGES_STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored).map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }))
  } catch (error) {
    console.error('[v0] Error loading global messages:', error)
    return []
  }
}

function saveGlobalMessages(messages: Message[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(GLOBAL_MESSAGES_STORAGE_KEY, JSON.stringify(messages))
    window.dispatchEvent(new Event('messagesUpdated'))
  } catch (error) {
    console.error('[v0] Error saving global messages:', error)
  }
}

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser()
  const [messages, setMessages] = useState<Message[]>(() => getGlobalMessages())

  useEffect(() => {
    const handleMessagesUpdate = () => {
      const updatedMessages = getGlobalMessages()
      setMessages(updatedMessages)
      console.log('[v0] Messages updated from storage:', updatedMessages.length)
    }

    window.addEventListener('messagesUpdated', handleMessagesUpdate)
    return () => window.removeEventListener('messagesUpdated', handleMessagesUpdate)
  }, [])

  const sendMessage = useCallback(
    (receiverId: string, content: string) => {
      if (!user) {
        console.error('[v0] Cannot send message: user not logged in')
        return
      }

      const newMessage: Message = {
        id: `msg_${Date.now()}_${Math.random()}`,
        senderId: user.id,
        senderName: user.name,
        receiverId,
        content,
        timestamp: new Date(),
        read: false,
      }

      const currentMessages = getGlobalMessages()
      const updatedMessages = [...currentMessages, newMessage]
      saveGlobalMessages(updatedMessages)
      setMessages(updatedMessages)
      console.log('[v0] Message sent from', user.name, 'to', receiverId)
    },
    [user]
  )

  const markAsRead = useCallback(
    (messageId: string) => {
      const currentMessages = getGlobalMessages()
      const updatedMessages = currentMessages.map((msg) =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
      saveGlobalMessages(updatedMessages)
      setMessages(updatedMessages)
    },
    []
  )

  const getUnreadCount = useCallback(
    (userId: string) => {
      return messages.filter((msg) => msg.receiverId === userId && !msg.read).length
    },
    [messages]
  )

  const getConversation = useCallback(
    (otherUserId: string) => {
      if (!user) return []
      return messages
        .filter(
          (msg) =>
            (msg.senderId === user.id && msg.receiverId === otherUserId) ||
            (msg.senderId === otherUserId && msg.receiverId === user.id)
        )
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    },
    [user, messages]
  )

  return (
    <MessagingContext.Provider
      value={{
        messages,
        sendMessage,
        markAsRead,
        getUnreadCount,
        getConversation,
      }}
    >
      {children}
    </MessagingContext.Provider>
  )
}

export function useMessaging() {
  const context = useContext(MessagingContext)
  if (!context) {
    throw new Error('useMessaging must be used within MessagingProvider')
  }
  return context
}
