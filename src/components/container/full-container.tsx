import { Box, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

interface FullContainerProps {
  children: ReactNode
  sx?: SxProps<Theme>
}

export function FullContainer({ children, sx }: FullContainerProps) {
  return (
    <Box
      width={1}
      height="100vh"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={sx}
    >
      {children}
    </Box>
  )
}
