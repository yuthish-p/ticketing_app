import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './RootRoute'
import Login from '../pages/auth/Login'

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
})
