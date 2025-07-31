import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection de la racine vers /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Page de connexion */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Page d'inscription */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Page 404 - Toutes les autres routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App