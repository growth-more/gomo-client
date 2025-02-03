import { Box, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

interface InvisibleContainerProps {
  visible?: boolean
  children?: ReactNode
  sx?: SxProps<Theme>
}

export function InvisibleContainer({ children, sx, visible }: InvisibleContainerProps) {
  return <Box sx={visible ? sx : { display: 'none', ...sx }}>{children}</Box>
}
