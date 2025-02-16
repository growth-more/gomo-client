import { fetches } from '@/api'
import { WindowManager } from '@/components/window'
import { useTokenStore } from '@/stores'
import { theme } from '@/themes'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'

export function MainLayout() {
  const selectedTheme = createTheme(theme.light)

  const queryClient = useMemo(() => new QueryClient(), [])

  const { isHydrated, clearAccessToken } = useTokenStore()

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
