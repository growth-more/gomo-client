import { Iconify } from '@/components/iconify'
import { IconButton, Tooltip } from '@mui/material'

interface MajorIconProps {
  isMajor: boolean
  onRegist?: () => void
  onUnregist?: () => void
}

export function MajorIcon({ isMajor, onRegist, onUnregist }: MajorIconProps) {
  if (isMajor) {
    return (
      <Tooltip title="주요 관심사 해제">
        <IconButton onClick={onUnregist}>
          <Iconify icon="solar:star-bold" sx={{ color: '#ffba00' }} />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip title="주요 관심사 등록">
      <IconButton onClick={onRegist}>
        <Iconify icon="solar:star-linear" sx={{ color: 'grey.400' }} />
      </IconButton>
    </Tooltip>
  )
}
