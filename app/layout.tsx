import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PatientsProvider } from "@/lib/patients-context"
import { StructuresProvider } from "@/lib/structures-context"
import { CampaignsProvider } from "@/lib/campaigns-context"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CERVIAI - Plateforme de dépistage HPV",
  description:
    "Renforcer la santé des femmes grâce à l’IA - Plateforme intelligente de dépistage et prédiction du cancer du col de l'utérus",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <CampaignsProvider>
            <StructuresProvider>
              <PatientsProvider>{children}</PatientsProvider>
            </StructuresProvider>
          </CampaignsProvider>
        </Suspense>
      </body>
    </html>
  )
}
