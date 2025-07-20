import { Link, useRouterState } from '@tanstack/react-router'

export default function Sidebar({ open, onClose }) {
  const router = useRouterState()
  const currentPath = router.location.pathname

  const isActive = (path) => currentPath === path

  const linkClasses = (path) =>
    [
      'px-4 py-2 rounded-md transition-colors',
      isActive(path)
        ? 'bg-blue-100 text-blue-600 font-medium'
        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500',
    ].join(' ')

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed md:static z-40 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-4 border-b text-lg font-semibold text-gray-800">
          Dashboard
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/dashboard/create" className={linkClasses('/dashboard/create')}>
            Create Ticket
          </Link>

          <Link to="/dashboard/view" className={linkClasses('/dashboard/view')}>
            View Tickets
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem('auth')
              location.href = '/login'
            }}
            className="mt-6 px-4 py-2 rounded-md text-red-600 bg-red-50 hover:bg-red-100 transition-colors text-left font-medium"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  )
}
