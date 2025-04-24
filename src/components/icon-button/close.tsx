import { IconButton } from '@mui/material'
import { IconButtonSx } from '@/components/icon-button/style'
import { Iconify } from '@/components/iconify'

interface CloseProps {
  onClick?: () => void
}

export function Close({ onClick }: CloseProps) {
  return (
    <IconButton sx={IconButtonSx} onClick={onClick}>
      <Iconify icon="material-symbols:close-rounded" width={25} />
    </IconButton>
  )
}
