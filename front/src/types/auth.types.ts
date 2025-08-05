export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface LoginData {
  email: string
  password: string
}

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}