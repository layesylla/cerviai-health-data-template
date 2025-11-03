"use client"

import { useEffect, useState } from "react"
import { getAllRegisteredUsers, type User } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, AlertCircle, RefreshCw } from "lucide-react"

export function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadUsers = () => {
    setLoading(true)
    try {
      const allUsers = getAllRegisteredUsers()
      console.log("[v0] Loading users:", allUsers)
      setUsers(allUsers)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement")
      console.error("[v0] Error loading users:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-red-100 text-red-800",
      medecin: "bg-blue-100 text-blue-800",
      agent: "bg-green-100 text-green-800",
      chercheur: "bg-purple-100 text-purple-800",
      patiente: "bg-pink-100 text-pink-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Gestion des Utilisateurs
          </h2>
          <p className="text-muted-foreground mt-1">Total: {users.length} utilisateur(s) enregistré(s)</p>
        </div>
        <Button onClick={loadUsers} disabled={loading} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Rafraîchir
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {users.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">Aucun utilisateur enregistré</CardContent>
          </Card>
        ) : (
          users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {user.telephone && (
                  <p className="text-sm">
                    <span className="font-medium">Téléphone:</span> {user.telephone}
                  </p>
                )}
                {user.institution && (
                  <p className="text-sm">
                    <span className="font-medium">Institution:</span> {user.institution}
                  </p>
                )}
                {user.region && (
                  <p className="text-sm">
                    <span className="font-medium">Région:</span> {user.region}
                  </p>
                )}
                {user.structureId && (
                  <p className="text-sm">
                    <span className="font-medium">Structure ID:</span> {user.structureId}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
