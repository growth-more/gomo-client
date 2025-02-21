import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import '@/global.css'

async function mockServiceWorker() {
  if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_MOCK_API.toLowerCase() === 'false') {
    return
  }
  const { worker } = await import('@/msw/worker')
  return worker.start()
}

mockServiceWorker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
})
