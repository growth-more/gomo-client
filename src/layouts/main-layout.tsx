import { fetches } from '@/api'
import { AccessToken } from '@/auth/types'
import { Toaster } from '@/components/toast'
import { useEffectOnce } from '@/hooks'
import { useAuthStore, useTokenStore } from '@/stores'
import { theme } from '@/themes'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useCallback, useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'

export function MainLayout() {
  const selectedTheme = createTheme(theme.light)

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            gcTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      }),
    []
  )

  const { isHydrated, clearAccessToken, accessToken } = useTokenStore()
  const { setAuth, clearAuth } = useAuthStore()

  const checkAuth = useCallback(async () => {
    try {
      await fetches.auth.check()
    } catch {
      clearAccessToken()
    }
  }, [clearAccessToken])

  useEffectOnce(() => {
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
        <Toaster />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
