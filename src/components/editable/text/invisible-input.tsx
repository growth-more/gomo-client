import { Box, SxProps, Theme, TypographyProps } from '@mui/material'
import { InputHTMLAttributes } from 'react'

interface InvisibleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  sx?: SxProps<Theme>
  typographyProps?: TypographyProps
}

export function InvisibleInput({ sx, typographyProps, ...inputProps }: InvisibleInputProps) {
  return (
    <Box
      component="input"
      sx={{
        width: 1,
        outline: 'none',
        border: 'none',
        bgcolor: 'transparent',
        fontSize: typographyProps?.fontSize,
        fontWeight: typographyProps?.fontWeight,
        fontFamily: (theme) => theme.typography.fontFamily,
        color: typographyProps?.color,
        lineHeight: 'inherit',
        p: 0,
        ...sx,
      }}
      {...inputProps}
    />
  )
}
