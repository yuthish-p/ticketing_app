import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './RootRoute'
import Error404 from '../pages/error/Error404'

export const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: Error404,
})
