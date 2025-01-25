import paths from '@/configs/paths'
import MainLayout from '@/layouts/main-layout'
import MainPage from '@/pages/main'
import SignInPage from '@/pages/sign-in'
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
        path: paths.signin,
        element: <SignInPage />,
      },
    ],
  },
])

export default router
