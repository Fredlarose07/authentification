import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function HomePage() {

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec profil et déconnexion */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                👋  Bonjour {user?.firstName} !
              </h1>

            </div>

            {/* Bouton de déconnexion */}
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-2">
            Tableau de bord
          </h2>
          <p className="text-gray-600">
            Vous êtes connecté avec succès !
          </p>
        </div>
      </main>


    </div>
  )
}