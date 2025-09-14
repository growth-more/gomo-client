import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/pages'
import { paths } from '@/routes'
import { MainLayout } from '@/layouts'
import { MainView } from '@/views/app/main-view'
import { OauthResult } from '@/views/login/oauth-result'
import { JoinView } from '@/views/join/join-view'

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
        path: paths.oauth.google,
        element: <OauthResult provider="google" />,
      },
      {
        path: paths.oauth.kakao,
        element: <OauthResult provider="kakao" />,
      },
      {
        path: paths.oauth.naver,
        element: <OauthResult provider="naver" />,
      },
      {
        path: paths.join,
        element: <JoinView />,
      },
    ],
  },
])
