"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { login } from "@/lib/auth"
import { AlertCircle, LogIn, ArrowRight } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = await login(email, password)

      if (user.role === "patiente") {
        router.push("/mes-resultats")
      } else if (user.role === "admin") {
        router.push("/dashboard")
      } else {
        router.push("/home")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-primary/20 shadow-2xl bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90">
      <CardHeader className="space-y-4 pb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary via-rose-gold to-secondary p-0.5 shadow-lg">
            <div className="h-full w-full bg-card rounded-xl flex items-center justify-center">
              <Image
                src="/cerviai-logo.png"
                alt="CERVIAI"
                width={56}
                height={56}
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Bienvenue sur CERVIAI
          </CardTitle>
          <CardDescription className="text-center text-sm">Plateforme intelligente de santé féminine</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="rounded-xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="votre.email@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="rounded-xl h-11 border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="rounded-xl h-11 border-primary/20 focus:border-primary"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-200 mt-6 group"
            disabled={loading}
          >
            <LogIn className="h-4 w-4 mr-2 group-hover:mr-3 transition-all" />
            {loading ? "Connexion..." : "Se connecter"}
            {!loading && (
              <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Button>

          <div className="text-center pt-2">
            <Link
              href="/register"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Pas encore de compte ? <span className="text-primary font-semibold">Je m'inscris</span>
            </Link>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
            <p className="text-xs font-semibold mb-3 text-foreground uppercase tracking-wide">
              Comptes de démonstration:
            </p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between items-center p-2 bg-card/50 rounded-lg">
                <span>Administrateur:</span>
                <code className="bg-background px-2 py-1 rounded text-[10px]">admin@cerviai.com</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-card/50 rounded-lg">
                <span>Agent de santé:</span>
                <code className="bg-background px-2 py-1 rounded text-[10px]">agent@cerviai.com</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-card/50 rounded-lg">
                <span>Médecin:</span>
                <code className="bg-background px-2 py-1 rounded text-[10px]">medecin@cerviai.com</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-card/50 rounded-lg">
                <span>Chercheur:</span>
                <code className="bg-background px-2 py-1 rounded text-[10px]">chercheur@cerviai.com</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-card/50 rounded-lg">
                <span>Patiente:</span>
                <code className="bg-background px-2 py-1 rounded text-[10px]">patiente@cerviai.com</code>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3">
              Tous les comptes: mot de passe <code className="bg-background px-1.5 py-0.5 rounded">demo123</code>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
