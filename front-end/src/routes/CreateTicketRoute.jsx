import { createRoute } from '@tanstack/react-router'
import { dashboardRoute } from './DashboardRoute'  
import CreateTicket from '../pages/dashboard/CreateTicket'  
export const createTicketRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'create', 
  component: CreateTicket,
})