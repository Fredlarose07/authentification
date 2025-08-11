import { api } from './api'
import type { RegisterData, LoginData, User } from '../types'

class AuthService {
  async register(data: RegisterData): Promise<{ access_token: string; refresh_token: string; user: User }> {
    console.log('🚀 Tentative d\'inscription pour:', data.email)

    const response = await api.post<{ access_token: string; refresh_token: string; user: User }>('/auth/register', {
      email: data.email.trim(),
      password: data.password,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim()
    })

    console.log('✅ Inscription réussie pour:', response.data.user.email)
    return response.data
  }

  async login(data: LoginData): Promise<{ access_token: string; refresh_token: string; user: User }> {
    console.log('🚀 Tentative de connexion pour:', data.email)

    const response = await api.post<{ access_token: string; refresh_token: string; user: User }>('/auth/login', {
      email: data.email.trim(),
      password: data.password
    })

    console.log('✅ Connexion réussie pour:', response.data.user.email)
    return response.data
  }
}

// Export d'une instance unique (singleton)
export const authService = new AuthService()