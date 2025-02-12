import { ReactNode } from 'react'
import { useAuth } from '@/auth/hooks'
import { Navigate } from 'react-router-dom'
import { paths } from '@/routes'

interface OnlyAuthProps {
  children: ReactNode
}

export function OnlyAuth({ children }: OnlyAuthProps) {
  const { isLogin } = useAuth()

  if (!isLogin) {
    return <Navigate to={paths.login} />
  }

  return children
}
