import { IconButton } from '@mui/material'
import { IconButtonSx } from '@/components/icon-button/style'
import { Iconify } from '@/components/iconify'

interface AddProps {
  onClick?: () => void
}

export function Add({ onClick }: AddProps) {
  return (
    <IconButton sx={IconButtonSx} onClick={onClick}>
      <Iconify icon="material-symbols:add-rounded" width={25} />
    </IconButton>
  )
}
