import TicketForm from '../../components/TicketForm'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from '../../utlis/axiosInstance'

export default function CreateTicket() {
  const navigate = useNavigate()

  // Mutation using TanStack Query
  const mutation = useMutation({
    mutationFn: (ticket) => axios.post('/ticket', ticket),
    onSuccess: () => {
      toast.success('Ticket created successfully!')
      navigate({ to: '/dashboard/view' }) 
    },
    onError: () => {
      toast.error('Failed to create ticket. Please try again.')
    },
  })

  const handleSubmit = (ticket) => {
    mutation.mutate(ticket)
  }

  return (
    <div className="flex justify-center items-start mt-8 px-4">
      <TicketForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
    </div>
  )
}
