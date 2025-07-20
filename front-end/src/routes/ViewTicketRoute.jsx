import { createRoute } from '@tanstack/react-router'
import { dashboardRoute } from './DashboardRoute'  
import  ViewTickets  from '../pages/dashboard/ViewTickets'
export const ViewTicketRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'view', 
  component: ViewTickets,
})
