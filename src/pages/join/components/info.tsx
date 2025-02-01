import { Iconify } from '@/components/iconify'
import { Stack, SxProps, Theme, Tooltip } from '@mui/material'
import { ReactNode } from 'react'

interface InfoProps {
  info: ReactNode
  sx?: SxProps<Theme>
}

export function Info({ info, sx }: InfoProps) {
  return (
    <Tooltip title={info} placement="right" disableInteractive>
      <Stack justifyContent="center" alignItems="center" sx={sx}>
        <Iconify icon="mdi:information-outline" />
      </Stack>
    </Tooltip>
  )
}
