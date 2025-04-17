import '@mui/material/Button'
import '@mui/material/styles'
import { PaletteColor, PaletteColorOptions } from '@mui/material/styles'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    plain: true
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    border: PaletteColor
  }

  interface PaletteOptions {
    border?: PaletteColorOptions
  }

  interface TypeBackground {
    main: string
    light: string
    dark: string
  }
}
