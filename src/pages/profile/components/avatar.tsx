import { Iconify } from '@/components/iconify'
import { useBoolean } from '@/hooks'
import { alpha, Box, Stack } from '@mui/material'
import { useEffect } from 'react'

interface AvatarProps {
  img?: string
}

export function Avatar({ img }: AvatarProps) {
  const isFallback = useBoolean()

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
      justifyContent="center"
      alignItems="center"
      bgcolor="divider"
      border={1}
      borderColor="divider"
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
          width={40}
          height={40}
          onError={isFallback.onTrue}
          sx={{ objectFit: 'cover' }}
        />
      )}
    </Stack>
  )
}
