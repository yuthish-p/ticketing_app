import { useRouter } from '@tanstack/react-router'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const isAuthenticated = localStorage.getItem('auth') === 'true'

  if (!isAuthenticated) {
    router.navigate({ to: '/' })
    return null
  }

  return children
}
