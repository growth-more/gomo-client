import { IconButton } from '@mui/material'
import { IconButtonSx } from '@/components/icon-button/style'
import { Iconify } from '@/components/iconify'

interface SidebarProps {
  onClick?: () => void
}

export function Sidebar({ onClick }: SidebarProps) {
  return (
    <IconButton sx={IconButtonSx} onClick={onClick}>
      <Iconify icon="material-symbols:side-navigation" width={20} />
    </IconButton>
  )
}
