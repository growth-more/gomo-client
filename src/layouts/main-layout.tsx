import { fetches } from '@/api'
import { AccessToken } from '@/auth/types'
import { WindowManager } from '@/components/window'
import { useAuthStore, useTokenStore } from '@/stores'
import { theme } from '@/themes'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useCallback, useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'

export function MainLayout() {
  const selectedTheme = createTheme(theme.light)

  const queryClient = useMemo(() => new QueryClient(), [])

  const { isHydrated, clearAccessToken, accessToken } = useTokenStore()
  const { setAuth, clearAuth } = useAuthStore()

  const checkAuth = useCallback(async () => {
    const isLogin = await fetches.auth.check()
    if (!isLogin) {
      clearAccessToken()
    }
  }, [clearAccessToken])

  useEffect(() => {
    if (isHydrated) {
      checkAuth()
    }
  }, [checkAuth, isHydrated])

  useEffect(() => {
    if (!isHydrated) {
      return
    }
    if (accessToken) {
      const { sub: id } = jwtDecode<AccessToken>(accessToken)
      setAuth({ id })
      return
    }
    clearAuth()
  }, [accessToken, clearAuth, isHydrated, setAuth])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <WindowManager />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
