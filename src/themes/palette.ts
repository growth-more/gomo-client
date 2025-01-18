import colors from '@/configs/color'
import { alpha, PaletteOptions, TypeAction } from '@mui/material'

const baseAction: Partial<TypeAction> = {
  hover: alpha(colors.grey[500], 0.08),
  selected: alpha(colors.grey[500], 0.16),
  focus: alpha(colors.grey[500], 0.24),
  disabled: alpha(colors.grey[500], 0.24),
  disabledBackground: alpha(colors.grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
}

const basePalette: PaletteOptions = {
  primary: { ...colors.primary },
  secondary: { ...colors.secondary },
  error: { ...colors.error },
  warning: { ...colors.warning },
  info: { ...colors.info },
  success: { ...colors.success },
  grey: { ...colors.grey },
  common: { ...colors.common },
}

const lightPalette: PaletteOptions = {
  ...basePalette,
  action: { ...baseAction },
}

const darkPalette: PaletteOptions = {
  ...basePalette,
  action: { ...baseAction },
}

const palette = {
  light: lightPalette,
  dark: darkPalette,
}

export default palette
