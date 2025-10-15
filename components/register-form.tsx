"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { register, type UserRole } from "@/lib/auth"
import { Activity, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function RegisterForm() {
  const router = useRouter()
  const [step, setStep] = useState<"role" | "form">("role")
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Form fields
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    dateNaissance: "",
    numeroOrdre: "",
    specialite: "",
    structureSante: "",
    region: "",
    institution: "",
    domaineRecherche: "",
  })

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setStep("form")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    setLoading(true)

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: `${formData.prenom} ${formData.nom}`,
        role: selectedRole!,
        institution:
          selectedRole === "medecin"
            ? formData.structureSante
            : selectedRole === "agent"
              ? formData.structureSante
              : selectedRole === "chercheur"
                ? formData.institution
                : undefined,
        additionalData: {
          telephone: formData.telephone,
          ...(selectedRole === "patiente" && { dateNaissance: formData.dateNaissance }),
          ...(selectedRole === "medecin" && {
            numeroOrdre: formData.numeroOrdre,
            specialite: formData.specialite,
          }),
          ...(selectedRole === "agent" && { region: formData.region }),
          ...(selectedRole === "chercheur" && { domaineRecherche: formData.domaineRecherche }),
        },
      })

      router.push("/login?registered=true")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  const roleOptions = [
    {
      value: "medecin" as UserRole,
      label: "Médecin / Gynécologue",
      description: "Superviser et valider les diagnostics",
    },
    {
      value: "agent" as UserRole,
      label: "Agent de santé / Sage-femme",
      description: "Effectuer le dépistage sur le terrain",
    },
    {
      value: "chercheur" as UserRole,
      label: "Chercheur / Épidémiologiste",
      description: "Analyser les données anonymisées",
    },
    {
      value: "patiente" as UserRole,
      label: "Patiente",
      description: "Consulter mes résultats de dépistage",
    },
  ]

  if (step === "role") {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">CERVIAI</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Créer un compte</CardTitle>
          <CardDescription className="text-center">Choisissez votre rôle pour commencer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {roleOptions.map((role) => (
              <button
                key={role.value}
                onClick={() => handleRoleSelect(role.value)}
                className="flex flex-col items-start gap-2 rounded-xl border-2 border-border p-4 text-left transition-all hover:border-primary hover:bg-accent"
              >
                <h3 className="font-semibold">{role.label}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </button>
            ))}
          </div>

          <div className="pt-4 text-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
              Vous avez déjà un compte ? Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="space-y-1">
        <Button variant="ghost" size="sm" onClick={() => setStep("role")} className="w-fit gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <CardTitle className="text-2xl">
          Inscription - {roleOptions.find((r) => r.value === selectedRole)?.label}
        </CardTitle>
        <CardDescription>Remplissez vos informations pour créer votre compte</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone *</Label>
            <Input
              id="telephone"
              type="tel"
              placeholder="+221 XX XXX XX XX"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          {/* Champs spécifiques au rôle Médecin */}
          {selectedRole === "medecin" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="numeroOrdre">Numéro d'ordre *</Label>
                <Input
                  id="numeroOrdre"
                  value={formData.numeroOrdre}
                  onChange={(e) => setFormData({ ...formData, numeroOrdre: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialite">Spécialité *</Label>
                <Select
                  value={formData.specialite}
                  onValueChange={(value) => setFormData({ ...formData, specialite: value })}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gynecologie">Gynécologie</SelectItem>
                    <SelectItem value="obstetrique">Obstétrique</SelectItem>
                    <SelectItem value="medecine-generale">Médecine générale</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="structureSante">Structure de santé *</Label>
                <Input
                  id="structureSante"
                  placeholder="Ex: Hôpital Principal de Dakar"
                  value={formData.structureSante}
                  onChange={(e) => setFormData({ ...formData, structureSante: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </>
          )}

          {/* Champs spécifiques au rôle Agent de santé */}
          {selectedRole === "agent" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="structureSante">Structure de santé *</Label>
                <Input
                  id="structureSante"
                  placeholder="Ex: Centre de Santé de Pikine"
                  value={formData.structureSante}
                  onChange={(e) => setFormData({ ...formData, structureSante: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Région *</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => setFormData({ ...formData, region: value })}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre région" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dakar">Dakar</SelectItem>
                    <SelectItem value="thies">Thiès</SelectItem>
                    <SelectItem value="saint-louis">Saint-Louis</SelectItem>
                    <SelectItem value="diourbel">Diourbel</SelectItem>
                    <SelectItem value="kaolack">Kaolack</SelectItem>
                    <SelectItem value="ziguinchor">Ziguinchor</SelectItem>
                    <SelectItem value="louga">Louga</SelectItem>
                    <SelectItem value="fatick">Fatick</SelectItem>
                    <SelectItem value="kolda">Kolda</SelectItem>
                    <SelectItem value="matam">Matam</SelectItem>
                    <SelectItem value="tambacounda">Tambacounda</SelectItem>
                    <SelectItem value="kedougou">Kédougou</SelectItem>
                    <SelectItem value="sedhiou">Sédhiou</SelectItem>
                    <SelectItem value="kaffrine">Kaffrine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Champs spécifiques au rôle Chercheur */}
          {selectedRole === "chercheur" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution *</Label>
                <Input
                  id="institution"
                  placeholder="Ex: Institut Pasteur de Dakar"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domaineRecherche">Domaine de recherche *</Label>
                <Input
                  id="domaineRecherche"
                  placeholder="Ex: Épidémiologie, Oncologie"
                  value={formData.domaineRecherche}
                  onChange={(e) => setFormData({ ...formData, domaineRecherche: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </>
          )}

          {/* Champs spécifiques au rôle Patiente */}
          {selectedRole === "patiente" && (
            <div className="space-y-2">
              <Label htmlFor="dateNaissance">Date de naissance *</Label>
              <Input
                id="dateNaissance"
                type="date"
                value={formData.dateNaissance}
                onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Inscription en cours..." : "Créer mon compte"}
          </Button>

          <div className="pt-2 text-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
              Vous avez déjà un compte ? Se connecter
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
