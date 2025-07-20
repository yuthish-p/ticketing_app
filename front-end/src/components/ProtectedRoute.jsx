import { useRouter } from '@tanstack/react-router'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const isAuthenticated = localStorage.getItem('auth') === 'true'

  if (!isAuthenticated) {
    router.navigate({ to: '/login' })
    return null
  }

  return children
}
