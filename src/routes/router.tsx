import { createBrowserRouter } from 'react-router-dom'
import { JoinPage, LoginPage, MainPage } from '@/pages'
import { paths } from '@/routes'
import { MainLayout } from '@/layouts'

export const router = createBrowserRouter([
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
      {
        path: paths.join,
        element: <JoinPage />,
      },
    ],
  },
])
