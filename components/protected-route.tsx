"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, type UserRole } from "@/lib/auth"
import { Spinner } from "@/components/ui/spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()

    console.log("[v0] ProtectedRoute - Current user:", user)
    console.log("[v0] ProtectedRoute - Allowed roles:", allowedRoles)

    if (!user) {
      console.log("[v0] ProtectedRoute - No user found, redirecting to login")
      router.push("/")
      return
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      console.log("[v0] ProtectedRoute - User role not allowed, redirecting to home")
      router.push("/home")
      return
    }

    console.log("[v0] ProtectedRoute - Access granted")
    setIsChecking(false)
  }, [router, allowedRoles])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return <>{children}</>
}
