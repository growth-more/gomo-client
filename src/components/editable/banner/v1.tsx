import { EditableProps } from '@/components/editable/types'
import { Iconify } from '@/components/iconify'
import { useBoolean, useUpload } from '@/hooks'
import { alpha, Box, IconButton, Stack, SxProps, Theme } from '@mui/material'
import { motion } from 'motion/react'
import { useMemo } from 'react'

const bannerSx: SxProps<Theme> = {
  width: 1,
  aspectRatio: 2.5,
  border: 1,
  borderColor: 'divider',
  borderRadius: 2,
}

interface EditableBannerProps extends EditableProps<File | null> {
  src?: string
}

export function EditableBanner({ src, onEdit }: EditableBannerProps) {
  const isFallback = useBoolean()

  const { upload } = useUpload({
    onSuccess: (files) => onEdit?.(files[0]),
    onError: (error) => console.error(error),
  })

  const bannerRender = useMemo(() => {
    if (!src || isFallback.value) {
      return <Box component="img" src="./img/profile-bg.jpg" sx={bannerSx} />
    }
    return <Box component="img" src={src} sx={bannerSx} onError={isFallback.onTrue} />
  }, [src, isFallback])

  return (
    <Box
      position="relative"
      sx={{ width: 1, aspectRatio: 2.5, borderRadius: 2, overflow: 'hidden' }}
    >
      {bannerRender}
      <Stack
        position="absolute"
        width={1}
        height={1}
        top={0}
        left={0}
        bgcolor={(theme) => alpha(theme.palette.common.black, 0.3)}
        component={motion.div}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        justifyContent="center"
        alignItems="center"
      >
        <IconButton onClick={upload}>
          <Iconify icon="lets-icons:edit" width={20} color="white" />
        </IconButton>
      </Stack>
    </Box>
  )
}
