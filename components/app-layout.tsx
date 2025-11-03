"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getCurrentUser, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Activity,
  LayoutDashboard,
  FileText,
  UserCircle,
  Brain,
  Database,
  FlaskConical,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Calendar,
  Building2,
  MessageCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NotificationsPanel } from "@/components/notifications-panel"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const user = getCurrentUser()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!user) return <>{children}</>

  const roleLabels = {
    agent: "Agent de santé",
    medecin: "Médecin",
    chercheur: "Chercheur",
    patiente: "Patiente",
    admin: "Administrateur",
  }

  const navigationModules = [
    {
      title: "Vue d'ensemble",
      items: [
        {
          title: "Accueil",
          icon: LayoutDashboard,
          href: "/home",
          badge: null,
        },
        ...(user.role === "medecin" || user.role === "chercheur" || user.role === "admin"
          ? [
              {
                title: "Tableau de bord",
                icon: Activity,
                href: "/dashboard",
                badge: null,
              },
            ]
          : []),
      ],
    },
    {
      title: "Gestion des données",
      items: [
        ...(user.role === "agent" || user.role === "medecin"
          ? [
              {
                title: "Collecte de données",
                icon: FileText,
                href: "/collect",
                badge: null,
              },
            ]
          : []),
        ...(user.role !== "patiente"
          ? [
              {
                title: "Patientes",
                icon: UserCircle,
                href: "/patients",
                badge: null,
              },
            ]
          : []),
        ...(user.role === "patiente"
          ? [
              {
                title: "Mes résultats",
                icon: FileText,
                href: "/mes-resultats",
                badge: null,
              },
            ]
          : []),
        ...(user.role === "admin" || user.role === "medecin" || user.role === "chercheur"
          ? [
              {
                title: "Structures",
                icon: Building2,
                href: "/structures",
                badge: { text: "Géo", variant: "secondary" as const },
              },
            ]
          : []),
      ],
    },
    {
      title: "Intelligence Artificielle",
      items:
        user.role !== "patiente"
          ? [
              {
                title: "Scoring IA",
                icon: Brain,
                href: "/scoring",
                badge: { text: "IA", variant: "secondary" as const },
              },
              {
                title: "Analyse IA",
                icon: Sparkles,
                href: "/ai-analysis",
                badge: { text: "Nouveau", variant: "default" as const },
              },
            ]
          : [],
    },
    {
      title: "Analyse & Recherche",
      items: [
        ...(user.role === "medecin" || user.role === "chercheur" || user.role === "admin"
          ? [
              {
                title: "Données & Rapports",
                icon: Database,
                href: "/reports",
                badge: null,
              },
            ]
          : []),
        ...(user.role === "chercheur" || user.role === "admin"
          ? [
              {
                title: "Recherche",
                icon: FlaskConical,
                href: "/research",
                badge: null,
              },
            ]
          : []),
      ],
    },
    {
      title: "Communication",
      items: [
        ...(user.role === "admin" || user.role === "medecin" || user.role === "agent"
          ? [
              {
                title: "SMS",
                icon: MessageCircle,
                href: "/sms",
                badge: { text: "Nouveau", variant: "default" as const },
              },
            ]
          : []),
        {
          title: "Chatbot",
          icon: MessageSquare,
          href: "/chatbot",
          badge: null,
        },
      ],
    },
    ...(user.role === "admin" || user.role === "medecin"
      ? [
          {
            title: "Administration",
            items: [
              ...(user.role === "admin"
                ? [
                    {
                      title: "Campagnes",
                      icon: Calendar,
                      href: "/campaigns",
                      badge: null,
                    },
                  ]
                : []),
              ...(user.role === "medecin" || user.role === "admin"
                ? [
                    {
                      title: "Utilisateurs",
                      icon: Users,
                      href: "/users",
                      badge: null,
                    },
                  ]
                : []),
              {
                title: "Paramètres",
                icon: Settings,
                href: "/settings",
                badge: null,
              },
            ],
          },
        ]
      : [
          {
            title: "Paramètres",
            items: [
              {
                title: "Paramètres",
                icon: Settings,
                href: "/settings",
                badge: null,
              },
            ],
          },
        ]),
  ].filter((module) => module.items.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-300 border-r bg-sidebar-background shadow-sm",
          sidebarOpen ? "w-72" : "w-0 -translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 flex-col justify-center gap-1 border-b px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-rose-gold to-secondary shadow-md">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  CerviAI
                </h1>
                <p className="text-[10px] text-muted-foreground leading-tight">Empowering Women's Health with AI</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navigationModules.map((module, idx) => (
              <div key={module.title} className="animate-slide-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {module.title}
                </h3>
                <div className="space-y-1">
                  {module.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Button
                        key={item.href}
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 h-11 rounded-xl transition-all duration-200",
                          isActive &&
                            "bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-medium shadow-sm",
                          !isActive && "hover:bg-accent/50 hover:translate-x-1",
                        )}
                        onClick={() => router.push(item.href)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="flex-1 text-left text-sm">{item.title}</span>
                        {item.badge && (
                          <Badge variant={item.badge.variant} className="text-[10px] px-2 py-0.5 rounded-full">
                            {item.badge.text}
                          </Badge>
                        )}
                        {isActive && <ChevronRight className="h-4 w-4" />}
                      </Button>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm border">
              <Avatar className="h-11 w-11 border-2 border-primary/20 shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold text-sm">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">{roleLabels[user.role]}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className={cn("transition-all duration-300", sidebarOpen ? "ml-72" : "ml-0")}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/80 px-6 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-xl hover:bg-accent"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex-1" />

          <NotificationsPanel />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 rounded-xl hover:bg-accent">
                <Avatar className="h-9 w-9 border-2 border-primary/20 shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{roleLabels[user.role]}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                {user.institution && <p className="text-xs text-muted-foreground mt-1">{user.institution}</p>}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")} className="rounded-lg">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-destructive rounded-lg">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content */}
        <main className="p-6 animate-fade-in">{children}</main>
      </div>
    </div>
  )
}
