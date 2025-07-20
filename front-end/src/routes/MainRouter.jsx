import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './RootRoute'

import { loginRoute } from './LoginRoute'
import { errorRoute } from './ErrorRoute'
import { dashboardRoute } from './DashboardRoute'
import { createTicketRoute } from './CreateTicketRoute'
import { ViewTicketRoute } from './ViewTicketRoute'

const routeTree = rootRoute.addChildren([
  loginRoute,
  errorRoute,
  dashboardRoute.addChildren([
    createTicketRoute,
    ViewTicketRoute,
    
  ]),
])

export const router = createRouter({ routeTree })

