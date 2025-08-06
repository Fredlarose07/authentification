import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import HomePage from './pages/HomePage'  // ← Nouveau import
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection de la racine vers /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Pages d'authentification */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Page d'accueil après connexion */}
        <Route path="/home" element={<HomePage />} />
        
        {/* Page 404 - Toutes les autres routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App