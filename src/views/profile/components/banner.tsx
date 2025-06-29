import { Iconify } from '@/components/iconify'
import { useBoolean, useUpload } from '@/hooks'
import { Box, IconButton, Stack, SxProps, Theme } from '@mui/material'
import { colord } from 'colord'
import { useMemo } from 'react'

interface BannerProps {
  src: string
  editMode?: boolean
  onUpdate?: (file: File) => void
}

const bannerSx: SxProps<Theme> = {
  width: 1,
  aspectRatio: 3.5,
  objectFit: 'cover',
}

export function Banner({ src, editMode, onUpdate }: BannerProps) {
  const isFallback = useBoolean()

  const { upload } = useUpload({
    onSuccess: (files) => {
      if (files.length > 0) {
        onUpdate?.(files[0])
      }
    },
  })

  const bannerRender = useMemo(() => {
    if (!src || isFallback.value) {
      return <Box component="img" src="./img/profile-bg.jpg" sx={bannerSx} />
    }
    return <Box component="img" src={src} sx={bannerSx} onError={isFallback.onTrue} />
  }, [src, isFallback])

  return (
    <Stack position="relative" justifyContent="center" alignItems="center">
      {bannerRender}
      {editMode && (
        <Stack
          width={1}
          height={1}
          bgcolor={(theme) => colord(theme.palette.common.black).alpha(0.3).toHex()}
          position="absolute"
        >
          <IconButton sx={{ borderRadius: 1, width: 1, height: 1 }} onClick={upload}>
            <Iconify icon="lets-icons:edit" width={20} color="white" />
          </IconButton>
        </Stack>
      )}
    </Stack>
  )
}
