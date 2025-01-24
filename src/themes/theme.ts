import { ThemeOptions } from '@mui/material'
import palette from './palette'
import typography from './typography'

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    ...palette.light,
  },
  typography,
}

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    ...palette.dark,
  },
  typography,
}

const theme = {
  light: lightTheme,
  dark: darkTheme,
}

export default theme
