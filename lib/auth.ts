// Mock authentication system for CERVIAI
// Replace with your Spring Boot backend API calls

export type UserRole = "agent" | "medecin" | "chercheur" | "patiente" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  institution?: string
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

export async function register(data: RegisterData): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const allUsers = getAllUsers()
  if (allUsers[data.email]) {
    throw new Error("Un compte avec cet email existe déjà")
  }

  // Create new user
  const newUser: User = {
    id: String(Date.now()), // Use timestamp for unique ID
    email: data.email,
    name: data.name,
    role: data.role,
    institution: data.institution,
  }

  const registeredUsers = getRegisteredUsers()
  registeredUsers[data.email] = {
    password: data.password,
    user: newUser,
  }
  saveRegisteredUsers(registeredUsers)

  console.log("[v0] New user registered:", newUser)
  console.log("[v0] Additional data:", data.additionalData)

  return newUser
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
