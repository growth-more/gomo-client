import { Box, Stack, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

interface StepContainerProps {
  sx?: SxProps<Theme>
  content: ReactNode[]
}

export function StepContainer({ content, sx }: StepContainerProps) {
  return (
    <Box overflow="hidden" position="relative">
      <Stack sx={sx} direction="row" position="absolute" top={0} left={0}>
        {content.map((node, i) => (
          <Box key={i}>{node}</Box>
        ))}
      </Stack>
    </Box>
  )
}
