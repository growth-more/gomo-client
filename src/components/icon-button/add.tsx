import { IconButton } from '@mui/material'
import { IconButtonSx } from '@/components/icon-button/style'
import { Iconify } from '@/components/iconify'

export function Add() {
  return (
    <IconButton sx={IconButtonSx}>
      <Iconify icon="material-symbols:add-rounded" width={25} />
    </IconButton>
  )
}
