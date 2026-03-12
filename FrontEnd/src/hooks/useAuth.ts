import { useState, useCallback } from 'react'
import { useAuth as useAuthContext } from '@/contexts/AuthContext'

export function useAuth() {
  const { email, signOut, authenticated, token, role } = useAuthContext()

  const [isDevMode, setIsDevMode] = useState<boolean>(
    () => localStorage.getItem('devMode') === 'true',
  )

  const toggleDevMode = useCallback(() => {
    setIsDevMode((prev) => {
      const next = !prev
      localStorage.setItem('devMode', String(next))
      return next
    })
  }, [])

  const logout = useCallback(() => {
    signOut()
  }, [signOut])

  const user = email ? { name: email } : null

  return { user, isDevMode, toggleDevMode, logout, authenticated, token, role }
}
