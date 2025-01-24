import paths from '@/configs/paths'
import MainLayout from '@/layouts/main-layout'
import MainPage from '@/pages/main-page'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: paths.root,
        element: <MainPage />,
      },
    ],
  },
])

export default router
