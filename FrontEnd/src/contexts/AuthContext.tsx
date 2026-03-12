import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { AuthResponse, Role } from '@/types'
import { isAuthenticated, getRoleFromToken } from '@/utils/auth'

interface AuthContextValue {
  token: string | null
  email: string | null
  role: Role | null
  signIn: (data: AuthResponse) => void
  signOut: () => void
  authenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const stored = localStorage.getItem('token')
    return stored && isAuthenticated() ? stored : null
  })
  const [email, setEmail] = useState<string | null>(() => localStorage.getItem('email'))
  const [role, setRole] = useState<Role | null>(() => getRoleFromToken())

  const signIn = useCallback((data: AuthResponse) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    setToken(data.token)
    setEmail(data.email)
    setRole(data.role)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setToken(null)
    setEmail(null)
    setRole(null)
  }, [])

  return (
    <AuthContext.Provider value={{ token, email, role, signIn, signOut, authenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
