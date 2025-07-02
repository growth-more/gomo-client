import { createBrowserRouter } from 'react-router-dom'
import { JoinPage, LoginPage } from '@/pages'
import { paths } from '@/routes'
import { MainLayout } from '@/layouts'
import { MainView } from '@/views/app/main-view'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: paths.root,
        element: <MainView />,
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
