import { useNavigate } from '@tanstack/react-router'

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    localStorage.setItem('auth', 'true')
    navigate({ to: '/dashboard/view' })
  }

  const handleSignup = () => {
    navigate({ to: '/signup' }) // Adjust if signup route is different
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-4">
      <form className="w-full max-w-sm p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
        <p className="text-sm  text-center text-red-800 mb-6">This is mock login</p>

        <input
          type="email"
          placeholder="Email"
          className="block mb-4 border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="block mb-4 border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition duration-200"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">Don't have an account?</p>
          <button
            type="button"
            onClick={handleSignup}
            className="text-blue-600 hover:underline text-sm mt-1"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}
