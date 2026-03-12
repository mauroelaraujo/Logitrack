import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import type { Role } from '@/types'

interface PrivateRouteProps {
  requiredRole?: Role
}

export default function PrivateRoute({ requiredRole }: PrivateRouteProps) {
  const { authenticated, role } = useAuth()

  if (!authenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/403" replace />
  }

  return <Outlet />
}
