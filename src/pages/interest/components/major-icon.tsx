import { Iconify } from '@/components/iconify'
import { IconButton } from '@mui/material'

interface MajorIconProps {
  isMajor: boolean
  onRegist?: () => void
  onUnregist?: () => void
}

export function MajorIcon({ isMajor, onRegist, onUnregist }: MajorIconProps) {
  if (isMajor) {
    return (
      <IconButton onClick={onUnregist}>
        <Iconify icon="solar:star-bold" sx={{ color: '#ffba00' }} />
      </IconButton>
    )
  }

  return (
    <IconButton onClick={onRegist}>
      <Iconify icon="solar:star-linear" sx={{ color: 'grey.400' }} />
    </IconButton>
  )
}
