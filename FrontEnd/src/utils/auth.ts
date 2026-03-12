import type { Role } from '@/types'

export function getRoleFromToken(): Role | null {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    // O backend coloca a role no claim "role" sem prefixo ROLE_
    const role = (payload.role as string)?.replace('ROLE_', '') as Role
    return role ?? null
  } catch {
    return null
  }
}

export function isAdmin(): boolean {
  return getRoleFromToken() === 'ADMIN'
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('token')
  if (!token) return false
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}
