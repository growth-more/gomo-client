import { IconButtonSx } from '@/components/icon-button/style'
import { Iconify } from '@/components/iconify'
import { IconButton, SxProps, Theme } from '@mui/material'

interface RefreshProps {
  onClick?: () => void
  sx?: SxProps<Theme>
  disabled?: boolean
}

export function Refresh({ onClick, sx, disabled }: RefreshProps) {
  return (
    <IconButton onClick={onClick} sx={{ ...(IconButtonSx as object), ...sx }} disabled={disabled}>
      <Iconify icon="material-symbols:refresh" />
    </IconButton>
  )
}
