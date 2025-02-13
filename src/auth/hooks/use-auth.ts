import { fetches } from '@/api'
import { LoginRequest } from '@/api/types'
import { useAuthStore, useTokenStore } from '@/stores'
import { useCallback, useMemo } from 'react'

export function useAuth() {
  const { auth } = useAuthStore()
  const { setAccessToken, clearAccessToken } = useTokenStore()

  const isLogin = useMemo(() => auth !== null, [auth])

  const login = useCallback(
    async (request: LoginRequest) => {
      const { accessToken } = await fetches.auth.login(request)
      setAccessToken(accessToken)
    },
    [setAccessToken]
  )

  const logout = useCallback(async () => {
    await fetches.auth.logout()
    clearAccessToken()
  }, [clearAccessToken])

  return { isLogin, login, logout }
}
