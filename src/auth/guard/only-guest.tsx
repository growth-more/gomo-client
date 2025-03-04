import { ReactNode } from 'react'
import { useAuth } from '@/auth/hooks'
import { Navigate } from 'react-router-dom'
import { paths } from '@/routes'

interface OnlyGuestProps {
  children: ReactNode
}

export function OnlyGuest({ children }: OnlyGuestProps) {
  const { isLogin } = useAuth()

  if (isLogin === 'AUTHENTICATED') {
    return <Navigate to={paths.root} />
  }

  return children
}
