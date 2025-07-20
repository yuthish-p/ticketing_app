import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/MainRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()
function App() {
  return (
      <QueryClientProvider client={queryClient}>
         <Toaster position="top-right" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    )
   
}

export default App
