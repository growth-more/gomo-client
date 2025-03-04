import { fetches } from '@/api'
import { useAuthStore, useTokenStore } from '@/stores'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'

export type AuthenticateStatus = 'LOADING' | 'AUTHENTICATED' | 'UNAUTHENTICATED'

export function useAuth() {
  const { auth, isLoading } = useAuthStore()
  const { setAccessToken, clearAccessToken } = useTokenStore()

  const { mutate: login } = useMutation({
    mutationFn: fetches.auth.login,
    onSuccess: (data) => {
      setAccessToken(data.token)
    },
  })

  const { mutate: logout } = useMutation({
    mutationFn: fetches.auth.logout,
    onSuccess: () => {
      clearAccessToken()
    },
  })

  const isLogin = useMemo<AuthenticateStatus>(() => {
    if (isLoading) {
      return 'LOADING'
    }
    if (auth === null) {
      return 'UNAUTHENTICATED'
    }
    return 'AUTHENTICATED'
  }, [auth, isLoading])

  return { isLogin, login, logout }
}
