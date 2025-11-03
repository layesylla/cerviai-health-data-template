"use client"

import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FileText,
  UserCircle,
  Brain,
  Database,
  FlaskConical,
  Users,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Activity,
  TrendingUp,
  Heart,
  Shield,
  Zap,
} from "lucide-react"
import { usePatients } from "@/lib/patients-context"

export function WelcomeDashboard() {
  const router = useRouter()
  const user = getCurrentUser()
  const { patients } = usePatients()

  if (!user) return null

  const roleLabels = {
    agent: "Agent de santé",
    medecin: "Médecin",
    chercheur: "Chercheur",
    patiente: "Patiente",
  }

  const totalPatients = patients.length
  const positiveTests = patients.filter((p) => p.statutHPV === "Positif").length
  const positivePercentage = totalPatients > 0 ? ((positiveTests / totalPatients) * 100).toFixed(1) : "0"

  const getModulesForRole = () => {
    const commonModules = [
      {
        title: "Patientes",
        description: "Consulter et gérer les dossiers des patientes",
        icon: UserCircle,
        href: "/patients",
        color: "from-blue-500 to-blue-600",
        badge: null,
      },
      {
        title: "Scoring IA",
        description: "Évaluer le risque avec l'intelligence artificielle",
        icon: Brain,
        href: "/scoring",
        color: "from-pink-500 to-pink-600",
        badge: { text: "IA", variant: "secondary" as const },
      },
      {
        title: "Chatbot",
        description: "Assistant de sensibilisation multilingue",
        icon: MessageSquare,
        href: "/chatbot",
        color: "from-purple-500 to-purple-600",
        badge: { text: "Nouveau", variant: "default" as const },
      },
    ]

    if (user.role === "medecin") {
      return [
        {
          title: "Tableau de bord",
          description: "Vue d'ensemble des statistiques et indicateurs",
          icon: LayoutDashboard,
          href: "/dashboard",
          color: "from-blue-500 to-cyan-500",
          badge: null,
        },
        {
          title: "Collecte de données",
          description: "Enregistrer les données de dépistage HPV",
          icon: FileText,
          href: "/collect",
          color: "from-green-500 to-emerald-600",
          badge: null,
        },
        ...commonModules,
        {
          title: "Données & Rapports",
          description: "Exporter et analyser les données collectées",
          icon: Database,
          href: "/reports",
          color: "from-orange-500 to-red-500",
          badge: null,
        },
        {
          title: "Utilisateurs",
          description: "Gérer les comptes et les permissions",
          icon: Users,
          href: "/users",
          color: "from-indigo-500 to-purple-600",
          badge: null,
        },
      ]
    }

    if (user.role === "agent") {
      return [
        {
          title: "Collecte de données",
          description: "Enregistrer les données de dépistage HPV",
          icon: FileText,
          href: "/collect",
          color: "from-blue-500 to-cyan-500",
          badge: null,
        },
        ...commonModules,
      ]
    }

    if (user.role === "chercheur") {
      return [
        {
          title: "Tableau de bord",
          description: "Vue d'ensemble des statistiques et indicateurs",
          icon: LayoutDashboard,
          href: "/dashboard",
          color: "from-blue-500 to-cyan-500",
          badge: null,
        },
        ...commonModules,
        {
          title: "Données & Rapports",
          description: "Exporter et analyser les données collectées",
          icon: Database,
          href: "/reports",
          color: "from-green-500 to-emerald-600",
          badge: null,
        },
        {
          title: "Recherche",
          description: "Analyses statistiques et corrélations",
          icon: FlaskConical,
          href: "/research",
          color: "from-orange-500 to-red-500",
          badge: null,
        },
      ]
    }

    return commonModules
  }

  const modules = getModulesForRole()

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-secondary p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
              <Heart className="h-8 w-8 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-1 text-balance">Bienvenue sur CERVIAI</h1>
              <p className="text-lg text-white/95 text-balance">
                Plateforme intelligente de dépistage du cancer du col de l'utérus au Sénégal
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-xs font-medium text-white">Système opérationnel</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-3 py-1 text-xs">
              <Shield className="h-3 w-3 mr-1" />
              {roleLabels[user.role]}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-3 py-1 text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              {user.name}
            </Badge>
          </div>

          <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1">Notre mission</h3>
                <p className="text-white/90 text-xs leading-relaxed text-pretty">
                  Améliorer la santé des femmes au Sénégal grâce à un dépistage précoce et des analyses prédictives
                  basées sur l'intelligence artificielle.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patientes enregistrées</CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <UserCircle className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalPatients}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600 font-medium">Données fiables</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests HPV positifs</CardTitle>
            <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
              <Activity className="h-5 w-5 text-pink-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{positiveTests}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <span className="text-muted-foreground font-medium">{positivePercentage}% du total</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analyses IA disponibles</CardTitle>
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{totalPatients}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <Sparkles className="h-3 w-3 text-purple-500" />
              <span className="text-purple-600 font-medium">Scoring prédictif</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Modules disponibles</h2>
          <p className="text-muted-foreground text-balance">
            Accédez rapidement aux fonctionnalités adaptées à votre rôle
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Card
              key={module.href}
              className="group cursor-pointer transition-all hover:shadow-xl hover:scale-[1.03] hover:border-primary/50 border-2"
              onClick={() => router.push(module.href)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color} text-white shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <module.icon className="h-7 w-7" />
                  </div>
                  {module.badge && (
                    <Badge variant={module.badge.variant} className="text-xs shadow-sm">
                      {module.badge.text}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{module.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  className="w-full justify-between group-hover:bg-accent group-hover:text-primary"
                >
                  Accéder au module
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
