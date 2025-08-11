import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'

interface AuthData {
  access_token: string
  refresh_token: string
  user: User
}

interface AuthContextType {
  user: User | null
  token: string | null
  refreshToken: string | null
  login: (authData: AuthData) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Provider qui englobe l'application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Vérifier si un utilisateur est stocké au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedAccessToken = localStorage.getItem('access_token')
    const storedRefreshToken = localStorage.getItem('refresh_token')  // ← Récupérer refresh token

    if (storedUser && storedAccessToken && storedRefreshToken) {  // ← Les 3 doivent exister
      setUser(JSON.parse(storedUser))
      setToken(storedAccessToken)
      setRefreshToken(storedRefreshToken)  // ← Restaurer refresh token
    }
    setIsLoading(false)
  }, [])

  const login = (authData: AuthData) => {
    setUser(authData.user)
    setToken(authData.access_token)
    setRefreshToken(authData.refresh_token)

    // Stocker les deux tokens
    localStorage.setItem('user', JSON.stringify(authData.user))
    localStorage.setItem('access_token', authData.access_token)
    localStorage.setItem('refresh_token', authData.refresh_token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setRefreshToken(null)  // ← Reset le refresh token

    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')  // ← Supprimer le refresh token
  }

  const isAuthenticated = user !== null

return (
  <AuthContext.Provider value={{ 
    user, 
    token, 
    refreshToken, 
    login, 
    logout, 
    isAuthenticated, 
    isLoading 
  }}>
    {children}
  </AuthContext.Provider>
)
}