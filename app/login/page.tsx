import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-t from-secondary/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
          {/* Left column - Logo and messaging */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-8 animate-fade-in">
            <div className="text-center space-y-6">
              {/* Logo showcase */}
              <div className="relative w-full max-w-sm aspect-square flex items-center justify-center mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
                <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <Image
                    src="/cerviai-logo.png"
                    alt="CERVIAI Logo"
                    width={250}
                    height={250}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Taglines */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  CERVIAI
                </h1>
                <p className="text-xl font-semibold text-foreground">Dépistage du Cancer du Col de l'Utérus</p>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                  Autonomiser les femmes par le dépistage précoce et l'intelligence artificielle
                </p>
              </div>

              {/* Features list */}
              <div className="pt-6 space-y-3 text-left max-w-sm">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">Scoring de risque basé sur l'IA</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">Gestion sécurisée des données</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">Suivi de campagnes de santé</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Login form */}
          <div className="animate-slide-in">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  )
}
