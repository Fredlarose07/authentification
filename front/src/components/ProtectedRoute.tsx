import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()

  // Si pas connecté → redirection vers login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si connecté → affiche la page demandée
  return <>{children}</>
}