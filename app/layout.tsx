import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PatientsProvider } from "@/lib/patients-context"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CERVIAI - Plateforme de dépistage HPV",
  description:
    "Empowering Women's Health with AI - Plateforme intelligente de dépistage et prédiction du cancer du col de l'utérus",
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
          <PatientsProvider>{children}</PatientsProvider>
        </Suspense>
      </body>
    </html>
  )
}
