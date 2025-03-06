import { Iconify } from '@/components/iconify'
import { useBoolean, useUpload } from '@/hooks'
import { alpha, IconButton, Stack } from '@mui/material'
import { useEffect } from 'react'
import { EditableProps } from '../types'
import { motion } from 'motion/react'
import { Avatar } from '@/components/editable/avatar/avatar'

interface EditableAvatarProps extends EditableProps<File | null> {
  img?: string
}

export function EditableAvatar({ img, onEdit }: EditableAvatarProps) {
  const isFallback = useBoolean()

  const { upload } = useUpload({
    onSuccess: (files) => onEdit?.(files[0]),
    onError: (error) => console.error(error),
  })

  const deleteHandler = () => {
    onEdit?.(null)
  }

  useEffect(() => {
    if (img) {
      isFallback.onFalse()
      return
    }
    isFallback.onTrue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img])

  return (
    <Stack position="relative">
      <Avatar src={img} />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        position="absolute"
        component={motion.div}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        width={1}
        height={1}
        borderRadius="100%"
        bgcolor={(theme) => alpha(theme.palette.common.black, 0.5)}
      >
        <IconButton sx={{ flex: 1, height: 1, borderRadius: 0 }} onClick={upload}>
          <Iconify icon="lets-icons:edit" width={20} color="white" />
        </IconButton>
        <IconButton sx={{ flex: 1, height: 1, borderRadius: 0 }} onClick={deleteHandler}>
          <Iconify icon="material-symbols:close-rounded" width={20} color="white" />
        </IconButton>
      </Stack>
    </Stack>
  )
}
