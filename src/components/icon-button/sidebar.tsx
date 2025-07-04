import { IconButton } from '@mui/material'
import { IconButtonSx } from '@/components/icon-button/style'
import { Iconify } from '@/components/iconify'

interface SidebarProps {
  onClick?: () => void
  disabled?: boolean
}

export function Sidebar({ onClick, disabled }: SidebarProps) {
  return (
    <IconButton sx={IconButtonSx} onClick={onClick} disabled={disabled}>
      <Iconify icon="material-symbols:side-navigation" width={20} />
    </IconButton>
  )
}
