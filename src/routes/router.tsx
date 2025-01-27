import paths from '@/routes/paths'
import MainLayout from '@/layouts/main-layout'
import MainPage from '@/pages/main'
import LoginPage from '@/pages/login'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: paths.root,
        element: <MainPage />,
      },
      {
        path: paths.login,
        element: <LoginPage />,
      },
    ],
  },
])

export default router
