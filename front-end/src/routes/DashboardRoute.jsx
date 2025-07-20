import { createRoute, Outlet } from '@tanstack/react-router'
import { rootRoute } from './RootRoute'
import ProtectedRoute from '../components/ProtectedRoute'
import AppLayout from '../layout/AppLayout'

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </ProtectedRoute>
  ),
  notFoundComponent: () => <div className="p-6 text-red-500">page Not Found</div>,
})
