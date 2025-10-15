"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getCurrentUser, logout } from "@/lib/auth"
import {
  Activity,
  LayoutDashboard,
  LogOut,
  User,
  FileText,
  Users,
  Database,
  FlaskConical,
  MessageSquare,
  Settings,
  Brain,
  UserCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const router = useRouter()
  const user = getCurrentUser()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  const roleLabels = {
    medecin: "Médecin",
    chercheur: "Chercheur",
    laborantin: "Laborantin",
    admin: "Administrateur",
  }

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push(user.role === "admin" ? "/dashboard" : "/collect")}
          >
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CERVIAI</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user.role === "admin" && (
              <>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard className="h-4 w-4" />
                  Tableau de bord
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/patients")}>
                  <UserCircle className="h-4 w-4" />
                  Patientes
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/scoring")}>
                  <Brain className="h-4 w-4" />
                  Scoring IA
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/reports")}>
                  <Database className="h-4 w-4" />
                  Rapports
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/research")}>
                  <FlaskConical className="h-4 w-4" />
                  Recherche
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/users")}>
                  <Users className="h-4 w-4" />
                  Utilisateurs
                </Button>
              </>
            )}
            {(user.role === "medecin" || user.role === "laborantin") && (
              <>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/collect")}>
                  <FileText className="h-4 w-4" />
                  Collecte
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/patients")}>
                  <UserCircle className="h-4 w-4" />
                  Patientes
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/scoring")}>
                  <Brain className="h-4 w-4" />
                  Scoring IA
                </Button>
              </>
            )}
            {user.role === "chercheur" && (
              <>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/patients")}>
                  <UserCircle className="h-4 w-4" />
                  Patientes
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/research")}>
                  <FlaskConical className="h-4 w-4" />
                  Recherche
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/reports")}>
                  <Database className="h-4 w-4" />
                  Rapports
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push("/chatbot")}>
              <MessageSquare className="h-4 w-4" />
              Chatbot
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Rôle: {roleLabels[user.role]}</p>
                {user.institution && <p className="text-xs text-muted-foreground">{user.institution}</p>}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
