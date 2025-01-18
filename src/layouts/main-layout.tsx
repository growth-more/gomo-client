import theme from '@/themes'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  const selectedTheme = createTheme(theme.light)

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  )
}
