import { ThemeOptions } from '@mui/material'
import palette from './palette'
import typography from './typography'
import { components } from './components'

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

const theme = {
  light: lightTheme,
  dark: darkTheme,
}

export default theme
