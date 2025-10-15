"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditUserDialog } from "@/components/users/edit-user-dialog"
import { MoreVertical, Pencil, Shield, Trash2 } from "lucide-react"
import type { User } from "@/lib/auth"

interface UserListProps {
  searchQuery: string
}

export function UserList({ searchQuery }: UserListProps) {
  const [editingUser, setEditingUser] = useState<User | null>(null)

  // Mock users data - replace with API call to your Spring Boot backend
  const [users, setUsers] = useState<(User & { status: "active" | "inactive"; lastLogin: string })[]>([
    {
      id: "1",
      email: "medecin@cerviai.com",
      name: "Dr. Amadou Diallo",
      role: "medecin",
      institution: "Hôpital Principal de Dakar",
      status: "active",
      lastLogin: "2024-06-15",
    },
    {
      id: "2",
      email: "chercheur@cerviai.com",
      name: "Prof. Fatima Ndiaye",
      role: "chercheur",
      institution: "Institut Pasteur de Dakar",
      status: "active",
      lastLogin: "2024-06-14",
    },
    {
      id: "3",
      email: "labo@cerviai.com",
      name: "Moussa Koné",
      role: "laborantin",
      institution: "Laboratoire National",
      status: "active",
      lastLogin: "2024-06-15",
    },
    {
      id: "4",
      email: "admin@cerviai.com",
      name: "Admin CERVIAI",
      role: "admin",
      institution: "CERVIAI Platform",
      status: "active",
      lastLogin: "2024-06-15",
    },
    {
      id: "5",
      email: "dr.sow@cerviai.com",
      name: "Dr. Aissatou Sow",
      role: "medecin",
      institution: "Hôpital Régional de Thiès",
      status: "active",
      lastLogin: "2024-06-13",
    },
  ])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.institution?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const roleLabels = {
    medecin: "Médecin",
    chercheur: "Chercheur",
    laborantin: "Laborantin",
    admin: "Administrateur",
  }

  const roleColors = {
    medecin: "bg-primary/10 text-primary",
    chercheur: "bg-secondary/10 text-secondary",
    laborantin: "bg-chart-3/10 text-chart-3",
    admin: "bg-destructive/10 text-destructive",
  }

  const handleDeleteUser = (userId: string) => {
    // In production, call your Spring Boot API: DELETE /api/users/{userId}
    setUsers(users.filter((u) => u.id !== userId))
    console.log("[v0] User deleted:", userId)
  }

  const handleToggleStatus = (userId: string) => {
    // In production, call your Spring Boot API: PATCH /api/users/{userId}/status
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)))
    console.log("[v0] User status toggled:", userId)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière connexion</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={roleColors[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{user.institution}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setEditingUser(user)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                          <Shield className="h-4 w-4 mr-2" />
                          {user.status === "active" ? "Désactiver" : "Activer"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingUser && (
        <EditUserDialog user={editingUser} open={!!editingUser} onOpenChange={() => setEditingUser(null)} />
      )}
    </>
  )
}
