import { Avatar } from '@/components/editable/avatar/avatar'
import { AvatarSelectorItem } from '@/components/editable/avatar/avatar-selector-item'
import { Iconify } from '@/components/iconify'
import { Dialog, Stack, Typography } from '@mui/material'

interface AvatarSelectorProps {
  open: boolean
  onClose: () => void
}

export function AvatarSelector({ open, onClose }: AvatarSelectorProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" sx={{ bgcolor: 'transparent' }}>
      <Stack direction="row" spacing={2} p={2}>
        <AvatarSelectorItem>
          <Avatar />
          <Typography fontSize={14} noWrap>
            기본 프로필
          </Typography>
        </AvatarSelectorItem>
        <AvatarSelectorItem>
          <Stack
            flex={1}
            width={1}
            justifyContent="center"
            border={2}
            borderRadius={1}
            borderColor="text.disabled"
            sx={{ borderStyle: 'dashed' }}
          >
            <Iconify icon="solar:cloud-upload-linear" width={30} sx={{ color: 'text.disabled' }} />
          </Stack>
          <Typography fontSize={14} noWrap>
            프로필 업로드
          </Typography>
        </AvatarSelectorItem>
      </Stack>
    </Dialog>
  )
}
