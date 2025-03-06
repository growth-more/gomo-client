import { Stack } from '@mui/material'

import { Iconify } from '@/components/iconify'
import { useBoolean } from '@/hooks'
import { alpha, Box, SxProps, Theme } from '@mui/material'

interface AvatarProps {
  src?: string
}

const avatarSx: SxProps<Theme> = {
  width: 70,
  height: 70,
  flexShrink: 0,
  borderRadius: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: 'divider',
  border: 1,
  borderColor: 'divider',
  overflow: 'hidden',
  boxShadow: (theme) => `
    0 0 15px ${alpha(theme.palette.common.white, 0.3)},
    0 0 30px ${alpha(theme.palette.common.white, 0.15)}
  `,
  backdropFilter: 'blur(10px)',
}

export function Avatar({ src }: AvatarProps) {
  const isFallback = useBoolean()

  if (!src || isFallback.value) {
    return (
      <Stack sx={avatarSx}>
        <Iconify icon="material-symbols:person-rounded" width={40} color="white" />
      </Stack>
    )
  }

  return (
    <Stack sx={avatarSx}>
      <Box
        component="img"
        src={src}
        width={1}
        height={1}
        onError={isFallback.onTrue}
        sx={{ objectFit: 'cover', objectPosition: 'center' }}
      />
    </Stack>
  )
}
