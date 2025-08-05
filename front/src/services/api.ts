import axios from 'axios'

// Configuration de base pour tous les appels API
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes max
})

// Intercepteur pour gérer les erreurs globalement (optionnel)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log des erreurs en mode dev
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response?.data || error.message)
    }
    return Promise.reject(error)
  }
)