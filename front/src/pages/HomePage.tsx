export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue ! 🎉
          </h1>
          <p className="text-gray-600 mt-2">
            Vous êtes connecté avec succès
          </p>
        </header>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Tableau de bord</h2>
          <p className="text-gray-600">
            Contenu de votre page d'accueil...
          </p>
        </div>
      </div>
    </div>
  )
}