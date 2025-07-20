import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'

const ticketSchema = z.object({
  title: z
    .string()
    .min(4, 'Title must be at least 4 characters')
    .max(50, 'Title must be at most 50 characters')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Title must be alphanumeric'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must be at most 200 characters'),
  priority: z.enum(['low', 'medium', 'high']),
})

const priorities = ['low', 'medium', 'high']

export default function TicketForm({ onSubmit, isLoading }) {
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
    },
    onSubmit: async ({ value }) => {
      const parsed = ticketSchema.safeParse(value)

      if (!parsed.success) {
        const flatErrors = parsed.error.flatten().fieldErrors
        const firstError = Object.values(flatErrors).flat()[0]
        if (firstError) {
          toast.error(firstError)
        }
        return
      }

      await onSubmit(parsed.data)
      // form.reset()
    },
  })

  return (
    <>
      <Toaster position="top-right" />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Ticket</h2>

        <form.Field
          name="title"
          children={(field) => (
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Title</label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        />

        <form.Field
          name="description"
          children={(field) => (
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Description</label>
              <textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        />

        <form.Field
          name="priority"
          children={(field) => (
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Priority</label>
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option >Select Priority</option>
                {priorities.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </form>
    </>
  )
}
