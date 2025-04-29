import { IconButton } from '@mui/material'
import { IconButtonSx } from '@/components/icon-button/style'
import { Iconify } from '@/components/iconify'
import { MouseEvent } from 'react'

interface MenuProps {
  onClick?: (e: MouseEvent) => void
}

export function Menu({ onClick }: MenuProps) {
  return (
    <IconButton sx={IconButtonSx} onClick={onClick}>
      <Iconify icon="solar:menu-dots-bold" width={20} sx={{ transform: 'rotate(90deg)' }} />
    </IconButton>
  )
}
