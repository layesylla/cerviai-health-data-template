'use client'

import { useState } from 'react'
import { getCurrentUser, getAllRegisteredUsers, getAgentsByStructure } from '@/lib/auth'
import { useMessaging } from '@/lib/messaging-context'
import { usePatients } from '@/lib/patients-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MessageSquare, Send, Clock } from 'lucide-react'

export default function MessagingPage() {
  const user = getCurrentUser()
  const { messages, sendMessage, getConversation, markAsRead } = useMessaging()
  const { patients } = usePatients()
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [messageContent, setMessageContent] = useState('')

  if (!user) return null

  const getAvailableContacts = () => {
    const allUsers = getAllRegisteredUsers()
    
    if (user.role === 'patiente') {
      return allUsers.filter((u) => u.role === 'agent')
    }

    if (user.role === 'agent') {
      const agentsInStructure = getAgentsByStructure(user.structureId || '')
      const otherAgents = agentsInStructure.filter((a) => a.id !== user.id)
      
      // Also show all patients in the system
      const patientContacts = patients.map((p) => ({
        id: p.id,
        name: p.nom,
        email: `${p.nom.toLowerCase()}@patient.local`,
        role: 'patiente' as const,
      }))
      
      return [...patientContacts, ...otherAgents]
    }

    if (user.role === 'medecin' || user.role === 'admin') {
      return allUsers.filter((u) => u.role === 'agent' || u.role === 'medecin')
    }

    return []
  }

  const contacts = getAvailableContacts()
  const selectedContact = contacts.find((c) => c.id === selectedUserId)
  const conversation = selectedUserId ? getConversation(selectedUserId) : []

  const handleSendMessage = () => {
    if (!messageContent.trim() || !selectedUserId) return

    sendMessage(selectedUserId, messageContent)
    setMessageContent('')

    // Auto-scroll to bottom
    setTimeout(() => {
      const scrollArea = document.querySelector('[data-scroll-area]')
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
    }, 0)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Messagerie</h1>
        <p className="text-muted-foreground">Communiquez avec les membres de votre réseau de santé</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contacts List */}
        <Card className="lg:col-span-1 border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Contacts
            </CardTitle>
            <CardDescription>{contacts.length} contact(s) disponible(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-2 pr-4">
                {contacts.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">Aucun contact disponible</p>
                ) : (
                  contacts.map((contact) => {
                    const unreadCount = messages.filter(
                      (m) => m.senderId === contact.id && m.receiverId === user.id && !m.read
                    ).length
                    const lastMessage = messages
                      .filter((m) => 
                        (m.senderId === contact.id && m.receiverId === user.id) ||
                        (m.senderId === user.id && m.receiverId === contact.id)
                      )
                      .pop()

                    return (
                      <Button
                        key={contact.id}
                        variant={selectedUserId === contact.id ? 'secondary' : 'ghost'}
                        className="w-full justify-start h-auto p-3 rounded-lg hover:bg-accent transition-all"
                        onClick={() => {
                          setSelectedUserId(contact.id)
                          messages
                            .filter((m) => m.senderId === contact.id && m.receiverId === user.id && !m.read)
                            .forEach((m) => markAsRead(m.id))
                        }}
                      >
                        <Avatar className="h-10 w-10 mr-3 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                            {contact.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left min-w-0">
                          <p className="font-medium text-sm truncate">{contact.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{contact.email}</p>
                        </div>
                        {unreadCount > 0 && (
                          <Badge variant="default" className="ml-2 rounded-full px-2 py-0.5 text-xs">
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    )
                  })
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Conversation */}
        <Card className="lg:col-span-2 border-2 flex flex-col">
          {selectedContact ? (
            <>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {selectedContact.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedContact.name}</CardTitle>
                    <CardDescription className="text-xs">{selectedContact.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="flex-1 p-4" data-scroll-area>
                <div className="space-y-4">
                  {conversation.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground/20 mb-3" />
                      <p className="text-muted-foreground">Aucun message encore.</p>
                      <p className="text-sm text-muted-foreground">Commencez la conversation!</p>
                    </div>
                  ) : (
                    conversation.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.senderId === user.id
                              ? 'bg-primary text-primary-foreground rounded-br-none'
                              : 'bg-muted text-muted-foreground rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm break-words">{msg.content}</p>
                          <p className={`text-xs mt-1 flex items-center gap-1 ${
                            msg.senderId === user.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            <Clock className="h-3 w-3" />
                            {msg.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              <CardContent className="border-t p-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Écrivez votre message..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        handleSendMessage()
                      }
                    }}
                    className="min-h-12 resize-none rounded-lg"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageContent.trim()}
                    className="self-end rounded-lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Sélectionnez un contact pour commencer</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
