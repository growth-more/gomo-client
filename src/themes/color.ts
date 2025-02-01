import { PaletteColorOptions } from '@mui/material'

interface GreyScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

interface CommonColor {
  white: string
  black: string
}

interface Color {
  primary: PaletteColorOptions
  secondary: PaletteColorOptions
  error: PaletteColorOptions
  warning: PaletteColorOptions
  info: PaletteColorOptions
  success: PaletteColorOptions
  grey: GreyScale
  common: CommonColor
}

export const colors: Color = {
  primary: {
    light: '#6366f1',
    main: '#4f46e5',
    dark: '#4338ca',
    contrastText: '#FFFFFF',
  },
  secondary: {
    light: '#0ea5e9',
    main: '#0284c7',
    dark: '#0369a1',
    contrastText: '#FFFFFF',
  },
  success: {
    light: '#77ED8B',
    main: '#22C55E',
    dark: '#118D57',
    contrastText: '#ffffff',
  },
  info: {
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    contrastText: '#FFFFFF',
  },
  warning: {
    light: '#fb923c',
    main: '#f97316',
    dark: '#ea580c',
    contrastText: '#1C252E',
  },
  error: {
    light: '#f87171',
    main: '#ef4444',
    dark: '#dc2626',
    contrastText: '#FFFFFF',
  },
  grey: {
    '50': '#fafafa',
    '100': '#f4f4f5',
    '200': '#e4e4e7',
    '300': '#d4d4d8',
    '400': '#a1a1aa',
    '500': '#71717a',
    '600': '#52525b',
    '700': '#3f3f46',
    '800': '#27272a',
    '900': '#18181b',
  },
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
}
