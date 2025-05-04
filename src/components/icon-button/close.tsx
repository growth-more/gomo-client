import { IconButton, SxProps, Theme } from '@mui/material'
import { IconButtonSx } from '@/components/icon-button/style'
import { Iconify } from '@/components/iconify'

interface CloseProps {
  onClick?: () => void
  sx?: SxProps<Theme>
}

export function Close({ onClick, sx }: CloseProps) {
  return (
    <IconButton sx={{ ...(IconButtonSx as object), ...sx }} onClick={onClick}>
      <Iconify icon="material-symbols:close-rounded" width={25} />
    </IconButton>
  )
}
