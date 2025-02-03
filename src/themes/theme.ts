import { ThemeOptions } from '@mui/material'
import { palette } from '@/themes/palette'
import { typography } from '@/themes/typography'
import { components } from '@/themes/components'

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    ...palette.light,
  },
  typography,
  components,
}

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    ...palette.dark,
  },
  typography,
  components,
}

export const theme = {
  light: lightTheme,
  dark: darkTheme,
}
