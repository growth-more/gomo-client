import { IconButton } from '@mui/material'
import { IconButtonSx } from '@/components/icon-button/style'
import { Iconify } from '@/components/iconify'

interface MenuProps {
  onClick?: () => void
}

export function Menu({ onClick }: MenuProps) {
  return (
    <IconButton sx={IconButtonSx} onClick={onClick}>
      <Iconify icon="solar:menu-dots-bold" width={20} sx={{ transform: 'rotate(90deg)' }} />
    </IconButton>
  )
}
