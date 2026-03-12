import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { ApiError, normalizeApiError } from '@/utils/api'
import { useAuth } from '@/contexts/AuthContext'

export function useApiErrorNavigation() {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleError = useCallback(
    (error: unknown): ApiError => {
      const apiError = normalizeApiError(error)
      if (apiError.status === 0) {
        // Erro de rede: backend indisponível (Failed to fetch)
        navigate('/500', { replace: true })
      } else if (apiError.status === 401) {
        signOut()
        navigate('/login', { replace: true })
      } else if (apiError.status === 403) {
        navigate('/403', { replace: true })
      } else if (apiError.status >= 500) {
        navigate('/500', { replace: true })
      }
      return apiError
    },
    [navigate, signOut],
  )

  return { handleError }
}
