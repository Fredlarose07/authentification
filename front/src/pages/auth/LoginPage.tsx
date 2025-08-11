import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { authService } from '@/services/auth.service'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Schéma de validation Zod
const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est obligatoire')
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })


  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const authData = await authService.login({  
        email: data.email,
        password: data.password
      })
      login(authData)  
      navigate('/home')
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const loginDemo = async () => {
    setIsLoading(true)
    setError('')

    try {
      const authData = await authService.login({  
        email: 'admin@admin.com',
        password: 'Admin123'
      })
      login(authData)  
      navigate('/home')
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur de connexion démo'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Entrez votre email ci-dessous pour vous connecter à votre compte
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Affichage de l'erreur */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register('password')}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}

              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </div>
          </form>

          {/* Mode démo */}
          <div
            className="mt-4 pl-4 p-2 flex gap-3 bg-gray-50 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={loginDemo}
          >
            <span className="font-mono text-gray-600">&gt;_</span>

            <div className="text-sm text-gray-600">
              <div className="font-medium">Mode démo</div>
              <p className="text-xs text-gray-500 mb-2 ">
                Se connecter avec <span className="font-bold underline">admin@admin.com</span>
              </p>
            </div>
          </div>

          <div className="mt-4 text-center text-sm">
            Pas de compte ?{" "}
            <Link to="/register" className="text-primary underline-offset-4 hover:underline">
              S'inscrire
            </Link>
          </div>
        </CardContent>

      </Card>
    </div>
  )
}