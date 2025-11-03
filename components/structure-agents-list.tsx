"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Phone, Mail, MapPin } from "lucide-react"
import type { User } from "@/lib/auth"

interface StructureAgentsListProps {
  structureId: string
  structureName: string
  agents: User[]
}

export function StructureAgentsList({ structureId, structureName, agents }: StructureAgentsListProps) {
  const roleLabels = {
    agent: "Agent de santé",
    medecin: "Médecin",
    chercheur: "Chercheur",
    patiente: "Patiente",
    admin: "Administrateur",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Agents de {structureName}
        </CardTitle>
        <CardDescription>{agents.length} agent(s) de santé</CardDescription>
      </CardHeader>
      <CardContent>
        {agents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Aucun agent assigné à cette structure</p>
          </div>
        ) : (
          <div className="space-y-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{agent.name}</h4>
                      <Badge variant="secondary" className="mt-1">
                        {roleLabels[agent.role]}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {agent.email && (
                      <p className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {agent.email}
                      </p>
                    )}
                    {agent.telephone && (
                      <p className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {agent.telephone}
                      </p>
                    )}
                    {agent.institution && (
                      <p className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {agent.institution}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
