import { FallbackImage } from '@/components/fallback-image'
import { Iconify } from '@/components/iconify'
import { Stack } from '@mui/material'

interface AvatarProps {
  src: string
}

export function Avatar({ src }: AvatarProps) {
  return (
    <Stack
      width={70}
      height={70}
      borderRadius="100%"
      flexShrink={0}
      bgcolor={(theme) => theme.palette.background.dark}
      justifyContent="center"
      alignContent="center"
      border={1}
      borderColor={(theme) => theme.palette.border.main}
      overflow="hidden"
    >
      <FallbackImage
        src={src}
        fallback={<Iconify icon="material-symbols:person-rounded" width={40} color="white" />}
      />
    </Stack>
  )
}
