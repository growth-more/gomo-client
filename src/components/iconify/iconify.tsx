import type { IconifyIconProps } from '@iconify/react'

import { Icon } from '@iconify/react'
import { Box, Theme, SxProps } from '@mui/material'

interface IconifyProps extends IconifyIconProps {
  sx?: SxProps<Theme>
}

export function Iconify({ width, icon, sx }: IconifyProps) {
  return (
    <Box sx={sx}>
      <Icon icon={icon} width={width ?? 20} height={width ?? 20} />
    </Box>
  )
}
