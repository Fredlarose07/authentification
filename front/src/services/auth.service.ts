import { api } from './api'
import type { RegisterData, LoginData, User } from '../types'

class AuthService {
  async register(data: RegisterData): Promise<User> {
    const response = await api.post('/auth/register', data)
    return response.data
  }

  async login(data: LoginData): Promise<User> {
    const response = await api.post('/auth/login', data)
    return response.data
  }
}

// Export d'une instance unique (singleton)
export const authService = new AuthService()