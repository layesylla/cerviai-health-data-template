// Mock authentication system for CERVIAI
// Replace with your Spring Boot backend API calls

export type UserRole = "agent" | "medecin" | "chercheur" | "patiente" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  institution?: string
  structureId?: string
  telephone?: string
  region?: string
}

interface RegisterData {
  email: string
  password: string
  name: string
  role: UserRole
  institution?: string
  additionalData?: Record<string, any>
}

const REGISTERED_USERS_KEY = "cerviai_registered_users"
const STRUCTURES_KEY = "cerviai_structures"

// Mock users for testing
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "agent@cerviai.com": {
    password: "demo123",
    user: {
      id: "1",
      email: "agent@cerviai.com",
      name: "Aïssatou Diop",
      role: "agent",
      institution: "Centre de Santé de Pikine",
      structureId: "1",
      telephone: "+221 77 123 45 67",
    },
  },
  "medecin@cerviai.com": {
    password: "demo123",
    user: {
      id: "2",
      email: "medecin@cerviai.com",
      name: "Dr. Amadou Diallo",
      role: "medecin",
      institution: "Hôpital Principal de Dakar",
      structureId: "2",
      telephone: "+221 77 234 56 78",
    },
  },
  "chercheur@cerviai.com": {
    password: "demo123",
    user: {
      id: "3",
      email: "chercheur@cerviai.com",
      name: "Prof. Fatima Ndiaye",
      role: "chercheur",
      institution: "Institut Pasteur de Dakar",
    },
  },
  "patiente@cerviai.com": {
    password: "demo123",
    user: {
      id: "4",
      email: "patiente@cerviai.com",
      name: "Mariama Sow",
      role: "patiente",
      institution: undefined,
    },
  },
  "admin@cerviai.com": {
    password: "demo123",
    user: {
      id: "5",
      email: "admin@cerviai.com",
      name: "Administrateur Système",
      role: "admin",
      institution: "Ministère de la Santé",
    },
  },
}

function getRegisteredUsers(): Record<string, { password: string; user: User }> {
  if (typeof window === "undefined") return {}

  try {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function saveRegisteredUsers(users: Record<string, { password: string; user: User }>) {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
  } catch (error) {
    console.error("[v0] Error saving registered users:", error)
  }
}

function getAllUsers(): Record<string, { password: string; user: User }> {
  return { ...MOCK_USERS, ...getRegisteredUsers() }
}

export function getAllRegisteredUsers(): User[] {
  const allUsers = getAllUsers()
  return Object.values(allUsers).map((u) => u.user)
}

export function getAgentsByStructure(structureId: string): User[] {
  const allUsers = getAllUsers()
  return Object.values(allUsers)
    .map((u) => u.user)
    .filter((u) => (u.role === "agent" || u.role === "medecin") && u.structureId === structureId)
}

export async function register(data: RegisterData): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const allUsers = getAllUsers()
  if (allUsers[data.email]) {
    throw new Error("Un compte avec cet email existe déjà")
  }

  const newUser: User = {
    id: String(Date.now()),
    email: data.email,
    name: data.name,
    role: data.role,
    institution: data.institution,
    ...(["agent", "medecin"].includes(data.role) &&
      data.additionalData?.structureId && {
        structureId: data.additionalData.structureId,
      }),
    ...(data.role === "agent" &&
      data.additionalData?.region && {
        region: data.additionalData.region,
      }),
    ...(data.additionalData?.telephone && {
      telephone: data.additionalData.telephone,
    }),
  }

  const registeredUsers = getRegisteredUsers()
  registeredUsers[data.email] = {
    password: data.password,
    user: newUser,
  }
  saveRegisteredUsers(registeredUsers)

  console.log("[v0] New user registered:", newUser)
  console.log("[v0] All registered users:", getAllRegisteredUsers())

  return newUser
}

export async function login(email: string, password: string): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const allUsers = getAllUsers()
  const userRecord = allUsers[email]

  if (!userRecord || userRecord.password !== password) {
    throw new Error("Email ou mot de passe incorrect")
  }

  // Store user in localStorage (replace with JWT token from your backend)
  if (typeof window !== "undefined") {
    localStorage.setItem("cerviai_user", JSON.stringify(userRecord.user))
  }

  return userRecord.user
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cerviai_user")
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("cerviai_user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function hasRole(role: UserRole | UserRole[]): boolean {
  const user = getCurrentUser()
  if (!user) return false

  if (Array.isArray(role)) {
    return role.includes(user.role)
  }

  return user.role === role
}

export function canViewSensitiveData(role: UserRole): boolean {
  return ["admin", "medecin", "agent"].includes(role)
}

export function canViewAlerts(role: UserRole): boolean {
  return ["admin", "medecin"].includes(role)
}

export function canManageUsers(role: UserRole): boolean {
  return role === "admin"
}

export function canManageStructures(role: UserRole): boolean {
  return role === "admin"
}

export function canManageCampaigns(role: UserRole): boolean {
  return role === "admin"
}

export function getAllStructures() {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STRUCTURES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}
