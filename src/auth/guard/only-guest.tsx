import { ReactNode } from 'react'
import { useAuth } from '@/auth/hooks'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { paths } from '@/routes'

interface OnlyGuestProps {
  children: ReactNode
}

export function OnlyGuest({ children }: OnlyGuestProps) {
  const { isLogin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (isLogin) {
    if (!location.key) {
      return <Navigate to={paths.root} />
    }
    navigate(-1)
    return null
  }

  return children
}
