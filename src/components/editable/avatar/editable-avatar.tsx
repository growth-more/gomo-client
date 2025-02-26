import { Iconify } from '@/components/iconify'
import { useBoolean, useUpload } from '@/hooks'
import { alpha, Box, IconButton, Stack } from '@mui/material'
import { useEffect } from 'react'
import { EditableProps } from '../types'
import { motion } from 'motion/react'

interface EditableAvatarProps extends EditableProps<File> {
  img?: string
}

export function EditableAvatar({ img, editable, onEdit }: EditableAvatarProps) {
  const isFallback = useBoolean()
  const { upload } = useUpload({
    onSuccess: (files) => onEdit?.(files[0]),
    onError: (error) => console.error(error),
  })

  useEffect(() => {
    if (img) {
      isFallback.onFalse()
      return
    }
    isFallback.onTrue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img])

  return (
    <Stack
      width={70}
      height={70}
      flexShrink={0}
      borderRadius={70}
      position="relative"
      justifyContent="center"
      alignItems="center"
      bgcolor="divider"
      border={1}
      borderColor="divider"
      overflow="hidden"
      sx={{
        boxShadow: (theme) => `
          0 0 15px ${alpha(theme.palette.common.white, 0.3)},
          0 0 30px ${alpha(theme.palette.common.white, 0.15)}
        `,
        backdropFilter: 'blur(10px)',
      }}
    >
      {isFallback.value ? (
        <Iconify icon="material-symbols:person-rounded" width={40} color="white" />
      ) : (
        <Box
          component="img"
          src={img}
          width={1}
          height={1}
          onError={isFallback.onTrue}
          sx={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      )}
      {editable && (
        <Stack
          width={1}
          height={1}
          justifyContent="center"
          alignItems="center"
          borderRadius="100%"
          position="absolute"
          bgcolor={(theme) => alpha(theme.palette.common.black, 0.1)}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            sx={{
              width: 1,
              height: 1,
              borderRadius: 100,
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.5),
            }}
          >
            <IconButton sx={{ width: 1, height: 1 }} onClick={upload}>
              <Iconify icon="lets-icons:edit" width={25} color="white" />
            </IconButton>
          </Box>
        </Stack>
      )}
    </Stack>
  )
}
